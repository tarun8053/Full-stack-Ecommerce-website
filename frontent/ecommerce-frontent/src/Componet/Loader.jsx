
import React from "react";
import "../App.css";

const Loader = () => {
  return (
    <div className="loader-wrapper">
      <div className="loader">
        <div className="ring"></div>
        <p>Loading...</p>
      </div>
    </div>
  );
};

export default Loader;

