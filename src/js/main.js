jQuery(document).ready(function($){
    if($('.owl-carousel')){
        $('.owl-carousel').owlCarousel({
            items:4,
            margin:25,
            loop:true,
            center:false,
            dotsEach:true,
            autoplay:true,
            autoplayHoverPause:true,
            responsive:{
                0:{
                    items:1,
                    margin:15,
                },
                600:{
                    items:2,
                    center:true,
                },
                1000:{
                    items:3,
                    margin:25,
                    center:true,
                },
                1680:{
                    items:4,
                    center:true,
                }
            }
        });
    }
    function checkHomePage(){
    var location = window.location.pathname;
    if('/' === location){
        $('body').addClass('home-template');
    }else if(location.indexOf('/profile') === 0){
        $('body').addClass('page-template is_authorizated');
    }else{
        $('body').addClass('page-template');
    }
}
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
            if($('#account-message-'+part.length>0)){
                changeAccountMessageCurrency( currencyTitle,part);
            }
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
    function exchangeReverseValue(from, to){
        var $reverseFrom = $(from),
            $reverseTo = $(to),
            $reverseFromValue = $reverseFrom.text(),
            $reverseToValue = $reverseTo.text();
        $reverseFrom.text($reverseToValue);
        $reverseTo.text($reverseFromValue);
    }
    function changeAccountMessageCurrency(title, part){
         $('#account-message-'+ part).text(title);
    }

    function disableOpositeActiveItem(listFrom,listTo){
        if($(listFrom).length > 0){
          var activeItemAlias =  $(listFrom + ' .active').data('alias');
              $(listTo + " li").removeClass('currency_disabled');
              $(listTo + " li[data-alias='"+activeItemAlias+"']").addClass('currency_disabled');
        }else{
            return false;
        }
    }

        function disableCurrencyItems(){
            disableOpositeActiveItem('#exchange-currency-from','#exchange-currency-to');
            disableOpositeActiveItem('#exchange-currency-to','#exchange-currency-from');
        }
            disableCurrencyItems();








    checkHomePage();
    $('.js-exchange-currency-from').click(function(e){
        var self = $(this);
        if(self.hasClass('currency_disabled')){
            return false;
        }
        changeListCurrency(self,'.js-exchange-currency-from');
        getCurrentCurrency(self, 'from');
        checkBitcoinActiveClass();
        disableOpositeActiveItem('#exchange-currency-from','#exchange-currency-to');


    });
    $('.js-exchange-currency-to').click(function(e){
        var self = $(this);
        if(self.hasClass('currency_disabled')){
            return false;
        }
        changeListCurrency(self,'.js-exchange-currency-to');
        getCurrentCurrency(self, 'to');
        checkBitcoinActiveClass();
        disableOpositeActiveItem('#exchange-currency-to','#exchange-currency-from');
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
            disableCurrencyItems();

            if($('.exchange-sum').length > 0){
                exchangeReverseValue('.exchange-sum-currency--from','.exchange-sum-currency--to');
                exchangeReverseValue('#account-message-from','#account-message-to');

                    var $fromInput = $('#account-number-from'),
                        $toInput = $('#account-number-to'),
                        $fromInputVal = $fromInput.val(),
                        $toInputVal =   $toInput.val();
                    if($fromInputVal !== '' || $toInputVal !== ''){
                        $fromInput.val($toInputVal);
                        $toInput.val($fromInputVal);
                    }
            }
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
    $('.current-lang').click(function(e){
        e.preventDefault();
    });
$('.mobile-menu__item--menu').click(function(){
    $(this).toggleClass('open');
$('#header-navigation').fadeToggle(400);
});
    checkBitcoinActiveClass();
    if($('#home-banner')){
        background_image_parallax($(".bg-currency-icon--adv"),0.5);
        background_image_parallax($(".bg-currency-icon--btc"), 0.65);
        background_image_parallax($(".bg-currency-icon--qiwi"), 0.3);
        background_image_parallax($(".bg-currency-icon--yandex"), 0.65);
        background_image_parallax($(".bg-currency-icon--pm"), 0.35);
    }
    if($('.b-exchange__settings--full')){
        checkCurrencyFullSizeCookie();
    }




    /* profile pages */
if($('#current-time').length > 0){
    function checkTime(i) {
        if (i < 10) {
            i = "0" + i;
        }
        return i;
    }

    function startTime() {
        var today = new Date();
        var h = today.getHours();
        var m = today.getMinutes();
        var s = today.getSeconds();
        // add a zero in front of numbers<10
        m = checkTime(m);
        s = checkTime(s);
        document.getElementById('current-time').innerHTML = h + ":" + m + ":" + s;
        t = setTimeout(function () {
            startTime()
        }, 500);
    }
    startTime();
    }


    $(".upload").upload({
        action: "/upload.php",
        maxSize: 6291456,
        label:"<span>Переместите ваш файл сюда!</span><span>Разрешение .png .jpg</span><span>Максимальный размер: 6 МБ</span>"
    });


if($('flipTimer')){
    function getCountDowndate(){
        var date = new Date();
        date.setMinutes(date.getMinutes() + 20);
        return date;
    }

    $('.flipTimer').flipTimer({
        direction: 'down',
        date:getCountDowndate(),
        callback: function() { alert('times up!');
        }

    });
}

    $('.icon-copy').hover(function(){
        var self = $(this);
        if(self.data('toggle') === undefined) {
            var curentLang = $('html').attr('lang'),
                title = self.parent('span').text(),
                titleLabel = 'Копировать текст - ' + title;

            if (curentLang === 'en-EN') {
                titleLabel = 'Copy text -' + title;
            }
            self.data({'toggle': 'tooltip', 'placement': 'top'});
            self.attr('title', titleLabel);
        }
    });

$('.icon-copy').click(function(){
    var self = $(this),
        copyText = self.parent('span').text(),
        textInput = "<input type='text' value='"+copyText+"'>";
        self.append(textInput);
        self.find('input').focus().select();
        document.execCommand('copy');
        self.find('input').remove();




});

});

