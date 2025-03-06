export function buildRoutePath(path) {
    // Expressão regular para capturar parâmetros dinâmicos na rota (por exemplo: :id)
    const regexParams = /:([a-zA-Z0-9\-_]+)/g;

    // Substitui os parâmetros dinâmicos com grupos nomeados da expressão regular
    const pathWithParams = path.replaceAll(regexParams, '(?<$1>[a-z0-9\-_]+)');

    // Adiciona o suporte para a query string e barra final opcional
    const pathRegex = new RegExp(`^${pathWithParams}(?:\\/)?(?:\\?([^#]*))?$`);

    return pathRegex;
}