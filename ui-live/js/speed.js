var width_speed = window.innerWidth/6,
    height_speed = width_speed/3
    ,
    radius_speed = Math.max(width_speed, height_speed) /4;

var speed_svg = d3v5.select("#speed").append("svg").attr("height", height_speed).attr("width", width_speed)
    .append("g")
  .attr("transform", "translate(" + width_speed / 2 + "," + height_speed/2.4+ ")");

var speedNum = speed_svg.append("text")
    .attr("x", -100)
    .attr("font-weight", 500)
    .style("font-size","45")
    .text("0 MPH")

var prevSp = 0;

function updateSpeed(angSp){
    let changeSpeed = Math.min(angSp/90,1);
    speedNum.transition()
      .duration(200)
      .style("fill",d3.interpolateTurbo(changeSpeed))
      .text((angSp).toFixed(2) + " MPH");
}

