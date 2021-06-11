import { SessionSignin, SessionSignout } from '@modules/auth'
import { useErrorHandler, useLoadingHandler } from '@app/hooks/core/states'
import { isClient, isServer } from '@utils/environment'
import { REDIRECT_SESSION_NAME } from '@utils/constants'
import Cookie from 'cookie'
import { AfterAuthUser } from '@modules/auth/domain/entities/auth'
import { useContext } from '@nuxtjs/composition-api'
import VueRouter from 'vue-router'
import { useAuth } from '@app/hooks/auth/auth'
import firebase from '@modules/core/services/initFirebase'
import { Alert } from '@app/hooks/core/notifications'
import { useEditModal } from '@app/hooks/core/modals'
import { serialize } from '@utils/cookie'

export const createSession = async (user: AfterAuthUser, router: VueRouter) => {
	const authDetails = await SessionSignin.call(user.idToken)
	if (user.isNew) useEditModal().setEditModalAccountProfile()
	if (isClient()) {
		if (authDetails) {
			const { token, setAuthUser, startProfileListener, signout } = useAuth()
			await setAuthUser(authDetails)
			try {
				if (token.value) await firebase.auth()
					.signInWithCustomToken(token.value)
				await startProfileListener()
			} catch (e) {
				await SessionSignout.call()
				await signout()
				if (isClient()) window.location.assign('/')
			}
		}

		const { [REDIRECT_SESSION_NAME]: redirect } = Cookie.parse(document.cookie ?? '')
		document.cookie = Cookie.serialize(REDIRECT_SESSION_NAME, '', {
			expires: new Date(0)
		})
		if (router) await router.push(redirect ?? '/dashboard')
	}
}

export const useSessionSignout = () => {
	const { error, setError } = useErrorHandler()
	const { loading, setLoading } = useLoadingHandler()
	const signout = async () => {
		setError('')
		const accepted = await Alert({
			title: 'Are you sure you want to sign out?',
			text: '',
			icon: 'info',
			confirmButtonText: 'Yes, signout'
		})
		if (accepted) {
			setLoading(true)
			try {
				await SessionSignout.call()
				await useAuth().closeProfileListener()
				await useAuth().signout()
				if (isClient()) window.location.assign('/')
			} catch (error) { setError(error) }
			setLoading(false)
		}
	}

	return { loading, error, signout }
}

export const useRedirectToAuth = () => {
	const { app, res, route } = useContext()

	const redirect = () => {
		if (isServer()) res.setHeader('Set-Cookie', serialize(REDIRECT_SESSION_NAME, route.value.fullPath))
		else document.cookie = serialize(REDIRECT_SESSION_NAME, route.value.fullPath)
		if (app.router) app.router.push('/auth/')
	}

	return { redirect }
}
