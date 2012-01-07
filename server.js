var http = require('http');
var fs = require('fs');
var path = require('path');
 
http.createServer(function (request, response) {
 
    //console.log('request starting...');
     
    var filePath = '.' + request.url;
    if (filePath == './' || filePath == '.')
        filePath = '/fluid.html';
         
    var extname = path.extname(filePath);
    var contentType = 'text/html';
    switch (extname) {
        case '.js':
            contentType = 'text/javascript';
            break;
        case '.css':
            contentType = 'text/css';
            break;
				case '.less':
						contentType = 'text/css';
						break;
    }
     
    path.exists(filePath, function(exists) {
     
        if (exists) {
            fs.readFile(__dirname + filePath, function(error, content) {
                if (error) {
                    response.writeHead(500);
                    response.end();
                }
                else {
                    response.writeHead(200, { 'Content-Type': contentType });
                    response.end(content, 'utf-8');
                }
            });
        }
        else {
            response.writeHead(404);
            response.end(filePath);
        }
    });
     
}).listen(13465);
