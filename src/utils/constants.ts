export const TOKEN_SESSION_NAME = 'session'
export const USER_SESSION_NAME = 'user'
export const REDIRECT_SESSION_NAME = 'redirect-to'

export const EMAIL_SIGNIN_STORAGE_KEY = 'email-for-password-less-signin'

export const PAGINATION_LIMIT = 10
export const CHAT_PAGINATION_LIMIT = 20

export const MINIMUM_COINS = 4
export const COINS_GAP = 4
export const MAXIMUM_COINS = 20

const PATH_SEPARATOR = '---'
export const getChatsPath = (path: [string, string]) => [...path].sort().join(PATH_SEPARATOR)

export const DEFAULT_PROFILE_IMAGE = '/images/avatars/user_profile.svg'
