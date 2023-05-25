import React, { useRef, useState } from "react";

function MyCarousel() {
  const carouselRef = useRef(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleNextSlide = () => {
    const carousel = carouselRef.current;
    const slideCount = carousel.children.length;
    const nextSlide = (currentSlide + 1) % slideCount;
    setCurrentSlide(nextSlide);
  };

  const handlePrevSlide = () => {
    const carousel = carouselRef.current;
    const slideCount = carousel.children.length;
    const prevSlide = (currentSlide - 1 + slideCount) % slideCount;
    setCurrentSlide(prevSlide);
  };

  return (
    <div className="carousel">
      <div className="carousel-inner" ref={carouselRef}>
        <div className={`carousel-slide ${currentSlide === 0 ? "active" : ""}`}>
          <img
            src="https://cdn.shopify.com/s/files/1/0574/2546/1430/articles/strapguide_Longine_Skin_Diver.jpg?v=1662541878"
            alt="Slide 1"
          />
        </div>
        <div className={`carousel-slide ${currentSlide === 1 ? "active" : ""}`}>
          <img
            src="https://example.com/slide2.jpghttps://www.mrporter.com/cms/ycm/resource/blob/371756/b09605cee9870153a69451cf39e6f964/137d350c-9e97-44d3-a4a5-44bb547c3fa4-data.jpg"
            alt="Slide 2"
          />
        </div>
        <div className={`carousel-slide ${currentSlide === 2 ? "active" : ""}`}>
          <img src="https://example.com/slide3.jpg" alt="Slide 3" />
        </div>
      </div>
      <button className="carousel-btn prev" onClick={handlePrevSlide}>
        Prev
      </button>
      <button className="carousel-btn next" onClick={handleNextSlide}>
        Next
      </button>
    </div>
  );
}

export default MyCarousel;
