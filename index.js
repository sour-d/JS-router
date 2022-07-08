class Router {
  #routes;
  #defaultHandler;

  constructor(defaultHandler) {
    this.#routes = {
      GET: [],
      POST: []
    };
    this.#defaultHandler = defaultHandler;
  }

  GET(url, handler,) {
    this.#routes.GET.push({ method: 'GET', url, handler });
  }

  POST(url, handler,) {
    this.#routes.POST.push({ method: 'POST', url, handler });
  }

  #findRoute(url, method) {
    method = method.toUpperCase();
    return this.#routes[method].filter(route => route.url === url);
  }

  handle(request, response, session) {
    const routes = this.#findRoute(request.url.pathname, request.method);
    for (const route of routes) {
      if (route.method === request.method) {
        return route.handler(request, response, session);
      }
    }

    this.#defaultHandler(request, response, session);
  }
}

module.exports = { Router };
