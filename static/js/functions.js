/*
	Project Name : Magazine
	
	- Responsive Caret *
	- Expand Panel Resize *
	- Google Map *
	- Sticky Menu *
	
	## Document Ready
		-- Scrolling Navigation
		-- Find all anchors
		-- Add Easing Effect
		-- Responsive Caret
		-- Remove p empty tag for Shortcode
		-- Back To Top
		-- Contact Map
		-- Quick Contact Form

	## Window Load
		-- Site Loader
*/

(function($) {

	"use strict"
	
	/* - Menu Switch * */
	function menu_switch(){
		var width = $(window).width();
		if( width > 991 ) {
			$(".header-section .ow-navigation .navbar-nav").addClass("menu-open");
			$(".menu-switch > a").on("click", function(){
				$(".ow-navigation .navbar-nav").toggleClass("menu-open")
			});
		} else {
			$(".ow-navigation .navbar-nav").removeClass("menu-open");
		}
	}
	
	/* - Responsive Caret * */
	function menu_dropdown_open(){
		var width = $(window).width();
		if( width > 991 ) {
			if($(".ow-navigation .nav li.ddl-active").length ) {
				$(".ow-navigation .nav > li").removeClass("ddl-active");
				$(".ow-navigation .nav li .dropdown-menu").removeAttr("style");
			} else {
				$(".ow-navigation .nav li .dropdown-menu").removeAttr("style");
			}
		} 
	}
	
	/* - Expand Panel Resize * */
	function panel_resize(){
		var width = $(window).width();
		if( width > 991 ) {
			if($(".header-section #slidepanel").length ) {
				$(".header-section #slidepanel").removeAttr("style");
			}
		}
	}
	
	/* - What's Hot */
	function whats_hot() {
		if($(".whats-post").length){
			var $container = $(".whats-post");
			$container.isotope({
				layoutMode: 'fitRows',
				itemSelector: ".what-box",
				gutter: 0,
				transitionDuration: "0.5s"
			});
			
			$("#filters a").on("click",function(){
				$('#filters a').removeClass("active");
				$(this).addClass("active");
				var selector = $(this).attr("data-filter");
				$container.isotope({ filter: selector });		
				return false;
			});
		}
	}
	
	/* - Google Map * */
	function initialize(obj) {
		var lat = $('#'+obj).attr("data-lat");
        var lng = $('#'+obj).attr("data-lng");
		var contentString = $('#'+obj).attr("data-string");
		var myLatlng = new google.maps.LatLng(lat,lng);
		var map, marker, infowindow;
		var image = "static/images/marker.png";
		var zoomLevel = parseInt($('#'+obj).attr("data-zoom") ,10);		
		var styles = [{"featureType": "administrative.country","elementType": "geometry","stylers": [{"visibility": "simplified"},{"hue": "#ff0000"}]}]
		
		var styledMap = new google.maps.StyledMapType(styles,{name: "Styled Map"});
		var mapOptions = {
			zoom: zoomLevel,
			disableDefaultUI: true,
			center: myLatlng,
            scrollwheel: false,
			mapTypeControlOptions: {
            mapTypeIds: [google.maps.MapTypeId.ROADMAP, "map_style"]
			}
		}
		
		map = new google.maps.Map(document.getElementById(obj), mapOptions);	
		
		map.mapTypes.set("map_style", styledMap);
		map.setMapTypeId("map_style");
		
		infowindow = new google.maps.InfoWindow({
			content: contentString
		});      
	    
        marker = new google.maps.Marker({
			position: myLatlng,
			map: map,
			icon: image
		});

		google.maps.event.addListener(marker, "click", function() {
			infowindow.open(map,marker);
		});	
	}
	
	/* - Sticky Menu * */
	function sticky_menu() {
		var menu_scroll = $(".header-section").offset().top;
		var scroll_top = $(window).scrollTop();
		
		if ( scroll_top > menu_scroll ) {
			$(".header-section .menu-block").addClass("navbar-fixed-top animated fadeInDown");
		} else {
			$(".header-section .menu-block").removeClass("navbar-fixed-top animated fadeInDown"); 
		}
	}
		
	/* ## Document Ready - Handler for ready() called */
	$(document).on("ready",function() {

		/* - Scrolling Navigation * */
		var width	=	$(window).width();
		var height	=	$(window).height();
		
		/* - Set Sticky Menu * */
		if( $(".header-section").length ) {
			sticky_menu();
		}
		$('.navbar-nav li a[href*="#"]:not([href="#"]), .site-logo a[href*="#"]:not([href="#"])').on("click", function(e) {
	
			var $anchor = $(this);
			
			$("html, body").stop().animate({ scrollTop: $($anchor.attr("href")).offset().top - 49 }, 1500, "easeInOutExpo");
			
			e.preventDefault();
		});
		
		/* - Go to Next */
		$('.goto-next a').on('click', function(event)
		{
			var anchor = $(this);
			if( anchor === 'undefined' || anchor === null || anchor.attr('href') === '#' ) { return; }
			if ( anchor.attr('href').indexOf('#') === 0 )
			{
				if( $(anchor.attr('href')).length )
				{
					$('html, body').stop().animate( { scrollTop: $(anchor.attr('href')).offset().top - 49 }, 1500, 'easeInOutExpo' );			
				}
				event.preventDefault();
			}
		});

		/* - Responsive Caret * */
		$(".ddl-switch").on("click", function() {
			var li = $(this).parent();
			if ( li.hasClass("ddl-active") || li.find(".ddl-active").length !== 0 || li.find(".dropdown-menu").is(":visible") ) {
				li.removeClass("ddl-active");
				li.children().find(".ddl-active").removeClass("ddl-active");
				li.children(".dropdown-menu").slideUp();
			}
			else {
				li.addClass("ddl-active");
				li.children(".dropdown-menu").slideDown();
			}
		});
		
		/* - Menu Switch */
		if($(".header-section").length){
			menu_switch();
		}
		
		/* - Expand Panel * */
		$("#slideit").on ("click", function() {
			$("#slidepanel").slideDown(1000);
			$("html").animate({ scrollTop: 0 }, 1000);
		});	

		/* Collapse Panel * */
		$("#closeit").on("click", function() {
			$("#slidepanel").slideUp("slow");
			$("html").animate({ scrollTop: 0 }, 1000);
		});	
		
		/* Switch buttons from "Log In | Register" to "Close Panel" on click * */
		$("#toggle a").on("click", function() {
			$("#toggle a").toggle();
		});	
		menu_dropdown_open();
		panel_resize();
		
		/* - Search * */
		if($(".search-box").length){
			$("#search").on("click", function(){
				$(".search-box").addClass("active")
			});
			$(".search-box span").on("click", function(){
				$(".search-box").removeClass("active")
			});
		}		
		
		/* - Revolution Slider */
		if($(".slider-section").length){
			$("#home-slider1").revolution({
				sliderType:"standard",
				delay:6000,
				responsiveLevels:[1920,1025,768,480],
				gridwidth:[1920,1025,768,480],
				gridheight:[740,700,600,400],
				navigation: {
					arrows:{
						enable:true,
						style:"uranus",
					},
					bullets: {
						enable:true,
						style:"zeus",
						hide_onleave:false,
						direction:"horizontal",
						h_align:"center",
						v_align:"bottom",
						h_offset:0,
						v_offset:33,
						space:10,
						tmp:''
					}
				},
			});
			
			$("#home-slider2").revolution({
				delay:6000,
				responsiveLevels:[1920,1025,768,480],
				gridwidth:[1920,1025,768,480],
				gridheight:[864,700,560,400],
				navigation: {
					arrows:{
						enable:true,
						style:"uranus",
					},
					bullets: {
						enable:false,
						style:"zeus",
						hide_onleave:false,
						direction:"horizontal",
						h_align:"center",
						v_align:"bottom",
						h_offset:0,
						v_offset:33,
						space:10,
						tmp:''
					}
				},
			});
			
		}
		
		/* - Latest Post */
		if($(".latest-post").length) {
			$(".latest-post-carousel").owlCarousel({
				loop: true,
				margin: 0,
				nav: false,
				dots: false,
				autoplay: true,
				responsive:{
					0:{
						items: 1
					},
					480:{
						items: 2
					},
					700:{
						items: 3
					},
					1200:{
						items: 4
					}
				}
			});
		}
		
		/* - Related Articles */
		if($(".related-article").length) {
			
			$(".related-article-carousel").owlCarousel({
				loop: true,
				margin: 0,
				nav: true,
				dots: false,
				autoplay: false,
				responsive:{
					0:{
						items: 1
					},
					500:{
						items: 2
					},
					700:{
						items: 2
					},
					1200:{
						items: 3
					}
				}
			});
		}
		
		/* - About Video Section */
		$('.popup-youtube, .popup-vimeo, .popup-gmaps').magnificPopup({
			disableOn: 700,
			type: 'iframe',
			mainClass: 'mfp-fade',
			removalDelay: 160,
			preloader: false,

			fixedContentPos: false
        });
		
		/* - About Me Skill */
		$( " [id*='skill_type-'] " ).each(function ()
		{
			var ele_id = 0;
			ele_id = $(this).attr('id').split("-")[1];
			
			var $this = $(this);
			var myVal = $(this).data("value");

			$this.appear(function()
			{			
				var skill_type1_item_count = 0;
				var skill_type1_count = 0;					
				skill_type1_item_count = $( "[id*='skill_"+ ele_id +"_count-']" ).length;				
				
				for(var i=1; i<=skill_type1_item_count; i++)
				{
					skill_type1_count = $( "[id*='skill_"+ ele_id +"_count-"+i+"']" ).attr( "data-skill_percent" );
					$("[id*='skill_"+ ele_id +"_count-"+i+"']").animateNumber({ number: skill_type1_count }, 5000);
					$("[id*='skill_"+ ele_id +"_count-"+i+"']").css("left",skill_type1_count +"%");
				}
				
				var skill_bar_count = 0;
				var skills_bar_count = 0;
				skill_bar_count = $( "[id*='skill_bar_"+ ele_id +"_count-']" ).length;
				
				for(var j=1; j<=skill_bar_count; j++)
				{
					skills_bar_count = $( "[id*='skill_"+ ele_id +"_count-"+j+"']" ).attr( "data-skill_percent" );
					$("[id*='skill_bar_"+ ele_id +"_count-"+j+"']").css({'width': skills_bar_count +'%'});
				}
			});
			
		});
		
		/* - Contact Map * */
		if($("#map-canvas-contact").length==1){
			initialize("map-canvas-contact");
		}
		
		/* - Quick Contact Form * */
		$( "#btn_submit" ).on( "click", function(event) {
			event.preventDefault();
			var mydata = $("form").serialize();
			$.ajax({
				type: "POST",
				dataType: "json",
				url: "contact.php",
				data: mydata,
				success: function(data) {
					if( data["type"] == "error" ){
						$("#alert-msg").html(data["msg"]);
						$("#alert-msg").removeClass("alert-msg-success");
						$("#alert-msg").addClass("alert-msg-failure");
						$("#alert-msg").show();
					} else {
						$("#alert-msg").html(data["msg"]);
						$("#alert-msg").addClass("alert-msg-success");
						$("#alert-msg").removeClass("alert-msg-failure");					
						$("#input_name").val("");
						$("#input_email").val("");
						$("#contact_message").val("");
						$("#alert-msg").show();
					}
				},
				error: function(xhr, textStatus, errorThrown) {
				}
			});
			return false;
		});/* Quick Contact Form /- */
		
	}); /* - Document Ready /- */
	
	/* Event - Window Scroll */
	$(window).on("scroll",function() {
		/* - Set Sticky Menu * */
		if( $(".header-section .menu-block").length ) {
			sticky_menu();
		}
	});
	
	$( window ).on("resize",function() {
		menu_dropdown_open();
		/* - Expand Panel Resize * */
		panel_resize();
		
		/* - Menu Switch */
		if($(".menu-switch").length){
			menu_switch();
		}
		
		/* - Gallery Section */
		whats_hot();
	});
	
	
	/* ## Window Load - Handler for load() called */
	
	$(window).on("load",function() {
		/* -- Site Loader */
		if ( !$("html").is(".ie6, .ie7, .ie8") ) {
			$("#site-loader").delay(1000).fadeOut("slow");
		}
		else {
			$("#site-loader").css("display","none");
		}
		
		/* - Gallery Section */
		whats_hot();
	});

})(jQuery);