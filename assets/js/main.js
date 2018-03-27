jQuery(document).ready(function($){

/*****
*** Auto Hide and Reveal Header
*****/

//modified from:
//https://codyhouse.co/gem/auto-hiding-navigation/

	var mainHeader = $('.cd-auto-hide-header'),
		// secondaryNavigation = $('.cd-secondary-nav'),
		// //this applies only if secondary nav is below intro section
		// belowNavHeroContent = $('.sub-nav-hero'),
		headerHeight = mainHeader.height();

	//set scrolling variables
	var scrolling = false,
		previousTop = 0,
		currentTop = 0,
		scrollDelta = 10,
		scrollOffset = 150;

	$(window).on('scroll', function(){
		if( !scrolling ) {
			scrolling = true;
			(!window.requestAnimationFrame)
				? setTimeout(autoHideHeader, 250)
				: requestAnimationFrame(autoHideHeader);
		}
	});

	$(window).on('resize', function(){
		headerHeight = mainHeader.height();
	});

	function autoHideHeader() {
		var currentTop = $(window).scrollTop();

		// ( belowNavHeroContent.length > 0 )
		// 	? checkStickyNavigation(currentTop) // secondary navigation below intro
		// 	:
    checkSimpleNavigation(currentTop);

	   	previousTop = currentTop;
		scrolling = false;
	}

	function checkSimpleNavigation(currentTop) {
		//there's no secondary nav or secondary nav is below primary nav
	    if (previousTop - currentTop > scrollDelta) {
	    	//if scrolling up...
	    	mainHeader.removeClass('is-hidden');
	    } else if( currentTop - previousTop > scrollDelta && currentTop > scrollOffset) {
	    	//if scrolling down...
	    	mainHeader.addClass('is-hidden');
	    }
	}

		//have nav links scroll to sections
  	$('a.button').bind('click', function(e) {
			var $anchor= $(this);
			//console.log($anchor);
			var $offset = $($anchor.attr('href')).offset().top;
			var $windowOffset = $(window).scrollTop();
			//console.log($offset);
			//console.log($windowOffset);
			//console.log(previousTop);
			//console.log(currentTop);
			if(previousTop - currentTop < scrollDelta || previousTop < $offset && $windowOffset !== 0) { //at top, going down the page
				 	$('html, body').stop().animate({
				 			scrollTop: ($($anchor.attr('href')).offset().top
							)}, 1250, 'easeInOutQuart');
							e.preventDefault();
			} else {
					$('html, body').stop().animate({
						scrollTop: ($($anchor.attr('href')).offset().top - 50
						)}, 1250, 'easeInOutQuart');
						e.preventDefault();
					  }
		  });

/***** Mobile Menu Behavior *****/

	// $("#cd-navigation a").click(function() {
	// 	$("#navbar").removeClass("in");
	// });

	$(".nav-item").click(function() {
		$("#navbar").removeClass("show");
	});

	// $(".nav-item").click(function() {
	// 	$("#navbar").slideUp();
	// });

	//hamburger icon changes
	$('#nav-icon').click(function(){
		$(this).toggleClass('open');
	});
	$(".nav-item").click(function(){
		$('#nav-icon').toggleClass('open');
	});


/***** About Section Reveal *****/

/* https://github.com/jlmakes/scrollreveal */
	window.sr = ScrollReveal({duration: 2000 });
	sr.reveal('.reveal', 75);

/*****
*** Portfolio Section Interactions
*****/

var arrayWell = ["assets/img/ILH-960-img.jpg", "Inner Light Holistic", "Alternative Wellness",
             "The business owner wanted her site visitors to be able to learn about Reiki, schedule and pay for appointments, view details about upcoming classes, and send her any questions they may have. I built this responsive website with WordPress by creating a custom theme. I also installed and configured several plug-ins to help achieve the desired functionality.",
             "http://innerlightholistic.com"];

var arrayIT = ["assets/img/luminet2-960-opt.jpg", "Luminet", "IT Project Management",
               "This small, responsive website was designed and coded without any framework or content management system. It includes a secure PHP contact form with Google's ReCaptcha anti-spam widget, and some jQuery animations.",
               "http://luminnet.com"];

var arrayABMG = ["assets/img/abmgblog-960.jpg", "Atlantic Bay Mortgage Group", "Mortgage Lending",
 								 "My projects at Atlantic Bay included the creation of two distinct blog sections on atlanticbay.com, a brand style refresh for the entire website, and a UI element kit for use in future projects. Atlanticbay.com lacked a centralized blog, so we endeavored to create a way organize and share current and future posts. I translated the designer's mockups into a new set of PHP WordPress templates and CSS styles for the blog section. By creating a new custom post type, I was able to set up two distinct blogs  on the site - one for the mortgage customer, and one to serve other publishing needs. I also created a custom solution for placing breadcrumb navigation on individual posts of either type. Soon after the launch of the new blogs, Atlantic Bay reached 10,000 'likes' on Facebook for the first time in its history.",
									"http://atlanticbay.com/blog"];

var arraySTM = ["assets/img/stm-960-opt.jpg", "Southern Trust Mortgage", "Mortgage Lending", "Southern Trust Mortgage had a website built in the late 2000’s that we found to be rather limited in its functionality and customizability. We endeavored to make a new website to release in conjunction with a new modernized brand. The new SouthernTrust.com is built with a custom WordPress theme, and utilizes Bootstrap 4 for layout, navigation, and modals. It has a several features that are valuable in particular to a mortgage lending company with a large sales force of loan officers who need exceptional online representation. Special functionality on this website includes: <br> - 3 custom jQuery calculators for payment or savings estimates. <br> - Loan officer ID cookie which gets set in two different ways. It can be set by visiting any loan officer page, or by appending an ID parameter to the url of any page on the website. Once the cookie is set, the Loan Officer’s name, image, application link, and phone number will display in a clickable pop-out sticky panel in the lower right of the page. On small devices, the loan officer contact panel appears full width above the footer. This essentially allows a Loan Officer to remain visible and accessible no matter where users navigate on the website and helps ensure borrowers stay connected to the Loan Officer who originally brought them to Southern Trust Mortgage. <br> - Separate corporate and individual Loan Officer blogging capability. <br> - Robust search filters for locating branches or individual Loan Officers with the help of the WP_Facets plugin for WordPress.", "https://southerntrust.com" ];

var arraySTMportals = ["assets/img/mrp-960.jpg","Southern Trust Mortgage", "Mortgage Lending", "I've built two internal websites for Southern Trust Mortgage that exist to streamline the process of supporting the company's 80+ loan officers. The first is called the 'Marketing Request Portal' and it is a multi-page web form that automatically creates a helpdesk ticket from the submitted form values. The form was constructed with the Gravity Forms Wordpress plugin. I used Gravity Form's 'gform_post_render' hook to achieve some of the click actions within the form and wrote a long list of SCSS styles achieve the desired look. The end result is a responsive web portal for requesting marketing work which forwards complete requests into the ticketing system to ensure maximum accountability from both the requestor and request recipient. <br><br>The second internal use website is called the Fact App (factapp.southerntrust.com) and it is also a highly customized Gravity Form that loan officers can use to request support. To achieve the desired dunctionality behind this relatively short form, I utilized Gravity Form's 'gform_pre_submission' filter. Within the filter, I queried the database for the current logged in user and their phone numbers. Then I dynamically display their phone numbers as choices within the form. This saves the loan officer from having to type in ther phone number every time they want a subject matter expert to call or text them with an answer to their question. Fact App form submissions are also routed into our ticket system to ensure speedy responses and to generate tracking metrics.", "https://marketingrequest.southerntrust.com"];


var current = 0;
var arrayBasket = [];
arrayBasket.push(arrayWell);
arrayBasket.push(arrayIT);
arrayBasket.push(arrayABMG);
arrayBasket.push(arraySTM);
arrayBasket.push(arraySTMportals);

// add selected content into html elements
var dynamic = function(array) {
     $(".previews img").attr("src", array[0]);
     $("#cname").append("<strong>Name: </strong>" + array[1]);
     $("#cservice").append("<strong>Industry: </strong>" + array[2]);
     $("#pdesc").append(array[3]);
     $("#weblink a").prop("href", array[4]);
}
// remove content from html elements
var empty = function() {
    $(".previews img").attr("src", "");
    $(".previews img:nth-child(2)").remove();
		// $("#weblink a").css("display", "inline-block");
    $("#cname").empty();
    $("#cservice").empty();
    $("#pdesc").empty();
    $("#weblink a").prop("href", "");
}

// image click reveals hidden row populated with selected project's content
$(".folio").each(function(){
    $(this).click(function(e) {
       e.preventDefault();

        switch (this.getAttribute("id")) {

			case "ILR":
            empty();
            dynamic(arrayWell);
            current = 0;
            break;
			case "LNET":
            empty();
            dynamic(arrayIT);
            current = 1;
            break;
	    case "ABMG":
            empty();
            dynamic(arrayABMG);
            current = 2;
            break;
	    case "STM":
            empty();
            dynamic(arraySTM);
            $(".previews").append("<img src='assets/img/hpc-960-opt.jpg'>");
            current = 3;
            break;
			case "STMport":
            empty();
            dynamic(arraySTMportals);
            $(".previews").append("<img src='assets/img/factapp-960.jpg'>");
						// $("#weblink a").css("display", "none");
            current = 4;
            break;
      default:
	          dynamic(arraySTM);
	          current= 0;
            }

		   $("#portfolio").slideDown();
			 // bring revealed portfolio section to the top
			 $('html, body').stop().animate({
					scrollTop: $("#portfolio").offset().top
					}, 1250, 'easeInOutQuart');

			})
});

	// X closes #Portfolio div
    $("#close").click(function() {
        $("#portfolio").slideUp();
				empty();
    });

	// Arrows move data previous(left) or next(right)
		$("#left").click(function(){
		  empty();
		//get array position of the currently displayed array
		current
		//decrement by one the array position
		if(current == 0) {
		  prev= arrayBasket.length -1;
		  current = arrayBasket.length -1;
		} else {
		  prev = current -1;
		  current = current -1;
		  }
		//display the contents of that array
		dynamic(arrayBasket[prev]);
		if(current === 3){
			$(".previews").append("<img src='assets/img/hpc-960-opt.jpg'>");
		}
		if(current === 4){
			$(".previews").append("<img src='assets/img/factapp-960.jpg'>");
		}
		});


		$("#right").click(function(){
		  empty();
		//get array position of the currently displayed array
		current
		//decrement by one the array position
		if(current == arrayBasket.length -1) {
		  next= 0;
		  current= 0;
		} else {
		  next = current +1;
		  current = current +1;
		  }
		//display the contents of that array
		dynamic(arrayBasket[next]);
		if(current === 3){
			$(".previews").append("<img src='assets/img/hpc-960-opt.jpg'>");
		}
		if(current === 4){
			$(".previews").append("<img src='assets/img/factapp-960.jpg'>");
		}
		});

});
