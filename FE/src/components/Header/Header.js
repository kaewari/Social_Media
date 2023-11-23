import {
  GroupTwoTone,
  HomeOutlined,
  Menu,
  Message,
  Notifications,
  OndemandVideo,
  People,
  Person,
  Store,
} from "@material-ui/icons";
import { useState } from "react";
import { Image } from "react-bootstrap";
import { Link, NavLink, useNavigate } from "react-router-dom";
import "./Header.css";
import SearchBar from "../SearchBar/SearchBar";
import { File } from "../../assets/File";
function Header() {
  const navigate = useNavigate();
  const [toggleBookMark, setToggleBookMark] = useState(false);
  const handleToggleBookMark = () => {
    if (toggleBookMark) navigate(-1);
    setToggleBookMark(!toggleBookMark);
  };

  return (
    <div className="header pt-2 pb-2 bg-body-tertiary">
      <div className="left">
        <Link to="/">
          <Image src={File.Logo} alt="logo" width={40} roundedCircle={true} />
        </Link>
        <SearchBar />
      </div>
      <div className="bottom">
        <NavLink to={"/"} activeclassname="active">
          <HomeOutlined />
        </NavLink>
        <NavLink to={"/friend"}>
          <People />
        </NavLink>
        <NavLink to={"/video"}>
          <OndemandVideo />
        </NavLink>
        <NavLink to={"/shop"}>
          <Store />
        </NavLink>
        <NavLink to={"/group"}>
          <GroupTwoTone />
        </NavLink>
        <NavLink
          onClick={handleToggleBookMark}
          to={!toggleBookMark && "/book-mark"}
        >
          <Menu />
        </NavLink>
      </div>
      <div className="right">
        <div>
          <Message />
        </div>
        <div>
          <Notifications />
        </div>
        <div>
          <Person />
        </div>
      </div>
    </div>
  );
}

export default Header;
