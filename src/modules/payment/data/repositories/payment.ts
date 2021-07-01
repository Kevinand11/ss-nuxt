import { IPaymentRepository } from '../../domain/irepositories/ipayment'
import { PaymentBaseDataSource } from '../datasources/payment-base'

export class PaymentRepository implements IPaymentRepository {
	private readonly dataSource: PaymentBaseDataSource

	constructor (dataSource: PaymentBaseDataSource) {
		this.dataSource = dataSource
	}

	async getClientToken () {
		return await this.dataSource.getClientToken()
	}

	async makePayment (amount: number, nonce: string) {
		return await this.dataSource.makePayment({ amount, nonce })
	}

	async makeStripePayment (amount: number, currency: string) {
		return await this.dataSource.makeStripePayment({ amount, currency })
	}

	async buyCoins (amount: number, isGold: boolean) {
		return await this.dataSource.buyCoins({ amount, isGold })
	}

	async tipNerd (amount: number, tutorId: string) {
		return await this.dataSource.tipNerd({ amount, tutorId })
	}
}
