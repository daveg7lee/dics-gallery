import { Mousewheel, Keyboard } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

interface IModalContent {
  close: any;
  photo: any;
}

const ModalContent = ({ close, photo }: IModalContent) => {
  return (
    <div className="h-full w-full bg-white flex items-center justify-center flex-col">
      <div className="w-full flex justify-end">
        <button className="text-2xl md:text-3xl font-bold" onClick={close}>
          &times;
        </button>
      </div>
      <Swiper
        spaceBetween={15}
        slidesPerView={1}
        mousewheel
        keyboard
        modules={[Mousewheel, Keyboard]}
        {...{ style: { borderRadius: 10 } }}
      >
        {photo.files.map((file: string, index: number) => (
          <SwiperSlide key={index}>
            <div className="w-full h-full flex justify-center items-center">
              <img src={file} alt="post image" className="bg-contain" />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="flex items-center justify-between w-full text-left">
        <span className="text-base font-semibold">{photo.caption}</span>
        <i className="fa-solid fa-download" />
      </div>
    </div>
  );
};

export default ModalContent;
