import React from "react";
import { ThreeDots } from "react-loader-spinner";

function BotTypingSpinner() {
  return (
    <ThreeDots
      height="30"
      width="30"
      color="#ffffff"
      ariaLabel="three-dots-loading"
      visible={true}
    />
  );
}

export default BotTypingSpinner;
