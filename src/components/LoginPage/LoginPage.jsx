import { Space, Spin, Switch } from "antd";
import axios from "axios";
import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ContainedButton } from "../Buttons/Button";
import CustomInput from "../CustomInput/CustomInput";
import config from "../Database/config";
import "./LoginPage.scss";
import emailjs from 'emailjs-com';
import { toast, ToastContainer } from "react-toastify";
import { useFormik } from "formik";
import { logindata } from "../../Schemas";



const resetValue = {
    username:"",
    email:"",
    password:""
 };


const LoginPage = (props) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState(resetValue);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [smallScreen, setSmallScreen] = useState(window.screen.width);
  const [name, setName] = useState("");
  const [activePage, setActivePage] = useState("loginPage");
  const navigate= useNavigate();
  const handlePasswordClick = () => {
    setShowPassword(!showPassword);
  };
  console.log(smallScreen);


  //validation
  const {
    errors,
    values,
    handleBlur,
    touched,
    handleChange,
    handleSubmit,
    setFieldValue,
    setFieldTouched,
  } = useFormik({
    initialValues: resetValue,
  
    validationSchema: logindata,
    onSubmit: (values) => {
      console.log(values);
    },
  });
console.log(errors)
console.log(values)
  const handleFocus = () => {
  }
 
    //Onchange

      const onChange = (e) => {
        const { value, name } = e.target;
        setFormData({ ...formData, [name]: value });
        console.log(value);
        console.log(name);
      };

  //login
  

const handleLogin = async () => {
  setLoading(true);
  try {
    const emailjsPublicKey = "bcN_1C6x-RQYc_T_T"
    await axios.post(`${config.baseUrl}/login`, {
      email: formData.email,
      password: formData.password,
    }).then((res) => {
      console.log(res.data.jwt)
      if (res.data.jwt) {
        document.cookie = `jwt=${res.data.jwt};  email=${formData.email}`;
        localStorage.setItem('email', formData.email);
        localStorage.setItem('loggedIn', true);
        localStorage.setItem('message', `Welcome to AutoMode! ${formData.email}`);
        emailjs.init(emailjsPublicKey);
        const templateParams = {
          to_email: formData.email,
          user_email: formData.email,
        };
        emailjs.send('service_dcsporp', 'template_q37ot2f', templateParams)
          .then((result) => {
            console.log(result.text);
     
            handleLoginCallback(props.onLogin);
           
            navigate(`/dashboard`);
           
          }, (error) => {
            console.log(error.text);
          });
      }
    
      else {
        console.log(res.error)
      }
    })
  } catch (error) {
    if (error.response && error.response.status === 503) {
      alert("Something went wrong. Please try again later. 503");
    } else {
     alert("Details Not Found, Password and username does not match")
    }
    setLoading(false); 
  }

}


  // const handleLogin = async () => {
  //   try {
  //    await axios.post(`${config.baseUrl}/login`, {
        
  //     //  username: "",
  //       email:formData.email,
  //       password:formData.password,
      
  //         // username:"Vimlesh",
  //         // email: "vimlesh.kumhar@reformiqo.com",
  //         // password:"123",
        
  //     }).then((res) => 

  //     {
  //       console.log(res.data.jwt)
  //       if (res.data.jwt) {
  //         document.cookie = `jwt=${res.data.jwt};  email=${formData.email}`;
  //         handleLoginCallback(props.onLogin);
  //         // localStorage.setItem('jwt', res.data.jwt)
  //        // navigate(`/dashboard?email=${formData.email}`)
  //        navigate(`/dashboard`)
  //       } else {
  //         console.log(res.error)
  //       }
  //     })
  //   } catch (error) {
  //     if (error.response && error.response.status === 503) {
  //       alert("Something went wrong. Please try again later. 503");
  //     } else {
      //  alert("Details Not Found, Password and username does not match")
  //     }

  //   }
  // }
  function handleLoginCallback(callback) {
    callback();
  }

  const signInButtonRef = useRef(null);

  const handlePasswordKeyPress = (event) => {
    console.log("hello")
    if (event.key === "Enter") {
     handleLogin();
      console.log("hello")
    }
    console.log("hello")
  }; 

  return (
    <div className="login-page-main">
      <img
        className="card-background-image"
        src="/images/icons/background_image_login_page_ipad.svg"
      />
 
      <div className="card_main_container">
        {activePage === "loginPage" && (
                <form onSubmit={handleSubmit} autoComplete="off">
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
                  inputType={"email"}
                  onChange={(e, newValue) =>
                    {handleChange(e); onChange(e); 
                      setFormData(prevState => ({
                        ...prevState,
                        "email": newValue
                      }))}}
                      onFocus={handleFocus}
                      onBlur={handleBlur}
                      error={errors.email && touched.email ? true : false}
                      errorMsg={errors.email}
                />
              </div>

              <div className="login-password">
                {/* <label htmlFor="password-box">Password</label> */}
                <CustomInput
                  className="login_password_input"
                  id="password-box"
                  type={showPassword ? "text" : "password"}
                 // placeholder="***************"
                  // value={name}
                  onKeyPress={handlePasswordKeyPress}
                  width={330}
                  label="Password"
                  value={formData.password}
                  name="password"
                  inputType={"AlphaNumeric"}
                  onChange={(e, newValue) =>
                    {handleChange(e); onChange(e); 
                      setFormData(prevState => ({
                        ...prevState,
                        "password": newValue
                      }))}}
                      onFocus={handleFocus}
                      onBlur={handleBlur}
                      error={errors.password && touched.password ? true : false}
                      errorMsg={errors.password}
                      // icon= {showPassword ? (
                      //   <img src="/images/icons/Show.svg" alt="eye" />
                      // ) : (
                      //   <img src="/images/icons/eye_icon.svg" alt="eye" />
                      // )}
                      // onClick={handlePasswordClick}
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
            {loading ?  
      
          <div className="loader_container animated zoomIn"><div class="loader"></div></div>
               : <ContainedButton
               className="button_loader" 
               type="submit"
              value=  "Sign In"
               id="sign-in-btn" width={330}  ref={signInButtonRef}   onClick={() => {handleLogin();}} 
               /> 
          
               }
       
            
            {/* <ContainedButton
               className="button_loader" 
               type="submit"
              value=  "Sign In"
               id="sign-in-btn" width={330}  ref={signInButtonRef}   onClick={() => {handleLogin();}} 
               /> */}
            <div className="create-account-container">
              <p>
                New on our Platform? <span>Create an Account</span>
              </p>
            </div>
          </div>
          </form>
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
<ToastContainer />
    </div>
  );
};

export default LoginPage;
