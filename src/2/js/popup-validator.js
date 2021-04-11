var popupOpen = document.querySelector('.question__popup-open'); // селекторы для слушателей
var popupCloseButton = document.querySelector('.popup__modal-button2')
var popupWindow = document.querySelector('.popup__modal');
var createQuestion = document.querySelector('.popup__modal-button1');


popupOpen.addEventListener('click', openPopup); // слушатель для открытия модального окна. Можно, возможно даже нужно убрать нахрен.
popupCloseButton.addEventListener('click', closePopupBtn); // слушатель для закртия от кнопки
popupWindow.addEventListener('click', closePopup);  // слушатель для закрытия по клику вне окна
createQuestion.addEventListener('click', questionCheckBoxes);

function openPopup() {
    popupWindow.style.display = 'flex'; // Раскрывает окно (меняет его стиль с none на flex)
}

function  closePopupBtn() {
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
    var textArea = document.querySelector('.popup__que').value;
    var textAlert = document.querySelector('.popup__modal-alert');
    
    if(textArea.replace(/\s/g,"") == ""){
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
        // popupWindow.innerHTML = `<div class="popup__modal-window" style="height: 100px; justify-content: center; padding: 0;">
        //                             <p class="popup__modal-question" style="font-size: 20px; color: #009e08;">Question successfully created</p>
        //                         </div>`;
        // setTimeout(function () {
        //     closePopupBtn();
        // },2000)
    }
}
