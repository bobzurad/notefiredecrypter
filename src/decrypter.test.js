import { expect, expectTypeOf, test } from "vitest";
import { parse, decrypt, sum } from "./decrypter.js";

test("verify notes are parsed correctly", () => {
  var subject = parse("./input/encrypted.test.json");
  expectTypeOf(subject).toBeObject();
  expect(subject.notes.length).toBe(10);
  expect(subject.notes[0].keyId).toBe("CLCLkXuYPzfk7zhR1VYQdidHXnM2");
  expect(subject.notes[0].title).toBe(
    '{"iv":"vWgbQ/O7EP9nGDCFSN3n9g==","v":1,"iter":1000,"ks":128,"ts":64,"mode":"ccm","adata":"","cipher":"aes","salt":"rWKXtaliTkI=","ct":"uOFo2BqtSuZMarMw+Vw9syb67XH0WFcJ"}'
  );
  expect(subject.notes[1].keyId).toBe("dg3WvgoEskPVBisfDNwbbHEQrjP2");
  expect(subject.notes[1].title).toBe(
    '{"iv":"V0eCFTo2wN3m0FrvQb+cuA==","v":1,"iter":1000,"ks":128,"ts":64,"mode":"ccm","adata":"","cipher":"aes","salt":"/JIe1Hi0kXw=","ct":"op3zZu9INIBMdNM/Bw=="}'
  );
  expect(subject.notes[2].keyId).toBe("dg3WvgoEskPVBisfDNwbbHEQrjP2");
  expect(subject.notes[2].title).toBe(
    '{"iv":"DsoJYHtg6REeDtsJm6UHgQ==","v":1,"iter":1000,"ks":128,"ts":64,"mode":"ccm","adata":"","cipher":"aes","salt":"/JIe1Hi0kXw=","ct":"7mGrxqsysKLqVJXpH0rqQ52JwlYXbdR0t82VoKA="}'
  );
  expect(subject.notes[3].keyId).toBe("dg3WvgoEskPVBisfDNwbbHEQrjP2");
  expect(subject.notes[3].title).toBe(
    '{"iv":"m9xlghiMz2VxabKimJTUvQ==","v":1,"iter":1000,"ks":128,"ts":64,"mode":"ccm","adata":"","cipher":"aes","salt":"/JIe1Hi0kXw=","ct":"HK4K6DGKB8mvSp3FMTOjxTqi7jc="}'
  );
  expect(subject.notes[4].keyId).toBe("YXTZD7k6aohmijBwZdrt1TERyHH3");
  expect(subject.notes[4].title).toBe("Your First Note!");
  expect(subject.notes[5].keyId).toBe("YXTZD7k6aohmijBwZdrt1TERyHH3");
  expect(subject.notes[5].title).toBe("Bob");
  expect(subject.notes[6].keyId).toBe("YXTZD7k6aohmijBwZdrt1TERyHH3");
  expect(subject.notes[6].title).toBe("Bob222");
  expect(subject.notes[7].keyId).toBe("public");
  expect(subject.notes[7].title).toBe("First Note!");
  expect(subject.notes[8].keyId).toBe("public");
  expect(subject.notes[8].title).toBe("Second Note!");
  expect(subject.notes[9].keyId).toBe("public");
  expect(subject.notes[9].title).toBe("SAMUEL L. IPSUM");
});
