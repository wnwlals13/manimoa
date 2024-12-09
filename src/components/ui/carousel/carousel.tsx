'use client';

import { Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Image from 'next/image';
import React from 'react';
import defaultImage from '@/assets/noimage.png';

interface CarouselProps {
  images?: string[];
}

export const CarouselComponent = React.memo(function CarouselComponent({
  images,
}: CarouselProps) {
  return (
    <div>
      {images ? (
        <Swiper
          modules={[Navigation, Pagination]}
          slidesPerView={1}
          navigation={{
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          }}
          pagination={{ clickable: true }}
          className="max-w-[600px] w-full flex rounded-lg border border-gray-200 bg-gray-100"
        >
          {images.map((item, idx) => (
            <SwiperSlide key={idx} className="h-[340px]">
              <Image
                src={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${process.env.NEXT_PUBLIC_STORAGE_BUCKET}/${item}`}
                alt="사용자가 업로드한 피드 이미지"
                width={600}
                height={400}
                // loading={idx === 0 ? 'eager' : 'lazy'}
                priority={idx === 0}
                sizes="(max-width: 768px) 100vw, 600px"
                style={{ height: '100%', objectFit: 'cover' }}
              />
            </SwiperSlide>
          ))}

          <div className="swiper-button-next"></div>
          <div className="swiper-button-prev"></div>
        </Swiper>
      ) : (
        <div className="h-[340px] rounded-md overflow-hidden">
          <Image
            width={600}
            height={400}
            src={defaultImage}
            style={{ height: '100%', objectFit: 'cover' }}
            alt="기본 이미지"
          ></Image>
        </div>
      )}
    </div>
  );
});
