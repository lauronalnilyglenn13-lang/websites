/* ==========================================================
   script.js
   PART 1: CONFIG (the only part you need to edit)
   PART 2: CODE   (animations & actions — no need to change)
   ========================================================== */

/* ==========================================================
   PART 1 — CONFIG
   ========================================================== */
const CONFIG = {

  // ---- WHO IS IT FOR? ----
  name: "My Love",                 // shows as "Dear My Love,"
  occasion: "Happy Birthday! 🎂",  // small heading above the name
  envelopeLabel: "For you…",       // text on the card inside the envelope
  hint: "tap the envelope 💌",     // text above the envelope

  // ---- YOUR LETTER ----
  message:
`Today is all about you.

I hope your day is full of cake, laughter and everything that makes you smile. You make ordinary moments feel like my favorite memories.

I don't say it enough: you are someone really special to me, and I'm so glad you were born.

Happy birthday. Here's to another year of you.`,
  signature: "Yours always ♥",
  wishMessage: "Wish made. I hope it comes true 💖",
  wishPrompt: "tap the flame & make a wish ✨",

  // ---- MUSIC ----
  // Put your own audio file (mp3) in the SAME folder as index.html,
  // then write its file name here. Example: "ruin-the-friendship.mp3"
  // (Song files are copyrighted, so none is included — use a copy
  //  you legally own.) Leave as "" to turn music off.
  musicFile: "https://videotourl.com/audio/1793551484935-28de5eff-d89c-49f5-83e8-5a81d2038851.mp3",
  musicVolume: 0.6,                // 0 = silent, 1 = loudest

  // ---- BACKGROUND IMAGE (optional) ----
  // Put a picture in the same folder and type its name, e.g. "us.jpg".
  // Leave as "" to keep the pink-and-red gradient from style.css.
  backgroundImage: "",

  // ---- DECORATIONS ----
  hearts: ["💗", "💖", "💕", "♥", "🌸", "💘"],
  heartEverySeconds: 0.8,          // lower = more hearts
  confettiColors: ["#ff5c8a", "#ff9ebb", "#d6254d", "#fff6f0", "#ffd36e"],
  confettiAmount: 70
};


/* ==========================================================
   PART 2 — CODE (you don't have to change anything below)
   ========================================================== */

// --- Grab the elements from index.html ---
const $ = (id) => document.getElementById(id);
const scene    = $("scene");
const envelope = $("envelope");
const reader   = $("reader");
const musicBtn = $("musicBtn");
const flame    = $("flame");

// --- Fill in the text from CONFIG ---
$("occasion").textContent        = CONFIG.occasion;
$("letterTitle").textContent     = "Dear " + CONFIG.name + ",";
$("letterBody").textContent      = CONFIG.message;
$("letterSignature").textContent = CONFIG.signature;
$("envelopeLabel").textContent   = CONFIG.envelopeLabel;
$("hint").textContent            = CONFIG.hint;
$("wish").textContent            = CONFIG.wishPrompt;

// --- Background picture (if one was given) ---
if (CONFIG.backgroundImage) {
  document.body.style.background =
    `linear-gradient(rgba(214,37,77,.25), rgba(255,158,187,.25)),
     url("${CONFIG.backgroundImage}") center / cover fixed`;
}

// --- Bunting flags across the top ---
for (let i = 0; i < 14; i++) $("bunting").appendChild(document.createElement("i"));

// --- MUSIC ---
let audio = null;
if (CONFIG.musicFile) {
  audio = new Audio(CONFIG.musicFile);
  audio.loop = true;
  audio.volume = CONFIG.musicVolume;
  musicBtn.style.display = "block";
}

function playMusic() {
  if (!audio) return;
  audio.play()
    .then(() => musicBtn.classList.add("playing"))
    .catch(() => {});              // browser blocked it; the button still works
}

musicBtn.addEventListener("click", () => {
  if (!audio) return;
  if (audio.paused) { playMusic(); }
  else { audio.pause(); musicBtn.classList.remove("playing"); }
});

// --- OPEN / CLOSE THE ENVELOPE ---
let isOpen = false;

function openEnvelope() {
  if (isOpen) return;
  isOpen = true;
  envelope.classList.add("open");
  scene.classList.add("opened");
  playMusic();                     // music starts on the first tap (phones require this)
  setTimeout(() => {
    reader.classList.add("show");
    confettiBurst();
  }, 1500);
  burstHearts(14);
}

function closeLetter() {
  reader.classList.remove("show");
  envelope.classList.remove("open");
  scene.classList.remove("opened");
  flame.classList.remove("out");
  $("wish").textContent = CONFIG.wishPrompt;
  isOpen = false;
}

envelope.addEventListener("click", openEnvelope);
envelope.addEventListener("keydown", (e) => {
  if (e.key === "Enter" || e.key === " ") openEnvelope();
});
$("closeBtn").addEventListener("click", closeLetter);

// --- BLOW OUT THE CANDLE ---
$("cake").addEventListener("click", () => {
  if (flame.classList.contains("out")) return;
  flame.classList.add("out");
  $("wish").textContent = CONFIG.wishMessage;
  confettiBurst();
  burstHearts(10);
});

// --- FLOATING HEARTS ---
function spawnHeart() {
  const heart = document.createElement("span");
  heart.className = "floating-heart";
  heart.textContent = CONFIG.hearts[Math.floor(Math.random() * CONFIG.hearts.length)];
  heart.style.left = Math.random() * 100 + "vw";
  heart.style.fontSize = 16 + Math.random() * 26 + "px";
  heart.style.animationDuration = 6 + Math.random() * 6 + "s";
  document.body.appendChild(heart);
  setTimeout(() => heart.remove(), 12000);
}
function burstHearts(count) {
  for (let i = 0; i < count; i++) setTimeout(spawnHeart, i * 80);
}
setInterval(spawnHeart, CONFIG.heartEverySeconds * 1000);

// --- CONFETTI ---
function confettiBurst() {
  for (let i = 0; i < CONFIG.confettiAmount; i++) {
    const piece = document.createElement("span");
    piece.className = "confetti";
    piece.style.left = Math.random() * 100 + "vw";
    piece.style.background =
      CONFIG.confettiColors[Math.floor(Math.random() * CONFIG.confettiColors.length)];
    piece.style.animationDuration = 2.5 + Math.random() * 2.5 + "s";
    piece.style.animationDelay = Math.random() * 0.6 + "s";
    document.body.appendChild(piece);
    setTimeout(() => piece.remove(), 6000);
  }
}
