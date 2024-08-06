const mysql = require('mysql2');

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT

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
        let sql = 'SELECT * FROM usuarios2';
        db.query(sql, (err, results) => {
            if (err) throw err;
            callback(results);
        });
    }

    static getUserById(id, callback) {
        let sql = 'SELECT * FROM usuarios2 WHERE id = ?';
        db.query(sql, [id], (err, result) => {
            if (err) throw err;
            callback(result[0]);
        });
    }

    save(callback) {
        let sql = 'INSERT INTO usuarios2 SET ?';
        db.query(sql, this, (err, result) => {
            if (err) throw err;
            callback(result);
        });
    }

    static updateUserById(id, userData, callback) {
        let sql = 'UPDATE usuarios2 SET ? WHERE id = ?';
        db.query(sql, [userData, id], (err, result) => {
            if (err) throw err;
            callback(result);
        });
    }

    static deleteUserById(id, callback) {
        let sql = 'DELETE FROM usuarios2 WHERE id = ?';
        db.query(sql, [id], (err, result) => {
            if (err) throw err;
            callback(result);
        });
    }

    static authenticate(email, senha, callback) {
        let sql = 'SELECT * FROM usuarios2 WHERE email = ? AND senha = ?';
        db.query(sql, [email, senha], (err, results) => {
            if (err) throw err;
            callback(results.length > 0);
        });
    }
}

module.exports = User;