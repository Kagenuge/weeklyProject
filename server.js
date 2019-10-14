const http = require('http');
const express = require('express');
const app = express();
const fs = require('fs');
const cors = require('cors')
const bodyParser = require('body-parser');
const parser = bodyParser.urlencoded({ extended: true });
const router = express.Router();
app.use(bodyParser.json());
app.use(cors());
app.use('/', express.static('public'));

var entries = [];

app.get('/api/topics', parser, function (req, res) {
  try {
    var updtEntr = fs.readFileSync('./material.json')
    entries = JSON.parse(updtEntr);
    res.send(updtEntr)
  } catch {
    entries = [];
    res.send('Could not find any entries on initial load')
    console.log('Could not find any entries on initial load')
  }
})

app.post('/api/topics', parser, function (req, res) {
  console.log('POST request received')
  try {
    var updtEntr = fs.readFileSync('./material.json')
    entries = JSON.parse(updtEntr);
  } catch {
    entries = [];
    console.log('No pre-existing data!')
  }

  let i = Object.keys(entries).length;
  req.body.id = i + 1;
  i++;
  const data = req.body
  entries.push(data)

  var entrJson = JSON.stringify(entries)

  fs.writeFileSync('./material.json', entrJson, function (err) {
    if (err) throw err;
  });

  var updtEntr2 = fs.readFileSync('./material.json')
  entries = JSON.parse(updtEntr2);
  res.send(entries)
  console.log('I updated material.json with a new entry');
  console.log('I updated {entries} -object with new data!');
})

var server = app.listen(3000, function () {
  var host = server.address().address
  var port = server.address().port
  console.log('Now listening at http://%s:%s', host, port)
})