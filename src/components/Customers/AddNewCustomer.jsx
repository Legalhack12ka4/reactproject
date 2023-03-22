import React, { useEffect, useState,useRef } from "react";
import SearchDropdown from "../AllDropdowns/SearchDropdown/SearchDropdown";
import Page_heading from "../Page_Heading/Page_heading";
import "./AddNewCustomer.scss";
import axios from "axios";
import "../AllDropdowns/SearchDropdown/SearchDropdown.scss";
import { Breadcrumb, Modal, Tooltip } from "antd";
import { Button, Checkbox, Form, Input } from "antd";
import { useFormik } from "formik";
import { addCustomerSchemas } from "../../Schemas";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// icons
import creditcard from "../../assets/Images/FormIcon/Credit Limit.svg";
import email from "../../assets/Images/FormIcon/Email.svg";
import gstno from "../../assets/Images/FormIcon/Gst no.svg";
import pan from "../../assets/Images/FormIcon/Pan Card.svg";
import pin from "../../assets/Images/FormIcon/Pincode.svg";
import street from "../../assets/Images/FormIcon/Street 1 & Street 2.svg";
import business from "../../assets/Images/FormIcon/Business.svg";
import { BiErrorCircle } from "react-icons/bi";
import { Link, Navigate } from "react-router-dom";
import config from "../Database/config";
import alert from "../../assets/Images/Confirmation/confirm.svg";
import CustomInput from "../CustomInput/CustomInput";
import { SearchSelect } from "../Dropdowns/Dropdowns";
import { ContainedButton, ContainedSecondaryButton } from "../Buttons/Button";

var ChildStateModificationFunc;
const initialFieldValues = {
  gsttreat: "",
  gstin: "",
  businessname: "",
  category: "",
  pancard: "",
  currency: "",
  payment: "",
  credit: "",
  email: "",
  pincode: "",
  street1: "",
  street2: "",
  city: "",
  state: "",
  pos: "",
  contact: "",
  ownership: "",
};

const resetValue = {
  gsttreat: "",
  gstin: "",
  businessname: "",
  category: "",
  pancard: "",
  currency: "",
  payment: "",
  credit: "",
  email: "",
  pincode: "",
  street1: "",
  street2: "",
  city: "",
  state: "",
  pos: "",
  contact: "",
  ownership: "",
  area:"",
};

