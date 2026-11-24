
/**
 * MOODSCAPE
 * Mood Configuration & Colour Palettes
 *
 * Defines the visual identity of every supported emotion.
 */

export const MOOD_CONFIGS = Object.freeze({
  happy: {
    name: "Happy",
    description: "Bright, playful and full of energy.",
    algorithm: "circles",
    colors: ["#FF754C", "#FFD66B", "#F9A8C9", "#FFB18A"],
    personality: "playful"
  },

  calm: {
    name: "Calm",
    description: "Soft, flowing and peaceful.",
    algorithm: "waves",
    colors: ["#6EC6C5", "#B3E5D5", "#8BA8D8", "#D3E7E0"],
    personality: "peaceful"
  },

  chaotic: {
    name: "Chaotic",
    description: "Unpredictable, energetic and expressive.",
    algorithm: "geometry",
    colors: ["#FF4F79", "#7B4DFF", "#FFC857", "#38BDF8"],
    personality: "experimental"
  },

  nostalgic: {
    name: "Nostalgic",
    description: "Warm, familiar and reminiscent of memories.",
    algorithm: "blobs",
    colors: ["#CB7654", "#E6B66B", "#F0D6A0", "#9D7660"],
    personality: "dreamy"
  },

  focused: {
    name: "Focused",
    description: "Structured, balanced and intentional.",
    algorithm: "geometry",
    colors: ["#344C72", "#6085A8", "#E8B65D", "#9BB5B4"],
    personality: "structured"
  },

  anxious: {
    name: "Anxious",
    description: "Layered, restless and full of movement.",
    algorithm: "lines",
    colors: ["#B9A0D5", "#F18D9E", "#647D9B", "#E8B6B0"],
    personality: "restless"
  }
});

/**
 * Return the configuration for a particular mood.
 */
export function getMoodConfig(mood) {
  if (typeof mood !== "string" || !mood.trim()) {
    throw new TypeError("Mood must be a non-empty string.");
  }

  const config = MOOD_CONFIGS[mood.toLowerCase()];

  if (!config) {
    throw new RangeError(`Unknown mood: ${mood}`);
  }

  return config;
}

/**
 * Return all available mood names.
 */
export function getAvailableMoods() {
  return Object.keys(MOOD_CONFIGS);
}
