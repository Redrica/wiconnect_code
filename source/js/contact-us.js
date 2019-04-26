$(document).ready(function () {
  $('.form__input[name="phone"]').mask('+0 (000) 000-0000');
});

(function () {
  const ESC_KEY = 27;
  const HEADER_BLUR = 'header--blur';
  const MAIN_BLUR = 'main--blur';
  const html = document.querySelector('html');
  const body = document.querySelector('body');
  const header = document.querySelector('.header');
  const main = document.querySelector('.main');
  const form = document.querySelector('.form');
  const popup = document.querySelector('.popup--submit');
  const closeButton = popup.querySelector('.submit__close');

  const blurPageWhilePopup = function () {
    header.classList.toggle(HEADER_BLUR);
    main.classList.toggle(MAIN_BLUR);
  };

  const onFormSubmit = function (evt) {
    evt.preventDefault();
    form.reset();
    popup.classList.remove('popup--closed');
    blurPageWhilePopup();
    html.classList.add('stop-scroll');
    body.classList.add('stop-scroll');
    closeButton.addEventListener('click', onPopupClose);
    popup.addEventListener('click', onPopupClose, false);
    window.addEventListener('keydown', onPopupEscClose);
  };

  const onPopupClose = function () {
    popup.classList.add('popup--closed');
    blurPageWhilePopup();
    html.classList.remove('stop-scroll');
    body.classList.remove('stop-scroll');
    closeButton.removeEventListener('click', onPopupClose);
    popup.removeEventListener('click', onPopupClose);
    window.removeEventListener('keydown', onPopupEscClose);
  };

  const onPopupEscClose = function (evt) {
    if (evt.keyCode === ESC_KEY) {
      onPopupClose();
    }
  };

  form.addEventListener('submit', onFormSubmit);
})();
