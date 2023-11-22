import React from "react";
import { useDispatch } from "react-redux";
import { openModalPost } from "../../store/modalPostActions";
import { openModalPostShare } from "../../store/modalPostShareActions";
import "./Post.css";
import PostDesign from "./PostDesign";
function Post({ post }) {
  const dispatch = useDispatch();
  const openModalPostHandler = () =>
  {
    dispatch(openModalPost(post));
  };
  const openModalShareHandler = () =>
  {
    dispatch(openModalPostShare(post));
  };
  return (
    <div className="pb-2 pt-2">
      <PostDesign
        post={post}
        openModalPostHandler={openModalPostHandler}
        openModalShareHandler={openModalShareHandler}
      />
    </div>
  );
}

export default Post;
