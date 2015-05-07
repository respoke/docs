'use strict';

$(document).ready(function () {
    $('.example-block--accordion-tabs').tabs();
});

$("nav.sidebar .menu li span:contains('Documentation')").parent('li').addClass('menu--open');
$("nav.sidebar .menu li span:contains('Client Libraries')").parent('li').addClass('menu--open');