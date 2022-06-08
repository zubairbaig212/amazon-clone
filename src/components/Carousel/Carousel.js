import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import style from './Carousel.module.css'
import 'slick-carousel/slick/slick-theme.css'
import { createRef } from 'react';
import { PreviousArrow } from './PreviousArrow';
import { NextArrow } from './NextArrow';



export default function Carousel({ images }) {
  let customeSlider = createRef();
  const handlePreviousSlide = (e) => {
    customeSlider.slickPrev();
  }
  const handleNextSlide = (e) => {
    customeSlider.slickPrev();
  }

  const sliderSettings = {
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true,
    nextArrow: <NextArrow nextSlider={handleNextSlide} />,
    prevArrow: <PreviousArrow previousSlide={handlePreviousSlide} />,
  }

  return (
    <div className={style.content} style={{ width: '1500px', marginBottom: '-300px' }}>
      <Slider {...sliderSettings} ref={c => (customeSlider = c)}>
        {images.map((img, i) => {
          return <div key={i}>
            <img src={img} alt={img} className={style.img} />
          </div>
        })}
      </Slider>
    </div>
  )
}