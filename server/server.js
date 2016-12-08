'use strict';

const express = require('express');
const fs = require('fs');
const https = require('https');
const path = require('path');

const app = express();
const directoryToServe = 'client';
const port = 3443;

app.use('/', express.static(path.join(__dirname, '..', directoryToServe)));
console.log("Content Directory = " + path.join(__dirname, '..', directoryToServe));

/*
  Instructions to generate a self signed Certificate can be found at:
  https://devcenter.heroku.com/articles/ssl-certificate-self
  The certificate should be generated in the server/ssl folder
*/

const httpsOptions = {
    cert: fs.readFileSync(path.join(__dirname, 'ssl', 'server.crt')),
    key: fs.readFileSync(path.join(__dirname, 'ssl', 'server.key'))
};

console.log("Certificate = " + httpsOptions.cert);
console.log("Key = " + httpsOptions.key);

https.createServer(httpsOptions, app)
    .listen(port, function() {
        console.log("Serving the " + directoryToServe);
    });