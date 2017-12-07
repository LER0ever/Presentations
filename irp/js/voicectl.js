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

    speechRecognition.addEventListener('result', e => {
        const results = [...e.results].map(([result]) => result);
        results.forEach(result => {
            var str = result.transcript;
            dsr.innerHTML = str;
            //console.log(result);
            switch (true) {
             case /next\bpage/.test(str):
                impress().next();
                break;
             case /previous\bpage/.test(str):
                impress().prev();
                break;
              // no default
            }
        });
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
    });
    speechRecognition.addEventListener('error', e => {
        console.error(e);
    });

    function isSupportedBrowser() {
        return ('SpeechRecognition' in window) || ('webkitSpeechRecognition' in window);
    }
});
