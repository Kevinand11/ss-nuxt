import { FirestoreGetClauses } from '@modules/core'
import { PAGINATION_LIMIT } from '@utils/constants'
import { IQuestionRepository } from '../../irepositories/iquestion'

export class GetUserQuestionsUseCase {
	private repository: IQuestionRepository

	constructor (repository: IQuestionRepository) {
		this.repository = repository
	}

	async call (userId: string, date?: Date) {
		const conditions: FirestoreGetClauses = {
			order: { field: 'dates.createdAt', desc: true },
			limit: PAGINATION_LIMIT + 1,
			where: [
				{ field: 'userId', value: userId, condition: '==' }
			]
		}
		if (date) conditions.where!.push({ field: 'dates.createdAt', condition: '<', value: date })

		return await this.repository.get(conditions)
	}
}
