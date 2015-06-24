// Map Object - Attributes & methods
function Map(json) {
    this.mapToDraw = json;

    this.height = 0;
    this.width = 0;
    this.layers = new Array();
    this.characters = new Array();
    this.tilesets = new Array();
    this.collisions = new Array();
    this.neighbors = new Array();

    // Loads the layers from the json files given
    this.loadLayers = function() {
		// Retrieves all the layers for the map
		var layers = this.mapToDraw.layers;
		// Retrieves tileset
		var tilesets = this.mapToDraw.tilesets;
		for ( var i = 0; i < tilesets.length; ++i ) {
			var image = tilesets[i].image;
			image = image.substring(image.search("/tilesets/")+"/tilesets/".length, image.length);

			this.height = this.mapToDraw.layers[i].height;
			this.width = this.mapToDraw.layers[i].width;

			this.tilesets.push(new Tileset(image, tilesets[i].firstgid));
		}

		for ( var i = 0; i < layers.length; ++i ) {
			if ( layers[i].name == "Collisions" ) {
				this.collisions = layers[i].objects;
			}
			else if ( layers[i].name.substr(0, 3) == "MAP" ) {
				this.neighbors.push(layers[i]);
			}
			else {
				this.layers.push(layers[i].data);
			}
		}
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
		if ( tileSize == 16 ) {
			tilesetToUse = this.tilesets[this.tilesets.length - 1];
			tilesetToUse.drawTitle(currentTile - tilesetToUse.firstgid + this.tilesets.length , context, i*tileSize, j*tileSize);
		}
		else if ( tileSize == 32 ) {
			tilesetToUse = this.tilesets[this.tilesets.length - 1];
			tilesetToUse.drawTitle(currentTile - tilesetToUse.firstgid + this.tilesets.length - 1, context, i*tileSize, j*tileSize);
		}
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

				// Compares the positionToCheck with the collision area
				if ( checkX > collX && checkX < collX + collWidth && checkY > collY && checkY < collY + collHeight ) {
					return true;
				}
			}
		}
		return false;
	};

	// Detects if a position is a TP
	this.isNeighbor = function ( joueur, direction ) {
		var nextPos = joueur.getCoordonneesAdjacentes(direction);
		for ( var j = 0; j < this.neighbors.length; ++j ) {
			if ( this.neighbors[j].objects.length > 0 ) {
				for ( var i = 0; i < this.neighbors[j].objects.length; ++i ) {
					var collWidth = this.neighbors[j].objects[i].width;
					var collHeight = this.neighbors[j].objects[i].height;
					var collX = this.neighbors[j].objects[i].x;
					var collY = this.neighbors[j].objects[i].y;

					var checkX = ( nextPos.x * tileSize ) + tileSize ;
					var checkY = ( nextPos.y * tileSize ) + tileSize ;

					// Compares the joueur's with the TP area
					var yolo = collX + collWidth
					var yolo2 = collY + collHeight
					if (direction == DIRECTION.HAUT) {
						if ( checkX > collX && checkX < collX + collWidth && checkY >= collY && checkY < collY + collHeight ) {
							return (this.neighbors[j].name.substr(3, this.neighbors[j].name.length));
						}
					}
					else if (direction == DIRECTION.BAS) {
						if ( checkX > collX && checkX < collX + collWidth && checkY - collHeight == collY + collHeight) {
							return (this.neighbors[j].name.substr(3, this.neighbors[j].name.length));
						}
					}
					else if (direction == DIRECTION.GAUCHE) {
						if ( checkX == collX && checkX < collX + collWidth && checkY >= collY && checkY < collY + collHeight ) {
							return (this.neighbors[j].name.substr(3, this.neighbors[j].name.length));
						}
					}
					else if (direction == DIRECTION.DROITE) {
						if ( checkX - collWidth == collX + collWidth  && checkY >= collY && checkY < collY + collHeight ) {
							return (this.neighbors[j].name.substr(3, this.neighbors[j].name.length));
						}
					}
				}
			}
		}
		return "";
	};

    return this;
}











