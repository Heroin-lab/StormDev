var fs = require('fs');
var http = require('http');

var csv = require('csvtojson');
var ObjectsToCsv = require('objects-to-csv');
var yaml = require('js-yaml');

var xml2json = require('xml2js');
var obj2xml = require('object-to-xml');
var xmlParser = new xml2json.Parser();

var { json } = require('body-parser');
const { longStackTraces } = require('bluebird');
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
    var data = fs.readFileSync('../../1/backend/developers.json');
    response.writeHead(200,headers);
    response.end(data);
    return;
  }

  if(request.url === '/developers' && request.method === 'POST'){
    jsonParser(request,response,function(error){
      if(error){
        throw error;
      } 
      var devs = JSON.parse(fs.readFileSync('../../1/backend/developers.json'));
      Object.assign(devs,request.body);
      fs.writeFileSync('../../1/backend/developers.json', JSON.stringify(devs,null,'\t'));
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

  if(request.url === '/question/addJson' && request.method === 'POST'){
    jsonParser(request,response,function(error){
      if(error){
        throw error;
      } 
      var devs = JSON.parse(fs.readFileSync('../allQuestions/question.json'));
      request.body.id = devs.length + 1;
      devs.push(request.body);
      fs.writeFileSync('../allQuestions/question.json', JSON.stringify(devs,null,'\t'));
      response.writeHead(200,headers);
      response.end('success');
    })
  }

  if(request.url === '/question/addCsv' && request.method === 'POST'){
    jsonParser(request,response,function(error){
      if(error){
        throw error;
      } 
      csv({delimiter:','})
        .fromFile('../allQuestions/question.csv')
        .then(function(jsonArr){
          request.body.id = jsonArr.length + 1;
          jsonArr.push(request.body);
          data = new ObjectsToCsv(jsonArr);
          data.toDisk('../allQuestions/question.csv');
        });
        response.writeHead(200,headers);
        response.end('success');
      return;
    })
  }
  
  if(request.url === '/question/addXml' && request.method === 'POST'){
    jsonParser(request,response,function(error){
      if(error){
        throw error;
      } 
      var data = fs.readFileSync('../allQuestions/question.xml');
        xmlParser.parseString(data, function(err, result){
        if (result.quest === '\n' || result.quest === undefined){
          result.quest = {id: [], theme: [], quesText: [], correctAnsw: [], date: []};
        } 
        result.quest.id.push(`${result.quest.id.length + 1}`);
        result.quest.theme.push(request.body.theme);
        result.quest.quesText.push(request.body.quesText);
        result.quest.correctAnsw.push(`${request.body.correctAnsw}`);
        result.quest.date.push(request.body.date);
        var xmldata = obj2xml(result);
        xmldata = "<?xml version='1.0' encoding='UTF-8' standalone='yes'?>" + xmldata;
        fs.writeFileSync('../allQuestions/question.xml', xmldata);
      })
      response.writeHead(200,headers);
      response.end('success');
      return;
    })
  }

  if(request.url === '/question/addYaml' && request.method === 'POST'){
    jsonParser(request,response,function(error){
      if(error){
        throw error;
      }
    var file = fs.readFileSync('../allQuestions/question.yaml');
    var id = yaml.load(file).questions;
    if (id === null || id === undefined){
          var data = 
    `\n    - id: ${1}
      theme: ${request.body.theme}
      quesText: '${request.body.quesText}'
      correctAnsw: ${request.body.correctAnsw}
      date: ${request.body.date}`;  
    } else {
          var data = 
    `\n    - id: ${id.length + 1}
      theme: ${request.body.theme}
      quesText: '${request.body.quesText}'
      correctAnsw: ${request.body.correctAnsw}
      date: ${request.body.date}`;
    }
        file += data
        fs.writeFileSync('../allQuestions/question.yaml', file);
    response.writeHead(200,headers);
    response.end('success');
    return;
    });
  }

  if(request.url === '/question/deljson' && request.method === 'POST'){
    jsonParser(request,response,function(error){
      if(error){
        throw error;
      } 
    var data = JSON.parse(fs.readFileSync('../allQuestions/question.json'));
    for (var i = 0; i < data.length; i++){
      if (data[i].id == request.body.id){
        data.splice(i, 1);
      }
    }
    fs.writeFileSync('../allQuestions/question.json', JSON.stringify(data,null,'\t'));
    response.writeHead(200,headers);
    response.end('success');
    return;
    });
  }

  if(request.url === '/question/delcsv' && request.method === 'POST'){
    jsonParser(request,response,function(error){
      if(error){
        throw error;
      } 

    var data = '';
    csv({delimiter:','})
      .fromFile('../allQuestions/question.csv')
      .then(function(jsonArr){
        data = jsonArr;

        for (var i = 0; i < data.length; i++){
          if (data[i].id == request.body.id){
            data.splice(i, 1);
          }
        }
  
        data = new ObjectsToCsv(data);
        data.toDisk('../allQuestions/question.csv');
      });
    response.writeHead(200,headers);
    response.end('success');
    return;
    });
  }

  if(request.url === '/question/delxml' && request.method === 'POST'){
    jsonParser(request,response,function(error){
      if(error){
        throw error;
      }
    var data = fs.readFileSync('../allQuestions/question.xml');
        xmlParser.parseString(data, function(err, result){
          file = result;
          for (var i = 0; i < file.quest.id.length; i++){
            if (file.quest.id[i] == request.body.id){
              file.quest.id.splice(i, 1);
              file.quest.theme.splice(i, 1);
              file.quest.quesText.splice(i, 1);
              file.quest.correctAnsw.splice(i, 1);
              file.quest.date.splice(i, 1);
            }
          }
        var xmldata = obj2xml(file);
        xmldata = "<?xml version='1.0' encoding='UTF-8' standalone='yes'?>" + xmldata;
        fs.writeFile('../allQuestions/question.xml', xmldata, function(){});
      }) 
    response.writeHead(200,headers);
    response.end('success');
    return;
    });
  }

  if(request.url === '/question/delyaml' && request.method === 'POST'){
    jsonParser(request,response,function(error){
      if(error){
        throw error;
      } 
    var yamlWriter = `---
  questions:`;
    var file = fs.readFileSync('../allQuestions/question.yaml');
    var data = yaml.load(file);
    for (var i = 0; i < data.questions.length; i++){
      if (data.questions[i].id == request.body.id){
        
      } else { yamlWriter +=
        `\n    - id: ${data.questions[i].id}
      theme: ${data.questions[i].theme}
      quesText: '${data.questions[i].quesText}'
      correctAnsw: ${data.questions[i].correctAnsw}
      date: '${data.questions[i].date}' `;
      }
    }
    fs.writeFileSync('../allQuestions/question.yaml', yamlWriter);
    response.writeHead(200,headers);
    response.end('success');
    return;
    });
  }
}
console.log(`Server is running on http://${host}:${PORT}`);

server.listen(PORT);