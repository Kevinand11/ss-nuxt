import { isLongerThan, isImage } from 'sd-validate/lib/rules'
import { BaseFactory } from '@modules/core/domains/factories/base'
import { Media } from '@modules/core/data/models/base'
import { UserBio } from '@modules/users'
import { AnswerEntity } from '../entities/answer'
import { AnswerToModel } from '../../data/models/answer'

type Content = File | Media
const isLongerThan0 = (value: string) => isLongerThan(value, 0)
const isLongerThan2 = (value: string) => isLongerThan(value, 2)
const containsOnlyImages = (values: any[]) => {
	const checks = values.map(isImage)
	const valid = checks.every((c) => c.valid)
	const error = checks.find((c) => c.error)?.error
	return { valid, error }
}

export class AnswerFactory extends BaseFactory<AnswerEntity, AnswerToModel> {
	readonly rules = {
		body: { required: true, rules: [isLongerThan2] },
		attachments: { required: true, rules: [containsOnlyImages] },
		credits: { required: true, rules: [] },
		questionId: { required: true, rules: [isLongerThan0] },
		userId: { required: true, rules: [isLongerThan0] },
		user: { required: false, rules: [] },
		likes: { required: false, rules: [] },
		ratings: { required: false, rules: [] }
	}

	values: {
		body: string, attachments: Content[], credits: number, questionId: string,
		userId: string, user: UserBio | undefined, likes: number, ratings: number
	} =
		{ body: '', attachments: [], credits: 10, questionId: '', userId: '', user: undefined, likes: 0, ratings: 0 }

	validValues: {
		body: string, attachments: Content[], credits: number, questionId: string,
		userId: string, user: UserBio | undefined, likes: number, ratings: number
	} =
		{ body: '', attachments: [], credits: 10, questionId: '', userId: '', user: undefined, likes: 0, ratings: 0 }

	errors = {
		body: undefined, attachments: undefined, likes: undefined, ratings: undefined,
		questionId: undefined, userId: undefined, user: undefined, credits: undefined
	}

	reserved = ['questionId', 'credits']

	get body () { return this.values.body }
	set body (value: string) { this.set('body', value) }
	get credits () { return this.values.credits }
	set credits (value: number) { this.set('credits', value) }
	get questionId () { return this.values.questionId }
	set questionId (value: string) { this.set('questionId', value) }
	set userBioAndId (value: { id: string, user: UserBio }) {
		this.set('userId', value.id)
		this.set('user', value.user)
	}

	get attachments () { return this.values.attachments }
	addAttachment (value: Content) { return this.set('attachments', [...this.values.attachments, value]) }
	removeAttachment (value: Content) { return this.set('attachments', this.values.attachments.filter((doc) => doc.name !== value.name)) }

	loadEntity = (entity: AnswerEntity) => {
		this.body = entity.body
		this.credits = entity.credits
		this.questionId = entity.questionId
		this.userBioAndId = { id: entity.userId, user: entity.user }
		this.set('attachments', entity.attachments)
		this.set('likes', entity.likes)
		this.set('ratings', entity.ratings)
	}

	toModel = async () => {
		if (this.valid) {
			const docs = await Promise.all(this.attachments.map(async (doc) => {
				if (doc instanceof File) return await this.uploadFile('answers', doc)
				return doc
			}))
			this.set('attachments', docs)

			const { body, credits, questionId, userId, attachments, user, likes, ratings } = this.validValues
			return {
				body, credits, questionId, userId, ratings, likes,
				attachments: attachments as Media[], user
			}
		} else {
			throw new Error('Validation errors')
		}
	}
}
