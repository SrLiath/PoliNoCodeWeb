-- Criação Banco de dados

create database db_polibotweb

use db_polibotweb;


-- Criação da tabela para armazenar informações dos usuários
CREATE TABLE IF NOT EXISTS tb_usuario (
    id              INT NOT NULL AUTO_INCREMENT,
    nome            VARCHAR(65),
    email           VARCHAR(255),    
    senha           VARCHAR(255),
    PRIMARY KEY(id)
);

-- Criação da tabela para armazenar as chaves relacionadas aos usuários
CREATE TABLE IF NOT EXISTS tb_key (
    id              INT NOT NULL AUTO_INCREMENT,
    usuario_id      INT,
    chave           VARCHAR(255),
    compra        DATE,
    expiracao_key   DATE,
    PRIMARY KEY(id),
    FOREIGN KEY (usuario_id) REFERENCES tb_usuario(id)
);

-- Criação da tabela para armazenar informações das compras dos usuários
CREATE TABLE IF NOT EXISTS tb_compra (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT NOT NULL,
    nome_cartao VARCHAR(255) NOT NULL,
    numero_cartao VARCHAR(20) NOT NULL,
    data_validade VARCHAR(10) NOT NULL,
    codigo_seguranca VARCHAR(3) NOT NULL,
    plano ENUM('standard', 'premium', 'business') NOT NULL,
    compra_aprovada BOOLEAN DEFAULT true,
    data_transacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (usuario_id) REFERENCES tb_usuario(id)
);

-- Criação de trigger para criar uma chave quando um usuário é inserido
DELIMITER $$
CREATE TRIGGER criar_usuario_tb_key_tb_compra AFTER INSERT ON tb_usuario
FOR EACH ROW
BEGIN
    INSERT INTO tb_key (usuario_id) VALUES (NEW.id);
END$$
DELIMITER ;

-- Criação de trigger para gerar uma chave quando uma compra é inserida e aprovada
DELIMITER $$
CREATE TRIGGER after_compra_insert
AFTER INSERT ON tb_compra
FOR EACH ROW
BEGIN
    DECLARE nova_data DATE;
    IF NEW.compra_aprovada = 1 THEN
        SET nova_data = DATE_ADD(NEW.data_transacao, INTERVAL 30 DAY);

        INSERT INTO tb_key (usuario_id, chave, compra, expiracao_key)
        VALUES (NEW.usuario_id, UUID(), NEW.data_transacao, nova_data);
    END IF;
END$$
DELIMITER ;
