import "./singlePost.css";
import send from "../media/send.png";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loader from "./Loader";
import { helpHttp } from "../helpers/helpHttp";
import AuthContext from "../context/AuthContext";
import { InView } from "react-intersection-observer";
let url = "http://127.0.0.1:8000/api/comments/";
const parametros = {
  method: "GET",
  headers: {
    accept: "application/json",
  },
};

const PostPage = () => {
  let { user } = useContext(AuthContext);

  const [post, setPost] = useState();
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");
  const params = useParams();
  const [fetchedComments, setFetchedComments] = useState(false);

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
    setFetchedComments(true); //
  };

  const getCommentContent = (e) => {
    setComment(e.target.value);
    // console.log(e.target.value);
  };

  const sendComment = () => {
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
    // console.log(comments);
    comments.unshift(testing);
    setComments([...comments]);
    setComment("");
    console.log(comments);
  };

  useEffect(() => {
    fetchAPi();
  }, []);

  return (
    <>
      <div className="container-post-content">
        {!post ? (
          <Loader></Loader>
        ) : (
          <div className="post-content">
            <h1 className="title-post">{post.title}</h1>
            <div className="box-image-post">
              <img className="image-single-post" src={post.image_src} />
            </div>

            <div className="box-text-post">{post.content}</div>
            <section>
              <InView
                as="div"
                onChange={(inView) => {
                  inView && !fetchedComments && fetchComments();
                }}
              >
                <div className="comment-section">
                  <input
                    autoComplete="off"
                    className="comment-input"
                    placeholder={`Si puedes aportar algo más, coméntalo!...`}
                    name="comment"
                    id="comment"
                    // cols="30"
                    // rows="10"
                    value={comment}
                    onChange={getCommentContent}
                  ></input>
                  <img
                    onClick={sendComment}
                    className={
                      comment.length > 0
                        ? "btn-send-comment"
                        : "btn-send-comment hidden"
                    }
                    src={send}
                    alt=""
                  />
                </div>

                <div className="all-commets">
                  {comments.length > 0 ? (
                    comments.map((res, id) => {
                      return (
                        <div className="lone-comment" key={id}>
                          <div className="author-comment">
                            {res.author}{" "}
                            <span className="date-comment">
                              {" "}
                              {res.created_date}
                            </span>
                          </div>
                          <div className="post-comment">{res.text}</div>
                        </div>
                      );
                    })
                  ) : (
                    <div>No commens</div>
                  )}
                </div>
              </InView>
            </section>
          </div>
        )}
      </div>
    </>
  );
};

export default PostPage;
