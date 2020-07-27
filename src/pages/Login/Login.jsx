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
                <form>
                    <h5>E-mail</h5>
                    <input type="text" />
                    <h5>Password</h5>
                    <input type="text" />
                    <button>
                        Contiune
                    </button>
                </form>
                <p>
                By continuing, you agree to Amazon's <a href="/help">Conditions of Use</a> and <a href="/help">Privacy Notice</a>.
                </p>
                <button>
                    Create your Amazon account 
                </button>
            </div>
        </div>
    )
}

export default Login;
