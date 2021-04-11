var createQuestion = document.querySelector('.popup__modal-button1');
var deletQuestion = document.querySelector('.project__delete-button');

createQuestion.addEventListener('click', questionCheckBoxes);

function postReq(body, url) {
    return new Promise(function(resolve,reject){
        xhr.open('POST', requestURL + url);
        xhr.onload = function(){
          return resolve(xhr.responseText);
        };
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(JSON.stringify(body));    
    });
}

var reqCounter = 0;  
var checkBoxArr = [];

function questionCheckBoxes(){
    var csvCheck = document.querySelector('.checkCsv').checked;
    var jsonCheck = document.querySelector('.checkJson').checked;
    var xmlCheck = document.querySelector('.checkXml').checked;
    var yamlCheck = document.querySelector('.checkYaml').checked;

    csvCheck === true ? csvCheck = 'addCsv' : csvCheck;
    jsonCheck === true ? jsonCheck = 'addJson' : jsonCheck;
    xmlCheck === true ? xmlCheck = 'addXml' : xmlCheck;
    yamlCheck === true ? yamlCheck = 'addYaml' : yamlCheck;
    checkBoxArr = [csvCheck, jsonCheck, xmlCheck, yamlCheck];
    questionCreate(checkBoxArr);
}

function questionCreate () {           
   setTimeout(function () {  
    var data = {
        id: 8,
        theme: "html",
        quesText: "New ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat. Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique, fuga consectetur itaque architecto blanditiis dolore ab quo iure laudantium nostrum, nam excepturi magni officia ex exercitationem illo. Deleniti, esse nam?",
        correctAnsw: "false",
    }
    if (checkBoxArr[reqCounter] !== false){
        postReq(data, checkBoxArr[reqCounter]);  
    }     
      reqCounter++;                
      if (reqCounter < 4) {          
        questionCreate();           
      } else if (reqCounter === 4){
          reqCounter = 0;
      }                      
   }, 100)
}

function queDel (val) {
    var extension = document.querySelector('.select').value;
    var data = {
        id: val,
    }
    postReq(data, 'del' + extension);
}
