import * as fs from "fs";
import sjcl from "sjcl";

// note obj
var note = {
  keyId: "",
  noteId: "",
  content: "",
  dateCreated: new Date(),
  dateUpdated: new Date(),
  isEncrypted: false,
  title: "",
};

// parse the encrypted json file from the given path
export function parse(path) {
  const notesWithKey = [];
  var subsetNotesWithKey = [];

  const data = fs.readFileSync(path, { encoding: "utf8", flag: "r" });

  // parse JSON with reviver
  var encryptedNotes = JSON.parse(data, (key, value) => {
    // build note object
    note[key] = value;

    if (key.startsWith("-")) {
      // get current note id
      note.noteId = key;
      subsetNotesWithKey.push(note);

      // clear note object
      note = {
        keyId: "",
        noteId: "",
        content: "",
        dateCreated: new Date(),
        dateUpdated: new Date(),
        isEncrypted: false,
        title: "",
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

// decrypts the provided notes, returns decrypted notes
export function decrypt(notes) {
  var title = "";
  var content = "";
  const decryptedNotes = [];

  notes.forEach((note) => {
    if (note.isEncrypted === true) {
      title = sjcl.decrypt(note.keyId, note.title);
      content = sjcl.decrypt(note.keyId, note.content);
    } else {
      title = note.title;
      content = note.content;
    }
    decryptedNotes.push({
      keyId: note.keyId,
      noteId: note.noteId,
      content: content,
      dateCreated: note.dateCreated,
      dateUpdated: note.dateUpdated,
      isEncrypted: note.isEncrypted,
      title: title,
    });
    console.log(note.noteId);
    console.log(title);
    console.log(content);
  });

  return { decryptedNotes };
}
