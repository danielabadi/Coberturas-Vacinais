import React from "react";
import "./Motivation.css";

function Motivation() {
    return (
        <div className="motivation">
            <h1 tabIndex={0}>Contextualização</h1>
            <p>A vacinação é a medida mais importante para prevenir e combater doenças no mundo. 
                É um investimento eficaz, pois é mais barato prevenir o contágio do que tratar possíveis 
                pacientes. Com a vacinação, podemos combater doenças que antes eram mortais e até mesmo 
                erradicá-las, como a poliomielite aqui no Brasil. No entanto, é preocupante observar a 
                queda da cobertura vacinal, o que pode levar à reintrodução de doenças já controladas.
            </p>

            <p>
                Atualmente, é notório que a cobertura vacinal de diversos imunizantes voltados para crianças 
                está em declínio em todo o mundo. De acordo com dados divulgados pela <a href="https://data.unicef.org/topic/child-health/immunization/" target="_blank" rel="noreferrer">
                Unicef</a>, em 2021, cerca de 25 milhões de crianças não receberam as três doses das vacinas 
                contra difteria, tétano e coqueluche, o que caracteriza a imunização completa. Além disso, 60% 
                dessas crianças estão concentradas em apenas 10 países, entre eles o Brasil. A situação é 
                ainda mais grave, pois aproximadamente 18 milhões de crianças em todo o mundo não foram vacinadas 
                contra nenhuma doença.
            </p>

            <p>
                Embora os dados apresentados sejam do ano de 2021, durante a pandemia do vírus SARS-CoV-2, há 
                diversos fatores além das medidas de isolamento social e das dificuldades de distribuição e 
                logística gerados pela pandemia que podem ser usados para explicar o motivo do declínio da cobertura 
                vacinal. Um deles é a falsa sensação de segurança por parte da população, que não convive com as 
                doenças já controladas por meio da vacinação e não sabe seus perigos. É importante salientar que 
                este movimento de queda já vem ocorrendo há alguns anos, e que a pandemia não foi um causador, mas 
                sim um <a href="https://www.unicef.org/brazil/comunicados-de-imprensa/pandemia-de-covid-19-alimenta-o-maior-retrocesso-continuo-nas-vacinacoes-em-tres-decadas" 
                target="_blank" rel="noreferrer">amplificador do fenômeno</a>.
            </p>

            <p>
                Fica evidente, portanto, a importância do acompanhamento temporal da cobertura vacinal da população 
                para permitir a criação de planos de ação e tomadas de decisão. No contexto brasileiro isso é ainda 
                mais difícil dado sua extensão territorial, número de municípios e desigualdade social elevada, onde 
                parte da população não tem acesso a informações governamentais.
            </p>

            <h2>Objetivo do projeto</h2>
            <p>
                Pretende-se que este sistema auxilie trabalhos como o 
                de <a href="https://ojs.brazilianjournals.com.br/ojs/index.php/BJHR/article/view/12969" target="_blank" rel="noreferrer">
                [Nóvoa et al. 2020]</a> e <a href="https://sistemas.uft.edu.br/periodicos/index.php/patologia/article/view/9103" 
                target="_blank" rel="noreferrer">[da Silva Oliveira et al. 2020]</a>, que buscam compreender as taxas de
                cobertura vacinal em níveis nacional, regional e municipal, evidenciando a necessidade de
                ações para a retomada das vacinações. Além disso, espera-se que este sistema possa oferecer
                uma análise de modo que possibilite a adoção e criação de medidas e estratégias mais eficientes para
                controle de doenças e a promoção da saúde pública.
            </p>
        </div>
    );
}

export default Motivation;