$(document).ready(function(){

	/* Slider for Section*/
	$('.banner-slider').slick({
		infinite: true,
		slidesToShow: 1,
		slidesToScroll: 1,
		arrow: false,
		dots: false
	});

	$('.slider-for').slick({
	  slidesToShow: 1,
	  slidesToScroll: 1,
	  arrows: false,
	  fade: false,
	  asNavFor: '.slider-nav'
	});

	$('.slider-nav').slick({
	  slidesToShow: 1,
	  slidesToScroll: 1,
	  asNavFor: '.slider-for',
	  dots: false,
	  centerMode: false,
	  focusOnSelect: false
	});
});