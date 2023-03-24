// /** @type {import('next').NextConfig} */
// next.config.js
const removeImports = require('next-remove-imports')()
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      'yt3.googleusercontent.com',
      'yt3.ggpht.com',
      'lh3.googleusercontent.com',
      'avatars.githubusercontent.com',
    ],
  },
  webpack: function (config) {
    config.module.rules.push({
      test: /\.md$/,
      use: 'raw-loader',
    })
    return config
  },
}

module.exports = removeImports(nextConfig)
