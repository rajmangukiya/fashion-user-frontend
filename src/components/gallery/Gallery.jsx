import React, { useEffect, useState } from 'react'
import './style.css'

const Gallery = ({ item }) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  
  return (
    <div className='gallery-container d-flex me-5'>
      <img className='gallery-selected-image h-100 me-3' src={item?.images?.length ? item?.images[selectedImageIndex] : ''} />
      <div className='gallery-list-image-container d-flex flex-column h-100 overflow-scroll'>
          {
              item?.images?.map((image, index) => {
                  return (
                    <img 
                      key={index} 
                      className={`gallery-list-image mb-3 ${index == selectedImageIndex ? 'border border-2 border-dark' : ''}`} 
                      src={image} 
                      onClick={() => setSelectedImageIndex(index)}
                    />
                  )
              })
          }
      </div>
    </div>
  )
}

export default Gallery