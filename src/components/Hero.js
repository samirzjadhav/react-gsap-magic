import React, { useRef, useState, useEffect } from "react";
import video1 from "../assets/videos/hero-1.mp4";
import video2 from "../assets/videos/hero-2.mp4";
import video3 from "../assets/videos/hero-3.mp4";
import video4 from "../assets/videos/hero-4.mp4";
import Button from "./Button";
import { TiLocationArrow } from "react-icons/ti";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const [currentIndex, setCurrentIndex] = useState(0); // Start from the first video
  const [hasClicked, setHasClicked] = useState(false);
  const [loadedVideo, setLoadedVideo] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const videoRefs = [video1, video2, video3, video4];
  const totalVideos = videoRefs.length;
  const nextVideoRef = useRef(null);

  const handleVidoeLoad = () => {
    setLoadedVideo((prev) => prev + 1);
  };

  const upcommingVideoIndex = (currentIndex + 1) % totalVideos;

  const handleMiniVdClick = () => {
    setHasClicked(true);

    setCurrentIndex(upcommingVideoIndex);
  };

  useGSAP(
    () => {
      if (hasClicked) {
        gsap.set("#next-video", { visibility: "visible" });
        gsap.to("#next-video", {
          transformOrigin: "center center",
          scale: 1,
          width: "100%",
          height: "100%",
          duration: 1,
          ease: "power1.inOut",
          onStart: () => nextVideoRef.current.play(),
        });
        gsap.from("#current-video", {
          transformOrigin: "center center",
          scale: 0,
          duration: 1.5,
          ease: "power1.inOut",
        });
      }
    },
    {
      dependencies: [currentIndex],
      revertOnUpdate: true,
    }
  );

  useEffect(() => {
    const videoFrame = document.querySelector("#video-frame");
    if (videoFrame) {
      gsap.set(videoFrame, {
        clipPath: "polygon(14% 0, 72% 0, 88% 90%, 0 95%)",
        borderRadius: "0% 0% 40% 10%",
      });

      gsap.from(videoFrame, {
        clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
        borderRadius: "0% 0% 0% 0%",
        duration: 2,
        ease: "power1.inOut",
        scrollTrigger: {
          trigger: videoFrame,
          start: "top center", // Adjust as needed
          end: "bottom center",
          scrub: true,
        },
      });
    } else {
      console.error("#video-frame not found!");
    }
  }, []);

  // useGSAP(() => {
  //   gsap.set("#video-frame", {
  //     clipPath: "polygon(14% 0, 72% 0, 88% 90%, 0 95%)",
  //     borderRadius: "0 0 40% 10%",
  //   });

  //   gsap.from("#video-frame", {
  //     clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
  //     borderRadius: "0% 0% 0% 0%",
  //     duration: 2,
  //     ease: "power1.inOut",
  //     scrollTrigger: {
  //       trigger: "#video-frame",
  //       start: "center center",
  //       end: "bottom center",
  //       scrub: true,
  //     },
  //   });
  // });

  // console.log("GSAP version:", gsap.version);
  // console.log("ScrollTrigger registered:", gsap.plugins?.ScrollTrigger);

  return (
    <div className="relative h-dvh w-screen overflow-x-hidden">
      <div
        id="video-frame"
        className="relative z-10 h-dvh w-screen overflow-hidden rounded-lg bg-blue-75"
      >
        <div className="">
          <div className="mask-clip-path absolute-center absolute z-50 size-64 cursor-pointer overflow-hidden rounded-lg">
            <div
              className="origin-center scale-50 opacity-0 transition-all  duration-500 ease-in hover:scale-100 hover:opacity-100"
              onClick={handleMiniVdClick}
            >
              <video
                ref={nextVideoRef}
                src={videoRefs[upcommingVideoIndex]} // Get the video dynamically based on currentIndex
                loop
                muted
                autoPlay
                type="video/mp4"
                id="current-video"
                className="size-64 object-cover object-center scale-150 "
                onError={() => console.error("Video failed to load")}
                onLoadedData={handleVidoeLoad}
              />
            </div>
          </div>
          <video
            src={videoRefs[currentIndex]}
            ref={nextVideoRef}
            loop
            muted
            id="next-video"
            className=" absolute-center invisible absolute z-20 size-64 object-cover object-center"
            onLoadedData={handleVidoeLoad}
          />
          <video
            src={videoRefs[currentIndex === totalVideos + 1 ? 1 : currentIndex]}
            autoPlay
            loop
            muted
            className="absolute left-0 right-0 z-10 size-full object-cover object-center"
            onLoadedData={handleVidoeLoad}
          />
        </div>

        <h1 className="special-font hero-heading absolute bottom-5 right-5 z-40 text-blue-75 uppercase">
          G<b>a</b>Ming
        </h1>
        <div className="absolute left-0 top-0 z-40 size-full">
          <div className="mt-24 px-5 sm:px-10">
            <h1 className="special-font hero-heading text-blue-100 uppercase">
              redefi<b>n</b>e
            </h1>
            <p className="mb-5 max-w-64 font-robert-regular text-blue-100">
              Enter the Metagame Layer <br /> Unleash the Play Economy
            </p>
            <Button
              id="watch-trailer"
              title="Watch Trailer"
              leftIcon={<TiLocationArrow />}
              containerClass="!bg-yellow-300 flex-center gap-1"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
