(() => {
  "use strict";

  const cfg = window.birthdayConfig;
  if (!cfg) {
    console.error("config.js not loaded — birthdayConfig is missing.");
    return;
  }

  /* ------------------------------------------------------------
     Helpers
     ------------------------------------------------------------ */

  // Sets an <img> src and hides it gracefully (falling back to the
  // CSS placeholder background behind it) if the file 404s.
  function setImage(img, src, alt) {
    if (!img) return;
    if (alt) img.alt = alt;
    img.addEventListener("error", () => img.classList.add("img-fallback"), { once: true });
    img.addEventListener("load", () => img.classList.add("loaded"), { once: true });
    img.src = src;
  }

  function setText(el, value) {
    if (el && value != null) el.textContent = value;
  }

  function formatTime(seconds) {
    if (!isFinite(seconds) || isNaN(seconds)) return "0:00";
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m}:${String(s).padStart(2, "0")}`;
  }

  /* ------------------------------------------------------------
     1. Populate static content from config.js
     ------------------------------------------------------------ */
  function renderContent() {
    // Opening
    setImage(document.getElementById("opening-photo"), cfg.opening.photo, cfg.name);
    setText(document.getElementById("opening-eyebrow"), cfg.opening.eyebrow);
    setText(document.getElementById("opening-title"), cfg.opening.title);
    setText(document.getElementById("opening-subtitle"), cfg.opening.subtitle);
    setText(document.getElementById("open-btn-label"), cfg.opening.buttonLabel);

    // Hero
    setImage(document.getElementById("hero-cover"), cfg.hero.cover, cfg.name);
    setImage(document.getElementById("mini-cover"), cfg.hero.cover, cfg.name);
    setText(document.getElementById("hero-eyebrow"), cfg.hero.eyebrow);
    setText(document.getElementById("hero-title"), cfg.hero.title);
    setText(document.getElementById("hero-desc"), cfg.hero.description);

    // Player text
    setText(document.getElementById("player-title"), cfg.song.title);
    setText(document.getElementById("player-artist"), cfg.song.artist);
    setText(document.getElementById("mini-title"), cfg.song.title);
    setText(document.getElementById("mini-artist"), cfg.song.artist);

    // Memories
    const wrap = document.getElementById("memories");
    wrap.innerHTML = "";
    (cfg.memories || []).forEach((m, i) => {
      const el = document.createElement("article");
      el.className = "memory";
      el.innerHTML = `
        <span class="memory-index">${String(i + 1).padStart(2, "0")} — ${m.label ? m.label.toUpperCase() : ""}</span>
        <div class="memory-photo"><img alt=""></div>
        <p class="memory-text"></p>
      `;
      setImage(el.querySelector("img"), m.image, m.label);
      setText(el.querySelector(".memory-text"), m.text);
      wrap.appendChild(el);
    });

    // Letter
    setText(document.getElementById("letter-label"), cfg.letter.label);
    setText(document.getElementById("letter-heading"), cfg.letter.heading);
    setText(document.getElementById("letter-body"), cfg.letter.body);

    // Ending
    setImage(document.getElementById("ending-photo"), cfg.ending.photo, cfg.name);
    setText(document.getElementById("ending-eyebrow"), cfg.ending.eyebrow);
    setText(document.getElementById("ending-title"), cfg.ending.title);
    setText(document.getElementById("ending-message"), cfg.ending.message);
    setText(document.getElementById("ending-signature"), cfg.ending.signature);
  }

  /* ------------------------------------------------------------
     2. Audio player
     ------------------------------------------------------------ */
  const audio = document.getElementById("audio");
  let audioReady = false;
  let audioFailed = false;

  function initAudio() {
    audio.src = cfg.song.file;

    audio.addEventListener("loadedmetadata", () => {
      audioReady = true;
      setText(document.getElementById("time-duration"), formatTime(audio.duration));
    });

    audio.addEventListener("timeupdate", () => {
      if (!audio.duration) return;
      const pct = (audio.currentTime / audio.duration) * 100;
      document.getElementById("progress-fill").style.width = pct + "%";
      document.getElementById("progress-handle").style.left = pct + "%";
      document.getElementById("mini-progress").style.setProperty("--mini-progress", pct + "%");
      setText(document.getElementById("time-current"), formatTime(audio.currentTime));
    });

    audio.addEventListener("play", () => setPlayingState(true));
    audio.addEventListener("pause", () => setPlayingState(false));
    audio.addEventListener("ended", () => setPlayingState(false));

    // If the mp3 file hasn't been added yet, fail silently —
    // the site must keep working with no fatal error.
    audio.addEventListener("error", () => {
      audioFailed = true;
      console.warn("Lagu tidak ditemukan di", cfg.song.file, "— tambahkan file MP3 kamu di sana.");
    });
  }

  function setPlayingState(isPlaying) {
    document.getElementById("icon-play").style.display = isPlaying ? "none" : "block";
    document.getElementById("icon-pause").style.display = isPlaying ? "block" : "none";
    document.getElementById("mini-icon-play").style.display = isPlaying ? "none" : "block";
    document.getElementById("mini-icon-pause").style.display = isPlaying ? "block" : "none";
    document.getElementById("disc").classList.toggle("is-spinning", isPlaying);
    document.getElementById("mini-disc").classList.toggle("is-spinning", isPlaying);
    document.getElementById("eq").classList.toggle("is-playing", isPlaying);
  }

  function togglePlay() {
    if (audioFailed) return;
    if (audio.paused) {
      audio.play().catch((err) => console.warn("Playback belum bisa dimulai:", err));
    } else {
      audio.pause();
    }
  }

  document.getElementById("play-toggle").addEventListener("click", togglePlay);
  document.getElementById("mini-play").addEventListener("click", togglePlay);

  // Scrub / seek
  function bindSeek() {
    const track = document.getElementById("progress-track");

    function seekFromEvent(clientX) {
      if (!audio.duration) return;
      const rect = track.getBoundingClientRect();
      const ratio = Math.min(1, Math.max(0, (clientX - rect.left) / rect.width));
      audio.currentTime = ratio * audio.duration;
    }

    let dragging = false;
    track.addEventListener("pointerdown", (e) => {
      dragging = true;
      track.setPointerCapture(e.pointerId);
      seekFromEvent(e.clientX);
    });
    track.addEventListener("pointermove", (e) => {
      if (dragging) seekFromEvent(e.clientX);
    });
    ["pointerup", "pointercancel"].forEach((evt) =>
      track.addEventListener(evt, () => (dragging = false))
    );
  }

  /* ------------------------------------------------------------
     3. OPEN button — the single user gesture that unlocks
        audio + fullscreen on Android/mobile browsers
     ------------------------------------------------------------ */
  function requestFullscreenSafe() {
    const el = document.documentElement;
    const req =
      el.requestFullscreen ||
      el.webkitRequestFullscreen ||
      el.mozRequestFullScreen ||
      el.msRequestFullscreen;
    if (req) {
      req.call(el).catch(() => {
        /* fullscreen denied or unsupported — website keeps working normally */
      });
    }
  }

  function openExperience() {
    const openingScreen = document.getElementById("opening-screen");
    const app = document.getElementById("app");

    requestFullscreenSafe();

    if (!audioFailed) {
      audio.play().catch((err) => {
        console.warn("Autoplay diblokir, user bisa menekan play manual:", err);
      });
    }

    openingScreen.classList.add("is-closing");
    app.classList.add("is-visible");
    app.setAttribute("aria-hidden", "false");

    setTimeout(() => {
      openingScreen.style.display = "none";
    }, 950);
  }

  /* ------------------------------------------------------------
     4. Scroll reveals
     ------------------------------------------------------------ */
  function bindReveals() {
    const targets = document.querySelectorAll(".memory, .letter, .ending");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.18 }
    );
    targets.forEach((t) => io.observe(t));
  }

  /* ------------------------------------------------------------
     5. Sticky mini player visibility (appears once hero scrolls
        out of view, so the full player up top isn't duplicated)
     ------------------------------------------------------------ */
  function bindMiniPlayer() {
    const hero = document.getElementById("hero");
    const mini = document.getElementById("mini-player");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          mini.classList.toggle("is-visible", !entry.isIntersecting);
          mini.setAttribute("aria-hidden", entry.isIntersecting ? "true" : "false");
        });
      },
      { threshold: 0.05 }
    );
    io.observe(hero);
  }

  /* ------------------------------------------------------------
     Init
     ------------------------------------------------------------ */
  document.addEventListener("DOMContentLoaded", () => {
    renderContent();
    initAudio();
    bindSeek();
    bindReveals();
    bindMiniPlayer();
    document.getElementById("open-btn").addEventListener("click", openExperience, { once: true });
  });
})();
