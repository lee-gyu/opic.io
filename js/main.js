

$(document).ready(function() {
    var lastAudio = undefined;

    $("a").click(function(e) {
        
        if (lastAudio != undefined) {
            lastAudio.pause();
        }

        var audio = new Audio();
    
        audio.src = "./mp3/" + e.currentTarget.id + ".mp3";
        
        audio.play();

        lastAudio = audio;
    });

});



