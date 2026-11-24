
import test from "node:test";
import assert from "node:assert/strict";

import {
  MOOD_CONFIGS,
  getMoodConfig,
  getAvailableMoods
} from "../src/moods/palettes.js";

test("all six moods are available", () => {
  assert.equal(getAvailableMoods().length, 6);
});

test("happy mood returns correct configuration", () => {
  const mood = getMoodConfig("happy");

  assert.equal(mood.name, "Happy");
  assert.equal(mood.algorithm, "circles");
});

test("mood lookup is case insensitive", () => {
  assert.equal(
    getMoodConfig("HAPPY").name,
    "Happy"
  );
});

test("every mood has a valid colour palette", () => {
  for (const mood of getAvailableMoods()) {
    const config = getMoodConfig(mood);

    assert.ok(config.colors.length >= 3);

    for (const color of config.colors) {
      assert.match(color, /^#[0-9A-Fa-f]{6}$/);
    }
  }
});

test("unknown moods are rejected", () => {
  assert.throws(
    () => getMoodConfig("bored"),
    RangeError
  );
});

test("empty mood names are rejected", () => {
  assert.throws(
    () => getMoodConfig(""),
    TypeError
  );
});

test("mood configurations cannot be reassigned", () => {
  assert.ok(Object.isFrozen(MOOD_CONFIGS));
});
