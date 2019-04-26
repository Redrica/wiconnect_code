/*
const subNavContainer = document.querySelector('#sub_nav_container');
const subMenu = document.querySelector('#sub_menu');
const horizonPrevBtn = document.querySelector('#horizon_prev_btn');
const horizonNextBtn = document.querySelector('#horizon_next_btn');

const horizonState = {

  currentContentNumber: 0,
  offsetStep: 20,
  workFlag: false,

  init(contentContainer, navContainer) {
    if (!this.workFlag) {
      this.contentContainer = contentContainer ? contentContainer : this.contentContainer;
      this.navContainer = navContainer ? navContainer : this.navContainer;
      this.contentItems = this.contentContainer.querySelectorAll('.horizon-slider__item');
      this.menuItems = Array.from(this.navContainer.querySelectorAll('A'));

      this.containerWidth = this.contentContainer.getBoundingClientRect().width;
      this.contentItemWidth = this.contentItems[0].getBoundingClientRect().width;
      this.contentItemsPositions = Array.from(this.contentItems).map((contentItem) => -contentItem.getBoundingClientRect().left);

      this.bind();
      this.tick();
      this.workFlag = true;
    }
  },

  scroll(targetContentItemNuber) {
    let offset = (targetContentItemNuber > this.currentContentNumber) ? -this.offsetStep : this.offsetStep;
    let currentPosition = this.contentItemsPositions[this.currentContentNumber];
    const interval = window.setInterval(() => {
      currentPosition += offset;

      this.contentContainer.style.transform = `translateX(${currentPosition}px)`;

      if (offset > 0 ? (currentPosition - this.contentItemsPositions[targetContentItemNuber] > this.offsetStep) : (currentPosition - this.contentItemsPositions[targetContentItemNuber] < this.offsetStep)) {
        window.clearInterval(interval);
        this.currentContentNumber = targetContentItemNuber;
        this.contentContainer.style.transform = `translateX(${this.contentItemsPositions[this.currentContentNumber]}px)`;
      }
    }, 1);

    this.currentContentNumber = targetContentItemNuber;
  },

  showUnderline(index) {
    if (index < 4 && index >= 0) {
      this.menuItems.forEach((item) => item.classList.remove('horizon-nav__item--active'));
      this.menuItems[index].classList.add('horizon-nav__item--active');
    }
  },

  bind() {
    this.menuItems.forEach((menuItem, index) => {
      menuItem.addEventListener('click', (e) => {
        window.clearInterval(this.autoScrollInterval);
        e.preventDefault();
        let contentItemIndex = index + 1;
        this.__currentPosition = this.contentItems[index + 1].getBoundingClientRect().left;
        this.scroll(contentItemIndex);
        this.showUnderline(index);
      });
      window.addEventListener('resize', () => {
        this.stop();
        this.currentContentNumber = 0;
        this.workFlag = false;
        this.contentContainer.style.transform = 'translateX(0px)';
        this.init();
      });
    });
  },

  tick() {

    this.autoScrollInterval = window.setInterval(() => {
      let targetContentItemNuber = (this.currentContentNumber + 1 === this.contentItems.length) ? 0 : this.currentContentNumber + 1;
      this.scroll(targetContentItemNuber);
      this.showUnderline(targetContentItemNuber - 1);
    }, 4000);
  },

  next() {
    window.clearInterval(this.autoScrollInterval);
    let targetContentItemNuber = (this.currentContentNumber + 1 === this.contentItems.length) ? 0 : this.currentContentNumber + 1;
    this.scroll(targetContentItemNuber++);
    this.showUnderline(targetContentItemNuber - 2);

  },

  prev() {
    window.clearInterval(this.autoScrollInterval);
    let targetContentItemNuber = (this.currentContentNumber - 1 === this.contentItems.length) ? 0 : this.currentContentNumber - 1;
    if (this.currentContentNumber === 0) {
      this.scroll(4);
    } else {
      this.scroll(targetContentItemNuber--);
      this.showUnderline(targetContentItemNuber);
    }

  },

  stop() {
    window.clearInterval(this.autoScrollInterval);
  }

};

horizonState.init(subMenu, subNavContainer);
horizonPrevBtn.addEventListener('click', () => horizonState.prev());
horizonNextBtn.addEventListener('click', () => horizonState.next());

*/
