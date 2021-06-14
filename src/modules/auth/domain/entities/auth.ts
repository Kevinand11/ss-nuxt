export type AuthUser = {
	name?: string
	email: string
	password: string
}

export type AfterAuthUser = {
	idToken: string
	id: string
	email: string
	isNew: boolean
}

export type AuthDetails = {
	id: string
	email: string
	token: string
	isVerified: boolean
}