function AddNewCustomer(props) {
  const [formData, setFormData] = useState(resetValue);
  const [customer, setCustomer] = useState([]);
  const [payment, setPayment] = useState([]);
  const [currencydrp, setCurrencydrp] = useState([]);
  const [pos, setPos] = useState([]);
  const [contact, setContact] = useState([]);
  const [gstnoErr, setGstnoErr] = useState({});
  const [area, setArea] = useState([]);
  const [gno, setGno]= useState([]);
  const [city, setCity] = useState([]);
  const [statedrp, setStatedrp] = useState([]);
  const [creditAmount, setCreditAmount] = useState('');
  const [formattedCreditAmount, setFormattedCreditAmount] = useState('');
  const [creditBox, setCreditBox] = useState(false);
  const [confirmData, setCofirmData] = useState(false); // for popup conformation modal
  //const [pincode, setPincode]= useState([])

  const [gst, setGst] = useState(false);
   //let gstinparams = customer.gstin;

//special character validation

// const handleInputChange = (evt, property) => {
//   let newValue = evt.target.value;

//   if (property === 'gstin') {
//     newValue = newValue.replace(/[^a-zA-Z\d\s]/g, "");
//   } 
//   if (property === 'businessname') {
//     newValue = newValue.charAt(0).toUpperCase() + newValue.slice(1);
//     newValue = newValue.replace(/[^a-zA-Z\s]/g, "");
//   }
//   if (property === 'pancard') {
//     newValue = newValue.replace(/[^a-zA-Z\d\s]/g, "");
//   } 
//   if (property === 'email') {
//     newValue = newValue.replace(/[^a-zA-Z@\d\s._-]/g, "");
//   }
//   setFormData(prevState => ({
//     ...prevState,
//     [property]: newValue
//   }));
// };

 //cofirmation modal 
 const handleConfirmData = () => {
  // setCofirmData(true);
 // setPopOverVisible(false)
 if (Object.values(formData).every((val) => val === "")) {
  setCofirmData(false);
  handleClose();
  // handleCancel();
} else {
  setCofirmData(true);
}
};


const handleConfirmDataClose = () => {
  setCofirmData(false);
  // setPopOverVisible(false)
};

const handleCancel = () => {
  setCofirmData(false)
};

useEffect(() => {
  getData();

}, []);

// const getGst = (gstin) => {
//   axios.get(
//     `https://erp.automode.ai/backend/gstin?gst_no=24AADCS3456Q1ZW`,
//   )
//     .then((response) => {
//       return response.json();
//     })
//     .then((data) => {
//       setGno(data);
//       console.log("data", data);
//       console.log(data)
//     })
//     .catch((error) => {
//       console.log(error);
//     });
// };

    

  const getData = (gstin) => {
   
    axios.get(
 //    `https://commonapi.mastersindia.co/commonapis/searchgstin?gstin=${gstin}`,
        `https://erp.automode.ai/backend/gstin?gst_no=24AADCS3456Q1ZW`
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setGno(data);
        console.log("data", data);
        console.log(data)
      });
  };
  console.log(gno)



  const handleGstno = (e) => {
    //setPincode(e.target.value)
    console.log("Gstno value", e.target.value);
  //  getData(e.target.value);
    //alert("Blur");
  };

  //Dropdown PaymentTerms
  const getDataPaymentTerms = () => {
    return fetch(`${config.baseUrl}/paymentterms/`)
      .then((response) => response.json())
      .then((data) => {
        setPayment(data);
        // console.log(data);
      });
  };

  //Dropdown Contact
  const getContact = () => {
    return fetch(`${config.baseUrl}/contact/`)
      .then((response) => response.json())
      .then((data) => {
        setContact(data);
        console.log(data);
      });
  };

  //Dropdown currency
  const getDataCuurrency = () => {
    fetch(`${config.baseUrl}/currency/`)
      .then((response) => response.json())
      .then((data) => {
        setCurrencydrp(data);
        // console.log(data);
      });
  };
  // console.log(currencydrp)


  //Dropdown Place of supply

  const getDataPos = () => {
    fetch(`${config.baseUrl}/state/`)
      .then((response) => response.json())
      .then((data) => {
        setPos(data);
         console.log(data);
      });
  };
 console.log(pos)

  useEffect(() => {
    getDataPaymentTerms();
    getDataCuurrency();
    getArea();
    getContact();
    getDataPos();
   getData();
  }, []);

  //send state to leaddata
