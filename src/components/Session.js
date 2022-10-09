import React, { useContext, useState } from "react";
import AuthContext from "../context/AuthContext";
const initialForm = {
  username: "",
  //email: "",
  password: "",
};
const Session = () => {
  let { loginUser, logoutUser } = useContext(AuthContext);

  const [form, setForm] = useState(initialForm);
  //const [user, setUser] = useState(null);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleReset = (e) => {
    setForm(initialForm);
  };

  return (
    <>
      <div className="login-form">
        <div className="login-container">
          <form className="form" onSubmit={loginUser}>
            <input
              onChange={handleChange}
              className="parrafo"
              name="username"
              type=""
              placeholder="Email"
              value={form.username}
            />

            <input
              onChange={handleChange}
              className="parrafo"
              name="password"
              placeholder="Password"
              type="password"
              value={form.password}
            />
            <div className="btn-register">
              <button type="submit">Ingresar</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Session;
