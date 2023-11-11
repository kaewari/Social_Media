import React from "react";
import SideBar from "../../components/SideBar";
import Widgets from "../../components/Widgets";
import "./Index.css";
import Feed from "../../components/Feed";

function Index() {
  return (
    <div className="index-page d-flex">
      <div id="side-bar">
        <SideBar />
      </div>
      <div id="feed">
        <Feed />
      </div>
      <div id="widgets">
        <Widgets />
      </div>
    </div>
  );
}

export default Index;
