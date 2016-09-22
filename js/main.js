var requared = $('input[data-required]');
var modal = '.modal';
var navList = $('.menu__list-item');
var scrollDuration = 600;
var form = $('form');
var isBig = true;
$('input[name="name"]').on('keypress', function() {
    var that = this;

    setTimeout(function() {
        var res = /[^A-Za-zА-Яа-яЁё]/g.exec(that.value);
        that.value = that.value.replace(res, '');
    }, 0);
});
requared.blur(function() {var self = $(this);if($(this).val().length == "") {self.addClass('input_error');setTimeout(function () {self.removeClass('input_error')}, 2000)}});
requared.focus(function() {$(this).removeClass('input_error');});
function getURLParameter(name) {return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search)||[,""])[1].replace(/\+/g, '%20'))||null;}
function run_geo(geo_url){
    $.ajax({type: 'GET',url: geo_url,dataType: 'xml',
        success: function(xml) {$(xml).find('ip').each(function(){
            var city = $(this).find('city').text();
            var region = $(this).find('region').text();
            if(city!=region){var ipg = city+', '+region;}else{var ipg = city;}
            $('<input type="hidden" />').attr({name: 'location', class: 'location', value:ipg}).appendTo("form");
        });}});
}
$.get("http://ipinfo.io", function(response) {geo_url='http://ipgeobase.ru:7020/geo?ip='+response.ip; run_geo(geo_url);}, "jsonp");
utm=[];$.each(["utm_source","utm_medium","utm_campaign","utm_term",'source_type','source','position_type','position','added','creative','matchtype'],function(i,v){$('<input type="hidden" />').attr({name: v, class: v, value: function(){if(getURLParameter(v) == undefined)return '-'; else return getURLParameter(v)}}).appendTo("form")});
$('<input type="hidden" />').attr({name: 'url', value: document.location.href}).appendTo("form");
$('<input type="hidden" />').attr({name: 'title', value: document.title}).appendTo("form");

// var submit_track_event = function (event) {
//     if(yaCounter){
//         yaCounter.reachGoal(event);
//     }
//     if(ga){
//         ga('send', 'event', 'submit', event);
//     }
// };

var construct = {
    result: {},
    isNext: false,
    species: '',
    application: '',
    dub: ['lac', 'ton'],
    sosna: ['lac', 'ton', 'ton_pat', 'bash'],
    jasen: ['lac', 'ton'],
    buk: ['emal', 'emal_pat'],
    resultPic: [],
    formType: [],
    optional: {
        tabletop: [],
        equipment: [],
        apps: []
    },
    output: function () {
        var self = this;
        var species;
        if(this.species == 'sosna'){
            self.species = 'Сосна';
        }
        else if(this.species == 'buk'){
            self.species = 'Бук'
        }
        else if(this.species == 'jasen'){
            self.species = 'Ясень'
        }
        else if(this.species == 'dub'){
            self.species = 'Дуб'
        }
        if(this.formType[0] == 1){
            $('[data-output="form-type"]').text('Прямая');
        }
        else if(this.formType[0] == 2){
            $('[data-output="form-type"]').text('П-образная');
        }
        else if(this.formType[0] == 3){
            $('[data-output="form-type"]').text('Угловая');
        }
        $('[data-output="species"]').text(self.species);
        if(this.formType.length > 0){
            $('[data-output="form"]').attr('src', 'img/section2/forms/' + this.formType[0] + '.png');
        }

        var src = this.resultPic.join('_');
        $('[data-result-pic]').attr('src', 'img/section2/renrers/' + src + '.png');

        var input = $('.step_3').find('input:checked');
        input.each(function (i, elem) {
            var optional_data = elem.getAttribute('data-optional');
            self.optional[optional_data].push(elem.value);
        });

        for (var key in self.optional){
            $('[data-output="'+ key +'"]').text(self.optional[key].join(''));

            if(self.optional[key].length == 0){
                $('[data-output="'+ key +'"]').text('Не выбрано');
            }
        }
    },
    applicationSort: function (type) {
        var types = this[type];
        var application = $('[data-application]');
        application.addClass('hidden');
        application.removeClass('disabled active');
        for (var i = 0; i < types.length; i++){
            $('[data-application="'+ types[i] +'"]').removeClass('hidden');
        }
    },
    setSpecies: function (elem) {
        var data = elem.data('species');
        this.species = data;
        this.resultPic[0] = data;
        this.applicationSort(data);
    },
    setApplication: function (elem) {
        var data = elem.data('application');
        this.isNext = true;
        this.application = data;
        this.resultPic[1] = data;
        this.output();
    },
    setForm: function (elem) {
        this.isNext = true;
        this.formType[0] = elem.data('kitchen-form');
        this.formType[2] = elem.data('kitchen-form-type');
        this.formType[1] = elem.text();
    },
    clear: function () {
        this.isNext = false;
        $('.step_3 input:checked').prop('checked', false);
        $('[data-application]').addClass('disabled').removeClass('active');
        $('[data-species]').removeClass('active');
        $('[data-kitchen-form]').removeClass('active');
        this.formType = [];
    },
    serialize: function () {
        var self = this;
        self.result = {
            material: self.species,
            application: '',
            formType: self.formType[2],
            optional: ''
        };
        if(this.application == 'lac'){
            self.result.application = 'лак';
        }
        else if(this.application == 'ton'){
            self.result.application = 'тонированние'
        }
        else if(this.application == 'ton_pat'){
            self.result.application = 'тонированние с патиной'
        }
        else if(this.application == 'bash'){
            self.result.application = 'брашированние'
        }
        else if(this.application == 'emal'){
            self.result.application = 'эмаль'
        }
        else if(this.application == 'emal_pat'){
            self.result.application = 'эмаль с патиной'
        }
        for (var key in self.optional){
            self.result.optional += self.optional[key].join(', ') + ', ';
        }
        $('[name="material"]').val(self.result.material);
        $('[name="application"]').val(self.result.application);
        $('[name="optional"]').val(self.result.optional);
        $('[name="kitchen-form"]').val(self.result.formType);
    }
};


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
    if(self.data('form-name') == 'constructor'){
        construct.serialize();
    }

    if(self.data('form-name') == 'estimate-coast'){
        var checked = self.find('input:checked');
        var optional = '';
        var stage = '';
        var material = '';
        checked.each(function (i, item) {
            if(item.name == 'product-item'){
                optional += item.value + ', ';
            }
            else if(item.name == 'stage-item'){
                stage += item.value + ', ';
            }
            else if(item.name == 'tree-item'){
                material += item.value + ', ';
            }
        });
        self.find('[name="optional"]').val(optional);
        self.find('[name="stage"]').val(stage);
        self.find('[name="material"]').val(material);
    }

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
        var track_event = self.find('input[name="event"]').val();
        $.ajax({type: type, url: url, data: data,
            success : function(){
                //submit_track_event(track_event);
                $('#success-pop').arcticmodal();
                $('form input[type="text"]:not([name="event"])').val('');
                self.find('[type="radio"]').prop('checked', false);
                construct.clear();

                setTimeout(function () {
                    $.arcticmodal('close');
                }, 2000);
            }
        });
    }
    else{
        $('#error-pop').arcticmodal();
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
    $('body').removeClass('menu-active');
    $('body, html').animate({
        scrollTop: $('.anchor'+ position +'').offset().top
    },scrollDuration);
});


