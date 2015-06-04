var tileSize = 16;


function Map(nom) {
	// Création de l'objet XmlHttpRequest
	var xhr = getXMLHttpRequest();
		
	// Chargement du fichier
	xhr.open("GET", './maps/' + nom[0] + '.json', false);
	xhr.send(null);
	if(xhr.readyState != 4 || (xhr.status != 200 && xhr.status != 0)) // Code == 0 en local
		throw new Error("Impossible de charger la carte nommée \"" + nom[0] + "\" (code HTTP : " + xhr.status + ").");
	var mapJsonData = xhr.responseText;
	
	// Analyse des données
	var mapData = JSON.parse(mapJsonData);

	// Retrieves tileset
	var tilesets = mapData.tilesets;
	var image = tilesets[0].image;
	image = image.substring(image.search("/tilesets/")+"/tilesets/".length, image.length)

	var map = mapData.layers[0].data;

	this.tileset = new Tileset(image);
	//this.terrain = mapData.terrain;
	this.maps = new Array();
	var currentmap = new Object();
	currentmap.map = map;
	currentmap.height = mapData.layers[0].height;
	currentmap.width = mapData.layers[0].width;
	this.maps.push(currentmap);
	// Liste des personnages présents sur le terrain.
	this.personnages = new Array();
}

// Pour récupérer la taille (en tiles) de la carte
Map.prototype.getHauteur = function() {
	return this.maps[0].height;
}
Map.prototype.getLargeur = function() {
	return this.maps[0].width;
}

// To add a character
Map.prototype.addPersonnage = function(perso) {
	this.personnages.push(perso);
}

Map.prototype.dessinerMap = function(context) {

	// Draws the layers
	for (currMap = 0; currMap < this.maps.length; ++currMap ) {
		var cpt = 0;
		var height = this.maps[currMap].height;
		var width = this.maps[currMap].width;
		for (var i = 0; i < width; ++i){
			for (var j = 0; j < height; ++j) {
				var currentTile = this.maps[currMap].map[cpt];
				this.tileset.dessinerTile(currentTile, context, i*tileSize, j*tileSize);
				cpt++;
			}
		}
	}

	// Draws the main character
	for(var i = 0, l = this.personnages.length ; i < l ; i++) {
		this.personnages[i].dessinerPersonnage(context);
	}
}















