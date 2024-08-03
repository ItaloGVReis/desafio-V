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

const User = require('./model/User');
const Pontos = require('./model/Pontos');

app.get('/', (req, res) => {
    Pontos.getAttractionsIndex((err, results) => {
        if (err) {
            return res.status(500).send('Erro ao buscar pontos turísticos.');
        }
        res.render('index', { pontos: results });
    });
});

app.get('/users', (req, res) => {
    User.getAllUsers((users) => {
        res.json(users);
    });
});

app.get('/usuarios', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'users/index.html'));
});

app.get('/registrar', (req, res) => {
    res.sendFile(__dirname + '/views/users/create.html');
});

app.post('/adduser', (req, res) => {
    let newUser = new User(req.body.nome, req.body.email, req.body.senha);
    newUser.save((result) => {
        console.log('Usuário inserido com sucesso:', result);
        res.redirect('/usuarios');
    });
});

app.get('/user/:id', (req, res) => {
    User.getUserById(req.params.id, (user) => {
        res.json(user);
    });
});

app.post('/updateuser/:id', (req, res) => {
    let updatedData = {
        nome: req.body.nome,
        email: req.body.email,
        senha: req.body.senha
    };
    User.updateUserById(req.params.id, updatedData, (result) => {
        res.redirect('/usuarios');
    });
});

app.get('/delete/:id', (req, res) => {
    User.deleteUserById(req.params.id, (result) => {
        res.redirect('/usuarios');
    });
});

app.post('/login', (req, res) => {
    User.authenticate(req.body.email, req.body.senha, (isAuthenticated) => {
        if (isAuthenticated) {
            console.log('Usuário logado');
            res.redirect('/');
        } else {
            alert('Email ou senha inválidos');
        }
    });
});

// PONTOS TURISTICOS
app.get('/search', (req, res) => {
    const query = req.query.query;
    Pontos.search(query, (err, results) => {
        if (err) {
            console.error('Erro na busca:', err);
            return res.status(500).send('Erro no servidor');
        }
        res.render('attractions/results', { results });
    });
});

app.get('/attractions', (req, res) => {
    let sql = 'SELECT * FROM pontos_turisticos';
    db.query(sql, (err, results) => {
        if (err) throw err;
        console.log(results);
        res.json(results);
    });
});

app.get('/ponto', (req, res) => {
    const id = req.query.id;
    const sql = 'SELECT pontos_turisticos.*, cidades.nome as nome_cidade FROM pontos_turisticos inner join cidades on pontos_turisticos.cidade_id = cidades.id WHERE pontos_turisticos.id = ?';
    db.query(sql, [id], (err, result) => {
        if (err) throw err;
        if (result.length > 0) {
            res.render('attractions/ponto', { ponto: result[0] });
        } else {
            res.send('Ponto turístico não encontrado');
        }
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
