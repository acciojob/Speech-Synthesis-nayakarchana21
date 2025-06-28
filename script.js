const textInput = document.getElementById('text');
const voiceSelect = document.getElementById('voices');
const rate = document.getElementById('rate');
const rateValue = document.getElementById('rate-value');
const pitch = document.getElementById('pitch');
const pitchValue = document.getElementById('pitch-value');
const speakButton = document.getElementById('speak');
const stopButton = document.getElementById('stop');

let voices = [];

function populateVoices() {
  voices = speechSynthesis.getVoices();
  voiceSelect.innerHTML = '';
  voices.forEach((voice, i) => {
    const option = document.createElement('option');
    option.value = i;
    option.textContent = `${voice.name} (${voice.lang})`;
    voiceSelect.appendChild(option);
  });
}

speechSynthesis.onvoiceschanged = populateVoices;

function speak() {
  const utterance = new SpeechSynthesisUtterance(textInput.value);
  const selectedVoice = voices[voiceSelect.value];
  utterance.voice = selectedVoice;
  utterance.rate = rate.value;
  utterance.pitch = pitch.value;
  speechSynthesis.speak(utterance);
}

function stop() {
  speechSynthesis.cancel();
}

rate.addEventListener('input', () => rateValue.textContent = rate.value);
pitch.addEventListener('input', () => pitchValue.textContent = pitch.value);
speakButton.addEventListener('click', speak);
stopButton.addEventListener('click', stop);

populateVoices(); // Call initially in case voices are already loaded

