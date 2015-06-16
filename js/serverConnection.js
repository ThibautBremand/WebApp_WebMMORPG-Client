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
	alert ("Connection established!");
    //console.log("Connection established!");
};

conn.onmessage = function(e) {
    var mess = e.data.split(":");
    switch(mess[0]) {
    case "ENTER":
        alert (e.data);
        break;
    case "MOVE":
    	
    	break;
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