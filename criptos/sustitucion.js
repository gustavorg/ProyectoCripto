function clearRepeat( array ) {
			return array.filter(function(item, pos, self) {
				return self.indexOf(item) == pos;
			});
		}
		function getIndexColumn( array, item ) {
			return array.indexOf( item );
		}
		function getNextIndexColumn( array, item ) {
			item++;
			var newColumn = array.indexOf( item );
			if ( newColumn === -1 ) {
				newColumn = getIndexColumn( array, 1 );
			}
			return newColumn;
		}
		function init() {
			var letters = 'abcdefghijklmnñopqrstuvwxyz';
			var numbers = '0123456789';
			var mathematicalOperators = '+-*/';
			var punctuationMarks = '.,;:\'"()[]{}¿?¡!-_';
			var abc = letters + numbers + mathematicalOperators + punctuationMarks;
			var abcArray = abc.split('');
			var cadena = 'este una cadena de prueba';
			cadena = cadena.replace(/ /g, '');
			var cadenaArray = cadena.split('');
			//var uniqueCadenaArray = clearRepeat( cadenaArray );
			var uniqueCadenaArray = clearRepeat( cadenaArray.concat( abcArray ) );
			//var columns = [1,2,3,4,5,6,7];
			var columns = [1,2,3,4];
			var columnsRandom = columns.sort( function(a, b){return 0.5 - Math.random()} );
			var columnRandom = columnsRandom[Math.floor(Math.random()*columnsRandom.length)];
			var columnsRepeat = { 1: false, 2: false, 3: false, 4: false }; 
			
			//var cube = [{}, {}, {}, {}, {}, {}, {}];
			var cube = [{}, {}, {}, {}];
			var indexColumn = getIndexColumn( columns, columnRandom );
			var isRepeatColumns = false;
			var cubeRow = 0;
			console.log( columns );

			/* PRIMERA ENCRUPTACIÓN */
			for (var i = 0; i < uniqueCadenaArray.length; i++) {
				if ( cube[ indexColumn ] == null ) {
					columnsRepeat[ columnRandom ] = true;
					columnRandom++;
					indexColumn = columns.indexOf( columnRandom );
					if ( indexColumn === -1 ) {
						if ( columnsRepeat[ 1 ] ) {
							columnRandom--;
						}
						else {
							columnRandom = 1;
						}
						indexColumn = getIndexColumn( columns, columnRandom );
					}
					else {
						if ( columnsRepeat[ columnRandom ] ) {
							columnRandom--;
							indexColumn = getIndexColumn( columns, columnRandom );
						}
					}
					cubeRow++;
				}
				cube[ indexColumn ][ cubeRow ]= uniqueCadenaArray[i];
				indexColumn++;
				//console.log( uniqueCadenaArray[i] );
			}

			/* SEGUNDA ENCRUPTACIÓN */
			var cubeSecond = [{}, {}, {}, {}];
			columnsRepeat = { 1: false, 2: false, 3: false, 4: false }; 
			cubeRow = 0;
			var oldColumnRandom = columnRandom = columnsRandom[Math.floor(Math.random()*columnsRandom.length)];
			var newOrderColumns = [];
			for (var j = 0; j < columnsRandom.length; j++) {
				var _indexColumn = getIndexColumn( columns, oldColumnRandom );
				if ( _indexColumn === -1 ) {
					_indexColumn = getIndexColumn( columns, 1 );
					oldColumnRandom = 1;
				}
				delete _indexColumn;
				newOrderColumns.push( oldColumnRandom );
				oldColumnRandom++;
			}
			delete oldColumnRandom;
			var indexColumnCube = _indexColumnCube = getIndexColumn( columns, newOrderColumns[0] );
			for (var i = 0; i < newOrderColumns.length; i++) {
				indexColumnCube = getIndexColumn( columns, newOrderColumns[i] );
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
			/* 	OBTENER CRIPTO */
			var cripto = [];
			console.log( newOrderColumns );
			for (var i = 0; i < newOrderColumns.length; i++) {
				indexColumnCube = getIndexColumn( columns, newOrderColumns[i] );
				var arrColumn = Object.keys(cubeSecond[indexColumnCube]).map(function (key) { return cubeSecond[indexColumnCube][key]; });
				for (var h = 0; h < arrColumn.length; h++) {
					cripto.push( arrColumn.shift() );
					h--;
				}
			}
			console.log( cubeSecond );
			console.log( cripto );
		}
		init();