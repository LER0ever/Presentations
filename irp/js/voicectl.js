'use strict';

window.addEventListener('DOMContentLoaded', () => {
    if (!isSupportedBrowser()) {
        return alert('this browser is not supported');
    }
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const speechRecognition = new SpeechRecognition;
    speechRecognition.continuous = true;
    speechRecognition.interimResults = true;
    speechRecognition.lang = 'en-US';
    window.speechRecognition = speechRecognition; // for debug

    const dsr = document.getElementById('speech-result');

    speechRecognition.start();

    var final_transcript = '';
    var interim_transcript = '';

    speechRecognition.addEventListener('result', e => {
        interim_transcript = '';
        if (typeof(e.results) == 'undefined') {
            speechRecognition.stop();
            speechRecognition.start();
            return;
        }
        for (var i = e.resultIndex; i < e.results.length; ++i) {
            if (e.results[i].isFinal) {
                final_transcript += e.results[i][0].transcript;
                if (final_transcript.length > 150) {
                    final_transcript = final_transcript.substring(50);
                }
            } else {
                interim_transcript += e.results[i][0].transcript;
            }
        }
        if ((final_transcript + interim_transcript).length > 180) {
            final_transcript = final_transcript.substring(50);
        }
        dsr.innerHTML = final_transcript + interim_transcript;
        //final_transcript = capitalize(final_transcript);
        //final_span.innerHTML = linebreak(final_transcript);
        //interim_span.innerHTML = linebreak(interim_transcript);
        //if (final_transcript || interim_transcript) {
            //showButtons('inline-block');
        //}
        //const results = [...e.results].map(([result]) => result);
        ////dsr.innerHTML = results[0].transcript;
        ////dsr.innerHTML = e.results[0][0].transcript;
        //results.forEach(result => {
        //var str = result.transcript;
        //dsr.innerHTML = str;
        ////console.log(result);
        //});
        //dsr.textContent = "";
    });
    speechRecognition.addEventListener('nomatch', e => {
        console.log('nomatch', e);
    });
    speechRecognition.addEventListener('end', e => {
        console.log('end', e);
        speechRecognition.start();
    });
    speechRecognition.addEventListener('audiostart', e => {
        console.log('audiostart', e);
    });
    speechRecognition.addEventListener('soundstart', e => {
        console.log('soundstart', e);
    });
    speechRecognition.addEventListener('speechstart', e => {
        console.log('speechstart', e);
    });
    speechRecognition.addEventListener('audioend', e => {
        console.log('audiosend', e);
    });
    speechRecognition.addEventListener('soundend', e => {
        console.log('soundend', e);
    });
    speechRecognition.addEventListener('speechend', e => {
        console.log('speechend', e);
        speechRecognition.stop();
        speechRecognition.start();
    });
    speechRecognition.addEventListener('error', e => {
        console.error(e);
    });

    function isSupportedBrowser() {
        return ('SpeechRecognition' in window) || ('webkitSpeechRecognition' in window);
    }
});
