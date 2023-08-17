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

import './similarMovieSwiper.css'

// Component handling the display of the similar movies in a swipable list
const SimilarMovieSwiper = ({ similarMovies, onCardClick, onImageLoad, posterStyle, onSwiperLoad }) => {
    
    // The onSwiperLoad is passed down to the first movie in the list so when it loads, it will scroll to the similar movies section

  return (
    <div className='similar_movie_swiper_container'>
        <h3>Similar movies</h3>
        <Swiper className='similar_movies_swiper'
            // Swiper parameters
            modules={[Navigation, Pagination]}
            spaceBetween={50}
            slidesPerView={3}
            pagination={{ clickable: true, dynamicBullets: true, dynamicMainBullets: 3 }}
            navigation

            breakpoints={
                {
                280: {
                    slidesPerView: 1,
                    spaceBetween: 20
                },
                600: {
                    slidesPerView: 2,
                    spaceBetween: 30
                }, 
                1024: {
                    slidesPerView: 3,
                    spaceBetween: 40
                },
            }
            }
        >
            {similarMovies.map((movie, index) => (
                
                <SwiperSlide key={index} className='similar_movie'>
                    <MoviePoster
                        posterPath={movie.poster_path}
                        alt={movie.title}
                        onImageLoad={index === 0 ? onSwiperLoad : undefined}
                    />
                </SwiperSlide>
            ))}
        </Swiper>

    </div>
  )
}

export default SimilarMovieSwiper