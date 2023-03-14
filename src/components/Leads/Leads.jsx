import React, { useEffect, useRef, useState } from "react";
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
import config from "../Database/config";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { Navigate } from "react-router-dom";

var ChildStateModificationFunc;
const initialFieldValues = {
    name: "",
    mobile_no: "",
    email: "",
    company_name: "",
    lead: "",
    ownership: "",
  };

  const resetValue = {
    name: "",
    mobile_no: "",
    email: "",
    company_name: "",
    lead_source_type: "",
    ownership: "",
  };

function Leads(props) {
  const [checked, setChecked] = useState("contacts");
    const [contact, setContact] = useState([]);
    const [formData, setFormData] = useState(resetValue);
  function handleclose() {
    var m = document.querySelector(".menu1 ");
    m.classList.remove("smenu");
    document.getElementById("gradient").classList.remove("body_gradient");
  setFormData(resetValue);
  }

//inert
const clearValue= () =>
{
  setFormData(formData.name="")
  setFormData(formData.mobile="")

}

//send state to leaddata
ChildStateModificationFunc = (modVal)=>{
  setFormData(modVal)
}



const handleFormSubmit = () => {
  if (formData.id)
  {
    // props.onSubmit(setFormData);
    axios
      .put(
        `${config.baseUrl}/leads/` + formData.id + "/",
        {
          name: formData.name,
          mobile_no: formData.mobile_no,
          email: formData.email,
          company_name:formData.company_name,
          lead_source_type: formData.lead_source_type,
          "is_active": true,
          "is_deleted": false,
          "status": 1,
          "ownership": 1,
          "company_id": 1,
          "created_by": 1,
          "updated_by": 1
        },
        formData
      )
      .then((response) => {
       // closeModal();
       // handleCancel();
       handleclose();
       props.onClick();
 //       getData();
        toast.success("Updated Successfuly", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
        });
      
       
      });
  }
  else{
  axios
    .post(
      `${config.baseUrl}/leads/`,
      {
        name: formData.name,
        mobile_no: formData.mobile_no,
        email: formData.email,
        company_name:formData.company_name,
        lead_source_type: formData.lead_source_type,
        "is_active": true,
        "is_deleted": false,
        "status": 1,
        "ownership": 1,
        "company_id": 1,
        "created_by": 1,
        "updated_by": 1
      },
      formData
    )
    .then((response) => {
      // getData();
      props.onClick();
      handleclose();
      clearValue();

       toast.success("Added Successfuly", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
      });
    
     
    });
  }
}

const handleDrpChange = (field, value) => {
  setFormData({ ...formData, [field]: value });
 setFieldValue(field, value);
 setFieldTouched(field, false);
 console.log(field)
 console.log(value)
};

const onChange = (e) => {
const { value, name } = e.target;

setFormData({ ...formData, [name]: value });
console.log(value);
console.log(name);
};

console.log(formData)

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

  // const handleDrpChange = (field, value) => {
  //   setFieldValue(field, value);
  //   setFieldTouched(field, false);
  
  //   // console.log("value", value);
  //   // console.log("field", field);
  // };

//Get contact

