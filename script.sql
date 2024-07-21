CREATE DATABASE turistando;

CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    senha VARCHAR(255) NOT NULL,
    data_cadastro timestamp
);

CREATE TABLE cidades (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    data_cadastro timestamp,
    status boolean
);

CREATE TABLE pontos_turisticos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    descricao TEXT,
    imagem VARCHAR(255),
    latitude DECIMAL(9,6),
    longitude DECIMAL(9,6),
    cidade_id int,
    status boolean,
    e_publico boolean,
    valor_entrada float(10,2),
    data_cadastro timestamp,
    FOREIGN KEY (cidade_id) REFERENCES cidades (id)
);
