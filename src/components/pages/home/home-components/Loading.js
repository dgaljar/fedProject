import React from "react";
import "./Loading.css";

const Loading = () => {
  return (
    <>
      <div className="d-flex my-5 justify-content-center">
        <div className="newtons-cradle">
          <div className="newtons-cradle__dot"></div>
          <div className="newtons-cradle__dot"></div>
          <div className="newtons-cradle__dot"></div>
          <div className="newtons-cradle__dot"></div>
        </div>
      </div>
    </>
  );
};

export default Loading;
