import React from "react";
import SideBar from "../../components/SideBar";
import Widgets from "../../components/Widgets";
import "./Index.css";
import Feed from "../../components/Feed";
import PostUpload from "../../components/PostUpload";

function Index() {
  return (
    <div className="index-page">
      <div id="side-bar">
        <SideBar />
      </div>
      <div id="feed">
        <PostUpload />
        <Feed />
      </div>
      <div id="widgets">
        <Widgets />
      </div>
    </div>
  );
}

export default Index;
