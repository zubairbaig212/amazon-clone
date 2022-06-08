import React from "react";
import style from "./Home.module.css";
import bannerImg from '../../assets/images/banner.jpg'
import bannerImg1 from '../../assets/images/banner__1.jpg'
import bannerImg2 from '../../assets/images/banner__2.jpg'
import bannerImg4 from '../../assets/images/banner__4.jpg'
import { Product } from "../Product/Product";
import ProductData from './Product.json';
import Carousel from "../Carousel/Carousel";
export const Home = () => {
  const singleProduct=ProductData[0];
  const images=[bannerImg,bannerImg1,bannerImg2,bannerImg4];
  return (
    <div className={style.home}>
      <div className={style.home__container}>
        <Carousel images={images}/>
  
        <div className={style.home__row}>
          {ProductData.slice(1,5).map(product => {
            return <Product
              id={product.id}
              title={product.title}
              price={product.price}
              key={`${product.id}-product`}
              rating={Math.floor(product.rating.rate)}
              image={product.image}
            />
          })}
        </div>
 
        <div className={style.home__row}>
             <Product
              id={singleProduct.id}
              title={singleProduct.title}
              price={singleProduct.price}
              key={`${singleProduct.id}-product`}
              rating={Math.floor(singleProduct.rating.rate)}
              image={singleProduct.image}
            />
        </div>
      </div>
    </div>
  );
}

export default Home;
