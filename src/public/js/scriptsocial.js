$(document).ready(social_bar);

var lateral = 1;

function social_bar() {
	"use strict";
	$('.btn_social').click(function () {
		if (lateral === 1) {
			$('.social').animate({
				left: '-50'
			});
			lateral = 0;
			$('.btn_social span').addClass('fa-angle-double-right');
			$('.btn_social span').removeClass('fa-angle-double-left');
		} else {
			lateral = 1;
			$('.social').animate({
				left: '0'
			});
			$('.btn_social span').addClass('fa-angle-double-left');
			$('.btn_social span').removeClass('fa-angle-double-right');
		}

	});
}

var alto_ = function () { 
			var alt_pos = $('.social').offset(); //Obtiene la altura del div
			$(".btn_social").offset({top: alt_pos.top-30});//à la altura le resta 30
		};
		
		$( document ).ready(function() {
    		alto_ (); //ejecuta la resta a la altura obtenida al cargar
		});
		
		$(window).resize(function(){
   			alto_(); // ejecuta la resta al redimencionar la ventana
		});