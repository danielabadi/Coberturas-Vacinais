import React from "react";
import "./Idhm.css";

function IdhmSates(props) {
    return (
        <div className="idhm">
            <div className="idhm__principal" role="textbox" aria-label={`Índice de Desenvolvimento Humano Municipal Médio
                ${props.idhm.toLocaleString('pt-BR')}`}>
                <h3>Índice de Desenvolvimento Humano Municipal Médio <sup>[IDHM]</sup></h3>
                <p className="idhm__principal--valor">{props.idhm.toLocaleString('pt-BR', {style: 'decimal', minimumFractionDigits: 3})}</p>
            </div>
            <div className="idhm__secundarios">
                <div role="textbox" aria-label={`Índice de D esenvolvimento Humano Municipal Médio quesito Renda 
                    ${props.idhm_renda.toLocaleString('pt-BR')}`}>
                    <h3 className="idhm__secundarios--lengeda">IDHM Renda <br></br> Médio</h3>
                    <p className="idhm__secundarios--valor">{props.idhm_renda.toLocaleString('pt-BR', {style: 'decimal', minimumFractionDigits: 3})}</p>
                </div>
                <div role="textbox" aria-label={`Índice de Desenvolvimento Humano Municipal Médio quesito Longevidade
                    ${props.idhm_long.toLocaleString('pt-BR')}`}>
                    <h3 className="idhm__secundarios--lengeda">IDHM Longevidade Médio</h3>
                    <p className="idhm__secundarios--valor">{props.idhm_long.toLocaleString('pt-BR', {style: 'decimal', minimumFractionDigits: 3})}</p>
                </div>
                <div role="textbox" aria-label={`Índice de Desenvolvimento Humano Municipal Médio quesito Educação
                    ${props.idhm_edu.toLocaleString('pt-BR')}`}>
                    <h3 className="idhm__secundarios--lengeda">IDHM Educação Médio</h3>
                    <p className="idhm__secundarios--valor">{props.idhm_edu.toLocaleString('pt-BR', {style: 'decimal', minimumFractionDigits: 3})}</p>
                </div>
            </div>
        </div>
    )
}

export default IdhmSates;