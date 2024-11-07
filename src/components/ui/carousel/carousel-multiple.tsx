import { FiX } from 'react-icons/fi';
import { Swiper, SwiperSlide } from 'swiper/react';

interface CarouselMultipleProps {
  images?: string[];
  previewImages?: File[];
  handleDelImg: (index: number, item: string) => void;
  handleDelPreviewImg: (index: number, name: string) => void;
}

export function CarouselMultipleComponent({
  images,
  previewImages,
  handleDelImg,
  handleDelPreviewImg,
}: CarouselMultipleProps) {
  return (
    <Swiper
      direction="horizontal"
      slidesPerView={2}
      spaceBetween={20}
      pagination={{ clickable: true }}
      className="flex-1 w-full h-[200px]"
    >
      {images &&
        images.map((item, idx) => (
          <SwiperSlide
            key={idx}
            className="w-[253px] h-[190px] bg-gray-200 rounded-md overflow-hidden"
          >
            <button
              type="button"
              className="absolute p-1 right-1 top-1 bg-white rounded-full shadow-xl"
              onClick={() => handleDelImg(idx, item)}
            >
              <FiX size={20} />
            </button>
            <img
              src={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${process.env.NEXT_PUBLIC_STORAGE_BUCKET}/${item}`}
              style={{
                objectFit: 'cover',
                width: '100%',
                height: '100%',
              }}
              alt=""
            />
          </SwiperSlide>
        ))}
      {previewImages &&
        previewImages.map((item, idx) => (
          <SwiperSlide
            key={idx}
            className="w-[253px] h-[190px] bg-gray-200 rounded-md overflow-hidden"
          >
            <button
              type="button"
              className="absolute p-1 right-1 top-1 bg-white rounded-full shadow-xl"
              onClick={() => handleDelPreviewImg(idx, item.name)}
            >
              <FiX size={20} />
            </button>
            <img
              src={URL.createObjectURL(item)}
              style={{
                objectFit: 'cover',
                width: '100%',
                height: '100%',
              }}
            />
          </SwiperSlide>
        ))}
    </Swiper>
  );
}
