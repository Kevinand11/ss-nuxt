import { FunctionsService } from '@modules/core/services/firebase'
import { PaymentBaseDataSource } from '../datasources/payment-base'

export class PaymentFirebaseDataSource implements PaymentBaseDataSource {
	async getClientToken () {
		return await FunctionsService.call('getClientToken', {})
	}

	async makePayment (data: { amount: number, nonce: string }) {
		return await FunctionsService.call('makePayment', data)
	}

	async makeStripePayment (data: { amount: number, currency: string }) {
		return await FunctionsService.call('makeStripePayment', data)
	}

	async buyCoins (data: { amount: number, isGold: boolean }) {
		return await FunctionsService.call('buyCoins', data)
	}

	async tipNerd (data: { amount: number, tutorId: string }) {
		return await FunctionsService.call('tipNerd', data)
	}
}
