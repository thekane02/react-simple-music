import clsx from "clsx";
import React, { useMemo } from "react";
import "./Slider.scss";
import { Link } from "react-router-dom";

const SlideItem = ({
  slide = {},
  order = 0,
  slideIndex = 0,
  listSlideLength = 0,
  isReverse = false,
}) => {
  const secondSlideIndex = useMemo(() => {
    return slideIndex + 1 >= listSlideLength
      ? slideIndex + 1 - listSlideLength
      : slideIndex + 1;
  }, [slideIndex, listSlideLength]);

  const thirdSlideIndex = useMemo(() => {
    return slideIndex + 2 >= listSlideLength
      ? slideIndex + 2 - listSlideLength
      : slideIndex + 2;
  }, [slideIndex, listSlideLength]);

  const fourthSlideIndex = useMemo(() => {
    return slideIndex + 3 >= listSlideLength
      ? slideIndex + 3 - listSlideLength
      : slideIndex + 3;
  }, [slideIndex, listSlideLength]);
  const fifthSlideIndex = useMemo(() => {
    return slideIndex + 4 >= listSlideLength
      ? slideIndex + 4 - listSlideLength
      : slideIndex + 4;
  }, [slideIndex, listSlideLength]);

  const sixthSlideIndex = useMemo(() => {
    return slideIndex + 5 >= listSlideLength
      ? slideIndex + 5 - listSlideLength
      : slideIndex + 5;
  }, [slideIndex, listSlideLength]);

  return (
    <div
      className={clsx("px-3", "max-w-[33.33%]", "explore__slide-item", {
        prev:
          (order === sixthSlideIndex && !isReverse) ||
          (order === fourthSlideIndex && isReverse),
        next:
          (order === thirdSlideIndex && !isReverse) ||
          (order === slideIndex && isReverse),
        first: order === slideIndex,
        second: order === secondSlideIndex,
        third: order === thirdSlideIndex,
        fourth: order === fourthSlideIndex,
        fifth: order === fifthSlideIndex,
        sixth:
          order !== slideIndex &&
          order !== secondSlideIndex &&
          order !== thirdSlideIndex &&
          order !== fourthSlideIndex &&
          order !== fifthSlideIndex,
      })}
    >
      <div className="row__item-display">
        <Link
          to={`/albums/${slide.id}`}
          className="block explore__slide-img row__item-img pt-[56.25%] rounded-md"
          style={{
            background: `url('${process.env.REACT_APP_API}/file/${slide.coverArtUrl}') no-repeat center center / cover`,
          }}
        ></Link>
      </div>
    </div>
  );
};

export default SlideItem;
