(function () {
  const BODY_NO_SCROLL = 'page--noscroll';
  const page = document.querySelector('.page');
  const mobileWidth = window.matchMedia('(max-width: 767px)');

  const blockContentScroll = function () {
    page.classList.toggle(BODY_NO_SCROLL);
  };

  window.util = {
    mobileWidth: mobileWidth,
    blockContentScroll: blockContentScroll
  };

})();
