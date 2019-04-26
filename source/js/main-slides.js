(() => {
  const THROTTLE_TIME = 250;
  const monetizationYellowCircle = document.querySelector('.monetization__yellow-circle');
  const yellowBlockBlueCircle = document.querySelector('.yellow-block__blue-circle');
  const yellowBlockWhiteCircle = document.querySelector('.yellow-block__white-circle');
  const header = document.querySelector('.header');
  const platform = document.querySelector('.platform');
  const yellowBlock = document.querySelector('.yellow-block');
  const yellowBlockTitle = document.querySelector('.yellow-block__title');
  // const mpm = document.querySelector('.horizon-slider');
  const mpm = document.querySelector('.works');
  const subscribe = document.querySelector('.subscribe');
  const scrollHandler = () => {
    const hOffset = window.pageYOffset;

    if (!monetizationYellowCircle || !yellowBlockBlueCircle || !yellowBlockWhiteCircle) {
      return false;
    }
    if (hOffset > 10) {
      monetizationYellowCircle.classList.add('monetization__yellow-circle--active');
    } else {
      monetizationYellowCircle.classList.remove('monetization__yellow-circle--active');
      header.classList.remove('header--for-yellow-bg');
      header.classList.remove('header--for-yellow-bg2');
    }
    const ybOffset = yellowBlock.offsetTop - 450;
    if (hOffset > ybOffset) {
      yellowBlockBlueCircle.classList.add('yellow-block__blue-circle--active');
      yellowBlockWhiteCircle.classList.add('yellow-block__white-circle--active');
      header.classList.add('header--for-yellow-bg2');

      const tOffset = yellowBlock.offsetTop;
      if (hOffset > tOffset) {
        yellowBlockBlueCircle.classList.add('yellow-block__blue-circle--active2');
        header.classList.remove('header--for-yellow-bg');
        header.classList.remove('header--for-yellow-bg2');
        header.classList.add('header--for-blue-bg');
      } else {
        yellowBlockBlueCircle.classList.remove('yellow-block__blue-circle--active2');
        header.classList.remove('header--for-blue-bg');
      }

      const bOffset = platform.offsetTop;
      const mpmOffset = mpm.offsetTop;
      if (hOffset > bOffset) {
        header.classList.remove('header--for-yellow-bg');
        header.classList.remove('header--for-yellow-bg2');
        header.classList.add('header--for-blue-bg');
        platform.classList.add('platform--active');
        if (hOffset > mpmOffset) {
          header.classList.remove('header--for-blue-bg');

          const subscribeOffset = subscribe.offsetTop;
          if (hOffset > subscribeOffset) {
            header.classList.add('header--for-blue-bg');
          }
        } else {
          // header.classList.remove('header--for-blue-bg');
        }
      } else {
        // header.classList.remove('header--for-blue-bg');
        platform.classList.remove('platform--active');
      }
    } else {
      yellowBlockBlueCircle.classList.remove('yellow-block__blue-circle--active');
      yellowBlockWhiteCircle.classList.remove('yellow-block__white-circle--active');
      header.classList.remove('header--for-yellow-bg2');
      header.classList.remove('header--for-blue-bg');
    }
    return true;
  };

  monetizationYellowCircle.addEventListener('transitionend', () => {
    if (monetizationYellowCircle.classList.contains('monetization__yellow-circle--active')) {
      header.classList.add('header--for-yellow-bg');
    } else {
      header.classList.remove('header--for-yellow-bg');
    }
  });
  yellowBlockWhiteCircle.addEventListener('transitionend', () => {
    if (yellowBlockBlueCircle.classList.contains('yellow-block__blue-circle--active')) {
      yellowBlockTitle.classList.add('yellow-block__title--active');
    } else {
      yellowBlockTitle.classList.remove('yellow-block__title--active');
    }
  });

  const scrollThrottledHandler = window.throttle(scrollHandler, THROTTLE_TIME);

  window.addEventListener('scroll', scrollThrottledHandler);

  const monetizationBtn = document.querySelector('.monetization__btn');
  monetizationBtn.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: yellowBlock.offsetTop,
      behavior: 'smooth'
    });
  });
})();

