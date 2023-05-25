import React from 'react'
import { Card, Button } from 'react-bootstrap';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import '../MinCarousel/styles.css';

const MinCarousel = ({categories}) => {
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5
    },              
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 4
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 2
    }
  };
  return (
    <div className='carousel-container'>
      <Carousel responsive={responsive}
      swipeable={true}
      draggable={true}
      ssr={true} // means to render carousel on server-side.
      // showDots={true}
      infinite={true}
      keyBoardControl={true}
      autoPlaySpeed={1000}
      transitionDuration={500}
      customTransition="all .5"
      // removeArrowOnDeviceType={["tablet", "mobile"]}
      containerClass="carousel-container"
      dotListClass="custom-dot-list-style"
      // itemClass="carousel-item-padding-100-px"
      className='carousel'
      >
      {
        categories.map(category => (
          
            <div key={category.id} className="collection-card">
              <img className="collection-image" src={category.images[0]}/>
              <div className="collection-overlay">
                <div className="collection-card-text-back">
                  <p className="collection-card-text">{category.name}</p>
                </div>
                <button className='collection-card-button'>View Collection</button>
              </div>
            </div>
          
        ))
      }
      </Carousel>;
    </div>
  )
}

export default MinCarousel;