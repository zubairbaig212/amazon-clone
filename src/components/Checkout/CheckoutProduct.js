import React from 'react';
import { UseStateValue } from '../StateContext/StateContext';
import style from './Checkout.module.css'

export const CheckoutProduct = ({ id, image, title, price, rating, hideButton }) => {
    const { removeItem } = UseStateValue();
    const removeFromBasket = () => {
        removeItem(id);
    }

    return (
        <div className={style.checkoutProduct}>
            <img className={style.checkoutProduct__image} src={image} alt='banner-img' />

            <div className={style.checkoutProduct__info}>
                <p className={style.checkoutProduct__title}>{title}</p>
                <p className={style.checkoutProduct__price}>
                    <small>$</small>
                    <strong>{price}</strong>
                </p>
                <div className={style.checkoutProduct__rating}>
                    {Array(rating)
                        .fill()
                        .map((_, i) => (
                            <p key={i}>🌟</p>
                        ))}
                </div>
                {!hideButton && (
                    <button onClick={removeFromBasket} className='primary__button'>Remove from Basket</button>
                )}
            </div>
        </div>
    )
}

export default CheckoutProduct
