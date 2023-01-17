import React, { useEffect, useState } from "react";
import "./Leads.scss";
import company from "../../assets/Images/FormIcon/Company Name.svg";
import email from "../../assets/Images/FormIcon/Email Lead.svg";
import Phone from "../../assets/Images/FormIcon/Phone.svg";
import name from "../../assets/Images/FormIcon/Name.svg";
import SearchDropdown from "../AllDropdowns/SearchDropdown/SearchDropdown";
import SearchDropdownAddButton from "../AllDropdowns/SearchDropdownAddButton/SearchDropdownAddButton";
import { Tooltip } from "antd";
import { useFormik } from "formik";

import { contactSchemas } from "../../Schemas";






const initialFieldValues = {
    name: "",
    mobile: "",
    email: "",
    company: "",
    position: "",
    ownership: "",
  };

function Leads() {
  const [checked, setChecked] = useState("Contacts");
  function handleclose() {
    var m = document.querySelector(".menu1 ");
    m.classList.remove("smenu");
    document.getElementById("gradient").classList.remove("body_gradient");
  }


    // validation 

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
    initialValues: initialFieldValues,
  
    validationSchema: contactSchemas,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  const handleDrpChange = (field, value) => {
    setFieldValue(field, value);
    setFieldTouched(field, false);
  
    // console.log("value", value);
    // console.log("field", field);
  };

  const ownershipwithemail = [
    {
      value: "Parth1",
      label: (
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <div>
              {" "}
              <img
                src="/images/searchbar_icons/User-Avtar.svg"
                alt=""
                width="35px"
                height="35px"
              />
            </div>
            <div
              style={{
                marginLeft: "5px",
                width: "139px",
                height: "",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <p className="name">Parth Goswami</p>
              {/* <p1 className="email">Parth.goswami@reformiqo.com</p1> */}
            </div>
            <div
              className="date"
              style={{
                marginLeft: "97px",
                borderRadius: "50%",
                width: "20px",
                height: "20px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              19
            </div>
          </div>
        </div>
      ),
    },
  
    {
      value: "Parth2",
      label: (
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <div>
              {" "}
              <img
                src="/images/searchbar_icons/User-Avtar.svg"
                alt=""
                width="35px"
                height="35px"
              />
            </div>
            <div
              style={{
                marginLeft: "5px",
                width: "139px",
                height: "",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <p className="name">Parth Goswami</p>
              {/* <p1 className="email">Parth.goswami@reformiqo.com</p1> */}
            </div>
            <div
              className="date"
              style={{
                marginLeft: "97px",
                borderRadius: "50%",
                width: "20px",
                height: "20px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              19
            </div>
          </div>
        </div>
      ),
    },
    {
      value: "Parth3",
      label: (
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <div>
              {" "}
              <img
                src="/images/searchbar_icons/User-Avtar.svg"
                alt=""
                width="35px"
                height="35px"
              />
            </div>
            <div
              style={{
                marginLeft: "5px",
                width: "139px",
                height: "",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <p className="name">Parth Goswami</p>
              {/* <p1 className="email">Parth.goswami@reformiqo.com</p1> */}
            </div>
            <div
              className="date"
              style={{
                marginLeft: "97px",
                borderRadius: "50%",
                width: "20px",
                height: "20px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              19
            </div>
          </div>
        </div>
      ),
    },
    {
      value: "Parth4",
      label: (
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <div>
              {" "}
              <img
                src="/images/searchbar_icons/User-Avtar.svg"
                alt=""
                width="35px"
                height="35px"
              />
            </div>
            <div
              style={{
                marginLeft: "5px",
                width: "139px",
                height: "",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <p className="name">Parth Goswami</p>
              {/* <p1 className="email">Parth.goswami@reformiqo.com</p1> */}
            </div>
            <div
              className="date"
              style={{
                marginLeft: "97px",
                borderRadius: "50%",
                width: "20px",
                height: "20px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              19
            </div>
          </div>
        </div>
      ),
    },
    {
      value: "Parth5",
      label: (
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <div>
              {" "}
              <img
                src="/images/searchbar_icons/User-Avtar.svg"
                alt=""
                width="35px"
                height="35px"
              />
            </div>
            <div
              style={{
                marginLeft: "5px",
                width: "139px",
                height: "",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <p className="name">Parth Goswami</p>
              {/* <p1 className="email">Parth.goswami@reformiqo.com</p1> */}
            </div>
            <div
              className="date"
              style={{
                marginLeft: "97px",
                borderRadius: "50%",
                width: "20px",
                height: "20px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              19
            </div>
          </div>
        </div>
      ),
    },
  ];

  const contacts = [
    {
      value: "1",
      label: "Aman Jaria",
    },
    {
      value: "2",
      label: "Ashish Jaria",
    },
    {
      value: "3",
      label: "Parth Goswami",
    },
    {
      value: "4",
      label: "Suryansh Jaria",
    },
    {
      value: "5",
      label: "Kushal Nahata",
    },
  ];


  return (
    <>
    <form onSubmit={handleSubmit} autoComplete="off">
      <div className="contact_heading">
      </div>
      
      <div className="contactform">
        <div className="contacts">
          <h1 className="box_heading1">New Contact</h1>
          <div className="contact_details">
            <div className="form-left">
            <div className="form_field">
              <Tooltip title="prompt text" color="#5C5AD0">
                {" "}
                <label className="contactlabel" style={{ marginTop: "5px" }}>
                  Name
                </label>{" "}
              </Tooltip>
              <br />
              <div  className={`${
                    errors.name && touched.name && "inputError"
                  } contactinput`} style={{ marginTop: "5px" }}>
                <img src={name} className="customerimg" />
                <input
                  type="text"
                  className="inputcontact"
                  placeholder="Placeholder"
                  name="name"
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.name && touched.name && (
                    <div className="error_icon">
                    <img
                      src="/images/icons/exclamation_icon.svg"
                      alt="error"
                    />
                  </div>
                  )}
              </div>
              {errors.name &&  touched.name &&(
                    <p className="error_text">{errors.name}</p>
                  )}
              </div>
              <div className="form_field">
              <Tooltip title="prompt text" color="#5C5AD0">
                {" "}
                <label className="contactlabel" style={{ marginTop: "5px" }}>
                  Mobile No.
                </label>{" "}
              </Tooltip>
              <br />
              <div className={`${
                    errors.mobile && touched.mobile && "inputError"
                  } contactinput`} style={{ marginTop: "5px" }}>
                <img src={Phone} className="customerimg" />
                <input
                  type="text"
                  className="inputcontact"
                  placeholder="Placeholder"
                    name="mobile"
                    value={values.mobile}
                    onChange={handleChange}
                    onBlur={handleBlur}
                />
                {errors.mobile && touched.mobile && (
                    <div className="error_icon">
                    <img
                      src="/images/icons/exclamation_icon.svg"
                      alt="error"
                    />
                  </div>
                  )}
              </div>
              {errors.mobile &&  touched.mobile &&(
                    <p className="error_text">{errors.mobile}</p>
                  )}
              </div>
              <div className="form_field">
              <Tooltip title="prompt text" color="#5C5AD0">
                {" "}
                <label className="contactlabel" style={{ marginTop: "5px" }}>
                  Email
                </label>{" "}
              </Tooltip>
              <br />
              <div className={`${
                    errors.email && touched.email && "inputError"
                  } contactinput`} style={{ marginTop: "5px" }}>
                <img src={email} className="customerimg" />
                <input
                  type="text"
                  className="inputcontact"
                  placeholder="Placeholder"
                    name="email"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                />
                {errors.email && touched.email && (
                    <div className="error_icon">
                    <img
                      src="/images/icons/exclamation_icon.svg"
                      alt="error"
                    />
                  </div>
                  )}
              </div>
              {errors.email &&  touched.email &&(
                    <p className="error_text">{errors.email}</p> 
                  )}
              </div>
              <div className="form_field">
              <Tooltip title="prompt text" color="#5C5AD0">
                {" "}
                <label className="contactlabel" style={{ marginTop: "5px" }}>
                  Company Name
                </label>{" "}
              </Tooltip>
              <br />
              <div className={`${
                    errors.company && touched.company && "inputError"
                  } contactinput`} style={{ marginTop: "5px" }}>
                <img src={company} className="customerimg" />
                <input
                  type="text"
                  className="inputcontact"
                  placeholder="Placeholder"
                    name="dob"
                    value={values.dob}
                    onChange={handleChange}
                    onBlur={handleBlur}
                />
                {errors.company && touched.company && (
                    <div className="error_icon">
                    <img
                      src="/images/icons/exclamation_icon.svg"
                      alt="error"
                    />
                  </div>
                  )}
              </div>
              {errors.company &&  touched.company &&(
                    <p className="error_text">{errors.company}</p>
                  )}
              </div>

              <div className="dropdownBtn">
              <Tooltip title="prompt text" color="#5C5AD0">
                {" "}
                <label className="contactlabel" style={{ marginTop: "15px" }}>
                  Position
                </label>{" "}
              </Tooltip>
              <br />

              <SearchDropdown width={331} options={contacts}
                name="position"
                onChange={handleDrpChange}
                value={values.position}
                error={errors.position && touched.position ? true : false}
                errorMsg="Position is required"
                  />
              </div>

              <div className="dropdownBtn">
              <Tooltip title="prompt text" color="#5C5AD0">
                {" "}
                <label className="contactlabel" style={{ marginTop: "15px" }}>
                  Ownership
                </label>{" "}
              </Tooltip>
              <br />
              <SearchDropdown width={331} options={ownershipwithemail}  name="ownership"
                  onChange={handleDrpChange}
                  value={values.position}
                  error={errors.position && touched.position ? true : false}
                  errorMsg="Ownership is required"/>
              </div>
              

              <div className="contactbutton_bottom">
                {/* <input type="submit" className="contactsavebutton"  onClick={() => handleFormSubmit()}>
                  Submit
                </input> */}
                <input type="submit" className="contactsavebutton" />
                <button 
                  type="button"
                  className="contactcancelbutton"
                  onClick={handleclose}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      </form>
    </>
  );
}

export default Leads;
