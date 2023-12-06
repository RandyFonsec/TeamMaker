const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');
const cors = require('cors'); // Importar cors

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors()); // Usar cors middleware

// Nombre de tu archivo de base de datos SQLite
const dbFileName = 'team.db';

// Comprobar si el archivo de base de datos existe
const dbExists = fs.existsSync(dbFileName);

// Crear conexión a la base de datos
const db = new sqlite3.Database(dbFileName);

app.get('/usuarios', (req, res) => {
  const sql = 'SELECT * FROM usuarios';
  db.all(sql, [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
});

app.post('/usuarios', (req, res) => {
  const { nombre } = req.body;

  if (!nombre) {
    return res.status(400).json({ error: 'El nombre es un campo obligatorio' });
  }

  const sql = 'INSERT INTO usuarios (nombre) VALUES (?)';
  db.run(sql, [nombre], function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    const nuevoUsuario = {
      id: this.lastID,
      nombre: nombre
    };

    res.status(201).json(nuevoUsuario);
  });
});

app.listen(port, () => {
  console.log(`Servidor iniciado en http://localhost:${port}`);
});
