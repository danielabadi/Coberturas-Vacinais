import React from "react";
import * as d3 from 'd3';
import "./Ranking.css";

function Ranking(props) {
    const [vaccineData, setVaccineData] = React.useState(null);

    function BumpChart(data, states, years, {
        //width = 11 * 80, //mudar pra quantidade de anos * 80
        height = 5 * 50,
        margin = ({ left: 100, right: 100, top: 20, bottom: 50 }),
        padding = 25,
        bumpRadius = 13
    } = {}) {
        const width = 12*80;
        let seq = (start, length) => Array.apply(null, { length: length }).map((d, i) => i + start);
        const bx = d3.scalePoint()
            .domain(seq(0, years.length))//mudar pra quantidade de anos
            .range([0, width - margin.left - margin.right - padding * 2]);

        const by = d3.scalePoint()
            .domain(seq(0, states.length))//mudar pra numero de estados
            .range([margin.top, height - margin.bottom - padding])

        const color = d3.scaleOrdinal(d3.schemeTableau10)
            .domain(seq(0, years.length)); //mudar pra quantidade de anos

        const strokeWidth = d3.scaleOrdinal()
            .domain(["default", "transit", "compact"])
            .range([5, bumpRadius * 2 + 2, 2]);

        const title = g => g.append("title")
            .text((d, i) => `${d.state} - ${years[i]}\nRank: ${d.cobertura.rank + 1}\nCobertura: ${d.cobertura.cobertura}`)

        const drawAxis = (g, x, y, axis, domain) => {
            g.attr("transform", `translate(${x},${y})`)
                .call(axis)
                .selectAll(".tick text")
                .attr("font-size", "12px");

            if (!domain) g.select(".domain").remove();
        }
        const compact = false;//drawingStyle === "compact";
        const svg = d3.select('.chart-ranking')
            .append("svg")
            .attr("cursor", "default")
            .attr("viewBox", [0, 0, width, height]);

        svg.append("g")
            .attr("transform", `translate(${margin.left + padding},0)`)
            .selectAll("path")
            .data(seq(0, years.length))//mudar pra quantidade de anos
            .join("path")
            .attr("stroke", "#ccc")
            .attr("stroke-width", 2)
            .attr("stroke-dasharray", "5,5")
            .attr("d", d => d3.line()([[bx(d), 0], [bx(d), height - margin.bottom]]));

        const series = svg.selectAll(".series")
            .data(data)
            .join("g")
            .attr("class", "series")
            .attr("opacity", 1)
            .attr("fill", d => color(d[0].rank))
            .attr("stroke", d => color(d[0].rank))
            .attr("transform", `translate(${margin.left + padding},0)`)
            .on("mouseover", highlight)
            .on("mouseout", restore);

        series.selectAll("path")
            .data(d => d)
            .join("path")
            .attr("stroke-width", strokeWidth('default'))
            .attr("d", (d, i) => {
                if (d.next)
                    return d3.line()([[bx(i), by(d.rank)], [bx(i + 1), by(d.next.rank)]]);
            });

        const bumps = series.selectAll("g")
            .data((d, i) => d.map(v => ({ state: states[i], cobertura: v, first: d[0].rank })))
            .join("g")
            .attr("transform", (d, i) => `translate(${bx(i)},${by(d.cobertura.rank)})`)
            //.call(g => g.append("title").text((d, i) => `${d.territory} - ${quarters[i]}\n${toCurrency(d.profit.profit)}`)); 
            .call(title);

        bumps.append("circle").attr("r", compact ? 5 : bumpRadius);
        bumps.append("text")
            .attr("dy", compact ? "-0.75em" : "0.35em")
            .attr("fill", compact ? null : "white")
            .attr("stroke", "none")
            .attr("text-anchor", "middle")
            .style("font-weight", "bold")
            .style("font-size", "14px")
            .text(d => d.cobertura.rank + 1);
        
        const ax = d3.scalePoint()
            .domain(years)
            .range([margin.left + padding, width - margin.right - padding]); 

        const y = d3.scalePoint()  
            .range([margin.top, height - margin.bottom - padding]);

        const left = ranking().sort((a, b) => a.first - b.first).map((d) => d.state);
        const right = ranking().sort((a, b) => a.last - b.last).map((d) => d.state);

        function ranking() {
            const len = years.length - 1;
            const ranking = data.map((d, i) => ({state: states[i], first: d[0].rank, last: d[len].rank}));
            return ranking;
          }

        svg.append("g").call(g => drawAxis(g, 0, height - margin.top - margin.bottom + padding, d3.axisBottom(ax), true));
        const leftY = svg.append("g").call(g => drawAxis(g, margin.left, 0, d3.axisLeft(y.domain(left))));
        const rightY = svg.append("g").call(g => drawAxis(g, width - margin.right, 0, d3.axisRight(y.domain(right))));

        function highlight(e, d) {
            this.parentNode.appendChild(this);
            series.filter(s => s !== d)
                .transition().duration(500)
                .attr("fill", "#ddd").attr("stroke", "#ddd");
            markTick(leftY, 0);
            markTick(rightY, years.length - 1);

            function markTick(axis, pos) {
                axis.selectAll(".tick text").filter((s, i) => i === d[pos].rank)
                    .transition().duration(500)
                    .attr("font-weight", "bold")
                    .attr("fill", color(d[0].rank));
            }
        }

        function restore() {
            series.transition().duration(500)
                .attr("fill", s => color(s[0].rank)).attr("stroke", s => color(s[0].rank));
            restoreTicks(leftY);
            restoreTicks(rightY);

            function restoreTicks(axis) {
                axis.selectAll(".tick text")
                    .transition().duration(500)
                    .attr("font-weight", "normal").attr("fill", "black");
            }
        }
    }

    React.useEffect(() => {
        async function fetchData() {
            let url = `http://localhost:5000/api/v1/regions/cobertura?vaccine=${props.vacina}`;
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
            d3.select('.chart-ranking').selectAll('*').remove();
            const states = Array.from(new Set(vaccineData.flatMap(d => [d.regiao])))
            const years = Array.from(new Set(vaccineData.flatMap(d => [d.ano])))

            function chartData() {
                const ti = new Map(states.map((state, i) => [state, i]));
                const qi = new Map(years.map((year, i) => [year, i]));

                const matrix = Array.from(ti, () => new Array(years.length).fill(null));
                for (const { regiao, ano, cobertura } of vaccineData)
                    matrix[ti.get(regiao)][qi.get(ano)] = { rank: 0, cobertura: +cobertura, next: null };
                matrix.forEach((d) => {
                    for (let i = 0; i < d.length - 1; i++)
                        d[i].next = d[i + 1];
                });

                years.forEach((d, i) => {
                    const array = [];
                    matrix.forEach((d) => array.push(d[i]));
                    array.sort((a, b) => b.cobertura - a.cobertura);
                    array.forEach((d, j) => d.rank = j);
                });

                return matrix;
            }
            const matrix = chartData();
            BumpChart(matrix, states, years);
        }
    }, [vaccineData]);


    return (
        <div className="chart-ranking"></div>
    )
}

export default Ranking;