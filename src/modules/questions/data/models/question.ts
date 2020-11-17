import firebase from 'firebase'
import { UserBio } from '@modules/users'
import { Media } from '@modules/core/data/models/base'
import { CommentFromModel } from '../models/comment'

export interface QuestionFromModel {
	id: string
	body: string
	attachments: Media[]
	credits: number
	subjectId: string
	userId: string
	user: UserBio
	answerId?: string
	answers?: number
	comments?: {
		count: number
		last: { [id: string]: CommentFromModel }
	}
	dates: {
		createdAt: firebase.firestore.Timestamp
	}
}

export interface QuestionToModel {
	body: string
	attachments: Media[]
	credits: number
	answerId?: string
	subjectId: string
	userId: string
	user?: UserBio
}
