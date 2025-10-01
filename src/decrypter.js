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

export function parse(path) {
  const data = fs.readFileSync(path, { encoding: "utf8", flag: "r" });

  // parse JSON with reviver
  var encryptedNotes = JSON.parse(data, (key, value) => {
    //
    // get currentNoteId
    if (key.startsWith("-")) {
      currentNoteId = key;
      noteIds.push(key);
      notes.push(note);

      // clear note object
      note = {
        content: "",
        dateCreated: new Date(),
        dateUpdated: new Date(),
        isEncrypted: false,
        title: "",
      };
    }
    // build note object
    note[key] = value;
  });
  return { noteIds, notes };
}

export function decrypt(notes) {
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
