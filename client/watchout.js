// start slingin' some d3 here

var gameWindow = d3.select('.board')
                   .style('height', '400px')
                   .style('width', '100%')
                   .append('p')

var circle = gameWindow.append("svg").attr("width", 100).attr("height", 100)
                       .append("circle").attr("cx", 25).attr("cy", 25)
                       .attr("r", 25).style("fill", "purple");



/*
var circles = d3.selectAll("circle")
                .attr("r", 30)
                .attr("cx", 500)
                .attr("cy", 250)
                .style("background", 'yellow');*/