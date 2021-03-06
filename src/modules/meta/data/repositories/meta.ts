import { IMetaRepository } from '../../domain/irepositories/imeta'
import { MetaBaseDataSource } from '../datasources/meta-base'

export class MetaRepository implements IMetaRepository {
	private readonly dataSource: MetaBaseDataSource

	constructor (dataSource: MetaBaseDataSource) {
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

	async tipTutor (amount: number, tutorId: string) {
		return await this.dataSource.tipTutor({ amount, tutorId })
	}

	async rateTutor (tutorId: string, rating: number, review: string | undefined) {
		return await this.dataSource.rateTutor({ tutorId, rating, review })
	}
}
