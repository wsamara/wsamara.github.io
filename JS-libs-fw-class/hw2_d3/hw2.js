

var students = [];
var term = [];

d3.json("hw2data.json")
    .then(function(data) {
        for (let key in data) {
            students.push(+data[key].students);
            term.push(data[key].term);
        }
        var tooltip = d3.select('body').append('div')
            .style('position', 'absolute')
            .style('padding', '0 10px')
            .style('background', 'white')
            .style('color','black')
            .style('opacity', 0);
        var margin = { top: 20, right: 20, bottom: 30, left: 40};
        var height = 200 - margin.top - margin.bottom,
            width = 500 - margin.left - margin.right;

        var mycolors = d3.scaleLinear()
            .domain([0, students.length])
            .range(['#E59500', '#CB327D']);
        var verticalGuide = d3.scaleLinear()
            .domain([0, d3.max(students)])
            .range([height, 0]);
        var yS = d3.scaleLinear()
            .domain([0, d3.max(students)])
            .range([0, height]);
        var xS = d3.scaleBand()
            .domain(term)
            .range([0, width])
            .padding(0.1);
        var graph = d3.select('#chart')
            .append('svg')
            .attr('width', width + margin.left + margin.right)
            .attr('height', height + margin.top + margin.bottom)

            .append('g')
            .attr('transform', 'translate(' + margin.left + ', ' + margin.top + ')');
        graph.selectAll('rect')
            .data(students)
            .enter()
            .append('rect')
            .style('fill', function(d, i) { return mycolors(i) })
            .attr('width', xS.bandwidth)
            .attr('height', function(d) { return yS(d); })
            .attr('x', function(d, i) { return xS(term[i]); })
            .attr('y', function(d) { return (height - yS(d)); })
            .on('mouseover', function(d,i) {
                tooltip.transition()
                    .style('opacity', .8)
                tooltip.html("# of Students: "+ d + " Term: " + term[i])
                    .style('left', (d3.event.pageX - 35) + 'px')
                    .style('top', (d3.event.pageY - 30) + 'px')
                d3.select(this)
                    .style('opacity', .4)
            })
            .on('mouseout', function(d) {
                d3.select(this)
                    .style('opacity', 1)
            });
        graph.append('g')
            .call(d3.axisLeft(yS).scale(verticalGuide));
        graph.append('g')
            .call(d3.axisBottom(xS))
            .attr('transform', 'translate(0, ' + height + ')');
    });