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
INSERT INTO cidades (nome, data_cadastro, status)
VALUES ("São Luís", now(), 1);
INSERT INTO cidades (nome, data_cadastro, status)
VALUES ("Imperatriz", now(), 1);
INSERT INTO cidades (nome, data_cadastro, status)
VALUES ("Barreirinhas", now(), 1);
INSERT INTO cidades (nome, data_cadastro, status)
VALUES ("São José de Ribamar", now(), 1);
INSERT INTO cidades (nome, data_cadastro, status)
VALUES ("Carolina", now(), 1);
INSERT INTO cidades (nome, data_cadastro, status)
VALUES ("Alcântara", now(), 1);

INSERT INTO pontos_turisticos(nome, descricao,imagem,latitude,longitude,cidade_id,status,e_publico,	valor_entrada,data_cadastro)
VALUES("Calçadão de imperatriz ", "A Beira-Rio Orla de Imperatriz é um cenário encantador à beira do Rio Tocantins, no centro da cidade de Imperatriz. Ideal para passeios ao entardecer, a orla possui áreas de lazer, restaurantes e uma vista panorâmica que destaca a beleza natural da cidade.", '/images/orla/orla1.png',-5.53544, -47.49034,2,1,1,0.0,now());

INSERT INTO pontos_turisticos(nome, descricao,imagem,latitude,longitude,cidade_id,status,e_publico,	valor_entrada,data_cadastro)
VALUES("Calçadão de imperatriz ", "O Calçadão é uma área de passeio no centro de Imperatriz, ideal para caminhar e fazer compras. A estrutura proporciona um ambiente vibrante, com comércio variado e eventos culturais.", '/images/calcadao/calcadao1.png',-5.53142, -47.48445,2,1,1,0.0,now());

INSERT INTO pontos_turisticos(nome, descricao,imagem,latitude,longitude,cidade_id,status,e_publico,	valor_entrada,data_cadastro)
VALUES("Parque nacional da chapada das mesas", "Localizado no Maranhão, o parque é famoso por suas formações geológicas impressionantes, cachoeiras, e rica biodiversidade. É um destino popular para ecoturismo e trilhas.", '/images/parque/parque1.png',-7.349726 , -46.947914,5,1,1,0.0,now());

INSERT INTO pontos_turisticos(nome, descricao,imagem,latitude,longitude,cidade_id,status,e_publico,	valor_entrada,data_cadastro)
VALUES("Cachoeira do santuário - pedra caída", "Situada na Chapada das Mesas, essa cachoeira é conhecida por suas águas cristalinas e a formação rochosa ao redor, que cria uma paisagem deslumbrante e um ambiente perfeito para banhos e fotografia.", '/images/cachoeira/cachoeira1.png',-7.04417, -47.44249,5,1,1,0.0,now()); 

INSERT INTO pontos_turisticos(nome, descricao,imagem,latitude,longitude,cidade_id,status,e_publico,	valor_entrada,data_cadastro)
VALUES("Praia panaquatira", "Uma praia tranquila com águas limpas e areia branca, ideal para relaxamento. É menos movimentada em comparação com outras praias da região, proporcionando um ambiente mais calmo.", '/images/praia-de-paraquatira/praia-de-panaquatira1.png',-2.51456, -44.03237,4,1,1,0.0,now()); 

INSERT INTO pontos_turisticos(nome, descricao,imagem,latitude,longitude,cidade_id,status,e_publico,	valor_entrada,data_cadastro)
VALUES("Paróquia e santuário de São José de Ribamar", "Um importante local de culto, dedicado a São José de Ribamar, padroeiro do Maranhão. O santuário é um centro de peregrinação e oferece uma rica arquitetura religiosa e eventos litúrgicos.", '/images/igreja/igreja1.png',-2.56171, -44.05554,4,1,1,0.0,now()); 

INSERT INTO pontos_turisticos(nome, descricao,imagem,latitude,longitude,cidade_id,status,e_publico,	valor_entrada,data_cadastro)
VALUES("Pelourinho", "Uma das mais antigas igrejas do Maranhão, localizada em Alcântara. Seu charme histórico e arquitetura colonial a tornam um ponto de interesse cultural e religioso na cidade.", '/images/pelourinho/pelourinho1.png',-2.40709, -44.41516,6,1,1,0.0,now()); 

INSERT INTO pontos_turisticos(nome, descricao,imagem,latitude,longitude,cidade_id,status,e_publico,	valor_entrada,data_cadastro)
VALUES("Rua da amargura", "Uma rua histórica e pitoresca em Alcântara, conhecida por suas construções coloniais bem preservadas. Oferece um vislumbre do passado histórico da cidade.", '/images/rua/rua1.png',-2.408880, -44.41650,6,1,1,0.0,now());

INSERT INTO pontos_turisticos(nome, descricao,imagem,latitude,longitude,cidade_id,status,e_publico,	valor_entrada,data_cadastro)
VALUES("Canto do atins", "Uma vila tranquila localizada perto dos Lençóis Maranhenses, conhecida por suas paisagens naturais e atmosfera relaxante. É um ponto de partida popular para explorar as dunas e lagoas da região.", '/images/praia/praia1.png',-2.56429, -42.79485,3,1,1,0.0,now());

INSERT INTO pontos_turisticos(nome, descricao,imagem,latitude,longitude,cidade_id,status,e_publico,	valor_entrada,data_cadastro)
VALUES("Lençois maranhenses", "Um dos mais famosos parques nacionais do Brasil, conhecido por suas vastas dunas de areia e lagoas de água doce que se formam durante a estação chuvosa, criando um cenário único e impressionante.", '/images/lencois/lencois1.png',-2.48584, -43.12841,3,1,1,0.0,now());

INSERT INTO pontos_turisticos(nome, descricao,imagem,latitude,longitude,cidade_id,status,e_publico,	valor_entrada,data_cadastro)
VALUES("Centro histórico", "O Centro Histórico de São Luís é uma área no coração da capital maranhense, conhecida por sua arquitetura colonial bem preservada e ruas de pedra. Este Patrimônio Mundial da UNESCO é rico em cultura e história, oferecendo um mergulho no passado vibrante da cidade.", '/images/centro/centro1.png',-2.52919, -44.30630,1,1,1,0.0,now());

INSERT INTO pontos_turisticos(nome, descricao,imagem,latitude,longitude,cidade_id,status,e_publico,	valor_entrada,data_cadastro)
VALUES("Espigão ponta d'areia ", "O Espigão Ponta da Areia está situado em São Luís, Maranhão, com uma extensa faixa de areia e uma vista deslumbrante para o mar. É um excelente ponto para caminhadas, atividades ao ar livre e apreciação do pôr do sol.", '/images/espigao/espigao1.png',-2.52919, -44.30630,1,1,1,0.0,now());
