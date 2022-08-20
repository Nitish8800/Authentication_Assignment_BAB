import React from "react";
import { useEffect, useState } from "react";
import Header from "./Header";
import About from "./About";
import "./Home.css";

const Home = ({ history }) => {
  const [isLogin, setIsLogin] = useState(false);
  useEffect(() => {
    const userInfo = localStorage.getItem("userInfo");

    if (userInfo) {
      history.push("/");
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  }, [history]);

  return (
    <>
      {!isLogin ? (
        <>
          <div className="center_button">
            <div>
              <h2> You Are Not Login</h2>
              <button
                className="_button"
                onClick={() => (window.location.href = "/login")}
              >
                Go to login
              </button>
            </div>
          </div>
        </>
      ) : (
        <div className="container_map" style={{ margin: "100px" }}>
          <h1>HOME</h1>
        </div>
      )}
    </>
  );
};

export default Home;
