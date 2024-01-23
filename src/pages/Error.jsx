import React from "react";
import { Link } from "react-router-dom";
import ErrorWrapper from "../assets/wrappers/ErrorPage";
import img from "../assets/images/not-found.svg";

function Error() {
  return (
    <ErrorWrapper className="full-page">
      <div>
        <img src={img} alt="not found" />
        <h3>text</h3>
        <p>text</p>
        <Link to="/">back home</Link>
      </div>
    </ErrorWrapper>
  );
}

export default Error;
