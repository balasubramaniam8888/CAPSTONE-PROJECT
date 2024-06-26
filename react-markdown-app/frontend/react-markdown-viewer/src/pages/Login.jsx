import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { SiMarkdown } from "react-icons/si";
import { TfiAngleDoubleLeft, TfiAngleDoubleRight } from "react-icons/tfi";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://capstone-project-yjpg.onrender.com/api/auth/login",
        { username, password }
      );
      localStorage.setItem("token", response.data.token);
      navigate("/documents");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="container border border-black">
      <h2 className="text-center display-4">Login</h2>
      <h3 className="text-center ">
        <TfiAngleDoubleLeft /> <SiMarkdown /> React Markdown FILE Creator{" "}
        <TfiAngleDoubleRight />
      </h3>

      <form onSubmit={handleLogin}>
        <div className="form-group mt-5">
          <input
            type="text"
            placeholder="Enter Your Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="form-control"
            required
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Enter Your Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="form-control"
            required
          />
        </div>
        <div className="text-center">
          <button type="submit" className="btn btn-dark mt-5 w-25">
            Login
          </button>
        </div>
      </form>

      <div className="text-center mt-4">
        <Link to="/register">Register ?.</Link>
      </div>
    </div>
  );
};

export default Login;
