// Get Current Slide
var currentstep
var impressroot = document.getElementById("impress");
impressroot.addEventListener( "impress:stepenter", function(event) {
    currentstep = event.target;
    console.log("Entered Slide '" + currentstep.id + "'");
});

// Voice Control
if (window.speechRecognition) {
    window.speechRecognition.addEventListener('result', e => {
        const results = [...e.results].map(([result]) => result);
        results.forEach(result => {
            dsr.innerHTML = result.transcript;
            console.log(result);
        });
    });
    var commands = {
        'first of all': function() {
            if (currentstep.id == "frontpage") {
                impress().next();
            }
        },
        'take notes': function() {
            if (currentstep.id == "frontpage") {
                impress().next();
            }
        },
        'united states': function() {
            if (currentstep.id == "background") {
                impress().next();
            }
        },
        'however': function() {
            if (currentstep.id == "bg-99") {
                impress().next();
            }
        },
        'best way': function() {
            if (currentstep.id == "bg-0") {
                impress().next();
            }
        },
        'common methods': function() {
            if (currentstep.id == "bg-0") {
                impress().next();
            }
        },
        'by hand': function() {
            if (currentstep.id == "note-by-hand") {
                impress().next();
            }
        },
        'on their laptops': function() {
            if (currentstep.id == "note-typing") {
                impress().next();
            }
        }
    };

    annyang.addCommands(commands);
    annyang.addCallback('result', function(userSaid, commandText, phrases) {
        console.log("SRE:: " + userSaid);
    });
}

// LiveReload
//document.write('<script src="http://' + (location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1"></' + 'script>')
