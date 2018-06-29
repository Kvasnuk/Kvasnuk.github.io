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
        infinite:true
    });



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

    $('.js-exchange-currency-from').click(function(){
        var self = $(this);
        changeListCurrency(self,'.js-exchange-currency-from');
        getCurrentCurrency(self, 'from');
    });
    $('.js-exchange-currency-to').click(function(){
        var self = $(this);
        changeListCurrency(self,'.js-exchange-currency-to');
        getCurrentCurrency(self, 'to');
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
    });
});
},{}]},{},[1])