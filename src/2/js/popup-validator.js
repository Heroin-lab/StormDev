var popupOpen = document.querySelector('.question__popup-open'); // селекторы для слушателей
var popupXCLose = document.querySelector('.popup__close-button');
var popupWindow = document.querySelector('.popup__modal');
var succesCreate = document.querySelector('.popup__create-quest');
var succesWindow = document.querySelector('.popup__succes-create');
var createQuestion = document.querySelector('.popup__modal-button1');
var popupCloseButton = document.querySelector('.popup__modal-button2');
var textArea = document.querySelector('.popup__que');

popupOpen.addEventListener('click', openPopup); // слушатель для открытия модального окна. Можно, возможно даже нужно убрать нахрен.
popupXCLose.addEventListener('click', closePopupBtn); 
popupCloseButton.addEventListener('click', closePopupBtn); // слушатель для закртия от кнопки
popupWindow.addEventListener('mousedown', closePopup);  // слушатель для закрытия по клику вне окна
createQuestion.addEventListener('click', questionCheckBoxes);

var queValue;

function openPopup() {
    popupWindow.style.display = 'flex'; // Раскрывает окно (меняет его стиль с none на flex)
    succesCreate.style.display = 'flex';
    succesWindow.style.display = 'none';
}

function closePopupBtn() {
    popupWindow.style.display = 'none'; // закрывает окно кнопкой (меняет стиль на none)
}

function closePopup (e) {
    if (e.target == popupWindow) {
        popupWindow.style.display = 'none'; //Закрывает модалку при клике вне окна
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

function queDel(val) {
    succesCreate.style.display = 'none';
    popupWindow.style.display = 'flex';
    document.querySelector('.popup__question-delete').style.display = 'flex';

    queValue = val;
    var deleteQuestion = document.querySelector('.popup__modal-button-delete');
    var cancleDeleteWindow = document.querySelector('.popup__modal-button-close');
    cancleDeleteWindow.onclick = closePopupBtn;
    deleteQuestion.onclick = queDeleteAccept;
}

function queDeleteAccept () {
    var extension = document.querySelector('.select').value;
    var data = {
        id: queValue,
    }
    postReq(data, 'del' + extension);
    setTimeout(function (){
        reqCall();
        succesCreate.style.display = 'flex';
        popupWindow.style.display = 'none';
    }, 50);
}
