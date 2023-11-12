import React, { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { authApi, endpoint } from "../apis/Apis";
import "./Feed.css";
import Post from "./Post";
import SpinnerLoading from "./SpinnerLoading";

function Feed() {
  const [q] = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const [posts, setPosts] = useState([]);
  const postRef = useRef([]);
  const hasMore = useRef(false);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState("");
  const lastPostId = useRef("");
  const kw = q.get("kw");
  useEffect(() => {
    const abortController = new AbortController();
    setIsLoading(true);
    const get_posts = async () => {
      await authApi()
        .get(endpoint["posts"], {
          signal: abortController.signal,
        })
        .then((res) => {
          const new_posts = res.data.posts;
          const new_state = new_posts.map((post) => {
            return post;
          });
          setPosts(new_state);
          hasMore.current = !!res.data.hasMore;
          lastPostId.current = new_posts[new_posts.length - 1]._id;
        })
        .catch((err) => {
          setIsError(true);
          setError(err.message);
        })
        .finally(() => {
          setIsLoading(false);
          abortController.abort();
        });
    };
    get_posts();
    // return () => {};
  }, [kw]);
  // useEffect(() => {
  //   window.addEventListener("scroll", () => {
  //     const abortController = new AbortController();
  //     const { scrollHeight, scrollTop, clientHeight } =
  //       document.documentElement;
  //     if (clientHeight + scrollTop >= scrollHeight - 10) {
  //       setIsLoading(true);
  //       const process = async () => {
  //         console.log(posts);
  //         // await authApi()
  //         //   .get(endpoint["posts"] + "?lastPostId=" + lastPostId, {
  //         //     signal: abortController.signal,
  //         //   })
  //         //   .then((res) => {
  //         //     // const result = res.filter((photo) => {
  //         //     //   return kw && photo && photo.title.toLowerCase().includes(kw);
  //         //     // });
  //         //     hasMore.current(!!res.data.hasMore);
  //         //     lastPostId.current(posts[posts.current.length - 1]._id);
  //         //   })
  //         //   .catch((err) => {
  //         //     setIsError(true);
  //         //     setError(err.message);
  //         //   })
  //         //   .finally(() => {
  //         //     setIsLoading(false);
  //         //     abortController.abort();
  //         //   });
  //       };
  //       process();
  //     }
  //   });
  // }, [lastPostId]);

  return (
    <div className="feed">
      {isLoading ? (
        <SpinnerLoading />
      ) : posts && posts.length > 0 ? (
        posts.map((post, key) => <Post key={key} post={post} />)
      ) : (
        <h5 className="text-center text-danger fst-italic opacity-75">
          No content found
        </h5>
      )}
    </div>
  );
}

export default Feed;
