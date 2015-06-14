var conn = new WebSocket('ws://localhost:8080');

conn.onopen = function(e) {
	alert ("Connection established!");
    console.log("Connection established!");
};

conn.onmessage = function(e) {
    console.log(e.data);
};

function keyTreatment(evenement){
    //on a accès ici au code de la touche du clavier 
    //via la variable evenement.which
    conn.send(evenement.which);
}
$(function(){
    $(document).keydown(keyTreatment);
});