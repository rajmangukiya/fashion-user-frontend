import React from 'react';
import { useNavigate } from 'react-router-dom';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import '../MinCarousel/styles.css';

const MinCarousel = ({categories}) => {
  const navigate = useNavigate;
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

  const openItem = (id) => () => {
    navigate(`/item/${id}`);
  }

  return (
    <div className='min-carousel-container'>
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
      className='min-carousel'
      >
      {
        categories.map(category => (
            <div key={category.id} onClick={openItem(category._id)} className="min-collection-card">
              <img className="min-collection-image" src={category.images[0]}/>
              <div className="min-collection-overlay">
                <div className="min-collection-card-text-back">
                  <p className="min-collection-card-text">{category.name} and {category._id}</p>
                </div>
                <button className='min-collection-card-button'>View Collection</button>
              </div>
            </div>
        ))
      }
      </Carousel>
    </div>
  )
}

export default MinCarousel;