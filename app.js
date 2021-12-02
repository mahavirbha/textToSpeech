const textarea = document.querySelector("textarea"),
voicelist = document.querySelector("select"),
speechBtn = document.querySelector("button");

let synth = speechSynthesis,
isSpeaking = true;

// functions

function voices(){
    for(let voice of synth.getVoices()){
        let selected = voice.name === "Google US English" ? "selected" : "";
        // creating an option tag with passing voice name and voice language
        let option = `<option value="${voice.name}" ${selected}>${voice.name} (${voice.lang})</option>`;
        // inserting option tag beforeend of select tag
        voicelist.insertAdjacentHTML("beforeend", option);
    }
}

synth.addEventListener("voiceschanged", voices);

function textToSpeech(text){
    let utterance = new SpeechSynthesisUtterance(text);
    for(let voice of synth.getVoices()){
        if(voice.name === voicelist.value){
            utterance.voice = voice;
        }
    }
    speechSynthesis.speak(utterance);
}



speechBtn.addEventListener("click", e =>{
    e.preventDefault();
    if(textarea.value !== ""){
        if(!synth.speaking){
            textToSpeech(textarea.value);
        } 
    }

    if(textarea.value.length > 80){
        if(isSpeaking){
            synth.resume();
            isSpeaking = false;
            speechBtn.innerText = "Pause Speech";
        }
        else{
            synth.pause();
            isSpeaking = true;
            speechBtn.innerText = "Resume Speech";
        }

        setInterval(() =>{
            if(!synth.speaking && !isSpeaking){
                isSpeaking = true;
                speechBtn.innerText = "Convert To Speech";
            }
        });
    }
    else{
        speechBtn.innerText = "Convert To Speech";
    }
});

