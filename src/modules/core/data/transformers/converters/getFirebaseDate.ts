import { Timestamp } from '../../../services/initFirebase'

export const timestampToMs = (timestamp: Timestamp | number | undefined) => {
	if (typeof timestamp === 'number') return timestamp
	return timestamp?.toDate?.().getTime() ?? new Date().getTime()
}
