var tileSize = 32;
var joueur;

var separator = "%:%";

var map;

function drawRPG() {
	var canvas = document.getElementById('canvas');
	var ctx = canvas.getContext('2d');
	
	canvas.width  = map.width * tileSize;
	canvas.height = map.height * tileSize;
	
	setInterval(function() {
		map.drawMap(ctx);
	}, 40);
	
	// Keyboard management
	window.onkeydown = function(event) {
		// Retrieves the key code
		var e = event || window.event;
		var key = e.which || e.keyCode;
		
		switch(key) {
			case 38 : case 122 : case 119 : case 90 : case 87 : // Up arrow, z, w, Z, W
				proceedMovement(DIRECTION.HAUT);
				break;
			case 40 : case 115 : case 83 : // Down arrow, s, S
				proceedMovement(DIRECTION.BAS);
				break;
			case 37 : case 113 : case 97 : case 81 : case 65 : // Left arrow, q, a, Q, A
				proceedMovement(DIRECTION.GAUCHE);
				break;
			case 39 : case 100 : case 68 : // Right arrow, d, D
				proceedMovement(DIRECTION.DROITE);
				break;
			default : 
				// Si la touche ne nous sert pas, nous n'avons aucune raison de bloquer son comportement normal.
				return true;
		}
		return false;
	}
}

function proceedMovement(movement) {
	if ( joueur.move(movement, map, true) ) {
		if ( map.neighbors != null ) {
			var isTP = map.isNeighbor(joueur, movement);
			if ( isTP != "" ) {
				conn.send("TP" + separator + isTP + separator + movement + separator + joueur.name);
			}
			else {
				conn.send("MOVE" + separator + movement + separator + joueur.name);
			}
		}
		else {
			conn.send("MOVE" + separator + movement + separator + joueur.name);
		}
	}
}
