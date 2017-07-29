function sortear( abcArray ){
	var newABC = abcArray.slice();
	return newABC.sort( function(a, b){return 0.5 - Math.random()} );
}
var letters = 'abcdefghijklmnopqrstuvwxyz';
var abcArray = letters.split('');
var newABCArray = sortear(abcArray);
var nuevoArreglo = [];
var saltos = Math.floor(Math.random() * 5) + 1;
saltos = 4;
var posicion = 1;
var agregar = 0;
while( abcArray.length ){
	var index = ( posicion * saltos ) + agregar - 1;
	if ( abcArray[index] == undefined ) {
		agregar = index - abcArray.length + 1;
		posicion = 0;
	}
	else {
		var indexOf = nuevoArreglo.indexOf(abcArray[ index ]);
		if( indexOf == -1 ){
			nuevoArreglo.push(abcArray[ index ]);
			abcArray.splice( index, 1);
			agregar--;
		}
		else {
			agregar++;
			continue;
		}
		posicion++;
	}
}
console.log(abcArray, nuevoArreglo );