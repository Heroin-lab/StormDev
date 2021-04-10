var popupOpen = document.querySelector('.question__popup-open');
var popupCloseButton = document.querySelector('.popup__modal-button2')
var popupWindow = document.querySelector('.popup__modal');

popupOpen.addEventListener('click', openPopup);
popupCloseButton.addEventListener('click', closePopupBtn);
popupWindow.addEventListener('click', closePopup);

function openPopup() {
    popupWindow.style.display = 'flex';
}

function  closePopupBtn() {
    popupWindow.style.display = 'none';
}

function closePopup (e) {
    if (e.target == popupWindow) {
        popupWindow.style.display = 'none';
    }
}
