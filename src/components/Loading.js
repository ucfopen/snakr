import React, { useContext } from "react";
import Snaky from "./Snaky";

function Loading(props) {
  return (
    <div className="loading">
      <h2>Loading...</h2>
      <Snaky />
    </div>
  );
}

export default Loading;
