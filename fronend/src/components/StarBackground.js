// src/components/StarBackground.js
import React, { useEffect } from "react";

const StarBackground = () => {
  useEffect(() => {
    const canvas = document.getElementById("global-bg-canvas");
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    const stars = [];
    const numStars = 150;

    for (let i = 0; i < numStars; i++) {
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 1.5 + 0.5,
        alpha: Math.random(),
        dx: (Math.random() - 0.5) * 0.3,
        dy: (Math.random() - 0.5) * 0.3,
      });
    }

    function animate() {
      ctx.clearRect(0, 0, width, height);
      for (let star of stars) {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${star.alpha})`;
        ctx.fill();

        star.x += star.dx;
        star.y += star.dy;

        if (star.x < 0 || star.x > width) star.dx *= -1;
        if (star.y < 0 || star.y > height) star.dy *= -1;

        star.alpha += (Math.random() - 0.5) * 0.02;
        star.alpha = Math.max(0.2, Math.min(1, star.alpha));
      }
      requestAnimationFrame(animate);
    }

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };

    window.addEventListener("resize", handleResize);
    animate();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      id="global-bg-canvas"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: -1,
        width: "100vw",
        height: "100vh",
        backgroundColor: "black", // Important for contrast
        pointerEvents: "none",
      }}
    ></canvas>
  );
};

export default StarBackground;
