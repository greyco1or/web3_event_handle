import sqlite3 from "sqlite3";

async function InsertToDB(contract_address, token_id, type, before_owner, new_owner) {
    const db = new sqlite3.Database('.//eth.db', (err) => {
        if (err) {
            console.error(err.message);
        }
    })

    db.run('CREATE TABLE IF NOT EXISTS event(contract_address text, token_id text, type text, before_owenr text, new_owner text');

    db.run('INSERT INTO event (contract_address, token_id, type, before_owner, new_owenr) VALUES (?,?,?,?,?)', [contract_address, token_id, type, before_owner, new_owner]);
    db.close();
}

export default InsertToDB;