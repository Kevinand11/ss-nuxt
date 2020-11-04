import { BaseEntity } from '@modules/core/domains/entities/base'
import { Media } from '@modules/core/data/models/base'
export const DEFAULT_IMAGE_URL = '/images/user_profile.png'

export class UserEntity extends BaseEntity {
	public readonly id: string
	public readonly roles: UserRoles
	public readonly userBio: UserBio
	public readonly account: UserAccount
	public readonly signedUpAt: Date

	constructor ({ id, bio, roles, account, dates }: UserConstructorArgs) {
		super()
		this.id = id
		this.userBio = bio
		this.roles = roles
		this.account = account
		this.signedUpAt = dates.signedUpAt
	}

	get name () { return this.userBio.name }
	get email () { return this.userBio.email }
	get bio () { return this.userBio.bio }
	get image () { return this.userBio.image?.link || DEFAULT_IMAGE_URL }
}

type UserConstructorArgs = {
	id: string
	bio: UserBio
	roles: UserRoles
	account: UserAccount
	dates: { signedUpAt: Date }
}

export interface UserBio {
	name: string
	email: string
	bio: string
	image: Media
}
export interface UserRoles {
	isStudent: boolean
	isTutor?: boolean
	isAdmin?: boolean
}
export interface UserAccount {
	customerId: string
	questions: number
}
