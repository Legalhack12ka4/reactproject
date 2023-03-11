import { Switch } from 'antd'
import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import CustomInput from '../CustomInput/CustomInput'
import './LoginPage.scss'



const LoginPage = () => {
    const [showPassword, setShowPassword] = useState(false)
    const [smallScreen , setSmallScreen] = useState(window.screen.width)
    const [name, setName] = useState("");
    // const handleNameChange = evt => {
    //   const newName = evt.target.value.replace(
    //     /[^a-zA-Z@\d\s.]/g,
    //     ""
    //   );
    //   setName(newName);
    // };
    const handlePasswordClick = () => 
    {
            setShowPassword(!showPassword)
    }
    useEffect(() => {
       const handleResize = () => {setSmallScreen(window.screen.width)}
       window.addEventListener("resize", handleResize)
       return () => {window.removeEventListener("resize", handleResize)}


      },[]);
    
      console.log(smallScreen)


  return (
    <div className='login-page-main'>
        <div className="page-image-container">
          {smallScreen > 1300 &&  <img className='login-logo' src="images/LoginPageImages/Group_43448.svg" alt=""  />}
            {smallScreen >1300 && <img className='login-img' src="images/LoginPageImages/Group_43447.svg" alt="" />}
        </div>
        <div className='card_main_container'>{smallScreen <= 1300 &&  <img className='top_image' src='/images/icons/background_image_login_page_ipad.svg'/>}
          {smallScreen <= 1300 &&  <img className='bottom_image' src='/images/icons/background_image_login_page_ipad.svg'/>}
          <div className="login-card-container">
          
            <div className="headers">
               {smallScreen <= 1300 &&  <div style={{marginBottom:"20px"}}>
                <img className='login-logo' src="images/LoginPageImages/Group_43448.svg" alt=""  />
                </div> }
                <h2>Welcome to Automode!</h2>
                <p>Please sign in to your account and feel the adventure</p>
            </div>

            <div className="credentials">
                <div className="login-email" >
                <label htmlFor="email-box">Email or Contact No.</label>
                {/* <input  id="email-box" placeholder='Example@reformiqo.com' className='focus-outline' type="text"  value={name}  /> */}
                <CustomInput
                 className='focus-outline' 
                id="email-box" 
                type="text" 
                placeholder='Example@reformiqo.com'
                value={name}
                inputType={"AlphaNumeric"}
                onChange={(e, newValue) =>
                  setName(prevState => ({
                    ...prevState,
                    "name": newValue
                  }))}
              />
                </div>

                <div className="login-password">
                <label htmlFor="password-box">Password</label>
                <input id="password-box" placeholder='Password' className='focus-outline' type={showPassword ? "text" : "password"}/>
                <div className="password_eye" style={{cursor:"pointer"}} onClick={handlePasswordClick}>
                  { showPassword ?  <img src="/images/icons/Show.svg" alt="eye" /> :  <img src="/images/icons/eye_icon.svg" alt="eye" />}
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
    </div>
  )
}

export default LoginPage