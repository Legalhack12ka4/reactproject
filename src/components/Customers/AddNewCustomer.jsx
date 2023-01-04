import React, { useEffect, useState } from "react";
import SearchDropdown from "../AllDropdowns/SearchDropdown/SearchDropdown";
import Page_heading from "../Page_Heading/Page_heading";
import "./AddNewCustomer.scss";
import creditcard from "../../assets/Images/FormIcon/Credit Limit.svg";
import email from "../../assets/Images/FormIcon/Email.svg";
import gstno from "../../assets/Images/FormIcon/Gst no.svg";
import pan from "../../assets/Images/FormIcon/Pan Card.svg";
import pin from "../../assets/Images/FormIcon/Pincode.svg";
import street from "../../assets/Images/FormIcon/Street 1 & Street 2.svg";
import business from "../../assets/Images/FormIcon/Business.svg";
import "../AllDropdowns/SearchDropdown/SearchDropdown.scss";
import { Tooltip } from "antd";
import  {  Button, Checkbox, Form, Input  } from "antd";
import Icon from "./Icon";

const initialFieldValues = {
  gsttreat:"",
  gstin: "",
  businessname:"",
  category:"",
  pancard:"",
  currency:"",
  payment:"",
  credit:"",
  email:"",
  pincode:"",
  street1:"",
  street2:"",
  city:"",
  state:"",
  pos:"",
  contact:"",
  ownership:""
};

