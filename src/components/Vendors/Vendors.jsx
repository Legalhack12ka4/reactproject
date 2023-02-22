import React, { useEffect, useState } from "react";
import SearchDropdown from "../AllDropdowns/SearchDropdown/SearchDropdown";
import Page_heading from "../Page_Heading/Page_heading";
import "./Vendors.scss";
import creditcard from "../../assets/Images/FormIcon/Credit Limit.svg";
import email from "../../assets/Images/FormIcon/Email.svg";
import gstno from "../../assets/Images/FormIcon/Gst no.svg";
import pan from "../../assets/Images/FormIcon/Pan Card.svg";
import pin from "../../assets/Images/FormIcon/Pincode.svg";
import street from "../../assets/Images/FormIcon/Street 1 & Street 2.svg";
import business from "../../assets/Images/FormIcon/Business.svg";
import { Button, Modal, Tooltip } from "antd";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import { addCustomerSchemas } from "../../Schemas";
import config from "../Database/config";
import { useRef } from "react";
import alert from "../../assets/Images/Confirmation/confirm.svg";

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

function Vendors(props) {
  const [formData, setFormData] = useState(initialFieldValues);
  const [customer, setCustomer] = useState([]);
  const [payment, setPayment] = useState([]);
  const [currencydrp, setCurrencydrp] = useState([]);
  const [contact, setContact] = useState([]);
  const [gstnoErr, setGstnoErr] = useState({});
  const [area, setArea] = useState([]);
  const [city, setCity] = useState([]);
  const [statedrp, setStatedrp] = useState([]);
  const [creditAmount, setCreditAmount] = useState('');
  const [formattedCreditAmount, setFormattedCreditAmount] = useState('');
  const [creditBox, setCreditBox] = useState(false);
  const [pos, setPos] = useState([]);
  const [confirmData, setCofirmData] = useState(false); // for popup conformation modal
  //const [pincode, setPincode]= useState([])

  //const [gst, setGst] = useState(false);


  ChildStateModificationFunc = (modVal)=> {
    setFormData(modVal)
    alert("kjhgkuh")
}

//cofirmation modal 
const handleConfirmData = () => {
  setCofirmData(true);
 // setPopOverVisible(false)
};


const handleConfirmDataClose = () => {
  setCofirmData(false);
  // setPopOverVisible(false)
};

const handleCancel = () => {
  setCofirmData(false)
};

  const handleFormSubmit = () => {
    if (formData.id)
    {
      axios
      .put(
        `${config.baseUrl}/customervendor/` + formData.id + "/",
      {
          gst_no:values.gstin,
        business_name: values.businessname,
     
        pan_card: values.pancard,
    
        credit_limit: 20,
        email: values.email,
        pincode: values.pincode,
        street1: values.street1,
        street2: values.street2,
        "place_of_supply": 1,
        "contact": 1,
        "ownership": 1,
        "is_active": true,
        "is_deleted": false,
        "type": 1,
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
  }
  else
  {
    axios
      .post(
        `${config.baseUrl}/customervendor/`,
        {
            gst_no:values.gstin,
          business_name: values.businessname,
       
          pan_card: values.pancard,
      
          credit_limit: 20,
          email: values.email,
          pincode: values.pincode,
          street1: values.street1,
          street2: values.street2,
          "place_of_supply": 1,
          "contact": 1,
          "ownership": 1,
          "is_active": true,
          "is_deleted": false,
          "type": 1,
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
    }
  }


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

const getArea = (pincode) => {
  return fetch(`${config.baseUrl}/pincode?pincode=${pincode}`)
    //return fetch(`https://api.postalpincode.in/pincode/${pincode}`)
    
      .then((response) => response.json())
      .then((data) => {
        setArea(data);
console.log(data)
        // if(data[0].Status == "Success")
        // {
        setStatedrp(data[0].state_name);
        setCity(data[0].district);
      // }
      // else
      // {
      //   setStatedrp("");
      //   setCity("");
      // }
});
  };
  console.log(area);

  const handlePincode = (e) => {
    //setPincode(e.target.value)
    console.log("Pincode value", e.target.value);
    getArea(e.target.value);
    //alert("Blur");
  };

  useEffect(() => {
    getDataPaymentTerms();
    getDataCuurrency();
    getArea();
    getContact();
    getDataPos();
   // getData();
  }, []);
  
// //Dropdown PaymentTerms
// const getDataPaymentTerms = () => {
//   return fetch(`${config.baseUrl}/paymentterms/`)
//     .then((response) => response.json())
//     .then((data) => {
//       setPayment(data);
//       // console.log(data);
//     });
// };

// //Dropdown Contact
// const getContact = () => {
//   return fetch(`${config.baseUrl}/contact/`)
//     .then((response) => response.json())
//     .then((data) => {
//       setContact(data);
//       console.log(data);
//     });
// };

// //Dropdown currency
// const getDataCuurrency = () => {
//   fetch(`${config.baseUrl}/currency/`)
//     .then((response) => response.json())
//     .then((data) => {
//       setCurrencydrp(data);
//       // console.log(data);
//     });
// };
// // console.log(currencydrp)


// //Dropdown Place of supply

// const getDataPos = () => {
//   fetch(`${config.baseUrl}/state/`)
//     .then((response) => response.json())
//     .then((data) => {
//       setPos(data);
//        console.log(data);
//     });
// };
// console.log(pos)

// const getArea = (pincode) => {
//   return fetch(`${config.baseUrl}/pincode?pincode=${pincode}`)
//     //return fetch(`https://api.postalpincode.in/pincode/${pincode}`)
    
//       .then((response) => response.json())
//       .then((data) => {
//         setArea(data);

//         if(data.status == "Success")
//         {
//        //   alert(data.status)
//         setStatedrp(data.data[0].state_name);

//         setCity(data.data[0].district);
//       }
//       if(data.status == "Pincode Not Available")
//       {
//     //   alert(data.status)
//         setStatedrp("");
//         setCity("");
//     }
       
//     console.log(setStatedrp(data.data[0].state_name))
//     console.log(setCity(data.data[0].district))
      
// });
//   };
//   console.log(area);

//   const handlePincode = (e) => {
//     //setPincode(e.target.value)
//     console.log("Pincode value", e.target.value);
//     getArea(e.target.value);
//     //alert("Blur");
//   };

  useEffect(() => {
    getDataPaymentTerms();
    getDataCuurrency();
    getArea();
    getContact();
    getDataPos();
   // getData();
  }, []);
  
  const onChange = (e) => {
    const { value, name } = e.target;
    setCreditAmount(e.target.value);
    setFormData({ ...values, [name]: value });
    console.log(value);
    console.log(name);
  };
  console.log(formData);
  const [gst, setGst] = useState(false);
  
  // let gstinparams = values.gstin;

  // const getData = () => {
  //   fetch(
  //     `https://commonapi.mastersindia.co/commonapis/searchgstin?gstin=${gstinparams}`,
  //     {
  //       headers: {
  //         Authorization: "Bearer 0ab31ef7392227173c6e8d34195e86d5eb0da1e9",
  //         client_id: "JarZChUcsytSBbnkpt",
  //       },
  //     }
  //   )
  //     .then((response) => {
  //       return response.json();
  //     })
  //     .then((data) => {
  //       setCustomer(data);
  //       console.log("data", data.lgnm);
  //     });
  // };

  // useEffect(() => {
  //   getData();
  //   console.log("Getting Data");
  //   console.log(values.gstin);
  // }, [gst]);

  // const onBlur = (e) => {
  //   //alert(e.target.value)
  //   setGst(!gst);
  //   console.log(gst);
  // };
//Dropdown value get

   const handleDrpChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
   setFieldValue(field, value);
   setFieldTouched(field, false);
   console.log(field)
   console.log(value)
 };

//Validation

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

  // const onChange = (e) => {
  //   e.preventDefault();
  //   const { value, name } = e.target;
  //   setValues({
  //     ...values,
  //     [name]: value,
  //   });
  //   console.log(value);
  //   console.log(name);
  // };

  const handleClose = () => {
    window.history.back(-1);
    setFormData(initialFieldValues)
  };


 
 



  //caredit card

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
          <p style={{ fontSize: "12px" }}>
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
          <p style={{ fontSize: "12px" }}>
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
          <p>A customer who is regular Consumer</p>
        </div>
      ),
    },
    {
      value: 5,
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
      value:6,
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
      value: 7,
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
      value: 8,
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
      value:9,
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

  const gsttraetmentOptional =pos.map((place)=>({
    label: place.state_name,
    value: place.id,
  }))

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


    //input validation

    const inputRef=useRef(null);

    const handleKeyPress = (e) =>
    {
        if(e.target.value.length >= 6)
        {
          e.preventDefault();
        }
    }

  return (
    <div className="vendors_container">
      <div className="addvendor_heading">
        <Page_heading parent={"Business Account"} subchild={(<Link exact to= "/vendors">{"Vendor"}</Link>)}  child={"Add New Vendor"} />
      </div>
      <div className="customerform">
      <form onSubmit={handleSubmit} autoComplete="off">
            <div className="form_first_container">
              
              <div className="form_field field1" style={{ gridRowStart: 1, gridColumnStart: 1}}>
              <Tooltip title="prompt text" color="#5C5AD0">
                  {" "}
                  <label className="label">GST Treatment</label>{" "}
                </Tooltip>
                <br />
                <div>
                <SearchDropdown
                  width={331}
                  options={gsttreatment}
                  onChange={handleDrpChange}
                  name="gsttreat"
                  value={formData.gsttreat}
                  error={errors.gsttreat && touched.gsttreat ? true : false}
                  errorMsg="GST Treatment is required"
                  />
                 
                  </div>
              </div>

              <div className="form_field field2" style={{ gridRowStart: 2, gridColumnStart: 1}}>
              <Tooltip title="prompt text" color="#5C5AD0">
                  {" "}
                  <label className="label" style={{ marginTop: "5px" }}>
                    GST No.
                  </label>
                </Tooltip>
                <br />
                <div
                  className={`${
                    errors.gstin && touched.gstin && "inputError"
                  } ${touched.gstin && "acive_input"} customerdropdown uppercaseLetter`}
                >
                  <img src={gstno} className="customerimg" />
                  <input
                    type="text"
                    style={{ border: "none", outline: "none", width: "82%" }}
                    placeholder="Placeholder"
                    name="gstin"
                    maxLength={15}
                    value={formData.gstin}
                    onChange={(e)=>{handleChange(e); onChange(e)}}
                    onBlur={handleBlur}
                    autoComplete="off"
                  />
                  {errors.gstin && touched.gstin && (
                    <div className="error_icon">
                    <img
                      src="/images/icons/exclamation_icon.svg"
                      alt="error"
                    />
                  </div>
                  )}
                </div>
                {errors.gstin && touched.gstin && (
                    <p className="error_text">{errors.gstin}</p>
                  )}
              </div>

              <div className="form_field field3" style={{ gridRowStart: 3, gridColumnStart: 1}}>
              <Tooltip title="prompt text" color="#5C5AD0">
                  {" "}
                  <label className="label" style={{ marginTop: "5px" }}>
                    Business Name{" "}
                  </label>{" "}
                </Tooltip>

                <br />
                <div
                  className={`${
                    errors.businessname && touched.businessname && "inputError"
                  } customerdropdown`}
                  style={{ marginTop: "5px" }}
                >
                  <img src={business} className="customerimg" />
                  <input
                    type="text"
                    style={{ border: "none", outline: "none", width: "82%" }}
                    placeholder="Placeholder"
                    name="businessname"
                    value={formData.businessname}
                    onChange={(e)=>{handleChange(e); onChange(e);}}
                    onBlur={handleBlur}
                  />
                  {errors.businessname && touched.businessname && (
                    <div className="error_icon">
                    <img
                      src="/images/icons/exclamation_icon.svg"
                      alt="error"
                    />
                  </div>
                  )}
                </div>
                {errors.businessname && touched.businessname && (
                    <p className="error_text">{errors.businessname}</p>
                  )}
              </div>

              <div className="form_field field4" style={{ gridRowStart: 4, gridColumnStart: 1}}>
              <Tooltip title="prompt text" color="#5C5AD0">
                  <label className="label">Type Category</label>
                </Tooltip>
                <br />
                <SearchDropdown
                  options={typeCategory}
                  width={330}
                  value={formData.category}
                  onChange={handleDrpChange}
                  name="category"
                  error={errors.category && touched.category ? true : false}
                  errorMsg="Type Category is required"
                />
              </div>

              <div className="form_field field5" style={{ gridRowStart: 5, gridColumnStart: 1}}>
              <Tooltip title="prompt text" color="#5C5AD0">
                  <label className="label" style={{ marginTop: "5px" }}>
                    Pancard
                  </label>
                </Tooltip>
                <br />
                <div
                  className={`${
                    errors.pancard && touched.pancard && "inputError"
                  } customerdropdown uppercaseLetter`}
                >
                  <img src={pan} className="customerimg" />
                  <input
                    type="text"
                    style={{ border: "none", outline: "none", width: "82%" }}
                    placeholder="Placeholder"
                    name="pancard"
                    value={formData.pancard}
                    maxLength={10}
                    onChange={(e)=>{handleChange(e); onChange(e);}}
                    onBlur={handleBlur}
                  />
                  {errors.pancard && touched.pancard && (
                      <div className="error_icon">
                      <img
                        src="/images/icons/exclamation_icon.svg"
                        alt="error"
                      />
                    </div>
                  )}
                </div>
                {errors.pancard && touched.pancard && (
                    <p className="error_text">{errors.pancard}</p>
                  )}
              </div>

              <div className="form_field field6" style={{ gridRowStart: 6, gridColumnStart: 1}}>
              <div style={{ display: "flex", gap: "20px" }}>
                  <div style={{ width: "50%" }}>
                    <Tooltip title="prompt text" color="#5C5AD0">
                      {" "}
                      <label className="label" style={{ marginTop: "5px" }}>
                        Currency
                      </label>
                    </Tooltip>
                    <br />
                    <SearchDropdown
                      width={155}
                      options={currency}
                      value={formData.currency}
                      onChange={handleDrpChange}
                      name="currency"
                      error={errors.currency && touched.currency ? true : false}
                      errorMsg="Currency is required"
                    />
                  </div>
                  <div style={{ width: "50%" }}>
                    <Tooltip title="prompt text" color="#5C5AD0">
                      {" "}
                      <label className="label">Payment Terms</label>
                    </Tooltip>
                    <br />
                    <SearchDropdown
                      width={155}
                      options={paymentterms}
                      value={formData.payment}
                      onChange={handleDrpChange}
                      name="payment"
                      error={errors.payment && touched.payment ? true : false}
                      errorMsg="Payment Terms is required"

                    />
                  </div>
                </div>
              </div>

              <div className="form_field field7" style={{ gridRowStart: 1, gridColumnStart: 2}}>
              <Tooltip title="prompt text" color="#5C5AD0">
                  {" "}
                  <label className="label" style={{ marginTop: "5px" }}>
                    Credit Limit
                  </label>
                </Tooltip>
                <br />
                <div
                  className={`${
                    errors.credit && touched.credit && "inputError"
                  }  customerdropdown creditAmtContainer }`}
                >
                  <img src={creditcard} className="customerimg" />
                  <input
                  className={`${creditBox && "creditAmtBoxBlur"}`}
                    type="number"
                    style={{ border: "none", outline: "none", width: "82%" }}
                    // placeholder="Placeholder"
                    name="credit"
                    value={formData.credit}
                    onChange={(e)=>{handleChange(e); onChange(e);}}
                    onBlur={(e)=>{handleBlur(e); handleCreditBlur(e);}}
                    onFocus={ handleCreditFocus}
                  />
                  {creditBox && creditAmount>0 && (
                    <div className="creditAmt">
                      <p> {formattedCreditAmount}</p>
                    </div>
                  )}
                  {errors.credit && touched.credit && (
                    <div className="error_icon">
                    <img
                      src="/images/icons/exclamation_icon.svg"
                      alt="error"
                    />
                  </div>
                  )}
                </div>
                {errors.credit && touched.credit && (
                    <p className="error_text">{errors.credit}</p>
                  )}
              </div>

              <div className="form_field field8" style={{ gridRowStart: 2, gridColumnStart: 2}}>
              <Tooltip title="prompt text" color="#5C5AD0">
                  {" "}
                  <label className="label" style={{ marginTop: "5px" }}>
                    Email
                  </label>
                </Tooltip>
                <br />
                <div
                  className={`${
                    errors.email && touched.email && "inputError"
                  } customerdropdown`}
                >
                  <img src={email} className="customerimg" />
                  <input
                    type="email"
                    style={{ border: "none", outline: "none", width: "82%" }}
                    placeholder="Placeholder"
                    name="email"
                    value={formData.email}
                    onChange={(e)=>{handleChange(e); onChange(e);}}
                    onBlur={handleBlur}
                    autoComplete="off"
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
                {errors.email && touched.email && (
                    <p className="error_text">{errors.email}</p>
                  )}
              </div>

              <div className="form_field field9" style={{ gridRowStart: 3, gridColumnStart: 2}}>
              <Tooltip title="prompt text" color="#5C5AD0">
                  {" "}
                  <label className="label" style={{ marginTop: "5px" }}>
                    Pincode
                  </label>
                </Tooltip>
                <br />
                <div
                  className={`${
                    errors.pincode && touched.pincode &&  "inputError"
                  } customerdropdown`}
                >
                  <img src={pin} className="customerimg" />
                  <input
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
                  />
                  {errors.pincode &&  touched.pincode &&(
                    <div className="error_icon">
                    <img
                      src="/images/icons/exclamation_icon.svg"
                      alt="error"
                    />
                  </div>
                  )}
                </div>
                {errors.pincode &&  touched.pincode &&(
                    <p className="error_text">{errors.pincode}</p>
                  )}
              </div>

              <div className="form_field field10" style={{ gridRowStart: 4, gridColumnStart: 2}}>
              <Tooltip title="prompt text" color="#5C5AD0">
                  {" "}
                  <label className="label" style={{ marginTop: "5px" }}>
                    Street 1
                  </label>
                </Tooltip>
                <br />
                <div
                  className={`${
                    errors.street1 && touched.street1 && "inputError"
                  } customerdropdown`}
                >
                  <img src={street} className="customerimg" />
                  <input
                    type="text"
                    style={{ border: "none", outline: "none", width: "82%" }}
                    placeholder="Placeholder"
                    name="street1"
                    value={values.street1}
                    onChange={(e)=>{handleChange(e); onChange(e);}}
                    onBlur={handleBlur}
                  />
                  {errors.street1 && touched.street1 && (
                    <div className="error_icon">
                    <img
                      src="/images/icons/exclamation_icon.svg"
                      alt="error"
                    />
                  </div>
                  )}
                </div>
                {errors.street1 && touched.street1 && (
                    <p className="error_text">{errors.street1}</p>
                  )}
              </div>

              <div className="form_field field11" style={{ gridRowStart: 5, gridColumnStart: 2}}>
              <Tooltip title="prompt text" color="#5C5AD0">
                  {" "}
                  <label className="label" style={{ marginTop: "5px" }}>
                    Street 2
                  </label>
                </Tooltip>
                <br />
                <div
                  className={`${
                    errors.street2 && touched.street2 && "inputError"
                  } customerdropdown`}
                >
                  <img src={street} className="customerimg" />
                  <input
                    type="text"
                    style={{ border: "none", outline: "none", width: "82%" }}
                    placeholder="Placeholder"
                    name="street2"
                    value={values.street2}
                    onChange={(e)=>{handleChange(e); onChange(e);}}
                    onBlur={handleBlur}
                  />
                  {errors.street2 && touched.street2 && (
                    <div className="error_icon">
                    <img
                      src="/images/icons/exclamation_icon.svg"
                      alt="error"
                    />
                  </div>
                  )}
                </div>
                {errors.street2 && touched.street2 && (
                    <p className="error_text">{errors.street2}</p>
                  )}
              </div>

              <div className="form_field field12" style={{ gridRowStart: 6, gridColumnStart: 2}}>
              <Tooltip title="prompt text" color="#5C5AD0">
                  {" "}
                  <label className="label" style={{ marginTop: "5px" }}>
                    City
                  </label>
                </Tooltip>
                <br />
                <div
                  className={`customerdropdown disabledInput`}
                >
                  {/* <img src={street} className="customerimg" /> */}
                  <input
                    type="text"
                    style={{ border: "none", outline: "none", width: "82%" }}
                    name="city"
                    value={city}
                    disabled={true}
                  />
                 
                </div>
              </div>

              <div className="form_field field13" style={{ gridRowStart: 1, gridColumnStart: 3}}>
              <Tooltip title="prompt text" color="#5C5AD0">
                  {" "}
                  <label className="label" style={{ marginTop: "5px" }}>
                    State
                  </label>
                </Tooltip>
                <br />
                <div
                  className={`customerdropdown disabledInput`}
                >
                  {/* <img src={street} className="customerimg" /> */}
                  <input
                    type="text"
                    style={{ border: "none", outline: "none", width: "82%" }}
                    name="state"
                    value={statedrp}
                    disabled={true}
                  />
                </div>
              </div>

              <div className="form_field field14" style={{ gridRowStart: 2, gridColumnStart: 3}}>
              <Tooltip title="prompt text" color="#5C5AD0">
                  <label className="label">Default Place of Supply</label>
                </Tooltip>
                <br />
                <SearchDropdown
                  width={331}
                  options={gsttraetmentOptional}
                  value={values.pos}
                  onChange={handleDrpChange}
                  name="pos"
                  error={errors.pos && touched.pos ? true : false}
                  errorMsg="Place of Supply is required"
                />
              </div>

              <div className="form_field field15" style={{ gridRowStart: 3, gridColumnStart: 3}}>
              <Tooltip title="prompt text" color="#5C5AD0">
                  {" "}
                  <label className="label">Contacts</label>
                </Tooltip>
                <br />

                <SearchDropdown
                  width={331}
                  options={contacts}
                  value={values.contact}
                  onChange={handleDrpChange}
                  name="contact"
                  error={errors.contact && touched.contact ? true : false}
                  errorMsg="Contact is required"
                />
              </div>

              <div className="form_field field16" style={{ gridRowStart: 4, gridColumnStart: 3}}>
              <Tooltip title="prompt text" color="#5C5AD0">
                  {" "}
                  <label className="label">Ownership</label>
                </Tooltip>
                <br />

                <SearchDropdown
                  width={331}
                  options={ownershipwithemail}
                  
                  value={values.ownership}
                  onChange={handleDrpChange}
                  name="ownership"
                  error={errors.ownership && touched.ownership ? true : false}
                  errorMsg="Ownership is required"
                />
              </div>
            </div>

            
            <div className="customerbutton_bottom">
         {/* <button type="submit" className="contactsavebutton"  onClick={() => {handleFormSubmit()}}>
                  {formData.id ? "Update" :"Submit"}
                </button>  */}
                <input type="submit" className="customersavebutton btn_hover_animation"  onClick={() => handleFormSubmit()}/>
                  <button type="button" className="customercancelbutton btn_hover_animation"  onClick={handleConfirmData}>
                    Cancel
                  </button>
                </div>
          </form>
      </div>
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
  );
}

export default Vendors;
export {ChildStateModificationFunc}
