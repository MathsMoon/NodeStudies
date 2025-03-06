import fs from 'node:fs/promises';

const databasePath = new URL('../db/db.json', import.meta.url);

export class Database {
    //a # neste caso é uma ferramenta do Node para tornar privado o acesso deste tipo de variável a todos que usam essa classe.
    #database = {}

    //Construtor mexe diretamente com o db.json
    constructor() {
        fs.readFile(databasePath, 'utf-8').then(data => {
            this.#database = JSON.parse(data);
        }).catch(() => {
            this.#persist();
        });
    }

    #persist() {
        fs.writeFile(databasePath, JSON.stringify(this.#database));
    }

    select(table, searh) {
        let data = this.#database[table] ?? [];
        
        //Procurando o usuário em específico caso necessário:
        if(searh){
            data = data.filter(row => {
                return Object.entries(searh).
                some(([key, value]) => {
                    return row[key].includes(value);
                })
            });
        }
        
        return data;
    }

    insert(table, data){
        //Inserindo o elemento dentro da tabela caso ela exista
        if(Array.isArray(this.#database[table])){
            this.#database[table].push(data);
        } else {
            this.#database[table] = [data];
        }

        //Metodo que escreve no db.json
        this.#persist();

        return data;
    }

    delete(table, id) {
        const rowIndex = this.#database[table].findIndex(row => row.id == id);

        if(rowIndex > -1){
            this.#database[table].splice(rowIndex,1);
            this.#persist();
        }
    }

    update(table, id, data) {
        const rowIndex = this.#database[table].findIndex(row => row.id == id);

        if(rowIndex > -1){
            this.#database[table][rowIndex] = {id, ...data};
            this.#persist();
        }
    }
}