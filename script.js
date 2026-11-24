
const canvas = document.getElementById("artCanvas");
const ctx = canvas.getContext("2d");

const moodButtons = document.querySelectorAll(".mood");
const intensitySlider = document.getElementById("intensity");
const intensityValue = document.getElementById("intensityValue");
const generateBtn = document.getElementById("generateBtn");
const randomBtn = document.getElementById("randomBtn");
const favoriteBtn = document.getElementById("favoriteBtn");
const downloadBtn = document.getElementById("downloadBtn");
const galleryGrid = document.getElementById("galleryGrid");

let currentMood = "happy";
let currentTitle = "";
let currentSubtitle = "";
let favorites = [];

try {
  favorites = JSON.parse(localStorage.getItem("moodscape-favorites")) || [];
  if (!Array.isArray(favorites)) favorites = [];
} catch {
  favorites = [];
}

const moods = {
  happy: {
    colors: ["#FF754C", "#FFD66B", "#F9A8C9", "#FFB18A", "#FFE8A3"],
    titles: ["Sunshine in a Daydream", "A Pocket Full of Joy", "Good Things Bloom", "Sunday in Colour"],
    subtitle: "A little piece of happy."
  },
  calm: {
    colors: ["#6EC6C5", "#B3E5D5", "#8BA8D8", "#D3E7E0", "#A8C8DF"],
    titles: ["Somewhere Between Waves", "Quiet Blue", "The Art of Slowing Down", "Soft Horizons"],
    subtitle: "Let everything flow."
  },
  chaotic: {
    colors: ["#FF4F79", "#7B4DFF", "#FFC857", "#38BDF8", "#FF784F"],
    titles: ["Beautifully Unpredictable", "A Happy Little Mess", "Electric Thoughts", "Chaos Theory"],
    subtitle: "Rules are overrated."
  },
  nostalgic: {
    colors: ["#CB7654", "#E6B66B", "#F0D6A0", "#9D7660", "#D58B78"],
    titles: ["Postcards from Yesterday", "Golden Hour Memories", "A Place I Once Knew", "Old Film, New Feelings"],
    subtitle: "A memory in another colour."
  },
  focused: {
    colors: ["#344C72", "#6085A8", "#E8B65D", "#9BB5B4", "#F2DDA5"],
    titles: ["The Bigger Picture", "Finding the Centre", "One Thing at a Time", "Clear Intentions"],
    subtitle: "Everything in its place."
  },
  anxious: {
    colors: ["#B9A0D5", "#F18D9E", "#647D9B", "#E8B6B0", "#D8C8E8"],
    titles: ["A Thousand Little Thoughts", "Somewhere in Between", "The Noise Inside", "Learning to Breathe"],
    subtitle: "It's okay to feel it all."
  }
};

const random = (min, max) => Math.random() * (max - min) + min;

function pick(array) {
  return array[Math.floor(Math.random() * array.length)];
}

function polygon(points, color) {
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.moveTo(points[0].x, points[0].y);
  points.slice(1).forEach(p => ctx.lineTo(p.x, p.y));
  ctx.closePath();
  ctx.fill();
}

function drawBackground(colors) {
  const gradient = ctx.createLinearGradient(0, 0, 1200, 800);
  gradient.addColorStop(0, colors[0]);
  gradient.addColorStop(1, colors[1]);

  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 1200, 800);
}

