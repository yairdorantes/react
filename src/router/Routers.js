import { Routes, Route } from "react-router-dom";
import Cards from "../components/Cards";
import Exercises from "../components/Exercises";
import Listening from "../components/Listening";
// import LoginAuth from "../components/LoginAuth";
import LoginPage from "../components/LoginPage";
import Menu from "../components/Menu";
import Session from "../components/Session";
import { AuthProvider } from "../context/AuthContext";

import PrivateRoute from "./PrivateRoute";
import ShortsV2 from "../components/ShortsV2";
import Posts from "../components/Posts";

const Routers = () => {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/signup" element={<LoginPage />}></Route>

        <Route path="/login" element={<Session />}></Route>
        {/* <Route path="/login" element={<LoginAuth />}></Route> */}
        <Route element={<PrivateRoute />}>
          <Route path="/cards" element={<Cards />}></Route>

          <Route path="/exercises" element={<Exercises />}></Route>
          <Route path="/listening" element={<Listening />}></Route>
          <Route path="/shorts" element={<ShortsV2 />}></Route>
          <Route path="/posts" element={<Posts />}></Route>
          <Route path="/" element={<Menu />}></Route>
        </Route>
      </Routes>
    </AuthProvider>
  );
};

export default Routers;
