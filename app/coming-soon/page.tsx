"use client";

import Link from "next/link";
import React, { useState, useEffect, useRef } from "react";

const ComingSoon = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoOpacity, setVideoOpacity] = useState(0);

  // Target date for 2 weeks from "now" (Assuming April 25, 2026 + 14 days)
  const targetDate = new Date("2026-05-09T00:00:00");

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Initial calculation to prevent jump
    const calcTime = () => {
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();

      if (difference <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };

      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    };

    setTimeLeft(calcTime());

    const interval = setInterval(() => {
      setTimeLeft(calcTime());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Custom Video Loop and Fade Logic (Matching Home Page)
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
      {/* Main Content Section */}
      <main className="relative z-10 flex flex-col items-center justify-center text-center px-6 min-h-screen">
        {/* Logo Replacement */}
        <img
          src="/logo without element.svg"
          alt="Vedvarya Logo"
          className="animate-fade-rise w-48 sm:w-64 md:w-80 mb-12 brightness-[0.4]"
        />

        {/* Coming Soon Text */}
        <h2 className="animate-fade-rise-delay text-5xl sm:text-7xl md:text-8xl max-w-7xl font-display font-medium leading-[0.95] tracking-[-2.46px] text-muted">
          Coming Soon
        </h2>

        {/* Countdown Timer */}
        <div className="animate-fade-rise-delay mt-14 bg-white rounded-2xl p-4 flex items-center justify-center space-x-6 sm:space-x-12">
          {Object.entries(timeLeft).map(([unit, value]) => (
            <div
              key={unit}
              className="flex flex-col pr-6 last:pr-0 border-r border-gray-200 last:border-r-0 items-center min-w-[70px]"
            >
              <span className="text-5xl sm:text-7xl font-display font-medium text-heading">
                {mounted ? String(value).padStart(2, "0") : "00"}
              </span>
              <span className="text-xs sm:text-sm font-inter text-muted uppercase tracking-widest mt-3">
                {unit}
              </span>
            </div>
          ))}
        </div>

        {/* Button */}
        <Link
          href="/"
          className="animate-fade-rise-delay-2 mt-16 rounded-full px-14 py-5 text-base font-inter bg-button text-button-text hover:bg-button-hover hover:scale-[1.03] transition-all duration-300 shadow-lg shadow-black/5"
        >
          Order now
        </Link>
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

export default ComingSoon;
