(function () {
  const ESC_KEY = 27;
  const POPUP_CLOSED = 'popup--closed';
  const HEADER_BLUR = 'header--blur';
  const MAIN_BLUR = 'main--blur';
  const header = document.querySelector('.header');
  const main = document.querySelector('.main');
  const loginPopup = document.querySelector('.popup--login');
  const closePopup = document.querySelector('.login__close');
  const openPopup = document.querySelector('.header__login--not-logged');

  const blurPageWhilePopup = function () {
    header.classList.toggle(HEADER_BLUR);
    main.classList.toggle(MAIN_BLUR);
  };

  const onClickClosePopup = function () {
    loginPopup.classList.add(POPUP_CLOSED);
    blurPageWhilePopup();
    document.removeEventListener('keydown', onEscClosePopup);
    if (!window.util.mobileWidth.matches) {
      window.util.blockContentScroll();
    }
  };

  const onEscClosePopup = function (evt) {
    if (evt.keyCode === ESC_KEY) {
      onClickClosePopup();
    }
  };

  const onClickOpenPopup = function (evt) {
    evt.preventDefault();
    loginPopup.classList.remove(POPUP_CLOSED);
    blurPageWhilePopup();
    if (!window.util.mobileWidth.matches) {
      window.util.blockContentScroll();
    }
    document.addEventListener('keydown', onEscClosePopup);
  };

  if (openPopup) {
    openPopup.addEventListener('click', onClickOpenPopup);
  }

  closePopup.addEventListener('click', onClickClosePopup);

})();
