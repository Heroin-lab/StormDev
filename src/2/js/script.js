var popupOpen = document.querySelector('.question__popup-open');
var popupWindow = document.querySelector('.popup__modal');

popupOpen.addEventListener('click', openPopup);
popupWindow.addEventListener('click', closePopup);

function openPopup() {
    popupWindow.style.display = 'flex';
}

function closePopup() {
    popupWindow.style.display = 'none';
}