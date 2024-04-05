const session = require('express-session');

module.exports = function configureSession(app) {
    app.use(session({
        secret: 'polibotweb-secret',
        resave: false,
        saveUninitialized: false
    }));
};
