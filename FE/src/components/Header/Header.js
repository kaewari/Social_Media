import {
  ArrowForwardIos,
  ExitToApp,
  Feedback,
  GroupTwoTone,
  Help,
  HomeOutlined,
  Menu,
  Message,
  NightsStay,
  Notifications,
  OndemandVideo,
  People,
  Person,
  Settings,
  Store,
} from "@material-ui/icons";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import { useState } from "react";
import { Image } from "react-bootstrap";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { File } from "../../assets/File";
import SearchBar from "../SearchBar/SearchBar";
import "./Header.css";
function Header() {
  const navigate = useNavigate();
  const [toggleBookMark, setToggleBookMark] = useState(false);
  const [toggleProfile, setToggleProfile] = useState(false);
  const handleToggleProfile = () => {
    setToggleProfile(!toggleProfile);
  };
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
        <div onClick={handleToggleProfile}>
          <Person />
        </div>
      </div>
      {toggleProfile && (
        <div className="account">
            <div className="profile">
              <div>
                <Image
                  src="https://loremflickr.com/640/480/animals"
                  alt="https://loremflickr.com/640/480/animals"
                  loading="lazy"
                  width={40}
                  height={40}
                  roundedCircle
                />
                <p className="h6 p-0 m-0">SonHoang</p>
              </div>
            </div>
            <hr />
            <div className="setting">
              <div className="section">
                <span>
                  <Settings />
                  Settings & privacy
                </span>
                <ArrowForwardIos />
              </div>
              <div className="section">
                <span>
                  <Help />
                  Help & support
                </span>
                <ArrowForwardIos />
              </div>
              <div className="section">
                <span>
                  <DarkModeIcon />
                  Displays & accessibility
                </span>
                <ArrowForwardIos />
              </div>
              <div className="section">
                <span>
                  <Feedback />
                  Give feedback
                </span>
              </div>
              <div className="section">
                <span>
                  <ExitToApp />
                  Log Out
                </span>
              </div>
            </div>
        </div>
      )}
    </div>
  );
}

export default Header;
