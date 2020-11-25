import { Media } from '@modules/core/data/models/base'
import { UserBio, generateDefaultBio } from '@modules/users'
import { BaseEntity } from '@modules/core/domains/entities/base'

export class AnswerEntity extends BaseEntity {
	public readonly id: string
	public readonly body: string
	public readonly attachments: Media[]
	public readonly credits: number
	public readonly questionId: string
	public readonly userId: string
	public readonly user: UserBio
	public readonly likes: number
	public readonly ratings: number
	public readonly comments: { id: string, body: string, userId: string, user: UserBio }[]
	public readonly commentsCount: number
	public readonly createdAt: Date

	constructor ({
		id, body, credits, questionId, attachments,
		createdAt, userId, user, likes, ratings, comments
	}: AnswerConstructorArgs) {
		super()
		this.id = id
		this.body = body
		this.credits = credits
		this.attachments = attachments
		this.questionId = questionId
		this.userId = userId
		this.user = generateDefaultBio(user)
		this.likes = likes ?? 0
		this.ratings = ratings ?? 0
		this.commentsCount = comments?.count ?? 0
		this.comments = Object.entries(comments?.last ?? {})
			.sort((a, b) => a[0] > b[0] ? 1 : -1)
			.map(([id, { body, userId, user }]) => ({
				id, body, userId,
				user: generateDefaultBio(user)
			}))
		this.createdAt = createdAt
	}
}

type AnswerConstructorArgs = {
	id: string
	body: string
	attachments: Media[]
	credits: number
	questionId: string
	createdAt: Date
	userId: string
	user: UserBio
	likes: number
	ratings: number
	comments?: {
		count: number
		last: { [id: string]: {
				body: string,
				userId: string,
				user: UserBio
			} }
	}
}
