const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const path = require('path');

const app = express();
const port = 3000;

// Configuração do body-parser para fazer o parsing do corpo das requisições
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Configuração da conexão com o banco de dados MySQL
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'mysql',
    database: 'db_polibotweb'
});

connection.connect((err) => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados:', err);
        return;
    }
    console.log('Conexão bem sucedida com o banco de dados MySQL');
});

// Caminho absoluto para a pasta 'html'
const htmlPath = 'C:\\Users\\lcsantos1\\Downloads\\PoliNoCodeWeb\\html';

// Caminho absoluto para a pasta 'css'
const cssPath = 'C:\\Users\\lcsantos1\\Downloads\\PoliNoCodeWeb\\css';

// Configuração para servir arquivos estáticos da pasta 'html' e 'css'
app.use(express.static(htmlPath));
app.use(express.static(cssPath));

// Rota de teste para a raiz
app.get('/', (req, res) => {
    res.sendFile(path.join(htmlPath, 'index.html'));
});

// Rota para lidar com o registro de usuários
app.post('/register', (req, res) => {
    const { nome, email, senha, confirmar_senha } = req.body;

    // Verifica se as senhas coincidem
    if (senha !== confirmar_senha) {
        return res.status(400).send('As senhas não coincidem');
    }

    const sql = 'INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)';
    connection.query(sql, [nome, email, senha], (err, result) => {
        if (err) {
            console.error('Erro ao registrar usuário:', err);
            res.status(500).send('Erro ao registrar usuário');
            return;
        }
        console.log('Usuário registrado com sucesso');
        res.status(200).send('Usuário registrado com sucesso');
    });
});

// Inicia o servidor
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});