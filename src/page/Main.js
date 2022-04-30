import React, { useState, useCallback, useEffect } from "react";
import { KakaoMap } from "../components/KakaoMap";


const Main = () => {

  return (
    <>
      <div>
        <KakaoMap
          width="800px"
          height="800px"
          margin="10px auto"
        />
      </div>
    </>
  );
};

export default Main;
