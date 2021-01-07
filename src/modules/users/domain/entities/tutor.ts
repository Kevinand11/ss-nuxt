import { BaseEntity } from '@modules/core/domains/entities/base'
import { UserBio, generateDefaultBio } from './user'

export class TutorEntity extends BaseEntity {
	public readonly id: string
	public readonly userBio: UserBio
	public readonly canTeach: boolean
	public readonly rating: number
	public readonly reviews: number
	public readonly subjectsData: TutorSubjects

	constructor ({ id, bio, canTeach, subjects, rating, reviews }: TutorConstructorArgs) {
		super()
		this.id = id
		this.userBio = generateDefaultBio(bio)
		this.canTeach = canTeach
		this.subjectsData = subjects ?? {}
		this.rating = rating
		this.reviews = reviews
	}

	get name () { return this.userBio.name }
	get email () { return this.userBio.email }
	get image () { return this.userBio.image.link }

	get subjects () {
		return Object.entries(this.subjectsData ?? {})
			.map((c) => ({ ...c[1], id: c[0] }))
	}
}

type TutorConstructorArgs = {
	id: string
	bio: UserBio
	canTeach: boolean
	subjects: TutorSubjects
	rating: number
	reviews: number
}

export type TutorSubjects = Record<string, {
	level: number
	upgrades: Record<number, {
		score: number
		takenAt: number
		passed: boolean
	}>
}>
