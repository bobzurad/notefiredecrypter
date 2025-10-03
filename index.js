import { parse, decrypt } from "./src/decrypter.js";

// path of file to decrypt is passed in as runtime arg
const path = process.argv.slice(2)[0];

// parse the notes
const { notes } = parse(path);

// decrypt the notes
decrypt(path, notes);
