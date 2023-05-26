import React from "react";
import "./States.css";
import ReactSlider from "react-slider";
import Select from "react-select";
import vaccines from "../../assets/data/Vaccines";
import Ranking from "../../components/charts/ranking/Ranking";
import MapState from "../../components/maps/MapStates";
import Multiples from "../../components/charts/multiples/Multiples";
import InformationStates from "../../components/informationStates/InformationStates";
import TableVaccines from "../../components/tableVaccines/TableVaccines";

function States() {
    const [vaccine, setVaccine] = React.useState(1);
    const [range, setRange] = React.useState(["2010", "2021"]);
    const [prop, setProp] = React.useState({ vaccine: 1, year: 2021 });

    React.useEffect(() => {
        setRange([vaccines[vaccine - 1].anos[0], vaccines[vaccine - 1].anos.at(-1)]);
        setProp({ vaccine: vaccine, year: vaccines[vaccine - 1].anos.at(-1) });
    }, [vaccine]);

    function handleChange(event) {
        setVaccine(event.id);
    }

    function handleSlider(value) {
        setProp(prev => ({
            ...prev,
            year: value
        }));
    }

    return (
        <div className="page_estado">
            <div className="page_estado_principal">
                <div className="page_estado_principal_select">
                    <p>Escolha um imunizante:</p>
                    <Select
                        className="page_estado_select_imunizante"
                        defaultValue={vaccines[0]}
                        onChange={handleChange}
                        options={vaccines}
                    />
                </div>
                <div className="page_estado_principal_mapa">
                    <div className="page_estado_mapa">
                        <MapState dado={prop}></MapState>
                        <ReactSlider
                            className="page_estado_horizontal_slider"
                            markClassName="page_estado_slider_mark"
                            marks={vaccines[vaccine - 1].anos.map(Number)}
                            min={parseInt(range[0])}
                            max={parseInt(range[1])}
                            thumbClassName="page_estado_slider_thumb"
                            trackClassName="page_estado_slider_track"
                            value={prop.year}
                            onSliderClick={handleSlider}
                            renderMark={(props) => <div {...props}> <div className="mark"></div>{props.key}</div>}
                        />
                    </div>
                    <InformationStates></InformationStates>
                </div>
            </div>
            <div className="page_estado_graficos">
                <h1>Ranking das regiões ao longo dos anos de acordo com a cobertura</h1>
                <Ranking vacina={vaccine}></Ranking>
                <h6>Fonte: Sistema de Informação do Programa Nacional de Imunizações (SI-PNI/CGPNI/DEIDT/SVS/MS) (2022).</h6>
                <h1>Evolução da taxa de cobertura vacinal</h1>
                <Multiples vacina={vaccine}></Multiples>
                <h6>Fonte: Sistema de Informação do Programa Nacional de Imunizações (SI-PNI/CGPNI/DEIDT/SVS/MS) (2022).</h6>
            </div>
            <div className="estado__chart--disclaimer">
                <p>
                    Embora os dados sobre a cobertura vacinal apresentados nos gráficos acima provenham do banco de dados do Sistema Único de Saúde, o DataSUS, é importante ressaltar que as
                    estatísticas oficiais nem sempre correspondem à realidade. De acordo com uma <a href="https://www.bbc.com/portuguese/brasil-62980100" target="_blank" rel="noreferrer">reportagem
                        da BBC</a> , que entrevistou especialistas e gestores de saúde, há uma discrepância
                    entre os números oficiais e a situação local. O problema, segundo identificado pelos gestores de saúde locais, deve-se à burocracia excessiva, à falta de pessoal adequado
                    e à conectividade inadequada ou ao acesso a sistemas de informação mais modernos e conectados.
                </p>
            </div>
            <div className="cobertura__table">
                <h1 tabIndex={0}>Imunizações<br />Tabela de Imunobiológicos oferecidos pelo PNI</h1>
                <TableVaccines />
                <p>Fonte: Programa Nacional de Imunizações.<br />
                    Nota: Os esquemas de doses e público-alvo variam ao longo do tempo.
                    Esta tabela corresponde ao esquema vacinal recomendado; eventualmente, há situações reais ocorridas que não correspondem exatamente a este esquema.</p>
            </div>
        </div>
    );
}

export default States;