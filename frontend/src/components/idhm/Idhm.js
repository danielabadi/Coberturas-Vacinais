import React from "react";
import "./Idhm.css";

function Idhm(props) {
    return (
        <div className="idhm">
            <div className="idhm__principal" role="textbox" aria-label={`Índice de Desenvolvimento Humano Municipal do ano de 2010
                ${props.idhm === 0 ? "Sem dado" : props.idhm.toLocaleString("pt-BR")}`}>
                <h3>Índice de Desenvolvimento Humano Municipal <sup>[2010]</sup></h3>
                <p className="idhm__principal--valor">{props.idhm === 0 ? "Sem dado" : props.idhm.toLocaleString("pt-BR", { style: "decimal", minimumFractionDigits: 3 })}</p>
            </div>
            <div className="idhm__secundarios">
                <div role="textbox" aria-label={`Índice de Desenvolvimento Humano Municipal quesito Renda 
                    ${props.idhm_renda === 0 ? "Sem dado" : props.idhm_renda.toLocaleString("pt-BR")}`}>
                    <h3 className="idhm__secundarios--lengeda">IDHM Renda</h3>
                    <p className="idhm__secundarios--valor">{props.idhm_renda === 0 ? "Sem dado" : props.idhm_renda.toLocaleString("pt-BR", { style: "decimal", minimumFractionDigits: 3 })}</p>
                </div>
                <div role="textbox" aria-label={`Índice de Desenvolvimento Humano Municipal quesito Longevidade
                    ${props.idhm_long === 0 ? "Sem dado" : props.idhm_long.toLocaleString("pt-BR")}`}>
                    <h3 className="idhm__secundarios--lengeda">IDHM Longevidade</h3>
                    <p className="idhm__secundarios--valor">{props.idhm_long === 0 ? "Sem dado" : props.idhm_long.toLocaleString("pt-BR", { style: "decimal", minimumFractionDigits: 3 })}</p>
                </div>
                <div role="textbox" aria-label={`Índice de Desenvolvimento Humano Municipal quesito Educação
                    ${props.idhm_edu === 0 ? "Sem dado" : props.idhm_edu.toLocaleString("pt-BR")}`}>
                    <h3 className="idhm__secundarios--lengeda">IDHM Educação</h3>
                    <p className="idhm__secundarios--valor">{props.idhm_edu === 0 ? "Sem dado" : props.idhm_edu.toLocaleString("pt-BR", { style: "decimal", minimumFractionDigits: 3 })}</p>
                </div>
            </div>
        </div>
    );
}

export default Idhm;