import { BaseEntity } from '@modules/core/domains/entities/base'
import { UserBio } from '@modules/users'

export class SessionEntity extends BaseEntity {
	readonly id: string
	readonly message: string
	readonly studentId: string
	readonly studentBio: UserBio
	readonly tutorId: string
	readonly tutorBio: UserBio
	readonly duration: number
	readonly price: number
	readonly accepted: boolean
	readonly cancelled: { student: boolean, tutor: boolean }
	readonly reviews?: {
		student?: { rating: number, comment: string }
		tutor?: { rating: number, comment: string }
	}

	readonly createdAt: number
	readonly endedAt?: number

	constructor ({
		id, message, duration, price,
		studentId, tutorId, studentBio, tutorBio,
		accepted, createdAt, cancelled, reviews, endedAt
	}: SessionConstructorArgs) {
		super()
		this.id = id
		this.message = message
		this.studentId = studentId
		this.studentBio = studentBio
		this.tutorId = tutorId
		this.tutorBio = tutorBio
		this.duration = duration
		this.price = price
		this.accepted = accepted
		this.cancelled = cancelled
		this.reviews = reviews
		this.createdAt = createdAt
		this.endedAt = endedAt
	}
}

type SessionConstructorArgs = {
	id: string, message: string, duration: number, price: number,
	studentId: string, tutorId: string, studentBio: UserBio, tutorBio: UserBio,
	accepted: boolean, cancelled: { tutor: boolean, student: boolean },
	reviews?: {
		student?: { rating: number, comment: string }
		tutor?: { rating: number, comment: string }
	},
	createdAt: number, endedAt?: number,
}
