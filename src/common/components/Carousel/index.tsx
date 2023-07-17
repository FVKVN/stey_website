import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import './carousel.scss';
import { Navigation, Pagination, A11y } from 'swiper';

interface IComponentprops {
    items: string[];
    type: string;
}

export default function Carousel(props: IComponentprops) {
    const { items, type } = props;
    return (
        <Swiper
            modules={[Navigation, Pagination, A11y]}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
        >
            {items.map((item, i) => (
                // eslint-disable-next-line react/no-array-index-key
                <SwiperSlide key={`carousel-item-${type}-${i}`}>
                    <img src={item} alt="" />
                </SwiperSlide>
            ))}
        </Swiper>
    );
}
