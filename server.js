const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

const db = new sqlite3.Database('love_contents.db', (err) => {
  if (err) {
    console.error('Error opening database:', err.message);
  } else {
    db.run(`CREATE TABLE IF NOT EXISTS contents (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      imageUrl TEXT,
      paragraph TEXT,
      sectionId TEXT
    )`);
  }
});

app.post('/api/contents', (req, res) => {
  const { imageUrl, paragraph, sectionId } = req.body;
  db.run('INSERT INTO contents (imageUrl, paragraph, sectionId) VALUES (?, ?, ?)', [imageUrl, paragraph, sectionId], function(err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ id: this.lastID, imageUrl, paragraph, sectionId });
  });
});

app.get('/api/contents', (req, res) => {
  db.all('SELECT * FROM contents', [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});