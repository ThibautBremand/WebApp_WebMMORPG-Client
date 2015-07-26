function message(user, action, param){
    this.user = user;
    this.action = action;
    this.param = param;

    this.toString = function() {
        return this.user + ":" + this.action + ":" + this.param;
    }
}

var pass = prompt('Enter your password','');
var conn = new WebSocket('ws://localhost:8080' + '?' + nickname + "&" + user + "&" + pass);

conn.onopen = function(e) {
    $("#logs").append("Connection established!</br>");
};

conn.onmessage = function(e) {
    var mess = e.data.split("%:%");
    switch(mess[0]) {
    // When a user connects to the game
    case "ENTER":
        // parses information and display character
        var currentChar = jQuery.parseJSON(mess[3]);
        $("#logs").append(mess[2] + " (" + currentChar.name + ") just logged in !" + "</br>");
        //map.addPersonnage(new Personnage("exemple.png", parseInt(currentChar.x), parseInt(currentChar.y), DIRECTION.BAS, currentChar.name));
        break;
    case "COMING":
        // parses information and display character
        var currentChar = jQuery.parseJSON(mess[2]);
        map.addPersonnage(new Personnage("exemple.png", parseInt(currentChar.x), parseInt(currentChar.y), DIRECTION.BAS, currentChar.name));
        break;
    case "MOVE":
        for ( var i = 0; i < map.characters.length; ++i ) {
            if ( map.characters[i].name == mess[2] ) {
                map.characters[i].move(mess[1], map, false)
            }
        }
        break;
    case "LEAVE":
        if ( mess[2] != null ) {
            var charToDel = jQuery.parseJSON(mess[3]);
            for ( var i = 0; i < map.characters.length; ++i ) {
                if ( map.characters[i].name == charToDel.name ){
                    map.characters.splice(i, 1);
                }
            }
        }
        break;
    case "LOGOUT":
        if ( mess[2] != null ) {
            var currentChar = jQuery.parseJSON(mess[3]);
            $("#logs").append(mess[2] + " (" + currentChar.name + ") left !</br>");
            var charToDel = jQuery.parseJSON(mess[3]);
            for ( var i = 0; i < map.characters.length; ++i ) {
                if ( map.characters[i].name == charToDel.name ){
                    map.characters.splice(i, 1);
                }
            }
        }
        break;
    case "ERROR":
        alert(mess[1]);
        break;
    case "LAUNCH":
        // When the user connects to the game
        var currentChar = jQuery.parseJSON(mess[1]);
        //joueur = new Personnage("exemple.png", parseInt(currentChar.x), parseInt(currentChar.y), DIRECTION.BAS, currentChar.name);
        joueur = new Personnage("Universal-LPC-Spritesheet-Character-Generator/Universal-LPC-spritesheet/body/male/light.png", parseInt(currentChar.x), parseInt(currentChar.y), DIRECTION.BAS, currentChar.name);
        
        map = new Map(currentChar.map);
        map.loadLayers();
        drawRPG();
        map.addPersonnage(joueur);
        break;
    case "CHANGEMAP":
        // When the user changes map by teleporting
        var currentChar = jQuery.parseJSON(mess[1]);
        joueur.x = parseInt(currentChar.x);
        joueur.y = parseInt(currentChar.y)

        map = new Map(currentChar.map);
        map.loadLayers();
        map.addPersonnage(joueur);
        break;
    case "CHARSCONNECTED":
        var currentChar = jQuery.parseJSON(mess[2]);
        map.addPersonnage(new Personnage("exemple.png", parseInt(currentChar.x), parseInt(currentChar.y), DIRECTION.BAS, currentChar.name));
    default:
        break;
    } 
};

function keyTreatment(evenement){
    //on a accès ici au code de la touche du clavier 
    //via la variable evenement.which
    //conn.send(evenement.which);
}
$(function(){
    $(document).keydown(keyTreatment);
});