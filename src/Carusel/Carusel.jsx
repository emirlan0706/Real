import React, { useState, useEffect } from "react";

const Carousel = ({ slides, backgrounds }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentBackground, setCurrentBackground] = useState(0);

  const prevSlide = () => {
    setCurrentSlide((prevSlide) =>
      prevSlide === 0 ? slides.length - 1 : prevSlide - 1
    );
    setCurrentBackground((prevBackground) =>
      prevBackground === 0 ? backgrounds.length - 1 : prevBackground - 1
    );
  };

  const nextSlide = () => {
    setCurrentSlide((prevSlide) =>
      prevSlide === slides.length - 1 ? 0 : prevSlide + 1
    );
    setCurrentBackground((prevBackground) =>
      prevBackground === backgrounds.length - 1 ? 0 : prevBackground + 1
    );
  };

  useEffect(() => {
    const slideInterval = setInterval(() => {
      nextSlide();
    }, 6000);

    return () => {
      clearInterval(slideInterval);
    };
  }, [slides.length, backgrounds.length]);

  useEffect(() => {
    document.body.style.transition = "background-color 0.5s ease";
    document.body.style.backgroundColor = backgrounds[currentBackground];

    return () => {
      document.body.style.transition = "";
      document.body.style.backgroundColor = "";
    };
  }, [currentBackground, backgrounds]);

  return (
    <div className="carousel">
      <div
        className="carousel__slides"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {slides.map((slide, index) => (
          <div className="carousel__slide" key={index}>
            <img src={slide.image} alt={`Slide ${index + 1}`} />
          </div>
        ))}
      </div>
      <button
        className="carousel__control carousel__control_prev"
        onClick={prevSlide}
      >
        &lt;
      </button>
      <button
        className="carousel__control carousel__control_next"
        onClick={nextSlide}
      >
        &gt;
      </button>
    </div>
  );
};

export default Carousel;
