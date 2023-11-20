import React from "react";
import { useDispatch } from "react-redux";
import { openModal } from "../../store/modalPostActions";
import "./Post.css";
import PostDesign from "./PostDesign";
function Post({ post }) {
  const dispatch = useDispatch();
  const openModalHandler = () => {
    dispatch(openModal(post));
  };
  return (
    <div className="pb-2 pt-2">
      <PostDesign post={post} openModalHandler={openModalHandler} />
    </div>
  );
}

export default Post;
