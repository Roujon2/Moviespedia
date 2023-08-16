import React from 'react'
import './similarMovieSwiper.css'

// Importing atom components
import MoviePoster from '../../atoms/moviePoster/MoviePoster.jsx'

// Import Swiper and modules
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation'

// Component handling the display of the similar movies in a swipable list
const SimilarMovieSwiper = ({ similarMovies, onCardClick, onImageLoad, posterStyle }) => {

    console.log(similarMovies);

  return (
    <div className='similar_movie_swiper_container'>
        <h3>Similar movies</h3>
        <Swiper className='similar_movies_container'
            // Swiper parameters
            modules={[Navigation, Pagination]}
            spaceBetween={50}
            slidesPerView={5}
            pagination={{ clickable: true }}
            navigation={{ nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' }}
        >
            {similarMovies.map((movie, index) => (
                <SwiperSlide key={index} className='similar_movie'>
                    <h3>Hi</h3>
                </SwiperSlide>
            ))}
        </Swiper>
        
    </div>
  )
}

export default SimilarMovieSwiper