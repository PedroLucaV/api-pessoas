import { openDb } from '../configDB.js';

export async function createTable() {
    openDb().then(db => {
        db.exec('CREATE TABLE IF NOT EXISTS Pessoa ( id INTEGER PRIMARY KEY, nome TEXT, idade INTEGER )') //Create the SQLite table if don't exist
    })
};

export async function insert(pessoa) {
    openDb().then(db => {
        db.run('INSERT INTO Pessoa (nome, idade) VALUES (?,?)', [pessoa.nome, pessoa.idade]); //Create a new pessoa in the database
    })
};

export async function update(pessoa, id) {
    openDb().then(db => {
        db.run('UPDATE Pessoa SET nome=?, idade=? WHERE id=?', [pessoa.nome, pessoa.idade, id]); //Update a pessoa in the database based in id
    })
};

export async function select(pessoa) {
    return openDb().then(async db => {
        const res = await db.all('SELECT * FROM Pessoa'); //return all people in dataBase
        return res;
    })
};

export async function selectById(id) {
    return openDb().then(async db => {
        const res = await db.all('SELECT * FROM Pessoa WHERE id=?', [id]); 
        return res;
    })
};

export async function deletar(id){
    return openDb().then(async db => {
        const res = await db.all('DELETE FROM Pessoa WHERE id=?', [id]);
    })
}