import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SearchBar.css";
import { Form } from "react-bootstrap";
import { SearchRounded } from "@material-ui/icons";

const SearchBar = () => {
  const [kw, setKW] = useState("");
  const nav = useNavigate();
  const [toggleSearchBar, setToggleSearchBar] = useState(false);

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
  const handleToggleSearchBar = () => {
    setToggleSearchBar(!toggleSearchBar);
    console.log(123);
  };
  return (
    <div className="search-bar me-auto p-1 rounded-5 border border-secondary">
      <div className="w-100 d-flex align-items-center">
        <span onClick={handleToggleSearchBar}>
          <SearchRounded className="search-icon" />
        </span>
        <Form
          onClick={handleToggleSearchBar}
          onSubmit={Search}
          className="search-form"
        >
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