const getContact = () => {
  return fetch(`${config.baseUrl}/contact/`)
    .then((response) => response.json())
    .then((data) => {
      setContact(data);
      console.log(data);
    });
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

  const contacts = contact.map((con) => ({
    label: con.name,
    value:con.name,
  }));

  useEffect (()=>{
    getContact();
  },[])

  //input validation

  const inputRef=useRef(null);

  const handleKeyPress = (e) =>
  {
      if(e.target.value.length >= 10)
      {
        e.preventDefault();
      }
  }

  const token = localStorage.getItem("jwt")
  let loggedIn= true
  if(token == null)
  {
    localStorage.removeItem("jwt");
    loggedIn = false
  }
 // Details={loggedIn}

if(loggedIn == false)
{
  localStorage.removeItem("jwt");
  return <Navigate to="/"/>
}

  return (
    <>
    <form onSubmit={handleSubmit} autoComplete="off">
      <div className="contact_heading">
      </div>
      
      <div className="contactform">
        <div className="contacts">
          <h1 className="box_heading1">{formData.id ? "Update Lead" : "New Lead"}</h1>
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
                  value={formData.name}
                  onChange={(e) => {handleChange(e); onChange(e);}}
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
                    errors.mobile_no && touched.mobile_no && "inputError"
                  } contactinput`} style={{ marginTop: "5px" }}>
                <img src={Phone} className="customerimg" />
                <input
                  type="number"
                 ref={inputRef}
                 onKeyPress={handleKeyPress}
                 
                  className="inputcontact"
                  placeholder="Placeholder"
                    name="mobile_no"
                    value={formData.mobile_no}
                    onChange={(e) => {handleChange(e); onChange(e);}}
                    onBlur={handleBlur}
                />
                {errors.mobile_no && touched.mobile_no && (
                    <div className="error_icon">
                    <img
                      src="/images/icons/exclamation_icon.svg"
                      alt="error"
                    />
                  </div>
                  )}
              </div>
              {errors.mobile_no &&  touched.mobile_no &&(
                    <p className="error_text">{errors.mobile_no}</p>
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
                    value={formData.email}
                    onChange={(e) => {handleChange(e); onChange(e);}}
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
                    errors.company_name && touched.company_name && "inputError"
                  } contactinput`} style={{ marginTop: "5px" }}>
                <img src={company} className="customerimg" />
                <input
                  type="text"
                  className="inputcontact"
                  placeholder="Placeholder"
                    name="company_name"
                    value={formData.company_name}
                    onChange={(e) => {handleChange(e); onChange(e);}}
                    onBlur={handleBlur}
                />
                {errors.company_name && touched.company_name && (
                    <div className="error_icon">
                    <img
                      src="/images/icons/exclamation_icon.svg"
                      alt="error"
                    />
                  </div>
                  )}
              </div>
              {errors.company_name &&  touched.company_name &&(
                    <p className="error_text">{errors.company_name}</p>
                  )}
              </div>

               <div className="dropdownBtn">

                <Tooltip title="prompt text" color="#5C5AD0">
                {" "}
                <label className="leadlabel">Lead Source Type</label>{" "}
              </Tooltip>
              <br />
              <div className="radio-group">
                <label className="radio">
                  <input
                    type="radio"
                    value="Contacts"
                    name="lead_source_type"
                    checked={checked == "contacts" ? true : false}
                    onClick={(e) => setChecked("contacts")}
                  />
                  Contacts
                  <span></span>
                </label>
                <label className="radio">
                  <input
                    type="radio"
                    value="Others"
                    name="lead"
                    onClick={(e) => setChecked("Others")}
                    checked={checked == "Others" ? true : false}
                  />
                  Others
                  <span></span>
                </label>
              </div>
              <Tooltip title="prompt text" color="#5C5AD0">
                {" "}
                <label className="leadlabel" style={{ marginTop: "15px" }}>
                  {checked == "contacts" ? "Contacts" : "Others"}
                </label>{" "}
              </Tooltip>
              <br />
              {checked == "contacts" ? (
                <SearchDropdown options={contacts} width={330} name="lead_source_type" value={formData.lead_source_type} 
                onChange={handleDrpChange} />
              ) : (
                <SearchDropdownAddButton  width={330} name="lead_source_type" value={formData.lead_source_type} 
                onChange={handleDrpChange} />
              )}
  
  </div>
              {/* <Tooltip title="prompt text" color="#5C5AD0">
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
              </div> */}

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
                  value={formData.position}
                  error={errors.position && touched.position ? true : false}
                  errorMsg="Ownership is required"/>
              </div>
              

              <div className="contactbutton_bottom">
              <button type="submit" className="contactsavebutton"  onClick={() => {handleFormSubmit()}}>
                  {formData.id ? "Update" :"Submit"}
                </button> 
                {/* <input type="submit" className="contactsavebutton"  onClick={() => {handleFormSubmit()}} /> */}
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
      <ToastContainer/>
    </>
  );
}

export default Leads;
export {ChildStateModificationFunc}
