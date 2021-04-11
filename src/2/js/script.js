var popupOpen = document.querySelector('.question__popup-open'); // селекторы для слушателей
var popupCloseButton = document.querySelector('.popup__modal-button2')
var popupWindow = document.querySelector('.popup__modal');

popupOpen.addEventListener('click', openPopup); // слушатель для открытия модального окна. Можно, возможно даже нужно убрать нахрен.
popupCloseButton.addEventListener('click', closePopupBtn); // слушатель для закртия от кнопки
popupWindow.addEventListener('click', closePopup);  // слушатель для закрытия по клику вне окна

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

// Территория дла Анимации если надо











































































//


// Территория дла Валидации











































































//
