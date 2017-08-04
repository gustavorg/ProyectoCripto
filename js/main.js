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
	document.addEventListener("DOMContentLoaded", function() {
		var elements = document.getElementsByTagName("INPUT");
		for (var i = 0; i < elements.length; i++) {
			elements[i].oninvalid = function(e) {
				e.target.setCustomValidity("");
				if (!e.target.validity.valid) {
					e.target.setCustomValidity("El campo es obligatorio");
				}
			};
			elements[i].oninput = function(e) {
				e.target.setCustomValidity("");
			};
		}
	});
	var Sage = {
		'common': {
			init: function() {
				Handlebars.registerHelper('with', function(context, options) {
					return options.fn(context);
				});
				Handlebars.registerHelper('if_eq', function(a, b, opts) {
					if(a == b)
						return opts.fn(this);
					else
						return opts.inverse(this);
				});
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
				if ( localStorage.getItem('user') == null ) {
					Sage.user.set({"username":"admin","password":"P@@sw0rd"});
				}
				if ( localStorage.getItem('settings') == null ) {
					var contextListaAlgoritmos;
					contextListaAlgoritmos = {
						algoritmos: [{
							nombre: 'Regleta',
							tipo: 'regleta',
							xp: {
								inverseXP: true,
								keyWordXP: 'nicoquispe',
								l1iXP: 'a',
								l2iXP: 'f',
								convenios: [{letra:'a',saltos:2,direccion:'izquierda'},{letra:'p',saltos:4,direccion:'derecha'}],
							},
							ll: {
								inverseLL: true,
								keyWordLL: 'gustavorivero',
								numericalKeyLL: '235478',
								n1iLL: '3',
								n2iLL: '2',
							},
							metodos: {
								tipo: 'gradual',
								xp: {
									inverseXP: true,
									keyWordXP: 'nicoqussispe',
									l1iXP: 'a',
									l2iXP: 'f',
									convenios: [{letra:'a',saltos:2,direccion:'izquierda'},{letra:'p',saltos:4,direccion:'derecha'}],
								},
								ll: {
									inverseLL: true,
									keyWordLL: 'sfdgertegdfgs',
									numericalKeyLL: '235478',
									n1iLL: '3',
									n2iLL: '2',
								},
							}
						},{
							nombre: 'Gradual',
							tipo: 'gradual',
							xp: {
								inverseXP: true,
								keyWordXP: 'dfgdfgerererhgf',
								l1iXP: 'a',
								l2iXP: 'f',
								convenios: [{letra:'a',saltos:2,direccion:'izquierda'},{letra:'p',saltos:4,direccion:'derecha'}],
							},
							ll: {
								inverseLL: true,
								keyWordLL: 'asdasdasd',
								numericalKeyLL: '235478',
								n1iLL: '3',
								n2iLL: '2',
							},
							metodos: {
								tipo: 'gradual',
								xp: {
									inverseXP: true,
									keyWordXP: 'nicoqussispe',
									l1iXP: 'a',
									l2iXP: 'f',
									convenios: [{letra:'a',saltos:2,direccion:'izquierda'},{letra:'p',saltos:4,direccion:'derecha'}],
								},
								ll: {
									inverseLL: true,
									keyWordLL: 'sfdgertegdfgs',
									numericalKeyLL: '235478',
									n1iLL: '3',
									n2iLL: '2',
								},
							}
						}]
					};
					Sage.configuracion.set(contextListaAlgoritmos);
					Sage.configuracion.contextListaAlgoritmos = contextListaAlgoritmos;
				}
				else {
					Sage.configuracion.contextListaAlgoritmos = Sage.configuracion.get();
				}
			},
			finalize: function() {

			}
		},
		'login': {
			init: function() {
				$('#ingresar').submit(function(e){
					e.preventDefault();
					var username = $('#username').val();
					var password = $('#password').val();
					var user = Sage.user.get();
					if(username == user.username && password != user.password){
						 $('#contenedormensaje').show();
						 $('#mensaje').text("Por favor, ingrese su contraseña correctamente.");
					}else if(username != user.username && password != user.password){
						$('#contenedormensaje').show();
						$('#mensaje').text("El usuario no existe.");	
					}else if(username == user.username && password == user.password){
						$('#contenedormensaje').hide();
						window.location.href = "index.html";
					}
				});
			},
			finalize: function() {

			}
		},
		'utils': {
			encriptarSetting: function ( plainText ) {
			 	var letters = 'abcdefghijklmnñopqrstuvwxyz';
				var Upperletters = 'ABCDEFGHIJKLMNÑOPQRSTUVWXYZ';
			 	var numbers = '0123456789';
			 	var mathematicalOperators = '=<>+-*/';
			 	var punctuationMarks = '.,;:\'"()[]{}¿?¡!|_';
			 	var otherSimbols = '#@%&\\\'"';
				var abc = letters + Upperletters + numbers + mathematicalOperators + punctuationMarks + otherSimbols + ' ';
				var abcArray = abc.split('');
				var keyWord = 'ToolsNGCrypt';
				var alfabetoDesordenador = Sage.utils.sort(abcArray, keyWord, '46327', '3', '4');
				var XP = Sage.utils.sort(alfabetoDesordenador, keyWord, '46327', '4', '2');
				var LL = Sage.utils.sort(alfabetoDesordenador, keyWord, '46327', '4', '3');
				var textoEncriptado = Sage.gradual.encrypt( plainText , XP, LL);
				return textoEncriptado.join('');
			},
			desencriptarSetting: function (plainText) {
			 	var letters = 'abcdefghijklmnñopqrstuvwxyz';
				var Upperletters = 'ABCDEFGHIJKLMNÑOPQRSTUVWXYZ';
			 	var numbers = '0123456789';
			 	var mathematicalOperators = '=<>+-*/';
			 	var punctuationMarks = '.,;:\'"()[]{}¿?¡!|_';
			 	var otherSimbols = '#@%&\\\'"';
				var abc = letters + Upperletters + numbers + mathematicalOperators + punctuationMarks + otherSimbols + ' ';
				var abcArray = abc.split('');
				var keyWord = 'ToolsNGCrypt';
				var alfabetoDesordenador = Sage.utils.sort(abcArray, keyWord, '46327', '3', '4');
				var XP = Sage.utils.sort(alfabetoDesordenador, keyWord, '46327', '4', '2');
				var LL = Sage.utils.sort(alfabetoDesordenador, keyWord, '46327', '4', '3');
				var textoDesencriptado = Sage.gradual.decrypt(plainText, XP, LL); 
				return textoDesencriptado.join('');
			},
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
						var uniqueCadenaArray = Sage.utils.clearRepeat( keyWordArray.concat( base ) );
						var columns = numericalKey.split('').map(function(item) {
							return parseInt(item, 10);
						});
						n1i = parseInt(n1i, 10);
						n2i = parseInt(n2i, 10);
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
						var indexColumn = Sage.utils.getIndexColumn( columns, n1i );
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
						var j = Sage.utils.getIndexColumn( _columns, n2i );
						while ( newOrderColumns.length != _columns.length ) {
							if ( _columns[j] === undefined ) {
								j = 0;
							}
							newOrderColumns.push( _columns[j] );
							j++;
						}
						cubeRow = 0;
						var indexColumnCube = _indexColumnCube = Sage.utils.getIndexColumn( columns, newOrderColumns[0] );
						for (var i = 0; i < newOrderColumns.length; i++) {
							indexColumnCube = Sage.utils.getIndexColumn( columns, newOrderColumns[i] );
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
							indexColumnCube = Sage.utils.getIndexColumn( columns, newOrderColumns[i] );
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
					var indexLetter = Sage.utils.getIndexColumn( xp, plainText[i] );
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
					var indexLetter = Sage.utils.getIndexColumn( ll, plainText[i] );
					if( indexLetter !== -1 ){
						textDecrypt.push(xp[indexLetter]);
					}
				}
				return textDecrypt;
			}
		},
		'configuracion': {
			actionMetodoTipo: function () {
				var metodoTipo = $('[name="metodoTipo"]:checked').val();
				$('#details_form_regleta').fadeOut(0);
				$('#details_form_gradual').fadeOut(0);
				$('#details_form_' + metodoTipo ).fadeIn(0);
			},
			currentConfigXp: {},
			configuracionConvenio: function ( settings ) {
				var _this = this;
				$('#configuracion_convenio').html('');
				var sourceConfiguracionConvenio = $("#configuracion-convenio-template").html();
				var templateConfiguracionConvenio = Handlebars.compile(sourceConfiguracionConvenio);
				var htmlConfiguracionConvenio = templateConfiguracionConvenio(settings);
				$("#configuracion_convenio").html(htmlConfiguracionConvenio);
				$('.btn-cancelar-convenio').click( function (e) {
					e.preventDefault();
					var r = confirm("¿Seguro que desea cancelar el convenio?");
					if (r == true) {
						$('#configuracion_convenio').html('');
					}
				} );
				$('.btn-guardar-convenio').click( function (e) {
					e.preventDefault();
					var currentIndexAlgoritmo = $('#configuracion-algoritmo [name="currentIndexAlgoritmo"]').val();
					var currentIndexConvenio = $('#configuracion_convenio [name="currentIndexConvenio"]').val();
					var configencriptacion = $('#lista_convenios [name="configencriptacion"]').val();

					var letraConvenio = $('#letraConvenio').val();
					var saltosConvenio = $('#saltosConvenio').val();
					var direccionConvenio = $('#direccionConvenio').val();
					if( currentIndexAlgoritmo ){
						if( currentIndexConvenio ){
							if ( _this.contextListaAlgoritmos.algoritmos[currentIndexAlgoritmo] != null ) {
								if ( configencriptacion == 'false' ) {
									if ( _this.contextListaAlgoritmos.algoritmos[currentIndexAlgoritmo].xp.convenios[currentIndexConvenio] != null ){
										_this.contextListaAlgoritmos.algoritmos[currentIndexAlgoritmo].xp.convenios[currentIndexConvenio] = {
											letra: letraConvenio,
											saltos: saltosConvenio,
											direccion: direccionConvenio,
										};
										Sage.configuracion.set(_this.contextListaAlgoritmos);
									}
								}
								else {
									if ( _this.contextListaAlgoritmos.algoritmos[currentIndexAlgoritmo].metodos.xp.convenios[currentIndexConvenio] != null ){
										_this.contextListaAlgoritmos.algoritmos[currentIndexAlgoritmo].metodos.xp.convenios[currentIndexConvenio] = {
											letra: letraConvenio,
											saltos: saltosConvenio,
											direccion: direccionConvenio,
										};
										Sage.configuracion.set(_this.contextListaAlgoritmos);
									}
								}
							}
						}
						else {
							if ( configencriptacion == 'false' ) {
								_this.contextListaAlgoritmos.algoritmos[currentIndexAlgoritmo].xp.convenios.push( {
									letra: letraConvenio,
									saltos: saltosConvenio,
									direccion: direccionConvenio,
								} );
								Sage.configuracion.set(_this.contextListaAlgoritmos);
							}
							else {
								_this.contextListaAlgoritmos.algoritmos[currentIndexAlgoritmo].metodos.xp.convenios.push( {
									letra: letraConvenio,
									saltos: saltosConvenio,
									direccion: direccionConvenio,
								} );
								Sage.configuracion.set(_this.contextListaAlgoritmos);
							}
						}
					} else {
						if ( configencriptacion == 'false' ) {
							_this.contextListaAlgoritmos.algoritmos.push( {
								xp: {
									convenios: [{
										letra: letraConvenio,
										saltos: saltosConvenio,
										direccion: direccionConvenio,
									}]
								},
								ll: {},
								metodos: {
									xp: {
										convenios: [],
									},
									ll: {},
								}
							} );
							currentIndexAlgoritmo = _this.contextListaAlgoritmos.algoritmos.length-1;
						}
						else {
							_this.contextListaAlgoritmos.algoritmos.push( {
								xp: {
									convenios: []
								},
								ll: {},
								metodos: {
									xp: {
										convenios: [{
											letra: letraConvenio,
											saltos: saltosConvenio,
											direccion: direccionConvenio,
										}],
									},
									ll: {},
								}
							} );
							currentIndexAlgoritmo = _this.contextListaAlgoritmos.algoritmos.length-1;
						}
						$('#configuracion-algoritmo [name="currentIndexAlgoritmo"]').val(currentIndexAlgoritmo);
						Sage.configuracion.set(_this.contextListaAlgoritmos);
					}
					$('#configuracion_convenio').html('');
					$("#lista_convenios").html('');
					var sourceListaConvenios = $("#lista-convenios-template").html();
					var templateListaConvenios = Handlebars.compile(sourceListaConvenios);
					var htmlListaConvenios = templateListaConvenios( _this.currentConfigXp );

					if ( configencriptacion == 'false' ) {
						_this.currentConfigXp =  _this.contextListaAlgoritmos.algoritmos[currentIndexAlgoritmo].xp;
					}
					else {
						_this.currentConfigXp =  _this.contextListaAlgoritmos.algoritmos[currentIndexAlgoritmo].metodos.xp;
					}
					htmlListaConvenios = templateListaConvenios(_this.currentConfigXp);
					$("#lista_convenios").html(htmlListaConvenios);
					$('.btn-eliminar-convenio').click( _this.actionEliminarConvenio );
					$('.btn-editar-convenio').click( _this.actionEditarConvenio );
				} );
			},
			actionEliminarConvenio: function ( e ) {
				e.preventDefault();
				var r = confirm("¿Seguro que desea eliminar el convenio?");
				if (r == true) {
					var index = $(this).data('index');
					var currentIndexAlgoritmo = $('#configuracion-algoritmo [name="currentIndexAlgoritmo"]').val();
					var configencriptacion = $('#lista_convenios [name="configencriptacion"]').val();

					if ( Sage.configuracion.contextListaAlgoritmos.algoritmos[currentIndexAlgoritmo] != null ) {
						if ( configencriptacion == 'false' ) {
							if ( Sage.configuracion.contextListaAlgoritmos.algoritmos[currentIndexAlgoritmo].xp.convenios[index] != null ){
								Sage.configuracion.contextListaAlgoritmos.algoritmos[currentIndexAlgoritmo].xp.convenios.splice(index, 1);
								Sage.configuracion.currentConfigXp =  Sage.configuracion.contextListaAlgoritmos.algoritmos[currentIndexAlgoritmo].xp;
							}
						}
						else {
							if ( Sage.configuracion.contextListaAlgoritmos.algoritmos[currentIndexAlgoritmo].metodos.xp.convenios[index] != null ){
								Sage.configuracion.contextListaAlgoritmos.algoritmos[currentIndexAlgoritmo].metodos.xp.convenios.splice(index, 1);
								Sage.configuracion.currentConfigXp =  Sage.configuracion.contextListaAlgoritmos.algoritmos[currentIndexAlgoritmo].metodos.xp;
							}
						}
						$("#configuracion_convenio").html('');
						$("#lista_convenios").html('');
						var sourceListaConvenios = $("#lista-convenios-template").html();
						var templateListaConvenios = Handlebars.compile(sourceListaConvenios);
						var htmlListaConvenios = templateListaConvenios( Sage.configuracion.currentConfigXp );
						Sage.configuracion.set(Sage.configuracion.contextListaAlgoritmos);
						$("#lista_convenios").html(htmlListaConvenios);
						$('.btn-eliminar-convenio').click( Sage.configuracion.actionEliminarConvenio );
						$('.btn-editar-convenio').click( Sage.configuracion.actionEditarConvenio );
					}
				}
			},
			actionEditarConvenio: function ( e ) {
				e.preventDefault();
				var index = $(this).data('index');
				var currentIndexAlgoritmo = $('#configuracion-algoritmo [name="currentIndexAlgoritmo"]').val();
				var configencriptacion = $('#lista_convenios [name="configencriptacion"]').val();
				if ( Sage.configuracion.contextListaAlgoritmos.algoritmos[currentIndexAlgoritmo] != null ) {
					if ( configencriptacion == 'false' ) {
						if ( Sage.configuracion.contextListaAlgoritmos.algoritmos[currentIndexAlgoritmo].xp.convenios[index] != null ){
							Sage.configuracion.configuracionConvenio(Object.assign({currentIndexConvenio: index },Sage.configuracion.contextListaAlgoritmos.algoritmos[currentIndexAlgoritmo].xp.convenios[index]) );
						}
					}
					else {
						if ( Sage.configuracion.contextListaAlgoritmos.algoritmos[currentIndexAlgoritmo].metodos.xp.convenios[index] != null ){
							Sage.configuracion.configuracionConvenio(Object.assign({currentIndexConvenio: index },Sage.configuracion.contextListaAlgoritmos.algoritmos[currentIndexAlgoritmo].metodos.xp.convenios[index]) );
						}	
					}
				}
			},
			actionEditarAlgoritmo: function ( e ) {
				e.preventDefault();
				$('#configuracion-algoritmo').html('');
				var index = $(this).data('index');
				if ( Sage.configuracion.contextListaAlgoritmos.algoritmos[index] != null ) {
					Sage.configuracion.configuracionAlgoritmo(Object.assign({currentIndexAlgoritmo: index, isCard: false, showTitle: true}, Sage.configuracion.contextListaAlgoritmos.algoritmos[index]) );
				}
			},
			actionEliminarAlgoritmo: function ( e ) {
				e.preventDefault();
				var r = confirm("¿Seguro que desea eliminar el algoritmo?");
				if (r == true) {
					var index = $(this).data('index');
					if ( Sage.configuracion.contextListaAlgoritmos.algoritmos[index] != null ) {
						$("#configuracion-algoritmo").html('');
						Sage.configuracion.contextListaAlgoritmos.algoritmos.splice(index, 1);
						var sourceListaAlgoritmos = $("#lista-algoritmos-template").html();
						var templateListaAlgoritmos = Handlebars.compile(sourceListaAlgoritmos);
						var htmlListaAlgoritmos = templateListaAlgoritmos(Sage.configuracion.contextListaAlgoritmos);
						Sage.configuracion.set(Sage.configuracion.contextListaAlgoritmos);
						$("#lista_algoritmos").html(htmlListaAlgoritmos);
						$('.btn-eliminar-algoritmo').click( Sage.configuracion.actionEliminarAlgoritmo );
						$('.btn-editar-algoritmo').click( Sage.configuracion.actionEditarAlgoritmo );
					}
				}
			},
			configuracionAlgoritmo: function ( settings ) {
				var _this = this;
				$("#configuracion-algoritmo").html('');
				var sourceConfiguracionAlgoritmo = $("#configuracion-algoritmo-template").html();
				var templateConfiguracionAlgoritmo = Handlebars.compile(sourceConfiguracionAlgoritmo);
				var htmlConfiguracionAlgoritmo = templateConfiguracionAlgoritmo(settings);
				$("#configuracion-algoritmo").html(htmlConfiguracionAlgoritmo);
				$('[name="metodoTipo"]').change( _this.actionMetodoTipo );
				$('[name="metodoTipo"]').change();
				$('.btn-guardar-configuracion-algoritmo').click( function (e) {
					e.preventDefault();
					var currentIndexAlgoritmo = $('#configuracion-algoritmo [name="currentIndexAlgoritmo"]').val();

					var inverseXP = $('#inverseXP:checked').length > 0;
					var keyWordXP = $('#keyWordXP').val();
					var l1iXP = $('#l1iXP').val();
					var l2iXP = $('#l2iXP').val();
					var inverseLL = $('#inverseLL:checked').length > 0;
					var keyWordLL = $('#keyWordLL').val();
					var numericalKeyLL = $('#numericalKeyLL').val();
					var n1iLL = $('#n1iLL').val();
					var n2iLL = $('#n2iLL').val();

					var metodoTipo = $('[name="metodoTipo"]:checked').val();

					var metodoinverseXP = $('#metodoinverseXP:checked').length > 0;
					var metodokeyWordXP = $('#metodokeyWordXP').val();
					var metodol1iXP = $('#metodol1iXP').val();
					var metodol2iXP = $('#metodol2iXP').val();
					var metodoinverseLL = $('#metodoinverseLL:checked').length > 0;
					var metodokeyWordLL = $('#metodokeyWordLL').val();
					var metodonumericalKeyLL = $('#metodonumericalKeyLL').val();
					var metodon1iLL = $('#metodon1iLL').val();
					var metodon2iLL = $('#metodon2iLL').val();

					if( currentIndexAlgoritmo ){
						if ( _this.contextListaAlgoritmos.algoritmos[currentIndexAlgoritmo] != null ) {
							var _local = _this.contextListaAlgoritmos.algoritmos[currentIndexAlgoritmo];
							_local.tipo = metodoTipo;
							_local.nombre = metodoTipo == 'regleta' ? 'Regleta' : 'Gradual';
							_local.xp = {
								inverseXP: inverseXP,
								keyWordXP: keyWordXP,
								l1iXP: l1iXP,
								l2iXP: l2iXP,
								convenios: _this.contextListaAlgoritmos.algoritmos[currentIndexAlgoritmo].xp.convenios,
							};
							_local.ll = {
								inverseLL: inverseLL,
								keyWordLL: keyWordLL,
								numericalKeyLL: numericalKeyLL,
								n1iLL: n1iLL,
								n2iLL: n2iLL,
							};
							_local.metodos = {
								tipo: metodoTipo,
								xp: {
									inverseXP: metodoinverseXP,
									keyWordXP: metodokeyWordXP,
									l1iXP: metodol1iXP,
									l2iXP: metodol2iXP,
									convenios: _this.contextListaAlgoritmos.algoritmos[currentIndexAlgoritmo].metodos.xp.convenios,
								},
								ll: {
									inverseLL: metodoinverseLL,
									keyWordLL: metodokeyWordLL,
									numericalKeyLL: metodonumericalKeyLL,
									n1iLL: metodon1iLL,
									n2iLL: metodon2iLL,
								},
							};
							_this.contextListaAlgoritmos.algoritmos[currentIndexAlgoritmo] = _local;
							Sage.configuracion.set(_this.contextListaAlgoritmos);
						}
					}
					else {
						_this.contextListaAlgoritmos.algoritmos.push( {
							nombre: metodoTipo == 'regleta' ? 'Regleta' : 'Gradual',
							tipo: metodoTipo,
							xp: {
								inverseXP: inverseXP,
								keyWordXP: keyWordXP,
								l1iXP: l1iXP,
								l2iXP: l2iXP,
								convenios: [],
							},
							ll: {
								inverseLL: inverseLL,
								keyWordLL: keyWordLL,
								numericalKeyLL: numericalKeyLL,
								n1iLL: n1iLL,
								n2iLL: n2iLL,
							},
							metodos: {
								tipo: metodoTipo,
								xp: {
									inverseXP: metodoinverseXP,
									keyWordXP: metodokeyWordXP,
									l1iXP: metodol1iXP,
									l2iXP: metodol2iXP,
									convenios: [],
								},
								ll: {
									inverseLL: metodoinverseLL,
									keyWordLL: metodokeyWordLL,
									numericalKeyLL: metodonumericalKeyLL,
									n1iLL: metodon1iLL,
									n2iLL: metodon2iLL,
								},
							}
						} );
						Sage.configuracion.set(_this.contextListaAlgoritmos);
					}
					$("#configuracion-algoritmo").html('');
					var sourceListaAlgoritmos = $("#lista-algoritmos-template").html();
					var templateListaAlgoritmos = Handlebars.compile(sourceListaAlgoritmos);
					var htmlListaAlgoritmos = templateListaAlgoritmos(Sage.configuracion.contextListaAlgoritmos);
					$("#lista_algoritmos").html(htmlListaAlgoritmos);
					$('.btn-eliminar-algoritmo').click( Sage.configuracion.actionEliminarAlgoritmo );
					$('.btn-editar-algoritmo').click( Sage.configuracion.actionEditarAlgoritmo );

				} );
				$('.btn-cancelar-configuracion-algoritmo').click( function (e) {
					e.preventDefault();
					var r = confirm("¿Seguro que desea cancelar la configuración?");
					if (r == true) {
						$("#configuracion-algoritmo").html('');
					}
				} );
				$('#ListConfigConvenios').on('show.bs.modal', function (event) {
					$("#lista_convenios").html('');
					var sourceListaConvenios = $("#lista-convenios-template").html();
					var templateListaConvenios = Handlebars.compile(sourceListaConvenios);
					var htmlListaConvenios = templateListaConvenios( _this.currentConfigXp );
					$("#lista_convenios").html(htmlListaConvenios);
					$('.btn-eliminar-convenio').click( _this.actionEliminarConvenio );
					$('.btn-editar-convenio').click( _this.actionEditarConvenio );
				});
				$('.btn-add-convenio').click( function (e) {
					e.preventDefault();
					$('#configuracion_convenio').html('');
					var settings = {
					};
					_this.configuracionConvenio(settings);
				});
				$('.openConfigConvenios').click( function (e) {
					e.preventDefault();
					var configencriptacion = $(this).data('configencriptacion');
					var currentIndexAlgoritmo = $('#configuracion-algoritmo [name="currentIndexAlgoritmo"]').val();
					var settings = {};
					if( currentIndexAlgoritmo != '' ) {
						_this.currentConfigXp =  _this.contextListaAlgoritmos.algoritmos[currentIndexAlgoritmo].xp;
						if( configencriptacion != '' ) {
							_this.currentConfigXp =  _this.contextListaAlgoritmos.algoritmos[currentIndexAlgoritmo].metodos.xp;
							_this.currentConfigXp.configencriptacion = 'true';
						}
						else {
							_this.currentConfigXp.configencriptacion = 'false';
						}
					}
					else {
						_this.currentConfigXp = {};
						if( configencriptacion != '' ) {
							_this.currentConfigXp.configencriptacion = 'true';
						}
						else {
							_this.currentConfigXp.configencriptacion = 'false';
						}
					}
					$('#ListConfigConvenios').modal('toggle');
				} );
			},
			contextListaAlgoritmos: {},
			init: function() {
				var _this = this;
				Handlebars.registerPartial('formRegletasTemplate', $('#form-regletas-template').html());
				Handlebars.registerPartial('formGradualTemplate', $('#form-gradual-template').html());
				var sourceListaAlgoritmos = $("#lista-algoritmos-template").html();
				var templateListaAlgoritmos = Handlebars.compile(sourceListaAlgoritmos);
				var htmlListaAlgoritmos = templateListaAlgoritmos(_this.contextListaAlgoritmos);
				$("#lista_algoritmos").html(htmlListaAlgoritmos);

				$('.btn-editar-algoritmo').click( Sage.configuracion.actionEditarAlgoritmo );
				$('.btn-eliminar-algoritmo').click( Sage.configuracion.actionEliminarAlgoritmo );
				$('.btn-add-algoritmo').click( function ( e ) {
					e.preventDefault();
					$('#configuracion-algoritmo').html('');
					var settings = {
						isCard: false,
						showTitle: true,
					};
					_this.configuracionAlgoritmo(settings);
				} );
				//$('.btn-add-algoritmo').click();
			},
			finalize: function() {
			},

			encrypt: function() {

			},
			decrypt: function() {
				
			},
			get: function() {
				return JSON.parse( Sage.utils.desencriptarSetting( localStorage.getItem('settings') ));
			},
			set: function( data ) {
				localStorage.setItem('settings', Sage.utils.encriptarSetting( JSON.stringify( data )));
			}
		},
		'user': {
			encrypt: function() {

			},
			decrypt: function() {
		
			},
			match: function() {
		
			},
			get: function() {
				return JSON.parse( Sage.utils.desencriptarSetting( localStorage.getItem('user') ));
			},
			set: function( data ) {
				localStorage.setItem('user', Sage.utils.encriptarSetting( JSON.stringify( data )));
			}
		}
	};

	//console.log('----------------------');
	//var convenioConfig = [{letra:'a',saltos:2,direccion:'izquierda'},{letra:'p',saltos:4,direccion:'derecha'}];
	//var textoEncriptado2 = Sage.regletas.encrypt('hola', XP, LL, 'a', 'c', convenioConfig );
	//var textoDesencriptado2 = Sage.regletas.decrypt(textoEncriptado2.join(''), XP, LL, 'a', 'c', convenioConfig); 
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