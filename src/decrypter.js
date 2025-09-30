import * as fs from "fs";
import sjcl from "sjcl";

// note obj
var note = {
  content: "",
  dateCreated: new Date(),
  dateUpdated: new Date(),
  isEncrypted: false,
  title: "",
};

var currentNoteId = "";
var noteIds = [];
var notes = [];

export function parse(path) {}

export function decrypt(notes) {}

export async function decrypter(path) {
  // read file
  //fs.readFile(path, callback);
  const data = fs.readFileSync(path, { encoding: "utf8", flag: "r" });

  // // callback for reading file
  // async function callback(err, data) {
  //   if (err) throw err;

  // parse JSON with reviver
  var encryptedNotes = await JSON.parse(data, (key, value) => {
    // get currentNoteId
    if (key.startsWith("-")) {
      currentNoteId = key;
      noteIds.push(key);
      notes.push(note);
    }

    // build note object
    note[key] = value;

    // TODO: build a buffer of sibling notes before decrypting (because we don't have key yet)

    // get authId
    if (
      key !== "notes" &&
      key !== "content" &&
      key !== "dateCreated" &&
      key !== "dateUpdated" &&
      key !== "isEncrypted" &&
      key !== "title" &&
      !key.startsWith("-")
    ) {
      // we now have the entire note
      if (note.isEncrypted === true) {
        // key must be the authId
        decryptNote(key, currentNoteId, note);
      } else {
        console.log(currentNoteId);
        console.log(note.title);
        console.log(note.content);
      }
      // clear note object
      note = {
        content: "",
        dateCreated: new Date(),
        dateUpdated: new Date(),
        isEncrypted: false,
        title: "",
      };
    }
  });

  return { noteIds, notes };
}

// decrypts the note with the given key
function decryptNote(key, currentNoteId, note) {
  var title = sjcl.decrypt(key, note.title);
  var content = sjcl.decrypt(key, note.content);
  console.log(currentNoteId);
  console.log(title);
  console.log(content);
}

export function sum(a, b) {
  return a + b;
}
