import * as fs from "fs";
import sjcl from "sjcl";

// note obj
var note = {
  keyId: "",
  content: "",
  dateCreated: new Date(),
  dateUpdated: new Date(),
  isEncrypted: false,
  title: "",
};

var currentNoteId = "";

export function parse(path) {
  var notesWithKey = [];
  var subsetNotesWithKey = [];

  const data = fs.readFileSync(path, { encoding: "utf8", flag: "r" });

  // parse JSON with reviver
  var encryptedNotes = JSON.parse(data, (key, value) => {
    // build note object
    note[key] = value;

    // get currentNoteId
    if (key.startsWith("-")) {
      currentNoteId = key;
      subsetNotesWithKey.push(note);

      // clear note object
      note = {
        content: "",
        dateCreated: new Date(),
        dateUpdated: new Date(),
        isEncrypted: false,
        title: "",
        keyId: "",
      };
    }

    if (
      key !== "id" &&
      key !== "notes" &&
      key !== "content" &&
      key !== "dateCreated" &&
      key !== "dateUpdated" &&
      key !== "isEncrypted" &&
      key !== "title" &&
      !key.startsWith("-")
    ) {
      // all notes of this key have been parsed
      subsetNotesWithKey.forEach((n) => {
        n.keyId = key;
      });
      notesWithKey.push(subsetNotesWithKey);
      //clear subset array
      subsetNotesWithKey = [];
    }
  });
  return { notes: notesWithKey.flat() };
}

export function decrypt(notes) {
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
