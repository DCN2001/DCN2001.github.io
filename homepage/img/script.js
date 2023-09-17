var audio, playbtn, seek_bar
function initAudioPlayer(){
    audio= new Audio()
    audio.src = "./sunandmoon.mp3"
    audio.loop= true
    audio.play()
}

window.addEventListener("load", initAudioPlayer)
