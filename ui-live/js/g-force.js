var width = window.innerWidth/4,
    height = width,
    radius = Math.min(width, height) / 2 - 40;

var r = d3v5.scaleLinear()
    .domain([0, .5])
    .range([radius*1.2, 0]);

var g_svg = d3v5.select("#g").append("svg").attr("height", height).attr("width", height)
    .append("g")
  .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

var gr = g_svg.append("g")
    .attr("class", "r axis")
  .selectAll("g")
    .data(r.ticks(5).slice(1))
  .enter().append("g");

gr.append("circle")
    .attr("r", r)
    .attr("stroke","white")
    .style("fill", "#D3D3D3");


var ga = g_svg.append("g")
    .attr("class", "a axis")
  .selectAll("g")
    .data(d3v5.range(0, 360, 30))
  .enter().append("g")
    .attr("transform", function(d) { return "rotate(" + -d + ")"; });

ga.append("line")
    .attr("x2", radius)
    .style("stroke","white");

ga.append("text")
    .attr("x", radius + 6)
    .attr("dy", ".35em")
    .style("text-anchor", function(d) { return d < 270 && d > 90 ? "end" : null; })
    .attr("transform", function(d) { return d < 270 && d > 90 ? "rotate(180 " + (radius + 6) + ",0)" : null; })
    .text(function(d) { return d + "°"; });

var dot = g_svg.append("circle")
        .attr('r', 5)
        .style("fill","red");

var vectorG = g_svg.append("line")
        .attr("x1",0)
        .attr("y1",0)
        .attr("stroke","red");

var gtext = g_svg.append("text")
        .text("0g");

function updateGForce(gx, gy){
  let rx = radius*gx/4;
  let ry = -radius*gy/4;
  let mag = Math.sqrt(Math.pow(gx, 2) + Math.pow(gy, 2));
  let angle = Math.atan2(gy, gx) * 180 / Math.PI;

  vectorG.transition().duration(10)
    .style("opacity",0)
    .on("end", () =>{
      vectorG.attr("x2",rx).attr("y2",ry);
    });
  gtext.style("opacity",0);
  dot.transition().duration(200)
      .attr("cx",rx)
      .attr("cy",ry)
      .attr("r",4 + mag)
      .style("fill",d3.interpolateViridis(mag/3))
      .on("end",() => {
          vectorG.style("opacity",1);
          gtext.style("opacity",1).text(()=>{
              return mag.toFixed(2) + "g @ " + Math.round(angle) + "°";
          })
      })
}
updateGForce(0,0);

