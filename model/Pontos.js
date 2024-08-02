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
}

module.exports = Pontos;