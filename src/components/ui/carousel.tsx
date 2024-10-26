'use client';

import { Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Image from 'next/image';

interface CarouselProps {
  images: string[];
}

export function CarouselComponent({ images }: CarouselProps) {
  return (
    <Swiper
      modules={[Navigation, Pagination]}
      slidesPerView={1}
      navigation={{
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      }}
      pagination={{ clickable: true }}
      className="w-full h-[380px] flex rounded-lg border border-gray-200 bg-gray-100"
    >
      {images.map((item, idx) => (
        <SwiperSlide key={idx} className="h-[380px]">
          <div className="flex justify-center">
            <Image
              width={600}
              height={600}
              src={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${process.env.NEXT_PUBLIC_STORAGE_BUCKET}/${item}`}
              alt={`picture of feed, ${item}`}
              style={{
                position: 'absolute',
                transform: 'translate(-50%, -50%)',
                top: '50%',
                left: '50%',
                width: '100%',
                height: '100%',
              }}
            />
          </div>
        </SwiperSlide>
      ))}

      <div className="swiper-button-next"></div>
      <div className="swiper-button-prev"></div>
    </Swiper>
  );
}
