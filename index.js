require("sjcl");

var fs = require("fs");
var encryptedNotes;

var note = {
  content: "",
  dateCreated: new Date(),
  dateUpdated: new Date(),
  isEncrypted: false,
  title: "",
};
var noteId = "";

// read file
fs.readFile("input/encrypted.json", callback);

// callback for reading file
function callback(err, data) {
  if (err) throw err;
  // parse JSON with reviver
  encryptedNotes = JSON.parse(data, (key, value) => {
    // get nodeId
    if (key.startsWith("-")) {
      noteId = key;
    }

    // build note object
    note[key] = value;

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
      // key must be the authId
      decryptNote(note, key);
    }
  });
}

function decryptNote(note, key) {
  console.log(key);
}