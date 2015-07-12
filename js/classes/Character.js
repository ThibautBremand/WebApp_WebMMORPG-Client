var DIRECTION = {
	"BAS"    : 0,
	"GAUCHE" : 1,
	"DROITE" : 2,
	"HAUT"   : 3
}

var DUREE_ANIMATION = 4;
var DUREE_DEPLACEMENT = 15;

function Personnage(url, x, y, direction, nickname) {
	this.x = x; // (cases)
	this.y = y; // (cases)
	this.direction = direction;
	this.name = nickname;
	this.etatAnimation = -1;
	
	// Loads the image in the image attribute
	this.image = new Image();
	this.image.characterReference = this;
	this.image.onload = function() {
		if(!this.complete) 
			throw "Error : Cannot load the following sprite \"" + url + "\".";
		
		// Character's size
		this.characterReference.largeur = this.width / 4;
		this.characterReference.hauteur = this.height / 4;
	}
	this.image.src = "sprites/" + url;


	this.drawCharacter = function(context) {
		var frame = 0; // Image's number to take for the animation
		var decalageX = 0, decalageY = 0; // Offset to apply to the character's position
		if(this.etatAnimation >= DUREE_DEPLACEMENT) {
			// Aborts the movement if the timer is done
			this.etatAnimation = -1;
		} else if(this.etatAnimation >= 0) {
		// Determines the image (frame) to display for the animation
		frame = Math.floor(this.etatAnimation / DUREE_ANIMATION);
		if(frame > 3) {
			frame %= 4;
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
		}
		/*
		 * Si aucune des deux conditions n'est vraie, c'est qu'on est immobile, 
		 * donc il nous suffit de garder les valeurs 0 pour les variables 
		 * frame, decalageX et decalageY
		 */
		
		// TODO : balayer depuis un JSON d'attributs pour le char et afficher les layers sur le canvas
		context.drawImage(
			this.image, 
			this.largeur * frame, this.direction * this.hauteur, // Point d'origine du rectangle source à prendre dans notre image
			this.largeur, this.hauteur, // Taille du rectangle source (c'est la taille du personnage)
			// Point de destination (dépend de la taille du personnage)
			(this.x * 32) - (this.largeur / 2) + 16 + decalageX, (this.y * 32) - this.hauteur + 24 + decalageY,
			this.largeur, this.hauteur // Taille du rectangle destination (c'est la taille du personnage)
		);
		var nicklength = this.name.length;
		context.fillText(this.name,(this.x * 32) - nicklength,(this.y * 32) - 25);
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