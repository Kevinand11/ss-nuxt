import { timestampToMs } from '@modules/core/data/transformers/converters/getFirestoreDate'
import { AnswerFromModel, AnswerToModel } from '../models/answer'
import { AnswerEntity } from '../../domain/entities/answer'

export class AnswerTransformer {
	fromJSON (model: AnswerFromModel) {
		const {
			id, body, coins, questionId, subjectId,
			userId, user, best, ratings, comments,
			dates: { createdAt }
		} = model
		return new AnswerEntity({
			id, body, coins,
			questionId, userId, user, subjectId,
			best, ratings, comments,
			createdAt: timestampToMs(createdAt)
		})
	}

	toJSON (entity: AnswerEntity) :AnswerToModel {
		return {
			body: entity.body,
			coins: entity.coins,
			questionId: entity.questionId,
			subjectId: entity.subjectId,
			userId: entity.userId,
			user: entity.user
		}
	}
}
