var tileSize = 16;

function Tileset(url) {
	// Chargement de l'image dans l'attribut image
	this.image = new Image();
	this.image.referenceDuTileset = this;
	this.image.onload = function() {
		if(!this.complete) 
			throw new Error("Erreur de chargement du tileset nommé \"" + url + "\".");
		
		// Largeur du tileset en tiles
		this.referenceDuTileset.largeur = this.width / tileSize;
	}
	this.image.src = "tilesets/" + url;
}

// Méthode de dessin du tile numéro "numero" dans le contexte 2D "context" aux coordonnées xDestination et yDestination
Tileset.prototype.dessinerTile = function(numero, context, xDestination, yDestination) {
	var xSourceEnTiles = numero % this.largeur;
	if(xSourceEnTiles == 0) xSourceEnTiles = this.largeur;
	var ySourceEnTiles = Math.ceil(numero / this.largeur);
	
	var xSource = (xSourceEnTiles - 1) * tileSize;
	var ySource = (ySourceEnTiles - 1) * tileSize;
	
	context.drawImage(this.image, xSource, ySource, tileSize, tileSize, xDestination, yDestination, tileSize, tileSize);
}
