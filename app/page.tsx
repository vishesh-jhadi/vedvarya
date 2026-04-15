"use client";

import React, { useState, useEffect, useRef } from "react";
import Header from "@/components/Header";

const App = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoOpacity, setVideoOpacity] = useState(0);

  // Custom Video Loop and Fade Logic
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let frameId: number;
    const fadeDuration = 0.5; // seconds

    const checkVideoTime = () => {
      const currentTime = video.currentTime;
      const duration = video.duration;

      if (duration > 0) {
        // Fade in logic
        if (currentTime < fadeDuration) {
          setVideoOpacity(currentTime / fadeDuration);
        }
        // Fade out logic
        else if (currentTime > duration - fadeDuration) {
          setVideoOpacity((duration - currentTime) / fadeDuration);
        }
        // Full opacity in between
        else {
          setVideoOpacity(1);
        }
      }

      frameId = requestAnimationFrame(checkVideoTime);
    };

    const handleVideoEnd = async () => {
      setVideoOpacity(0);
      video.pause();

      // Wait 100ms as per specification
      await new Promise((resolve) => setTimeout(resolve, 100));

      video.currentTime = 0;
      let playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // Auto-play was prevented
        });
      }
    };

    video.addEventListener("ended", handleVideoEnd);
    frameId = requestAnimationFrame(checkVideoTime);

    return () => {
      cancelAnimationFrame(frameId);
      video.removeEventListener("ended", handleVideoEnd);
    };
  }, []);

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-background text-foreground selection:bg-link/20">
      <Header />

      {/* Hero Section */}
      <main className="relative z-10 flex flex-col items-center justify-center text-center px-6 pb-6 grow pt-[calc(8rem-75px)]">
        <h2 className="animate-fade-rise text-5xl sm:text-7xl md:text-8xl max-w-7xl font-display font-medium leading-[0.95] tracking-[-2.46px] text-muted">
          Beyond <span className="italic text-link">silence,</span> we build{" "}
          <br className="hidden md:block" />
          <span className="italic text-link">the eternal.</span>
        </h2>

        <p className="animate-fade-rise-delay text-base sm:text-lg max-w-2xl mt-8 leading-relaxed font-inter text-muted">
          Building platforms for brilliant minds, fearless makers, and
          thoughtful souls. Through the noise, we craft digital havens for deep
          work and pure flows.
        </p>

        <button className="animate-fade-rise-delay-2 rounded-full px-14 py-5 text-base font-inter mt-12 bg-button text-button-text hover:bg-button-hover hover:scale-[1.03] transition-all duration-300 shadow-lg shadow-black/5">
          Begin Journey
        </button>
      </main>

      {/* Video Background Layer */}
      <div
        className="absolute z-0 w-full pointer-events-none transition-opacity duration-500 ease-in-out inset-x-0 bottom-0 top-[300px]"
        style={{ opacity: videoOpacity }}
      >
        <video
          ref={videoRef}
          autoPlay
          muted
          playsInline
          className="w-full h-full object-cover"
        >
          <source src="/video/homepage video.mp4" type="video/mp4" />
        </video>

        {/* Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background pointer-events-none" />
      </div>
    </div>
  );
};

export default App;
