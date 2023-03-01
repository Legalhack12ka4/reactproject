import { Switch } from 'antd'
import React from 'react'
import { Link } from 'react-router-dom'
import './LoginPage.scss'



const LoginPage = () => {
  return (
    <div className='login-page-main'>
        <div className="page-image-container">
            <img className='login-logo' src="images/LoginPageImages/Group_43448.svg" alt=""  />
            <img className='login-img' src="images/LoginPageImages/Group_43447.svg" alt="" />
        </div>
        <div className="login-card-container">
            <div className="headers">
                <h2>Welcome to Automode!</h2>
                <p>Please sign in to your account and feel the adventure</p>
            </div>

            <div className="credentials">
                <div className="login-email" >
                <label htmlFor="email-box">Email or Contact No.</label>
                <input id="email-box" placeholder='Example@reformiqo.com' className='focus-outline' type="text" />
                </div>

                <div className="login-password">
                <label htmlFor="password-box">Password</label>
                <input id="password-box" placeholder='Password' className='focus-outline' type="password" />
                <div className="password_eye">
                    <img src="images/icons/eye_icon.svg" alt="eye" />
                </div>
                <div className="forget_password">Forgot Password?</div>
                </div>

            </div>

            <div className="remember-btn">
            <Switch id='remember-me'/>
            <label htmlFor="remember-me">Remember Me</label>
            </div>

            <Link exact to="/dashboard"><button className="sign-in-button btn_hover_animation">Sign In</button></Link>

            <div className="create-account-container"><p>New on our Platform? <span>Create an Account</span></p></div>

            <div className="or-container">
                <hr />
                <div className='or-text'>or</div>
            </div>

            <div className="continue-with-google btn_hover_animation">
                <img src="images/LoginPageImages/icons8-google.svg" alt="" />
                <p>Sign in with Google</p>
            </div>

        </div>
    </div>
  )
}

export default LoginPage