(function () {
  const MENU_CLASS = 'header--menu-opened';
  const header = document.querySelector('.header');
  const menuToggle = header.querySelector('.header__menu-toggle');


  // change the navigation block class when the burger is pressed
  // blocks page scroll when menu opened (on mobile)

  menuToggle.addEventListener('click', function (evt) {
    evt.preventDefault();
    header.classList.toggle(MENU_CLASS);
    window.util.blockContentScroll();
  });

  const onTabletCloseMobileMenu = function () {
    header.classList.remove(MENU_CLASS);
  };

  window.util.mobileWidth.addListener(onTabletCloseMobileMenu);

})();
