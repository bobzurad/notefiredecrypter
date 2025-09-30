import * as fs from "fs";
import sjcl from "sjcl";

var note = {
  content: "",
  dateCreated: new Date(),
  dateUpdated: new Date(),
  isEncrypted: false,
  title: "",
};
var noteId = "";

export function decrypter(path) {
  // read file
  fs.readFile(path, callback);

  // callback for reading file
  function callback(err, data) {
    if (err) throw err;

    // parse JSON with reviver
    var encryptedNotes = JSON.parse(data, (key, value) => {
      // get noteId
      if (key.startsWith("-")) {
        noteId = key;
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
          decryptNote(key, noteId, note);
        } else {
          console.log(noteId);
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
  }

  // decrypts the note with the given key
  function decryptNote(key, noteId, note) {
    var title = sjcl.decrypt(key, note.title);
    var content = sjcl.decrypt(key, note.content);
    console.log(noteId);
    console.log(title);
    console.log(content);
  }
}

export function sum(a, b) {
  return a + b;
}
