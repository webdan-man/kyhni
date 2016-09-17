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


$('.btn_scroll').on('click', function () {
    $('body, html').animate({
        scrollTop: $('.s2').offset().top
    },scrollDuration);
});

//// Слайдер
$('.s4__slider').slick({
    slidesToShow: 1,
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
var description = $('.description-block');
$('[data-description]').on('mouseover', function () {
    var self = $(this);
    var data = self.data('description');
    description.data('text', data).attr('data-text', data);
    var oy = self.height() + self.position().top;
    description.addClass('active').clone();
    self.parent().append(description);
    $('.description-block').css({
        top: oy + 'px'
    });
});

$('[data-description]').on('mouseout', function () {
    $('.description-block').removeClass('active');
});

$('[data-slide]').on('click', function () {
    var data = $(this).data('slide');
    $('.s4__slider').slick('slickGoTo', data);
});

$('[data-tab-ctrl]').on('click', function () {
    var data = $(this).data('tab-ctrl');
    
    $('[data-tab]').addClass('hide');
    $('[data-tab="'+ data +'"]').removeClass('hide');
});

$('[data-select-all]').on('click', function () {
    var self = $(this);
    var checkbox = self.find('.checkbox-all');
    var parent = self.parent();

    if(!checkbox.is(':checked')){
        parent.find('input[type="checkbox"]').prop('checked', false);
    }
    else{
        parent.find('input[type="checkbox"]:not(.checkbox-all)').prop('checked', true);
    }
});
$('input[type="checkbox"]:not(.checkbox-all)').click(function () {
    $('.checkbox-all').prop('checked', false);
});


$('[data-step]').on('click', function () {
    var data = $(this).data('step');

    $('.s2').removeClass('step_1-bg step_2-bg step_3-bg step_4-bg');
    $('.s2').addClass('step_'+ data +'-bg');

    $('.s2 .step').addClass('hidden');
    $('.s2 .step_' + data).removeClass('hidden');
});