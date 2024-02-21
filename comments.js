// Create web server
// Create a web server that can accept requests for comments and post comments to the server. The server should be able to handle multiple requests at the same time. 
// The server should only accept requests to POST /comments and GET /comments. 
// The POST request should expect a body containing a JSON object in the following format: {comment: "This is a comment"}. 
// This object should be added to an array of comments. 
// The server should respond with a 201 status code if the comment is successfully added. 
// The GET request should respond with an array of comments in JSON format. 
// The server should respond to all requests with the appropriate status code. 
// If a request is made to a path that does not exist, the server should respond with a 404 status code.

const http = require('http');
const url = require('url');
const { parse } = require('querystring');

const comments = [];

const server = http.createServer((req, res) => {
  const { method, url: reqUrl } = req;
  const parsedUrl = url.parse(reqUrl, true);
  const { pathname } = parsedUrl;

  if (method === 'POST' && pathname === '/comments') {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });
    req.on('end', () => {
      const comment = parse(body).comment;
      comments.push(comment);
      res.writeHead(201);
      res.end();
    });
  } else if (method === 'GET' && pathname === '/comments') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(comments));
  } else {
    res.writeHead(404);
    res.end();
  }
});

server.listen(3000, () => {
  console.log('Server is running on port 3000');
});