import { Ref, ref } from '@nuxtjs/composition-api'
import { client, hostedFields, paypalCheckout, HostedFields } from 'braintree-web'
import { GetClientToken, MakePayment } from '@modules/payment'
import { useErrorHandler, useLoadingHandler } from '@app/hooks/core/states'
import { getTwoDigits } from '@utils/dates'
import { isClient, isProd } from '@utils/environment'
import { useAuth } from '@app/hooks/auth/auth'
import { usePaymentModal } from '@app/hooks/core/modals'

let props = {
	amount: null as number | null,
	afterPayment: null as null | ((res: boolean) => Promise<void>)
}
export const setPaymentProps = (prop: typeof props) => props = prop

export const useMakePayment = () => {
	const { id } = useAuth()
	const { loading, setLoading } = useLoadingHandler()
	const { error, setError } = useErrorHandler()
	const hostedFieldsInstance = ref(null) as Ref<HostedFields | null>

	const processPayment = async (nonce: string) => {
		const res = await MakePayment.call(id.value, props.amount!, nonce)
		usePaymentModal().closePaymentModal()
		await props.afterPayment?.(res)
	}
	const initializeHostedFields = async () => {
		if (isClient()) {
			setLoading(true)
			const initializeFields = async () => {
				const { braintree: braintreeToken, paypal: paypalToken } = await GetClientToken.call()
				const clientInstance = await client.create({ authorization: braintreeToken })
				const now = new Date()
				const month = getTwoDigits(now.getMonth() + 1)
				const year = now.getFullYear()
				const options = {
					client: clientInstance,
					styles: { input: { 'font-size': '14px' } },
					fields: {
						number: { selector: '#creditCardNumber', placeholder: 'Enter Credit Card' },
						cvv: { selector: '#cvv', placeholder: 'Enter CVV' },
						expirationDate: { selector: '#expireDate', placeholder: `${month}/${year + 1}` }
					}
				}
				hostedFieldsInstance.value = await hostedFields.create(options)
				const paypal = require('paypal-checkout')
				const paypalInstance = await paypalCheckout.create({ client: clientInstance, authorization: paypalToken })
				paypal.Button.render({
					env: isProd ? 'production' : 'sandbox',
					style: { label: 'paypal', size: 'large', shape: 'rect', color: 'gold', tagline: true },
					// @ts-ignore
					payment: () => paypalInstance.createPayment({ flow: 'vault', displayName: 'Stranerd', currency: 'USD' }),
					onAuthorize: async (info: any) => {
						if (!loading.value) {
							try {
								setLoading(true)
								const { nonce } = await paypalInstance.tokenizePayment(info)
								await processPayment(nonce)
							} catch (e) { setError(e) }
							setLoading(false)
						}
					},
					onCancel: () => setError('Payment process cancelled.'),
					onError: setError
				}, '#paypalButton')
			}
			await initializeFields().catch((e) => setError(e.message))
			setLoading(false)
		}
	}
	const pay = async () => {
		if (!loading.value && hostedFieldsInstance.value) {
			setError('')
			try {
				setLoading(true)
				const { nonce } = await hostedFieldsInstance.value.tokenize()
				await processPayment(nonce)
			} catch (e) { setError(e) }
			setLoading(false)
		}
	}
	return {
		loading, error, ...props,
		hostedFieldsInstance,
		initializeHostedFields, pay
	}
}
