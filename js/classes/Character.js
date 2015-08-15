var DIRECTION = {
	"BAS"    : 2,
	"GAUCHE" : 1,
	"DROITE" : 3,
	"HAUT"   : 0
}

var DUREE_ANIMATION = 1; //4
var DUREE_DEPLACEMENT = 10; //15
var TILESET_WIDTH = 13;
var TILESET_HEIGHT = 21;
var ROW_MOVEMENT = 8;

function Personnage(x, y, direction, nickname) {
	this.x = x; // (cases)
	this.y = y; // (cases)
	this.direction = direction;
	this.name = nickname;
	this.etatAnimation = -1;
	
	// Loads the image in the image attribute
	this.image = new Image();
	this.image.characterReference = this;

	this.drawCharacter = function(context) {
		var frame = 0; // Image's number to take for the animation
		var decalageX = 0, decalageY = 0; // Offset to apply to the character's position
		if(this.etatAnimation >= DUREE_DEPLACEMENT) {
			// Aborts the movement if the timer is done
			this.etatAnimation = -1;

			// Initializes the map translation when the main character is drawn
			if(this === joueur) {
				map.camX = map.clamp(-(-(joueur.x * tileSize) + cWIdth/2), 0, map.width * tileSize - cWIdth);
    			map.camY = map.clamp(-(-(joueur.y * tileSize) + cHeight/2), 0, map.height * tileSize - cHeight);
			}
		} else if(this.etatAnimation >= 0) {
			// Determines the image (frame) to display for the animation
			frame = Math.floor(this.etatAnimation / DUREE_ANIMATION);
			if(frame > 8) { //3
				frame %= 9; //4
			}
			
			// Pixels count left to proceed
			var pixelsAParcourir = 32 - (32 * (this.etatAnimation / DUREE_DEPLACEMENT));
			
			// From this number, decides the offset for x & y
			if(this.direction == DIRECTION.HAUT) {
				decalageY = pixelsAParcourir;
			} else if(this.direction == DIRECTION.BAS) {
				decalageY = -pixelsAParcourir;
			} else if(this.direction == DIRECTION.GAUCHE) {
				decalageX = pixelsAParcourir;
			} else if(this.direction == DIRECTION.DROITE) {
				decalageX = -pixelsAParcourir;
			}
			
			// One more frame
			this.etatAnimation++;

			tempocamX = map.clamp(-(-(joueur.x * tileSize) + cWIdth/2), 0, map.width * tileSize - cWIdth);
			tempocamY = map.clamp(-(-(joueur.y * tileSize) + cHeight/2), 0, map.height * tileSize - cHeight);

			if (tempocamX != map.camX || tempocamY != map.camY) {
		   		map.camX = tempocamX + Math.round(decalageX);
	    		map.camY = tempocamY + Math.round(decalageY);
	    	}
		}

		/*
		 * If both conditions are false, means that the user is not moving
		 * so we keep the value 0 for the following variables
		 * frame, decalageX et decalageY
		 */
		
		if ( this.image != null && this.image.width > 0 ) {
			this.image.characterReference.largeur = this.image.width / TILESET_WIDTH;
		}
		if ( this.image != null && this.image.height > 0 ) {
			this.image.characterReference.hauteur = this.image.height / TILESET_HEIGHT;
		}
		if ( this.image.width > 0 &&  this.image.height > 0) {
			context.drawImage(
				this.image, 
				this.largeur * frame, this.direction * this.hauteur + this.hauteur * ROW_MOVEMENT, // Source rectangle's origin point to take in our image
				this.largeur, this.hauteur, // Source rectangle's size (our character's size)
				// Destination point (depends upon character's size)
				(this.x * 32) - (this.largeur / 2) + 16 + decalageX, (this.y * 32) - this.hauteur + 24 + decalageY,
				this.largeur, this.hauteur // Destination rectangle's size (our character's size)
			);
		}
		var nicklength = this.name.length;
		context.fillText(this.name,(this.x * 32) - (this.largeur / 2) + 16 + decalageX, (this.y * 32) - this.hauteur + 24 + decalageY + 5);
	};

	this.getCoordonneesAdjacentes = function(direction) {
		var coord = {'x' : this.x, 'y' : this.y};
		if ( direction == DIRECTION.BAS ) {
			coord.y++;
		}
		else if ( direction == DIRECTION.GAUCHE ) {
			coord.x--;
		}
		else if ( direction == DIRECTION.DROITE ) {
			coord.x++;
		}
		else if ( direction == DIRECTION.HAUT ) {
			coord.y--;
		}
		return coord;
	};

	this.move = function(direction, map, mainChar) {
		// If a movement is already proceeding, refuses the movement
		if ( mainChar ) {
			if(this.etatAnimation >= 0) {
				return false;
			}
		}

		// Changes the character's direction
		this.direction = direction;
			
		var nextPos = this.getCoordonneesAdjacentes(direction);

		// Checks if the next position is in the map
		if(nextPos.x < 0 || nextPos.y < 0 || nextPos.x >= map.width || nextPos.y >= map.height) {
			// returns false telling that the movement didn't proceed
			return false;
		}

		// Checks if the next position is an obstacle
		if ( map.isObstacle(nextPos) ) {
			return false;
		}
		
		// Starts the animation
		this.etatAnimation = 1;
			
		// Proceeds the movement
		this.x = nextPos.x;
		this.y = nextPos.y;		
		return true;
	};

}