import path from 'node:path';
import { Database } from './database.js';
import { randomUUID } from 'node:crypto';
import { buildRoutePath } from '../utils/build-route-path.js';

//Banco de dados improvisado
const database = new Database();

export const routes = [
    { //Home
        method: 'GET',
        path: buildRoutePath('/'),
        handler: (req, res) => {
            return res.end('Hello World!');
        }
    },
    { //Search Users
        method: 'GET',
        path: buildRoutePath('/users'),
        handler: (req, res) => {
            const { search } = req.query;
            const users = database.select('users', {
                name: search,
                email: search
            });
            
            return res.end(JSON.stringify(users));
        }
    },
    { // Create Users
        method: 'POST',
        path: buildRoutePath('/users'),
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
    },
    { //Delete Users
        method: 'DELETE',
        path: buildRoutePath('/users/:id'),
        handler: (req, res) => {
            const { id } = req.params;
            database.delete('users',id);

            return res.writeHead(204).end('Usuário Deletado');
        }
    },
    { // Update Users
        method: 'PUT',
        path: buildRoutePath('/users/:id'),
        handler: (req, res) => {
            const { id } = req.params;
            const { name, email } = req.body;

            database.update('users',id, {name, email});
            
            return res.writeHead(204).end('Usuário Atualizado');
        }
    },
    { //404 error
        method: 'ALL',
        path: '*',
        handler: (req, res) => {
            res.writeHead(404).end('PÁGINA NÃO ENCONTRADA!');
        }
    }
]