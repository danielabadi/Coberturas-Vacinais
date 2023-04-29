import React from "react";
import { BsFillInfoCircleFill } from "react-icons/bs";
import regua from "../../assets/images/regua_pt-br.svg";
import "./AboutIdhm.css";

function AboutIdhm() {
    return (
        <div className="about_idhm">
            <div className="about_idhm_hover">
                <p>O Índice de Desenvolvimento Humano Municipal (IDHM) é um número que varia entre 0,000 e 1,000. Quanto mais
                    próximo de 1,000, maior o desenvolvimento humano de uma localidade. <a href="https://www.undp.org/pt/brazil/o-que-é-o-idhm"
                        target='_blank' rel="noreferrer">Saiba mais clicando aqui!</a></p>
                <br></br>
                <img src={regua} alt="régua do idhm" />
            </div>
            <BsFillInfoCircleFill className="about_idhm_icone" color="white" />
            <p>Sobre o IDHM</p>
        </div>
    )
}

export default AboutIdhm;