import React, { useRef, useState } from "react";
import video1 from "../assets/videos/hero-1.mp4";
import video2 from "../assets/videos/hero-2.mp4";
import video3 from "../assets/videos/hero-3.mp4";
import video4 from "../assets/videos/hero-4.mp4";

const Hero = () => {
  const [currentIndex, setCurrentIndex] = useState(0); // Start from the first video
  const [hasClicked, setHasClicked] = useState(false);

  const videoRefs = [video1, video2, video3, video4];

  const handleMiniVdClick = () => {
    setHasClicked(true);

    // Increment the video index, loop back to 0 if the index exceeds the length
    setCurrentIndex((prevIndex) => (prevIndex + 1) % videoRefs.length);
  };

  return (
    <div className="relative h-dvh w-screen overflow-x-hidden">
      <div
        id="video-frame"
        className="relative z-10 h-dvh w-screen overflow-hidden rounded-lg bg-blue-75"
      >
        <div className="mask-clip-path absolute-center absolute z-50 size-64 cursor-pointer overflow-hidden rounded-lg">
          <div
            className={`origin-center transition-all ${
              hasClicked ? "opacity-100 scale-100" : "opacity-0 scale-50"
            }`}
            onClick={handleMiniVdClick}
          >
            <video
              src={videoRefs[currentIndex]} // Get the video dynamically based on currentIndex
              loop
              muted
              autoPlay
              type="video/mp4"
              id="current-video"
              className="size-64 object-cover object-center"
              onError={() => console.error("Video failed to load")}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