function drawCircles(colors, amount, intensity) {
  for (let i = 0; i < amount; i++) {
    const radius = random(30, 100 + intensity * 2);
    const x = random(-50, 1250);
    const y = random(-50, 850);

    ctx.globalAlpha = random(0.35, 0.85);
    ctx.fillStyle = pick(colors);
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.globalAlpha = 1;
}

function drawWaves(colors, amount, intensity) {
  for (let i = 0; i < amount; i++) {
    ctx.beginPath();
    const y = random(0, 800);
    const amplitude = random(15, 70 + intensity);
    const frequency = random(0.003, 0.012);

    ctx.moveTo(0, y);

    for (let x = 0; x <= 1200; x += 10) {
      const waveY = y + Math.sin(x * frequency + i) * amplitude;
      ctx.lineTo(x, waveY);
    }

    ctx.strokeStyle = pick(colors);
    ctx.lineWidth = random(5, 25);
    ctx.globalAlpha = random(0.3, 0.8);
    ctx.stroke();
  }
  ctx.globalAlpha = 1;
}

function drawBlobs(colors, amount) {
  for (let i = 0; i < amount; i++) {
    const x = random(0, 1200);
    const y = random(0, 800);
    const size = random(60, 200);

    ctx.fillStyle = pick(colors);
    ctx.globalAlpha = random(0.35, 0.8);

    ctx.beginPath();
    ctx.moveTo(x, y);

    for (let j = 0; j < 6; j++) {
      const angle = (j / 6) * Math.PI * 2;
      const radius = size * random(0.65, 1.2);

      ctx.lineTo(
        x + Math.cos(angle) * radius,
        y + Math.sin(angle) * radius
      );
    }

    ctx.closePath();
    ctx.fill();
  }
  ctx.globalAlpha = 1;
}

function drawGeometry(colors, amount, intensity) {
  for (let i = 0; i < amount; i++) {
    const x = random(0, 1200);
    const y = random(0, 800);
    const size = random(20, 100 + intensity);

    ctx.fillStyle = pick(colors);
    ctx.globalAlpha = random(0.4, 0.9);

    polygon([
      { x, y: y - size },
      { x: x + size, y: y + size },
      { x: x - size, y: y + size }
    ], pick(colors));

    ctx.beginPath();
    ctx.arc(x, y, size * 0.35, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.globalAlpha = 1;
}

function drawLines(colors, amount, intensity) {
  for (let i = 0; i < amount; i++) {
    const x = random(0, 1200);
    const y = random(0, 800);

    ctx.strokeStyle = pick(colors);
    ctx.lineWidth = random(1, 5 + intensity / 20);
    ctx.globalAlpha = random(0.2, 0.75);

    ctx.beginPath();
    ctx.moveTo(x, y);

    for (let j = 0; j < 6; j++) {
      ctx.lineTo(
        x + random(-120, 120),
        y + random(-120, 120)
      );
    }

    ctx.stroke();
  }
  ctx.globalAlpha = 1;
}

function drawGrain() {
  ctx.save();
  ctx.globalAlpha = 0.12;
  ctx.fillStyle = "#FFFFFF";

  for (let i = 0; i < 1800; i++) {
    ctx.fillRect(random(0, 1200), random(0, 800), 2, 2);
  }

  ctx.restore();
}

function generateArt() {
  const mood = moods[currentMood];
  const intensity = Number(intensitySlider.value);
  const colors = mood.colors;
  const amount = Math.floor(10 + intensity * 0.55);

  ctx.clearRect(0, 0, 1200, 800);
  drawBackground(colors);

  switch (currentMood) {
    case "happy":
      drawCircles(colors, amount, intensity);
      drawBlobs(colors, Math.floor(amount / 5));
      break;

    case "calm":
      drawWaves(colors, Math.floor(amount / 3), intensity);
      drawCircles(colors, Math.floor(amount / 3), intensity);
      break;

    case "chaotic":
      drawLines(colors, amount * 2, intensity);
      drawGeometry(colors, amount, intensity);
      drawCircles(colors, Math.floor(amount / 2), intensity);
      break;

    case "nostalgic":
      drawBlobs(colors, amount);
      drawCircles(colors, Math.floor(amount / 2), intensity);
      drawWaves(colors, Math.floor(amount / 5), intensity);
      break;

    case "focused":
      drawGeometry(colors, amount, intensity);
      drawCircles(colors, Math.floor(amount / 2), intensity);
      break;

    case "anxious":
      drawLines(colors, amount * 2, intensity);
      drawWaves(colors, Math.floor(amount / 3), intensity);
      break;
  }

  drawGrain();

  currentTitle = pick(mood.titles);
  currentSubtitle = mood.subtitle;

  document.getElementById("artTitle").textContent = currentTitle;
  document.getElementById("artSubtitle").textContent =
    `${currentSubtitle} Intensity: ${intensity}%.`;

  updateFavoriteButton();
}

function updateFavoriteButton() {
  const exists = favorites.some(
    item => item.title === currentTitle &&
    item.image === canvas.toDataURL("image/jpeg", 0.85)
  );

  favoriteBtn.textContent = exists ? "♥" : "♡";
  favoriteBtn.classList.toggle("saved", exists);
}

function downloadArt() {
  const link = document.createElement("a");
  link.download = `moodscape-${currentMood}.png`;
  link.href = canvas.toDataURL("image/png");
  link.click();
}

function saveFavorite() {
  const image = canvas.toDataURL("image/jpeg", 0.85);

  const exists = favorites.some(item => item.image === image);

  if (exists) {
    favorites = favorites.filter(item => item.image !== image);
  } else {
    favorites.unshift({
      title: currentTitle,
      mood: currentMood,
      image,
      date: new Date().toLocaleDateString()
    });

    favorites = favorites.slice(0, 12);
  }

  try {
    localStorage.setItem("moodscape-favorites", JSON.stringify(favorites));
  } catch (error) {
    alert("Your browser storage is full. Remove some saved artworks.");
    return;
  }

  renderGallery();
  updateFavoriteButton();
}

function renderGallery() {
  document.getElementById("galleryCount").textContent =
    `${favorites.length} SAVED`;

  if (!favorites.length) {
    galleryGrid.innerHTML =
      '<div class="empty-gallery">Your gallery is waiting for a little magic. ✨</div>';
    return;
  }

  galleryGrid.innerHTML = "";

  favorites.forEach((item, index) => {
    const card = document.createElement("article");
    card.className = "gallery-card";

    const img = document.createElement("img");
    img.src = item.image;
    img.alt = `${item.mood} artwork: ${item.title}`;
    img.addEventListener("click", () => {
      currentMood = item.mood;
      moodButtons.forEach(btn => {
        btn.classList.toggle("active", btn.dataset.mood === currentMood);
      });
      document.getElementById("artTitle").textContent = item.title;
      document.getElementById("artSubtitle").textContent =
        `Saved ${item.date} · ${item.mood}`;
      const image = new Image();
      image.onload = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
        updateFavoriteButton();
      };
      image.src = item.image;
    });

    const info = document.createElement("div");
    info.className = "gallery-card-info";

    const title = document.createElement("strong");
    title.textContent = item.title;

    const remove = document.createElement("button");
    remove.textContent = "Remove ×";
    remove.addEventListener("click", () => {
      favorites.splice(index, 1);
      localStorage.setItem("moodscape-favorites", JSON.stringify(favorites));
      renderGallery();
      updateFavoriteButton();
    });

    info.append(title, remove);
    card.append(img, info);
    galleryGrid.appendChild(card);
  });
}

// Mood selection
moodButtons.forEach(button => {
  button.addEventListener("click", () => {
    currentMood = button.dataset.mood;

    moodButtons.forEach(btn => btn.classList.remove("active"));
    button.classList.add("active");

    generateArt();
  });
});

// Intensity control
intensitySlider.addEventListener("input", () => {
  intensityValue.textContent = `${intensitySlider.value}%`;
});

// Generate new artwork
generateBtn.addEventListener("click", generateArt);

// Surprise me
randomBtn.addEventListener("click", () => {
  currentMood = pick(Object.keys(moods));

  moodButtons.forEach(btn => {
    btn.classList.toggle("active", btn.dataset.mood === currentMood);
  });

  intensitySlider.value = Math.floor(random(20, 101));
  intensityValue.textContent = `${intensitySlider.value}%`;

  generateArt();
});

// Save and download
favoriteBtn.addEventListener("click", saveFavorite);
downloadBtn.addEventListener("click", downloadArt);

// Initial artwork
generateArt();
renderGallery();
