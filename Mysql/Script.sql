CREATE DATABASE db_polibotweb;
USE db_polibotweb;

CREATE TABLE tb_usuario (
    id              INT NOT NULL AUTO_INCREMENT,
    nome            VARCHAR(65),
    email           VARCHAR(255),    
    senha           VARCHAR(255),
    PRIMARY KEY(id)
);

# ALTER USER 'polibotweb'@'localhost' IDENTIFIED WITH mysql_native_password BY 'polibotweb'; (Caso tenha erro para conectar pelo Node JS)

