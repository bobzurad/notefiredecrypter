import { parse, decrypt } from "./src/decrypter.js";

const { notes } = parse("ignore/encrypted.json");

decrypt(notes);
