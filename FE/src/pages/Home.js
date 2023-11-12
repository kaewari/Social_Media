import React from "react";
import { Outlet, Route, Routes } from "react-router-dom";
import Header from "../layouts/Header";
import BookMark from "./BookMark/BookMark";
import Friend from "./Friend";
import Index from "./Index/Index";
import Login from "./Login/Login";
import Message from "./Message";
import Profile from "./Profile/Profile";
import Register from "./Register/Register";
import Video from "./Video";
import Group from "../components/Group";
import Shop from "../components/Shop";
import Notification from "../components/Notification";

function Home() {
  const Layout = () => {
    return (
      <>
        <Header />
        <Outlet />
      </>
    );
  };
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={<Layout />}>
          <Route index element={<Index />} />
          <Route path="/friend" element={<Friend />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/video" element={<Video />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/group" element={<Group />} />
          <Route path="/book-mark" element={<BookMark />} />
        </Route>
      </Routes>
    </>
  );
}

export default Home;
