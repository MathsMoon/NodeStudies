import http from 'node:http';
import { json } from './middleware/json.js';
import { routes } from './middleware/routes.js';

const server = http.createServer(async (req, res) => {
    const { method, url } = req;

    //Middleware que permite a leitura das informações de usuário JSON
    await json(req, res);

    /* Seção das Rotas do Servidor */
    
    // Procurando a rota dentre as que existem na routes:
    const route = routes.find(route => {
        return route.method === method && route.path === url;
    });

    //Caso encontre o handler cuidará da requisição:
    if(route) {
        route.handler(req, res);
    }

    //Caso contrário, retornará o err 404.
    return res.writeHead(404).end('ESTÁ PÁGINA NÃO EXISTE');
});


//Adicionando a porta 3333 para rodar o servidor:
server.listen(3333);