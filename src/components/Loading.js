import React, { useEffect, useState } from "react";
import Lottie from "react-lottie-player";
import animationData from "../assets/connection.json";

export default function Loading(isLoading) {
  const [segmentFrom, setSegmentFrom] = useState(false ? 40 : 0);
  const [segmentTo, setSegmentTo] = useState(false ? 70 : 30);
  const segments = [segmentFrom, segmentTo];
  const [speed, setSpeed] = useState(0.3);

  //   useEffect(() => {
  //       setSegmentFrom(isLoading ? 40: 0);
  //       setSegmentTo(isLoading ? 30 : 40)
  //   }, [])
  return (
    <div>
      <Lottie
        loop
        animationData={animationData}
        play
        style={{ width: 400, height: 400 }}
        segments={segments}
        speed={speed}
      />
    </div>
  );
}
