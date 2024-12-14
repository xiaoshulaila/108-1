// src/components/Carousel.tsx
import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

// 轮播图数据配置
const SLIDES = [
  {
    image: 'https://pbs.twimg.com/profile_banners/1575736068103864321/1666957555', // 替换为你的第一张图片URL
    link: 'http://108.2cdy.com'  // 替换为你的第一个链接
  },
  {
    image: 'https://pbs.twimg.com/media/FgXmDKNWYAIlV1n?format=png', // 替换为你的第二张图片URL 
    link: 'http://108.2cdy.com'  // 替换为你的第二个链接
  },
  {
    image: 'https://pbs.twimg.com/profile_banners/1575736068103864321/1666957555', // 替换为你的第三张图片URL
    link: 'http://108.2cdy.com'  // 替换为你的第三个链接
  }
];

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % SLIDES.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % SLIDES.length);
  };

  return (
    <div className="relative rounded-lg overflow-hidden group">
      {/* Images with Link */}
      <div className="relative h-48 md:h-64">
        {SLIDES.map((slide, index) => (
          <a
            key={index}
            href={slide.link}
            target="_blank"
            rel="noopener noreferrer"
            className={`absolute w-full h-full transition-opacity duration-500 ${
              index === currentIndex ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img
              src={slide.image}
              alt={`Slide ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </a>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={goToPrevious}
        className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
      >
        <ChevronLeft className="text-white" size={24} />
      </button>
      <button
        onClick={goToNext}
        className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
      >
        <ChevronRight className="text-white" size={24} />
      </button>

      {/* Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {SLIDES.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-2 h-2 rounded-full transition-all ${
              index === currentIndex
                ? 'bg-binance-yellow w-4'
                : 'bg-white/50 hover:bg-white/80'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;
