import { useState } from "react";
import { Image } from "react-bootstrap";
import { Link, NavLink, useNavigate } from "react-router-dom";
import SearchBar from "../components/SearchBar";
import logo from "../static/instagram_icon.png";
import "./Header.css";
function Header() {
  const navigate = useNavigate();
  const [toggle, setToggle] = useState(false);
  const handle = () => {
    if (toggle) navigate(-1);
    setToggle(!toggle);
  };

  return (
    <div className="d-flex header p-2 bg-body-tertiary justify-content-between">
      <div className="">
        <Link to="/">
          <Image src={logo} alt="logo" width={40} roundedCircle={true} />
        </Link>
        <NavLink
          className="menu-side-bar"
          onClick={handle}
          to={!toggle && "/book-mark"}
        >
          <i className="fa-solid fa-bars fa-2x"></i>
        </NavLink>
        <SearchBar />
      </div>
    </div>
  );
}

export default Header;
