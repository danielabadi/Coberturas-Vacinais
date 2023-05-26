import React from "react";
import Select from "react-select";
import * as d3 from "d3";
import vaccines from "../../../assets/data/Vaccines";
import "./Coverage.css";

function Coverage(props) {
    const [vaccineData, setVaccineData] = React.useState(null);
    const [escolhidas, setEscolhidas] = React.useState(
        ["BCG", "Febre Amarela", "Hepatite B", "Meningococo C", "Pneumocócica"]
    );

    // Copyright 2021 Observable, Inc.
    // Released under the ISC license.
    // https://observablehq.com/@d3/multi-line-chart
    function LineChart(data, {
        x = ([x]) => x, // given d in data, returns the (temporal) x-value
        y = ([, y]) => y, // given d in data, returns the (quantitative) y-value
        z = () => 1, // given d in data, returns the (categorical) z-value
        defined, // for gaps in data
        curve = d3.curveLinear, // method of interpolation between points
        marginTop = 30, // top margin, in pixels
        marginRight = 30, // right margin, in pixels
        marginBottom = 30, // bottom margin, in pixels
        marginLeft = 30, // left margin, in pixels
        width = 800, // outer width, in pixels
        height = 320, // outer height, in pixels
        xType = d3.scaleLinear, // type of x-scale
        xDomain = [2010, 2021], // [xmin, xmax]
        xRange = [marginLeft, width - marginRight], // [left, right]
        yType = d3.scaleLinear, // type of y-scale
        yDomain, // [ymin, ymax]
        yRange = [height - marginBottom, marginTop], // [bottom, top]
        yFormat, // a format specifier string for the y-axis
        yLabel, // a label for the y-axis
        zDomain, // array of z-values
        strokeWidth = 1.5, // stroke width of line
        mixBlendMode = "multiply" // blend mode of lines
    } = {}) {
        // Compute values.
        const X = d3.map(data, x);
        let Y = d3.map(data, y);
        const Z = d3.map(data, z);
        const O = d3.map(data, d => d);

        Y = Y.map(value => {
            if (value === null) return undefined;
            return value;
        });

        if (defined === undefined) defined = (d, i) => !isNaN(X[i]) && !isNaN(Y[i]);
        const D = d3.map(data, defined);

        // Compute default domains, and unique the z-domain.
        if (xDomain === undefined) xDomain = d3.extent(X);
        if (yDomain === undefined) yDomain = [0, d3.max(Y, d => typeof d === "string" ? +d : d)];
        if (zDomain === undefined) zDomain = Z;
        zDomain = new d3.InternSet(zDomain);

        // Omit any data not present in the z-domain.
        const I = d3.range(X.length).filter(i => zDomain.has(Z[i]));

        // Construct scales and axes.
        const xScale = xType(xDomain, xRange);
        const yScale = yType(yDomain, yRange);
        const xAxis = d3.axisBottom(xScale).ticks(width / 80).tickFormat(d3.format("d")).tickSizeOuter(0);
        const yAxis = d3.axisLeft(yScale).ticks(height / 60, yFormat)
            .tickSizeInner(-width + marginLeft + marginRight);

        // Construct a line generator.
        const line = d3.line()
            .defined(i => D[i])
            .curve(curve)
            .x(i => xScale(X[i]))
            .y(i => yScale(Y[i]));

        const svg = d3.select(".grafico_cobertura")
            .append("svg")
            .attr("aria-label", "de linhas representando a cobertura vacinal dos imunizantes selecionados, cada um com sua própria linha, ao longo dos anos de 2010 até 2021")
            .attr("width", width)
            .attr("height", height)
            .attr("viewBox", [0, 0, width, height])
            .attr("style", "max-width: 100%; height: auto; height: intrinsic;")
            .style("-webkit-tap-highlight-color", "transparent")
            .on("pointerenter", pointerentered)
            .on("pointermove", pointermoved)
            .on("pointerleave", pointerleft)
            .on("touchstart", event => event.preventDefault());

        // Adicionando eixo x do gráfico
        svg.append("g")
            .attr("transform", `translate(0,${height - marginBottom})`)
            .attr("aria-hidden", "true")
            .call(xAxis)
            .call(g => g.append("text")
                .attr("x", width / 2)
                .attr("y", 30)
                .attr("fill", "currentColor")
                .attr("text-anchor", "start")
                .text("Ano"));

        // Adicionando eixo y
        svg.append("g")
            .attr("transform", `translate(${marginLeft},0)`)
            .attr("aria-hidden", "true")
            .attr("class", "y axis")
            .call(yAxis)
            .call(g => g.select(".domain").remove())
            .call(g => g.append("text")
                .attr("x", -marginLeft)
                .attr("y", 30)
                .attr("fill", "currentColor")
                .attr("text-anchor", "start")
                .text(yLabel));

        const path = svg.append("g")
            .attr("fill", "none")
            .attr("stroke-width", strokeWidth)
            .selectAll("path")
            .data(d3.group(I, i => Z[i]))
            .join("path")
            .style("mix-blend-mode", mixBlendMode)
            .attr("stroke", ([z]) => color(z))
            .attr("d", ([, I]) => line(I));

        const title = svg.append("title")
            .attr("display", "none");

        const dot = svg.append("g")
            .attr("display", "none");

        dot.append("circle")
            .attr("r", 2.5);

        function pointermoved(event) {
            const [xm, ym] = d3.pointer(event);
            const i = d3.least(I, i => Math.hypot(xScale(X[i]) - xm, yScale(Y[i]) - ym)); // closest point
            path.style("stroke", ([z]) => Z[i] === z ? null : "#ddd").filter(([z]) => Z[i] === z).raise();
            dot.attr("transform", `translate(${xScale(X[i])},${yScale(Y[i])})`);
            title.text(`${Z[i]}\nCobertura: ${Y[i]}%\nAno: ${X[i]}`);
            svg.property("value", O[i]).dispatch("input", { bubbles: true });
        }

        function pointerentered() {
            path.style("mix-blend-mode", null).style("stroke", "#ddd");
            dot.attr("display", null);
        }

        function pointerleft() {
            path.style("mix-blend-mode", mixBlendMode).style("stroke", null);
            dot.attr("display", "none");
            title.attr("display", "none");
            svg.node().value = null;
            svg.dispatch("input", { bubbles: true });
        }

        function color(z) {
            const color2 = d3.scaleOrdinal()
                .domain(zDomain)
                .range(d3.schemeDark2);

            return color2(z);
        }
    }

    React.useEffect(() => {
        if (vaccineData != null) {
            d3.select(".grafico_cobertura").selectAll("*").remove();
            LineChart(vaccineData, {
                x: d => d.ano,
                y: d => d.cobertura,
                z: d => d.nome,
                yLabel: "↑ Cobertura (%)",
                zDomain: escolhidas
            });
        }
    }, [vaccineData, escolhidas]);

    React.useEffect(() => {
        async function fetchData() {
            let url = `http://localhost:5000/api/v1/cities/cobertura?city=${props.codIbge}`;

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

    function handleChange(event) {
        setEscolhidas(Array.from(event, op => op.value));
    }

    return (
        <div className="visualizacao_cobertura">
            <Select
                aria-label="Seleção de imunizantes"
                className="select_imunizantes"
                options={vaccines}
                isMulti
                onChange={handleChange}
                defaultValue={[vaccines[0], vaccines[5],
                vaccines[7], vaccines[9], vaccines[12]]}
            />
            {vaccineData != null && <div className="grafico_cobertura" role="figure"></div>}
        </div>
    );
}

export default Coverage;