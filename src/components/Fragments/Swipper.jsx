import { Autoplay, Pagination } from "swiper/modules";
import Images1 from "../../assets/bg-1.jpg";
import Images2 from "../../assets/bg-2.jpg";
import Images3 from "../../assets/bg-3.jpg";
import Images4 from "../../assets/bg-4.jpg";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";

import { Swiper, SwiperSlide } from "swiper/react";
export default function Swipper() {
  const images = [Images1, Images3, Images4];
  return (
    <div className="">
      <Swiper
        modules={[Autoplay, Pagination]}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        loop={true}
        className="w-full h-full -mt-30 "
      >
        {images.map((img, index) => (
          <SwiperSlide key={index}>
            <img src={img} alt="" className="w-full h-[55vh] object-cover" />
          </SwiperSlide>
        ))}
      </Swiper>
      {/* <div className="absolute inset-0 z-10">
        <h1 className="text-4xl font-bold px-6 py-70">
          PT. CIPTA HOSPITAL INDONESIA
        </h1>
      </div> */}
    </div>
  );
}
