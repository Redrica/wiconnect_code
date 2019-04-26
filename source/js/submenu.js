/*
(function () {
  const SUB_OPENED = 'main-menu__submenu--opened';
  const MENU_CLASS_UNDERLINE = 'header__header-sub';
  const header = document.querySelector('.header');
  const servLink = document.querySelector('.main-menu__link--serve');
  const servSub = document.querySelector('.main-menu__link--serve ~ .main-menu__submenu');
  const offerLink = document.querySelector('.main-menu__link--offer');
  const offerSub = document.querySelector('.main-menu__link--offer ~ .main-menu__submenu');
  const menuLinksNotOffer = document.querySelectorAll('.main-menu__link:not(.main-menu__link--offer):not(.main-menu__link--sub)');
  const menuLinksNotService = document.querySelectorAll('.main-menu__link:not(.main-menu__link--service):not(.main-menu__link--sub)');

  if (!window.util.mobileWidth.matches) {

    for (let i = 0; i < menuLinksNotOffer.length; i++) {
      menuLinksNotOffer[i].addEventListener('mouseover', function () {
        offerSub.classList.remove(SUB_OPENED);
      });
    }

    for (let i = 0; i < menuLinksNotService.length; i++) {
      menuLinksNotService[i].addEventListener('mouseover', function () {
        servSub.classList.remove(SUB_OPENED);
      });
    }

    servLink.addEventListener('mouseover', function () {
      servSub.classList.add(SUB_OPENED);
      header.classList.add(MENU_CLASS_UNDERLINE);


      servSub.addEventListener('mouseleave', function () {
        servSub.classList.remove(SUB_OPENED);
        header.classList.remove(MENU_CLASS_UNDERLINE);
      });
    });

    offerLink.addEventListener('mouseover', function () {
      offerSub.classList.add(SUB_OPENED);
      header.classList.add(MENU_CLASS_UNDERLINE);

      offerSub.addEventListener('mouseleave', function () {
        offerSub.classList.remove(SUB_OPENED);
        header.classList.remove(MENU_CLASS_UNDERLINE);
      });
    });
  }

})();
*/
