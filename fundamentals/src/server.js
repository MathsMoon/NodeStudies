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
        return route.method === method && route.path.test(url);
    });

    //Caso encontre o handler cuidará da requisição:
    if (route) {
        const routeParams = req.url.match(route.path);
    
        console.log(routeParams);

        const { query, ...params } = routeParams.groups;
        req.params = params;
        req.query = query ? extractQueryParams(query) : {};

        //Direcionando a rota para o handler certo:
        route.handler(req, res);
    }
});


//Adicionando a porta 3333 para rodar o servidor:
server.listen(3333);