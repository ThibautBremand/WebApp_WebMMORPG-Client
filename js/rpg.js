var tileSize = 16;
var joueur;

var mapsToDraw = new Array();
mapsToDraw.push("sans-titre");
//mapsToDraw.push("sans-titre2");

var map = new Map(mapsToDraw);
map.loadLayers();

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
				joueur.move(DIRECTION.HAUT, map);
				conn.send("MOVE:" + DIRECTION.HAUT + ":" + nickname);
				break;
			case 40 : case 115 : case 83 : // Down arrow, s, S
				joueur.move(DIRECTION.BAS, map);
				conn.send("MOVE:" + DIRECTION.BAS + ":" + nickname);
				break;
			case 37 : case 113 : case 97 : case 81 : case 65 : // Left arrow, q, a, Q, A
				joueur.move(DIRECTION.GAUCHE, map);
				conn.send("MOVE:" + DIRECTION.GAUCHE + ":" + nickname);
				break;
			case 39 : case 100 : case 68 : // Right arrow, d, D
				joueur.move(DIRECTION.DROITE, map);
				conn.send("MOVE:" + DIRECTION.DROITE + ":" + nickname);
				break;
			default : 
				//alert(key);
				// Si la touche ne nous sert pas, nous n'avons aucune raison de bloquer son comportement normal.
				return true;
		}
		
		return false;
	}
}
