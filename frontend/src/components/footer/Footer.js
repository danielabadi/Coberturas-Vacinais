import React from "react";
import "./Footer.css";
import { GoLocation } from "react-icons/go";
import { AiOutlineMail } from "react-icons/ai";

function Footer() {
    return (
        <footer>
            <div className="footer">
                <p>Projeto Orientado em Computação 2023/1 - DCC - UFMG</p>
                <div className="footer__location">
                    <GoLocation></GoLocation>
                    <p>Av. Antônio Carlos, 6627, Pampulha - Belo Horizonte - MG </p>
                </div>
                <div className="footer__contact">
                    <AiOutlineMail></AiOutlineMail>
                    <p>daniel.abadi@dcc.ufmg.br</p>
                </div>
            </div>
        </footer>
    )
}

export default Footer;