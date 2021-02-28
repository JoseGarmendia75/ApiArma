const express = require('express');
const mysql = require('mysql');

const bodyParser = require('body-parser');

const PORT = process.env.PORT || 3050;

const app = express();

app.use(bodyParser.json());

// MySql
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'rootpass',
  database: 'node20_mysql'
});

// Route
app.get('/', (req, res) => {
  res.send('Welcome to my API of ARMA - YEAHHH!');
});


// all usuarios del CLAN
app.get('/usuarios', (req, res) => {
  const sql = 'SELECT * FROM usuarios';

  connection.query(sql, (error, results) => {
    if (error) throw error;
    if (results.length > 0) {
      res.json(results);
    } else {
      res.send('Not result');
    }
  });
});

app.get('/usuarios/:id', (req, res) => {
  const { id } = req.params;
  const sql = `SELECT * FROM usuarios WHERE id = ${id}`;
  connection.query(sql, (error, result) => {
    if (error) throw error;

    if (result.length > 0) {
      res.json(result);
    } else {
      res.send('Not result');
    }
  });
});

app.post('/add', (req, res) => {
  const sql = 'INSERT INTO usuarios SET ?';

  const usuarioObj = {
    name: req.body.name
  };

  connection.query(sql, usuarioObj, error => {
    if (error) throw error;
    res.send('Usuario created!');
  });
});

app.post('/addJson', (req, res) => {
  const sql = 'INSERT INTO jsons SET ?';

  const jsonsObj = {
    texto: req.body.texto
  };

  connection.query(sql, jsonObj, error => {
    if (error) throw error;
    res.send('Json Insertado!');
  });
});


// Check connect
connection.connect(error => {
  if (error) throw error;
  console.log('Database server running!');
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
