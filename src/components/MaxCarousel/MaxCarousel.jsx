import React from 'react'
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import '../MaxCarousel/styles.css'

const MaxCarousel = ({categories}) => {
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

  return (
    <div className='max-carousel-container'>
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
      containerClass="carousel-container"
      dotListClass="custom-dot-list-style"
      // itemClass="carousel-item-padding-100-px"
      className='max-carousel'
      >
      {
        categories.map(category => (
          
            <div key={category.id} className="max-collection-card">
              <img className="max-collection-image" src={category.image}/>
              <div className="max-collection-overlay">
                <div className="max-collection-card-text-back">
                  <p className="max-collection-card-text">{category.name}</p>
                </div>
                <button className='max-collection-card-button'>View Collection</button>
              </div>
            </div>
          
        ))
      }
      </Carousel>;
    </div>
  )
}

export default MaxCarousel;


// import React from 'react';
// import Carousel from 'react-bootstrap/Carousel';

// const MaxCarousel = () => {
//   return (
//     <div>
//         <Carousel>
//           <Carousel.Item>
//             <div className="d-flex">
//               <div className="carousel-item">
//                 <Carousel.Caption>
//                   <h3>Third slide label</h3>
//                   <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
//                 </Carousel.Caption>
//               </div>
//               <div className="carousel-item">
//                 <Carousel.Caption>
//                   <h3>Third slide label</h3>
//                   <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
//                 </Carousel.Caption>
//               </div>
//               <div className="carousel-item">
                
//                 <Carousel.Caption>
//                   <h3>Third slide label</h3>
//                   <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
//                 </Carousel.Caption>
//               </div>
//           </div>
//             </Carousel.Item>
//     </Carousel>
//     </div>
//   )
// }

// export default MaxCarousel;