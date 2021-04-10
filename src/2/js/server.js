var fs = require('fs');
var http = require('http');

var csv = require('csvtojson');
var ObjectsToCsv = require('objects-to-csv');
var yaml = require('js-yaml');

var xml2json = require('xml2js');
var obj2xml = require('object-to-xml');
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
      Object.assign(devs,request.body);
      fs.writeFileSync('developers.json', JSON.stringify(devs,null,'\t'));
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
      csv({delimiter:','})
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
  // if(request.url === '/question/add' && request.method === 'POST'){
  //   jsonParser(request,response,function(error){
  //     if(error){
  //       throw error;
  //     } 
  //     var devs = JSON.parse(fs.readFileSync('../allQuestions/question.json'));
  //     devs.push(request.body);
  //     fs.writeFileSync('../allQuestions/question.json', JSON.stringify(devs,null,'\t'));
  //     response.writeHead(200,headers);
  //     response.end('success');
  //   })
  // }
  // if(request.url === '/question/add' && request.method === 'POST'){
  //   jsonParser(request,response,function(error){
  //     if(error){
  //       throw error;
  //     } 
  //     var devs = '';
  //     csv({delimiter:','})
  //       .fromFile('../allQuestions/question.csv')
  //       .then(function(jsonArr){
  //         jsonArr.push(request.body);
  //         data = new ObjectsToCsv(jsonArr);
  //         data.toDisk('../allQuestions/question.csv');
  //       });
  //       response.writeHead(200,headers);
  //       response.end('success');
  //     return;
  //   })
  // if(request.url === '/question/add' && request.method === 'POST'){
  //   jsonParser(request,response,function(error){
  //     if(error){
  //       throw error;
  //     } 
  //     var data = fs.readFile('../allQuestions/question.xml', function(err, data){
  //       xmlParser.parseString(data, function(err, result){
  //       result.quest.id.push(`${request.body.id}`);
  //       result.quest.theme.push(request.body.theme);
  //       result.quest.quesText.push(request.body.quesText);
  //       result.quest.correctAnsw.push(`${request.body.correctAnsw}`);
  //       var xmldata = obj2xml(result);
  //       xmldata = "<?xml version='1.0' encoding='UTF-8' standalone='yes'?>" + xmldata;
  //       fs.writeFileSync('../allQuestions/question.xml', xmldata);
  //       })
  //     })
  //     response.writeHead(200,headers);
  //     response.end('success');
  //     return;
  //   })
}

console.log(`Server is running on http://${host}:${PORT}`);

server.listen(PORT);