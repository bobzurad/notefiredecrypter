import { expect, test } from 'vitest'
import { decrypter, sum } from "./decrypter.js";

test("adds 1 + 2 to equal 3", () => {
  expect(sum(1, 2)).toBe(3);
});

test("decrypts notes", () => {
  expect(decrypter("./input/encrypted.test.json"));
});