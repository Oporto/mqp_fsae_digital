const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const {Firestore} = require('@google-cloud/firestore');
const stream = require('stream');
// Create a new client
const firestore = new Firestore();

const port = process.env.PORT || 8080;

var out_stream = new stream.Readable({
  read(){}
});

const fillstream = setTimeout(() => {
  if(out_stream.readableLength === 0){
      out_stream.push({empty:0});
  }
}, 200);

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
    let data = {empty:0};
    out_stream.push(data);
    res.send("ok");
})

app.get('/processed_slice', (req, res) => {
  out_stream.on('end', () => res.end());
  out_stream.pipe(res);
})

app.listen(port, () => {
  console.log('Data logger listening on port', port);
});