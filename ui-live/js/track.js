var width = window.innerWidth/2,
    height = width-50;

var track_svg = d3.select("#track")
    .append("svg")
    .attr("height", height)
    .attr("width", width)
    .append("g")
    .attr("transform", "translate(" + width/2 + "," + height/2+ ")");

// Below was produced using this code example: https://bl.ocks.org/basilesimon/f164aec5758d16d51d248e41af5428e4

var x = d3.scaleLinear().domain([0, 10]).range([0, width/2]);
var y = d3.scaleLinear().domain([0, 10]).range([10, height/2 - 10]);

var line = d3.line()
    .x(function(d) {return x(Math.abs(d.x)*Math.sign(d.x));})
    .y(function(d) {return y(Math.abs(d.y)*Math.sign(d.y));})
    .curve(d3.curveNatural)
var data =[{
  x:0,
  y:0
}];
var totalLength = 1;
var path = track_svg.append("path")
    .attr("d", line(data))
    .attr("stroke", "black")
    .attr("stroke-width", "2")
    .attr("fill", "none");

var lastTrack = {
  x:0,
  y:0
}

let extend = (n) => {
  totalLength = totalLength + 1;
  tr = {
    tx: x(Math.abs(n.x)*Math.sign(-n.x)),
    ty: y(Math.abs(n.y)*Math.sign(-n.y))
  };
  data.push(n);
  path
    .transition()
    .duration(500)
    .attr("d", line(data))
    .attr("transform","translate("+tr.tx+", "+tr.ty+")")
    .on("end",()=>{
      console.log(tr);
    
    })
}



    
