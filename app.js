const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'turistando'
});

db.connect(err => {
    if (err) {
        throw err;
    }
    console.log('Conetado ao banco de dados');
});

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/index.html');
});

// ROTAS USUARIOS
app.get('/users', (req, res) => {
    let sql = 'SELECT * FROM usuarios';
    db.query(sql, (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

app.get('/usuarios', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'users/index.html'));
});

app.get('/registrar', (req, res) => {
    res.sendFile(__dirname + '/views/users/create.html');
});

app.post('/adduser', (req, res) => {
    console.log('Dados recebidos:', req.body);
    let user = {
        nome: req.body.nome,
        email: req.body.email,
        senha: req.body.senha,
        data_cadastro: new Date()
    };
    let sql = 'INSERT INTO usuarios SET ?';

    db.query(sql, user, (err, result) => {
        if (err) {
            console.error('Erro ao inserir usuário:', err);
            return res.status(500).send('Erro no servidor');
        }
        console.log('Usuário inserido com sucesso:', result);
        res.redirect('/usuarios');
    });
});
app.get('/update/:id', (req, res) => {
    res.sendFile(__dirname + '/views/users/update.html');
});

app.get('/user/:id', (req, res) => {
    let sql = `SELECT * FROM usuarios WHERE id = ${req.params.id}`;
    db.query(sql, (err, result) => {
        if (err) throw err;
        res.json(result[0]);
    });
});

app.post('/updateuser/:id', (req, res) => {
    let sql = `UPDATE usuarios SET nome = '${req.body.nome}', email = '${req.body.email}', senha = '${req.body.senha}' WHERE id = ${req.params.id}`;
    db.query(sql, (err, result) => {
        if (err) throw err;
        res.redirect('/usuarios');
    });
});

app.get('/delete/:id', (req, res) => {
    let sql = `DELETE FROM usuarios WHERE id = ${req.params.id}`;
    db.query(sql, (err, result) => {
        if (err) throw err;
        res.redirect('/usuarios');
    });
});
app.post('/login', (req, res) => {
    const email = req.body.email;
    const senha = req.body.senha;

    const sql = 'SELECT * FROM usuarios WHERE email = ? AND senha = ?';
    db.query(sql, [email, senha], (err, results) => {
        if (err) {
            console.error('Erro ao buscar usuário:', err);
            return res.status(500).send('Erro no servidor');
        }

        if (results.length > 0) {
            console.log('Usuário logado');
            return res.send('Usuário logado');
        } else {
            console.log('Usuário não encontrado:', { email, senha });
            return res.send('Usuário não encontrado');
        }
    });
});

// PONTOS TURISTICOS
app.get('/attractions', (req, res) => {
    let sql = 'SELECT * FROM pontos_turisticos';
    db.query(sql, (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

app.get('/pontos_turisticos', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'attractions/index.html'));
});

app.get('/pontos_turisticos/cadastrar', (req, res) => {
    res.sendFile(__dirname + '/views/attractions/create.html');
});

app.post('/pontos_turisticos/adicionar', (req, res) => {
    let attractions = { 
        nome: req.body.nome, 
        descricao: req.body.descricao, 
        imagem: req.body.imagem, 
        latitude: req.body.latitude, 
        longitude: req.body.longitude, 
        cidade_id: req.body.cidade_id, 
        status: req.body.status, 
        e_publico: req.body.e_publico, 
        valor_entrada: req.body.valor_entrada, 
        data_cadastro: new Date() 
    };
    let sql = 'INSERT INTO pontos_turisticos SET ?';
    db.query(sql, attractions, (err, result) => {
        if (err) throw err;
        res.redirect('/pontos_turisticos');
    });
});

app.get('/pontos_turisticos/update/:id', (req, res) => {
    res.sendFile(__dirname + '/views/attractions/update.html');
});

app.get('/pontos_turisticos/:id', (req, res) => {
    let sql = `SELECT * FROM pontos_turisticos WHERE id = ${req.params.id}`;
    db.query(sql, (err, result) => {
        if (err) throw err;
        res.json(result[0]);
    });
});

app.post('/pontos_turisticos/update/:id', (req, res) => {
    let sql = `UPDATE pontos_turisticos SET nome = '${req.body.nome}', email = '${req.body.email}', senha = '${req.body.senha}' WHERE id = ${req.params.id}`;
    db.query(sql, (err, result) => {
        if (err) throw err;
        res.redirect('/pontos_turisticos');
    });
});

app.get('/pontos_turisticos/delete/:id', (req, res) => {
    let sql = `DELETE FROM pontos_turisticos WHERE id = ${req.params.id}`;
    db.query(sql, (err, result) => {
        if (err) throw err;
        res.redirect('/pontos_turisticos');
    });
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
