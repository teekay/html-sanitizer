"use strict";

const cleanUpHtml = require('./clean-up-html').cleanedUpHtml;
const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');

app.use(bodyParser.raw({limit: '50mb'}))

app.use(function(req, res, next) {
  var contentType = req.headers['content-type'] || ''
    , mime = contentType.split(';')[0];

  if (mime != 'text/plain') {
    return next();
  }

  var data = '';
  req.setEncoding('utf8');
  req.on('data', function(chunk) {
    data += chunk;
  });
  req.on('end', function() {
    req.rawBody = data;
    next();
  });
});

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post('/html/clean', function (req, res) {
  try {
    if (!req.body) {
//      console.dir(req);
      return res.status(400).end();
    }
    //console.dir(req.rawBody);
    const safeHtml = cleanUpHtml(req.rawBody);    
    return res.status(200).send(safeHtml);

  } catch (e) {
    console.log(e.message);
    return res.status(500).end();
  }
});

app.listen(port, () => {
  console.log(`Example CleanUpHtml app listening at http://localhost:${port}`)
})