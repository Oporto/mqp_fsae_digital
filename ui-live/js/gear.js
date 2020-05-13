var width = window.innerWidth/4,
    height = window.innerHeight;

var gear_svg = d3.select("#gear")
    .append("svg")
    .attr("height", height)
    .attr("width", width);

var first = gear_svg.append("circle")
    .attr("r", 25)
    .attr("cx",width/4)
    .attr("cy",height/8)
    .style("fill","blue")
    .style("opacity", 0.2);

gear_svg.append("text")
    .attr("x", width/4-8)
    .attr("y",height/8+10)
    .style("fill","white")
    .style("font-size", 25)
    .style("font-weight",500)
    .text("1")

var second = gear_svg.append("circle")
    .attr("r", 25)
    .attr("cx",width/4)
    .attr("cy",height/8*2)
    .style("fill","blue")
    .style("opacity", 0.2);

gear_svg.append("text")
    .attr("x", width/4-8)
    .attr("y",height/8*2+10)
    .style("fill","white")
    .style("font-size", 25)
    .style("font-weight",500)
    .text("2")

var third = gear_svg.append("circle")
    .attr("r", 25)
    .attr("cx",width/4)
    .attr("cy",height/8*3)
    .style("fill","blue")
    .style("opacity", 0.2);

gear_svg.append("text")
    .attr("x", width/4-8)
    .attr("y",height/8*3+10)
    .style("fill","white")
    .style("font-size", 25)
    .style("font-weight",500)
    .text("3")

var fourth = gear_svg.append("circle")
    .attr("r", 25)
    .attr("cx",width/4)
    .attr("cy",height/8*4)
    .style("fill","blue")
    .style("opacity", 0.2);

gear_svg.append("text")
    .attr("x", width/4-8)
    .attr("y",height/8*4+10)
    .style("fill","white")
    .style("font-size", 25)
    .style("font-weight",500)
    .text("4")

var park = gear_svg.append("circle")
    .attr("r", 25)
    .attr("cx",width/4)
    .attr("cy",height/8*5)
    .style("fill","red")
    .style("opacity", 0.2);

gear_svg.append("text")
    .attr("x", width/4-8)
    .attr("y",height/8*5+10)
    .style("fill","white")
    .style("font-size", 25)
    .style("font-weight",500)
    .text("P")

var reverse = gear_svg.append("circle")
    .attr("r", 25)
    .attr("cx",width/4)
    .attr("cy",height/8*6)
    .style("fill","black")
    .style("opacity", 0.2);

gear_svg.append("text")
    .attr("x", width/4-8)
    .attr("y",height/8*6+10)
    .style("font-size", 25)
    .style("font-weight",500)
    .style("fill","white")
    .text("R")

var lastGe = 0;
var gears = [first, second, third, fourth, park, reverse];
function updateGear(inputGear) {
    let inGear = gears[inputGear];
    let lastGear = gears[lastGe];
    if (lastGear != inGear){
        lastGear.transition().duration(10)
            .style("opacity",0.2)
        .on("end", () =>{
            inGear.transition()
                .duration(50)
                .style("opacity", 1);
            lastGe = inputGear;
        })
    } 
}

