import React from 'react'
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import './styles.css'
import { useNavigate } from 'react-router-dom';
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
      breakpoint: { max: 3000, min: 1024 },
      items: 3
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 3
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 2
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
      containerClass="carousel-container"
      dotListClass="custom-dot-list-style"
      className='max-carousel'
      customLeftArrow={<CustomLeftArrow size='60px' />}
      customRightArrow={<CustomRightArrow size='60px' />}
      >
      {
        categories.map(category => (
            <div key={category._id} onClick={navigateToCollection(category._id)} style={{cursor: 'pointer'}} className="max-collection-card d-flex flex-column">
              <img className="max-collection-image" src={category.image}/>
              {/* <div className="max-collection-overlay">
                <div className="max-collection-card-text-back">
                  <p className="max-collection-card-text">{category.name}</p>
                </div>
                <button onClick={() =>  navigate(`/collection?id=${category._id}`)} className='max-collection-card-button'>View Collection</button>
              </div> */}
              <div className='text-center mt-2 fs-5'>{category.name}</div>
              <div className='text-center opacity-75'>Up to 60% off</div>
            </div>
          
        ))
      }
      </Carousel>
    </div>
  )
}

export default MaxCarousel;