'use client';

import { Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const mock = [
  { id: 1, title: 'slide1' },
  { id: 2, title: 'slide2' },
  { id: 3, title: 'slide3' },
];

export function CarouselComponent() {
  return (
    <Swiper
      modules={[Navigation, Pagination]}
      slidesPerView={1}
      navigation={{
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      }}
      pagination={{ clickable: true }}
      className="w-full h-[300px] flex bg-gray-200"
    >
      {mock.map((item) => (
        <SwiperSlide key={item.id} className="h-[320px]">
          {item.title}
        </SwiperSlide>
      ))}

      <div className="swiper-button-next"></div>
      <div className="swiper-button-prev"></div>
    </Swiper>
  );
}
