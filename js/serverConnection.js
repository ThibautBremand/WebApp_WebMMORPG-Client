function message(user, action, param){
	this.user = user;
	this.action = action;
	this.param = param;

	this.toString = function() {
		return this.user + ":" + this.action + ":" + this.param;
	}
}

var nickname = prompt('Enter your nickname','guest');

var conn = new WebSocket('ws://localhost:8080' + '?' + nickname);

conn.onopen = function(e) {
	$("#logs").append("Connection established!</br>");
};

conn.onmessage = function(e) {
    var mess = e.data.split("%:%");
    switch(mess[0]) {
    case "ENTER":
        var characters = jQuery.parseJSON(mess[2]);
        //todo: let the user choose his character

        // parses information and display character
        var currentChar = characters[0];

        $("#logs").append(currentChar.name + " just logged in !" + "</br>");

        /*
        //new character
        if ( mess[2] != nickname ) {
            //map.addPersonnage(new Personnage("exemple.png", 7, 14, DIRECTION.BAS, mess[2]));
            var characters = jQuery.parseJSON(mess[1]);
            var currentChar = characters[0];
            map.addPersonnage(new Personnage("exemple.png", parseInt(currentChar.x), parseInt(currentChar.y), DIRECTION.BAS, currentChar.name));
        }*/

        joueur = new Personnage("exemple.png", parseInt(currentChar.x), parseInt(currentChar.y), DIRECTION.BAS, currentChar.name)
        map.addPersonnage(joueur);

        break;
    case "MOVE":
    	break;
    case "LEAVE":
        $("#logs").append(mess[2] + " left !</br>");
        break;
    case "ERROR":
        alert(mess[1]);
        break;
    case "LAUNCH":
        //joueur = new Personnage("exemple.png", 7, 14, DIRECTION.BAS, nickname);
        //map.addPersonnage(joueur);
        drawRPG();
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