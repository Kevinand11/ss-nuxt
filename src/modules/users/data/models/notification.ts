import { NotificationType } from '../../domain/entities/notification'

export interface NotificationFromModel {
	id: string
	title: string
	description: string
	seen: boolean
	type: NotificationType
	action: string
	dates: {
		createdAt: number
	}
}

export interface NotificationToModel {
	title: string
	description: string
	seen: boolean
	type: NotificationType
	action: string
}