const mysql = require('mysql');

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
});

class User {
    constructor(nome, email, senha, data_cadastro) {
        this.nome = nome;
        this.email = email;
        this.senha = senha;
        this.data_cadastro = data_cadastro || new Date();
    }

    static getAllUsers(callback) {
        let sql = 'SELECT * FROM usuarios';
        db.query(sql, (err, results) => {
            if (err) throw err;
            callback(results);
        });
    }

    static getUserById(id, callback) {
        let sql = 'SELECT * FROM usuarios WHERE id = ?';
        db.query(sql, [id], (err, result) => {
            if (err) throw err;
            callback(result[0]);
        });
    }

    save(callback) {
        let sql = 'INSERT INTO usuarios SET ?';
        db.query(sql, this, (err, result) => {
            if (err) throw err;
            callback(result);
        });
    }

    static updateUserById(id, userData, callback) {
        let sql = 'UPDATE usuarios SET ? WHERE id = ?';
        db.query(sql, [userData, id], (err, result) => {
            if (err) throw err;
            callback(result);
        });
    }

    static deleteUserById(id, callback) {
        let sql = 'DELETE FROM usuarios WHERE id = ?';
        db.query(sql, [id], (err, result) => {
            if (err) throw err;
            callback(result);
        });
    }

    static authenticate(email, senha, callback) {
        let sql = 'SELECT * FROM usuarios WHERE email = ? AND senha = ?';
        db.query(sql, [email, senha], (err, results) => {
            if (err) throw err;
            callback(results.length > 0);
        });
    }
}

module.exports = User;