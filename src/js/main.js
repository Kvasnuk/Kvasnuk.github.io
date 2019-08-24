jQuery(document).ready(function ($) {

    /* ---- alert modal functional ----*/

    var startTimer ='';
        var alertsCount = '';
        var $body = $('body');
        var closeAlertModal = function(body){
            clearInterval(startTimer);
            body.removeClass('no-scroll');
            $body.find('.alert-modal__body .container>div').removeClass('am-item');
            body.find('.alert-modal').fadeOut();
        };
        $body.find('.js-close-alert-modal').click(
            function(){
                closeAlertModal($body);
            }
        );
        $body.find('.alert-modal').click(function(e){
            if(e.target.className === 'alert-modal' || e.target.className === 'alert-modal__body'){
                closeAlertModal($body);
            }
        });
        $body.find('.alert-modal__body .close').click(function(e){
            e.preventDefault();

            if(alertsCount == 1){

                closeAlertModal($body);
            }else {
                $(this).parent('div').removeClass('am-item').fadeOut();
                alertsCount--;
            }
        });

        function showAlertModal(id,time){
            (time == undefined ? time = 30 : time);
            var $modal = $('#'+ id);
            var $modalId = '#'+ id;
            var timer = time;
            var $timerloader = $('.timer-loader');
            var $timerCount = $('#timer-count');
            startTimer = setInterval(function() {
                if(timer === 0){
                    closeAlertModal($body);
                    $timerCount.text('');
                } else {
                    $timerCount.text(timer);
                    timer--;
                }
            }, 1000);
            $timerloader.css('animation-duration', timer + 1 +'s');
            $timerCount.text(timer);
            $body.addClass('no-scroll');
            $body.find('.alert-modal').fadeOut();
            $body.find($modal).fadeIn();

            $body.find($modalId + ' .alert-modal__body .container>div').fadeIn().addClass('am-item');
            alertsCount = $body.find($modalId + ' .alert-modal__body .am-item').length;
        };

    /* ---- кнопка просто для примера ----*/
    $('#showMessage').click(function(){
        showAlertModal('m1',20);
    });
    $('#showMessage2').click(function(){
        showAlertModal('m2',20);
    });

 /* ---- END alert modal functional ----*/









    /*cookie short functions*/
    function getCookie(name) {
        var matches = document.cookie.match(new RegExp(
            "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
        ));
        return matches ? decodeURIComponent(matches[1]) : undefined;
    };

    function setCookie(name, value, options) {
        options = options || {};
        var expires = options.expires;

        if (typeof expires == "number" && expires) {
            var d = new Date();
            d.setTime(d.getTime() + expires * 1000);
            expires = options.expires = d;
        }
        if (expires && expires.toUTCString) {
            options.expires = expires.toUTCString();
        }

        value = encodeURIComponent(value);

        var updatedCookie = name + "=" + value;

        for (var propName in options) {
            updatedCookie += "; " + propName;
            var propValue = options[propName];
            if (propValue !== true) {
                updatedCookie += "=" + propValue;
            }
        }

        document.cookie = updatedCookie;
    };

    function deleteCookie(name) {
        setCookie(name, "", {
            expires: -1
        })
    };

    /*----------------------------*/


    $("main .js-exchange-full").click(function () {
        var date = new Date(new Date().getTime() + 60 * 1000 * 60 * 24 * 365);
        var fullSizeBtn = getCookie('fullSizeBtn');
        var fullSizeType = getCookie('screenType');
        var $mainPage = $('main');

        if (fullSizeBtn == undefined) {
            $('.b-exchange__settings--message').fadeOut();
            document.cookie = "fullSizeBtn=done; path=/; expires=" + date.toUTCString();
        }

        if (fullSizeType == undefined) {
            document.cookie = "screenType=full; path=/; expires=" + date.toUTCString();
            $mainPage.addClass('full-screen');

        } else {
            deleteCookie('screenType');
            $mainPage.removeClass('full-screen');

        }
    });

    if ($('.b-main.order-page').length > 0) {
        setExchangeLIstsMinHeight();
    }

    function setExchangeLIstsMinHeight() {
        var blockStyles = '';
        var blockHeight = 0;
        var $listLeftHeight = $('#exchange-currency-from').height();
        var $listRightHeight = $('#exchange-currency-to').height();
        ($listLeftHeight > $listRightHeight ? blockHeight = $listLeftHeight : blockHeight = $listRightHeight);
        blockStyles = "<style>.order-page.full-screen #exchange-list-left,.order-page.full-screen #exchange-list-right{ min-height: " + blockHeight  + "px;}</style>";
        $('head').append(blockStyles);

        setTimeout(function() {
            if ($('.b-main.order-page').length > 0 && $('.b-main.order-page').hasClass('full-screen') === false) {
                $('#exchange-currency-from').css('min-height', '0');
                $('#exchange-currency-to').css('min-height', '0');
            }
        },500);
    }

    // function checkPageForResize(){
    //     var home = $('main.home-page');
    //     var order = $('.order-page');
    //     var screenType = getCookie('screenType');
    //     if (window.matchMedia('(max-width: 1199px)').matches) {
    //         if(home.length = 1 ){
    //             home.addClass('full-screen');
    //         }
    //         if( order.length = 1) {
    //            order.addClass('full-screen');
    //         }
    //     }else {
    //         if(home.length = 1 && screenType !== undefined){
    //             home.addClass('full-screen');
    //         } else {
    //            home.removeClass('full-screen');
    //         }
    //         if(order.length = 1 && screenType !== undefined){
    //             order.addClass('full-screen');
    //         } else {
    //             order.removeClass('full-screen');
    //         }
    //     }
    //
    // }
    //checkPageForResize();

    $('.modal-message .close').click(function () {
        $('.modal-message').fadeOut();
        $('body').removeClass('no-scroll');
    });

    function checkVIsidetExchangePage() {
        var date = new Date(new Date().getTime() + 60 * 1000 * 60 * 24);
        var exchangePage = window.location.pathname;
        if (getCookie('isVisited') !== undefined && exchangePage.indexOf('exchange') >= 0) {
            $('body').addClass('isVisited');
        } else if (getCookie('isVisited') == undefined && exchangePage.indexOf('exchange') >= 0) {
            document.cookie = "isVisited=isVisited; path=/; expires=" + date.toUTCString();
        }
    }

    checkVIsidetExchangePage();

    /*exchange form cookies*/


    function getDayAndTime() {
        var currentTime = {
            day: parseInt(moment().tz("Europe/Kiev").format('DD')),
            time: parseInt(moment().tz("Europe/Kiev").format('HH')),
        }
        return currentTime;
    };

    function checkWorkingTime() {
        var currentKievTime = getDayAndTime();
        if (currentKievTime.time >= 0 && currentKievTime.time < 9) {
            $('.site-work-switch').addClass('switch-close');
            $('body').addClass('is_closed');
        }
        setTimeout(function () {
            $('.site-work-switch').addClass('show');
        });
    };

    function showSleepingMessage() {
        var currentKievTime = getDayAndTime(),
            messageIsClose = getCookie('isClose'),
            checkDate = getCookie('currentDate');
        if (currentKievTime.time >= 0 && currentKievTime.time < 9) {
            if (messageIsClose === undefined) {
                $('#work-time-message').fadeIn();
            } else if (messageIsClose !== undefined && checkDate != currentKievTime.day) {
                $('#work-time-message').fadeIn();
            }
        } else {
            deleteCookie('isClose');
            deleteCookie('currentDate');
        }
    };

    showSleepingMessage();
    checkWorkingTime();
    $('.js-time-message__close').click(function () {
        var currentKievTime = getDayAndTime();
        var date = new Date(new Date().getTime() + 60 * 1000 * 60 * 24);
        document.cookie = "isClose=close; path=/; expires=" + date.toUTCString();
        document.cookie = "currentDate=" + currentKievTime.day + "; path=/; expires=" + date.toUTCString();
        $('#work-time-message').fadeOut();
    });

    /*home page slider init*/
    if ($('.owl-carousel')) {
        $('.owl-carousel').owlCarousel({
            items: 4,
            margin: 25,
            loop: true,
            center: false,
            dotsEach: true,
            autoplay: true,
            autoplayHoverPause: true,
            responsive: {
                0: {
                    items: 1,
                    margin: 15,
                },
                600: {
                    items: 2,
                    center: true,
                },
                1000: {
                    items: 3,
                    margin: 25,
                    center: true,
                },
                1680: {
                    items: 4,
                    center: true,
                }
            }
        });
    }


    /*check page and add template class for body tag*/
    function checkHomePage() {
        var location = window.location.pathname;
        if ('/' === location) {
            $('body').addClass('home-template');
        } else if (location.indexOf('/profile') === 0) {
            $('body').addClass('page-template is_authorizated');
        } else {
            $('body').addClass('page-template');
        }
    }


    function checkCurrencyCount() {
        if ($('.js-exchange-currency-from') && $('.js-exchange-currency-from').length > 10) {
            $('#exchange-currency-from').addClass('scroll-items');
        }
        if ($('.js-exchange-currency-to') && $('.js-exchange-currency-to').length > 10) {
            $('#exchange-currency-to').addClass('scroll-items');
        }
    }

    checkCurrencyCount();

    function changeListCurrency(self, listClass) {
        $(listClass).removeClass('active');
        self.addClass('active');

    };

    function getCurrentCurrency(self, part) {
        var currencyClass = self.data('alias'),
            currencyTitle = self.text(),
            $currencyPart = $('#exchange-ddl-' + part);
        $currencyPart.removeClass().addClass(currencyClass);
        $currencyPart.text(currencyTitle);
        if ($('#account-message-' + part.length > 0)) {
            changeAccountMessageCurrency(currencyTitle, part);
        }
    }

    function checkBitcoinActiveClass() {
        if ($('.b-exchange-currency__item[data-alias="BTC"]')) {
            if ($('.b-exchange-currency__item[data-alias="BTC"]').hasClass('active')) {
                $('.b-statistic').addClass('bitcoin-active');
            } else {
                $('.b-statistic').removeClass('bitcoin-active');
            }
        }


    }

    function checkCurrencyFullSizeCookie() {
        if (getCookie('fullSizeBtn') === undefined) {
            $('.b-exchange__settings--message').fadeIn();
        }
    }

    function exchangeReverseValue(from, to) {
        var $reverseFrom = $(from),
            $reverseTo = $(to),
            $reverseFromValue = $reverseFrom.text(),
            $reverseToValue = $reverseTo.text();
        $reverseFrom.text($reverseToValue);
        $reverseTo.text($reverseFromValue);
    }

    function changeAccountMessageCurrency(title, part) {
        $('#account-message-' + part).text(title);
    }

    function disableOpositeActiveItem(listFrom, listTo) {
        if ($(listFrom).length > 0) {
            var activeItemAlias = $(listFrom + ' .active').data('alias');
            $(listTo + " li").removeClass('currency_disabled');
            $(listTo + " li[data-alias='" + activeItemAlias + "']").addClass('currency_disabled');
        } else {
            return false;
        }
    }

    function disableCurrencyItems() {
        disableOpositeActiveItem('#exchange-currency-from', '#exchange-currency-to');
        disableOpositeActiveItem('#exchange-currency-to', '#exchange-currency-from');
    }

    disableCurrencyItems();

    checkHomePage();
    $('.js-exchange-currency-from').click(function (e) {
        var self = $(this);
        if (self.hasClass('currency_disabled')) {
            return false;
        }
        changeListCurrency(self, '.js-exchange-currency-from');
        getCurrentCurrency(self, 'from');
        checkBitcoinActiveClass();
        disableOpositeActiveItem('#exchange-currency-from', '#exchange-currency-to');


    });
    $('.js-exchange-currency-to').click(function (e) {
        var self = $(this);
        if (self.hasClass('currency_disabled')) {
            return false;
        }
        changeListCurrency(self, '.js-exchange-currency-to');
        getCurrentCurrency(self, 'to');
        checkBitcoinActiveClass();
        disableOpositeActiveItem('#exchange-currency-to', '#exchange-currency-from');
    });
    $('.js-exchange-reverse').click(function (e) {
        var $fromItem = $('#exchange-ddl-from'),
            $toItem = $('#exchange-ddl-to'),
            $fromInput = $('#exchange-from-input'),
            $toInput = $('#exchange-to-input'),
            $fromInputVal = parseInt($fromInput.val()),
            $toInputVal = parseInt($toInput.val()),


            fromItemTitle = $fromItem.text(),
            toItemTitle = $toItem.text(),
            fromItemClass = $fromItem.attr('class'),
            toItemClass = $toItem.attr('class');
        if ($fromInput.val() === '') {
            e.preventDefault();
            $('#exchange-from-input').addClass('error-msg');
            setTimeout(function () {
                $('#exchange-from-input').removeClass('error-msg');
            }, 500);
        } else {
            $fromItem.text(toItemTitle);
            $toItem.text(fromItemTitle);
            $fromInput.val($toInputVal);
            $toInput.val($fromInputVal);

            $fromItem.removeClass().addClass(toItemClass);
            $toItem.removeClass().addClass(fromItemClass);
            $('.js-exchange-currency-from').removeClass('active');
            $('.js-exchange-currency-to').removeClass('active');
            $(".js-exchange-currency-from[data-alias='" + toItemClass + "']").addClass('active');
            $(".js-exchange-currency-to[data-alias='" + fromItemClass + "']").addClass('active');
            disableCurrencyItems();

            if ($('.exchange-sum').length > 0) {
                exchangeReverseValue('.exchange-sum-currency--from', '.exchange-sum-currency--to');
                exchangeReverseValue('#account-message-from', '#account-message-to');

                var $fromInput = $('#account-number-from'),
                    $toInput = $('#account-number-to'),
                    $fromInputVal = $fromInput.val(),
                    $toInputVal = $toInput.val();
                if ($fromInputVal !== '' || $toInputVal !== '') {
                    $fromInput.val($toInputVal);
                    $toInput.val($fromInputVal);
                }
            }
        }
    });


    // The function
    var background_image_parallax = function ($object, multiplier) {
        multiplier = typeof multiplier !== 'undefined' ? multiplier : 0.5;
        multiplier = 1 - multiplier;
        var $doc = $(document),
            objectTopPosition = parseInt($object.css("top"));
        $(window).scroll(function () {
            var from_top = $doc.scrollTop(),
                objectTop = objectTopPosition + (multiplier * from_top) + 'px';
            $object.css({"top": objectTop});
        });


    };
    $('.current-lang').click(function (e) {
        e.preventDefault();
    });
    $('.mobile-menu__item--menu').click(function () {
        $(this).toggleClass('open');
        $('#header-navigation').fadeToggle(400);
    });
    checkBitcoinActiveClass();
    if ($('#home-banner')) {
        background_image_parallax($(".bg-currency-icon--adv"), 0.5);
        background_image_parallax($(".bg-currency-icon--btc"), 0.65);
        background_image_parallax($(".bg-currency-icon--qiwi"), 0.3);
        background_image_parallax($(".bg-currency-icon--yandex"), 0.65);
        background_image_parallax($(".bg-currency-icon--pm"), 0.35);
    }
    if ($('.b-exchange__settings--full')) {
        checkCurrencyFullSizeCookie();
    }


    /* profile pages */
    if ($('#current-time').length > 0) {
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
        label: "<span>Переместите ваш файл сюда!</span><span>Разрешение .png .jpg</span><span>Максимальный размер: 6 МБ</span>"
    });


    if ($('flipTimer')) {
        function getCountDowndate() {
            var date = new Date();
            date.setMinutes(date.getMinutes() + 20);
            return date;
        }

        $('.flipTimer').flipTimer({
            direction: 'down',
            date: getCountDowndate(),
            callback: function () {
                alert('times up!');
            }

        });
    }
    /*------Start Order check page--------*/

    function setUpdatedCourse(res) {
      $('#course').text(res.updatedCourse);
    }
    function setUpdatedAmount(res) {
      var $fromAmountInput = $('#update-amount-from input'),
          $toAmountInput = $('#update-amount-to input');
      $('.update-amount-from').text(res.sell.value +' '+ res.sell.currency);
      $('.update-amount-to').text(res.buy.value +' '+ res.buy.currency);
      $('#update-amount-from-min').text(res.sell.min);
      $('#update-amount-from-max').text(res.sell.max);
      $('#update-amount-to-min').text(res.buy.min);
      $('#update-amount-to-max').text(res.buy.max);
      $fromAmountInput.attr({'min': res.sell.min, max: res.sell.max});
      $toAmountInput.attr({'min': res.buy.min, max: res.buy.max});
    }

   function getUpdatedCourseAndAmount() {
       $.ajax({
           method: "GET",
           url: "https://jsonplaceholder.typicode.com/posts",  // change URL
           dataType: 'json',
       })
           .done(function( data ) {
               var response = {
                   updatedCourse: 35,     //data.course.sell
                   sell: {
                       currency: 'USD',  //data.sellCurrency.symbol
                       value: 89,         //data.sell_amount
                       min: 50,          //data.sell_min
                       max: 120,         //data.sell_max
                   },
                   buy: {
                       currency: 'EUR', //data.buyCurrency.symbol
                       value: 91,       //data.buy_amount
                       min: 60,         //data.buy_min
                       max: 150,        //data.buy_max
                   },
               };
               setUpdatedCourse(response);
               setUpdatedAmount(response);
           });
   }

    /*----------  timer fn -----*/

    function getTimeRemaining(endtime) {
        var t = Date.parse(endtime) - Date.parse(new Date());
        var seconds = Math.floor((t / 1000) % 60);
        var minutes = Math.floor((t / 1000 / 60) % 60);
        var hours = Math.floor((t / (1000 * 60 * 60)) % 24);
        var days = Math.floor(t / (1000 * 60 * 60 * 24));
        return {
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
    }

    function initializeClock(id, endtime) {
        var clock = document.getElementById(id);
        var minutesSpan = clock.querySelector('.minutes');
        var secondsSpan = clock.querySelector('.seconds');

        function updateClock() {
            var t = getTimeRemaining(endtime);
            minutesSpan.innerHTML = ('0' + t.minutes).slice(-2);
            secondsSpan.innerHTML = ('0' + t.seconds).slice(-2);

            if (t.total <= 0) {
                clearInterval(timeinterval);
                getUpdatedCourseAndAmount();
                var deadline = new Date(Date.parse(new Date()) + 3 * 60 * 1000);
                initializeClock('clockdiv', deadline);
            }
        }
        updateClock();
        var timeinterval = setInterval(updateClock, 1000);
    }

if ($('.countdown-container').length === 1) {
    var dataDiff = $('.timer').attr('data-diff');
    var deadline = new Date(Date.parse(new Date()) + dataDiff * 1000);
    initializeClock('clockdiv', deadline);
}


/*--------START --- check amount update data --------*/

    function transformFieldValue(value, dataType) {

         if(dataType === 'update-amount-from' || dataType === 'update-amount-to') {
            return +value.split(' ')[0];
         }
         return value;
    }


  $('.js-edit-data').click(function(e) {
         var $btn = $(this),
             dataField = $btn.data('field'),
             $fieldContainer =   $('#'+ dataField),
             $fieldInput =   $('#'+ dataField + ' input'),
             $field = $('.' + dataField),
             inputValue = $field.text(),
             transformedData = transformFieldValue(inputValue, dataField);
             $fieldInput.attr('data-value', transformedData);

             $('.b-check-amount').addClass('updating-data');
             $fieldContainer.addClass('isActive');
             $fieldContainer.find('input').val(transformedData).focus();
             
  });


    function updateAmountData (inputParentId) {
        var $checkAmountContainer = $('.b-check-amount'),
            $fieldMsg = $('#' + inputParentId + ' .update-data-msg'),
           $inputContainer = $('#' + inputParentId),
           $input = $('#' + inputParentId + ' input'),
           dataMin = +$input.attr('min'),
           dataMax = +$input.attr('max'),
           dataValue = +$input.val(),
           data = {};
           inputParentId === 'update-amount-from' ?
            data = {'sell_amount' : dataValue} :
            data = {'buy_amount' : dataValue};

        if(dataValue >= dataMin && dataValue <= dataMax) {
            $fieldMsg.removeClass('error');
            $.ajax({
                type: "POST",
                url: "https://jsonplaceholder.typicode.com/posts",  // change URL
                dataType: 'json',
                contentType: "application/json; charset=utf-8",
                data: JSON.stringify(data),
                success: function(data) {
                    if(data){
                        var response = {
                            //updatedCourse: 35,     //data.course.sell
                            sell: {
                                currency: 'USD',  //data.sellCurrency.symbol
                                value: 89,         //data.sell_amount
                                min: 50,          //data.sell_min
                                max: 120,         //data.sell_max
                            },
                            buy: {
                                currency: 'EUR', //data.buyCurrency.symbol
                                value: 91,       //data.buy_amount
                                min: 60,         //data.buy_min
                                max: 150,        //data.buy_max
                            },
                        };
                        $fieldMsg.removeClass('error');
                        setUpdatedAmount(response);
                        //$('.'+ inputParentId).text(dataValue);
                        $inputContainer.removeClass('isActive');
                        $checkAmountContainer.removeClass('updating-data');
                    } else {
                        $fieldMsg.addClass('error');
                    }
                },
                error: function(error) {
                    $fieldMsg.text(error).addClass('error');
                }
            });

        } else {
            $fieldMsg.addClass('error');

        }

    }

    function updateInvoiceData(inputParentId) {
        var $checkAmountContainer = $('.b-check-amount'),
            $fieldMsg = $('#' + inputParentId + ' .update-data-msg'),
            $inputContainer = $('#' + inputParentId),
            $input = $('#' + inputParentId + ' input'),
            dataValue = $input.val(),
            data = {};
            inputParentId === 'update-number-from' ?
                data = {'numberFrom' : dataValue} :
                data = {'numberTo' : dataValue};
        $('.'+ inputParentId).text(dataValue);
        $inputContainer.removeClass('isActive');
        $checkAmountContainer.removeClass('updating-data');
            $.ajax({
            type: "POST",
            url: "https://jsonplaceholder.typicode.com/posts",  // change URL
            dataType: 'json',
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(data),
            success: function(response) {
                if(response.message === '' ){
                    $fieldMsg.text('').removeClass('error');
                    $('.'+ inputParentId).text(dataValue);
                    $inputContainer.removeClass('isActive');
                    $checkAmountContainer.removeClass('updating-data');
                } else {
                    $fieldMsg.text(response.message).addClass('error');
                }
            },
            error: function(error) {
                $fieldMsg.text(error).addClass('error');
            }
        });
    }


  $('.js-amount-submit').click(function() {

    var $checkAmountContainer = $('.b-check-amount'),
        currentId = $(this).parent('div').attr('id'),
        currentInput = $(this).parent('div').find('input');

    if(currentInput.attr('data-value') === currentInput.val()){
        $(this).parent('.update-data-field').removeClass('isActive');
        $checkAmountContainer.removeClass('updating-data');
    } else {
        switch (currentId) {
            case 'update-amount-from':
                updateAmountData(currentId);
                break;

            case 'update-amount-to':
                updateAmountData(currentId);
                break;

            case 'update-number-from':
                  updateInvoiceData(currentId);
                  break;
             case 'update-number-to':
                  updateInvoiceData(currentId);
                  break;
            default:
                $(this).parent('.update-data-field').removeClass('isActive');
                $checkAmountContainer.removeClass('updating-data');
        }
    }
  });
/*--------END --- check amount update data --------*/
/*------END Order check page--------*/

// 5168 4000 3245 5490   5168 0944 5645 3455
    $('.icon-copy').hover(function () {
        var self = $(this);
        if (self.data('toggle') === undefined) {
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

    $('.icon-copy').click(function () {
        var self = $(this),
            copyText = self.parent('span').text(),
            textInput = "<input type='text' value='" + copyText + "'>";
        self.append(textInput);
        self.find('input').focus().select();
        document.execCommand('copy');
        self.find('input').remove();
    });

    $('.js-program-code-copy').click(function () {
        var curentTrigger = $(this).data('trigger'),
            copyBtn = $(curentTrigger);
        copyBtn.trigger('click');

    });


    /*media size functions*/
    function resizeCloseSidebar() {
        var $profileSidebar = $('.b-profite__part--left');
        var $sidebarToggleBtn = $('.js-toggle-mobile-sidebar');
        if (window.matchMedia('(max-width: 1199px)').matches) {
            if ($profileSidebar.length > 0) {
                $sidebarToggleBtn.fadeIn().removeClass('open');
                $profileSidebar.addClass('close-sidebar');
            }
        } else {
            if ($profileSidebar.length > 0) {
                $sidebarToggleBtn.fadeOut();
                $profileSidebar.removeClass('close-sidebar');
            }
        }

    }

    $(window).resize(function () {
        resizeCloseSidebar();
        if ($('.b-main.order-page').length > 0) {
            setExchangeLIstsMinHeight();
        }
    });

    function mediaSize() {
        var $sidebarToggleBtn = $('.js-toggle-mobile-sidebar');
        if (window.matchMedia('(max-width: 1199px)').matches) {
            if ($('body').find('.b-profite__part--left').length > 0) {
                $sidebarToggleBtn.addClass('open');
                $sidebarToggleBtn.fadeIn();
                $sidebarToggleBtn.click(function () {
                    $(this).toggleClass('open');
                    $('body').find('.b-profite__part--left').toggleClass('close-sidebar');
                });
                setTimeout(function () {
                    $('body').find('.b-profite__part--left').addClass('close-sidebar');
                    $sidebarToggleBtn.removeClass('open');

                }, 1500);
            }


        } else {

        }
    };
    mediaSize();
    $('.js-message-close').click(function () {
        $(this).parent('div').fadeOut();
    });

    $('.js-time-message__close').click(function () {
        $(this).parent('div').fadeOut();
    });





    function showStatusReview() {
        var btnOffset = $('#btn-leave-review').offset();
        var btnOffsetTop = btnOffset.top;
        var windowHeight =  $(window).height();
        function showButton(){
            if ($(window).scrollTop() + windowHeight >= btnOffsetTop ) {
                $('.review-btn-fixed').addClass('hide-btn');
            } else {
                $('.review-btn-fixed').removeClass('hide-btn');
            }
        }
        showButton();
        $(window).resize(function() {
            windowHeight =  $(window).height();
            showButton();

        });
        $(window).scroll(function() {
            showButton();

        });

    }

    if($('#btn-leave-review').length > 0 ) {
        showStatusReview();
    }

    function updateActiveFilter(el) {
        el.parent().find('button').removeClass('active');
        el.addClass('active');
    }
/*update filter */
    $('.js-filter-btn').click(function() {
        updateActiveFilter($(this));
        var dataSide = $(this).data('side'),
            dataGroup = $(this).data('group'),
            listId = dataSide === 'left' ? 'exchange-currency-from' : 'exchange-currency-to';
        $('#'+listId).attr('data-filter', dataGroup);

        if ($('.b-main.order-page').length > 0) {
            setExchangeLIstsMinHeight();
        }
    });
    /*update filter */

$('.js-show-order-message').click(function() {
    $(this).removeClass('animate');
    $('.b-alert__modal').fadeIn();
});
$('.close-alert-modal').click(function() {
    $('.b-alert__modal').fadeOut();
});


});

