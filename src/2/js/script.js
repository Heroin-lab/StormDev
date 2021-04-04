var requestURL = 'http://localhost:8080/question/';
var xhr = new XMLHttpRequest();


var getReq = function(fileExtension) {
    var result;
    xhr.open('GET', requestURL + fileExtension);
    xhr.onload = function() {
        result = JSON.parse(xhr.response);
        if (fileExtension === 'json' || fileExtension === 'csv'){
            templateParser(result);
        } else if (fileExtension === 'xml'){
            xmlParser(result);
        } else if (fileExtension === 'yaml'){
            templateParser(result.questions);
        }
    }
    xhr.send();
}

var xmlParser = function(reqResult) {
    var objArrays = reqResult.quest;
    var buffer = [];
    for (var i = 0; i < objArrays.id.length; i++){
        xz = {
            id: objArrays.id[i],
            theme: objArrays.theme[i],
            quesText: objArrays.quesText[i],
            correctAnsw: objArrays.correctAnsw[i],
        }
        buffer.push(xz);
    }
    templateParser(buffer);
}

var templateParser = function(arrObjects) {
    for (var i = 0; i < arrObjects.length; i++){
        var pattern = document.querySelector('.sample').content;
        var copyHTML = document.importNode(pattern, true);
        copyHTML.querySelector(".project__title").textContent = arrObjects[i].theme;
        copyHTML.querySelector(".project__text").textContent = arrObjects[i].quesText;
        copyHTML.querySelector(".project__answer").textContent = arrObjects[i].correctAnsw;
        document.querySelector(".project").appendChild(copyHTML);
    } 
}

var fileSystem = document.querySelector('.select');

fileSystem.addEventListener('change', reqCall);

function reqCall() {
    var extensionName = '';
    clearTemplate();
    switch(fileSystem.value){
        case 'json': extensionName = 'json'
        break;

        case 'csv': extensionName = 'csv'
        break;

        case 'xml': extensionName = 'xml'
        break;

        case 'yaml': extensionName = 'yaml'
        break;

        default: 'json'
            break;
    }
    getReq(extensionName);
}

function clearTemplate() {
    var parent = document.querySelector('.project');
    var block = document.querySelector('.project__question-block');
    parent.removeChild(block);
}

getReq('json');