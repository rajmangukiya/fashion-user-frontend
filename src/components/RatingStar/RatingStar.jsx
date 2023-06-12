import React from 'react';
import { BsStar, BsStarFill, BsStarHalf } from 'react-icons/bs';

const RatingStar = ({ rating }) => {
  const filledStars = Math.floor(rating); // Get the integer part
  const hasHalfStar = rating % 1 !== 0; // Check if there is a half star
  const emptyStars = 5 - filledStars - (hasHalfStar ? 1 : 0); // Calculate the number of empty stars

  const stars = [];
  const totalStars = 5;

  for (let i = 0; i < filledStars; i++) {
    stars.push(<span key={i}><BsStarFill/></span>); // Filled star
  }

  if (hasHalfStar) {
    stars.push(<span key="half"><BsStarHalf/></span>); // Half star
  }

  for (let i = 0; i < emptyStars; i++) {
    stars.push(<span key={`empty-${i}`}><BsStar/></span>); // Empty star
  }

  return <div>{stars}</div>;
};

export default RatingStar;
