// Voice Control
if (annyang) {
    var recognition = annyang.getSpeechRecognizer();
    var final_transcript = '';
    recognition.interimResults = true;
    annyang.start();

    recognition.onresult = function(event) {
        var interim_transcript = '';
        final_transcript = '';
        for (var i = event.resultIndex; i < event.results.length; ++i) {
            if (event.results[i].isFinal) {
                final_transcript += event.results[i][0].transcript;
                console.log("final_transcript");
                console.log(final_transcript);
                annyang.trigger(final_transcript); //If the sentence is "final" for the Web Speech API, we can try to trigger the sentence
            } else {
                interim_transcript += event.results[i][0].transcript;
                console.log("interim_transcript");
                console.log(interim_transcript);
            }
        }
        final_transcript = capitalize(final_transcript);
        final_span.innerHTML = linebreak(final_transcript);
        interim_span.innerHTML = linebreak(interim_transcript);
    };
    var commands = {
        'next page': function() {
            impress().next();
        },
        'previous page': function() {
            impress().prev();
        },
        'timer start': function() {
            TimerStart();
        },
        'testing voice': function() {
            alert("Testing Passed");
        }
    };

    annyang.addCommands(commands);
}

