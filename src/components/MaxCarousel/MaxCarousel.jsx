import React from 'react';
import Carousel from 'react-bootstrap/Carousel';

const MaxCarousel = () => {
  return (
    <div>
        <Carousel>
          <Carousel.Item>
            <div className="d-flex">
              <div className="carousel-item">
                <Carousel.Caption>
                  <h3>Third slide label</h3>
                  <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
                </Carousel.Caption>
              </div>
              <div className="carousel-item">
                <Carousel.Caption>
                  <h3>Third slide label</h3>
                  <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
                </Carousel.Caption>
              </div>
              <div className="carousel-item">
                
                <Carousel.Caption>
                  <h3>Third slide label</h3>
                  <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
                </Carousel.Caption>
              </div>
          </div>
            </Carousel.Item>
    </Carousel>
    </div>
  )
}

export default MaxCarousel;