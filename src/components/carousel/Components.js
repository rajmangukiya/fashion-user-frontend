export const CustomLeftArrow = ({ onClick, size, className, ...rest }) => {
  const {
    onMove,
    carouselState: { currentSlide, deviceType }
  } = rest;
  // onMove means if dragging or swiping in progress.
  return <button onClick={onClick} aria-label="Go to previous slide" style={{minHeight: size, minWidth: size}} class={`${className} bg-white shadow react-multiple-carousel__arrow react-multiple-carousel__arrow--left`} type="button" fdprocessedid="4cvbbs"></button>;
};

export const CustomRightArrow = ({ onClick, size, className, ...rest }) => {
  const {
    onMove,
    carouselState: { currentSlide, deviceType }
  } = rest;
  // onMove means if dragging or swiping in progress.
  return <button onClick={onClick} aria-label="Go to previous slide" style={{minHeight: size, minWidth: size}} class={`${className} carousel-right-arrow bg-white shadow react-multiple-carousel__arrow react-multiple-carousel__arrow--right`} type="button" fdprocessedid="4cvbbs"></button>;
};