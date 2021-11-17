module.exports = {
  apps : [{
    name: 'express-api',
    script: 'dist/main.js',
    watch: false,
    max_memory_restart: '3G',
  }],
};
