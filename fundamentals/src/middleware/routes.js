import { Database } from './database.js';
import { randomUUID } from 'node:crypto';

//Banco de dados improvisado
const database = new Database();

export const routes = [
    {
        method: 'GET',
        path: '/users',
        handler: (req, res) => {
            const users = database.select('users');
            return res.end(JSON.stringify(users));
        }
    },
    {
        method: 'GET',
        path: '/',
        handler: (req, res) => {
            return res.end('Hello World!');
        }
    },
    {
        method: 'POST',
        path: '/users',
        handler: (req, res) => {
        //Separando os itens para criar o usuário.
        const { name, email } = req.body;
        
        const user = {
            id: randomUUID(),
            name,
            email
        };

        //Inserindo a informação no DB.
        database.insert('users', user);

        //Retornando o HTTP Code 201 para indicar que o usuário foi criado
        return res.writeHead(201).end('Usuário Criado');
        }
    }
]