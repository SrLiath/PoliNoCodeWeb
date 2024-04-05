const mysql = require('mysql');

// Configurações seguras para a conexão com o banco de dados
const dbConfig = {
    host: 'localhost',
    user: 'root',
    password: 'mysql',
    database: 'db_polibotweb'
};

// Criar pool de conexões
const pool = mysql.createPool({
    connectionLimit: 10, // Limitar o número máximo de conexões simultâneas
    ...dbConfig
});

// Verificar se a conexão é bem-sucedida
pool.getConnection((err, connection) => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados:', err);
        return;
    }
    console.log('Conexão bem-sucedida ao banco de dados');
    connection.release(); // Liberar a conexão
});

module.exports = pool;
