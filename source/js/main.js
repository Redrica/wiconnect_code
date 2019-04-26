const mainPageTitle = document.querySelector('#main-page-title');
const mainPageTitleCharcoal = document.querySelector('#main-page-title-charcoal');
const mainPageText = document.querySelector('#main-page-text');
// const circleYellow = document.querySelector('#circle-yellow');
const circleYellowHalf = document.querySelector('#circle-yellow-half');
const scrollToPlatformBtn = document.querySelector('#scroll_to_platform');
// const monetizationBlock = document.querySelector('#monetization');
const yellowBlock = document.querySelector('#yellow-block');
const platformFeaturesBlock = document.querySelector('#platform_features');
const platformFeaturesItems = Array.from(document.querySelectorAll('.platform-feature__item'));
const headerColoredItems = Array.from(document.querySelectorAll('.header-color'));
const svgCircleCharcoal = document.querySelector('#svg-circle-charcoal');
const svgCircleWhite = document.querySelector('#svg-circle-white');
const svgRingInner = document.querySelector('#svg_ring_inner');
const svgRingOuter = document.querySelector('#svg_ring_outer');
const subMenuContainer = document.querySelector('#sub_menu_container');

const logoColored = document.querySelector('#logo_colored');
const logoWhite = document.querySelector('#logo_white');

/*
let lastTimeout;
const debounce = (func) => {
  if (lastTimeout) {
    window.clearTimeout(lastTimeout);
  }
  lastTimeout = window.setTimeout(func, 10);
};
*/

// requestAnimFrame
window.requestAnimFrame = function () {
  return (
    window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    function (callback) {
      window.setTimeout(callback, 1000 / 60);
    }
  );
}();


// ========= STATE =========

const state = {
  slideNumber: 1,
  scrollDownAnimationEnd: false,
  ringsAnimationGrowFlag: false,
  ringsAnimationLessFlag: false,
  ringsAnimationEndFlag: false,
  animationSemaphre: true
};

const Options = {
  MINIMAL_RADIUS: 20,
  Ring: {
    INCREASE_INNER: 8,
    INCREASE_OUTER: 16
  }

};

const YELLOW_CIRCLE_HALF_INIT_X = 600;
const YELLOW_CIRCLE_HALF_INIT_Y = 400;

const YELLOW_CIRCLE_HALF_MAX_X = 2000;
const YELLOW_CIRCLE_HALF_MAX_Y = 1600;


// ========= SVG MODIFICATION =========

const transformSVG = (nodes, coords) => {
  nodes.forEach((sgv, index) => {
    sgv.setAttribute('rx', coords[index]);
    sgv.setAttribute('ry', coords[index]);
  });
};

// ========= SWITCH TEXT BLOCKS VISUALLY =========

const showFeaturesItems = (item) => {
  item.classList.remove('visually-hidden');
  item.classList.remove('platform-feature__fade-out-text');
  item.classList.add('platform-feature__fade-in-text');
};

// временно от исчезновеня блока с фичами отказались
/*
const hideFeaturesItems = (item) => {
  item.classList.add('platform-features__fade-out-text');
  item.classList.add('visually-hidden');
  item.classList.remove('platform-features__fade-in-text');
};
*/

const makeLogoWhite = () => {
  logoColored.style.display = 'none';
  logoWhite.style.display = 'block';
};


const makeLogoBlack = () => {
  logoColored.style.display = 'block';
  logoWhite.style.display = 'none';
};

const makeHeaderWhite = () => {
  makeLogoWhite();
  headerColoredItems.forEach((item) => item.classList.add('main-menu--white'));
};

const makeHeaderBlack = () => {
  makeLogoBlack();
  headerColoredItems.forEach((item) => item.classList.remove('main-menu--white'));
};

// ========= HALF CIRCLE ANIMATION =========

let yellowCircleHalfX;
let yellowCircleHalfY;

