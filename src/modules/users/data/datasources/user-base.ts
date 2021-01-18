import { DatabaseGetClauses } from '@modules/core/data/datasources/base'
import { UserFromModel } from '../models/user'

export abstract class UserBaseDataSource {
	abstract find: (id: string) => Promise<UserFromModel | null>
	abstract get: (condition?: DatabaseGetClauses) => Promise<UserFromModel[]>
	abstract listen: (id: string, callback: (user: UserFromModel | null) => void, updateStatus: boolean) => Promise<() => void>
	abstract listenToMany: (callback: (users: UserFromModel[]) => void, condition?: DatabaseGetClauses) => Promise<() => void>
}
