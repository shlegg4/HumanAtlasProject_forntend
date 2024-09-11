import React, { useEffect, useRef } from 'react';

const ImageWithPoints = ({ imageUrl, points = [] }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const image = new Image();

    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');

      image.src = imageUrl;

      image.onload = () => {
        // Set canvas dimensions to the image's dimensions
        canvas.width = image.width;
        canvas.height = image.height;

        // Draw the image onto the canvas
        ctx.drawImage(image, 0, 0);

        // Draw a circle for each point in the array
        points.forEach(([x, y]) => {
          if (x >= 0 && x <= image.width && y >= 0 && y <= image.height) {
            ctx.strokeStyle = 'red'; // Color for the outline
            ctx.lineWidth = 5; // Thickness of the circle outline
            ctx.beginPath();
            ctx.arc(x, y, 50, 0, 2 * Math.PI); // Draw a circle at the point (radius 50)
            ctx.stroke(); // Outline the circle
          } else {
            console.error(`Point (${x}, ${y}) is outside the image boundaries`);
          }
        });
      };
    }
  }, [imageUrl, points]); // Effect runs when imageUrl or points change

  return (
    <div>
      <canvas ref={canvasRef} />
    </div>
  );
};

export default ImageWithPoints;
