var width = window.innerWidth/4,
    height = width/2,
    radius = Math.max(width, height) /4;

var str_svg = d3v5.select("#str").append("svg").attr("height", height).attr("width", width)
    .append("g")
  .attr("transform", "translate(" + width / 2 + "," + height/1.2+ ")");

var ga = str_svg.append("g")
  .attr("class", "a axis")
.selectAll("g")
  .data(d3v5.range(0, 181, 30))
.enter().append("g")
  .attr("transform", function(d) { return "rotate(" + -d + ")"; });

ga.append("line")
  .attr("x2", radius)
  .style("stroke","#D3D3D3");

ga.append("text")
  .attr("x", radius + 6)
  .attr("dy", ".35em")
  .style("text-anchor", function(d) { return d < 270 && d > 90 ? "end" : null; })
  .attr("transform", function(d) { return d < 270 && d > 90 ? "rotate(180 " + (radius + 6) + ",0)" : null; })
  .text(function(d) { return d-90 + "°"; });

var vector = str_svg.append("line")
  .attr("stroke","red")
  .attr("stroke-width",5)
  .attr("x1", 0)
  .attr("y1",-radius)
  .attr("x2", 0)
  .attr("y2",0);

var prev = 0;

function updateStr(angS){
    let change = prev-angS;
    vector.transition().duration(200)
        .attr("transform",()=>{
            return "rotate("+change+")";
        }).on("end",()=>{
            prev = angS;
        })
}

setInterval(() => {
  //updateStr((Math.random()-0.5)*90);
}, 1000);