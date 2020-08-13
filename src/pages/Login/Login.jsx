import React, { useState, } from 'react';
import './Login.css';
import { Link, useHistory } from 'react-router-dom';
import { auth } from '../../firebase';

const Login = () => {

    const [values, setValues] = useState({
        email: '',
        password: '',
    });

    const history = useHistory();

    const handleChange = name => event => {
        setValues({ ...values, [name]: event.target.value });
    };

    const login = (event) => {
        event.preventDefault(); //this stop the refresh
        // do the login logic ...
        console.log("login clicked");
            auth.signInWithEmailAndPassword(values.email, values.password)
                .then((auth) => {
                    // togged in, redirect to homepage
                    history.push("/");
                })
                .catch(error => alert(error.message));
    }

    const register = (event) => {
        event.preventDefault(); //this stop the refresh
        // do the register logic ...

        auth.createUserWithEmailAndPassword(values.email, values.password)
            .then((auth) => {
                // create a user & logged in , redirect to homepage
                history.push("/");
            })
            .catch(error => alert(error.message));
    }
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
                <h1>Sign-In</h1>
                <form>
                    <h5>E-mail</h5>
                    <input
                        type="email"
                        name="email"
                        value={values.email}
                        onChange={handleChange('email')}
                    />

                    <h5>Password</h5>
                    <input
                        type="password"
                        name="password"
                        value={values.password}
                        onChange={handleChange('password')}
                    />
                    <button
                        className="login__continueButton"
                        onClick={login}
                    >
                        Contiune
                    </button>
                </form>
                <p>
                    By continuing, you agree to Amazon's <a href="/help">Conditions of Use</a> and <a href="/help">Privacy Notice</a>.
                </p>
                <span className="login__span"><h5>New to Amazon?</h5></span>
                <button
                    className="login__registerButton"
                    onClick={register}
                >
                    Create your Amazon account
                </button>
            </div>
        </div>
    )
}

export default Login;
