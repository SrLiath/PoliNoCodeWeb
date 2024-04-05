const session = require('express-session');
const crypto = require('crypto');

module.exports = function configureSession(app) {
    // Gerar uma chave secreta aleatória
    const secretKey = generateSecretKey();

    // Configurar a sessão com a chave secreta
    app.use(session({
        secret: secretKey,
        resave: false,
        saveUninitialized: false
    }));

    // Função para gerar uma chave secreta hexadecimal aleatória
    function generateSecretKey() {
        return crypto.randomBytes(32).toString('hex');
    }
};
