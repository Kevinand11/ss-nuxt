import { dateToMilliseconds, timestampToDateString } from '@modules/core/data/transformers/converters/getFirestoreDate'
import { ChatFromModel, ChatToModel } from '../models/chat'
import { ChatEntity } from '../../domain/entities/chat'

export class ChatTransformer {
	fromJSON (model: ChatFromModel) {
		const { id, content, media, from, readAt, dates: { createdAt } } = model
		return new ChatEntity({
			id,
			content, media, from,
			createdAt: timestampToDateString(createdAt)!,
			readAt: timestampToDateString(readAt)!
		})
	}

	toJSON (entity: ChatEntity) :ChatToModel {
		return {
			from: entity.from,
			...(entity.content ? { content: entity.content } : {}),
			...(entity.media ? { media: entity.media } : {}),
			...(entity.readAt ? { readAt: dateToMilliseconds(new Date(entity.readAt)) } : {})
		}
	}
}
