var requared = $('input[data-required]');
var modal = '.modal';
var navList = $('.nav-link');
var navigationPanel = $('.navigation');
var scrollDuration = 600;
var form = $('form');


$('input[name="name"]').on('keypress', function() {
    var that = this;

    setTimeout(function() {
        var res = /[^A-Za-zА-Яа-яЁё]/g.exec(that.value);
        that.value = that.value.replace(res, '');
    }, 0);
});
requared.blur(function() {var self = $(this);if($(this).val().length == "") {self.addClass('input_error');setTimeout(function () {self.removeClass('input_error')}, 2000)}});
requared.focus(function() {$(this).removeClass('input_error');});


var close = function () {
    $(modal).addClass('hidden');
    $(modal + '>div:not(.layout)').addClass('hidden');
};


var open = function () {
    $(modal).removeClass('hidden');
    $($(this).data('modal')).removeClass('hidden')
};


form.submit(function(e){
    e.preventDefault();
    var self = $(this);
    var requared = true;
    var inputs = self.find('[data-required]');

    $('[name="frm-name"]').val(self.attr('name'));

    for(var i = 0; i < inputs.length; i++){
        if(inputs.eq(i).val() == '') {
            requared = false;
        }
    }
    if(requared){
        var type = self.attr('method');
        var url = self.attr('action');
        var data = self.serialize();
        $.ajax({type: type, url: url, data: data,
            success : function(){
                $('form input').val('');
                console.log('Success');
            }
        });
    }
    else{
        for(var i = 0; i < inputs.length; i++){
            if(inputs.eq(i).val() == '') {
                inputs.eq(i).addClass('input_error');
                setTimeout(function () {
                    inputs.removeClass('input_error');
                }, 2000);
            }
        }
    }
});


//// скрипт закрывающий форму
$('[data-btn-type="close"]').on('click', close);

//// скрипт открывающий форму
$('[data-modal]').on('click', open);


//// плавная прокрутка по странице
navList.on('click', function(e){
    $('.menu-btn').toggleClass('active');
    var position = $(this).index();
    e.preventDefault();
    $('body, html').animate({
        scrollTop: $('.anchor'+ position +'').offset().top
    },scrollDuration);
});


//// Слайдер
$('.slider').slick({
    slidesToShow: 3,
    arrows: false,
    centerMode: true,
    responsive: [
        {
            breakpoint: 680,
            settings: {
                slidesToShow: 1
            }
        }
    ]
});

//// Определяет заполнен инпут или нет для анимации
// $('.input-body .input').on('blur', function(){
//     var self = $(this);
//
//     if(self.val() !== ''){
//         self.addClass('entered');
//     }
//     else{
//         self.removeClass('entered');
//     }
// });

$('[data-toggle]').on('click', function(){
    var data = $(this).data('toggle');
    $(this).toggleClass(data);
});

$('[data-body-class]').on('click', function(){
    var data = $(this).data('body-class');
    $('body').toggleClass(data);
});

// FULL PAGE SCRIPT
var isMobile = false;
if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
    isMobile = true;
}

function stabilize(){
    $('section:not(.menu)').each(function(index, el) {
        var self = $(this);
        var sectionClass = self.data('block-color');
        var eTop = self.offset().top;
        var posTop = eTop - $(window).scrollTop();
        if(posTop>-$(window).height()/2&&posTop<$(window).height()/2){
            $("html, body").animate({ scrollTop: $(this).offset().top}, 250);
            $('body').removeClass('white-block');
            $('body').addClass(sectionClass);
            if(!self.hasClass('s1')){
                $('.header__text').addClass('hidden');
            }
            else{
                $('.header__text').removeClass('hidden');
            }
        }
    });
}
if (isMobile != true) {
    $(window).scroll(function(){
        if($(window).outerWidth() > 960){
            clearTimeout($.data(this, 'scrollTimer'));
            $.data(this, 'scrollTimer',setTimeout(stabilize,1500));
        }
    });
}
