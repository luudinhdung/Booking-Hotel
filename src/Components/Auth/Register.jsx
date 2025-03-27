import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import classNames from "classnames/bind";
import style from "./Auth.module.scss";

const cx = classNames.bind(style);

const RegisterPage = () => {
  const [data, setData] = useState({});
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState("");
  const [gender, setGender] = useState("");

  async function registerUser(e) {
    e.preventDefault();
    const userData = {
      name,
      email,
      password,
      role,
      gender,
      avatar: avatar || "uploads/61c80a1a32d6acc85e21ec2912c4d847.webp",
    };
    try {
      const res = await axios.post("http://localhost:6060/register", userData);
      setData(res.data);
    } catch (error) {
      console.error("Register error:", error);
    }
  }

  async function handleFileUpload(e) {
    const files = e.target.files;
    const formData = new FormData();
    formData.append("photos", files[0]);
    try {
      const res = await axios.post("http://localhost:6060/avatar", formData);
      setAvatar(res.data);
    } catch (error) {
      console.error("File upload error:", error);
    }
  }

  useEffect(() => {
    if (data.mess) alert(data.mess);
  }, [data]);

  return (
    <div className={cx("container")}>
      <div className={cx("auth-box")}>
        <h1 className={cx("title")}>Register</h1>
        <form className={cx("form")} onSubmit={registerUser}>
          <input
            type="text"
            placeholder="Your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <select value={gender} onChange={(e) => setGender(e.target.value)}>
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            required
          </select>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Your role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            required
          />
          <label className={cx("btn-upload")}>
            Choose Image
            <input type="file" onChange={handleFileUpload} hidden />
          </label>
          {avatar && (
            <img
              className={cx("avatar-preview")}
              src={`http://localhost:6060/${avatar}`}
              alt="Avatar"
            />
          )}
          <button className={cx("btn-submit")} type="submit">
            Register
          </button>
        </form>
        <p className={cx("text-center")}>
          Already a member? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
