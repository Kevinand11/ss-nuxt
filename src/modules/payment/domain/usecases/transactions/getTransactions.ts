import { FirestoreGetClauses } from '@modules/core/data/datasources/base'
import { ITransactionRepository } from '../../irepositories/itransaction'

export class GetTransactionsUseCase {
	private readonly repository: ITransactionRepository

	constructor (repository: ITransactionRepository) {
		this.repository = repository
	}

	async call (userId: string, date?: Date) {
		const conditions: FirestoreGetClauses = {
			order: {
				field: 'dates/createdAt',
				desc: true
			}
		}
		if (date) conditions.where = [{ field: 'dates.createdAt', condition: '<', value: date }]

		return this.repository.get(userId, conditions)
	}
}
