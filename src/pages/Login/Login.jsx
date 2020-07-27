import React from 'react';
import './Login.css';
import { Link, useHistory } from 'react-router-dom';

const Login = () => {
    return (
        <div className='login'>
            <Link to="/" >
                <img
                    className="login__logo"
                    src={require(`../../assests/amazon.png`)}
                    alt=""
                />
            </Link>

            <div className='login__container'>
                <h1>Sign up</h1>
            </div>
        </div>
    )
}

export default Login;
