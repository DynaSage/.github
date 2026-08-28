/* ===================================================================
 * DynaSage - Main JS
 *
 * ------------------------------------------------------------------- */

(function ($) {

   "use strict";

   var cfg = {
         scrollDuration: 800, // smoothscroll duration
         mailChimpURL: 'https://facebook.us8.list-manage.com/subscribe/post?u=cdb7b577e41181934ed6a6a44&id=e6957d85dc' // mailchimp url
      },

      $WIN = $(window);

   // Add the User Agent to the <html>
   // will be used for IE10 detection (Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.2; Trident/6.0))
   var doc = document.documentElement;
   doc.setAttribute('data-useragent', navigator.userAgent);


   /* Preloader
    * -------------------------------------------------- */
   var clPreloader = function () {

      $("html").addClass('cl-preload');

      $WIN.on('load', function () {

         //force page scroll position to top at page refresh
         // $('html, body').animate({ scrollTop: 0 }, 'normal');

         // will first fade out the loading animation 
         $("#loader").fadeOut("slow", function () {
            // will fade out the whole DIV that covers the website.
            $("#preloader").delay(300).fadeOut("slow");
         });

         // for hero content animations 
         $("html").removeClass('cl-preload');
         $("html").addClass('cl-loaded');

      });
   };


   /* Menu on Scrolldown
    * ------------------------------------------------------ */
   var clMenuOnScrolldown = function () {

      var menuTrigger = $('.header-menu-toggle');

      $WIN.on('scroll', function () {

         if ($WIN.scrollTop() > 150) {
            menuTrigger.addClass('opaque');
         } else {
            menuTrigger.removeClass('opaque');
         }

      });
   };


   /* OffCanvas Menu
    * ------------------------------------------------------ */
   var clOffCanvas = function () {

      var menuTrigger = $('.header-menu-toggle'),
         nav = $('.header-nav'),
         closeButton = nav.find('.header-nav__close'),
         siteBody = $('body'),
         mainContents = $('section, footer');

      // open-close menu by clicking on the menu icon
      menuTrigger.on('click', function (e) {
         e.preventDefault();
         // menuTrigger.toggleClass('is-clicked');
         siteBody.toggleClass('menu-is-open');
      });

      // close menu by clicking the close button
      closeButton.on('click', function (e) {
         e.preventDefault();
         menuTrigger.trigger('click');
      });

      // close menu clicking outside the menu itself
      siteBody.on('click', function (e) {
         if (!$(e.target).is('.header-nav, .header-nav__content, .header-menu-toggle, .header-menu-toggle span')) {
            // menuTrigger.removeClass('is-clicked');
            siteBody.removeClass('menu-is-open');
         }
      });

   };


   /* photoswipe
    * ----------------------------------------------------- */
   var clPhotoswipe = function () {
      var items = [],
         $pswp = $('.pswp')[0],
         $folioItems = $('.item-folio');

      // get items
      $folioItems.each(function (i) {

         var $folio = $(this),
            $thumbLink = $folio.find('.thumb-link'),
            $title = $folio.find('.item-folio__title'),
            $caption = $folio.find('.item-folio__caption'),
            $titleText = '<h4>' + $.trim($title.html()) + '</h4>',
            $captionText = $.trim($caption.html()),
            $href = $thumbLink.attr('href'),
            $size = $thumbLink.data('size').split('x'),
            $width = $size[0],
            $height = $size[1];

         var item = {
            src: $href,
            w: $width,
            h: $height
         }

         if ($caption.length > 0) {
            item.title = $.trim($titleText + $captionText);
         }

         items.push(item);
      });

   };


   /* Stat Counter
    * ------------------------------------------------------ */
   var clStatCount = function () {

      var statSection = $(".about-stats"),
         stats = $(".stats__count");

      statSection.waypoint({

         handler: function (direction) {

            if (direction === "down") {

               stats.each(function () {
                  var $this = $(this);

                  $({
                     Counter: 0
                  }).animate({
                     Counter: $this.text()
                  }, {
                     duration: 4000,
                     easing: 'swing',
                     step: function (curValue) {
                        $this.text(Math.ceil(curValue));
                     }
                  });
               });

            }

            // trigger once only
            this.destroy();

         },

         offset: "90%"

      });
   };


   /* Masonry
    * ---------------------------------------------------- */
   var clMasonryFolio = function () {

      var containerBricks = $('.masonry');

      containerBricks.imagesLoaded(function () {
         containerBricks.masonry({
            itemSelector: '.masonry__brick',
            resize: true
         });
      });
   };


   /* slick slider
    * ------------------------------------------------------ */
   var clSlickSlider = function () {

      $('.clients').slick({
         arrows: false,
         dots: true,
         infinite: true,
         slidesToShow: 6,
         slidesToScroll: 2,
         //autoplay: true,
         pauseOnFocus: false,
         autoplaySpeed: 1000,
         responsive: [{
               breakpoint: 1200,
               settings: {
                  slidesToShow: 5
               }
            },
            {
               breakpoint: 1000,
               settings: {
                  slidesToShow: 4
               }
            },
            {
               breakpoint: 800,
               settings: {
                  slidesToShow: 3,
                  slidesToScroll: 2
               }
            },
            {
               breakpoint: 500,
               settings: {
                  slidesToShow: 2,
                  slidesToScroll: 2
               }
            }

         ]
      });

      $('.testimonials').slick({
         arrows: true,
         dots: false,
         infinite: true,
         slidesToShow: 1,
         slidesToScroll: 1,
         adaptiveHeight: true,
         pauseOnFocus: false,
         autoplaySpeed: 1500,
         responsive: [{
               breakpoint: 900,
               settings: {
                  slidesToShow: 1,
                  slidesToScroll: 1
               }
            },
            {
               breakpoint: 800,
               settings: {
                  arrows: false,
                  dots: true
               }
            }
         ]
      });

   };

   /* Smooth Scrolling
    * ------------------------------------------------------ */
   var clSmoothScroll = function () {

      $('.smoothscroll').on('click', function (e) {
         var target = this.hash,
            $target = $(target);

         e.preventDefault();
         e.stopPropagation();

         $('html, body').stop().animate({
            'scrollTop': $target.offset().top
         }, cfg.scrollDuration, 'swing').promise().done(function () {

            // check if menu is open
            if ($('body').hasClass('menu-is-open')) {
               $('.header-menu-toggle').trigger('click');
            }

            window.location.hash = target;
         });
      });

   };


   /* Placeholder Plugin Settings
    * ------------------------------------------------------ */
   var clPlaceholder = function () {
      $('input, textarea, select').placeholder();
   };


   /* Alert Boxes
    * ------------------------------------------------------ */
   var clAlertBoxes = function () {

      $('.alert-box').on('click', '.alert-box__close', function () {
         $(this).parent().fadeOut(500);
      });

   };


   /* Contact Form
    * ------------------------------------------------------ */
   var clContactForm = function () {

      /* local validation */
      $('#contactForm').validate({

         /* submit via ajax */
         submitHandler: function (form) {

            var sLoader = $('.submit-loader');

            $.ajax({

               type: "POST",
               url: "inc/sendEmail.php",
               data: $(form).serialize(),
               beforeSend: function () {

                  sLoader.slideDown("slow");

               },
               success: function (msg) {

                  // Message was sent
                  if (msg == 'OK') {
                     sLoader.slideUp("slow");
                     $('.message-warning').fadeOut();
                     $('#contactForm').fadeOut();
                     $('.message-success').fadeIn();
                  }
                  // There was an error
                  else {
                     sLoader.slideUp("slow");
                     $('.message-warning').html(msg);
                     $('.message-warning').slideDown("slow");
                  }

               },
               error: function () {

                  sLoader.slideUp("slow");
                  $('.message-warning').html("Something went wrong. Please try again.");
                  $('.message-warning').slideDown("slow");

               }

            });
         }

      });
   };


   /* Animate On Scroll
    * ------------------------------------------------------ */
   var clAOS = function () {

      AOS.init({
         offset: 200,
         duration: 600,
         easing: 'ease-in-sine',
         delay: 300,
         once: true,
         disable: 'mobile'
      });

   };


   /* AjaxChimp
    * ------------------------------------------------------ */
   var clAjaxChimp = function () {

      $('#mc-form').ajaxChimp({
         language: 'es',
         url: cfg.mailChimpURL
      });

      // Mailchimp translation
      //
      //  Defaults:
      //	 'submit': 'Submitting...',
      //  0: 'We have sent you a confirmation email',
      //  1: 'Please enter a value',
      //  2: 'An email address must contain a single @',
      //  3: 'The domain portion of the email address is invalid (the portion after the @: )',
      //  4: 'The username portion of the email address is invalid (the portion before the @: )',
      //  5: 'This email address looks fake or invalid. Please enter a real email address'

      $.ajaxChimp.translations.es = {
         'submit': 'Submitting...',
         0: '<svg class="alert-icon" aria-hidden="true" viewBox="0 0 512 512"><path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209L241 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L335 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z"/></svg> We have sent you a confirmation email',
         1: '<svg class="alert-icon" aria-hidden="true" viewBox="0 0 576 512"><path d="M549.655 124.083C537.81 106.95 517.382 96 494.118 96H81.882C58.618 96 38.19 106.95 26.345 124.083C14.499 141.217 12.2 162.767 19.911 181.871L204.91 492.871C214.709 514.154 235.364 528 257.714 528H318.286C340.636 528 361.291 514.154 371.09 492.871L556.089 181.871C563.8 162.767 561.501 141.217 549.655 124.083zM256 352C241.088 352 229 339.912 229 324.999L229.143 188C229.143 173.088 241.231 161 256.143 161C271.054 161 283.143 173.088 283.143 188L283 324.999C283 339.912 270.912 352 256 352zM256 400C241.088 400 229 387.912 229 373L229 373C229 358.088 241.088 346 256 346C270.912 346 283 358.088 283 373L283 373C283 387.912 270.912 400 256 400z"/></svg> You must enter a valid e-mail address.',
         2: '<svg class="alert-icon" aria-hidden="true" viewBox="0 0 576 512"><path d="M549.655 124.083C537.81 106.95 517.382 96 494.118 96H81.882C58.618 96 38.19 106.95 26.345 124.083C14.499 141.217 12.2 162.767 19.911 181.871L204.91 492.871C214.709 514.154 235.364 528 257.714 528H318.286C340.636 528 361.291 514.154 371.09 492.871L556.089 181.871C563.8 162.767 561.501 141.217 549.655 124.083zM256 352C241.088 352 229 339.912 229 324.999L229.143 188C229.143 173.088 241.231 161 256.143 161C271.054 161 283.143 173.088 283.143 188L283 324.999C283 339.912 270.912 352 256 352zM256 400C241.088 400 229 387.912 229 373L229 373C229 358.088 241.088 346 256 346C270.912 346 283 358.088 283 373L283 373C283 387.912 270.912 400 256 400z"/></svg> E-mail address is not valid.',
         3: '<svg class="alert-icon" aria-hidden="true" viewBox="0 0 576 512"><path d="M549.655 124.083C537.81 106.95 517.382 96 494.118 96H81.882C58.618 96 38.19 106.95 26.345 124.083C14.499 141.217 12.2 162.767 19.911 181.871L204.91 492.871C214.709 514.154 235.364 528 257.714 528H318.286C340.636 528 361.291 514.154 371.09 492.871L556.089 181.871C563.8 162.767 561.501 141.217 549.655 124.083zM256 352C241.088 352 229 339.912 229 324.999L229.143 188C229.143 173.088 241.231 161 256.143 161C271.054 161 283.143 173.088 283.143 188L283 324.999C283 339.912 270.912 352 256 352zM256 400C241.088 400 229 387.912 229 373L229 373C229 358.088 241.088 346 256 346C270.912 346 283 358.088 283 373L283 373C283 387.912 270.912 400 256 400z"/></svg> E-mail address is not valid.',
         4: '<svg class="alert-icon" aria-hidden="true" viewBox="0 0 576 512"><path d="M549.655 124.083C537.81 106.95 517.382 96 494.118 96H81.882C58.618 96 38.19 106.95 26.345 124.083C14.499 141.217 12.2 162.767 19.911 181.871L204.91 492.871C214.709 514.154 235.364 528 257.714 528H318.286C340.636 528 361.291 514.154 371.09 492.871L556.089 181.871C563.8 162.767 561.501 141.217 549.655 124.083zM256 352C241.088 352 229 339.912 229 324.999L229.143 188C229.143 173.088 241.231 161 256.143 161C271.054 161 283.143 173.088 283.143 188L283 324.999C283 339.912 270.912 352 256 352zM256 400C241.088 400 229 387.912 229 373L229 373C229 358.088 241.088 346 256 346C270.912 346 283 358.088 283 373L283 373C283 387.912 270.912 400 256 400z"/></svg> E-mail address is not valid.',
         5: '<svg class="alert-icon" aria-hidden="true" viewBox="0 0 576 512"><path d="M549.655 124.083C537.81 106.95 517.382 96 494.118 96H81.882C58.618 96 38.19 106.95 26.345 124.083C14.499 141.217 12.2 162.767 19.911 181.871L204.91 492.871C214.709 514.154 235.364 528 257.714 528H318.286C340.636 528 361.291 514.154 371.09 492.871L556.089 181.871C563.8 162.767 561.501 141.217 549.655 124.083zM256 352C241.088 352 229 339.912 229 324.999L229.143 188C229.143 173.088 241.231 161 256.143 161C271.054 161 283.143 173.088 283.143 188L283 324.999C283 339.912 270.912 352 256 352zM256 400C241.088 400 229 387.912 229 373L229 373C229 358.088 241.088 346 256 346C270.912 346 283 358.088 283 373L283 373C283 387.912 270.912 400 256 400z"/></svg> E-mail address is not valid.'
      }

   };


   /* Back to Top
    * ------------------------------------------------------ */
   var clBackToTop = function () {

      var pxShow = 500, // height on which the button will show
         fadeInTime = 400, // how slow/fast you want the button to show
         fadeOutTime = 400, // how slow/fast you want the button to hide
         scrollSpeed = 300, // how slow/fast you want the button to scroll to top. can be a value, 'slow', 'normal' or 'fast'
         goTopButton = $(".go-top")

      // Show or hide the sticky footer button
      $(window).on('scroll', function () {
         if ($(window).scrollTop() >= pxShow) {
            goTopButton.fadeIn(fadeInTime);
         } else {
            goTopButton.fadeOut(fadeOutTime);
         }
      });
   };


   /* Copy portfolio links to clipboard
    * ------------------------------------------------------ */
   var clCopyLinks = function () {

      var CHECK_PATH = '<path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z"/>';
      var LINK_PATH  = '<path d="M440-280H280q-83 0-141.5-58.5T80-480q0-83 58.5-141.5T280-680h160v80H280'
         + 'q-50 0-85 35t-35 85q0 50 35 85t85 35h160v80ZM320-440v-80h320v80H320Zm200 160v-80h160'
         + 'q50 0 85-35t35-85q0-50-35-85t-85-35H520v-80h160q83 0 141.5 58.5T880-480q0 83-58.5 141.5'
         + 'T680-280H520Z"/>';

      function copyText(text) {
         if (navigator.clipboard && navigator.clipboard.writeText) {
            return navigator.clipboard.writeText(text);
         }
         return new Promise(function (resolve, reject) {
            var ta = document.createElement('textarea');
            ta.value = text;
            ta.setAttribute('readonly', '');
            ta.style.position = 'absolute';
            ta.style.left = '-9999px';
            document.body.appendChild(ta);
            ta.select();
            try {
               var ok = document.execCommand('copy');
               document.body.removeChild(ta);
               ok ? resolve() : reject();
            } catch (e) {
               document.body.removeChild(ta);
               reject(e);
            }
         });
      }

      $('.item-folio__project-link').on('click', function (e) {
         e.preventDefault();
         var $btn = $(this);
         var url = $btn.attr('data-clipboard-link');
         if (!url) return;

         copyText(url).then(function () {
            var $svg = $btn.find('svg');
            $svg.html(CHECK_PATH);
            $btn.addClass('copied');
            window.setTimeout(function () {
               $svg.html(LINK_PATH);
               $btn.removeClass('copied');
            }, 1500);
         }).catch(function () {
            // If copy fails (e.g. blocked), still flash so the user knows the click registered.
            $btn.addClass('copied');
            window.setTimeout(function () {
               $btn.removeClass('copied');
            }, 1500);
         });
      });
   };


   /* Initialize
    * ------------------------------------------------------ */
   (function ssInit() {

      clPreloader();
      clMenuOnScrolldown();
      clOffCanvas();
      clPhotoswipe();
      clStatCount();
      clMasonryFolio();
      clSlickSlider();
      clSmoothScroll();
      clPlaceholder();
      clAlertBoxes();
      clContactForm();
      clAOS();
      clAjaxChimp();
      clBackToTop();
      clCopyLinks();

   })();


})(jQuery);