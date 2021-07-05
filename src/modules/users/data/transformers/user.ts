import { timestampToMs } from '@modules/core/data/transformers/converters/getFirestoreDate'
import { UserFromModel, UserToModel } from '../models/user'
import { UserEntity } from '../../domain/entities/user'

export class UserTransformer {
	fromJSON (model: UserFromModel) {
		const { id, bio, roles, account, status, tutor, dates } = model
		return new UserEntity({
			id, bio, roles, account, status, tutor,
			dates: {
				signedUpAt: timestampToMs(dates?.signedUpAt)
			}
		})
	}

	toJSON (entity: UserEntity) :UserToModel {
		return {
			bio: entity.bio,
			roles: entity.roles,
			account: {
				...entity.account,
				meta: Object.entries(entity.account.meta).reduce((acc, [key, val]) => {
					// @ts-ignore
					acc[key] = Array.isArray(val) ? Object.fromEntries(val.map((c) => [c, true])) : val
					return acc
				}, {} as UserFromModel['account']['meta'])
			},
			status: entity.status,
			tutor: {
				...entity.tutor,
				tags: Object.fromEntries(
					entity.tutor.tags.map((t) => [t.id, t.count])
				)
			},
			dates: entity.dates
		}
	}
}