ChildStateModificationFunc = (modVal)=>{
  setFormData(modVal)
}

  const handleFormSubmit = () => {
    axios
      .post(
        `${config.baseUrl}/customervendor/`,
        {
       
          gst_no: values.gstin,
          business_name: values.businessname,
       
          pan_card: values.pancard,
      
          credit_limit: values.credit,
          email: values.email,
          pincode: values.pincode,
          street1: values.street1,
          street2: values.street2,
          "place_of_supply": 1,
          "contact": 1,
          "ownership": 1,
          "is_active": true,
          "is_deleted": false,
          "type": 2,
        "type_category": 7,
        "payment_terms": 2,
        "currency": 20,
        "ownership": 1,
        "gst_treatment": 1,
        "place_of_supply": 2,
        "contact": 4,
        "company_id": 1,
        "created_by": 1,
        "updated_by": 1
        },
        values
      )
      .then((response) => {
        // getData();

        toast.success("Added Successfuly", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
        });
        handleClose();
      });
    console.log(initialFieldValues);
  };

  const onChange = (e) => {
    const { value, name } = e.target;

    setCreditAmount(e.target.value);

    setFormData({ ...values, [name]: value });
    console.log(value);
    console.log(name);
    
  };
  console.log(formData);

  const handleClose = () => {
    window.history.back(-1);
    setFormData(initialFieldValues);
  };
  // form Validation

  const getArea = (pincode) => {
  return fetch(`${config.baseUrl}/pincode?pincode=${pincode}`)
    //return fetch(`https://api.postalpincode.in/pincode/${pincode}`)
    
      .then((response) => response.json())
      .then((data) => {
        setArea(data);

        if(data.status == "Success")
        {
       //   alert(data.status)
        setStatedrp(data.data[0].state_name);

        setCity(data.data[0].district);
      }
      if(data.status == "Pincode Not Available")
      {
    //   alert(data.status)
        setStatedrp("");
        setCity("");
    }
       
    console.log(setStatedrp(data.data[0].state_name))
    console.log(setCity(data.data[0].district))
      
});
  };
  console.log(area);

  const handlePincode = (e) => {
    //setPincode(e.target.value)
    console.log("Pincode value", e.target.value);
    getArea(e.target.value);
    //alert("Blur");
  };

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

    validationSchema: addCustomerSchemas,
    onSubmit: (values) => {
      console.log(values);
    },
  });


  const handleDrpChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
   setFieldValue(field, value);
   setFieldTouched(field, false);
   console.log(field)
   console.log(value)
 };



  const handleCreditBlur = (e) => {

    if(creditAmount <10000){
      setFormattedCreditAmount(`${(creditAmount / 1000).toFixed(2)} K`);
    }
    else if( creditAmount >= 10000000){
      setFormattedCreditAmount(`${(creditAmount / 10000000).toFixed(2)} Cr`);
    }
    else {
          setFormattedCreditAmount(`${(creditAmount / 100000).toFixed(2)} Lacs`);

    };

    setCreditBox(true)

  };

  const handleCreditFocus = () => {
    setCreditBox(false)
  };

  const paymentterms = payment.map((pay) => ({
    label: pay.terms,
    value: pay.id,
  }));

  const currency = currencydrp.map((curr) => ({
    label: curr.currency_name + " - " + curr.symbol,
    value: curr.id,
  }));

  const contacts = contact.map((con) => ({
    label: con.name,
    value: con.id || con.name,
  }));
  const gsttraetmentOptional =pos.map((place)=>({
    label: place.state_name,
    value: place.id,
  }))
  const typeCategory = [
    {
      value: "Wholesalar",
      label: "Wholesalar",
    },
    {
      value: "Retailer",
      label: "Retailer",
    },
    {
      value: "Manufacturing",
      label: "Manufacturing",
    },
  ];
  const gsttreatment = [
    {
      value: 1,
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
      value: 2,
      label: (
        <div>
          <p className="dropdown_title_heading">
            Registered Business - Composition
          </p>
          <p className="dropdown_desc_text" style={{ fontSize: "12px" }}>
            Business that is registered under the Composition
            <br /> Scheme in GST
          </p>
        </div>
      ),
    },
    {
      value: 3,
      label: (
        <div>
          <p className="dropdown_title_heading">Unregistered Business</p>
          <p className="dropdown_desc_text" style={{ fontSize: "12px" }}>
            Bussines that has not been registered
            <br /> under GST
          </p>
        </div>
      ),
    },
    {
      value: 4,
      label: (
        <div>
          <p className="dropdown_title_heading">Consumer</p>
          <p className="dropdown_desc_text">A customer who is regular Consumer</p>
        </div>
      ),
    },
    {
      value: 5,
      label: (
        <div>
          <p className="dropdown_title_heading">Overseas</p>
          <p className="dropdown_desc_text" style={{ fontSize: "12px" }}>
            Person with whom you do import or export of
            <br />
            supplies outside India
          </p>
        </div>
      ),
    },
    {
      value:6,
      label: (
        <div>
          <p className="dropdown_title_heading">Special Economic Zone</p>
          <p className="dropdown_desc_text" style={{ fontSize: "12px" }}>
            Business (Unit) that is located in a Special
            <br />
            Economic Zone (SEZ) of Inida or a SEZ Developer
          </p>
        </div>
      ),
    },

    {
      value: 7,
      label: (
        <div>
          <p className="dropdown_title_heading">Deemed Export</p>
          <p className="dropdown_desc_text" style={{ fontSize: "12px" }}>
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
      value: 8,
      label: (
        <div>
          <p className="dropdown_title_heading">Tax Deductor</p>
          <p className="dropdown_desc_text" style={{ fontSize: "12px" }}>
            Department of the State/Central government,
            <br />
            government agancies or local authorites
          </p>
        </div>
      ),
    },
    {
      value:9,
      label: (
        <div>
          <p className="dropdown_title_heading">SEZ Developer</p>
          <p className="dropdown_desc_text" style={{ fontSize: "12px" }}>
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

  

  const ownershipwithemail = [
    {
      value: "Parth Goswami 19 1",
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
      value: "Parth Goswami 19 2",
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
      value: "Parth Goswami 19 3",
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
      value: "Parth Goswami 19 4",
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
      value: "Parth Goswami 19 5",
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

  //input validation

  const inputRef=useRef(null);

  const handleKeyPress = (e) =>
  {
      if(e.target.value.length >= 6)
      {
        e.preventDefault();
      }
  }

//   const token = localStorage.getItem("jwt")
//   let loggedIn= true
//   if(token == null)
//   {
//     localStorage.removeItem("jwt");
//     loggedIn = false
//   }
//  // Details={loggedIn}

// if(loggedIn == false)
// {
//   localStorage.removeItem("jwt");
//   return <Navigate to="/"/>
// }



  const handleFocus = (e) => {
  }
  return (
    <div className="addNewCustomerContainer">
      {/* <div className="addcustomer_heading"> */}
        <Page_heading
          parent={"Business Account"}
          subchild={
            <Link exact to="/customers">
              {"Customer"}
            </Link>
          }
          child={"Add New Customer"}
        />
      {/* </div> */}

      <div className="customerform">
        {/* <div className="newcustomer"> */}
          {/* <h1 className="box_heading1">New Customer</h1> */}
          <form onSubmit={handleSubmit} autoComplete="off">
            <div className="form_first_container">




            <div className="form_field field1" style={{ gridRowStart: 1, gridColumnStart: 1}}>
              <SearchSelect
            label="GST Treatment" 
            width={330}
            options={gsttreatment} 
            onChange={handleDrpChange}
            name="gsttreat"
            value={formData.gsttreat}
                    error={errors.gsttreat && touched.gsttreat ? true : false}
                    errorMsg="GST Treatment is required"
            />
                
              </div>

              <div className="form_field field2" style={{ gridRowStart: 2, gridColumnStart: 1}}>
              <CustomInput 
                width={330}
                label="GSTIN"
                icon="/images/icons/Gst-no.svg"
                type="text"
                    style={{ border: "none", outline: "none", width: "82%" }}
                  inputType={"AlphaNumericUpperCase"}
                  name="gstin"
                  onFocus={handleFocus}
                    placeholder="Placeholder"
                    maxLength={15}
                   value={formData.gstin}
                onChange={(e, newValue) => {handleChange(e); onChange(e);
                  // handleGstno(e);
                  setFormData(prevState => ({
                    ...prevState,
                    "gstin": newValue
                  }))}}
                  onBlur={handleBlur}
                  error={errors.gstin && touched.gstin ? true : false}
                  errorMsg={errors.gstin}

            />
              </div>

              <div className="form_field field3" style={{ gridRowStart: 3, gridColumnStart: 1}}>
              <CustomInput 
              type="text"
              label="Business Name"
              icon="/images/icons/Business.svg"
              style={{ border: "none", outline: "none", width: "82%" }}
             inputType={"CamelAlphabetical"}
               name="businessname"
               width={330}
               onFocus={handleFocus}
               placeholder="Placeholder"
              value={formData.businessname}
           onChange={(e, newValue) => {handleChange(e); onChange(e); 
             setFormData(prevState => ({
               ...prevState,
               "businessname": newValue
             }))}}
             onBlur={handleBlur}
              error={errors.businessname && touched.businessname ? true : false}
              errorMsg={errors.businessname}
            />
              </div>

              <div className="form_field field4" style={{ gridRowStart: 4, gridColumnStart: 1}}>
              <div style={{ display: "flex", gap: "20px" }}>
              <SearchSelect
                 width={155}
                 label="Customer Type"
                 options={currency}
                 //value={formData.currency}
                 onChange={handleDrpChange}
               //  name="currency"
                 error={errors.currency && touched.currency ? true : false}
                 errorMsg="Customer Type is required"
              />
              <SearchSelect 
                width={155}
                label="Currency"
                options={currency}
              //  value={formData.currency}
                onChange={handleDrpChange}
              //  name="currency"
                error={errors.currency && touched.currency ? true : false}
                errorMsg="Currency is required"
              />
                </div>
              </div>


              <div className="form_field field5" style={{ gridRowStart: 5, gridColumnStart: 1}}>
              <div style={{ display: "flex", gap: "20px" }}>
              <SearchSelect
                 width={155}
                 label="Commission Terms"
                 options={currency}
                 //value={formData.currency}
                 onChange={handleDrpChange}
               //  name="currency"
                 error={errors.currency && touched.currency ? true : false}
                 errorMsg="Commission is required"
              />
             <SearchSelect 
                width={155}
                label="Payment Terms"
                options={paymentterms}
                value={formData.payment}
                onChange={handleDrpChange}
                name="payment"
                error={errors.payment && touched.payment ? true : false}
                errorMsg="Payment Terms is required"
              />
                </div>
              </div>

              <div className="form_field field6" style={{ gridRowStart: 6, gridColumnStart: 1}}>
              <div style={{ display: "flex", gap: "20px" }}>
              <CustomInput
                type="text"
                label="TAN No."
                width={155}
                icon="/images/icons/Pancard.svg"
                maxLength={10}
                onFocus={handleFocus}
                style={{ border: "none", outline: "none", width: "82%" }}
               inputType={"AlphaNumericUpperCase"}
                 name="pancard"
                 placeholder="Placeholder"
                value={formData.pancard}
             onChange={(e, newValue) => {handleChange(e); onChange(e); 
               setFormData(prevState => ({
                 ...prevState,
                 "pancard": newValue
               }))}}
               onBlur={handleBlur}
                error={errors.pancard && touched.pancard ? true : false}
                errorMsg={errors.pancard}
            />
               <div  className="credit-input-container">
              <CustomInput 
                className={`${creditBox && "creditAmtBoxBlur"}`}
                type="number"
                style={{ border: "none", outline: "none", width: "82%" }}
                // placeholder="Placeholder"
                name="credit"
                icon="/images/icons/Rupee.svg"
                width={155}
                label="Credit Limit"
                value={formData.credit}
                onChange={(e)=>{handleChange(e); onChange(e);}}
                onBlur={(e)=>{handleBlur(e); handleCreditBlur(e);}}
                onFocus={ handleCreditFocus}
                error={errors.credit && touched.credit ? true : false}
                errorMsg={errors.credit}
                /> 
                {creditBox && creditAmount>0 && (
                    <div className="creditAmt">
                      <p> {formattedCreditAmount}</p>
                    </div>
                  )}
              </div>

                </div>
              </div>

              <div className="form_field field7" style={{ gridRowStart: 7, gridColumnStart: 1}}>
              <SearchSelect
                 width={330}
                label="Ownership"
                 options={ownershipwithemail}
                 value={values.ownership}
                 onChange={handleDrpChange}
                 name="ownership"
                 error={errors.ownership && touched.ownership ? true : false}
                 errorMsg="Ownership is required"
                  />
              </div>
              

              <div className="form_field field8" style={{ gridRowStart: 1, gridColumnStart: 2}}>
              <CustomInput 
                type="email"
                style={{ border: "none", outline: "none", width: "82%" }}
               inputType={"email"}
                 name="email"
                 icon="/images/icons/Email.svg"
                 width={330}
                 onFocus={handleFocus}
                  label="Email"
                 placeholder="Placeholder"
                value={formData.email}
             onChange={(e, newValue) => {handleChange(e); onChange(e); 
               setFormData(prevState => ({
                 ...prevState,
                 "email": newValue
               }))}}
               onBlur={handleBlur}
              error={errors.email && touched.email ? true : false}
              errorMsg={errors.email}
                />
              
              </div>

              <div className="form_field field9" style={{ gridRowStart: 2, gridColumnStart: 2}}>
              <CustomInput 
              type="number"
              //ref={inputRef}
            //onKeyPress={handleKeyPress}
               style={{ border: "none", outline: "none", width: "82%" }}
               placeholder="Placeholder"
               name="pincode"
               value={formData.pincode}
               onChange={(e)=>{handleChange(e); onChange(e);handlePincode(e);}}
               onBlur={(e)=>{handleBlur(e);}}
               autoComplete="off"
                width={330}
                onFocus={handleFocus}
                icon="/images/icons/Pincode_Area.svg"
                label="Pincode"
                error={errors.pincode && touched.pincode ? true : false}
                errorMsg={errors.pincode}
            />
             
              </div>


              <div className="form_field field10" style={{ gridRowStart: 3, gridColumnStart: 2}}>
              
              <CustomInput 
                type="text"
                style={{ border: "none", outline: "none", width: "82%" }}
                placeholder="Placeholder"
                name="area"
                value={values.area}
                onChange={(e)=>{handleChange(e); onChange(e);}}
                onBlur={handleBlur}
                width={330}
                onFocus={handleFocus}
                icon="/images/icons/Pincode_Area.svg"
                label="Area"
                error={errors.area && touched.area ? true : false}
                errorMsg={errors.area}
              />
              
              </div>
              <div className="form_field field11" style={{ gridRowStart:4 , gridColumnStart: 2}}>
              <CustomInput
                type="text"
                style={{ border: "none", outline: "none", width: "82%" }}
                placeholder="Placeholder"
                name="street1"
                icon="/images/icons/location-icon.svg"
                value={values.street1}
                onChange={(e)=>{handleChange(e); onChange(e);}}
                onBlur={handleBlur}
                width={330}
                onFocus={handleFocus}
                label="Street 1"
                error={errors.street1 && touched.street1 ? true : false}
                errorMsg={errors.street1}
              />
              
              
              </div>

              <div className="form_field field12" style={{ gridRowStart: 5, gridColumnStart: 2}}>
              <CustomInput 
                type="text"
                style={{ border: "none", outline: "none", width: "82%" }}
                placeholder="Placeholder"
                name="street2"
                value={values.street2}
                onChange={(e)=>{handleChange(e); onChange(e);}}
                onBlur={handleBlur}
                width={330}
                onFocus={handleFocus}
                label="Street 2"
                error={errors.street2 && touched.street2 ? true : false}
                errorMsg={errors.street2}
                icon="/images/icons/location-icon.svg"
              />
              
              
              </div>

            


              <div className="form_field field13" style={{ gridRowStart: 6, gridColumnStart: 2}}>
              <CustomInput 
              type="text"
              style={{ border: "none", outline: "none", width: "82%" }}
              name="city"
              value={city}
              disabled={true}
              width={330}
              label="City"
              // error={errors.city && touched.city ? true : false}
              // errorMsg={errors.city}
            />
              
              </div>

              <div className="form_field field14" style={{ gridRowStart: 7, gridColumnStart: 2}}>
              <div style={{ display: "flex", gap: "20px" }}>
              <CustomInput 
               type="text"
               style={{ border: "none", outline: "none", width: "82%" }}
               name="state"
               value={statedrp}
               disabled={true}
                width={155}
                label="State"
                // error={errors.state && touched.state ? true : false}
                // errorMsg={errors.state}
            />
              <CustomInput 
               type="text"
               style={{ border: "none", outline: "none", width: "82%" }}
               name="state"
               value={statedrp}
               disabled={true}
                width={155}
                label="Country"
                // error={errors.state && touched.state ? true : false}
                // errorMsg={errors.state}
            />
              
                </div>
              </div>



              
              
            </div>

            

            
            <div className="customerbutton_bottom">
                  <ContainedButton type="submit" value={formData.id ? "Update" : "Save"} onClick={() => {handleFormSubmit()}} />
                  <ContainedSecondaryButton value="Cancel" onClick={(e)=>{handleConfirmData()}} />
                </div>
          </form>
        </div>
        <ToastContainer />
            {/* Confirmation */}

      <Modal
        open={confirmData}
       // onOk={handleMaterialOk}
        width={"max-content"}
        onCancel={handleConfirmDataClose}
        style={{ top: 20 }}
        className={"deleteconfirm"}
        footer={[
          <div style={{ marginLeft: "331px" }}>
            <Button
              key="cancel"
              onClick={handleConfirmDataClose}
              style={{
                width: "86px",
                height: "38px",
                fontSize: "14px",
                fontWeight: "700",
                color: "#8E9CAA",
                borderColor: "#C2CAD2",
              }}
            >
              Cancel
            </Button>
            <Button
              key="submit"
              type="primary"
              onClick={(e) => {handleCancel(e); handleClose(e);}}
              style={{
                width: "88px",
                height: "38px",
                backgroundColor: "#DA2F58",
                fontSize: "14px",
                fontWeight: "700",
                color: "#FFFFFF",
              }}
            >
              Submit
            </Button>
          </div>,
        ]}
        closeIcon={
          <div className="icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="13.51"
              height="13"
              viewBox="0 0 13.51 13"
            >
              <path
                id="Path_34362"
                data-name="Path 34362"
                d="M15.386,13.167l-4.593-4.42,4.593-4.42a1.183,1.183,0,0,0,0-1.723,1.3,1.3,0,0,0-1.79,0L9,7.025,4.41,2.605a1.3,1.3,0,0,0-1.79,0,1.183,1.183,0,0,0,0,1.723l4.593,4.42L2.62,13.167a1.183,1.183,0,0,0,0,1.723,1.3,1.3,0,0,0,1.79,0L9,10.47,13.6,14.89a1.3,1.3,0,0,0,1.79,0A1.189,1.189,0,0,0,15.386,13.167Z"
                transform="translate(-2.248 -2.248)"
                fill="#697a8d"
              />
            </svg>
          </div>
        }
      >
        <div className="confirmCoontainer">
          <div className="confirmresources">
            <div className="imgsetting">
              <div className="imgbackground">
                <img src={alert} style={{ width: "38px", height: "38px" }} />
              </div>
            </div>

            <div>
              <p
                style={{
                  fontSize: "22px",
                  color: "#2B3347",
                  fontWeight: "500",
                  padding: "21px 0px 0px 0px",
                }}
              >
                Warning
              </p>
            </div>
          </div>
          <div>
            <p className="confirmationtext">
              Are you sure you want to close this window? <br /> All the value
              which you filled in the fields will be deleted.
              <br /> This action cannot recover the value.
            </p>
          </div>
        </div>
      </Modal>
      </div>
    // </div>
  );
}

export default AddNewCustomer;
export {ChildStateModificationFunc}


