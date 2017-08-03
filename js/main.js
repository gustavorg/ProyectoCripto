/* ========================================================================
 * DOM-based Routing
 * Based on http://goo.gl/EUTi53 by Paul Irish
 *
 * Only fires on body classes that match. If a body class contains a dash,
 * replace the dash with an underscore when adding it to the object below.
 *
 * .noConflict()
 * The routing is enclosed within an anonymous function so that you can
 * always reference jQuery with $, even when in .noConflict() mode.
 * ======================================================================== */

(function($) {

		var nombredeaplicacion = {
				utils: {
					copy: function (argument) {
						btn-clipboard
					}
				},
				'common': {
						init: function() {

						},
						finalize: function() {

						}
				},

				'regletas': {
						encrypt: function(base,xp,ll,convenios,init) {

						},
						decrypt: function(base,xp,ll,convenios,init) {
				
						}
				},
				
				'gradual': {
						encrypt: function(base,xp,ll,xp,init) {

						},
						decrypt: function(base,xp,ll,xp,init) {
				
						}
				},
				
				'configuracion': {
						encrypt: function() {

						},
						decrypt: function() {
				
						},
						get: function() {
							JSON.parse( Utils.deencriptarSetting( localStorage.getItem('settings') ));                              
						},
						set: function() {
							localStorage.setItem('settings', Utils.encriptarSetting( JSON.stringify( {} )));   
						}
				},
				
				'password': {
						encrypt: function() {

						},
						decrypt: function() {
				
						},
						match: function() {
				
						},
						get: function() {
							JSON.parse( Utils.deencriptarSetting( localStorage.getItem('settings') ));                              
						},
						set: function() {
							localStorage.setItem('settings', Utils.encriptarSetting( JSON.stringify( {} )));   
						}
				}
		};

	// The routing fires all common scripts, followed by the page specific scripts.
	// Add additional events for more control over timing e.g. a finalize event
	var UTIL = {
		fire: function(func, funcname, args) {
			var fire;
			var namespace = Sage;
			funcname = (funcname === undefined) ? 'init' : funcname;
			fire = func !== '';
			fire = fire && namespace[func];
			fire = fire && typeof namespace[func][funcname] === 'function';

			if (fire) {
				namespace[func][funcname](args);
			}
		},
		loadEvents: function() {
			// Fire common init JS
			UTIL.fire('common');

			// Fire page-specific init JS, and then finalize JS
			$.each(document.body.className.replace(/-/g, '_').split(/\s+/), function(i, classnm) {
				UTIL.fire(classnm);
				UTIL.fire(classnm, 'finalize');
			});

			// Fire common finalize JS
			UTIL.fire('common', 'finalize');
		}
	};

	// Load Events
	$(document).ready(UTIL.loadEvents);

})(jQuery); // Fully reference jQuery after this point.