function AddNewCustomer(props) {
  const [values, setValues] = useState(initialFieldValues);
  const [customer, setCustomer] = useState([]);
  const [gstnoErr, setGstnoErr] = useState({});
  ///const [isValid, setIsValid] = useState(true);
  // const [emailvaild, setEmailvaild] = useState(true);
  const [gstTreatErrvalid, setGstTreatErrvalid] =useState(true);
  const [gstinErrvalid, setGstinErrvalid] =useState({});
  const [businessNameErrvalid, setBusinessNameErrvalid] =useState(true);
  const [categoryErrvalid, setCaegoryErrvalid] =useState(true);
  const [pancardErrvalid, setPancardErrvalid] =useState(true);
  const [currencyErrvalid, setCurrencyErrvalid] =useState(true);
  const [paymentErrvalid, setPaymentErrvalid] =useState(true);
  const [creditErrvalid, setCreditErrvalid] =useState(true);
  const [emailErrvalid, setEmailErrvalid] =useState(true);
  const [pincodeErrvalid, setPincodeErrvalid] =useState(true);
  const [street1Errvalid, setStreet1Errvalid] =useState(true);
  const [street2Errvalid, setStreet2Errvalid] =useState(true);
 // const [cityErr, setCityErr] =useState({});
 // const [stateErr, setStateErr] =useState({});
  const [posErrvalid, setPosErrvalid] =useState({});
  const [contactErrvalid, setContactErrvalid] =useState(true);
  const [ownershipErrvalid, setOwnershipErrvalid] =useState(true);





  const [gstTreatErr, setGstTreatErr] =useState({});
  const [gstinErr, setGstinErr] =useState({});
  const [businessNameErr, setBusinessNameErr] =useState({});
  const [categoryErr, setCaegoryErr] =useState({});
  const [pancardErr, setPancardErr] =useState({});
  const [currencyErr, setCurrencyErr] =useState({});
  const [paymentErr, setPaymentErr] =useState({});
  const [creditErr, setCreditErr] =useState({});
  const [emailErr, setEmailErr] =useState({});
  const [pincodeErr, setPincodeErr] =useState({});
  const [street1Err, setStreet1Err] =useState({});
  const [street2Err, setStreet2Err] =useState({});
 // const [cityErr, setCityErr] =useState({});
 // const [stateErr, setStateErr] =useState({});
  const [posErr, setPosErr] =useState({});
  const [contactErr, setContactErr] =useState({});
  const [ownershipErr, setOwnershipErr] =useState({});

  
  const  onSubmit = (e) => {

      e.preventDefault();
      const isValid= formValidation();
      }
    const formValidation = () =>
    {
        const gstTreatErr={};
        const gstinErr={};
        const businessNameErr = {};
        const categoryErr={};
        const pancardErr={};
        const currencyErr={};
        const paymentErr={};
        const creditErr={};
        const emailErr={};
        const pincodeErr={};
        const street1Err={};
        const street2Err={};   
       // const cityErr={};
       // const stateErr={};
        const posErr={};
        const contactErr={};
        const ownershipErr={};

        let isValid = true;
        if(values.gsttreat.trim().length <1)
        {
           gstTreatErr.gstTraetment = "Please select gst treatment";
           setGstTreatErrvalid(false);
        
           //setInputvalid(false);
        }
        if(values.gstin.trim().length <15)
        {
           gstinErr.gstNo = "Please enter valid gst no";
           setGstinErrvalid(false);
          
        }
        if(values.gstin.trim().length >15)
        {
           gstinErr.gstNo = "Gst no is not more than 15 inputs";
           setGstinErrvalid(false);
        }
       if(values.businessname.trim().length<4)
       {
        businessNameErr.bussinessNameShort = "Business Name is required";
        setBusinessNameErrvalid(false);
         
       }
      //  if(values.gstin.trim().length <1)
      //  {
      //     gstTreatErr.gstTraetment = "Please select gst treatment";
      //     setInputvalid(false);
      //  }
       if(values.category.trim().length <1)
       {
          categoryErr.category = "Please select category";
          setCaegoryErrvalid(false);
         

       }
       if(values.pancard.trim().length <10)
       {
          pancardErr.pancard = "Pancard is not valid";
         // values.pancard. = "2px solid red";
         setPancardErrvalid(false);
        
         // isValid=false;
       }
       if(values.pancard.trim().length >10)
       {
          pancardErr.pancard = "Pancard is not more than 10 inputs";
          setPancardErrvalid(false);
       }
       if(values.currency.trim().length <1)
       {
          currencyErr.currency = "Please select currency";
          setCurrencyErrvalid(false);
        
       }
       if(values.payment.trim().length <1)
       {
          paymentErr.paymnet = "Please select payment";
          setPaymentErrvalid(false);
        
       }
       if(values.credit.trim().length <1)
       {
          creditErr.credit = "Please enter credit limit";
          setCreditErrvalid(false);
       
       }
       if(values.email.trim().length <1)
       {
          emailErr.email = "Please enter valid email";
          setEmailErrvalid(false);
         
       }
       if(values.pincode.trim().length <6)
       {
          pincodeErr.pincode = "Please enter valid pincode";
          setPincodeErrvalid(false);
          
       }
       if(values.pincode.trim().length >6)
       {
          pincodeErr.pincode = "Please should not more than 6 digits";
          setPincodeErrvalid(false);
       }
       if(values.street1.trim().length <1)
       {
          street1Err.street1 = "Please  enter address 1";
          setStreet1Errvalid(false);
        
       }
       if(values.street2.trim().length <1)
       {
          street2Err.street2 = "Please enter address 2";
          setStreet2Errvalid(false);
         
       }
      //  if(values.city.trim().length <1)
      //  {
      //     cityErr.city = "Please select city";
      //     isValid=false;
      //  }
      //  if(values.state.trim().length <1)
      //  {
      //     stateErr.state = "Please select state";
      //     isValid=false;
      //  }
       if(values.pos.trim().length <1)
       {
          posErr.pos = "Please select pos";
          setPosErrvalid(false);
        
       }
       if(values.contact.trim().length <1)
       {
          contactErr.contact = "Please select contact";
          setContactErrvalid(false);
       
       }
       if(values.ownership.trim().length <1)
       {
          ownershipErr.ownership = "Please select ownership";
          setOwnershipErrvalid(false);
       }
     
     
      setGstTreatErr(gstTreatErr);
      setGstinErr(gstinErr);
      setBusinessNameErr(businessNameErr);
      setCaegoryErr(categoryErr);
      setPancardErr(pancardErr);
      setCurrencyErr(currencyErr);
      setPaymentErr(paymentErr);
      setCreditErr(creditErr);
      setEmailErr(emailErr);
      setPincodeErr(pincodeErr);
      setStreet1Err(street1Err);
      setStreet2Err(street2Err);
      //setCityErr(cityErr);
    //  setStateErr(stateErr);
      setPosErr(posErr);
      setContactErr(contactErr);
      setOwnershipErr(ownershipErr);






       return isValid;
    
    }

  const [gst, setGst] = useState(false);
  console.log(values);
  let gstinparams = values.gstin;

  const getData = () => {
    fetch(
      `https://commonapi.mastersindia.co/commonapis/searchgstin?gstin=${gstinparams}`,
      {
        headers: {
          Authorization: "Bearer 0ab31ef7392227173c6e8d34195e86d5eb0da1e9",
          client_id: "JarZChUcsytSBbnkpt",
        },
      }
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setCustomer(data);
        console.log("data", data.lgnm);
      });
  };

  useEffect(() => {
    getData();
    console.log("Getting Data");
    console.log(values.gstin);
  }, [gst]);

  const onBlur = (e) => {
    //alert(e.target.value)
    setGst(!gst);
    console.log(gst);
  };

  const onChange = (e) => {
    e.preventDefault();
    const { value, name } = e.target;
    setGstTreatErrvalid(true);
    setGstinErrvalid(true);
    setBusinessNameErrvalid(true);
    setCaegoryErrvalid(true);
    setPancardErrvalid(true);
    setCurrencyErrvalid(true);
    setPaymentErrvalid(true);
    setCreditErrvalid(true);
    setEmailErrvalid(true);
    setPincodeErrvalid(true);
    setStreet1Errvalid(true);
    setStreet2Errvalid(true);
    setPosErrvalid(true);
    setContactErrvalid(true);
    setOwnershipErrvalid(true);
  
    //setInputvalid(true);
  //  console.log(emailvaild);
    setValues({
      ...values,
      [name]: value,
    });
    console.log(value);
    console.log(name);
  };
 console.log(values);

  const typeCategory = [
    {
      value: "1",
      label: "Wholesalar",
    },
    {
      value: "2",
      label: "Retailer",
    },
    {
      value: "3",
      label: "Manufacturing",
    },
  ];
  const gsttreatment = [
    {
      value: "1",
      label: (
        <div>
          <p className="dropdown_title_heading">
            Registered Business - Regular
          </p>
          <p className="dropdown_desc_text" style={{ fontSize: "12px" }}>
            Business that is registered under GST
          </p>
        </div>
      ),
    },
    {
      value: "2",
      label: (
        <div>
          <p className="dropdown_title_heading">
            Registered Business - Composition
          </p>
          <p style={{ fontSize: "12px" }}>
            Business that is registered under the Composition
            <br /> Scheme in GST
          </p>
        </div>
      ),
    },
    {
      value: "3",
      label: (
        <div>
          <p className="dropdown_title_heading">Unegistered Business</p>
          <p style={{ fontSize: "12px" }}>
            Bussines that has not been registered
            <br /> under GST
          </p>
        </div>
      ),
    },
    {
      value: "4",
      label: (
        <div>
          <p className="dropdown_title_heading">Consumer</p>
          <p>A customer who is regular Consumer</p>
        </div>
      ),
    },
    {
      value: "5",
      label: (
        <div>
          <p className="dropdown_title_heading">Overseas</p>
          <p style={{ fontSize: "12px" }}>
            Person with whom you do import or export of
            <br />
            supplies outside India
          </p>
        </div>
      ),
    },
    {
      value: "6",
      label: (
        <div>
          <p className="dropdown_title_heading">Special Economic Zone</p>
          <p style={{ fontSize: "12px" }}>
            Business (Unit) that is located in a Special
            <br />
            Economic Zone (SEZ) of Inida or a SEZ Developer
          </p>
        </div>
      ),
    },

    {
      value: "7",
      label: (
        <div>
          <p className="dropdown_title_heading">Deemed Export</p>
          <p style={{ fontSize: "12px" }}>
            Supply of goods to an Export Oriented Unit or
            <br />
            against Advanced Authorization/Export Promotion
            <br />
            Capital Goods.
          </p>
        </div>
      ),
    },
    {
      value: "8",
      label: (
        <div>
          <p className="dropdown_title_heading">Tax Deductor</p>
          <p style={{ fontSize: "12px" }}>
            Department of the State/Central government,
            <br />
            government agancies or local authorites
          </p>
        </div>
      ),
    },
    {
      value: "9",
      label: (
        <div>
          <p className="dropdown_title_heading">SEZ Developer</p>
          <p style={{ fontSize: "12px" }}>
            A person/origanisation who owns at least 26% of
            <br />
            the equity in creating business units in a Special
            <br />
            Economic Zone (SEZ)
          </p>
        </div>
      ),
    },
  ];

  const gsttraetmentOptional = [
    {
      value: "1",
      label: "Value 1",
    },
    {
      value: "2",
      label: "Value 2",
    },
    {
      value: "3",
      label: "Value3",
    },
  ];

  const ownershipwithemail = [
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
    <div className="addNewCustomerContainer">
      <div className="addcustomer_heading">
        <Page_heading parent={"Business Account"} child={"Add New Customer"} />
      </div>
  
      <div className="customerform">

        <div className="newcustomer">
          {/* <h1 className="box_heading1">New Customer</h1> */}
          <form  onClick={onSubmit}>
          <div className="container_details1">
        
            <div className="form-left">
              <Tooltip title="prompt text" color="#5C5AD0">
                {" "}
                <label className="label">GST Treatment</label>{" "}
              </Tooltip>
              <br />
            
              <SearchDropdown width={331} options={gsttreatment} value={values.gsttreat} onChange={onChange} name="gsttreat"
            className={`ant-select ${!gstTreatErrvalid ? "validationinputborder" : ""}`}
              />
              
             {Object.keys(gstTreatErr).map((key)=>
              {
                return <div className="validationerror">{gstTreatErr[key]}</div>
              })}
              <Tooltip title="prompt text" color="#5C5AD0">
                {" "}
                <label className="label" style={{ marginTop: "5px" }}>
                  GST No.
                </label>
              </Tooltip>
              <br />
              <div className={`customerdropdown ${!gstinErrvalid ? "validationinputborder" : ""}`} style={{ marginTop: "5px" }}>
                <img src={gstno} className="customerimg" />
                <input
                  type="text"
                  style={{ border: "none", outline: "none", width: "82%" }}
                  placeholder="Placeholder"
                  name="gstin"
                  value={values.gstin}
                  onBlur={onBlur}
                  onChange={onChange}
                />
              </div>
              {Object.keys(gstinErr).map((key)=>
              {
                return <div className="validationerror">{gstinErr[key]}</div>
              })}
              <Tooltip title="prompt text" color="#5C5AD0">
                {" "}
                <label className="label" style={{ marginTop: "5px" }}>
                  Business Name{" "}
                </label>{" "}
              </Tooltip>

              <br />
              <div className={`customerdropdown ${!businessNameErrvalid ? "validationinputborder" : ""}`} style={{ marginTop: "5px" }}>
                <img src={business} className="customerimg" />
                <input
                  type="text"
                  style={{ border: "none", outline: "none", width: "82%" }}
                  placeholder="Placeholder"
                  value={values.businessname} onChange={onChange}
                  name="businessname"
                />
              </div>
              {Object.keys(businessNameErr).map((key)=>
              {
                return <div className="validationerror">{businessNameErr[key]}</div>
              })}
              <Tooltip title="prompt text" color="#5C5AD0">
                <label className="label">Type Category</label>
              </Tooltip>
              <br />
              <SearchDropdown options={typeCategory} width={330} value={values.category} onChange={onChange} name="category" />
               
             {Object.keys(categoryErr).map((key)=>
              {
                return <div className="validationerror">{categoryErr[key]}</div>
              })}
              <Tooltip title="prompt text" color="#5C5AD0">
                <label className="label" style={{ marginTop: "5px" }}>
                  Pancard
                </label>
              </Tooltip>
              <br />
              <div className={`customerdropdown ${!pancardErrvalid ? "validationinputborder" : ""}`}>
                <img src={pan} className="customerimg" />
                <input
                  type="text"
                  style={{ border: "none", outline: "none", width: "82%" }}
                 
                  placeholder="Placeholder"
                  value={values.pancard} onChange={onChange}
                  name="pancard"
                />
              </div>
              {Object.keys(pancardErr).map((key)=>
              {
                return <div className="validationerror">{pancardErr[key]}</div>
              })}
              <div style={{ display: "flex", gap: "30px" }}>
                <div style={{ width: "50%" }}>
                  <Tooltip title="prompt text" color="#5C5AD0">
                    {" "}
                    <label className="label" style={{ marginTop: "5px" }}>
                      Currency
                    </label>
                  </Tooltip>
                  <br />
                  <SearchDropdown width={150}  value={values.currency} onChange={onChange} name="currency" />
                  {Object.keys(currencyErr).map((key)=>
              {
                return <div className="validationerror">{currencyErr[key]}</div>
              })}
                </div>
                <div style={{ width: "50%" }}>
                  <Tooltip title="prompt text" color="#5C5AD0">
                    {" "}
                    <label className="label">Payment Terms</label>
                  </Tooltip>
                  <br />
                  <SearchDropdown width={150} value={values.payment} onChange={onChange} name="payment"/>
                  {Object.keys(paymentErr).map((key)=>
              {
                return <div className="validationerror">{paymentErr[key]}</div>
              })}
                </div>
              </div>

              <div className="customerbutton_bottom">
                <button type="button" className="customersavebutton">
                  Submit
                </button>
                <button type="button" className="customercancelbutton">
                  Cancel
                </button>
              </div>
            </div>

            <div className="form-center">
              <Tooltip title="prompt text" color="#5C5AD0">
                {" "}
                <label className="label" style={{ marginTop: "5px" }}>
                  Credit Limit
                </label>
              </Tooltip>
              <br />
              <div className={`customerdropdown ${!creditErrvalid ? "validationinputborder" : ""}`}>
                <img src={creditcard} className="customerimg" />
                <input
                  type="text"
                  style={{ border: "none", outline: "none", width: "82%" }}
                  placeholder="Placeholder"
                  value={values.credit} onChange={onChange}
                  name="credit"
                />
              </div>
              {Object.keys(creditErr).map((key)=>
              {
                return <div className="validationerror">{creditErr[key]}</div>
              })}
              <Tooltip title="prompt text" color="#5C5AD0">
                {" "}
                <label className="label" style={{ marginTop: "5px" }}>
                  Email
                </label>
              </Tooltip>
              <br />
              <div className={`customerdropdown ${!emailErrvalid ? "validationinputborder" : ""}`}>
                <img src={email} className="customerimg" />
                <input
                  type="email"
                  style={{ border: "none", outline: "none", width: "82%" }}
                  placeholder="Placeholder"
                  value={values.email} onChange={onChange}
                  name="email"
                />
              </div>
              {Object.keys(emailErr).map((key)=>
              {
                return <div className="validationerror">{emailErr[key]}</div>
              })}
              <Tooltip title="prompt text" color="#5C5AD0">
                {" "}
                <label className="label" style={{ marginTop: "5px" }}>
                  Pincode
                </label>
              </Tooltip>
              <br />
              <div className={`customerdropdown ${!pincodeErrvalid ? "validationinputborder" : ""}`}>
                <img src={pin} className="customerimg" />
                <input
                  type="number"
                  style={{ border: "none", outline: "none", width: "82%" }}
                  placeholder="Placeholder"
                  value={values.pincode} onChange={onChange}
                  name="pincode"
                />
              </div>
              {Object.keys(pincodeErr).map((key)=>
              {
                return <div className="validationerror">{pincodeErr[key]}</div>
              })}
              <Tooltip title="prompt text" color="#5C5AD0">
                {" "}
                <label className="label" style={{ marginTop: "5px" }}>
                  Street 1
                </label>
              </Tooltip>
              <br />
              <div className={`customerstreet ${!street1Errvalid ? "validationinputborder" : ""}`}>
                <img src={street} className="customerimg" />
                <input
                  type="text"
                  style={{ border: "none", outline: "none", width: "82%" }}
                  placeholder="Placeholder"
                  value={values.street1} onChange={onChange}
                  name="street1"
                />
              </div>
              {Object.keys(street1Err).map((key)=>
              {
                return <div className="validationerror">{street1Err[key]}</div>
              })}
              <Tooltip title="prompt text" color="#5C5AD0">
                {" "}
                <label className="label" style={{ marginTop: "5px" }}>
                  Street 2
                </label>
              </Tooltip>
              <br />
              <div className={`customerstreet ${!street2Errvalid ? "validationinputborder" : ""}`}>
                <img src={street} className="customerimg" />
                <input
                  type="text"
                  style={{ border: "none", outline: "none", width: "82%" }}
                  placeholder="Placeholder"
                  value={values.street2} onChange={onChange}
                  name="street2"
                  
                />
             {!street1Errvalid ? <Icon/> : ""}
              </div>
              {Object.keys(street2Err).map((key)=>
              {
                return <div className="validationerror">{street2Err[key]}</div>
              })}
              <Tooltip title="prompt text" color="#5C5AD0">
                {" "}
                <label className="label" style={{ marginTop: "5px" }}>
                  City
                </label>
              </Tooltip>
              <br />

              <SearchDropdown
                width={331}
                options={gsttraetmentOptional}
                isDisabled={true}
                value={values.city}
                onChange={onChange}
                name="city"
              />
               {/* {Object.keys(cityErr).map((key)=>
              {
                return <div className="validationerror">{cityErr[key]}</div>
              })} */}
            </div>

            <div className="form-right">
              <Tooltip title="prompt text" color="#5C5AD0">
                {" "}
                <label className="label" style={{ marginTop: "5px" }}>
                  State
                </label>
              </Tooltip>
              <br />
              <SearchDropdown
                width={331}
                options={gsttraetmentOptional}
                isDisabled={true}
                value={values.state}
                onChange={onChange}
                name="state"
              />
               {/* {Object.keys(stateErr).map((key)=>
              {
                return <div className="validationerror">{stateErr[key]}</div>
              })} */}
              <Tooltip title="prompt text" color="#5C5AD0">
                <label className="label">Default Place of Supply</label>
              </Tooltip>
              <br />

              <SearchDropdown width={331} options={gsttraetmentOptional}   value={values.pos}
                onChange={onChange}
                name="pos" />
              {Object.keys(posErr).map((key)=>
              {
                return <div className="validationerror">{posErr[key]}</div>
              })}
              <Tooltip title="prompt text" color="#5C5AD0">
                {" "}
                <label className="label">Contacts</label>
              </Tooltip>
              <br />

              <SearchDropdown width={331} options={contacts} value={values.contact}
                onChange={onChange}
                name="contact" />
              {Object.keys(contactErr).map((key)=>
              {
                return <div className="validationerror">{contactErr[key]}</div>
              })}
              <Tooltip title="prompt text" color="#5C5AD0">
                {" "}
                <label className="label">Ownership</label>
              </Tooltip>
              <br />

              <SearchDropdown width={331} options={ownershipwithemail} value={values.ownership}
                onChange={onChange}
                name="ownership"/>
              {Object.keys(ownershipErr).map((key)=>
              {
                return <div className="validationerror">{ownershipErr[key]}</div>
              })}
            </div>  
            </div>
            </form>
        </div>
      </div>
    
    </div>
  );
}

export default AddNewCustomer;
