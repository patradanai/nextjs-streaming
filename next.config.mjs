// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-var-requires
import nextIntl from "next-intl/plugin";

const withNextIntl = nextIntl("./src/i18n.ts");

/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        minimumCacheTTL: 60,
        domains: ['localhost', '43.229.133.114'],
    },
    output: 'standalone',
}

export default withNextIntl(nextConfig)
