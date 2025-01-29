import React, { useRef, useState }from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import { FreeMode, Thumbs } from 'swiper/modules';

// import required modules
import { Zoom, Pagination, Navigation } from 'swiper/modules';

export default function Slider({property}) {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  return (
    <div>
      <Swiper
        style={{
          '--swiper-navigation-color': '#000', // Change to black or any visible color
          '--swiper-pagination-color': '#000', // Change pagination dots color if needed
        }}
        lazy={true}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Pagination, Navigation]}
        className="mySwiper"
      >
        {property.images.map((image, index) => (
          <SwiperSlide key={index}>
            <img
              src={`${image}`}
              alt={`Slide ${index + 1}`}
              loading="lazy"
              className="swiper-image"
            />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Inline CSS for demonstration */}
      <style jsx>{`
        .swiper-image {
          max-width: 100%;
          max-height: 400px;
          object-fit: contain;
          margin: 0 auto;
        }

        /* Customize navigation buttons */
        .swiper-button-prev,
        .swiper-button-next {
          color: #000; /* Set arrow color to black */
        }

        .swiper-button-prev:hover,
        .swiper-button-next:hover {
          color: #ff5722; /* Optional: Add hover effect with a different color */
        }
      `}</style>
    </div>
  )
}
