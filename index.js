import * as fs from "fs";
import decrypter from "./src/decrypter.js";

// path of file to decrypt is passed in as runtime arg
const path = process.argv.slice(2)[0];

// parse the notes
const { notes } = decrypter.parse(path);

// decrypt the notes
const { decryptedNotes } = decrypter.decrypt(notes);

// create output stream
const outputPath = path.substring(0, path.lastIndexOf(".")) + ".decrypted.txt";
const outputStream = fs.createWriteStream(outputPath);

// write out to file
decrypter.write(outputStream, decryptedNotes);
