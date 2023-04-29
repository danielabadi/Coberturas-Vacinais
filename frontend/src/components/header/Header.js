import React from "react";
import "./Header.css";
import { NavLink } from "react-router-dom";

function Header() {
    return (
        <div className="header" role="navigation">
            <NavLink className={({ isActive }) => isActive ? 'link--active' : 'link'}
                to='/' tabIndex={1} role="menuitem">
                Motivação
            </NavLink>
            <NavLink className={({ isActive }) => isActive ? 'link--active' : 'link'}
                to='/counties' tabIndex={1} role="menuitem">
                Municípios
            </NavLink>
            <NavLink className={({ isActive }) => isActive ? 'link--active' : 'link'}
                to='/' tabIndex={1} role="menuitem">
                Regiões
            </NavLink>
            <NavLink className={({ isActive }) => isActive ? 'link--active' : 'link'}
                to='/' tabIndex={1} role="menuitem">
                Baixa Cobertura
            </NavLink>
        </div>
    )
}

export default Header;