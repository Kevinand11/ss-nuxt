import { UserBio } from '@modules/users'
import { AfterAuthUser } from '../entities/auth'

export interface IAuthRepository {
	signinWithEmail: (email: string, password: string) => Promise<AfterAuthUser>
	signinWithGoogle: () => Promise<AfterAuthUser>
	signupWithEmail: (name: string, email: string, password: string) => Promise<AfterAuthUser>
	sendSigninEmail: (email: string, redirectUrl: string) => Promise<void>
	signinWithEmailLink: (email: string, emailUrl: string) => Promise<AfterAuthUser>
	resetPassword: (email: string) => Promise<void>
	updatePassword: (email: string, oldPassword: string, password: string) => Promise<void>
	updateProfile: (id: string, bio: Partial<UserBio>) => Promise<void>
	session: (idToken: string) => Promise<void>
	logout: () => Promise<void>
}
