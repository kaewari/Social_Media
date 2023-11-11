import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Home from "./pages/Home";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import React from "react";
import "./App.css"
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="*" element={<Home />} />
        {/* <Route exact path="admin/*" element={<MHome />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
