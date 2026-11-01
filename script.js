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
  name: "TWIN",                 // shows as "Dear My Love,"
  occasion: "Happy Birthday Twin! 🎂",  // small heading above the name
  envelopeLabel: "Tadahhhhhhh…",       // text on the card inside the envelope
  hint: "tap the envelope 💌",     // text above the envelope

  // ---- YOUR LETTER ----
  message:
`Today is all about you.

​First of all, I’m sorry this simple message is all I can give you right now while I’m away training for my upcoming game on Nov 21. Even from afar, I want you to feel special always and in all ways even if you are the total nonchalant human being that you are!
​I'm so grateful to have met someone as wonderfully unique, fragile, and humorous as you. I still can't believe that even though CODM has such a big server, Tito CODM somehow managed to match us on that random day! I nearly couldn't find you after that game because I forgot to add you, but a good thing you replied and the rest is history, hehe. That's also where Taylor Swift comes into our story! From the very beginning, there was something about you that I couldn't quite put into words, and to be honest, I still can't. You have this invisible string that makes it impossible to ignore you whenever you cross my mind.
​Life's endeavors may have been harsh on you, but seeing how you stay calm and let things fall into place one step at a time really inspired me. Because of you, a spark in me that was gone for years came back, and I’ve learned to take things neutrally just as you prefer between us.
​I specifically chose "Ruin the Friendship" by Taylor Swift for this message because it reminds me of the bond we've created and everything that's happened along the way. It's the theme song for our connection a reminder of the subtle, complicated feelings between us that need time and understanding before taking any step forward. I know you don't want to rush things, and I completely respect that. I'll just look forward to that moment when I might get the chance to know you even deeper, without putting any pressure on you at all.
​I might not be a perfect friend, but I will always put in the effort so you can see through my eyes just how much you truly mean to me. No matter what, FRHANNZ will always be right here whenever you need someone to call. I won't go anywhere, and I'll always be the loudest person cheering for all the small wins in your life.
​May God bless you and your family always! Continue being the kind, soft hearted Martha that everyone knows bisag geng-geng Taylor Swift ka usahay. Good luck with your Nursing career, Twin!


Happy birthday. Here's to another year of you.`,
  signature: "Yours always ♥",
  wishMessage: "Wish made. I hope it comes true 💖",
  wishPrompt: "tap the flame & make a wish ✨",

  // ---- MUSIC ----
  // Put your own audio file (mp3) in the SAME folder as index.html,
  // then write its file name here. Example: "ruin-the-friendship.mp3"
  // (Song files are copyrighted, so none is included — use a copy
  //  you legally own.) Leave as "" to turn music off.
  musicFile: "ruin-the-friendship.mp3",
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

