function AudioManager () {
  this.currentAudio = new Audio()
  this.currentAudioLabel = ''

  this.launchAudio = function (path) {
    if (this.currentAudio != null) {
      this.currentAudio.pause()
      this.currentAudio.addEventListener('canplay', function () {
        this.currentAudio.currentTime = 0
      })
    }
    this.currentAudio = new Audio(path)
    this.currentAudio.addEventListener('ended', function () {
		    this.currentTime = 0
		    this.volume = 0.2
		    this.play()
    }, false)

    this.currentAudio.play()
    this.currentAudio.volume = 0.2
    this.currentAudioLabel = path
  }
}
