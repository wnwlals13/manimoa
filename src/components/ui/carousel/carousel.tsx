'use client';

import { Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Image from 'next/image';
import React from 'react';

interface CarouselProps {
  images: string[];
}

export const CarouselComponent = React.memo(function CarouselComponent({
  images,
}: CarouselProps) {
  return (
    <Swiper
      modules={[Navigation, Pagination]}
      slidesPerView={1}
      navigation={{
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      }}
      pagination={{ clickable: true }}
      className="w-full flex rounded-lg border border-gray-200 bg-gray-100"
    >
      {images.map((item, idx) => (
        <SwiperSlide key={idx} className="h-[340px]">
          <Image
            src={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${process.env.NEXT_PUBLIC_STORAGE_BUCKET}/${item}`}
            alt={`picture of feed, ${item}`}
            // fill
            // sizes="(max-width: 768px) 100%"
            width={558}
            height={340}
            priority
            style={{ objectFit: 'cover' }}
          />
        </SwiperSlide>
      ))}

      <div className="swiper-button-next"></div>
      <div className="swiper-button-prev"></div>
    </Swiper>
  );
});
