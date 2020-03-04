const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const {Firestore} = require('@google-cloud/firestore');
var compression = require('compression');
// Create a new client
const firestore = new Firestore();

const port = process.env.PORT || 8080;

var data = {hey: 0};

var tpoints =  [
  {x: -3, y: -3, z:0},
  {x: -2, y: -3, z:0},
  {x: -1, y: -3, z:0},
  {x: 0, y: -3, z:0},
  {x: 1, y: -3, z:0},
  {x: 2, y: -3, z:0},
  {x: -3, y: -2, z:0},
  {x: -2, y: -2, z:0},
  {x: -1, y: -2, z:0},
  {x: 0, y: -2, z:0},
  {x: 1, y: -2, z:0},
  {x: 2, y: -2, z:0},
  {x: -3, y: -1, z:0},
  {x: -2, y: -1, z:0},
  {x: -1, y: -1, z:0},
  {x: 0, y: -1, z:0},
  {x: 1, y: -1, z:0},
  {x: 2, y: -1, z:0},
  {x: -3, y: 0, z:0},
  {x: -2, y: 0, z:0},
  {x: -1, y: 0, z:0},
  {x: 0, y: 0, z:0},
  {x: 1, y: 0, z:0},
  {x: 2, y: 0, z:0},
  {x: -3, y: 1, z:0},
  {x: -2, y: 1, z:0},
  {x: -1, y: 1, z:0},
  {x: 0, y: 1, z:0},
  {x: 1, y: 1, z:0},
  {x: 2, y: 1, z:0},
  {x: -3, y: 2, z:0},
  {x: -2, y: 2, z:0},
  {x: -1, y: 2, z:0},
  {x: 0, y: 2, z:0},
  {x: 1, y: 2, z:0},
  {x: 2, y: 2, z:0}
];

app.use(compression());

app.use(bodyParser.json()); // for parsing application/json

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/', (req, res) => {
    console.log('received a request.');
  
    const target = process.env.TARGET || 'Pi';
    res.send(`Hello ${target}!`);
});

app.post('/reading_slice', (req, res) =>{
    console.log(req.body);// req data
    //TODO: parse string into data points
    //TODO: store in datastore
    data = {empty:0};
    res.send("ok");
})

app.get('/processed_slice', (req, res) => {
  let t = [(Math.random()-0.5)*10, (Math.random()-0.5)*10];
  let tps = [];
  tpoints.forEach(p =>{
    zP = p.x*-1*Math.sin(t[0]*Math.PI/180);
    nz = 5*(zP*Math.cos(t[1]*Math.PI/180) + p.y*Math.sin(t[1]*Math.PI/180));
    tps.push({x:p.x, y:p.y, z:nz.toFixed(3)})
  })
  data = {
    gx: (Math.random()-0.5)*3,
    gy: (Math.random()-0.5)*3,
    str:(Math.random()-0.5)*90,
    slip: (Math.random()-0.5)*30,
    tilt: t,
    tpoints: tps
  };
  res.write(JSON.stringify(data));
  res.end();
})

app.listen(port, () => {
  console.log('Data logger listening on port', port);
});