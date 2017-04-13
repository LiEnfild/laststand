$(function() {
  var slider = $('.slider'),
    sliderContent = slider.html(),
    slideWidth = $('.slider-box').outerWidth(),
    slideCount = $('.slider img').length,
    prev = $('.slider-box .prev'),
    next = $('.slider-box .next'),
    slideNum = 1,
    index = 0,
    clickBullets = 0,
    sliderInterval = 6300,
    animateTime = 1000,
    course = 1,
    margin = -slideWidth;

  for (var i = 0; i < slideCount; i++) {
    html = $('.bullets').html() + '<li></li>';
    $('.bullets').html(html);
  }
  var bullets = $('.slider-box .bullets li')


  $('.slider-box .bullets li:first').addClass('active');
  $('.slider img:last').clone().prependTo('.slider');
  $('.slider img').eq(1).clone().appendTo('.slider');
  $('.slider').css('margin-left', -slideWidth);

  function nextSlide() {
    interval = window.setInterval(animate, sliderInterval);
  }

  function animate() {
    if (margin == -slideCount * slideWidth - slideWidth && course == 1) {
      slider.css({
        'marginLeft': -slideWidth
      });
      margin = -slideWidth * 2;
    }
    else if (margin == 0 && course == -1) {
      slider.css({
        'marginLeft': -slideWidth * slideCount
      });
      margin = -slideWidth * slideCount + slideWidth;
    }
    else {
      margin = margin - slideWidth * (course);
    }
    slider.animate({
      'marginLeft': margin
    }, animateTime);

    if (clickBullets == 0) {
      bulletsActive();
    }
    else {
      slideNum = index + 1;
    }
  }

  function bulletsActive() {
    if (course == 1 && slideNum != slideCount) {
      slideNum++;
      $('.bullets .active').removeClass('active').next('li').addClass('active');
    }
    else if (course == 1 && slideNum == slideCount) {
      slideNum = 1;
      $('.bullets li').removeClass('active').eq(0).addClass('active');
      return false;
    }
    else if (course == -1 && slideNum != 1) {
      slideNum--;
      $('.bullets .active').removeClass('active').prev('li').addClass('active');
      return false;
    }
    else if (course == -1 && slideNum == 1) {
      slideNum = slideCount;
      $('.bullets li').removeClass('active').eq(slideCount - 1).addClass('active');
    }
  }

  function sliderStop() {
    window.clearInterval(interval);
  }

  prev.click(function() {
    if (slider.is(':animated')) {
      return false;
    }
    var course2 = course;
    course = -1;
    animate();
    course = course2;
  });
  next.click(function() {
    if (slider.is(':animated')) {
      return false;
    }
    var course2 = course;
    course = 1;
    animate();
    course = course2;
  });
  bullets.click(function() {
    if (slider.is(':animated')) {
      return false;
    }
    sliderStop();
    index = bullets.index(this);
    if (course == 1) {
      margin = -slideWidth * index;
    }
    else if (course == -1) {
      margin = -slideWidth * index - 2 * slideWidth;
    }
    $('.bullets li').removeClass('active').eq(index).addClass('active');
    clickBullets = 1;
    animate();
    clickBullets = 0;
  });

  slider.add(next).add(prev).hover(function() {
    sliderStop();
  }, nextSlide);

  nextSlide();
});
document.querySelector("input[type=submit]").addEventListener("click", sendForm);

function sendForm(e) {
  var form = document.querySelector("form");
  if (form.checkValidity()) {
    e.preventDefault();
    $.ajax({
      url: "https://formspree.io/stasgon@bk.ru",
      method: "POST",
      data: {
        clientName: $("#name").val(),
        clientEmail: $("#email").val(),
        comment: $("#message").val(),
        phoneNumber: $("#telephone").val()
      },
      dataType: "json"
    });
  }
}
