import React from 'react';
import style from "./Checkout.module.css";
import CheckoutImg from '../../assets/images/no-checkout.svg';
import { Link } from 'react-router-dom';
import { UseStateValue } from '../StateContext/StateContext';
import { Constants } from '../Constant';

export const NoCheckout = () => {
    const {user}=UseStateValue();
    return (
        <div className={style.Checkout__empty}>
            <img src={CheckoutImg} alt='' className={style.checkout__img} />

            <div className={style.cart}>
                <h2>
                    Your Amazon Cart is empty</h2>

                <Link className={style.deals} to={Constants.homePath}>
                    Shop today's deals
                </Link>
                {!user?
                <Link to={Constants.loginPath} className='primary__button width-100'>Sign in to your account</Link>
            :''}
            </div>

        </div>

    )
}
