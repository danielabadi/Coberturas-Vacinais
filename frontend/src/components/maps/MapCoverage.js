import React from "react";
import Leaflet from "leaflet";
import * as d3 from "d3";
import countiesNames from "../../assets/data/CountiesNames";

function MapCoverage(props) {
    const [counties, setCounties] = React.useState(null);
    const [coberturas, setCoberturas] = React.useState(null);
    const [lastProp, setLastProp] = React.useState({ vaccine: 0, year: 0 });
    const [dictCounties, setDictCounties] = React.useState(null);
    const info = Leaflet.control();

    info.onAdd = function () {
        this._div = Leaflet.DomUtil.create("div", "info_interacao_baixa_cobertura");
        this._div.innerHTML = "<h4>Clique ou passe o mouse <br>em um quadrado</h4>";
        return this._div;
    };

    // Criação da referência do mapa
    const mapRef = React.useRef(null);
    const layerRef = React.useRef(null);
    const layerAux = React.useRef(null);
    React.useEffect(() => {
        async function fetchData() {
            const url = `https://servicodados.ibge.gov.br/api/v3/malhas/paises/BR?formato=application/vnd.geo+json&qualidade=minima&intrarregiao=municipio`;

            try {
                const response = await fetch(url);
                const json = await response.json();
                setCounties(json.features);
            } catch (error) {
                console.log("error", error);
            }
        };

        if (mapRef.current == null) {
            mapRef.current = Leaflet.map("mapa_cobertura", {
                center: [0, 0],
                zoom: 8,
            });
            fetchData();
        }
    }, []);

    React.useEffect(function () {
        if (counties !== null) {
            setDictCounties(counties.reduce((dictionary, data) => {
                dictionary[data.properties.codarea] = data.geometry;
                return dictionary;
            }));

            layerRef.current = Leaflet.geoJson(counties, {
                style: { stroke: false }
            }).addTo(mapRef.current);

            mapRef.current.fitBounds(layerRef.current.getBounds());
            layerAux.current = Leaflet.featureGroup().addTo(mapRef.current);
            info.addTo(mapRef.current);
        }
    }, [counties]);

    React.useEffect(() => {
        if (props.dado.vaccine !== lastProp.vaccine | props.dado.year !== lastProp.year) {
            async function fetchDataMapa() {
                const url = `http://localhost:5000/api/v1/cities/map_coverage?vaccine=${props.dado.vaccine}&year=${props.dado.year}`;

                try {
                    const response = await fetch(url);
                    const json = await response.json();
                    setCoberturas(json);
                } catch (error) {
                    console.log("error", error);
                }
            };

            setLastProp(props.dado);
            fetchDataMapa();
            mapRef.current.closePopup();
        }
    }, [props]);

    React.useEffect(() => {
        if (counties !== null & coberturas !== null) {
            layerRef.current.clearLayers();
            layerAux.current.clearLayers();

            Leaflet.geoJson(counties, {
                style: style
            }).addTo(layerRef.current);

            mapRef.current.fitBounds(layerRef.current.getBounds());
            d3.select("#matrix").selectAll("*").remove();

            let valores = Object.values(coberturas).sort((a, b) => {
                if (a.cobertura === null) return 1;
                if (b.cobertura === null) return -1;
                return a.cobertura - b.cobertura;
            });

            let max = valores[399].cobertura;
            let min = valores[0].cobertura;

            Grid(valores.slice(0, 400), {
                squareSize: 20,
                columnLength: 20, // change columns
                max: max,
                min: min
            })
        }
    }, [coberturas]);

    function getColorHex(d) {
        if (["11", "12", "13", "14", "15", "16", "17"].includes(d)) {
            return "#59a14f";
        }
        if (["21", "22", "23", "24", "25", "26", "27", "28", "29"].includes(d)) {
            return "#e15759";
        }
        if (["31", "32", "33", "35"].includes(d)) {
            return "#4e79a7";
        }
        if (["41", "42", "43"].includes(d)) {
            return "#DBD91B";
        }
        return "#f28e2c";
    }

    function getColorRGBA(d) {
        if (["11", "12", "13", "14", "15", "16", "17"].includes(d)) {
            return "rgba(89, 161, 79,";
        }
        if (["21", "22", "23", "24", "25", "26", "27", "28", "29"].includes(d)) {
            return "rgba(225, 87, 89,";
        }
        if (["31", "32", "33", "35"].includes(d)) {
            return "rgba(78, 121, 167,";
        }
        if (["41", "42", "43"].includes(d)) {
            return "rgba(219, 217, 27,";
        }
        return "rgba(242, 142, 44,";
    }

    function percentageToDecimal(percentage) {
        if (percentage > 100) {
            percentage = 100;
        }

        return percentage / 100;
    }

    function style(feature) {
        const cobertura = coberturas[feature.properties.codarea]?.cobertura;
        const color = getColorHex(feature.properties.codarea.slice(0, 2));
        const opcacity = cobertura === undefined ? 0 : 1 - percentageToDecimal(cobertura);

        return {
            fillColor: color,
            weight: 1,
            opacity: opcacity,
            color: color,
            fillOpacity: opcacity,
        };
    }

    function calculatePercentage(maximum, minimum, target) {
        const range = maximum - minimum;
        const position = target - minimum;
        const percentage = (position / range) * 100;

        return percentage;
    }

    function Grid(data, {
        columnLength = 20,
        squareSize = 10,
        strokeWidth = 2,
        max,
        min
    } = {}) {

        const dataLength = data.length;
        const size = (squareSize + (strokeWidth * 2)) - 1;
        const columns = (columnLength !== null && columnLength > 1) ? columnLength : Math.round(460 / size);
        const height = (dataLength / columns) * size;

        const svg = d3.select("#matrix")
            .append("svg")
            .attr("width", 460)
            .attr("height", height);

        const scaleColumn = d3.scaleLinear()
            .domain([0, columns])
            .range([0, columns * size]);

        const scaleRow = d3.scaleLinear()
            .domain([0, data.length / columns])
            .range([0, height]);

        const title = svg.append("title")
            .attr("display", "none");

        const join = svg.selectAll("g")
            .data(data)
            .enter()
            .append("g")
            .attr("transform", (d, i) => {
                const x = i % columns
                const y = Math.floor(i / columns)
                return `translate(${scaleColumn(x)}, ${scaleRow(y)})`
            })
            .attr("fill", (d, i) => {
                return `${getColorRGBA(d.cod_ibge.slice(0, 2))}${1 - percentageToDecimal(calculatePercentage(max, min, d.cobertura)) + 0.2})`
            })
            .on("pointerenter", pointerentered)
            .on("click", click);

        function click(event) {
            layerAux.current.clearLayers();
            Leaflet.geoJSON(dictCounties[event.target.__data__.cod_ibge],
                { style: { fillOpacity: 0 } }
            ).addTo(layerAux.current);

            mapRef.current.fitBounds(layerAux.current.getBounds(), { padding: [200, 200] });
        }

        function pointerentered(event) {
            const newFilter = countiesNames.findIndex(value => {
                return value.cod === event.target.__data__.cod_ibge
            });
            title.text(`Município: ${countiesNames[newFilter]["name"]}\nCobertura: ${event.target.__data__.cobertura + "%"} \nDoses aplicadas: ${event.target.__data__.doses}`);
        }

        join.append("rect")
            .attr("x", 1)
            .attr("y", 1)
            .attr("width", squareSize)
            .attr("height", squareSize)
            .attr("stroke-width", strokeWidth);
    }

    return (
        <div className="baixa-cobertura">
            <div className="mapa_cobertura" id="mapa_cobertura"></div>
            <div>
                <div id="matrix"></div>
                <p className="baixa_cobertura__chart--calculo">A fórmula de cálculo da cobertura é o número de doses aplicadas da dose indicada (1ª, 2ª, 3ª dose ou dose única, conforme a vacina) dividida
                    pela população alvo, multiplicado por 100. Exemplo: para a Tetravalente (DTP/Hib), considera-se o número de terceiras doses aplicadas na faixa
                    etária de menores de 1 ano. Para a vacina oral de rotavírus humano, pode-se avaliar cobertura de 1ª e 2ª doses. </p>
            </div>
        </div>
    );
}

export default MapCoverage;