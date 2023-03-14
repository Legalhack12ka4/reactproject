import { Switch } from "antd";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ContainedButton } from "../Buttons/Button";
import CustomInput from "../CustomInput/CustomInput";
import config from "../Database/config";
import "./LoginPage.scss";

const resetValue = {
    username:"",
    email:"",
    password:""
 };


const LoginPage = () => {
  const [formData, setFormData] = useState(resetValue);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [smallScreen, setSmallScreen] = useState(window.screen.width);
  const [name, setName] = useState("");
  const [activePage, setActivePage] = useState("loginPage");
  const navigate= useNavigate();
  // const handleNameChange = evt => {
  //   const newName = evt.target.value.replace(
  //     /[^a-zA-Z@\d\s.]/g,
  //     ""
  //   );
  //   setName(newName);
  // };
  const handlePasswordClick = () => {
    setShowPassword(!showPassword);
  };
  // useEffect(() => {
  //   const handleResize = () => {
  //     setSmallScreen(window.screen.width);
  //   };
  //   window.addEventListener("resize", handleResize);
  //   return () => {
  //     window.removeEventListener("resize", handleResize);
  //   };
  // }, []);

  console.log(smallScreen);

    //Onchange

      const onChange = (e) => {
        const { value, name } = e.target;
        setFormData({ ...formData, [name]: value });
        console.log(value);
        console.log(name);
      };

  //login

  const handleLogin = async () => {
    try {
     await axios.post(`${config.baseUrl}/login`, {
        
      //  username: "",
        email:formData.email,
        password:formData.password,
      
          // username:"Vimlesh",
          // email: "vimlesh.kumhar@reformiqo.com",
          // password:"123",
        
      }).then((res) => 

      {
        console.log(res.data.jwt)
        // console.log(res.data[0].jwt)
        if (res.data.jwt) {
        
          // set cookie or token in local storage
          //document.cookie = `jwt=${res.data.jwt}`;
          localStorage.setItem('jwt', res.data.jwt)
          
          // redirect to dashboard page
          navigate('/dashboard')
        } else {
          // handle error response
          console.log(res.error)
        }
      })
    
    //  console.log(re)
    //  const data = await response.json()
     
    } catch (error) {
      if (error.response && error.response.status === 503) {
        alert("Something went wrong. Please try again later. 503");
      } else {
        alert("Details Not Found, Password and username does not match")
      }

    }
  }


  return (
    <div className="login-page-main">
      <img
        className="card-background-image"
        src="/images/icons/background_image_login_page_ipad.svg"
      />
      <div className="card_main_container">
        {activePage === "loginPage" && (
          <div className="login-card-container">
            <div className="headers">
              {
                <div style={{ marginBottom: "20px" }}>
                  <img
                    className="login-logo"
                    src="/images/icons/autoMode_logo.svg"
                    alt=""
                  />
                </div>
              }
              <h2 className="title-sb">Welcome Back!</h2>
              <p className="sc-body-rg">
                Please enter your credentials to sign in!
              </p>
            </div>

            <div className="credentials">
              <div className="login-email">
                <CustomInput
                  className="focus-outline"
                  id="email-box"
                  type="text"
                  width={330}
                  placeholder="Example@reformiqo.com"
                  value={formData.email}
                  name="email"
                  label="Email / Contact No."
                  inputType={"AlphaNumeric"}
                  onChange={(e, newValue) =>
                    { onChange(e); 
                      setFormData(prevState => ({
                        ...prevState,
                        "email": newValue
                      }))}}
                />
              </div>

              <div className="login-password">
                {/* <label htmlFor="password-box">Password</label> */}
                <CustomInput
                  className=""
                  id="password-box"
                  type={showPassword ? "text" : "password"}
                  placeholder="Example@reformiqo.com"
                  // value={name}
                  width={330}
                  label="Password"
                  value={formData.password}
                  name="password"
                  inputType={"AlphaNumeric"}
                  onChange={(e, newValue) =>
                    { onChange(e); 
                      setFormData(prevState => ({
                        ...prevState,
                        "password": newValue
                      }))}}
                />
                {/* <input id="password-box" placeholder='Password' className='focus-outline' type={showPassword ? "text" : "password"}/> */}
                <div
                  className="password_eye"
                  style={{ cursor: "pointer" }}
                  onClick={handlePasswordClick}
                >
                  {showPassword ? (
                    <img src="/images/icons/Show.svg" alt="eye" />
                  ) : (
                    <img src="/images/icons/eye_icon.svg" alt="eye" />
                  )}
                </div>
                <div
                  className="forget_password sc-body-sb"
                  onClick={() => {
                    setActivePage("forgetPasswordPage");
                  }}
                >
                  Forgot Password?
                </div>
              </div>
            </div>

            <div className="remember-btn">
              <Switch id="remember-me" />
              <label htmlFor="remember-me" className="sc-body-rg">
                Remember Me
              </label>
            </div>

            {/* <Link exact to="/dashboard"> */}
              <ContainedButton value="Sign In" width={330} onClick={() => {handleLogin()}} />
            {/* </Link> */}

            <div className="create-account-container">
              <p>
                New on our Platform? <span>Create an Account</span>
              </p>
            </div>

            {/* <div className="or-container">
                <hr />
                <div className='or-text'>or</div>
            </div> */}

            {/* <div className="continue-with-google btn_hover_animation">
                <img src="images/LoginPageImages/icons8-google.svg" alt="" />
                <p>Sign in with Google</p>
            </div> */}
          </div>
        )}

{/* //for password */}

        {activePage === "forgetPasswordPage" && (
          <div className="forget-password-container">
            <div className="headers">
              {
                <div style={{ marginBottom: "20px" }}>
                  <img
                    className="login-logo"
                    src="/images/icons/autoMode_logo.svg"
                    alt=""
                  />
                </div>
              }
              <h2 className="title-sb">Forget Password</h2>
              <p className="sc-body-rg">
                Enter your email address to receive a verification link
              </p>
            </div>

            <div className="credentials">
              <div className="forget-email">
                <CustomInput
                  className="focus-outline"
                  id="email-box"
                  type="text"
                  width={330}
                  placeholder="Example@reformiqo.com"
                  value={formData.email}
                  label="email"
                  inputType={"AlphaNumeric"}
                  onChange={(e, newValue) =>
                    setName((prevState) => ({
                      ...prevState,
                      name: newValue,
                    }))
                  }
                />
              </div>
            </div>

            <ContainedButton value="Send Email" width={330} />
            <p
              className="back-to-signin sc-body-rg"
              onClick={() => setActivePage("loginPage")}
            >
              Back to <span className="sc-body-sb">Sign In</span>
            </p>
          </div>
        )}

        {activePage === "setNewPassword" && (
          <div className="new-password-container">
            <div className="headers">
              {
                <div style={{ marginBottom: "20px" }}>
                  <img
                    className="login-logo"
                    src="/images/icons/autoMode_logo.svg"
                    alt=""
                  />
                </div>
              }
              <h2 className="title-sb">Set New Password</h2>
              <p className="sc-body-rg">
                {" "}
                New password must different to previous password
              </p>
            </div>

            <div className="credentials">
              <div className="password">
                <CustomInput
                  className=""
                  id="password-box"
                  type={showPassword ? "text" : "password"}
                  placeholder="Example@reformiqo.com"
                  width={330}
                  label="Password"
                />
                <div
                  className="password_eye"
                  style={{ cursor: "pointer" }}
                  onClick={handlePasswordClick}
                >
                  {showPassword ? (
                    <img src="/images/icons/Show.svg" alt="eye" />
                  ) : (
                    <img src="/images/icons/eye_icon.svg" alt="eye" />
                  )}
                </div>
              </div>

              <div className="confirm-password">
                <CustomInput
                  className=""
                  id="confirm-password-box"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Example@reformiqo.com"
                  width={330}
                  label="Confirm Password"
                />

                <div
                  className="password_eye"
                  style={{ cursor: "pointer" }}
                  onClick={() => { setShowConfirmPassword(!showConfirmPassword)}}
                >
                  {showConfirmPassword ? (
                    <img src="/images/icons/Show.svg" alt="eye" />
                  ) : (
                    <img src="/images/icons/eye_icon.svg" alt="eye" />
                  )}
                </div>
              </div>
            </div>

            <ContainedButton value="Submit" width={330} />
            <p
              className="back-to-signin sc-body-rg"
              onClick={() => setActivePage("loginPage")}
            >
              Back to <span className="sc-body-sb">Sign In</span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoginPage;
