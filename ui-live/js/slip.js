var width = window.innerWidth/4,
    height = width/2,
    radius = Math.max(width, height) /4;

var slip_svg = d3v5.select("#slip").append("svg").attr("height", height).attr("width", width)
    .append("g")
  .attr("transform", "translate(" + width / 2 + "," + height/1.2+ ")");

var scale = d3.scaleLinear()
    .range([-width*0.7, width*0.7])
    .domain([-30,31]);

var bottomAxis = d3.axisBottom(scale).tickValues([-30,-25, -20, -15, -10, -5, 0, 5, 10,15,20,25,30]);

slip_svg.append("g")
        .attr("class", "x axis")
        .call(bottomAxis); // Create an axis component with d3.axisBottom

var bar = slip_svg.append("rect")
    .attr("x",scale(0)-4)
    .attr("y",-50)
    .attr("width",8)
    .attr("height",50);

function updateBar(ang){
    wd = Math.abs(ang) + 8;
    if (Math.abs(ang) >20){
        ang = 20;
    }
    cl = Math.min(Math.abs(ang)/30, 1);
    bar.transition()
        .duration(200)
        .attr("x", scale(ang) - wd/2)
        .attr("width",wd)
        .style("fill",d3.interpolateRgb("blue","red")(cl));
}

setInterval(() => {
    //updateBar((Math.random()-0.5)*30);
}, 1000);
