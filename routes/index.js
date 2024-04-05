const express = require('express');
const path = require('path');
const pool = require('../assets/db/connection');

const router = express.Router();

// Rota para a página inicial
router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'assets', 'html', 'index.html'));
});

// Rota para a página de registro
router.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'assets', 'html', 'register.html'));
});

// Rota para lidar com o envio do formulário de login
router.post('/login', (req, res) => {
    const { email, senha } = req.body;

    // Verificar se o email e a senha estão presentes
    if (!email || !senha) {
        return res.status(400).send('Por favor, preencha todos os campos');
    }

    // Consultar o banco de dados para verificar as credenciais do usuário
    pool.query('SELECT * FROM tb_usuario WHERE email = ? AND senha = ?', [email, senha], (err, results) => {
        if (err) {
            console.error('Erro ao consultar usuário:', err);
            return res.status(500).send('Erro interno do servidor');
        }

        // Verificar se o usuário foi encontrado
        if (results.length === 0) {
            return res.status(401).send('Email ou senha incorretos');
        }

        // Definir a sessão de autenticação
        req.session.authenticated = true;
        req.session.user = results[0]; // Armazenar informações do usuário na sessão

        return res.redirect('/workspace');
    });
});

// Rota para a tela de workspace
router.get('/workspace', (req, res) => {
    // Verificar se o usuário está autenticado
    if (!req.session.authenticated) {
        return res.status(401).send('Acesso não autorizado');
    }

    res.sendFile(path.join(__dirname, '..', 'assets', 'html', 'workspace.html'));
});

// Rota para lidar com o envio do formulário de registro
router.post('/register', (req, res) => {
    const { nome, email, senha, confirmar_senha } = req.body;

    // Verificar se todos os campos estão presentes
    if (!nome || !email || !senha || !confirmar_senha) {
        return res.status(400).send('Por favor, preencha todos os campos');
    }

    // Verificar se a senha e a confirmação de senha correspondem
    if (senha !== confirmar_senha) {
        return res.status(400).send('A senha e a confirmação de senha não correspondem');
    }

    pool.query('INSERT INTO tb_usuario (nome, email, senha) VALUES (?, ?, ?)', [nome, email, senha], (err, results) => {
        if (err) {
            console.error('Erro ao inserir usuário:', err);
            return res.status(500).send('Erro interno do servidor');
        }
        return res.status(200).send('Usuário cadastrado com sucesso');
    });
});

module.exports = router;
