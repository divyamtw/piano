import { keySounds } from "./keySounds.js";
import { keyboardBind } from "./keyboardBind.js";

const keys = document.querySelectorAll(".key");

// Preload audio
const audioCache = {};
Object.entries(keySounds).forEach(([id, file]) => {
  audioCache[id] = new Audio(`piano-mp3/${file}`);
});

// Mouse events
keys.forEach((key) => {
  key.addEventListener("mousedown", () => {
    const id = key.dataset.key;
    const audio = audioCache[id];
    if (!audio) return;

    audio.currentTime = 0;
    audio.play();

    key.classList.add("active");
    setTimeout(() => key.classList.remove("active"), 120);
  });

  key.addEventListener("mouseleave", () => {
    key.classList.remove("active");
  });
});

// Keyboard events
document.addEventListener("keydown", (e) => {
  const pianoKey = keyboardBind[e.key.toLowerCase()];

  if (!pianoKey) return;

  const keyElement = document.querySelector(`[data-key="${pianoKey}"]`);
  const audio = audioCache[pianoKey];

  if (!keyElement || !audio) return;

  audio.currentTime = 0;
  audio.play();

  keyElement.classList.add("active");
  setTimeout(() => keyElement.classList.remove("active"), 120);
});