const runCircleYellowHalf = () => {

  yellowCircleHalfX = YELLOW_CIRCLE_HALF_INIT_X;
  yellowCircleHalfY = YELLOW_CIRCLE_HALF_INIT_Y;

  let interval = window.setInterval(() => {

    yellowCircleHalfX += 12;
    yellowCircleHalfY += 8;
    circleYellowHalf.setAttribute('rx', yellowCircleHalfX);
    circleYellowHalf.setAttribute('ry', yellowCircleHalfY);

    if (yellowCircleHalfX > YELLOW_CIRCLE_HALF_MAX_X) {

      yellowCircleHalfX = YELLOW_CIRCLE_HALF_MAX_X;
      yellowCircleHalfY = YELLOW_CIRCLE_HALF_MAX_Y;
      window.clearInterval(interval);
      state.animationSemaphre = true;
    }
  }, 4);

};

const hideCircleYellowHalf = () => {

  yellowCircleHalfX = YELLOW_CIRCLE_HALF_MAX_X;
  yellowCircleHalfY = YELLOW_CIRCLE_HALF_MAX_Y;

  let interval = window.setInterval(() => {

    yellowCircleHalfX = (yellowCircleHalfX > YELLOW_CIRCLE_HALF_INIT_X) ? yellowCircleHalfX - 16 : yellowCircleHalfX;
    yellowCircleHalfY = (yellowCircleHalfY > YELLOW_CIRCLE_HALF_INIT_Y) ? yellowCircleHalfY - 12 : yellowCircleHalfY;
    circleYellowHalf.setAttribute('rx', yellowCircleHalfX);
    circleYellowHalf.setAttribute('ry', yellowCircleHalfY);

    if (yellowCircleHalfX < YELLOW_CIRCLE_HALF_INIT_X || yellowCircleHalfY < YELLOW_CIRCLE_HALF_INIT_Y) {

      yellowCircleHalfX = YELLOW_CIRCLE_HALF_INIT_X;
      yellowCircleHalfY = YELLOW_CIRCLE_HALF_INIT_Y;
      circleYellowHalf.setAttribute('rx', yellowCircleHalfX);
      circleYellowHalf.setAttribute('ry', yellowCircleHalfY);
      window.clearInterval(interval);
      state.animationSemaphre = true;
    }
  }, 4);

};

// ========= RINGS_ANIMATION =========

let innerRingXY = 1;
let outerRingXY = 1;

const growRings = () => {

  state.ringsAnimationGrowFlag = true;

  const interval = window.setInterval(() => {

    innerRingXY += 8;
    outerRingXY += 12;

    transformSVG([svgRingInner, svgRingOuter], [innerRingXY, outerRingXY]);

    if (innerRingXY > 500) {
      window.clearInterval(interval);
      state.ringsAnimationEndFlag = true;
      state.ringsAnimationLessFlag = false;
      state.animationSemaphre = true;
    }
  }, 4);
};

const lessRings = () => {

  state.ringsAnimationLessFlag = true;

  const interval = window.setInterval(() => {

    innerRingXY -= 4;
    outerRingXY -= 8;

    transformSVG([svgRingInner, svgRingOuter], [innerRingXY, outerRingXY]);

    if (innerRingXY < Options.MINIMAL_RADIUS || outerRingXY < Options.MINIMAL_RADIUS) {
      innerRingXY = 0;
      outerRingXY = 0;

      transformSVG([svgRingInner, svgRingOuter], [innerRingXY, outerRingXY]);
      window.clearInterval(interval);
      state.ringsAnimationEndFlag = true;
      state.ringsAnimationGrowFlag = false;
      state.animationSemaphre = true;
    }
  }, 4);

};

// ========= WHITE/CHARCOAL ANIMATION ========= (по паре вариантов - интервалом и animaionFrame)

let circleCharcoalXY = 0;
let circleWhiteXY = 0;


