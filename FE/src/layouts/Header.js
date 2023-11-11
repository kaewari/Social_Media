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
  const navigation1 = [
    { title: "Index", to: "/", icon: "house" },
    { title: "Friend", to: "friend", icon: "user-group" },
    { title: "Video", to: "video", icon: "video" },
    {
      title: "Market",
      to: "shop",
      icon: "shop",
    },
    {
      title: "Groups",
      to: "group",
      icon: "users-line",
    },
  ];
  const navigation2 = [
    { title: "Message", to: "message", icon: "message" },
    { title: "Notification", to: "notification", icon: "bell" },
    { title: "Profile", to: "profile", icon: "user" },
  ];

  return (
    <div className="d-flex header p-2 bg-body-tertiary justify-content-between">
      <div className="d-flex left">
        <Link to="/">
          <Image
            className="me-2"
            src={logo}
            alt="logo"
            width={40}
            roundedCircle={true}
          />
        </Link>

        <SearchBar />
      </div>
      <div className="d-flex mid">
        <div className="me-auto d-flex">
          {navigation1 &&
            navigation1.map((item, index) => (
              <NavLink
                key={index}
                to={item.to}
                className={(active) =>
                  active.isActive ? "text-dark menu-nav-bar" : "menu-nav-bar"
                }
              >
                <i
                  title={item.title}
                  className={`fa-solid fa-${item.icon} fa-2x`}
                ></i>
              </NavLink>
            ))}
          <NavLink
            className="menu-side-bar"
            onClick={handle}
            to={!toggle && "/book-mark"}
          >
            <i className="fa-solid fa-bars fa-2x"></i>
          </NavLink>
        </div>
      </div>
      <div className="d-flex right">
        {navigation2 &&
          navigation2.map((item, index) => (
            <NavLink
              key={index}
              to={item.to}
              className={(active) =>
                active.isActive ? "text-dark me-4" : "me-4"
              }
            >
              <i
                title={item.title}
                className={`fa-solid fa-${item.icon} fa-2x`}
              ></i>
            </NavLink>
          ))}
      </div>
    </div>
  );
}

export default Header;
