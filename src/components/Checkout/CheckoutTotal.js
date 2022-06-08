import React from "react";
import CurrencyFormat from "react-currency-format";
import style from './Checkout.module.css'
import { UseStateValue } from "../StateContext/StateContext";
import { useNavigate } from "react-router";

export const CheckoutTotal = () => {
    const { items } = UseStateValue();
    const navigate = useNavigate();
    const proceedToCheckout = () => { navigate('/payment') };
    const getTotal = () => items?.reduce((amount, item) => item.price + amount, 0)
    return (
        <div className={style.subtotal}>
            <CurrencyFormat
                renderText={(value) => (
                    <>
                        <p>
                            Subtotal ({items.length} items): <strong>{value}</strong>

                        </p>
                    </>
                )}
                decimalScale={2}
                value={getTotal()}
                displayType={"text"}
                thousandSeparator={true}
                prefix={"$"}
            />

            <button onClick={proceedToCheckout} className='primary__button'>Proceed to Checkout</button>
        </div>
    );
}

