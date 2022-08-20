import React from "react";
import { useEffect } from "react";

const Home = ({ history }) => {
  useEffect(() => {
    const userInfo = localStorage.getItem("userInfo");

    if (userInfo) {
      history.push("/");
    }
  }, [history]);

  return (
    <>
      <div style={{ margin: "100px" }}>
        <h1>Home</h1>
      </div>
    </>
  );
};

export default Home;
