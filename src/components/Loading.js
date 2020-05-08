import React, { useContext } from "react";
import Snaky from "./Snaky";

function Loading(props) {
  return (
    <div className="loading">
      <Snaky />
      <h2>Loading...</h2>
    </div>
  );
}

export default Loading;
