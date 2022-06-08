import React, { useState } from 'react';
import style from './Login.module.css'
import { Link, useNavigate } from "react-router-dom";
import {  createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { firebaseAuth } from '../../Firebase';
import { UseStateValue } from '../StateContext/StateContext';
import { Constants } from '../Constant';

export const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { logIn } = UseStateValue();

    const signIn = async (e) => {
        e.preventDefault();
        try {
            const response = await signInWithEmailAndPassword(firebaseAuth(), email, password)
            if (response) {
                logIn(response);
                navigate('/');
            }
        } catch (err) {
            alert(err);
        }
    }

    const register = async (e) => {
        e.preventDefault();
        try {
            const response = await createUserWithEmailAndPassword(firebaseAuth(), email, password)
            if (response) {
                logIn(response);
                navigate('/')
            }
        } catch (err) {
            alert(err);
        }
    }

    return (
        <div className={style.login}>
            <Link to={Constants.homePath}>
                <img
                    className={style.login__logo}
                    alt=''
                    src='https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png'
                />
            </Link>

            <div className={style.login__container}>
                <h1>Sign-in</h1>

                <form>
                    <h5>E-mail</h5>
                    <input type='text' value={email} onChange={e => setEmail(e.target.value)} />

                    <h5>Password</h5>
                    <input type='password' value={password} onChange={e => setPassword(e.target.value)}
                        maxLength={6} />

                    <button type='submit' onClick={signIn} className={style.login__signInButton}>Sign In</button>
                </form>

                <p>
                By continuing, you agree to Amazon's
                </p>

                <button onClick={register} className={style.login__registerButton}>Create your Amazon Account</button>
            </div>
        </div>
    )
}

export default Login
