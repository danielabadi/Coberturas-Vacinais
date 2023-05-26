import React from "react";
import "./LowCoverage.css";
import ReactSlider from "react-slider";
import Select from "react-select";
import MapCoverage from "../../components/maps/MapCoverage";
import vaccines from "../../assets/data/Vaccines";
import TableVaccines from "../../components/tableVaccines/TableVaccines";

function LowCoverage() {
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
        <div className="page_cobertura">
            <div className="page_cobertura_principal">
                <div className="page_cobertura_principal_select">
                    <p>Escolha um imunizante:</p>
                    <Select
                        className="page_cobertura_select_imunizante"
                        defaultValue={vaccines[0]}
                        onChange={handleChange}
                        options={vaccines}
                    />
                </div>
                <div className="page_cobertura_principal_mapa">
                    <div className="page_cobertura_mapa">
                        <MapCoverage dado={prop}></MapCoverage>
                        <ReactSlider
                            className="page_cobertura_horizontal_slider"
                            markClassName="page_cobertura_slider_mark"
                            marks={vaccines[vaccine - 1].anos.map(Number)}
                            min={parseInt(range[0])}
                            max={parseInt(range[1])}
                            thumbClassName="page_cobertura_slider_thumb"
                            trackClassName="page_cobertura_slider_track"
                            value={prop.year}
                            onSliderClick={handleSlider}
                            renderMark={(props) => <div {...props}> <div className="mark"></div>{props.key}</div>}
                        />
                    </div>
                </div>
            </div>
            <div className="baixa-cobertura__chart--disclaimer">
                <p>
                    O objetivo do mapa acima, em conjunto com a matriz de quadrados, é destacar os municípios com as menores taxas de cobertura vacinal. Para esse propósito, os 
                    400 municípios com as taxas mais baixas foram coloridos de acordo com a região, e a intensidade da cor foi determinada pela cobertura vacinal. Nesse sistema, 
                    uma cobertura de 100% é representada por transparência, enquanto valores próximos a 0% são representados pela cor mais intensa. No entanto, é importante 
                    ressaltar que a intensidade da cor dos quadrados não corresponde exatamente ao que foi apresentado no mapa, a fim de criar uma progressão de cores mais clara na visualização.
                </p>
                <p>
                    Embora os dados sobre a cobertura vacinal apresentados no gráfico acima provenham do banco de dados do Sistema Único de Saúde, o DataSUS, é importante ressaltar que as
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

export default LowCoverage;