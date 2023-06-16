import React from 'react';
import { useNavigate } from 'react-router-dom';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import './styles.css'
import { AiFillLeftCircle } from 'react-icons/ai';
import { CustomLeftArrow, CustomRightArrow } from '../Components';

const MaxCarousel = ({categories}) => {
  const navigate = useNavigate()

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5
    },              
    desktop: {
      breakpoint: { max: 3000, min: 800 },
      items: 3
    },
    tablet: {
      breakpoint: { max: 800, min: 400 },
      items: 2
    },
    mobile: {
      breakpoint: { max: 400, min: 0 },
      items: 1
    }
  };

  const navigateToCollection = (categoryId) => () => {
    navigate(`/collection`, {state: {categoryId}})
  }

  return (
    <div id='category-carousel' className='max-carousel-container'>
      <Carousel responsive={responsive}
      swipeable={true}
      draggable={true} 
      ssr={true} // means to render carousel on server-side.
      infinite={true}
      keyBoardControl={true}
      containerClass="max-carousel-sub-container"
      // dotListClass="custom-dot-list-style"
      className='w-100'
      customLeftArrow={<CustomLeftArrow size='50px' className='max-carousel-left-arrow'/>}
      customRightArrow={<CustomRightArrow size='50px' className='max-carousel-right-arrow'/>}
      >
      {
        categories.map(category => (
            <div key={category._id} onClick={navigateToCollection(category._id)} style={{cursor: 'pointer'}} className="carousel-card w-100 px-2 d-flex flex-column">
              <img className="w-100 flex-grow-1" src={category.image}/>
              <div className='text-center mt-2'>{category.name}</div>
              <div className='text-center opacity-75'>Up to 60% off</div>
            </div>
          
        ))
      }
      </Carousel>
    </div>
  )
}

export default MaxCarousel;