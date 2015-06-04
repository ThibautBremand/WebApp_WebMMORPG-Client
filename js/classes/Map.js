var tileSize = 16;

// Map Object - Attributes & methods
function Map(json) {
    this.jsonLayers = json;

    this.height = 0;
    this.width = 0;
    this.layers = new Array();
    this.characters = new Array();
    this.tilesets = new Array();

    // Loads the layers from the json files given
    this.loadLayers = function() {

		var xhr = getXMLHttpRequest();

		for ( var i = 0; i < this.jsonLayers.length ; ++i ) {

			// AJAX "Old school"
			xhr.open("GET", './maps/' + this.jsonLayers[i] + '.json', false);
			xhr.send(null);
			if(xhr.readyState != 4 || (xhr.status != 200 && xhr.status != 0)) // Code == 0 en local
				throw new Error("Cannot load the map : " + this.jsonLayers[i] + '.json' + "\" (code HTTP : " + xhr.status + ").");
			var mapJsonData = xhr.responseText;
			var mapData = JSON.parse(mapJsonData);

			// Retrieves tileset
			var tilesets = mapData.tilesets;
			var image = tilesets[0].image;
			image = image.substring(image.search("/tilesets/")+"/tilesets/".length, image.length)

			var map = mapData.layers[0].data;

			// Affects the attributes from the JSON
			this.tilesets.push(new Tileset(image));
			this.height = mapData.layers[i].height;
			this.width = mapData.layers[i].width;
			this.layers.push(mapData.layers[i].data);
	    }
    };

    // Draws the object Map
    this.drawMap = function(context) {

		// Draws the layers
		for (currMap = 0; currMap < this.layers.length; ++currMap ) {
			var cpt = 0;

			for (var i = 0; i < this.width; ++i){
				for (var j = 0; j < this.height; ++j) {
					var currentTile = this.layers[currMap][cpt];

					this.tilesets[currMap].drawTitle(currentTile, context, i*tileSize, j*tileSize);
					cpt++;
				}
			}
		}

		// Draws the main character
		for(var i = 0, l = this.characters.length ; i < l ; i++) {
			this.characters[i].drawCharacter(context);
		}
	};

	// To add a character
	this.addPersonnage = function(char) {
		this.characters.push(char);
	}

    return this;
}











