import React, { useEffect, useRef } from "react";
import gsap from "gsap";

const AnimatedTitle = ({ title, containerClass }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const titleAnimation = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "100 bottom",
          end: "center bottom",
          toggleAction: "play none none reverse",
        },
      });
      titleAnimation.to(".animated-word", {
        opacity: 1,
        transform: " translate3d(0,0,0) rotateY(0deg), ratateX(0deg)",
        ease: "power2.inOut",
        stagger: 0.002,
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div>
      <div className={`animated-title ${containerClass}`}>
        {title.split("<br/>").map((line, index) => {
          <div
            className="flex-center max-w-full flex-wrap gap-2 md:gap-3"
            key={index}
          >
            {line.split(" ").map((word, i) => (
              <span
                key={i}
                className="animated-word"
                dangerouslySetInnerHTML={{ __html: word }}
              ></span>
            ))}
          </div>;
        })}
      </div>
    </div>
  );
};

export default AnimatedTitle;
