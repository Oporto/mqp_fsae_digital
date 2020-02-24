const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const {Firestore} = require('@google-cloud/firestore');

// Create a new client
const firestore = new Firestore();

const port = process.env.PORT || 8080;

app.use(bodyParser.json()); // for parsing application/json

app.get('/', (req, res) => {
    console.log('received a request.');
  
    const target = process.env.TARGET || 'Pi';
    res.send(`Hello ${target}!`);
});

app.post('/reading_slice', (req, res) =>{
    console.log(req.body);// req data
    //TODO: parse string into data points
    //TODO: store in datastore
    res.send("ok");
})

app.listen(port, () => {
  console.log('Data logger listening on port', port);
});