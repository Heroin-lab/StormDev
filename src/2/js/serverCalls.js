var requestURL = 'http://localhost:8080/question/';
var xhr = new XMLHttpRequest();
var themeName = 'all';

var extensionFilter = document.querySelector('.select');
var themeFilter = document.querySelector('.theme');

themeFilter.addEventListener('change', selectTheme);
extensionFilter.addEventListener('change', reqCall);

var getReq = function(fileExtension) {
    var result;
    xhr.open('GET', requestURL + fileExtension);
    xhr.onload = function() {
        result = JSON.parse(xhr.response);
        if (fileExtension === 'json' || fileExtension === 'csv'){
            themeDecoder(result);
        } else if (fileExtension === 'xml'){
            xmlParser(result);
        } else if (fileExtension === 'yaml'){
            themeDecoder(result.questions);
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
    themeDecoder(buffer);
}

function reqCall() {
    console.log('reqCall work');
    var extensionName = '';
    switch(extensionFilter.value){
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

function selectTheme() {
    themeName = themeFilter.value;
    getReq(extensionFilter.value);  
}

function themeDecoder(serverRes){
    console.log(themeFilter.value);
    var container = [];
    for (var i = 0; i < serverRes.length; i++){
        if (themeName === 'all'){
            container = serverRes;
            break; 
        } else if (themeName === 'js' && serverRes[i].theme === 'js'){
            container.push(serverRes[i]);
        } else if (themeName === 'html' && serverRes[i].theme === 'html'){
            container.push(serverRes[i]);
        } else if (themeName === 'css' && serverRes[i].theme == 'css'){
            container.push(serverRes[i]);
        } else {
            console.log('error');
        }
    }
    templateParser(container);
};

function clearTemplate() {
    var count = document.querySelector('.project').childElementCount;
    for (var k = 0; k < count - 1; k++){
        parent = document.querySelector('.project');
        block = document.querySelector('.project__question-block');
        parent.removeChild(block);
    }
}

var templateParser = function(arrObjects) {
    clearTemplate();
    for (var i = 0; i < arrObjects.length; i++){
        var pattern = document.querySelector('.sample').content;
        var copyHTML = document.importNode(pattern, true);
        copyHTML.querySelector(".project__delete-button").value = arrObjects[i].id;
        copyHTML.querySelector(".project__title").textContent = arrObjects[i].theme;
        copyHTML.querySelector(".project__text").textContent = arrObjects[i].quesText;
        copyHTML.querySelector(".project__answer").textContent = arrObjects[i].correctAnsw;
        document.querySelector(".project").appendChild(copyHTML);
    } 
}

getReq('json');