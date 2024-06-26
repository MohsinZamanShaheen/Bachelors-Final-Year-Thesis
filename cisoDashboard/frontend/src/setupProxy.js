const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(
        '/api',
        createProxyMiddleware({
            target: 'https://springdashsecure.azurewebsites.net',
            changeOrigin: true,
        })
    );
};