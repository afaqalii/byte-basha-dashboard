import React from "react";
import "./loader.css";

const Spinner = () => {
    return (
      <div className="loading-wrapper sm_spinner">
        <div className="loader-wrap">
          <div
            className={`loader border-[5px] border-white border-t-black`}
          ></div>
        </div>
      </div>
    );
};

export default Spinner;
