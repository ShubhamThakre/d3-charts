import * as d3 from 'd3';
import React, { useEffect, useRef } from 'react';


const BarChart = ({height, width, chartData}) => {
	// Variables / constants
	const chartRef = useRef();
 
	/**
	 *  USE-EFFECT FUNCTION- to load the height/ width of the chart
	*/
	useEffect(() => {
		const svg = d3.select(chartRef.current)
			.attr("width", width)
			.attr("height", height)
	}, [])
	
	/**
	 *  USE-EFFECT FUNCTION- to load the chart when component render
	*/
	useEffect(()=>{
		drawBarChartFunction();
	}, [])

	/**
	 * Name: draw Bar Chart Function(drawBarChartFunction) 
	 * Description: This function contain the d3 bar chart configuration and customization.
	 * Author: Bhavika 
     * @return: void;
	*/
	const drawBarChartFunction = () => {
		var svg = d3.select("svg"),
            margin = { top: 20, right: 10, bottom: 30, left: 10 },
            width = +svg.attr("width") - margin.left - margin.right,
            height = +svg.attr("height") - margin.top - margin.bottom,
            g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        var x0 = d3.scaleBand()
            .rangeRound([0, width])
            .paddingInner(0.3);

        var x1 = d3.scaleBand()
            .padding(0.05);

        var y = d3.scaleLinear()
            .rangeRound([height, 0]);

        var z = d3.scaleOrdinal()
            .range(["#2991CB", "#FF4040"]);

        var data = JSON.parse(chartData);
        var keys = Object.keys(data[0]).slice(1);

        x0.domain(data.map(function (d) { return d.State; }));
        x1.domain(keys).rangeRound([0, x0.bandwidth()]);
        // @ts-ignore
        y.domain([0, d3.max(data, function (d) { return d3.max(keys, function (key) { return d[key]; }); })]).nice();

        
		// Analytical View Bar chart- group bar chart 
        g.append("g")
            .selectAll("g")
            .data(data)
            .enter().append("g")
            .attr("transform", function (d) { return "translate(" + x0(d.State) + ",0)"; })
            .selectAll("rect")
            .data(function (d) { return keys.map(function (key) { return { key: key, value: d[key] }; }); })
            .enter().append("rect")
            .attr("x", function (d) { return x1(d.key); })
            .attr("y", function (d) { return y(d.value); })
            .attr("width", x1.bandwidth())
            .attr("height", function (d) { return height - y(d.value); })
            .attr("fill", function (d) { return z(d.key); })
            .attr("rx", "3")
            .attr("ry", "3")

        
		// Analytical View Bar chart- x-axis marking 
        g.append("g")
            .attr("class", "axis")
            .attr("transform", "translate(0," + height + ")")
            .style("color", "#F5F5F5")
            .style("opacity", "0.61")
            .call(d3.axisBottom(x0));

        g.append('text')
            .text('current lesion')
            .attr('transform', 'translate(' + [width / 2, - margin.top / 4] + ')')
            .style("fill", "#FFFFFF")
            .style("opacity", "0.38")
            .attr("font-size", "12px")
	}

	return (
		<div>
			<h1>Simple Bar Chart</h1>
			<div className="chart">
				<svg ref={chartRef}>
				</svg>
			</div>
		</div>
	);
}


export default BarChart;