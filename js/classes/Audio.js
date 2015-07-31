function AudioManager() {

	this.currentAudio = new Audio();

	this.launchAudio = function(path) {
		if ( this.currentAudio != null ) {
			this.currentAudio.pause();
			this.currentAudio.currentTime = 0;
		}
		this.currentAudio = new Audio(path); 
		/*this.currentAudio.addEventListener('ended', function() {
		    this.currentTime = 0;
		    this.play();
		}, false);*/

		this.currentAudio.addEventListener('timeupdate', function(){
        var buffer = .44
        if(this.currentTime > this.duration - buffer){
            this.currentTime = 0
            this.play()
        }}, false);

		this.currentAudio.play();
	};
}