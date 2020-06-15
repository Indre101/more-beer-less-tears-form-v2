// Logo Animation Lottie
import React, { useRef, useEffect } from "react";
import animationData from "../assets/lotti/data08.json";
import lottie from "lottie-web";
import "../sass/partials/components/_preloader.scss";

export default React.memo(function Preloader(props) {
  useEffect(() => {
    const animation = lottie.loadAnimation({
      container: container.current,
      renderer: "svg",
      loop: true,
      autoplay: false,
      animationData: animationData,
      rendererSettings: {
        id: "lottie-anim-element",
      },
    });
    animation.play();
  }, []);

  const container = useRef();
  const preloaderContainer = useRef();
  return (
    <div className="preloaderContainer" ref={preloaderContainer}>
      <div
        id="preloader"
        className="preloader"
        ref={container}
        onAnimationEnd={() => {
          preloaderContainer.current.style.display = "none";
          props.setpreloaderPlayed(true);
        }}></div>
    </div>
  );
});
