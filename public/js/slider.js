/* -----------------------------------------------------
  Material Design Sliders
  CodePen URL: https://codepen.io/rkchauhan/pen/xVGGpR
  By: Ravikumar Chauhan
  
  Find me on:-
  * Twitter: https://twitter.com/rkchauhan01
  * Facebook: https://www.facebook.com/ravi032chauhan
  * GitHub: https://github.com/rkchauhan
  * CodePen: https://codepen.io/rkchauhan
  * UpLabs: http://uplabs.com/rkchauhan01

  Thanks to:-
  * Google Material design - https://www.google.com/design/spec/material-design/introduction.html
  * Google Material Color - https://www.google.com/design/spec/style/color.html
  * Google Material Icons - https://design.google.com/icons/
  * Roboto Font - https://google.com/fonts/specimen/Roboto
  * jQuery - https://jquery.com
-------------------------------------------------------- */
$(document).ready(function() {

  $('.rkmd-slider').rkmd_rangeSlider({max: 100});

});

/* Range Slider Function */
(function($) {

  $.fn.rkmd_rangeSlider = function(val) {
    var self, slider_width, slider_offset, curnt, sliderContinuous, sliderDiscrete, range, slider, max;
    self             = $(this);
    max = val.max_value
    slider_width     = self.outerWidth();
    slider_offset    = self.offset().left;
    sliderDiscrete   = $('.slider-discrete');

    if(self.hasClass('slider-discrete') === true) {

      sliderDiscrete.each(function(i, v) {
        curnt         = $(this);
        if (!curnt.children('.slider')[0]) {
          curnt.append(sliderDiscrete_tmplt());
        }
        
        range         = curnt.find('input[type="range"]');
        slider        = curnt.find('.slider');
        slider_fill   = slider.find('.slider-fill');
        slider_handle = slider.find('.slider-handle');
        slider_label  = slider.find('.slider-label');

        var range_val = parseInt(range.val());
        slider_fill.css('width', range_val +'%');
        slider_handle.css('left', range_val +'%');
        slider_label.find('span').text(range_val);
      });
    }
    
    $('.slider-handle').addClass('is-active')
    
    if (val) {
      slider_move(self, val.value, val.max);
    }
  };

  function sliderDiscrete_tmplt() {
    var tmplt = '<div class="slider">' +
        '<div class="slider-fill"></div>' +
        '<div class="slider-handle"><div class="slider-label"><span>0</span></div></div>' +
        '</div>';

    return tmplt;
  }
  function slider_move(parents, newV, max) {
    var slider_new_val = newV;

    var slider_fill    = parents.find('.slider-fill');
    var slider_handle  = parents.find('.slider-handle');
    var range          = parents.find('input[type="range"]');

    slider_fill.css('width', slider_new_val/max*100 +'%');
    slider_handle.css({
      'left': slider_new_val/max*100 +'%',
      'transition': 'none',
      '-webkit-transition': 'none',
      '-moz-transition': 'none'
    });

    range.val(slider_new_val);

    if(parents.hasClass('slider-discrete') === true) {
      parents.find('.slider-handle span').text(slider_new_val);
    }
  }
}(jQuery));