// create web server
// 1. load the http module
var http = require('http');
var fs = require('fs');
var url = require('url');
var queryString = require('querystring');
var comments = [];
// 2. create web server
var server = http.createServer(function (req, res) {
    // 2.1 set the content type
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    // 2.2 parse the url
    var urlObj = url.parse(req.url, true);
    var pathName = urlObj.pathname;
    // 2.3 handle different paths
    if (pathName === '/') {
        fs.readFile('./views/index.html', function (err, data) {
            if (err) {
                throw err;
            }
            res.end(data);
        });
    } else if (pathName === '/post') {
        fs.readFile('./views/post.html', function (err, data) {
            if (err) {
                throw err;
            }
            res.end(data);
        });
    } else if (pathName === '/comment') {
        // 2.3.1 get the comment
        var comment = urlObj.query;
        comment.dateTime = new Date();
        comments.push(comment);
        // 2.3.2 redirect to the home page
        res.statusCode = 302;
        res.setHeader('Location', '/');
        res.end();
    } else if (pathName === '/getComments') {
        // 2.3.3 return the comments
        var commentsStr = JSON.stringify(comments);
        res.end(commentsStr);
    } else {
        fs.readFile('./views/notFound.html', function (err, data) {
            if (err) {
                throw err;
            }
            res.end(data);
        });
    }
});
// 3. listen to the port
server.listen(3000, function () {
    console.log('server is running...');
});
// 4. create the static web server
// 4.1 load the http module
// 4.2 create the web server
// 4.3 listen to the port
// 4.4 handle different paths
// 4.5 set the content type
// 4.6 return the data
// 4.7 listen to the port
// 5. create the dynamic web server
// 5.1 handle