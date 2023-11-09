import React from "react";
import SlideItem from "./SlideItem";

const SlideList = ({ listSlide = [], firstImage = 0, isReverse = false }) => {
  return (
    <>
      {listSlide.map((slide, index) => (
        <SlideItem
          key={index}
          slide={slide}
          order={index}
          slideIndex={firstImage}
          listSlideLength={listSlide.length}
          isReverse={isReverse}
        />
      ))}
    </>
  );
};

export default SlideList;
