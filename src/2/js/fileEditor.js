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

function getDate() {
    var date = new Date();
    var d = date.getDate();
    var m = date.getMonth();
    var y = date.getFullYear();
    var h = date.getHours();
    var mi = date.getMinutes();
    // mi < 10 ? '0' += mi : mi;
    return `${d}.0${m}.${y} ${h}:${mi}`
}

function questionCreate () {           
   setTimeout(function () {  
    var data = {
        id: 0,
        theme: document.querySelector('.popup_theme-select').value,
        quesText: document.querySelector('.popup__que').value,
        correctAnsw: radioStatus,
        date: getDate(),
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
