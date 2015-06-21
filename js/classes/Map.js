//var tileSize = 16;

// Map Object - Attributes & methods
function Map(json) {
    this.mapsToDraw = json;

    this.height = 0;
    this.width = 0;
    this.layers = new Array();
    this.characters = new Array();
    this.tilesets = new Array();
    this.collisions = new Array();

    // Loads the layers from the json files given
    this.loadLayers = function() {

		var xhr = getXMLHttpRequest();

			// AJAX "Old school"

			// Retrieves map from server
			xhr.open("GET", './maps/' + this.mapsToDraw[0] + '.json', false);
			xhr.send(null);
			if(xhr.readyState != 4 || (xhr.status != 200 && xhr.status != 0))
				throw new Error("Cannot load the map : " + this.mapsToDraw[0] + '.json' + "\" (code HTTP : " + xhr.status + ").");
			var mapJsonData = xhr.responseText;
			var mapData = JSON.parse(mapJsonData);

			// Retrieves all the layers for the map
			var layers = mapData.layers;
			// Retrieves tileset
			var tilesets = mapData.tilesets;
			for ( var i = 0; i < layers.length; ++i ) {
				if ( layers[i].name != "Collisions" ) {
					var image = tilesets[i].image;
					image = image.substring(image.search("/tilesets/")+"/tilesets/".length, image.length);

					var layer = layers[i].data;
					this.height = mapData.layers[i].height;
					this.width = mapData.layers[i].width;

					this.tilesets.push(new Tileset(image, tilesets[i].firstgid));
					this.layers.push(layer);
				}
				else {
					this.collisions = layers[i].objects;
				}
			}

	    //}
    };

    // Draws the object Map
    this.drawMap = function(context) {

		// Draws the layers
		for (currMap = 0; currMap < this.layers.length; ++currMap ) {
			var cpt = 0;
			for (var j = 0; j < this.height; ++j){
				for (var i = 0; i < this.width; ++i) {
					var currentTile = this.layers[currMap][cpt];
					if ( currentTile > 0 ) {
						this.electAndDrawTile(currentTile, context, i, j);
						//this.tilesets[currMap].drawTitle(currentTile - this.layers[currMap][cpt].firstgid, context, i*tileSize, j*tileSize);
					}
					cpt++;
				}
			}
		}

		// Draws the characters
		for(var i = 0, l = this.characters.length ; i < l ; i++) {
			this.characters[i].drawCharacter(context);
		}
	};

	// To add a character
	this.addPersonnage = function(char) {
		this.characters.push(char);
	};

	// Elects and draws the corretc tile from a tileset
	this.electAndDrawTile = function(currentTile, context, i, j) {
		var tilesetToUse;
		for ( var l = 0; l < this.tilesets.length; ++l ) {
			if ( this.tilesets[l].firstgid > currentTile && currentTile > 1 ) {
				tilesetToUse = this.tilesets[l - 1];
				tilesetToUse.drawTitle(currentTile - tilesetToUse.firstgid + l, context, i*tileSize, j*tileSize);
				return true;
			}
		}
		tilesetToUse = this.tilesets[this.tilesets.length - 1];
		tilesetToUse.drawTitle(currentTile - tilesetToUse.firstgid + this.tilesets.length - 1, context, i*tileSize, j*tileSize);
	};

	// Detects if a position is an obstacle
	this.isObstacle = function ( positionToCheck ) {
		if (this.collisions.length > 0 ) {
			for ( var i = 0; i < this.collisions.length; ++i ) {
				var collWidth = this.collisions[i].width;
				var collHeight = this.collisions[i].height;
				var collX = this.collisions[i].x;
				var collY = this.collisions[i].y;

				var checkX = ( positionToCheck.x * tileSize ) + tileSize ;
				var checkY = ( positionToCheck.y * tileSize ) + tileSize ;

				//alert ("check : x : " + checkX + " " + collX + " " + collWidth + " y : " + checkY + " " + collY + " " + collHeight);

				// Compares the positionToCheck with the collision area
				if ( checkX > collX && checkX < collX + collWidth && checkY > collY && checkY < collY + collHeight ) {
					return true;
				}
			}
		}
		return false;
	}

    return this;
}











