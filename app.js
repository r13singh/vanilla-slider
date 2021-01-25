class Slider {
  constructor() {
    this.sliderElem = document.querySelector('.slider');
    this.sliderThumbElem = document.querySelector('.slider__thumb');
    this.sliderFillElem = document.querySelector('.slider__fill');
    this.sliderContainerElem = document.querySelector('.slider-container');

    this.onPointerMove = this.onPointerMove.bind(this);
    this.onPointerDown = this.onPointerDown.bind(this);
    this.onPointerUp = this.onPointerUp.bind(this);

    this.percent = this.sliderContainerElem.dataset.percent;
    this.sliderWidth = parseInt(window.getComputedStyle(this.sliderElem).width, 10);
    
    this.sliderFillElem.style.transform = `translateX(-${100 - this.percent}%)`;
    this.sliderThumbElem.style.left = (this.sliderWidth * (this.percent / 100) - Slider.SLIDER_THUMB_WIDTH) + 'px';
    
    this.addEventListeners();
  }

  static SLIDER_THUMB_WIDTH = 16;

  addEventListeners() {
    this.sliderElem.addEventListener('pointerdown', this.onPointerDown);
    this.sliderElem.addEventListener('pointerup', this.onPointerUp);
    this.sliderElem.addEventListener('pointercancel', () => false);
  }

  onPointerMove(e) {
    let percentFilled = Math.round(e.offsetX / this.sliderWidth * 100);
    
    percentFilled = percentFilled > 100 ? 100 : percentFilled;
    if (percentFilled < 0) {
      percentFilled = 0;
    } else if (percentFilled > 100) {
      percentFilled = 100;
    }
    this.sliderContainerElem.dataset.percent = percentFilled;
    
    this.sliderFillElem.style.transform = `translateX(-${100 - percentFilled}%)`;
    
    let sliderX = e.offsetX - Slider.SLIDER_THUMB_WIDTH;
    if (sliderX < 0) {
      sliderX = 0;
    } else if (sliderX > this.sliderWidth - Slider.SLIDER_THUMB_WIDTH) {
      sliderX = this.sliderWidth - Slider.SLIDER_THUMB_WIDTH;
    };

    this.sliderThumbElem.style.left = sliderX + 'px';
  }

  onPointerDown(e) {
    this.sliderElem.setPointerCapture(e.pointerId);
    this.sliderElem.addEventListener('pointermove', this.onPointerMove);
    this.onPointerMove(e);
  }

  onPointerUp() {
    this.sliderElem.removeEventListener('pointermove', this.onPointerMove);
  }
}

let slider = new Slider();