/**
 * Created by schandramouli on 9/11/16.
 */

function getJSON(res) {
    return JSON.parse(res);
}

function plotGraph(jsonData) {
    var colors = ['red', 'blue', 'yellow', 'green', 'black', 'maroon'];
    for (key in jsonData) {
        console.log(key, jsonData[key]);
    }
    var p = d3.select("body").selectAll("p")
        .data(d3.keys(jsonData)) // imaginary element binds to an array
        .enter()
        .append("p")
        .text(function (data, index) {
            return "index = " + index + " data = "+ data + " value " + jsonData[data];
        });


    var scale = d3.scale.linear()
        .domain([0, 2])
        .range([0, 4]);

    var chart = d3.select("body")
        .append("svg")
        .attr({
            "width": 500,
            "height": 500
        });

    var groups = chart.selectAll("g")
        .data(d3.keys(jsonData))
        .enter()
        .append("g");

    var rects = groups.append("rect")
        .attr({
            "width": 50
        })
        .attr("height", function (d) {
            return scale(d) * 50;
        })
        .attr("x", function(d) {
            return scale(d) * 50;
        })
        .style("fill", function(d) {
            console.log(colors[d% 5]);
            return colors[d% 5];
        });

    var texts = groups.append("text")
        // since rotated, x and y are interchanged
        .attr("y", "1.1em")
        // if the text goes out of screen, put it in
        .attr("x", function (d, i) {
            return scale(d) * 50;
        })
        .text(function (d) {
            return jsonData[d];
        });
}

$.ajax({
    url: 'ret_rows.php'
}).done(function(res) {
    var jsonData = getJSON(res);
    plotGraph(jsonData);
});