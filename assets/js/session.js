const session = require('express-session');

module.exports = function configureSession(app) {
    app.use(session({
        secret: 'sua_chave_secreta',
        resave: false,
        saveUninitialized: false
    }));
};
