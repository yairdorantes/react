import { InView } from "react-intersection-observer";
import { Swiper, SwiperSlide } from "swiper/react";
import { Mousewheel, Pagination, Keyboard } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import left from "../media/left-arrow.png";
import right from "../media/right-arrow.png";

import { useEffect, useState } from "react";
import Loader from "./Loader";

let url = "http://127.0.0.1:8000/api/shortsetV2/";
const ShortsV2 = () => {
  const [show, setShow] = useState(false);
  const [correctAnswer, setCorrectAnswer] = useState("");
  const [answerSelected, setAnswerSelected] = useState();
  const [disabledBtnSendAnswer, setDisabledBtnSendAnswer] = useState(true);
  const [currentVideo, setCurrentVideo] = useState();
  const [shorts, setShorts] = useState([]);
  const [videoIsEnd, setVideoIsEnd] = useState(false);
  const [btnTranscription, setBtnTranscription] = useState(false);
  const [correct, setCorrect] = useState(false);
  const [stop, setStop] = useState(true);
  const fetchAPi = async () => {
    const response = await fetch(url);
    const responseJSON = await response.json();
    setShorts(responseJSON);

    console.log(responseJSON);
  };
  useEffect(() => {
    fetchAPi();
    document.addEventListener("keydown", clicked, true);
  }, []);
  const clicked = (e) => {
    if (e.key === " ") {
      // console.log(currentVideo);
      // currentVideo && currentVideo.pause();
    }
  };

  useEffect(() => {
    console.log(correctAnswer);
  }, [correctAnswer]);

  const handleText = () => {
    show ? setShow(false) : setShow(true);
  };
  const handleChangeRadio = (e) => {
    setAnswerSelected(e.target.value);
  };

  const getValue = () => {
    setBtnTranscription(false);
    console.log(answerSelected, correctAnswer);

    answerSelected == correctAnswer ? setCorrect(true) : alert("fail");
  };

  const advance = () => {
    // const video = document.querySelector("video");
    currentVideo.currentTime = currentVideo.currentTime + 2;
  };
  const goBack = () => {
    ////   const video = document.querySelector("video");
    currentVideo.currentTime = currentVideo.currentTime - 2;
  };
  const PlayBtn = () => {
    currentVideo.paused ? currentVideo.play() : currentVideo.pause();
  };
  const stopc = () => {
    stop ? setStop(false) : setStop(true);
    console.log(stop);
  };

  return (
    <>
      {correct && console.log("correct")}
      <Swiper
        cssMode={true}
        keyboard={true}
        mousewheel={true}
        style={{ height: "100vh" }}
        className="swiper-shorts"
        // pagination={true}
        direction={"vertical"}
        noSwiping={true}
        noSwipingClass={"swiper-slide"}
        // allowTouchMove={false}
        pagination={{ clickable: true }}
        slidesPerView={1}
        spaceBetween={30}
        modules={[Pagination, Mousewheel, Keyboard]}
      >
        {!shorts ? (
          <Loader></Loader>
        ) : (
          shorts.map((short) => {
            return (
              <SwiperSlide key={short.id}>
                <InView
                  os="div"
                  onChange={(inView, entry) => {
                    var video = entry.target.querySelector("video");

                    if (inView) {
                      setCurrentVideo(video);
                      //console.log(currentVideo);
                      video.play().catch((e) => {
                        console.log(e);
                      });

                      short.answers.map((answer) => {
                        answer.is_correct === true &&
                          setCorrectAnswer(answer.id);
                      });

                      video.onended = function (e) {
                        console.log("termino");
                        setVideoIsEnd(true);
                        console.log(e);
                        setBtnTranscription(true);
                        setShow(false);
                        setDisabledBtnSendAnswer(false);
                        //
                        //
                      };
                    } else {
                      video.pause();
                    }
                  }}
                >
                  <div className="container-short">
                    <video
                      onClick={PlayBtn}
                      src={short.short_url}
                      controls
                      // loop
                    ></video>
                    <div>
                      <button
                        disabled={btnTranscription ? true : false}
                        onClick={handleText}
                        className="btn-transcription"
                      >
                        {show ? "hide trasncription" : "show trasncription"}
                      </button>
                      <div className="container-arrows-video">
                        <button
                          // style={{ marginRight: "10px" }}
                          className="btn-control-video"
                          onClick={goBack}
                        >
                          <img style={{ width: "20px" }} src={left} alt="" />
                        </button>
                        <button className="btn-control-video" onClick={advance}>
                          <img style={{ width: "20px" }} src={right} alt="" />
                        </button>
                      </div>
                    </div>

                    <div className="container-text-short">
                      <div>
                        <p
                          className={
                            show
                              ? `transcription-short`
                              : "transcription-short hidden"
                          }
                        >
                          {short.translation}
                        </p>
                        <div
                        // className={
                        //   videoIsEnd
                        //     ? "container-question"
                        //     : "container-question hidden"
                        // }
                        ></div>
                        <h3
                          className={
                            videoIsEnd
                              ? "container-question"
                              : "container-question hidden"
                          }
                        >
                          {short.question}
                        </h3>
                      </div>
                      <br />
                      <div>
                        <div
                          className={
                            videoIsEnd
                              ? "container-answers"
                              : "container-answers hidden"
                          }
                        >
                          {short.answers.map((answer, i) => {
                            return (
                              <label
                                key={answer.id}
                                className="block-radio"
                                htmlFor={answer.id}
                              >
                                <input
                                  className="input-radio"
                                  onChange={handleChangeRadio}
                                  type="radio"
                                  id={answer.id}
                                  name="radio_answet"
                                  value={answer.id}
                                  //  checked={answerSelected[answer.id] || false}
                                />
                                {answer.answer_text}
                              </label>
                            );
                          })}
                        </div>
                        <div className="container-btn-arrows">
                          <div
                            className={
                              videoIsEnd
                                ? "container-btn-send-answer"
                                : "container-btn-send-answer hidden"
                            }
                          >
                            <button
                              disabled={disabledBtnSendAnswer}
                              className="send-answer"
                              onClick={getValue}
                            >
                              send
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* </Modal> */}
                  </div>
                </InView>
              </SwiperSlide>
            );
          })
        )}
      </Swiper>
    </>
  );
};

export default ShortsV2;
