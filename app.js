const http = require('http');
const {
    mainRouteController,
    gameRouteController,
    defaultRouteController,
    voteRouteController,
} = require('./controllers');


const server = http.createServer((req, res) => {
    const url = req.url;
    switch (url) {
        case "/":
            mainRouteController(res, "/index.html", ".html");
            break;
        case "/game":
            gameRouteController(res);
            break;
        case "/vote":
            voteRouteController(req, res);
            break;
        default:
            defaultRouteController(res, url);
            break;
    }
});

server.listen(3005);