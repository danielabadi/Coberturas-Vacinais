import React from "react";
import "./TableVaccines.css";
import InfoVaccines from "../../assets/data/InfoVaccines";

function TableVaccines() {
    return (
        <table className="vacinas">
            <thead>
                <tr>
                    <th>Vacina</th>
                    <th>Proteção Contra</th>
                    <th>Esquema Básico</th>
                    <th>Reforço</th>
                    <th>Idade recomendada</th>
                </tr>
            </thead>
            <tbody>
                {InfoVaccines.map(value => (
                    <tr key={value.vacina}>
                        <td className="vacinas--nome">{value.vacina}</td>
                        <td>{value.doenca}</td>
                        <td>{value.esquema}</td>
                        <td>{value.reforco}</td>
                        <td>{value.idade}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default TableVaccines;