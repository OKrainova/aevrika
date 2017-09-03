$(function () {
    
      var patterns = {
        name: /^[A-ZА-Я][a-zа-я]+$/gi,
        phone: /^(\+7|8){1}\s?(\(?\d{3,4}\)?)(-|\s)?\d{3}((-|\s)?\d{2}){2}$/g,
        email: /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i,
        tags: /<[^>]+>/gi
    };

    $(window).on('scroll', function () {
        $(this).scrollTop() > 100 ? $(".btn-top").fadeIn() : $(".btn-top").fadeOut();
    });

    // Кнопка наверх
    $('.btn-top').on('click', function () {
        $('html:not(:animated), body:not(:animated)').animate({scrollTop: 0}, 700);
    });

    $('.header-menu__toggle').on('click', function () {

        var menu = $('.header-menu__list');
        var self = $(this);
       
        self.stop(true).toggleClass('close');

        if (!menu.hasClass('open')) {
            menu.addClass('open').stop(true).slideDown(500);
        } 
        else
        {
           menu.stop(true).slideUp(500, function(){
               $(this).removeClass('open').removeAttr("style");
           });
        }

    });
    
    //проверка формы
    
     $('form').on('submit', function (e) {
        var err = 0;
        var inputs = $(this).find(".form-control");
        for (var i = 0; i < inputs.length; i++) {
            var pattern = inputs[i].getAttribute('data-pattern');

            if (!checkInput(inputs[i].value, patterns[pattern], pattern)) {
                inputs[i].classList.add('error');
                err++;
            } else {
                inputs[i].classList.remove('error');
            }
        }

        if (err > 0) {
            e.preventDefault();
        }
    });

    $('.form-control').on('focus', function(){
        $(this).removeClass('error');
    });
    function checkInput(value, pattern, patternName) {
        if (value === "")
            return false;
        if (patternName === "tags")
            return !(pattern.test(value));
        return pattern.test(value);
    }
    
    $('form.header-search').on('submit', function(e){
        e.preventDefault();
    });
});

