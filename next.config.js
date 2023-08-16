/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
<<<<<<< Updated upstream
=======
  images: {
    domains: ['lh3.googleusercontent.com'],
  },
  webpack: (config, { isServer }) => {
    // If the build is for the server-side (Node.js) bundle
    if (isServer) {
      // Externalize 'fs/promises' so that it doesn't get bundled
      config.experiments = { ...config.experiments, topLevelAwait: true };
      config.externals.push('fs/promises');
    }

    // Add your other webpack customizations here if needed

    return config;
  },
>>>>>>> Stashed changes
}

module.exports = nextConfig
