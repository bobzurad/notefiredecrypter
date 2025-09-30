import { expect, expectTypeOf, test } from "vitest";
import { decrypter, sum } from "./decrypter.js";

test("adds 1 + 2 to equal 3", () => {
  expect(sum(1, 2)).toBe(3);
});

test("decrypts notes", async () => {
  var subject = await decrypter("./input/encrypted.test.json");
  expectTypeOf(subject).toBeObject();
  expect(subject.noteIds.length).toBe(10);
  expect(subject.notes.length).toBe(10);
});
