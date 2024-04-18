CREATE DATABASE db_polibotweb;
USE db_polibotweb;

#Criação tabela de usuário

CREATE TABLE tb_usuario (
    id              INT NOT NULL AUTO_INCREMENT,
    nome            VARCHAR(65),
    email           VARCHAR(255),    
    senha           VARCHAR(255),
    PRIMARY KEY(id)
);

# ALTER USER 'polibotweb'@'localhost' IDENTIFIED WITH mysql_native_password BY 'polibotweb'; (Caso tenha erro para conectar pelo Node JS)

#Criação tabela de key

CREATE TABLE tb_key (
    id              INT NOT NULL AUTO_INCREMENT,
    usuario_id      INT,
    chave           VARCHAR(255),
    compra        DATE,
    expiracao_key   DATE,
    PRIMARY KEY(id),
    FOREIGN KEY (usuario_id) REFERENCES tb_usuario(id)
);

#Criação de Trigger para criar usuario na tabela key

DELIMITER $$

CREATE TRIGGER criar_usuario_tb_key AFTER INSERT ON tb_usuario
FOR EACH ROW
BEGIN
    INSERT INTO tb_key (usuario_id) VALUES (NEW.id);
END$$

DELIMITER ;

#Visualizar dados da TRIGGER
SHOW CREATE TRIGGER criar_usuario_tb_key;

#Criação tabela de compra :

CREATE TABLE tb_compra (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome_cartao VARCHAR(255) NOT NULL,
    numero_cartao VARCHAR(16) NOT NULL,
    data_validade VARCHAR(7) NOT NULL,
    codigo_seguranca VARCHAR(4) NOT NULL,
    plano ENUM('standard', 'premium', 'business') NOT NULL,
    compra_aprovada BOOLEAN DEFAULT true,
    data_transacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