const runCharcoalWhite = () => {

  const interval = window.setInterval(() => {

    circleCharcoalXY += 4;
    circleWhiteXY += 8;

    transformSVG([svgCircleCharcoal, svgCircleWhite], [circleCharcoalXY, circleWhiteXY]);

    if (circleCharcoalXY > 200) {
      circleCharcoalXY += 8;
      circleWhiteXY += 2;
    }
    if (circleCharcoalXY > 600) {
      state.animationSemaphre = true;
      mainPageTitleCharcoal.classList.remove('visually-hidden');
      window.clearInterval(interval);
    }
  }, 4);

};

/*

const runCharcoalWhite = () => {

  const interval = window.setInterval(() => {

    circleCharcoalXY += 4;
    circleWhiteXY += 8;

    transformSVG([svgCircleCharcoal, svgCircleWhite], [circleCharcoalXY, circleWhiteXY]);

    if (circleCharcoalXY > 200) {
      circleCharcoalXY += 8;
      circleWhiteXY += 2;
    }
    if (circleCharcoalXY > 600) {
      state.animationSemaphre = true;
      window.clearInterval(interval);
    }
  }, 4);

};
*/


const hideCharcoalWhite = () => {

  const interval = window.setInterval(() => {
    circleCharcoalXY = (circleCharcoalXY > 0) ? circleCharcoalXY - 15 : circleCharcoalXY;
    circleWhiteXY = (circleWhiteXY > 0) ? circleWhiteXY - 15 : circleWhiteXY;

    transformSVG([svgCircleCharcoal, svgCircleWhite], [circleCharcoalXY, circleWhiteXY]);

    if (circleCharcoalXY < Options.MINIMAL_RADIUS || circleWhiteXY < Options.MINIMAL_RADIUS) {
      state.animationSemaphre = true;
      circleCharcoalXY = 0;
      circleWhiteXY = 0;
      transformSVG([svgCircleCharcoal, svgCircleWhite], [circleCharcoalXY, circleWhiteXY]);

      scrollUp();
      window.clearInterval(interval);
    }
  }, 4);

};

/*
const hideCharcoalWhite = () => {

  circleCharcoalXY = (circleCharcoalXY > 0) ? circleCharcoalXY - 15 : circleCharcoalXY;
  circleWhiteXY = (circleWhiteXY > 0) ? circleWhiteXY - 15 : circleWhiteXY;

  transformSVG([svgCircleCharcoal, svgCircleWhite], [circleCharcoalXY, circleWhiteXY]);

  if (circleCharcoalXY < Options.MINIMAL_RADIUS || circleWhiteXY < Options.MINIMAL_RADIUS) {
    state.animationSemaphre = true;
    circleCharcoalXY = 0;
    circleWhiteXY = 0;
    transformSVG([svgCircleCharcoal, svgCircleWhite], [circleCharcoalXY, circleWhiteXY]);
    scrollUp();
  } else {
    window.requestAnimFrame(hideCharcoalWhite);
  }

};
*/

const growCharcoalWhite = () => {
  const interval = window.setInterval(() => {
    circleCharcoalXY += 10;
    circleWhiteXY += 10;

    transformSVG([svgCircleCharcoal, svgCircleWhite], [circleCharcoalXY, circleWhiteXY]);

    if (circleCharcoalXY > 1600) {
      state.animationSemaphre = true;
      window.clearInterval(interval);
      state.scrollDownAnimationEnd = true;
      scrollDown100();
    }
  }, 4);

};
/*
function growCharcoalWhite() {
  circleCharcoalXY += 10;
  circleWhiteXY += 10;

  transformSVG([svgCircleCharcoal, svgCircleWhite], [circleCharcoalXY, circleWhiteXY]);

  if (circleCharcoalXY > 1400) {
    state.animationSemaphre = true;
    state.scrollDownAnimationEnd = true;
  } else {
    window.requestAnimFrame(growCharcoalWhite);
  }
}
*/


