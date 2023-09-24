const sliders = document.querySelectorAll('.swiper');
let swiper = null;

function mobileSlider() {
  for (let i = 0; i < sliders.length; i++) {
    let slider = sliders[i];

    if (window.innerWidth < 768 && slider.dataset.mobile == 'false') {
      swiper = new Swiper(slider, {
        loop: true,
        pagination: {
          el: slider.querySelector('.swiper-pagination'),
          clickable: true,
        },
        slidesPerView: "auto",
        spaceBetween: 16,
      })

      slider.dataset.mobile = 'true';
    }

    if (window.innerWidth > 767 && slider.dataset.mobile == 'true') {
      slider.dataset.mobile = 'false';

      if (slider.dataset.mobile == 'false') {
        swiper.destroy();
      }
    }
  }
}
mobileSlider();
window.addEventListener('resize', () => {
  mobileSlider();
});
