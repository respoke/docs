/* jshint ignore:start */
/* jscs:disable */
// TODO: CommonJS

/**
 * Keeps the sidebar in the exact same place as if it were positioned statically, but it's fixed.
 * Affix it without inheriting css `position: fixed` baggage.
 */
function affixLeftSidebar() {
    var $sidebar = $('#main-sidebar-wrap');
    var _offset = $sidebar.parent().offset();
    var _left = _offset.left + 'px';
    var _top = _offset.top + 'px';
    var _width = $sidebar.parent().innerWidth();

    $sidebar
        .css('left', _left)
        .css('top', _top)
        .css('width', _width)
        .css('position', 'fixed');
}


//
// Angular
//
var padd = angular.module('padd', []);

padd.controller(
	'NavController',
	[
		'$scope',
		function NavController($scope) {

			$scope.currentPage = window.location.pathname;

		}
	]
);

//
// Syntax highlighting http://highlightjs.org/usage/
//
hljs.configure({classPrefix: 'hljs-'});
hljs.initHighlightingOnLoad(['javascript','css','html']);

//
// Google Analytics
//
(function(){

	if(location.hostname === "docs.respoke.io")
	{
		(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
	  	(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
	  	m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
	  	})(window,document,'script','//www.google-analytics.com/analytics.js','ga');

	  	ga('create', 'UA-52260305-1', 'auto');
	  	ga('send', 'pageview');
	}
})();
