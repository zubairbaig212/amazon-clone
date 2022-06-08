import React, { useState, useEffect } from 'react';
import style from './Orders.module.css'
import Order from './Order'
import { UseStateValue } from '../StateContext/StateContext';
import { db } from '../../Firebase';
import { Loader } from '../Loader/Loader';
function Orders() {
    const { user } = UseStateValue();
    const [loader, setLoader] = useState(false)
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        if (user) {
            db
                .collection('users')
                .doc(user?.uid)
                .collection('orders')
                .orderBy('created', 'desc')
                .onSnapshot(snapshot => {
                    setLoader(true);
                    setOrders(snapshot.docs.map(doc => ({
                        id: doc.id,
                        data: doc.data()
                    })))
                })
        } else {
            setLoader(true);
            setOrders([])
        }

    }, [user])

    return (
        <div className={style.orders}>
            {!loader ? <Loader loading noOfItems={2} />
                : <div>
                    <h1>Your Orders</h1>

                    <div className={style.orders__order}>
                        {orders?.map((order,i) => (
                            <Order order={order}  key={`${i}-order`} />
                        ))}
                    </div>
                </div>
            }
        </div>
    )
}

export default Orders
