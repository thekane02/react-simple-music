import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import SlideList from "./SlideList";
import "./Slider.scss";

const moveBtnClass =
  "flex top-2/4 w-[55px] z-20 h-[55px] cursor-pointer rounded-full absolute -translate-y-2/4 bg-[rgba(255,_255,_255,_0.15)] hover:opacity-90 items-center justify-center";
const Slider = ({ data }) => {
  // const { listSlide } = useSelector(state => state.exploreSlide);
  const timerId = useRef();

  const [firstImage, setFirstImage] = useState(0);
  const [isReverse, setIsReverse] = useState(false);

  const handleNextSlide = () => {
    setFirstImage((prev) => (prev + 1 >= data?.length ? 0 : prev + 1));
    setIsReverse(false);
  };

  const resetSlideLoop = () => {
    clearInterval(timerId.current);
    timerId.current = setInterval(handleNextSlide, 4000);
  };

  const handleClickNext = () => {
    handleNextSlide();
    resetSlideLoop();
  };

  const handleClickPrev = () => {
    setFirstImage((prev) => (prev - 1 < 0 ? data?.length - 1 : prev - 1));
    setIsReverse(true);
    resetSlideLoop();
  };

  useEffect(() => {
    timerId.current = setInterval(handleNextSlide, 4000);

    return () => clearInterval(timerId.current);
    // eslint-disable-next-line
  }, []);

  return (
    <div className="flex overflow-hidden mt-5 relative items-center justify-center min-h-[15.2vw]  perspective-none">
      <div className="h-full">
        <div
          className={`${moveBtnClass} left-[25px]`}
          onClick={handleClickPrev}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={48}
            height={48}
            viewBox="0 0 24 24"
          >
            <path
              fill="white"
              d="M15.41 7.41L14 6l-6 6l6 6l1.41-1.41L10.83 12z"
            />
          </svg>
        </div>
        <div
          className={`${moveBtnClass} right-[25px]`}
          onClick={handleClickNext}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={48}
            height={48}
            viewBox="0 0 24 24"
          >
            <path
              fill="white"
              d="M10 6L8.59 7.41L13.17 12l-4.58 4.59L10 18l6-6z"
            />
          </svg>
        </div>
      </div>
      <SlideList
        listSlide={data}
        firstImage={firstImage}
        isReverse={isReverse}
      ></SlideList>
    </div>
  );
};

export default Slider;
