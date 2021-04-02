// const http = require('http');
// const host = 'localhost';
// const port = 8000;

// const requestListener = function (req, res) {
//     res.writeHead(200);
//     res.end();
// };

// const server = http.createServer(requestListener);
// server.listen(port, host, () => {
//     console.log(`Server is running on http://${host}:${port}`);
// });

var fs = require('fs');
var http = require('http');

var { json } = require('body-parser')
var jsonParser = json();

var server = http.createServer(handlerRequest);
var PORT = 8080;
function handlerRequest(request,response){
  var headers = {
    'Access-Control-Allow-Origin':'*',
    'Access-Control-Allow-Methods': 'OPTIONS,POST,GET',
    'Access-Control-Max-Age': 250000, 
    'Access-Control-Allow-Headers': '*'
  };
  if(request.method === 'OPTIONS'){
    response.writeHead(204,headers);
    response.end();
    return
  }
  if(request.url === '/developers' && request.method === 'GET'){
    var data = fs.readFileSync('developers.json');
    response.writeHead(200,headers);
    response.end(data);
    return;
  }
  if(request.url === '/developers' && request.method === 'POST'){
    jsonParser(request,response,function(error){
      if(error){
        throw error;
      } 
      var devs = JSON.parse(fs.readFileSync('developers.json'));
      var data = Object.assign(devs,request.body);
      fs.writeFileSync('developers.json', JSON.stringify(data,null,'\t'));
      response.writeHead(200,headers);
      response.end('success');
    })
  }
}
server.listen(PORT);