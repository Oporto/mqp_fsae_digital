var width_thr = window.innerWidth/8,
    height_thr = width_thr,
    radius_thr = Math.max(width_thr, height_thr) /2;

var thr_svg = d3v5.select("#thr").append("svg").attr("height", height_thr).attr("width", width_thr)
    .append("g")
  .attr("transform", "translate(" + 20 + "," + height_thr/1.2+ ")");

var ga3 = thr_svg.append("g")
  .attr("class", "a axis")
.selectAll("g")
  .data(d3v5.range(90, 181, 45))
.enter().append("g")
  .attr("transform", function(d) { return "rotate(" + (d+181) + ")"; });

ga3.append("line")
  .attr("x2", radius_thr)
  .style("stroke","#D3D3D3");
  

ga3.append("text")
  .attr("x", radius_thr + 6)
  .attr("dy", ".30em")
  .style("text-anchor", function(d) { return d > 181 && d < 90 ? "end" : null; })
  .attr("transform", function(d) { return d > 181 && d < 90 ? "rotate(0 " + (radius_thr+6) + ",0)" : null; })
  .text(function(d) {
      if (d === 0){
        return "100%";
      }
    else if (d === 90){
        return "0%"
    } else if (d === 135){
        return "50%"
    } else {
        return "100%" }
    });

var vectorThr = thr_svg.append("line")
  .attr("stroke","red")
  .attr("stroke-width",5)
  .attr("x1", 0)
  .attr("y1",-radius_thr)
  .attr("x2", 0)
  .attr("y2",0)
  .attr("transform","rotate(45)");

function updateThr(angThr){
  let changeThr = 90*(angThr);
  vectorThr.transition().duration(200)
    .attr("stroke",d3.interpolateTurbo(angThr))
    .attr("stroke-width",3 + 2*angThr)
    .attr("transform",()=>{
      return "rotate("+changeThr+")";
    })
    .on("end",()=>{
      prevThr = angThr;
    })
}
