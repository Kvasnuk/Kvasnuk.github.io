(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
jQuery(document).ready(function($){
    $('#news-slider').slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        dots: true,
        centerMode: true,
        arrows:false,
        autoplay: true,
        autoplaySpeed: 5000,
        infinite:true,
        responsive: [
            {
                breakpoint: 1199,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 767,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 639,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    centerMode: false,
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    centerMode: false,
                }
            },
        ]
    });

    function getCookie(name) {
        var matches = document.cookie.match(new RegExp(
            "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
        ));
        return matches ? decodeURIComponent(matches[1]) : undefined;
    }
function checkCurrencyCount(){
    if($('.js-exchange-currency-from') && $('.js-exchange-currency-from').length > 10){
          $('#exchange-currency-from').addClass('scroll-items');
    }
    if($('.js-exchange-currency-to') && $('.js-exchange-currency-to').length > 10){
        $('#exchange-currency-to').addClass('scroll-items');
    }

}
    checkCurrencyCount();
    function changeListCurrency(self,listClass){
        $(listClass).removeClass('active');
        self.addClass('active');
    };
    function getCurrentCurrency(self, part){
        var currencyClass = self.data('alias'),
            currencyTitle = self.text(),
            $currencyPart = $('#exchange-ddl-'+ part);
            $currencyPart.removeClass().addClass(currencyClass);
            $currencyPart.text(currencyTitle);
    }
    function checkBitcoinActiveClass(){
        if($('.b-exchange-currency__item[data-alias="BTC"]')){
            if( $('.b-exchange-currency__item[data-alias="BTC"]').hasClass('active')){
                $('.b-statistic').addClass('bitcoin-active');
            }else{
                $('.b-statistic').removeClass('bitcoin-active');
            }
        }


    }
    function checkCurrencyFullSizeCookie(){
        if(getCookie('fullSizeBtn') === undefined){
            $('.b-exchange__settings--message').fadeIn();
        }
    }

    $('.js-exchange-currency-from').click(function(){
        var self = $(this);
        changeListCurrency(self,'.js-exchange-currency-from');
        getCurrentCurrency(self, 'from');
        checkBitcoinActiveClass();
    });
    $('.js-exchange-currency-to').click(function(){
        var self = $(this);
        changeListCurrency(self,'.js-exchange-currency-to');
        getCurrentCurrency(self, 'to');
        checkBitcoinActiveClass();
    });
    $('.js-exchange-reverse').click(function(e){
        var $fromItem = $('#exchange-ddl-from'),
            $toItem = $('#exchange-ddl-to'),
            $fromInput = $('#exchange-from-input'),
            $toInput = $('#exchange-to-input'),
            $fromInputVal = parseInt($fromInput.val()),
            $toInputVal =   parseInt($toInput.val()),


            fromItemTitle = $fromItem.text(),
            toItemTitle = $toItem.text(),
            fromItemClass = $fromItem.attr('class'),
            toItemClass= $toItem.attr('class');
        if($fromInput.val() === ''){
           e.preventDefault();
           $('#exchange-from-input').addClass('error-msg');
           setTimeout(function(){
               $('#exchange-from-input').removeClass('error-msg');
           },500);
        }else{
            $fromItem.text(toItemTitle);
            $toItem.text(fromItemTitle);
            $fromInput.val($toInputVal);
            $toInput.val( $fromInputVal);

            $fromItem.removeClass().addClass(toItemClass);
            $toItem.removeClass().addClass(fromItemClass);
            $('.js-exchange-currency-from').removeClass('active');
            $('.js-exchange-currency-to').removeClass('active');
            $(".js-exchange-currency-from[data-alias='"+toItemClass+"']").addClass('active');
            $(".js-exchange-currency-to[data-alias='"+fromItemClass+"']").addClass('active');

        }
    });

    $( ".js-exchange-full" ).click(function() {
        $(this).toggleClass('active');
        $('.b-exchange').toggleClass('full-list');
        if(getCookie('fullSizeBtn') === undefined){
            $('.b-exchange__settings--message').fadeOut();
            var date = new Date(new Date().getTime() + 60 * 1000 * 60 * 24 * 365);
            document.cookie = "fullSizeBtn=done; path=/; expires=" + date.toUTCString();
        }
    });




    // The function
    var background_image_parallax = function($object, multiplier){
        multiplier = typeof multiplier !== 'undefined' ? multiplier : 0.5;
        multiplier = 1 - multiplier;
        var $doc = $(document),
            objectTopPosition = parseInt($object.css("top"));
        $(window).scroll(function(){
            var from_top = $doc.scrollTop(),
                objectTop = objectTopPosition +(multiplier * from_top) + 'px';
            $object.css({"top" : objectTop });
        });


    };
$('.mobile-menu__item--menu').click(function(){
    $(this).toggleClass('open');
$('#header-navigation').fadeToggle(400);
});
    checkBitcoinActiveClass();
    if($('#home-banner')){
        background_image_parallax($(".bg-currency-icon--adv"),0.5);
        background_image_parallax($(".bg-currency-icon--btc"), 0.65);
        background_image_parallax($(".bg-currency-icon--qiwi"), 0.3);
        background_image_parallax($(".bg-currency-icon--yandex"), 0.85);
        background_image_parallax($(".bg-currency-icon--pm"), 0.35);
    }
    if($('.b-exchange__settings--full')){
        checkCurrencyFullSizeCookie();
    }


});
},{}]},{},[1])