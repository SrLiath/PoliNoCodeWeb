const express = require('express');
const path = require('path');
const indexRouter = require('./routes/index');
const configureSession = require('./assets/js/session');

const app = express();

// Configurar o middleware para analisar o corpo da requisição
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configurar o middleware de sessão
configureSession(app);

// Configurar o middleware para servir arquivos estáticos
app.use(express.static(path.join(__dirname, 'assets')));

// Configurar as rotas
app.use('/', indexRouter);

// Iniciar o servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
