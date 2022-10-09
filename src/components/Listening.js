import { useEffect, useState } from "react";
import Loader from "./Loader";
const Listening = () => {
  let url = "http://127.0.0.1:8000/api/audios/";
  const [audios, setAudios] = useState();
  const fetchAPi = async () => {
    const params = {
      method: "GET",
      headers: {
        accept: "application/json",
      },
    };

    const response = await fetch(url, params);
    const responseJSON = await response.json();
    setAudios(responseJSON);
    //   console.log(responseJSON.audios.length);
  };
  useEffect(() => {
    fetchAPi();
  }, []);
  return (
    <>
      {!audios ? (
        <Loader></Loader>
      ) : (
        <div className="container-audio">
          <audio controls className="player" src={audios.audios[0].audioSrc}>
            jaja
          </audio>
          <input type="text" placeholder="jaj" />
          {/* <div className="bg-img"></div> */}
        </div>
      )}
    </>
  );
};

export default Listening;
