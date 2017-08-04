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
	var Sage = {
		'common': {
			init: function() {
				Handlebars.registerHelper("math", function(lvalue, operator, rvalue, options) {
					lvalue = parseFloat(lvalue);
					rvalue = parseFloat(rvalue);
						
					return {
						"+": lvalue + rvalue,
						"-": lvalue - rvalue,
						"*": lvalue * rvalue,
						"/": lvalue / rvalue,
						"%": lvalue % rvalue
					}[operator];
				});
			},
			finalize: function() {

			}
		},
		'login': {
			init: function() {

			},
			finalize: function() {

			}
		},
		'utils': {
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
						n2i =  parseInt(n2i, 10);
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
		'regletas': {
			encrypt: function(plainText, xp, ll, l1i, l2i, convenios) {
				var indicativo =[ l1i, l2i];
				var letrasafectadas = [];
				convenios.forEach(function(convenio) {
					letrasafectadas.push(convenio.letra);
				});
				var nuevoXP = [];
				var nuevoLL = [];
				var indextexto = 0;
				var movimientos = 0;
				// ORDENAR INDICATIVO
				var indiceIndicativo = xp.indexOf(indicativo[0]);
				while( nuevoXP.length != xp.length ){
					if ( xp[indiceIndicativo] == null ) {
						xp[0];
						indiceIndicativo = -1;
					}
					else 
						nuevoXP.push(xp[indiceIndicativo]);
					indiceIndicativo++;
				}

				var indiceIndicativo = ll.indexOf(indicativo[1]);
				while( nuevoLL.length != ll.length ){
					if ( ll[indiceIndicativo] == null ) {
						ll[0];
						indiceIndicativo = -1;
					}
					else 
						nuevoLL.push(ll[indiceIndicativo]);
					indiceIndicativo++;
				}
				//FIN ORDENAR INDICATIVO
				console.log(nuevoXP);
				console.log(nuevoLL);
				var textEncrypt = [];
				var saltos;
				while( textEncrypt.length != plainText.length ){
					var buscarletra = '';
					buscarletra = plainText.charAt(indextexto);
					if(buscarletra == '\n' ){
						textEncrypt.push(buscarletra);
						indextexto++;
						continue;
					}
					var index = nuevoLL.indexOf(buscarletra) + movimientos;
					if ( nuevoXP[index] == undefined ) {
						index = index - nuevoLL.length;
						if( index < 0 ){
							index+= nuevoLL.length*2;
						}
						var indiceIndicativoAplicable = letrasafectadas.indexOf(buscarletra);
						textEncrypt.push(nuevoXP[ index ]);
						if ( indiceIndicativoAplicable != -1 ){
							if(convenioConfig[indiceIndicativoAplicable].direccion == 'derecha'){ 
								saltos = convenioConfig[indiceIndicativoAplicable].saltos * -1;
							}else{
								saltos = convenioConfig[indiceIndicativoAplicable].saltos;
							}
							movimientos = movimientos + saltos;
						}
						indextexto++;
					}
					else {
						var indiceIndicativoAplicable = letrasafectadas.indexOf(buscarletra);
						textEncrypt.push(nuevoXP[ index ]);
						if ( indiceIndicativoAplicable != -1 ){
							if(convenioConfig[indiceIndicativoAplicable].direccion == 'derecha'){ 
								saltos = convenioConfig[indiceIndicativoAplicable].saltos * -1;
							}else{
								saltos = convenioConfig[indiceIndicativoAplicable].saltos;
							}
							movimientos = movimientos + saltos;
						}
						indextexto++;
					}
				}
				return textEncrypt;
			},
			decrypt: function(plainText, xp, ll, l1i, l2i, convenios) {
				var indicativo =[ l1i, l2i];
				var letrasafectadas = [];
				convenios.forEach(function(convenio) {
					letrasafectadas.push(convenio.letra);
				});
				var nuevoXP = [];
				var nuevoLL = [];
				var indextexto = 0;
				var movimientos = 0;
				// ORDENAR INDICATIVO
				var indiceIndicativo = ll.indexOf(indicativo[1]);
				while( nuevoLL.length != ll.length ){
					if ( ll[indiceIndicativo] == null ) {
						ll[0];
						indiceIndicativo = -1;
					}
					else 
						nuevoLL.push(ll[indiceIndicativo]);
					indiceIndicativo++;
				}

				var indiceIndicativo = xp.indexOf(indicativo[0]);
				while( nuevoXP.length != xp.length ){
					if ( xp[indiceIndicativo] == null ) {
						xp[0];
						indiceIndicativo = -1;
					}
					else 
						nuevoXP.push(xp[indiceIndicativo]);
					indiceIndicativo++;
				}
				//FIN ORDENAR INDICATIVO
				var textEncrypt = [];
				var saltos;
				while( textEncrypt.length != plainText.length ){
					var buscarletra = '';
					buscarletra = plainText.charAt(indextexto);
					if(buscarletra == '\n' ){
						textEncrypt.push(buscarletra);
						indextexto++;
						continue;
					}
					var index = nuevoXP.indexOf(buscarletra) + movimientos;
					if ( nuevoXP[index] == undefined ) {
						index = index - nuevoXP.length;
						if( index < 0 ){
							index+= nuevoXP.length*2;
						}
						var letraDesencriptada = nuevoLL[ index ];
						textEncrypt.push(letraDesencriptada);
						var indiceIndicativoAplicable = letrasafectadas.indexOf(letraDesencriptada);
						if ( indiceIndicativoAplicable != -1 ){
							if(convenioConfig[indiceIndicativoAplicable].direccion == 'derecha'){ 
								saltos = convenioConfig[indiceIndicativoAplicable].saltos;
							}else{
								saltos = convenioConfig[indiceIndicativoAplicable].saltos * -1;
							}
							movimientos = movimientos + saltos;
						}
						indextexto++;
					}
					else {
						var letraDesencriptada = nuevoLL[ index ];
						textEncrypt.push(letraDesencriptada);
						var indiceIndicativoAplicable = letrasafectadas.indexOf(letraDesencriptada);
						if ( indiceIndicativoAplicable != -1 ){
							if(convenioConfig[indiceIndicativoAplicable].direccion == 'derecha'){ 
								saltos = convenioConfig[indiceIndicativoAplicable].saltos;
							}else{
								saltos = convenioConfig[indiceIndicativoAplicable].saltos * -1;
							}
							movimientos = movimientos + saltos;
						}
						indextexto++;
					}
				}
				return textEncrypt;
			}
		},
		
		'gradual': {
			encrypt: function( plainText, xp, ll) {
				var plainText = plainText.split('');
				var textEncrypt = [];
				for (var i = 0; i < plainText.length; i++) {
					var indexLetter = nombredeaplicacion.utils.getIndexColumn( xp, plainText[i] );
					if( indexLetter !== -1 ){
						textEncrypt.push(ll[indexLetter]);
					}
				}
				return textEncrypt;
			},
			decrypt: function( plainText, xp, ll) {
				var plainText = plainText.split('');
				var textDecrypt = [];
				for (var i = 0; i < plainText.length; i++) {
					var indexLetter = nombredeaplicacion.utils.getIndexColumn( ll, plainText[i] );
					if( indexLetter !== -1 ){
						textDecrypt.push(xp[indexLetter]);
					}
				}
				return textDecrypt;
			}
		},
		'configuracion': {
			init: function() {
				console.log(1);
				var source   = $("#lista-algoritmos-template").html();
				var template = Handlebars.compile(source);
				var context = {
					algoritmos: [{
						nombre: 'Regleta'
					},{
						nombre: 'Gradual'
					},{
						nombre: 'Regleta'
					}]
				};
				var htmlListaAlgoritmos = template(context);
				$("#lista_algoritmos").html(htmlListaAlgoritmos);
			},
			finalize: function() {
				console.log(this);
			},

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
	//var alfabetoDesordenador = nombredeaplicacion.utils.sort(abcArray, keyWord, '46327', '3', '4');
	//var XP = nombredeaplicacion.utils.sort(alfabetoDesordenador, keyWord, '46327', '4', '2');
	//var LL = nombredeaplicacion.utils.sort(alfabetoDesordenador, keyWord, '46327', '4', '3');
	//var textoEncriptado = nombredeaplicacion.gradual.encrypt('hola', XP, LL);
	//var textoDesencriptado = nombredeaplicacion.gradual.decrypt(textoEncriptado.join(''), XP, LL); 
	//console.log(alfabetoDesordenador);
	//console.log(XP);
	//console.log(LL);
	//console.log(textoEncriptado);
	//console.log(textoDesencriptado);

	//console.log('----------------------');
	//var convenioConfig = [{letra:'a',saltos:2,direccion:'izquierda'},{letra:'p',saltos:4,direccion:'derecha'}];
	//var textoEncriptado2 = nombredeaplicacion.regletas.encrypt('hola', XP, LL, 'a', 'c', convenioConfig );
	//var textoDesencriptado2 = nombredeaplicacion.regletas.decrypt(textoEncriptado2.join(''), XP, LL, 'a', 'c', convenioConfig); 
	//console.log(textoEncriptado2);
	//console.log(textoDesencriptado2);

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

	$(document).ready(UTIL.loadEvents);

})(jQuery);