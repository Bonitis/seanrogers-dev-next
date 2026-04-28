/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  i18n: {
    locales: ["en"],
    defaultLocale: "en",
  },
  async redirects() {
    return [
      {
        source: '/hire-me',
        destination: '/contact',
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig
