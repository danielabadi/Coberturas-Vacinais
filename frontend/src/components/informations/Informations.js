import React from "react";
import "./Informations.css";
import Idhm from "../idhm/Idhm";

function Informations(props) {
    const [municipiosData, setMunicipiosData] = React.useState(null);
    const [popData, setPopData] = React.useState(null);
    const [pibData, setPibData] = React.useState(null);

    React.useEffect(() => {
        async function fetchMunicipiosData() {
            const url = `http://localhost:5000/api/v1/cities/info?city=${props.codIbge}`
            try {
                const response = await fetch(url);
                const json = await response.json();
                setMunicipiosData(json[0]);
            } catch (error) {
                console.log("error", error);
            }
        }

        async function fetchPopulacaounicipiosData() {
            const url = `http://localhost:5000/api/v1/cities/populacao?city=${props.codIbge}`
            try {
                const response = await fetch(url);
                const json = await response.json();
                setPopData(json);
            } catch (error) {
                console.log("error", error);
            }
        }

        async function fetchPibData() {
            const url = `http://localhost:5000/api/v1/cities/pib?city=${props.codIbge}`
            try {
                const response = await fetch(url);
                const json = await response.json();
                setPibData(json);
            } catch (error) {
                console.log("error", error);
            }
        }
        fetchMunicipiosData();
        fetchPopulacaounicipiosData();
        fetchPibData();
    }, [props]);

    return (
        <div className="info">
            {(municipiosData != null && popData != null && pibData != null) &&
                <>
                    <h1 tabIndex={0}>{municipiosData.municipio}</h1>
                    <div className="info__gerais">
                        <div role="textbox" aria-label={`Número de estabelecimentos do SUS em 2009 ${municipiosData.quantidade_estabelecimentos === null ? 
                                'Sem dado' : municipiosData.quantidade_estabelecimentos.toLocaleString('pt-BR')}`}>
                            <h3>Estabelecimentos SUS <sup>[2009]</sup></h3>
                            <p>{municipiosData.quantidade_estabelecimentos === null ? 
                                'Sem dado' : municipiosData.quantidade_estabelecimentos.toLocaleString('pt-BR')}</p>
                        </div>

                        <div role="textbox" aria-label={`População urbana em 2010 ${municipiosData.pop_urbana_2010 === null ? 
                                'Sem dado' : municipiosData.pop_urbana_2010.toLocaleString('pt-BR')}%}`}>
                            <h3>População urbana <sup>[2010]</sup></h3>
                            <p>{municipiosData.pop_urbana_2010 === null ? 
                                'Sem dado' : municipiosData.pop_urbana_2010.toLocaleString('pt-BR')}% </p>
                        </div>
                        
                        <div role="textbox" aria-label={`Densidade demográfica em 2010 ${municipiosData.densidade_2010 === null ? 
                                'Sem dado' : municipiosData.densidade_2010.toLocaleString('pt-BR')} habitantes por quilômetro quadrado}`}>
                            <h3>Densidade demográfica <sup>[2010]</sup></h3>
                            <p>{municipiosData.densidade_2010 === null ? 
                                'Sem dado' : municipiosData.densidade_2010.toLocaleString('pt-BR')} hab/km<sup>2</sup></p>
                        </div>

                        <div role="textbox" aria-label={`Área ${municipiosData.area === null ?
                                'Sem dado' : municipiosData.area.toLocaleString('pt-BR')} quilômetros quadrados`}>
                            <h3>Área</h3>
                            <p>{municipiosData.area === null ?
                                'Sem dado' : municipiosData.area.toLocaleString('pt-BR')} km<sup>2</sup></p>
                        </div>

                        <div role="textbox" aria-label={`População em ${popData.at(-1).ano} ${popData.at(-1).populacao.toLocaleString('pt-BR')} habitantes`}>
                            <h3>População <sup>[{popData.at(-1).ano}]</sup></h3>
                            <p>{popData.at(-1).populacao.toLocaleString('pt-BR')}</p>
                        </div>

                        <div role="textbox" aria-label={`PIB per capita em ${pibData.at(-1).ano} ${pibData.at(-1).pib_per_capita.toLocaleString('pt-BR')} R$`}>
                            <h3>PIB per capita <sup>[{pibData.at(-1).ano}]</sup></h3>
                            <p>R$ {pibData.at(-1).pib_per_capita.toLocaleString('pt-BR')}</p>
                        </div>
                    </div>
                    <Idhm
                        idhm={municipiosData.idhm}
                        idhm_renda={municipiosData.idhm_renda}
                        idhm_long={municipiosData.idhm_long}
                        idhm_edu={municipiosData.idhm_edu}
                    /> 
                </>
            }
        </div>
    )
}

export default Informations;