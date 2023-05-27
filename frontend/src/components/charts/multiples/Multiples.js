import React from "react";
import * as d3 from "d3";
import "./Multiples.css";

function Multiples(props) {
    const [vaccineData, setVaccineData] = React.useState(null);

    const margin = { top: 30, right: 20, bottom: 30, left: 30 },
        width = 300 - margin.left - margin.right,
        height = 150 - margin.top - margin.bottom;

    function getTicks(years) {
        if (years.length > 10) return years.length - 5;
        else if (years.length > 6) return years.length - 4;
        return 1;
    }

    //Read the data
    function smallMultiples(data) {
        // group the data: I want to draw one line per group
        const sumstat = d3.group(data, d => d.regiao); // nest function allows to group the calculation per level of a factor
        const years = Array.from(new Set(vaccineData.flatMap(data => [data.ano])));

        // Add an svg element for each group. The will be one beside each other and will go on the next row when no more room available
        const svg = d3.select("#my_dataviz")
            .selectAll("uniqueChart")
            .data(sumstat)
            .enter()
            .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform",
                `translate(${margin.left},${margin.top})`);

        // Add X axis --> it is a date format
        const x = d3.scaleLinear()
            .domain(d3.extent(data, function (d) { return d.ano; }))
            .range([0, width]);

        svg.append("g")
            .attr("transform", `translate(0, ${height})`)
            .call(d3.axisBottom(x).ticks(getTicks(years)).tickFormat(d3.format("d")));

        //Add Y axis
        const y = d3.scaleLinear()
            .domain([d3.min(data, function (d) { return +d.cobertura; }) - 10 < 0 ? 0 :
                (d3.min(data, function (d) { return +d.cobertura; }) - 10) + (d3.min(data, function (d) { return +d.cobertura; }) - 10) % 10,
            d3.max(data, function (d) { return +d.cobertura; })])
            .range([height, 0]);

        svg.append("g")
            .attr("class", "y axis")
            .call(d3.axisLeft(y).ticks(4).tickSizeInner(-width))
            .call(g => g.select(".domain").remove())
            .call(g => g.append("text")
                .attr("x", -margin.left)
                .attr("y", -5)
                .attr("fill", "currentColor")
                .attr("text-anchor", "start")
                .text("↑ Cobertura (%)"));

        // Draw the line
        svg.append("path")
            .attr("fill", "none")
            .attr("stroke", "#3C447E")
            .attr("stroke-width", 1.9)
            .attr("d", function (d) {
                return d3.line()
                    .x(function (d) { return x(d.ano); })
                    .y(function (d) { return y(+d.cobertura); })
                    (d[1]);
            });

        // Add titles
        svg.append("text")
            .attr("text-anchor", "start")
            .attr("y", -5)
            .attr("x", 90)
            .text(function (d) { return (d[0]) });

    }

    React.useEffect(() => {
        async function fetchData() {
            let url = `http://localhost:5000/api/v1/regions/coverage?vaccine=${props.vacina}`;

            try {
                const response = await fetch(url);
                const json = await response.json();
                setVaccineData(json);
            } catch (error) {
                console.log("error", error);
            }
        };

        fetchData();
    }, [props]);

    React.useEffect(() => {
        if (vaccineData != null) {
            d3.select("#my_dataviz").selectAll("*").remove();
            smallMultiples(vaccineData);
        }
    }, [vaccineData]);

    return (
        <div className="chartMultiplos" id="my_dataviz"></div>
    );
}

export default Multiples;