import React from "react";
import Comments from "../comments/Comments";
import AdjBox from "../adjBox/adjBox";

function Main() {
  return (
  <div>Main
    <AdjBox title='Trending Social'/>
    <Comments currentUserId="1"/>

  </div>
  );
}

export default Main;
