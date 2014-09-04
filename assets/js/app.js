$(function () {
	"use strict";
	
	$("#menuToggle").on("click", function (e) {
		e.preventDefault();
	});
	
	$('.dropdown-menu a').click(function(e) {
		e.stopPropagation();
	});
	
	function getGridSize() {
		return (Modernizr.mq('(max-width:490px)')) ? 1 : 
				(Modernizr.mq('(max-width:705px)')) ? 2 : 
				(Modernizr.mq('(max-width:768px)')) ? 3 : 4;
	}
	
	var App = {
		pages: {
			index: function(){ 
				seventyThree.initPage();
				seventyThree.initScrollArow();
				seventyThree.initPortfolio();
				seventyThree.initBlogMasonry();
				seventyThree.initTeamCarousel();
				seventyThree.initStatistics();
				seventyThree.initAboutCarousel();
				seventyThree.initClientCarousel();
				seventyThree.initSignupForm();
				seventyThree.initContactForm();
			},
			indexPersonal: function(){
				seventyThree.initPage();
				seventyThree.initScrollArow();
				seventyThree.initPortfolio();
				seventyThree.initBlogMasonry();
				seventyThree.initStatistics();
				seventyThree.initAboutCarousel();
				seventyThree.initClientCarousel();
				seventyThree.initSignupForm();
				seventyThree.initContactForm();
				$("[data-toggle='collapse']").on("click", function(e){
					e.preventDefault();
					var id = $('.v-icon[data-target="' + $(this).attr("data-target") + '"]');
					var icon = $(id).children("i");
					if(/fa-minus/i.test($(icon).attr("class"))){
						$(icon).removeClass("fa-minus").addClass("fa-plus");
					}
					else{
						$(icon).removeClass("fa-plus").addClass("fa-minus");
					}
				});
			},
			indexCarousel: function(){
				seventyThree.pages.index();
				$('.offcanvas').on('shown.bs.offcanvas', function (e) {
					$('.carousel').css({'width': $(window).outerWidth()});
				});

				$('.offcanvas').on('hidden.bs.offcanvas', function (e) {
					$('.carousel').css({'width': $(window).outerWidth()});
				});
			},
			indexVideo: function(){
				seventyThree.initPageVideo();
				seventyThree.initScrollArow();
				seventyThree.initPortfolio();
				seventyThree.initBlogMasonry();
				seventyThree.initTeamCarousel();
				seventyThree.initStatistics();
				seventyThree.initAboutCarousel();
				seventyThree.initClientCarousel();
				seventyThree.initSignupForm();
				seventyThree.initContactForm();
			},
			blog: function(){
				seventyThree.initPage();
				seventyThree.initDefaultCarousel();
				$( 'audio' ).audioPlayer();
			}
		},
		initPage: function(){
			$.backstretch([
				"assets/img/background/1.jpg"
			], {duration: 3800, fade: 1500});
		},
		initPageVideo: function(){
			if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Windows Phone|Opera Mini/i.test(navigator.userAgent) ) {
				$.backstretch([
					"assets/img/background/1.jpg"
				], {duration: 3800, fade: 1500});
			}
			else {
				$('#home').tubular({
					videoId: 'mt_1aFGfyVk'
				}); // where videoId is the YouTube ID.
			}
		},
		initPortfolio: function(){
			var $grid = $('#portfolio-container');
		
			$grid.shuffle({
				itemSelector: '.portfolio-item',
				speed: 450
			});
			
			$('#filter a').click(function (e) {
				e.preventDefault();
			 
				// set active class
				$('#filter a').removeClass('active');
				$(this).addClass('active');
			 
				// get group name from clicked item
				var groupName = $(this).attr('data-group');
			 
				// reshuffle grid
				$grid.shuffle('shuffle', groupName );
			});
		},
		initBlogMasonry: function(){
			var $container = $('#posts-container').masonry();
			// layout Masonry again after all images have loaded
			$container.imagesLoaded( function() {
				$container.masonry({
					// options
					itemSelector: '.post'
				});
				
				$( 'audio' ).audioPlayer();
			});
			seventyThree.initDefaultCarousel();
		},
		initDefaultCarousel: function(){
			var defaultCarousel = $(".default-carousel").bxSlider({
				nextText: "",
				prevText: ""
			});
			$(window).on("throttledresize", function( event ) {
				defaultCarousel.reloadSlider();
			});
		},
		initTeamCarousel: function(){
			function getTeamCarouselParams(){
				return {
					minSlides: getGridSize(),
					maxSlides: getGridSize(),
					slideWidth: 220,
					slideMargin: 15,
					nextText: "",
					prevText: "",
					infiniteLoop: false,
					hideControlOnEnd: true
				};
			}
			var teamCarousel = $("#team-carousel").bxSlider(getTeamCarouselParams());
			$(window).on("throttledresize", function( event ) {
				teamCarousel.reloadSlider(getTeamCarouselParams());
			});
		},
		initStatistics: function(){		
			$('.counter').counterUp({
				delay: 100,
				time: 2000
			});
		},
		initAboutCarousel: function(){			
			var aboutCarouselParams = {
				nextText: "",
				prevText: "",
				infiniteLoop: false,
				hideControlOnEnd: true
			};
			
			var aboutCarousel = $('.about-carousel').bxSlider(aboutCarouselParams);
			
			/* ---------------------------------------------------------
			 * Venobox
			 */
					
			$('.venobox').venobox({
				numeratio: true
			});
			
			$(".about-carousel .overlay").on("click", function(e){
				e.preventDefault();
			});
			
			$(document).on('click','.vbox-overlay', function(){
				setTimeout(function(){
					aboutCarousel.reloadSlider(aboutCarouselParams);
				}, 700);
			});
		},
		initClientCarousel: function(){			
			function getClientsCarouselParams(){
				return {
					minSlides: getGridSize(),
					maxSlides: getGridSize(),
					slideMargin: 25,
					slideWidth: 210,
					nextText: "",
					prevText: "",
					infiniteLoop: false,
					hideControlOnEnd: true
				};
			}
			
			var clientsCarousel = $("#clients-carousel").bxSlider(getClientsCarouselParams());
			
			$(window).on("throttledresize", function( event ) {
				clientsCarousel.reloadSlider(getClientsCarouselParams());
			});
		},
		initSignupForm: function(){
			$('#signupForm').bootstrapValidator({
				message: 'This value is not valid',
				feedbackIcons: {
					valid: 'fa fa-check',
					invalid: 'fa fa-times',
					validating: 'fa fa-refresh'
				},
				submitHandler: function (validator, form, submitButton) {
					var l = Ladda.create(submitButton[0]),
						btnText = submitButton.children(".ladda-label");
					
					l.start();
					btnText.html("Signing up...");
					
					$.get(form.attr('action'), form.serialize(), function(result) { 
						btnText.html(result.message);							
					}, 'json')
					.always(function() { 
						l.stop(); 
						validator.disableSubmitButtons(true);
					});
				},
				fields: {
					email: {
						validators: {
							notEmpty: {
								message: 'Email cannot be empty'
							},
							emailAddress: {
								message: 'The input is not a valid email address'
							}
						}
					}
				}
			});
		},
		initContactForm: function(){
			$('#contactForm').bootstrapValidator({
				fields: {
					name: {
						validators: {
							notEmpty: {
								message: 'Name cannot be empty'
							},
							stringLength: {
								min: 6,
								max: 30,
								message: 'Name must be more than 6 and less than 30 characters long'
							},
							regexp: {
								regexp: /^[a-zA-Z\s]+$/,
								message: 'Name can only consist alphabetical characters'
							}
						}
					},
					contactEmail: {
						validators: {
							notEmpty: {
								message: 'Email cannot be empty'
							},
							emailAddress: {
								message: 'The input is not a valid email address'
							}
						}
					},
					message: {
						validators: {
							notEmpty: {
								message: 'Message cannot be empty'
							}
						}
					}
				},
				feedbackIcons: {
					valid: 'fa fa-check',
					invalid: 'fa fa-times',
					validating: 'fa fa-refresh'
				},
				submitHandler: function (validator, form, submitButton) {
					var l = Ladda.create(submitButton[0]),
						btnText = submitButton.children(".ladda-label");
					
					l.start();
					btnText.html("Sending...");
					
					$.post(form.attr('action'), form.serialize(), function(result) {
						if(result.sent){
							btnText.html("Sent!");
						}
						else{
							btnText.html("Error!");
						}
						
						// Reset form after 5s
						setTimeout(function() {
							btnText.html("Submit");
							$(form[0])[0].reset();
							validator.resetForm();
						}, 5000);
						
					}, 'json')
					.always(function() { 
						l.stop(); 
						validator.disableSubmitButtons(true);
					});
				},
			});
		},
		initScrollArow: function(){
			$("#scroll").click(function () {
				if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
					var target = $(this.hash);
					target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
					if (target.length) {
						$('html,body').animate({
							scrollTop: target.offset().top
						}, 1200);
						return false;
					}
				}
			});
		}
	};
	
	window.seventyThree = window.seventyThree || {};
	window.seventyThree = App;
});