// size of svg we want
var width = 800;
var height = 1750;

// select the article tag in HTML, add an SVG and size it up
var svg = d3.select("svg");

// -40 because 20 on each side for padding
// explain domain() like temp
var xScale = d3.scale
// define what d3 scale is
.linear()
.domain([0, 300])
.range([0, width - 1])

var colorScale = d3.scale
//explain the linear functions
.linear()
//what is domain
.domain([40, 280])
// explain colour range a color between A and B
.range(["#00f4e4", "#eaf200"])

// we start to draw the elements in d3
svg.selectAll("rect")

  .data(cities)
  .enter()
  // As we enter the graph do the following with each of the node elements (each city)
  // we can think of this as a d3 way of doing a for each
  .append("rect")
  .attr("x", 0)
  .attr("y", function (d, i) {
    return i * 25
    // is the current index and go to the current on we are on and set the Y 
  })
  .attr("width", 0) // start off with the .attr("width") below THEN add transition later
  .attr("height", 24)
  // the height of each bar 
  .attr("fill", function (d) {
    return colorScale(d.index);
  })
  .transition() // add a transition
  .delay(function (d, i) { // each one is delayed for 250ms more each time, times the index(city)
    return i * 20;
  })
  .duration(1000) // each transition takes a second to complete
  .attr("width", function (d) {
    return xScale(d.index); // use the scale to do the calculations
  })


svg.selectAll("text.label").data(cities)
// we created a new class called label that inherents the css properties of text but
// it also has its own styling properties that we define here such as placement
// please note that whenever we "enter" in D3, we essentially are saying let's do the following
// for each item our data
  .enter()
  .append("text")
  .attr("class", "label")
  .attr("x", 8)
  .attr("y", function (d, i) {
    // for our Y attribute we want to make our text mid way of the bar
    // all our bars start at index * 25 , and then 12.5 is now the offset
    return i * 25 + 12.5;
  })
  // D3 allows us to pass in a function that takes two arguements the first one being
  // the actual piece of data we want to work with and the second being the index
  // this is only available because of the enter statement
  .text(function (d, i) {
    return d.city;
  })



svg.selectAll("text.number").data(cities)
  .enter()
  .append("text")
  .attr("class", "number")
  .attr("x", function (d) {
    return xScale(d.index) + 5; // use the scale to do the calculations
  })
  .attr("y", function (d, i) {
    return i * 25 + 13;
  })
  .style("fill", function (d) {
    return colorScale(d.index);
  })
  .style("opacity", 0)
  .text(function (d) {
    var pc = "";
    if (d.index  > 100) {
      pc += "+";
    }
    pc += (d.index - 100) + "%"
    return pc;
  })
  .transition()
  .delay(function (d, i) { return i * 20; })
  .duration(1000)
  .style("opacity", 1)
