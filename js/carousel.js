const sliderUI = {
    slider: document.getElementById("slider"),
    slides: document.querySelectorAll(".slide"),
    controls: {
      prevBtn: document.getElementById("btn-prev"),
      nextBtn: document.getElementById("btn-next")
    }
  };
  
let sliderController = {
    isMouseDown: false,
    startPosX: 0,
    scrollLeft: sliderUI.slider.offsetLeft,
    goNext() {
      let _scrollBy = Math.round((sliderUI.slider.offsetWidth + 20) - (sliderUI.slider.scrollLeft % (sliderUI.slides[0].offsetWidth + 20)));
      
      easyScroll({
        scrollableDomEle: sliderUI.slider,
        direction: "right",
        duration: 200,
        easingPreset: "easeInQuad",
        scrollAmount: _scrollBy
      });
    },
    goPrev() {
      let _scrollBy = Math.round(sliderUI.slider.offsetWidth + 20) - (Math.round((sliderUI.slides[0].offsetWidth + 20)) - (sliderUI.slider.scrollLeft % (Math.round(sliderUI.slides[0].offsetWidth + 20))));
      
      easyScroll({
        scrollableDomEle: sliderUI.slider,
        direction: "left",
        duration: 200,
        easingPreset: "easeInQuad",
        scrollAmount: _scrollBy
      });
    }
  };

// Eventos de navegação do carrossel
sliderUI.controls.nextBtn.addEventListener("click", (event) => {
  event.preventDefault();
  sliderController.goNext();
});

sliderUI.controls.prevBtn.addEventListener("click", (event) => {
  event.preventDefault();
  sliderController.goPrev();
});

// Adiciona suporte ao arrastar com o mouse (drag)
sliderUI.slider.addEventListener("mousedown", (event) => {
  sliderController.isMouseDown = true;
  sliderUI.slider.classList.add('dragging');
  sliderController.scrollLeft = sliderUI.slider.scrollLeft;
  sliderController.startPosX = event.pageX - sliderUI.slider.offsetLeft;
});

sliderUI.slider.addEventListener("mousemove", (event) => {
  if (!sliderController.isMouseDown) return;
  let _x = event.pageX - sliderUI.slider.offsetLeft;
  let _xChange = _x - sliderController.startPosX;
  sliderUI.slider.scrollLeft = sliderController.scrollLeft - _xChange;
});

sliderUI.slider.addEventListener("mouseup", (event) => {
  sliderController.isMouseDown = false;
  sliderUI.slider.classList.remove('dragging');
});

sliderUI.slider.addEventListener("mouseleave", (event) => {
  sliderController.isMouseDown = false;
});