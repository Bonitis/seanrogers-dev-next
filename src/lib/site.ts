export const siteUrl = 'https://seanrogers.dev'

export const siteUrlFor = (path = '') =>
  `${siteUrl}${path.startsWith('/') ? path : `/${path}`}`
