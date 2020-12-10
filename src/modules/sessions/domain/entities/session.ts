import { BaseEntity } from '@modules/core/domains/entities/base'
import { UserBio } from '@modules/users'

export class SessionEntity extends BaseEntity {
	readonly id: string
	readonly studentId: string
	readonly studentBio: UserBio
	readonly tutorId: string
	readonly tutorBio: UserBio
	readonly duration: number
	readonly price: number
	readonly paid: boolean
	readonly accepted: boolean
	readonly cancelled: { student: boolean, tutor: boolean }
	readonly reviews?: {
		student?: { rating: number, comment: string }
		tutor?: { rating: number, comment: string }
	}

	readonly createdAt: string
	readonly endedAt?: string

	constructor ({
		id, duration, price, paid,
		studentId, tutorId, studentBio, tutorBio,
		accepted, createdAt, cancelled, reviews, endedAt
	}: SessionConstructorArgs) {
		super()
		this.id = id
		this.studentId = studentId
		this.studentBio = studentBio
		this.tutorId = tutorId
		this.tutorBio = tutorBio
		this.duration = duration
		this.price = price
		this.paid = paid
		this.accepted = accepted
		this.cancelled = cancelled
		this.reviews = reviews
		this.createdAt = createdAt
		this.endedAt = endedAt
	}
}

type SessionConstructorArgs = {
	id: string, duration: number, price: number, paid: boolean,
	studentId: string, tutorId: string, studentBio: UserBio, tutorBio: UserBio,
	accepted: boolean, cancelled: { tutor: boolean, student: boolean },
	reviews?: {
		student?: { rating: number, comment: string }
		tutor?: { rating: number, comment: string }
	},
	createdAt: string, endedAt?: string,
}
