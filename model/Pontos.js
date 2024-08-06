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

class Pontos {
    static search(cityOrPointName, callback) {
        const query = `
            SELECT p.* FROM pontos_turisticos p
            JOIN cidades c ON p.cidade_id = c.id
            WHERE (c.nome LIKE ? OR p.nome LIKE ?) AND p.status = 1;
        `;
        db.query(query, [`%${cityOrPointName}%`, `%${cityOrPointName}%`], (err, results) => {
            if (err) {
                return callback(err, null);
            }
            callback(null, results);
        });
    }

    static getAttractionsIndex(callback) {
        const sql = 'SELECT * FROM pontos_turisticos WHERE status = 1 ORDER BY RAND() LIMIT 6';
        db.query(sql, callback);
    }
}

module.exports = Pontos;