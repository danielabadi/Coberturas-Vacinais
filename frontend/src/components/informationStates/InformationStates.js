import React from "react";
import "./InformationStates.css";
import { stateState } from "../../assets/states/atom";
import { useRecoilValue } from "recoil";
import statesNames from "../../assets/data/StatesNames";
import IdhmSates from "../idhm/IdhmStates";

function InformationStates() {
    const state = useRecoilValue(stateState);
    const [estadosData, setEstadosData] = React.useState(null);
    const [estadosNome, setEstadosNome] = React.useState(null);

    React.useEffect(() => {
        async function fetchEstadosData() {
            const url = `http://localhost:5000/api/v1/states/info?state=${state}`
            try {
                const response = await fetch(url);
                const json = await response.json();
                setEstadosData(json[0]);
            } catch (error) {
                console.log("error", error);
            }
        }
        fetchEstadosData();
        setEstadosNome(statesNames.map(obj => {
            if(obj.cod === state) return obj.nome;
        }));
    }, [state]);


    return (
        <div className="InfoEstados">
            {estadosData != null &&
                <>
                    <h1 tabIndex={0}>{estadosNome}</h1>
                    <div className="info__gerais">
                        <div role="textbox" aria-label={`Número de estabelecimentos do SUS em 2009 ${estadosData.quantidade_estabelecimentos.toLocaleString('pt-BR')}`}>
                            <h3>Estabelecimentos SUS <sup>[2009]</sup></h3>
                            <p>{estadosData.quantidade_estabelecimentos.toLocaleString('pt-BR')}</p>
                        </div>

                        <div role="textbox" aria-label={`Número de municípios ${estadosData.qtd_municipios.toLocaleString('pt-BR')}}`}>
                            <h3>Número de municípios</h3>
                            <p>{estadosData.qtd_municipios.toLocaleString('pt-BR')}</p>
                        </div>

                        <div role="textbox" aria-label={`População urbana em 2010 ${estadosData.pop_urbana_2010.toLocaleString('pt-BR')}%`}>
                            <h3>População urbana <sup>[2010]</sup></h3>
                            <p>{estadosData.pop_urbana_2010.toLocaleString('pt-BR')}% </p>
                        </div>
                        
                        <div role="textbox" aria-label={`Área ${estadosData.area.toLocaleString('pt-BR')} quilômetros quadrados`}>
                            <h3>Área</h3>
                            <p>{estadosData.area.toLocaleString('pt-BR')} km<sup>2</sup></p>
                        </div>
                    </div>
                    <IdhmSates
                        idhm={estadosData.idhm}
                        idhm_renda={estadosData.idhm_renda}
                        idhm_long={estadosData.idhm_long}
                        idhm_edu={estadosData.idhm_edu}
                    /> 
                </>
            }
        </div>
    )
}

export default InformationStates;