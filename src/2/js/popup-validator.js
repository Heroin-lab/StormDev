var popupOpen = document.querySelector('.question__popup-open'); // селекторы для слушателей
var popupXCLose = document.querySelector('.popup__close-button');
var popupWindow = document.querySelector('.popup__modal');
var succesCreate = document.querySelector('.popup__create-quest');
var succesWindow = document.querySelector('.popup__succes-create');
var createQuestion = document.querySelector('.popup__modal-button1');
var popupCloseButton = document.querySelector('.popup__modal-button2');
var textArea = document.querySelector('.popup__que');
var popupDeleteWindow = document.querySelector('.popup__question-delete');

var csvCheck = document.querySelector('.checkCsv');
var jsonCheck = document.querySelector('.checkJson');
var xmlCheck = document.querySelector('.checkXml');
var yamlCheck = document.querySelector('.checkYaml');

popupOpen.addEventListener('click', openPopup); 
popupXCLose.addEventListener('click', closePopupBtn); 
popupCloseButton.addEventListener('click', closePopupBtn);
popupWindow.addEventListener('mousedown', closePopup);  
createQuestion.addEventListener('click', questionCheckBoxes);

var queValue;

function openPopup() {
    popupWindow.style.display = 'flex'; 
    succesCreate.style.display = 'flex';
    succesWindow.style.display = 'none';
    setCheckBox();
    animationPopup();
}

function animationPopup() {
    var window = document.querySelector('.popup__create-quest');
    popupWindow.style.backgroundColor = 'rgba(0, 0, 0, 0)'
    pos = 950;
    opacity = 0;
    var animate = setInterval(frame, 10);
    function frame() {
        if (pos > 0){
            pos -= 30;
            window.style.bottom = pos + 'px';
        } else if (pos < 0){
            pos += 20;
            window.style.bottom = pos + 'px';
        } else {
            clearInterval(animate);
        }
        if (opacity <= 0.5){
            opacity += 0.01;
            popupWindow.style.backgroundColor = `rgba(0,0,0,${opacity})`
        }
    }
}

function setCheckBox() {
    var extension = document.querySelector('.select').value;
    extension += 'Check';
    
    extension === 'jsonCheck' ? jsonCheck.checked = true : jsonCheck.checked = false;
    extension === 'csvCheck' ? csvCheck.checked = true : csvCheck.checked = false;
    extension === 'xmlCheck' ?  xmlCheck.checked = true : xmlCheck.checked = false;
    extension === 'yamlCheck' ? yamlCheck.checked = true : yamlCheck.checked = false;
}

function closePopupBtn() {
    popupDeleteWindow.style.display = 'none';
    document.querySelector('.popup__create-quest').style.bottom = '920px';
    popupWindow.style.display = 'none'; 
    setCheckBox()
}

function closePopup (e) {
    if (e.target == popupWindow) {
        popupWindow.style.display = 'none'; 
        document.querySelector('.popup__create-quest').style.bottom = '920px';
        popupDeleteWindow.style.display = 'none';
        setCheckBox()
    }
}


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
    validator(checkBoxArr);
}

function validator (arr) {
    var textAlert = document.querySelector('.popup__modal-alert');
    if(textArea.value.replace(/\s/g,"") == ""){
        textAlert.innerHTML = 'Error: Empty question block!';
        setTimeout(function(){
            textAlert.innerHTML = '';
        }, 3000);
    } else if (arr[0] === false && arr[1] === false 
            && arr[2] === false && arr[3] === false) {
        textAlert.innerHTML = 'Error: Choose the file system!';
        setTimeout(function(){
            textAlert.innerHTML = '';
        }, 3000);
    } else {
        questionCreate();
        succesCreation();
    }
}
// очистка модального окна и вывод модалки с успехом
function succesCreation() {
    document.querySelector('.checkCsv').checked = false;
    document.querySelector('.checkJson').checked = false;
    document.querySelector('.checkXml').checked = false;
    document.querySelector('.checkYaml').checked = false;

    succesCreate.style.display = 'none';
    succesWindow.style.display = 'flex';
    setTimeout(function(){
        textArea.value = '';
    }, 500)
    setTimeout(function(){
        succesWindow.style.display = 'none';
        closePopupBtn();
    }, 1000)
}

// открытие окна
function queDel(val) {
    succesCreate.style.display = 'none';
    popupWindow.style.display = 'flex';
    popupDeleteWindow.style.display = 'flex';

    queValue = val;
    var deleteQuestion = document.querySelector('.popup__modal-button-delete');
    var cancleDeleteWindow = document.querySelector('.popup__modal-button-close');
    cancleDeleteWindow.onclick = closePopupBtn;
    deleteQuestion.onclick = queDeleteAccept;
}
// отправка запроса на сервер
function queDeleteAccept () {
    var extension = document.querySelector('.select').value;
    var data = {
        id: queValue,
    }
    postReq(data, 'del' + extension);
    setTimeout(function (){
        reqCall(); // get ServerCalls 30 str
        closePopupBtn();
    }, 50);
}
