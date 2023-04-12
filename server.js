const express = require('express');
const path = require('path');
// const api = require('./routes/index.js');

const PORT = process.env.PORT || 3001;

const app = express();

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

// GET Route for homepage
app.get('/notes', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/notes.html'))
);

// GET Route for feedback page
app.get('/api/notes', (req, res) =>
    res.sendFile(path.join(__dirname, '/db/db.json'))
);

// Wildcard route to direct users to a index.html page
app.get('*', (req, res) =>
    res.sendFile(path.join(__dirname, 'public/index.html'))
);

app.post("/api/notes", function (req, res) {
    let existingNotes = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
    let newNote = req.body;
    let newID = existingNotes.length.toString();
    newNote.id = newID;
    existingNotes.push(newNote);
    fs.writeFileSync("./db/db.json", JSON.stringify(existingNotes));
    res.json(existingNotes);
  
});
  

app.listen(PORT, () =>
    console.log(`App listening at http://localhost:${PORT} 🚀`)
);
