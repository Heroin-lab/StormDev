var fs = require('fs');
var http = require('http');
var csv = require('csvtojson');
var yaml = require('js-yaml');

var xml2json = require('xml2js');
var xmlParser = new xml2json.Parser();

var { json } = require('body-parser')
var jsonParser = json();

var server = http.createServer(handlerRequest);
var host = 'localhost';
var PORT = 8080;
function handlerRequest(request,response){
  var headers = {
    'Access-Control-Allow-Origin':'*',
    'Access-Control-Allow-Methods': 'OPTIONS,POST,GET',
    'Access-Control-Max-Age': 250000, 
    'Access-Control-Allow-Headers': '*',
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
  if(request.url === '/question/json' && request.method === 'GET'){
    var data = fs.readFileSync('../allQuestions/question.json');
    response.writeHead(200,headers);
    response.end(data);
    return;
  }
  if(request.url === '/question/csv' && request.method === 'GET'){
    var data = '';
      csv({delimiter:';'})
        .fromFile('../allQuestions/question.csv')
        .then(function(jsonArr){
          data = JSON.stringify(jsonArr);
          response.writeHead(200,headers);
          response.end(data);
        });
    return;
  }
  if(request.url === '/question/xml' && request.method === 'GET'){
    var data = fs.readFile('../allQuestions/question.xml', function(err, data){
      xmlParser.parseString(data, function(err, result){
        data = JSON.stringify(result);
        response.writeHead(200,headers);
        response.end(data);
      })
    });
    return;
  }
  if(request.url === '/question/yaml' && request.method === 'GET'){
    var file = fs.readFileSync('../allQuestions/question.yaml');
    var data = JSON.stringify(yaml.load(file));
    response.writeHead(200,headers);
    response.end(data);
    return;
  }
}

console.log(`Server is running on http://${host}:${PORT}`);

server.listen(PORT);