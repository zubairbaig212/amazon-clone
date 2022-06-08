import React, { useState, useEffect } from 'react';
import style from './Payment.module.css';
import { Link, useNavigate } from "react-router-dom";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import CurrencyFormat from "react-currency-format";
import axios from '../axios';
// db
import CheckoutProduct from '../Checkout/CheckoutProduct';
import { UseStateValue } from '../StateContext/StateContext';
import { db } from '../../Firebase';
import { Constants } from '../Constant';

export const Payment = () => {
    const { items, user, removeAllItems } = UseStateValue();
    const navigate = useNavigate();
    const getTotal = () => items?.reduce((amount, item) => item.price + amount, 0)

    const stripe = useStripe();
    const elements = useElements();

    const [succeeded, setSucceeded] = useState(false);
    const [processing, setProcessing] = useState("");
    const [error, setError] = useState(null);
    const [disabled, setDisabled] = useState(true);
    const [clientSecret, setClientSecret] = useState(true);

    useEffect(() => {
        // generate the special stripe secret which allows us to charge a customer
        const getClientSecret = async () => {
            const response = await axios({
                method: 'post',
                // Stripe expects the total in a currencies subunits
                url: `/payments/create?total=${getTotal(items) * 100}`
            });
            setClientSecret(response.data.clientSecret)
        }

        getClientSecret();
    }, [items])


    const handleSubmit = async (event) => {
        event.preventDefault();
        setProcessing(true);

        await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement)
            }
        }).then(({ paymentIntent }) => {
            // payment confirmation

            db
                .collection('users')
                .doc(user?.uid)
                .collection('orders')
                .doc(paymentIntent.id)
                .set({
                    basket: items,
                    amount: paymentIntent.amount,
                    created: paymentIntent.created
                })

            setSucceeded(true);
            setError(null)
            setProcessing(false)

            removeAllItems()

            navigate('/orders')
        })

    }

    const handleChange = event => {
        // Event fire when changes in the CardElement and display any errors as their card details
        setDisabled(event.empty);
        setError(event.error ? event.error.message : "");
    }

    return (
        <div className={style.payment}>
            <div className={style.payment__container}>
                <h1>
                    Checkout (
                    <Link to={Constants.checkoutPath}>{items?.length} items</Link>
                    )
                </h1>


                {/* Payment section - delivery address */}
                <div className={style.payment__section}>
                    <div className={style.payment__title}>
                        <h3>Delivery Address</h3>
                    </div>
                    <div className={style.payment__address}>
                        <p>{user?.email}</p>
                        <p>9380 Broad Ave.</p>
                        <p>Bayonne, NJ 07002</p>
                    </div>
                </div>

                {/* Payment section - Review Items */}
                <div className={style.payment__section}>
                    <div className={style.payment__title}>
                        <h3>Review items and delivery</h3>
                    </div>
                    <div className={style.payment__items}>
                        {items.map(item => (
                            <CheckoutProduct
                                id={item.id}
                                key={`${item.id}-item`}
                                title={item.title}
                                image={item.image}
                                price={item.price}
                                rating={item.rating}
                                hideButton={true}
                            />
                        ))}
                    </div>
                </div>


                {/* Payment section - Payment method */}
                <div className={style.payment__section}>
                    <div className={style.payment__title}>
                        <h3>Payment Method</h3>
                    </div>
                    <div className={style.payment__details}>
                        {/* Stripe magic will go */}

                        <form onSubmit={handleSubmit}>
                            <CardElement onChange={handleChange} />

                            <div className={style.payment__priceContainer}>
                                <CurrencyFormat
                                    renderText={(value) => (
                                        <h3>Order Total: {value}</h3>
                                    )}
                                    decimalScale={2}
                                    value={getTotal(items)}
                                    displayType={"text"}
                                    thousandSeparator={true}
                                    prefix={"$"}
                                />
                                <button disabled={processing || disabled || succeeded} className='primary__button'>
                                    <span>{processing ? <p>Processing</p> : "Buy Now"}</span>
                                </button>
                            </div>

                            {/* Errors */}
                            {error && <div>{error}</div>}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

