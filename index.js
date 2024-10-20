const http = require('http');

const server = http.createServer((request, response) => {
    switch (request.method) {
        case 'GET':
            return handleGetRequest(request, response);
        case 'POST':
            response.writeHead(200, { 'Content-Type': 'application/json' });
            response.end(JSON.stringify({ message: 'POST request received' }));
            break;
        case 'PUT':
            response.writeHead(200, { 'Content-Type': 'application/json' });
            response.end(JSON.stringify({ message: 'PUT request received' }));
            break;
        case 'DELETE':
            response.writeHead(200, { 'Content-Type': 'application/json' });
            response.end(JSON.stringify({ message: 'DELETE request received' }));
            break;
        default:
            response.writeHead(404, { 'Content-Type': 'application/json' });
            response.end(JSON.stringify({ message: 'Method not implemented' }));
            break;
    }
});

server.listen(3000, () => {
    const { address, port } = server.address();

    // :: = localhost
    console.log(`Server is listening on: http://${address}:${port}`);
});

const handleGetRequest = (request, response) => {
    const url = new URL(request.url, `http://${request.headers.host}`);

    switch (url.pathname) {
        case '/customers':
            response.writeHead(200, { 'Content-Type': 'application/json' });
            response.end(JSON.stringify({ message: 'GET request received on /customers' }));
            return;
        case '/orders':
            response.writeHead(200, { 'Content-Type': 'application/json' });

            if(url.searchParams.has('id')) {
                response.end(JSON.stringify({ message: `GET request received on /orders with id ${url.searchParams.get('id')}` }));
                return;
            } else {
                response.end(JSON.stringify({ message: 'GET request received on /orders' }));
                return;
            }
        default:
            response.writeHead(404, { 'Content-Type': 'application/json' });
            response.end(JSON.stringify({ message: 'Path not found' }));
            return
    }
};