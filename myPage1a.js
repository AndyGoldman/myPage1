$(document).ready(function (){
	$('.navButton').mouseenter(function (){
		$(this).children('.submenu').slideToggle('slow');
	});
		$('.navButton').mouseleave(function (){
		$(this).children('.submenu').slideToggle('slow');
	});
	$('.submenuButton').mouseenter(function (){
		$(this).children('.submenu').show();
	});
});