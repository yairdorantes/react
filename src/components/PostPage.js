import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loader from "./Loader";
import { helpHttp } from "../helpers/helpHttp";
import AuthContext from "../context/AuthContext";
let url = "http://127.0.0.1:8000/api/comments/";

const parametros = {
  method: "GET",
  headers: {
    accept: "application/json",
  },
};
let initialComment = {
  author: "",
  text: "",
  created_date: "",
};

const PostPage = () => {
  let { user } = useContext(AuthContext);

  const [post, setPost] = useState();
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");
  const params = useParams();

  const getDate = () => {
    const fecha = new Date();
    const meses = [
      "en",
      "feb",
      "mar",
      "abr",
      "may",
      "jun",
      "jul",
      "agto",
      "sept",
      "oct",
      "nov",
      "dic",
    ];
    let actual =
      fecha.getDate() +
      " " +
      meses[fecha.getMonth()] +
      " " +
      fecha.getUTCFullYear();

    return actual;
  };

  const fetchAPi = async () => {
    let url = `http://127.0.0.1:8000/api/post/${params.id}`;
    const response = await fetch(url, parametros);
    const responseJSON = await response.json();
    setPost(responseJSON.post[0]);
  };

  const fetchComments = async () => {
    let url = `http://127.0.0.1:8000/api/comments/${params.id}`;
    const response = await fetch(url, parametros);
    const responseJSON = await response.json();
    setComments(responseJSON.comments);
    console.log(responseJSON.comments);
  };

  const getCommentContent = (e) => {
    setComment(e.target.value);
    // console.log(e.target.value);
  };

  const sendComment = async () => {
    let options = {
      body: {
        post_id: params.id,
        user_name: user.username,
        comentario: comment,
        date: getDate(),
      },
      headers: { "content-type": "application/json" },
    };
    helpHttp()
      .post(url, options)

      .then((response) => console.log(response));

    let testing = {
      author: user.username,
      text: comment,
      created_date: getDate(),
    };

    comments.push(testing);
    setComments([...comments]);
    console.log(comments);
  };

  useEffect(() => {
    fetchAPi();
    fetchComments();
  }, []);

  return (
    <>
      <div className="container-post-content">
        {!post ? (
          <Loader></Loader>
        ) : (
          <div className="container-post-content">
            <h4>{post.title}</h4>
            <div className="container-post-content-img">
              <img src={post.image_src} alt="" />
            </div>
            <div className="box-text-post">{post.content}</div>

            <section>
              <div className="comment-section">
                <div>comentar como: {user.username}</div>
                <button onClick={sendComment}>jaja</button>
                <textarea
                  name="comment"
                  id="comment"
                  cols="30"
                  rows="10"
                  value={comment}
                  onChange={getCommentContent}
                ></textarea>
              </div>
              <div className="all-commets">
                {comments ? (
                  comments.map((res, id) => {
                    return (
                      <div key={id}>
                        <div>{res.author}</div>
                        <div>{res.created_date}</div>
                        <div className="post-comment">{res.text}</div>
                      </div>
                    );
                  })
                ) : (
                  <div>No commens</div>
                )}
              </div>
            </section>
          </div>
        )}
      </div>
    </>
  );
};

export default PostPage;
