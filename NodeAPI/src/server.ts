import fastify from 'fastify';
import { knex } from './database';

const app = fastify();

app.get('/', async () => {
    const tables = await knex('sqLite_schema').select('*');
    return tables;
});

app.listen({
    port: 3333
}).then(() => {
    console.log('Server is Running');
});