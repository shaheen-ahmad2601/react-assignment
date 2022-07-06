import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { addlogin } from "./action";

export const Login = () => {
  let dispatch = useDispatch();
  let loginstore = useSelector((store) => store.login.login);
  console.log(loginstore);

  let navigate = useNavigate();

  let [loginstate, setlogin] = useState({
    password: "",
    username: "",
  });

  let handleLogin = (e) => {
    const { name, value } = e.target;
    setlogin({
      ...loginstate,
      [name]: value,
    });
  };

  let login = async (e) => {
    e.preventDefault();
    try {
      let res = await fetch(
        "https://masai-api-mocker.herokuapp.com/auth/login",
        {
          method: "POST",
          body: JSON.stringify(loginstate),
          headers: {
            Accept: "application/json",
            "content-type": "application/json",
          },
        }
      );
      let data = await res.json();
      if (data.error === false) {
        getuser(loginstate.username, data.token);
        navigate("/dashboard");
      } else {
        alert("Login details are wrong");
      }
    } catch (error) {
      console.log(error);
    }
  };

  let getuser = async (username, token) => {
    try {
      let res = await fetch(
        `https://masai-api-mocker.herokuapp.com/user/${username}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      var data = await res.json();

      dispatch(addlogin(data));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <form action="" onSubmit={login}>
        <input
          type="text"
          value={loginstate.username}
          onChange={handleLogin}
          required={true}
          placeholder="Username"
          name="username"
        />
        <br />
        <input
          type="password"
          value={loginstate.password}
          onChange={handleLogin}
          required={true}
          placeholder="password"
          name="password"
        />
        <br />
        <input type="submit" name="Submit" id="" />
      </form>
    </div>
  );
};
