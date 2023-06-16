import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import '../MaxCarousel/styles.css';
import './styles.css'
import { CustomLeftArrow, CustomRightArrow } from '../Components';

const GalleryCarousel = ({ item }) => {
  const navigate = useNavigate();
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 0 },
      items: 1
    },              
    // desktop: {
    //   breakpoint: { max: 3000, min: 800 },
    //   items: 4
    // },
    // tablet: {
    //   breakpoint: { max: 800, min: 400 },
    //   items: 3
    // },
    // mobile: {
    //   breakpoint: { max: 400, min: 0 },
    //   items: 2
    // }
  };

  const openItem = (id) => () => {
    navigate(`/item/${id}`);
  }

  useEffect(() => {
    console.log('item1', item);
  }, [item])
  
  return (
    <div className='min-carousel-container my-4'>
      <Carousel responsive={responsive}
      swipeable={true}
      draggable={true}
      ssr={true} // means to render carousel on server-side.
      // showDots={true}
      infinite={true}
      keyBoardControl={true}
      // autoPlaySpeed={1000}
      // transitionDuration={500}
      // customTransition="all .5"
      // removeArrowOnDeviceType={["tablet", "mobile"]}
      containerClass="max-carousel-sub-container"
      dotListClass="custom-dot-list-style"
      // itemClass="carousel-item-padding-100-px"
      className='w-100'
      customLeftArrow={<CustomLeftArrow size='45px' className='min-carousel-left-arrow' />}
      customRightArrow={<CustomRightArrow size='45px' className='min-carousel-right-arrow' />}
      >
      {
        item?.images?.map((item, index) => (
            <div key={index} style={{cursor: 'pointer'}} onClick={openItem(item._id)} className="carousel-card w-100 px-2 d-flex flex-column">
              {/* <img className="w-100 flex-grow-1" src={item.images[0]}/>
              <div className='text-center mt-2 text-black'>{item.title}</div>
              <div className='text-center opacity-75 text-black'>₹{item.discountedPrice}.00</div> */}
            </div>
        ))
      }
      </Carousel>
    </div>
  )
}

export default GalleryCarousel;