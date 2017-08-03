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
					getIndexColumn: function ( array, item ) {
						return array.indexOf( item );
					},
					clearRepeat: function (array) {
						return array.filter(function(item, pos, self) {
							return self.indexOf(item) == pos;
						});
					},
					sort: function(base, keyWord, numericalKey, n1i, n2i, convenios, init) {
						try {
							if ( is.array(base) ) {
								var abc = [];
								if ( !(is.string( keyWord ) && keyWord) ) {
									throw "Se debe de ingresar una palabra clave";
								}
								if ( !(is.string( n1i ) && n1i) ) {
									throw "Se debe de ingresar un numero";
								}
								if ( !(is.string( n2i ) && n2i) ) {
									throw "Se debe de ingresar un numero";
								}
								if ( !(is.string( numericalKey ) && numericalKey) ) {
									throw "Se debe de ingresar una clave numérica";
								}
								var keyWordArray = keyWord.replace(/ /g, '').split('');
								var uniqueCadenaArray = nombredeaplicacion.utils.clearRepeat( keyWordArray.concat( base ) );
								var columns = numericalKey.split('').map(function(item) {
								    return parseInt(item, 10);
								});
								n1i =  parseInt(n1i, 10);
								var cube = [];
								var cubeSecond = [];
								var _columns = columns.concat();
								_columns.sort();
								var columnsRepeat = {};
								_columns.forEach( function ( number ) {
									columnsRepeat[number] = false;
									cube.push( {} );
									cubeSecond.push( {} );
								} );
								var cubeRow = 0;

								/* PROCEDIMIENTO GRADUAL */
								var indexColumn = nombredeaplicacion.utils.getIndexColumn( columns, n1i );
								for (var i = 0; i < uniqueCadenaArray.length; i++) {
									if ( cube[ indexColumn ] == null ) {
											indexColumn = 0;
										cubeRow++;
									}
									cube[ indexColumn ][ cubeRow ] = uniqueCadenaArray[i];
									indexColumn++;
								}
								/* FIN PROCEDIMIENTO GRADUAL */
								/* DOBLE APLICACION */
								var newOrderColumns = [];
								var j = nombredeaplicacion.utils.getIndexColumn( _columns, n2i );
								while ( newOrderColumns.length != _columns.length ) {
									if ( _columns[j] === undefined ) {
										j = 0;
									}
									newOrderColumns.push( _columns[j] );
									j++;
								}
								cubeRow = 0;
								var indexColumnCube = _indexColumnCube = nombredeaplicacion.utils.getIndexColumn( columns, newOrderColumns[0] );
								for (var i = 0; i < newOrderColumns.length; i++) {
									indexColumnCube = nombredeaplicacion.utils.getIndexColumn( columns, newOrderColumns[i] );
									var arrColumn = Object.keys(cube[indexColumnCube]).map(function (key) { return cube[indexColumnCube][key]; });
									for (var h = 0; h < arrColumn.length; h++) {
										if ( cubeSecond[ _indexColumnCube ] == null ) {
											columnsRepeat[ newOrderColumns[i] ] = true;
											_indexColumnCube = indexColumnCube;
											cubeRow++;
										}
										cubeSecond[ _indexColumnCube ][ cubeRow ] = arrColumn.shift();
										h--;
										_indexColumnCube++;
									}
								}
								/* FIN DOBLE APLICACION */
								/* 	OBTENER CRIPTO */
								var cripto = [];
								for (var i = 0; i < newOrderColumns.length; i++) {
									indexColumnCube = nombredeaplicacion.utils.getIndexColumn( columns, newOrderColumns[i] );
									var arrColumn = Object.keys(cubeSecond[indexColumnCube]).map(function (key) { return cubeSecond[indexColumnCube][key]; });
									for (var h = 0; h < arrColumn.length; h++) {
										cripto.push( arrColumn.shift() );
										h--;
									}
								}
								return cripto;
							}
							throw "Mal formato en le alfabeto";
						} 
						catch(err) {
							console.log( err );
							return false;
						}
					},
				},
				'common': {
					init: function() {

					},
					finalize: function() {

					}
				},

				'regletas': {
					encrypt: function(base, xp, ll, convenios, init) {

					},
					decrypt: function(base, xp, ll, convenios, init) {
						
					}
				},
				
				'gradual': {
					encrypt: function(base, xp, ll, xp, init) {

					},
					decrypt: function(base, xp, ll, xp, init) {
						
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

 	var letters = 'abcdefghijklmnñopqrstuvwxyz';
	var Upperletters = 'ABCDEFGHIJKLMNÑOPQRSTUVWXYZ';
 	var numbers = '0123456789';
 	var mathematicalOperators = '+-*/';
 	var punctuationMarks = '.,;:\'"()[]{}¿?¡!-_';
	var abc = letters + Upperletters + numbers + mathematicalOperators + punctuationMarks + ' ';
	abc = letters;
	var abcArray = abc.split('');
	var keyWord = 'nico quispe';
	nombredeaplicacion.utils.sort(abcArray, keyWord, '46327', '3', '4');
	// The routing fires all common scripts, followed by the page specific scripts.
	// Add additional events for more control over timing e.g. a finalize event
	var UTIL = {
		fire: function(func, funcname, args) {
			var fire;
			var namespace = nombredeaplicacion;
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