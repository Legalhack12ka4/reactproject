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
import { Tooltip } from "antd";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import { addCustomerSchemas } from "../../Schemas";

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
  //const [pincode, setPincode]= useState([])

  //const [gst, setGst] = useState(false);
  const handleFormSubmit = () => {

    axios
      .post(
        "http://127.0.0.1:8000/customervendor/",
        {
          "gst_treatment": 1,
            gst_no:values.gstin,
            business_name:values.businessname,
            "type_category": 8,
            pan_card:values.pancard,
            "currency": 1,
            "payment_terms": 1,
            credit_limit:values.credit,
            email:values.email,
            pincode:values.pincode,
            street1:values.street1,
            street2:values.street2,
            "place_of_supply": 1,
            "contact": 1,
            "ownership": 1,
            "is_active": true,
            "is_deleted": false,
            "type": 11,
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


  const onChange = (e) => {
    const { value, name } = e.target;
  
    setFormData({ ...values, [name]: value });
    console.log(value);
    console.log(name);
  };
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

  const onBlur = (e) => {
    //alert(e.target.value)
    setGst(!gst);
    console.log(gst);
  };
//Dropdown value get

const handleDrpChange = (field, value) => {
  setFieldValue(field, value);
  setFieldTouched(field, false);

  // console.log("value", value);
  // console.log("field", field);
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


  const getArea = (pincode) => {
    return fetch(`https://api.postalpincode.in/pincode/${pincode}`)
      .then((response) => response.json())
      .then((data) => {
        setArea(data);

        setStatedrp(data[0].PostOffice[0].State);
        setCity(data[0].PostOffice[0].District);
      });
  };
  console.log(area);

  const handlePincode = (e) => {
    //setPincode(e.target.value)
    console.log("Pincode value", e.target.value);
    getArea(e.target.value);
    //alert("Blur");
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
          <p className="dropdown_title_heading">Consumer</p>
          <p>A customer who is regular Consumer</p>
        </div>
      ),
    },
    {
      value: "4",
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
      value: "5",
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
      value: "6",
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
      value: "7",
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
      value: "8",
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


  return (
    <div className="vendors_container">
      <div className="addvendor_heading">
        <Page_heading parent={"Business Account"} subchild={(<Link exact to= "/vendors">{"Vendor"}</Link>)}  child={"Add New Vendor"} />
      </div>
      <div className="customerform">
      <form onSubmit={handleSubmit} autoComplete="off">
            <div className="form_first_container">
              
              <div className="form_field" style={{ gridRowStart: 1, gridColumnStart: 1}}>
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
                  value={values.gsttreat}
                  error={errors.gsttreat && touched.gsttreat ? true : false}
                  errorMsg="GST Treatment is required"
                  />
                 
                  </div>
              </div>

              <div className="form_field" style={{ gridRowStart: 2, gridColumnStart: 1}}>
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
                    value={values.gstin}
                    onChange={(e)=>{handleChange(e); onChange(e);}}
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

              <div className="form_field" style={{ gridRowStart: 3, gridColumnStart: 1}}>
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
                    value={values.businessname}
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

              <div className="form_field" style={{ gridRowStart: 4, gridColumnStart: 1}}>
              <Tooltip title="prompt text" color="#5C5AD0">
                  <label className="label">Type Category</label>
                </Tooltip>
                <br />
                <SearchDropdown
                  options={typeCategory}
                  width={330}
                  value={values.category}
                  onChange={handleDrpChange}
                  name="category"
                  error={errors.category && touched.category ? true : false}
                  errorMsg="Type Category is required"
                />
              </div>

              <div className="form_field" style={{ gridRowStart: 5, gridColumnStart: 1}}>
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
                    value={values.pancard}
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

              <div className="form_field" style={{ gridRowStart: 6, gridColumnStart: 1}}>
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
                      value={values.currency}
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
                      value={values.payment}
                      onChange={handleDrpChange}
                      name="payment"
                      error={errors.payment && touched.payment ? true : false}
                      errorMsg="Payment Terms is required"

                    />
                  </div>
                </div>
              </div>

              <div className="form_field" style={{ gridRowStart: 1, gridColumnStart: 2}}>
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
                  } customerdropdown`}
                >
                  <img src={creditcard} className="customerimg" />
                  <input
                    type="number"
                    style={{ border: "none", outline: "none", width: "82%" }}
                    placeholder="Placeholder"
                    name="credit"
                    value={values.credit}
                    onChange={(e)=>{handleChange(e); onChange(e);}}
                    onBlur={handleBlur}
                  />
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

              <div className="form_field" style={{ gridRowStart: 2, gridColumnStart: 2}}>
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
                    value={values.email}
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

              <div className="form_field" style={{ gridRowStart: 3, gridColumnStart: 2}}>
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
                    // pattern="[0-9]{0,2}"
                    style={{ border: "none", outline: "none", width: "82%" }}
                    placeholder="Placeholder"
                    name="pincode"
                    value={values.pincode}
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

              <div className="form_field" style={{ gridRowStart: 4, gridColumnStart: 2}}>
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

              <div className="form_field" style={{ gridRowStart: 5, gridColumnStart: 2}}>
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

              <div className="form_field" style={{ gridRowStart: 6, gridColumnStart: 2}}>
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

              <div className="form_field" style={{ gridRowStart: 1, gridColumnStart: 3}}>
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

              <div className="form_field" style={{ gridRowStart: 2, gridColumnStart: 3}}>
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

              <div className="form_field" style={{ gridRowStart: 3, gridColumnStart: 3}}>
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

              <div className="form_field" style={{ gridRowStart: 4, gridColumnStart: 3}}>
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
                  <input type="submit" className="customersavebutton"  onClick={() => handleFormSubmit()}/>
                  <button type="button" className="customercancelbutton"  onClick={handleClose}>
                    Cancel
                  </button>
                </div>
          </form>
      </div>
    </div>
  );
}

export default Vendors;
