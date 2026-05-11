import React from "react";
import "./loading.css";

const Loading = () => {
  return (
    <div className="relative flex items-center justify-center min-h-screen overflow-hidden">
      {/* Blurred Background */}
      {/* <div className="absolute inset-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"></div> */}

      {/* Content */}
      <div className="relative z-10 flex items-center justify-center">
        <span className="loader"></span>
      </div>
    </div>
  );
};

export default Loading;