const lessCharcoalWhite = () => {

  const interval = window.setInterval(() => {
    circleCharcoalXY = (circleCharcoalXY > 0) ? circleCharcoalXY - 16 : circleCharcoalXY;
    circleWhiteXY = (circleWhiteXY > 0) ? circleWhiteXY - 16 : circleWhiteXY;

    transformSVG([svgCircleCharcoal, svgCircleWhite], [circleCharcoalXY, circleWhiteXY]);

    if (circleCharcoalXY < 600) {
      window.clearInterval(interval);
      state.animationSemaphre = true;
    }
  }, 4);

};
/*
const lessCharcoalWhite = () => {

  circleCharcoalXY = (circleCharcoalXY > 0) ? circleCharcoalXY - 16 : circleCharcoalXY;
  circleWhiteXY = (circleWhiteXY > 0) ? circleWhiteXY - 16 : circleWhiteXY;

  transformSVG([svgCircleCharcoal, svgCircleWhite], [circleCharcoalXY, circleWhiteXY]);

  if (circleCharcoalXY < 600) {
    window.requestAnimFrame(lessCharcoalWhite);
  } else {
    state.animationSemaphre = true;
  }

};
*/


// ========= SCROLLING ANIMATIONS =========

const scrollDown = () => {
  let offset = 0;
  const interval = window.setInterval(() => {
    offset += 15;
    window.scrollTo(0, offset++);
    console.log(yellowBlock.getBoundingClientRect().top);
    if (yellowBlock.getBoundingClientRect().top < 0) {
      state.animationSemaphre = true;
      window.clearInterval(interval);
      window.scrollTo(0, yellowBlock.getBoundingClientRect().height);
      runCharcoalWhite();
      makeHeaderWhite();
      makeLogoWhite();

    }
  }, 4);

};

const scrollDown100 = () => {
  let offset = 0;
  const interval = window.setInterval(() => {
    offset += 15;
    window.scrollBy(0, 5);
    if (offset >= 400) {
      state.animationSemaphre = true;
      window.clearInterval(interval);
    }
  }, 4);
};


/*
const scrollUp = () => {

  window.scrollBy(0, -10);

  if (document.body.getBoundingClientRect().top < 0) {
    window.requestAnimFrame(scrollUp);
  } else {
    document.querySelector('HEADER').classList.remove('main-page__header--bg-charcoal');
  }
};
*/

const scrollUp = () => {
  document.removeEventListener('scroll', onFeaturesBlockScroll);
    document.querySelector('HEADER').classList.remove('main-page__header--bg-charcoal');
  document.querySelector('HEADER').classList.remove('main-page__header--bg-white');
  document.querySelector('HEADER').classList.add('main-page__header--bg-yellow');
  const interval = window.setInterval(() => {
    window.scrollBy(0, -10);

    if (document.body.getBoundingClientRect().top >= 0) {
      state.animationSemaphre = true;
      window.clearInterval(interval);
      document.querySelector('HEADER').classList.remove('main-page__header--bg-charcoal');
    }
  }, 4);
};

// ========= SCROLLING HANDLER =========

const onFeaturesBlockScroll = () => {
  platformFeaturesItems.forEach(showFeaturesItems);

  if ((yellowBlock.getBoundingClientRect().top).toFixed() >= 0) {
    lessCharcoalWhite();
    document.removeEventListener('scroll', onFeaturesBlockScroll);
    document.addEventListener('wheel', onDocumentWheel);
    window.scrollTo(0, yellowBlock.getBoundingClientRect().bottom);
  }

  if ((platformFeaturesBlock.getBoundingClientRect().top).toFixed() < 0 && !state.ringsAnimationGrowFlag) {
    growRings();
  }

  if (platformFeaturesBlock.getBoundingClientRect().top > 0 && state.ringsAnimationEndFlag && !state.ringsAnimationLessFlag) {
    lessRings();
  }

  if (subMenuContainer.getBoundingClientRect().top > 0) {
    makeHeaderWhite();
    document.querySelector('HEADER').classList.add('main-page__header--bg-charcoal');
    document.querySelector('HEADER').classList.remove('main-page__header--bg-white');

  }

  if ((subMenuContainer.getBoundingClientRect().top < 0)) {
    makeHeaderBlack();
    document.querySelector('HEADER').classList.remove('main-page__header--bg-charcoal');
    document.querySelector('HEADER').classList.add('main-page__header--bg-white');
    // makeLogoBlack();
  }

};

