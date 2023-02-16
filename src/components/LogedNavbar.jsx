import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BiCameraMovie } from "react-icons/bi";

import "../style/Navbar.css"

const Navbar = (props) => {
    const [search, setSearch] = useState("");
    const navigate = useNavigate();   

    return (
        <nav id="navbar">
            <h2>
                <Link to="/">
                    <BiCameraMovie /> MoviesLib
                </Link>
            </h2>
            <Link to='/auth'>Meu Cadastro</Link>
            <button className="btn btn-light" onClick={props.onClick}>Sair</button>
        </nav>
    );
};

export default Navbar;
