import React from "react";
import "./Counties.css";
import countiesNames from "../../assets/data/CountiesNames";
import MapCounties from "../../components/maps/MapCounties";
import Informations from "../../components/informations/Informations";
import AboutIdhm from "../../components/aboutIdhm/AboutIdhm";
import Coverage from "../../components/charts/coverage/Coverage";
import TableVaccines from "../../components/tableVaccines/TableVaccines";

function Counties() {
    const [codIBGE, setCodIBGE] = React.useState("3106200");
    const [inputSearch, setInputSearch] = React.useState("");
    const [filterSearch, setFilterSearch] = React.useState([]);

    const handleFilter = (event) => {
        setInputSearch(event.target.value);
        const newFilter = countiesNames.filter(value => {
            return value.name.toLowerCase().includes(inputSearch.toLowerCase());
        });
        setFilterSearch(newFilter);
    }

    React.useEffect(() => {
        if (inputSearch === "") {
            setFilterSearch([]);
        }
    }, [inputSearch]);

    function handleClickAutoComplete(value) {
        setCodIBGE(value.cod);
        setFilterSearch([]);
        setInputSearch("");
    }

    return (
        <>
            <div className="municipio">
                <div className="municipio__info">
                    <div className="municipio__buscador">
                        <input
                            type="search"
                            placeholder="Digite um município ou código IBGE"
                            value={inputSearch}
                            onChange={handleFilter}
                            autoComplete="false"
                            tabIndex={0}
                        />
                        {filterSearch.length !== 0 &&
                            <ul className="municipio__buscador__resultados">
                                {filterSearch.slice(0, 25).map(value => (
                                    <li key={value.cod} className="resultado" onClick={() => handleClickAutoComplete(value)} tabIndex={0}>
                                        {value.name}
                                    </li>
                                ))}
                            </ul>
                        }
                    </div>

                    <div className="municipio_dados">
                        <MapCounties codIbge={codIBGE} />
                        <Informations codIbge={codIBGE} />
                    </div>
                    <AboutIdhm />
                </div>
            </div>
            <div className="cobertura">
                <h1 tabIndex={0}>Cobertura dos imunizantes oferecidos pelo PNI</h1>
                <div className="cobertura__chart">
                    <Coverage codIbge={codIBGE} />
                    <p className="cobertura__chart--calculo">A fórmula de cálculo da cobertura é o número de doses aplicadas da dose indicada (1ª, 2ª, 3ª dose ou dose única, conforme a vacina) dividida
                        pela população alvo, multiplicado por 100. Exemplo: para a Tetravalente (DTP/Hib), considera-se o número de terceiras doses aplicadas na faixa
                        etária de menores de 1 ano. Para a vacina oral de rotavírus humano, pode-se avaliar cobertura de 1ª e 2ª doses. </p>
                    <h6>Fonte: Sistema de Informação do Programa Nacional de Imunizações (SI-PNI/CGPNI/DEIDT/SVS/MS) (2022).</h6>
                    <p></p>
                    <div className="cobertura__chart--disclaimer">
                        <p>
                            Embora os dados sobre a cobertura vacinal apresentados no gráfico acima provenham do banco de dados do Sistema Único de Saúde, o DataSUS, é importante ressaltar que as
                            estatísticas oficiais nem sempre correspondem à realidade. De acordo com uma <a href="https://www.bbc.com/portuguese/brasil-62980100" target="_blank" rel="noreferrer">reportagem
                                da BBC</a> , que entrevistou especialistas e gestores de saúde, há uma discrepância
                            entre os números oficiais e a situação local. O problema, segundo identificado pelos gestores de saúde locais, deve-se à excessiva burocracia, à falta de pessoal adequado
                            e à conectividade inadequada ou ao acesso a sistemas de informação mais modernos e conectados.
                        </p>
                    </div>
                </div>
                <div className="cobertura__table">
                    <h1 tabIndex={0}>Imunizações<br />Tabela de Imunobiológicos oferecidos pelo PNI</h1>
                    <TableVaccines />
                    <p>Fonte: Programa Nacional de Imunizações.<br />
                        Nota: Os esquemas de doses e público-alvo variam ao longo do tempo.
                        Esta tabela corresponde ao esquema vacinal recomendado; eventualmente, há situações reais ocorridas que não correspondem exatamente a este esquema.</p>
                </div>
            </div>
        </>
    );
}

export default Counties;