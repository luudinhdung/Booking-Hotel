import axios from "axios";
import { Link, Navigate } from "react-router-dom";
import { useContext, useState } from "react";
import classNames from "classnames/bind";
import style from "./Auth.module.scss";
import { UserContext } from "../User/User";

const cx = classNames.bind(style);

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const { setUser } = useContext(UserContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("http://localhost:6060/login", {
        email,
        password,
      });
      setUser(data.user);
      alert(data.mess);
      if (data.mess === "Đăng nhập thành công") {
        setRedirect(true);
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Có lỗi xảy ra, vui lòng thử lại!");
    }
  };

  if (redirect) {
    return <Navigate to="/" />;
  }

  return (
    <div className={cx("container")}>
      <div className={cx("auth-box")}>
        <h1 className={cx("title")}>Login</h1>
        <form className={cx("form")} onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button className={cx("btn-submit")} type="submit">
            Login
          </button>
        </form>
        <p className={cx("text-center")}>
          Don't have an account? <Link to="/register">Register</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
