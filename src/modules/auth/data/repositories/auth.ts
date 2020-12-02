import { UserBio } from '@modules/users'
import { AuthBaseDataSource } from '../datasources/auth-base'
import { IAuthRepository } from '../../domain/irepositories/iauth'

export class AuthRepository implements IAuthRepository {
	private dataSource: AuthBaseDataSource

	constructor (dataSource: AuthBaseDataSource) {
		this.dataSource = dataSource
	}

	async signinWithEmail (email: string, password: string) {
		return await this.dataSource.signinWithEmail(email, password)
	}

	async signinWithGoogle () {
		return await this.dataSource.signinWithGoogle()
	}

	async signupWithEmail (name: string, email: string, password: string) {
		return await this.dataSource.signupWithEmail(name, email, password)
	}

	async sendSigninEmail (email: string, redirectUrl: string) {
		return await this.dataSource.sendSigninEmail(email, redirectUrl)
	}

	async signinWithEmailLink (email: string, emailUrl: string) {
		return await this.dataSource.signinWithEmailLink(email, emailUrl)
	}

	async resetPassword (email: string): Promise<void> {
		return await this.dataSource.resetPassword(email)
	}

	async updatePassword (email: string, oldPassword: string, password: string) {
		return await this.dataSource.updatePassword(email, oldPassword, password)
	}

	async updateProfile (id: string, bio: Partial<UserBio>) {
		return await this.dataSource.updateProfile(id, bio)
	}

	async session (idToken: string) {
		return await this.dataSource.session(idToken)
	}

	async logout () {
		return await this.dataSource.logout()
	}
}
