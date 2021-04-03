var requestURL = 'http://localhost:8080/';
var xhr = new XMLHttpRequest();
var result = [];


var getReq = function(url) {
    var result;
    xhr.open('GET', requestURL + url);
    xhr.onload = function() {
        result = JSON.parse(xhr.response);
        check(result);
    }
    xhr.send();
}

var check = function(arrObjects) {
    for (var i = 0; i < arrObjects.length; i++){
        var pattern = document.getElementById('sample').content;
        var copyHTML = document.importNode(pattern, true);
        copyHTML.querySelector(".project__title").textContent = arrObjects[i].theme;
        copyHTML.querySelector(".project__text").textContent = arrObjects[i].quesText;
        copyHTML.querySelector(".project__answer").textContent = arrObjects[i].correctAnsw;
        document.querySelector(".project").appendChild(copyHTML);
    } 
}

getReq('question');