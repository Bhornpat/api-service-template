// ecosystem.config.cjs
module.exports = {
  apps: [
    {
      name: 'api-service',
      script: './src/main.js',
      instances: 1,
      autorestart: true,
      watch: false,
      env: {
        NODE_ENV: 'production',
        PORT: 3000,
      },
    },
  ],
};
