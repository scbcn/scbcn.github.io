$(function(){
    'use strict';
    // bind change event to select
    $('.options.reset-settings.halloween-settings').on('change', function () {
        var url = $(this).val(); // get selected value
        if (url) { // require a URL
            window.location = url; // redirect
        }
        return false;
    });
});

'use strict';
var themeConfig = {
    init: false,
    options: {
        color: 'red-1',
        background: 'light',
        layout: 'wide',
        direction: 'ltr'
    },
    colors: [
        {
            'Hex': '#dc143c',
            'colorName': 'red-1'
        },
        {
            'Hex': '#d80018',
            'colorName': 'red-2'
        },
        {
            'Hex': '#386090',
            'colorName': 'blue-1'
        },
        {
            'Hex': '#4478b2',
            'colorName': 'blue-2'
        },
        {
            'Hex': '#2e9063',
            'colorName': 'green-1'
        },
        {
            'Hex': '#89c144',
            'colorName': 'green-2'
        },
        {
            'Hex': '#f1be03',
            'colorName': 'yellow-1'
        },
        {
            'Hex': '#e3c552',
            'colorName': 'yellow-2'
        },
        {
            'Hex': '#e47911',
            'colorName': 'orange-1'
        },
        {
            'Hex': '#e48f4c',
            'colorName': 'orange-2'
        },
        {
            'Hex': '#563d7c',
            'colorName': 'purple-1'
        },
        {
            'Hex': '#685ab1',
            'colorName': 'purple-2'
        },
        {
            'Hex': '#ec005f',
            'colorName': 'pink'
        },
        {
            'Hex': '#b8a279',
            'colorName': 'cumin'
        }
    ],
    backgrounds: [
        {
            'Hex': '#F5F5F5',
            'colorName': 'light'
        },
        {
            'Hex': '#0d1d31',
            'colorName': 'dark'
        }
    ],
    layouts: [
        {
            'Hex': '#999999',
            'layoutName': 'wide'
        },
        {
            'Hex': '#999999',
            'layoutName': 'boxed'
        }
    ],
    directions: [
        {
            'Hex': '#999999',
            'directionName': 'ltr'
        },
        {
            'Hex': '#999999',
            'directionName': 'rtl'
        }
    ],
    initialize: function () {
        var $this = this;
        if (this.init) return;

        $('head').append($('<link rel="stylesheet">').attr('href', 'assets/js/theme-config.css'));
        $this.build();
        $this.events();

        if ($.cookie('color') != null) {
            $this.setColor($.cookie('color'));
        } else {
            $this.setColor(themeConfig.options.color);
        }

        if ($.cookie('background') != null) {
            $this.setBackground($.cookie('background'));
            $this.setBackground('light');
        } else {
            //$this.setBackground(themeConfig.options.background);
            $this.setBackground('light');
        }

        if ($.cookie('layout') != null) {
            $this.setLayout($.cookie('layout'));
        } else {
            $this.setLayout(themeConfig.options.layout);
        }

        if ($.cookie('direction') != null) {
            $this.setDirection($.cookie('direction'));
        } else {
            $this.setDirection(themeConfig.options.direction);
        }

        if ($.cookie('init') == null) {
            $this.container.find('.theme-config-head a').click();
            $.cookie('init', true);
        }

        $this.init = true;
    },
    build: function () {
        var $this = this;
        var config = $('<div />')
            .attr('id', 'themeConfig')
            .addClass('theme-config visible-lg')
            .append($('<h4 />').html('Settings')
                .addClass('theme-config-head')
                .append($('<a />')
                    .attr('href', '#')
                    .append($('<i />')
                        .addClass('fa fa-cog fa-spin'))), $('<div />')
                .addClass('theme-config-wrap')
                .append($('<h5 />')
                    .addClass('theme-config-title')
                    .html('Predefined Colors'), $('<ul />')
                    .addClass('options colors')
                    .attr('data-type', 'colors'))
                .append($('<h5 />')
                    .addClass('theme-config-title')
                    .html('Background Colors'), $('<ul />')
                    .addClass('options background-colors')
                    .attr('data-type', 'backgrounds'))
                .append($('<h5 />')
                    .addClass('theme-config-title')
                    .html('Layout'), $('<ul />')
                //.append($('<ul />')
                    .addClass('options layouts')
                    .attr('data-type', 'layouts'))
                .append($('<h5 />')
                    .addClass('theme-config-title')
                    .html('Direction'), $('<ul />')
                    .addClass('options directions')
                    .attr('data-type', 'directions'))
                .append($('<hr />')
                    .addClass('theme-config-divider')
                    //.html(''), $('<ul />')
                    .html(''), $('<select />')
                    .addClass('options reset-settings halloween-settings')
                    .attr('data-type', 'halloween'))
                .append($('<hr />')
                    .addClass('theme-config-divider')
                    .html(''), $('<ul />')
                    .addClass('options reset-settings')
                    .attr('data-type', 'reset'))
            );
        $('body').append(config);
        this.container = $('#themeConfig');

        var themeColorList = this.container.find('ul[data-type=colors]');
        $.each(themeConfig.colors, function (i, value) {
            var color = $('<li />').append($('<a />')
                .css('background-color', themeConfig.colors[i].Hex)
                .attr({
                    'data-color-hex': themeConfig.colors[i].Hex,
                    'data-color-name': themeConfig.colors[i].colorName,
                    'href': '#',
                    'title': themeConfig.colors[i].colorName
                }).html(themeConfig.colors[i].colorName));
            themeColorList.append(color);
        });

        themeColorList.find('a').click(function (e) {
            e.preventDefault();
            $this.setColor($(this).attr('data-color-name'));
        });

        //

        var themeBackgroundList = this.container.find('ul[data-type=backgrounds]');
        $.each(themeConfig.backgrounds, function (i, value) {
            var background = $('<li />').append($('<a />')
                .css('background-color', themeConfig.backgrounds[i].Hex)
                .css('color', $.cookie('background'))
                .attr({
                    'data-color-hex': themeConfig.backgrounds[i].Hex,
                    'data-color-name': themeConfig.backgrounds[i].colorName,
                    'href': '#',
                    'title': themeConfig.backgrounds[i].colorName
                }).html(themeConfig.backgrounds[i].colorName));
            themeBackgroundList.append(background);
        });

        themeBackgroundList.find('a').click(function (e) {
            e.preventDefault();
            $this.setBackground($(this).attr('data-color-name'));
        });

        //

        var layoutList = this.container.find('ul[data-type=layouts]');
        $.each(themeConfig.layouts, function (i, value) {
            var layout = $('<li />').append($('<a />').css('background-color', themeConfig.layouts[i].Hex).attr({
                'data-color-hex': themeConfig.layouts[i].Hex,
                'data-layout-name': themeConfig.layouts[i].layoutName,
                'href': '#',
                'title': themeConfig.layouts[i].layoutName
            }).html(themeConfig.layouts[i].layoutName));
            layoutList.append(layout);
            layoutList.find('a').click(function (e) {
                e.preventDefault();
                $this.setLayout($(this).attr('data-layout-name'));
                theme.onResize();
            });
        });

        //

        var directionList = this.container.find('ul[data-type=directions]');
        $.each(themeConfig.directions, function (i, value) {
            var direction = $('<li />').append($('<a />').css('background-color', themeConfig.directions[i].Hex).attr({
                'data-color-hex': themeConfig.directions[i].Hex,
                'data-direction-name': themeConfig.directions[i].directionName,
                'href': '#',
                'title': themeConfig.directions[i].directionName
            }).html(themeConfig.directions[i].directionName));
            directionList.append(direction);
            directionList.find('a').click(function (e) {
                e.preventDefault();
                $this.setDirection($(this).attr('data-direction-name'));
            });
        });

        //

        var themeConfigReset = this.container.find('ul[data-type=reset]');
        var themeResetLink = $('<li />').append(
            $('<a />')
                .attr({'href': '#','title': 'Reset settings'})
                .html('Reset settings').addClass('reset-settings-link')
        );
        themeConfigReset.append(themeResetLink);
        themeConfigReset.find('a').click(function (e) {
            e.preventDefault();
            $this.reset();
        });

        //

        var themeConfigHalloween = this.container.find('select[data-type=halloween]');
        var themeHalloweenLink = //$('<li />').append(
                $('<option />')
                    .attr('value', '/')
                    .text('Select version')//.addClass('halloween-settings-link reset-settings-link')
        //)
            ;
        themeConfigHalloween.append(themeHalloweenLink);

        //

        var themeConfigHalloween = this.container.find('select[data-type=halloween]');
        var themeHalloweenLink = //$('<li />').append(
                $('<option />')
                    .attr('value', 'http://eazzy.me/html/imevent-eventbrite/')
                    .text('Eventbrite version')//.addClass('halloween-settings-link reset-settings-link')
        //)
            ;
        themeConfigHalloween.append(themeHalloweenLink);

        //

        var themeConfigHalloween = this.container.find('select[data-type=halloween]');
        var themeHalloweenLink = //$('<li />').append(
                $('<option />')
                    .attr('value', 'http://eazzy.me/html/imevent-halloween/')
                    .text('Halloween version')//.addClass('halloween-settings-link reset-settings-link')
        //)
            ;
        themeConfigHalloween.append(themeHalloweenLink);

        var themeChristmasLink = //$('<li />').append(
                $('<option />')
                    .attr('value', 'http://eazzy.me/html/imevent-christmas/')
                    .text('Christmas version')//.addClass('christmas-settings-link reset-settings-link')
        //)
            ;
        themeConfigHalloween.append(themeChristmasLink);

        var themeNewYearLink = //$('<li />').append(
                $('<option />')
                    .attr('value', 'http://eazzy.me/html/imevent-new-year/')
                    .html('New Year version')//.addClass('new-year-settings-link reset-settings-link')
        //)
            ;
        themeConfigHalloween.append(themeNewYearLink);

        var themeThanksgivingLink = //$('<li />').append(
                $('<option />')
                    .attr('value', 'http://eazzy.me/html/imevent-thanksgiving/')
                    .html('Thanksgiving Day version')//.addClass('thanksgiving-settings-link reset-settings-link')
        //)
            ;
        themeConfigHalloween.append(themeThanksgivingLink);

        var themeCircleVersionLink = //$('<li />').append(
                $('<option />')
                    .attr('value', 'http://eazzy.me/html/imevent/index-circle.html')
                    .html('Circle version')//.addClass('circleversion-settings-link reset-settings-link')
        //)
            ;
        themeConfigHalloween.append(themeCircleVersionLink);

        var themeWithoutHexagonLink = //$('<li />').append(
                $('<option />')
                    .attr('value', 'http://eazzy.me/html/imevent/index-wohex.html')
                    .html('Without Hexagon version')//.addClass('withouthexagon-settings-link reset-settings-link')
        //)
            ;
        themeConfigHalloween.append(themeWithoutHexagonLink);

        var themeVideBgLink = //$('<li />').append(
                $('<option />')
                    .attr('value', 'http://eazzy.me/html/imevent/index-video.html')
                    .html('Video Background')//.addClass('withouthexagon-settings-link reset-settings-link')
        //)
            ;
        themeConfigHalloween.append(themeVideBgLink);

        var themeMultipageVersionLink = //$('<li />').append(
                $('<option />')
                    .attr('value', 'http://eazzy.me/html/imevent-multipage/')
                    .html('Multipage version')//.addClass('multipageversion-settings-link reset-settings-link')
        //)
            ;
        //themeConfigHalloween.append(themeMultipageVersionLink);

        /*var themeBuyLink = $('<li />').append(
         $('<a style="font-weight: 700; color: #ffffff;" />')
         .attr({'href': 'http://themeforest.net/item/im-event-event-conference-landing-page/8334416?ref=jthemesstudio','title': 'Buy Theme'})
         .html('Buy Now').addClass('buy-theme-link reset-settings-link')
         );
         themeConfigHalloween.append(themeBuyLink);*/

        //FIX for THEMEFOREST IFRAME
        jQuery(document).ready(function(){
            if ( self == top ) {
                //jQuery('.buy-theme-link').css('display','none');
                //console.log('iframe');
            } else {
                jQuery('.buy-theme-link').css('display','none');
            }
        });

        //

    },
    events: function () {
        var $this = this;
        $this.container.find('.theme-config-head a').click(function (e) {
            e.preventDefault();
            if ($this.container.hasClass('active')) {
                $this.container.animate({
                    right: '-' + $this.container.width() + 'px'
                }, 300).removeClass('active');
            } else {
                $this.container.animate({
                    right: '0'
                }, 300).addClass('active');
            }
        });
        if ($.cookie('showConfig') != null) {
            $this.container.find('.theme-config-head a').click();
            $.removeCookie('showConfig');
        }
    },
    setColor: function (color) {
        var $this = this;
        var $colorConfigLink = $('#theme-config-link');
        if (this.isChanging) {
            return false;
        }
        $colorConfigLink.attr('href', 'assets/css/theme-' + color + '.css');
        $.cookie('color', color);
    },
    setBackground: function (background) {
        $.each(themeConfig.backgrounds, function (i, value) {
            $('body').removeClass('body-' + themeConfig.backgrounds[i].colorName);
        });
        $('body').addClass('body-' + background);
        $.cookie('background', background);
        if (background == 'dark') {
            $('.partners-carousel img').each(function () {
                var arr = $(this).attr('src').split('/');
                $(this).attr('src', 'assets/img/partner/' + background + '/' + arr[arr.length - 1]);
            });
        } else {
            $('.partners-carousel img').each(function () {
                var arr = $(this).attr('src').split('/');
                $(this).attr('src', 'assets/img/partner/light/' + arr[arr.length - 1]);
            });
        }
    },
    setLayout: function (layout) {
        //$('body').removeAttr('class');
        $('body').removeClass('wide').removeClass('boxed');
        $('body').addClass(layout);
        $.cookie('layout', layout);
        setTimeout(function(){$.waypoints('refresh');},100);
    },
    setDirection: function (direction) {
        $('body').removeClass('ltr').removeClass('rtl');
        $('body').addClass(direction);
        $.cookie('direction', direction);
    },
    reset: function () {
        $.removeCookie('color');
        $.removeCookie('background');
        $.removeCookie('layout');
        $.removeCookie('direction');
        $.cookie('showConfig', true);
        window.location.reload();
    }
};
themeConfig.initialize();
