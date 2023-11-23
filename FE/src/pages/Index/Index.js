import React from "react";
import Feed from "../../components/Feed/Feed";
import PostUpload from "../../components/PostUpload/PostUpload";
import SideBar from "../../components/SideBar/SideBar";
import Widgets from "../../components/Widget/Widgets";
import "./Index.css";

function Index() {
  return (
    <div id="index-page">
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
