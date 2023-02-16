import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BiCameraMovie } from "react-icons/bi";

import "../style/Navbar.css"

const Navbar = () => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  return (
    <nav id="navbar">
      <h2>
        <Link to="/">
          <BiCameraMovie /> DevMovies
        </Link>
      </h2>
      <Link to='/auth'>Login</Link>
      <Link to='/cadastro'>Cadastro</Link>
    </nav>
  );
};

export default Navbar;