$('[data-scroll-btn]').on('click', function () {
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
        var eTop = self.offset().top;
        var posTop = eTop - $(window).scrollTop();
        if(posTop>-$(window).height()/2&&posTop<$(window).height()/2){
            $("html, body").animate({ scrollTop: $(this).offset().top}, 250);
        }
    });
}

function menuColor(){
    $('section:not(.menu)').each(function(index, el) {
        var self = $(this);
        var sectionClass = self.data('block-color');
        var eTop = self.offset().top;
        var posTop = eTop - $(window).scrollTop();
        if($(window).scrollTop() >= self.offset().top){
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
        if($(window).outerWidth() > 420){
            menuColor()
        }
    });
}


if($(window).width() < 1620){
    isBig = false;
}

$(window).resize(function () {
    if($(window).width() < 1620){
        isBig = false;
    }
    else{
        isBig = true;
    }
});

$(window).scroll(function(){
    if(!isBig && $(window).outerWidth() > 960 && $(window).outerHeight() > 600){
        clearTimeout($.data(this, 'scrollTimer'));
        $.data(this, 'scrollTimer',setTimeout(stabilize,1500));
    }
    else if(isBig && $(window).outerWidth() > 960 && $(window).outerHeight() > 800){
        clearTimeout($.data(this, 'scrollTimer'));
        $.data(this, 'scrollTimer',setTimeout(stabilize,1500));
    }
});
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
    if(construct.isNext || $('.step_3 input:checked').length > 0){
        $('.s2').removeClass('step_1-bg step_2-bg step_3-bg step_4-bg');
        $('.s2').addClass('step_'+ data +'-bg');
        $('.s2 .step').addClass('hidden');
        $('.s2 .step_' + data).removeClass('hidden');
        construct.isNext = false;
    }
});


$('[ data-step-prev]').on('click', function () {
    var data = $(this).data('step-prev');
    $('.s2').removeClass('step_1-bg step_2-bg step_3-bg step_4-bg');
    $('.s2').addClass('step_'+ data +'-bg');
    $('.s2 .step').addClass('hidden');
    $('.s2 .step_' + data).removeClass('hidden');
    construct.isNext = true;

    if(data == 1){
        construct.isNext = false;
        construct.clear();
        console.log(construct.isNext);
    }
});

$('[data-species]').on('click', function () {
    $('[data-species]').removeClass('active');
    $(this).addClass('active');
    construct.setSpecies($(this));
});

$('[data-application]').on('click', function () {
    if(!$(this).hasClass('disabled')){
        $('[data-application]').removeClass('active');
        $(this).addClass('active');
        construct.setApplication($(this));
    }
});

$('[data-kitchen-form]').on('click', function () {
    $('[data-kitchen-form]').removeClass('active');
    $(this).addClass('active');
    construct.setForm($(this));
});

$('[data-result-btn]').on('click', function () {
    construct.output();
});