// ========= WHEEL HANDLER =========

const runAnimation = (deltaY) => {

  console.log(state);

  // 1 слайд: колесико вниз - увеличиваем желтый эллипс
  if (deltaY > 0 && state.slideNumber === 1 && state.animationSemaphre) {
    state.animationSemaphre = false;
    document.querySelector('.main-page__header').classList.remove('main-page__header--bg-white');
    // document.querySelector('.main-page__header').classList.add('main-page__header--bg-yellow');
    runCircleYellowHalf();
    state.slideNumber = 2;


  // 2 слайд: колесико вверх - уменьшаем желтый эллипс
  } else if (deltaY < 0 && state.slideNumber === 2 && state.animationSemaphre) {
    state.animationSemaphre = false;
    document.querySelector('.main-page__header').classList.add('main-page__header--bg-white');
    document.querySelector('.main-page__header').classList.remove('main-page__header--bg-yellow');
    hideCircleYellowHalf();
    makeHeaderBlack();
    state.slideNumber = 1;

  // 2 слайд: колесико вниз - скроллим к желтому прямоугольнику
  } else if (deltaY > 0 && state.slideNumber === 2 && state.animationSemaphre) {
    state.animationSemaphre = false;
    document.querySelector('.main-page__header').classList.add('main-page__header--white');
    scrollDown();
    scrollToPlatformBtn.classList.add('visually-hidden');
    state.slideNumber = 3;

  // 3 слайд: колесико вверх - скроллим вверх
  } else if (deltaY < 0 && state.slideNumber === 3 && state.animationSemaphre) {
    state.animationSemaphre = false;
    hideCharcoalWhite();
    // scrollUp();
    document.querySelector('HEADER').classList.remove('main-page__header--bg-charcoal');
    scrollToPlatformBtn.classList.remove('visually-hidden');
    mainPageTitleCharcoal.classList.add('visually-hidden');
    mainPageTitle.classList.remove('visually-hidden');
    mainPageText.classList.remove('visually-hidden');
    headerColoredItems.forEach((item) => item.classList.remove('main-menu--white'));
    state.slideNumber = 2;

  // 3 слайд: колесико вниз - скроллим на 100 точек вниз, гасим слушатель колеса, включаем слушатель скролла
  } else if (deltaY > 0 && state.slideNumber === 3 && state.animationSemaphre) {
    state.animationSemaphre = false;
    growCharcoalWhite();

    platformFeaturesItems.forEach(showFeaturesItems);
    document.removeEventListener('wheel', onDocumentWheel);
    document.addEventListener('scroll', onFeaturesBlockScroll);
    document.querySelector('HEADER').classList.add('main-page__header--bg-charcoal');
  }
};

const onDocumentWheel = (e) => {
  e.preventDefault();
  // debounce(runAnimation.bind(null, e.deltaY));
  runAnimation(e.deltaY);
};

const onScrollToPlatformBtnClick = () => {
  runCircleYellowHalf();
  document.querySelector('.main-page__header').classList.add('main-page__header--white');
  scrollDown();
  scrollToPlatformBtn.classList.add('visually-hidden');
  state.slideNumber = 3;
};


if (document.body.clientWidth > 1023) {

  if (document.body.getBoundingClientRect().top < 0) {
    document.addEventListener('scroll', onFeaturesBlockScroll);
  } else {
    document.addEventListener('wheel', onDocumentWheel);
  }

  scrollToPlatformBtn.addEventListener('click', onScrollToPlatformBtnClick);

  // document.addEventListener('wheel', onDocumentWheel);
  // document.addEventListener('scroll', onFeaturesBlockScroll);

  platformFeaturesItems.forEach((item) => {
    item.classList.add('visually-hidden');
  });

}
