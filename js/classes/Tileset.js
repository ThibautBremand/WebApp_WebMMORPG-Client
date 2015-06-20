var tileSize = 16;

// Titleset object - Methods & attributes
function Tileset(url, firstgid) {
	// Loads the image in the image attribute
	this.image = new Image();
	this.firstgid = firstgid;
	this.image.tilesetReference = this;
	this.image.onload = function() {
		if(!this.complete) 
			throw new Error("Erreur de chargement du tileset nommé \"" + url + "\".");
		
		// Largeur du tileset en tiles
		this.tilesetReference.largeur = this.width / tileSize;
	}
	this.image.src = "tilesets/" + url;

	// Draws the title number 'nb' in the 2D Context 'context' with the coordinates below
	this.drawTitle = function (nb, context, xDestination, yDestination) {
		//alert ("Lets draw : " + nb ) ;
		var xSourceEnTiles = nb % this.largeur;
		if(xSourceEnTiles == 0) xSourceEnTiles = this.largeur;
		var ySourceEnTiles = Math.ceil(nb / this.largeur);
		
		var xSource = (xSourceEnTiles - 1) * tileSize;
		var ySource = (ySourceEnTiles - 1) * tileSize;
		
		context.drawImage(this.image, xSource, ySource, tileSize, tileSize, xDestination, yDestination, tileSize, tileSize);
	};
}