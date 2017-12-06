// Voice Control
if (annyang) {
    var commands = {
        'theoratically': function() {
            impress().next();
        }
    };

    annyang.addCommands(commands);
}

// LiveReload
document.write('<script src="http://' + (location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1"></' + 'script>')
