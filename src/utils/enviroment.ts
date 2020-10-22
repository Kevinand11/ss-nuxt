export const useSubdomain = JSON.parse(process.env.USE_SUBDOMAIN ?? 'false') as boolean

export const port = parseInt(process.env.PORT ?? '8080')
export const host = process.env.HOST!
export const ssl = JSON.parse(process.env.SSL ?? 'false') as boolean

export const isDev = process.env.NODE_ENV === 'development'
export const isProd = process.env.NODE_ENV === 'production'
