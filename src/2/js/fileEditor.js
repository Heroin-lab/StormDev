var deletQuestion = document.querySelector('.project__delete-button');
var radioButtons = document.querySelector('.radio-True');

var reqCounter = 0;  
var checkBoxArr = [];
var radioStatus = "false";

radioButtons.addEventListener('change', changeRadio);

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

function changeRadio(status){
    status === "false" ? radioStatus = "false" : radioStatus = "true"
}

function questionCreate () {           
   setTimeout(function () {  
    var data = {
        id: 0,
        theme: document.querySelector('.popup_theme-select').value,
        quesText: document.querySelector('.popup__que').value,
        correctAnsw: radioStatus,
    }
    if (checkBoxArr[reqCounter] !== false){
        postReq(data, checkBoxArr[reqCounter]);  
    }     
      reqCounter++;                
      if (reqCounter < 4) {          
        questionCreate();           
      } else if (reqCounter === 4){
          reqCounter = 0;
          setTimeout(function(){
              reqCall();
          }, 100);
      }                      
   }, 100)
}

function queDel (val) {
    var extension = document.querySelector('.select').value;
    var data = {
        id: val,
    }
    postReq(data, 'del' + extension);
    setTimeout(function (){
        reqCall();
    }, 50);
}
