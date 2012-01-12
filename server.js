require('coffee-script');
var http = require('http');
var fs = require('fs');
var path = require('path');
var connect = require('connect');
var boxy = require('boxy');

var server = connect.createServer();
server.use(connect.favicon());
server.use(connect.static(__dirname + '/public'));
server.use(connect.bodyParser());

server.use(connect.router(function(server){
  server.get('/', function(req, res, next){
    var filePath = 'fluid.html';
    path.exists(filePath, function(exists) {
      if (exists) {
        fs.readFile(filePath, function(error, content) {
          if (error) {
            res.writeHead(500);
            res.end();
          } else {
            res.writeHead(200);
            res.end(content, 'utf-8');
          }
        });
      } else {
        res.writeHead(404);
        res.end(filePath);
      }
    });
  });
  server.post('/boxy', function(req, res, next){
    boxy.exeCoffee(req.body.code, {}, function(result){
      if(result.status == 'ok') {
        console.log(result.sandbox);
      } else {
        console.log(result.error);
      }
      return result;
    });
  });
}));

server.listen(13465);