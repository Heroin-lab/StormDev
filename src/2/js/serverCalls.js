var requestURL = 'http://localhost:8080/question/';
var xhr = new XMLHttpRequest();
var themeName = 'all';

var extensionFilter = document.querySelector('.select');
var themeFilter = document.querySelector('.theme');

themeFilter.addEventListener('change', selectTheme);
extensionFilter.addEventListener('change', reqCall);

var getReq = function(fileExtension) {
    return new Promise(function(resolve,reject){
    var result;
    xhr.open('GET', requestURL + fileExtension); // onreadystatechange
    xhr.onload = function() {
        result = JSON.parse(xhr.response);
        if (fileExtension === 'json' || fileExtension === 'csv'){
            checkForEmpty(result);
        } else if (fileExtension === 'xml'){
            xmlParser(result);
        } else if (fileExtension === 'yaml'){
            checkForEmpty(result.questions);
        }
        return resolve(xhr.responseText);
    }
    xhr.send();
    });
}
// Выбор файловой системы
function reqCall() {
    if (extensionFilter.value === 'json' || extensionFilter.value === 'csv' 
    || extensionFilter.value === 'xml' || extensionFilter.value === 'yaml') {
        getReq(extensionFilter.value);
        var config = {
            'theme':themeName,
            'extention': extensionFilter.value
        }
        localStorage.setItem('config',JSON.stringify(config));
    } else {
        console.log('Слыш! ТЕБЕ СЮДА НЕЛЬЗЯ');
    }
}
// Выбор темы
function selectTheme() {
    themeName = themeFilter.value;
    getReq(extensionFilter.value); 
    var config = {
        'theme':themeName,
        'extention': extensionFilter.value
    }
    localStorage.setItem('config',JSON.stringify(config));
}

function onload(){
    var config = JSON.parse(localStorage.getItem('config'))
    if(config){
        themeName = config.theme;
        themeFilter.value = config.theme;
        extensionFilter.value = config.extention
    }
}
document.addEventListener('DOMContentLoaded', onload);

// Парсер XML
var xmlParser = function(reqResult) {
    var objArrays = reqResult.quest;
    var buffer = [];
    if (objArrays !== undefined && objArrays !== `\n` && objArrays !== null && objArrays.length !== 0){
        for (var i = 0; i < objArrays.id.length; i++){
            xz = {
                id: objArrays.id[i],
                theme: objArrays.theme[i],
                quesText: objArrays.quesText[i],
                correctAnsw: objArrays.correctAnsw[i],
                date: objArrays.date[i],
            }
            buffer.push(xz);
        }
        checkForEmpty(buffer);
    } else {
        checkForEmpty(null);
    }
}

// Проверка на пустоту полученных данных
function checkForEmpty (resFromServ) {
    var queIfEmpty = document.querySelector('.if-empty');
    if (resFromServ !== null && resFromServ !== undefined && resFromServ.length !== 0 && typeof resFromServ !== 'string'){
        queIfEmpty.style.display = 'none';
        themeDecoder(resFromServ);
    } else  if (resFromServ === 'empty'){
        queIfEmpty.style.display = 'flex';
        clearTemplate();
    } else {
        queIfEmpty.style.display = 'flex';
        themeDecoder([]);
    }
}
// Расшифровщик тем
function themeDecoder(serverRes){
    var container = [];
    
    for (var i = 0; i < serverRes.length; i++){
        if (themeName === 'all'){
            container = serverRes;
            break; 
        } else if (serverRes[i].theme === themeName){
            container.push(serverRes[i]);
        } 
    }
    if (container.length !== 0){
        templateParser(container);
    } else {
        templateParser(container);
        checkForEmpty('empty');
    }
};
// Вывод всех вопросов
var templateParser = function(arrObjects) {
    clearTemplate();
    for (var i = 0; i < arrObjects.length; i++){
        var pattern = document.querySelector('.sample').content;
        var copyHTML = document.importNode(pattern, true);
        copyHTML.querySelector(".project__delete-button").value = arrObjects[i].id;
        copyHTML.querySelector(".project__title").textContent = arrObjects[i].theme;
        copyHTML.querySelector(".project__text").textContent = arrObjects[i].quesText;
        copyHTML.querySelector(".project__answer").textContent = arrObjects[i].correctAnsw;
        copyHTML.querySelector(".project__date").textContent = arrObjects[i].date;
        document.querySelector(".project").appendChild(copyHTML);
    } 
}
// Чистка окна
function clearTemplate() {
    var count = document.querySelector('.project').childElementCount;
    for (var k = 0; k < count - 1; k++){
        parent = document.querySelector('.project');
        block = document.querySelector('.project__question-block');
        parent.removeChild(block);
    }
}

if (JSON.parse(localStorage.getItem('config')) == null || JSON.parse(localStorage.getItem('config')) == undefined){
    getReq('json')
} else {
    getReq(JSON.parse(localStorage.getItem('config')).extention);
}