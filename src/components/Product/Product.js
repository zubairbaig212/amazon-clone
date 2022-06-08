import React, { useRef } from "react";
import { UseStateValue } from "../StateContext/StateContext";
import  { Toast } from "../Toast/Toast";
import style from "./Product.module.css";

export const Product = ({ id, title, image, price, rating }) => {
  const { addToCart } = UseStateValue();
  const childRef = useRef();

  const addToBasket = () => {
    addToCart([{ id, title, image, price, rating }]);
    childRef.current.openNotification();
  };


  return (
    <div className={style.product}>
      <div className={style.product__info}>
        <p className={style.product__title}>{title}</p>
        <p className={style.product__price}>
          <small>$</small>
          <strong>{price}</strong>
        </p>
        <div className={style.product__rating}>
          {Array(rating)
            .fill()
            .map((_, i) => (
              <p key={i}>🌟</p>
            ))}
        </div>
      </div>

      <img src={image} alt="" />

      <button onClick={addToBasket} className={style.product_button}>Add to Cart</button>
      <Toast ref={childRef} />
    </div>
  );
}
