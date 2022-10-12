import example from "../media/a4.jpg";
import { useContext, useEffect, useState } from "react";
import Heart from "react-heart";
import hearts from "../media/heart.svg";
import Loader from "./Loader";
import { helpHttp } from "../helpers/helpHttp";
import AuthContext from "../context/AuthContext";

let like = "http://127.0.0.1:8000/api/posts/";
const params = {
  method: "GET",
  headers: {
    accept: "application/json",
  },
};
const Posts = () => {
  let { user } = useContext(AuthContext);
  const [likes, setLikes] = useState([]);
  const [posts, setPosts] = useState();
  const [heartActive, setHeartActive] = useState(false);

  const fetchAPi = async () => {
    let url = `http://127.0.0.1:8000/api/postset/`;
    const response = await fetch(url, params);
    const responseJSON = await response.json();
    setPosts(responseJSON);
    console.log(responseJSON);
  };

  useEffect(() => {
    fetchAPi();
  }, []);

  const giveLike = (value) => {
    let options = {
      body: { is_like: true, id: value.id, user_id: user.user_id },
      headers: { "content-type": "application/json" },
    };
    helpHttp()
      .post(like, options)
      .then((res) => console.log(res));
  };

  return (
    <>
      <div className="container-posts">
        {!posts ? (
          <Loader></Loader>
        ) : (
          posts.map((post) => {
            return (
              <div key={post.id} className="card-post">
                <img
                  className="image-post"
                  src={post.image_src}
                  alt="Avatar"
                  style={{ width: "100%", maxHeight: "100px" }}
                />
                <div className="section-post">{post.categoria.name}</div>
                <div className="container-card-text">
                  <h4>
                    <b>{post.title}</b>
                  </h4>
                </div>
                <div className="like-post">
                  <Heart
                    style={{ width: "20px" }}
                    isActive={heartActive}
                    onClick={() => giveLike(post)}
                  />
                  <div className="number-likes-post">
                    {post.likes_count} likes
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </>
  );
};

export default Posts;
