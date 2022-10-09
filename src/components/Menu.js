import cards from "../media/cardss.png";
import video from "../media/play.png";
import tips from "../media/tips.png";
import { Link } from "react-router-dom";
import AboutUser from "./AboutUser";
// import Confetti from "react-confetti";

const Menu = () => {
  return (
    <>
      {/* <Confetti width={900} height={400}></Confetti> */}
      <div className="bg-menu">
        <AboutUser />
        <div className="container-menu">
          <div>
            <Link to="/cards" className="link">
              <div className="square-background">
                <div className="container-data-menu-option">
                  <div className="container-img-menu">
                    <img className="img-learning-section" src={cards} alt="" />
                  </div>
                  <div className="container-name-section">Cards</div>
                </div>
              </div>
            </Link>
          </div>

          {/* <div>
            <Link to="/listening" className="link">
              <div className="square-background">
                <div className="container-data-menu-option">
                  <div className="container-img-menu2">
                    <img className="img-learning-section" src={listen} alt="" />
                  </div>
                  <div className="container-name-section">Listening</div>
                </div>
              </div>
            </Link>
          </div> */}
          {/* 
          <div>
            <Link to="/exercises" className="link">
              <div className="square-background">
                <div className="container-data-menu-option">
                  <div className="container-img-menu">
                    <img className="img-learning-section" src={note} alt="" />
                  </div>
                  <div className="container-name-section"> Exercises</div>
                </div>
              </div>
            </Link>
          </div> */}

          <div>
            <Link to="/shorts" className="link">
              <div className="square-background">
                <div className="container-data-menu-option">
                  <div className="container-img-menu">
                    <img className="img-learning-section" src={video} alt="" />
                  </div>
                  <div className="container-name-section">Videos</div>
                </div>
              </div>
            </Link>
          </div>

          <div>
            <Link to="/" className="link">
              <div className="square-background">
                <div className="container-data-menu-option">
                  <div className="container-img-menu">
                    <img className="img-learning-section" src={tips} alt="" />
                  </div>
                  <div className="container-name-section">Topics</div>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Menu;
