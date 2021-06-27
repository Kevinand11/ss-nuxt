import { Ref, ssrRef, useFetch } from '@nuxtjs/composition-api'
import { useAuth } from '@app/hooks/auth/auth'
import { ChatMetaEntity, GetPersonalChatsMeta, ListenToPersonalChatsMeta } from '@modules/sessions'
import { useErrorHandler, useListener, useLoadingHandler } from '@app/hooks/core/states'

const sound = require('@app/assets/audio/notification-sound.mp3')
const player = new Audio()
player.src = sound

const global = {} as Record<string, {
	meta: Ref<ChatMetaEntity[]>,
	fetched: Ref<boolean>
	listener: ReturnType<typeof useListener>
} & ReturnType<typeof useErrorHandler> & ReturnType<typeof useLoadingHandler>>

export const useChatsList = () => {
	const { id } = useAuth()
	const userId = id.value ?? 'empty'
	if (global[userId] === undefined) {
		const listener = useListener(async () => {
			if (!id.value) return () => {}
			const cb = (entities: ChatMetaEntity[]) => {
				let check:boolean = false
				entities.forEach((entity) => {
					const entityUnRead = Object.keys(entity.unRead)
					const globalUnRead = Object.keys(global[id.value].meta.value)
					entityUnRead.every((unread) => {
						const unreadCheck:boolean = globalUnRead.includes(unread)
						if (!unreadCheck) {
							check = true
							return false
						}
						return true
					})
				})
				if(check){
					player.play()
				}
				global[id.value].meta.value = entities
			 }

			return ListenToPersonalChatsMeta.call(id.value, cb)
		})
		global[userId] = {
			meta: ssrRef([]),
			fetched: ssrRef(false),
			listener,
			...useErrorHandler(),
			...useLoadingHandler()
		}
	}
	const fetchMeta = async () => {
		if (!id.value) return
		global[id.value].setError('')
		try {
			global[id.value].setLoading(true)
			global[id.value].meta.value = await GetPersonalChatsMeta.call(id.value)
			global[id.value].fetched.value = true
		} catch (e) { global[id.value].setError(e) }
		global[id.value].setLoading(false)
	}
	useFetch(async () => {
		if (!id.value) return
		if (!global[id.value].fetched.value && !global[id.value].loading.value) await fetchMeta()
	})
	return { ...global[userId] }
}
