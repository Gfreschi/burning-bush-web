/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compiler: {
    emotion: true,
  },
}

module.exports = nextConfig

const withImages = require('next-images')

module.exports = withImages({
  esModule: true,
})
