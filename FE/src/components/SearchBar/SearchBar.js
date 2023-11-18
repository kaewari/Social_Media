import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SearchBar.css";
import { Form } from "react-bootstrap";

const SearchBar = () => {
  const [kw, setKW] = useState("");
  const nav = useNavigate();

  // useEffect(() => {
  //   const debounce = setTimeout(() => {}, 1000);
  //   return () => {
  //     clearTimeout(debounce);
  //   };
  // }, [kw]);
  const Search = (e) => {
    e.preventDefault();
    if (kw !== "") {
      nav(`/?kw=${kw}`);
      setKW("");
    }
  };
  return (
    <div className="search-bar me-auto p-1 rounded-5 border border-secondary">
      <div className="w-100 d-flex align-items-center">
        <i className="search-icon fa-solid fa-magnifying-glass fa-lg"></i>
        <Form onSubmit={Search} className="search-form">
          <input
            className="search-input border-0 ms-1 h-100 w-100 bg-transparent"
            placeholder="Nhập từ khoá"
            value={kw}
            onChange={(e) => {
              setKW(e.target.value);
            }}
          />
        </Form>
      </div>
    </div>
  );
};
export default SearchBar;
