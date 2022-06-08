import React from "react";
import { UseStateValue } from "../StateContext/StateContext";
import style from "./Checkout.module.css";
import CheckoutProduct from "./CheckoutProduct";
import { CheckoutTotal } from "./CheckoutTotal";
import { NoCheckout } from "./NoCheckout";

export const Checkout = () => {
    const { items } = UseStateValue();
    return (
        <div className={style.checkout}>
            <div className={style.checkout__left}>

                {items.length === 0 ? <NoCheckout /> :
                    <div>
                        <h2 className={style.checkout__title}>Your shopping Basket</h2>

                        {items.map((item, i) => (
                            <CheckoutProduct
                                id={item.id}
                                key={i}
                                title={item.title}
                                image={item.image}
                                price={item.price}
                                rating={item.rating}
                            />
                        ))}

                    </div>
                }
            </div>
            {items.length > 0 ?
                <div className={style.checkout__right}>
                    <CheckoutTotal />
                </div> : null}
        </div>
    );
}

