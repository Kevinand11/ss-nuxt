import { defineNuxtPlugin, onGlobalSetup, watch } from '@nuxtjs/composition-api'
import firebase from '@modules/core/services/initFirebase'
import { useAuth } from '@app/hooks/auth/auth'
import { setSession } from '@app/hooks/sessions/session'

export default defineNuxtPlugin(async ({ app }) => {
	const router = app.router!

	await firebase.auth()
		.setPersistence(firebase.auth.Auth.Persistence.NONE)
		.catch(() => {})

	const { id, currentSessionId, isLoggedIn, signin } = useAuth()
	if (isLoggedIn.value) await signin(true)

	onGlobalSetup(async () => {
		await setSession(id.value, currentSessionId.value, router)
		watch(() => currentSessionId.value, async () => {
			await setSession(id.value, currentSessionId.value, router)
		})
	})
})
