import React, { useEffect, useState } from "react";
import SearchDropdown from "../AllDropdowns/SearchDropdown/SearchDropdown";
import Page_heading from "../Page_Heading/Page_heading";
import "./AddNewCustomer.scss";

import "../AllDropdowns/SearchDropdown/SearchDropdown.scss";
import { Tooltip } from "antd";
import { Button, Checkbox, Form, Input } from "antd";
import { useFormik } from "formik";
import { addCustomerSchemas } from "../../Schemas";

// icons
import creditcard from "../../assets/Images/FormIcon/Credit Limit.svg";
import email from "../../assets/Images/FormIcon/Email.svg";
import gstno from "../../assets/Images/FormIcon/Gst no.svg";
import pan from "../../assets/Images/FormIcon/Pan Card.svg";
import pin from "../../assets/Images/FormIcon/Pincode.svg";
import street from "../../assets/Images/FormIcon/Street 1 & Street 2.svg";
import business from "../../assets/Images/FormIcon/Business.svg";
import { BiErrorCircle } from "react-icons/bi";

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

function AddNewCustomer(props) {
  // const [values, setValues] = useState(initialFieldValues);
  const [customer, setCustomer] = useState([]);
  const [gstnoErr, setGstnoErr] = useState({});

  const [gst, setGst] = useState(false);
  // let gstinparams = values.gstin;

  const getData = () => {
    fetch(
      // `https://commonapi.mastersindia.co/commonapis/searchgstin?gstin=${gstinparams}`,
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

  // form Validation

  const { errors, values, handleBlur, touched, handleChange, handleSubmit } =
    useFormik({
      initialValues: initialFieldValues,

      validationSchema: addCustomerSchemas,
      onSubmit: (values) => {
        console.log(values);
      },
    });

  const handleDrpChange = (value) => {
    console.log(value);
  };

  useEffect(() => {
    getData();
    console.log("Getting Data");
    console.log(values.gstin);
  }, [gst]);

  // const onBlur = (e) => {
  //   //alert(e.target.value)
  //   setGst(!gst);
  //   console.log(gst);
  // };

  // const onChange = (e) => {
  //   e.preventDefault();
  //   const { value, name } = e.target;
  // };



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
    <div className="addNewCustomerContainer">
      <div className="addcustomer_heading">
        <Page_heading parent={"Business Account"} child={"Add New Customer"} />
      </div>

      <div className="customerform">
        <div className="newcustomer">
          {/* <h1 className="box_heading1">New Customer</h1> */}
          <form onSubmit={handleSubmit} autoComplete="off">
            <div className="container_details1">
              <div className="form-left">
                <Tooltip title="prompt text" color="#5C5AD0">
                  {" "}
                  <label className="label">GST Treatment</label>{" "}
                </Tooltip>
                <br />

                <SearchDropdown
                  width={331}
                  options={gsttreatment}
                  onChange={handleDrpChange}
                  name="gsttreat"
                  value={values.gsttreat}
                  // onChange={handleChange}
                  onBlur={handleBlur}
                />

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
                  } ${touched.gstin && "acive_input"} customerdropdown`}
                >
                  <img src={gstno} className="customerimg" />
                  <input
                    type="text"
                    style={{ border: "none", outline: "none", width: "82%" }}
                    placeholder="Placeholder"
                    name="gstin"
                    value={values.gstin}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    autoComplete="off"
                  />
                  {errors.gstin && touched.gstin && (
                    <Tooltip title={errors.gstin} color="#5C5AD0">
                      {" "}
                      <img
                        src="/images/icons/exclamation_icon.svg"
                        alt="error"
                      />
                    </Tooltip>
                  )}
                </div>
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
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.businessname && touched.businessname && (
                    <Tooltip title={errors.businessname} color="#5C5AD0">
                      {" "}
                      <img
                        src="/images/icons/exclamation_icon.svg"
                        alt="error"
                      />
                    </Tooltip>
                  )}
                </div>

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
                />

                <Tooltip title="prompt text" color="#5C5AD0">
                  <label className="label" style={{ marginTop: "5px" }}>
                    Pancard
                  </label>
                </Tooltip>
                <br />
                <div
                  className={`${
                    errors.pancard && touched.pancard && "inputError"
                  } customerdropdown`}
                >
                  <img src={pan} className="customerimg" />
                  <input
                    type="text"
                    style={{ border: "none", outline: "none", width: "82%" }}
                    placeholder="Placeholder"
                    name="pancard"
                    value={values.pancard}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.pancard && touched.pancard && (
                    <Tooltip title={errors.pancard} color="#5C5AD0">
                      {" "}
                      <img
                        src="/images/icons/exclamation_icon.svg"
                        alt="error"
                      />
                    </Tooltip>
                  )}
                </div>

                <div style={{ display: "flex", gap: "30px" }}>
                  <div style={{ width: "50%" }}>
                    <Tooltip title="prompt text" color="#5C5AD0">
                      {" "}
                      <label className="label" style={{ marginTop: "5px" }}>
                        Currency
                      </label>
                    </Tooltip>
                    <br />
                    <SearchDropdown
                      width={150}
                      value={values.currency}
                      onChange={handleDrpChange}
                      name="currency"
                    />
                  </div>
                  <div style={{ width: "50%" }}>
                    <Tooltip title="prompt text" color="#5C5AD0">
                      {" "}
                      <label className="label">Payment Terms</label>
                    </Tooltip>
                    <br />
                    <SearchDropdown
                      width={150}
                      value={values.payment}
                      onChange={handleDrpChange}
                      name="payment"
                    />
                  </div>
                </div>

                <div className="customerbutton_bottom">
                  <input type="submit" className="customersavebutton" />
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
                <div
                  className={`${
                    errors.credit && touched.credit && "inputError"
                  } customerdropdown`}
                >
                  <img src={creditcard} className="customerimg" />
                  <input
                    type="text"
                    style={{ border: "none", outline: "none", width: "82%" }}
                    placeholder="Placeholder"
                    name="credit"
                    value={values.credit}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.credit && touched.credit && (
                    <Tooltip title={errors.credit} color="#5C5AD0">
                      {" "}
                      <img
                        src="/images/icons/exclamation_icon.svg"
                        alt="error"
                      />
                    </Tooltip>
                  )}
                </div>

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
                    onChange={handleChange}
                    onBlur={handleBlur}
                    autoComplete="off"
                  />
                  {errors.email && touched.email && (
                    <Tooltip title={errors.email} color="#5C5AD0">
                      {" "}
                      <img
                        src="/images/icons/exclamation_icon.svg"
                        alt="error"
                      />
                    </Tooltip>
                  )}
                </div>

                <Tooltip title="prompt text" color="#5C5AD0">
                  {" "}
                  <label className="label" style={{ marginTop: "5px" }}>
                    Pincode
                  </label>
                </Tooltip>
                <br />
                <div
                  className={`${
                    errors.pincode && touched.pincode && "inputError"
                  } customerdropdown`}
                >
                  <img src={pin} className="customerimg" />
                  <input
                    type="number"
                    style={{ border: "none", outline: "none", width: "82%" }}
                    placeholder="Placeholder"
                    name="pincode"
                    value={values.pincode}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    autoComplete="off"
                  />
                  {errors.pincode && touched.pincode && (
                    <Tooltip title={errors.pincode} color="#5C5AD0">
                      {" "}
                      <img
                        src="/images/icons/exclamation_icon.svg"
                        alt="error"
                      />
                    </Tooltip>
                  )}
                </div>

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
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.street1 && touched.street1 && (
                    <Tooltip title={errors.street1} color="#5C5AD0">
                      {" "}
                      <img
                        src="/images/icons/exclamation_icon.svg"
                        alt="error"
                      />
                    </Tooltip>
                  )}
                </div>
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
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.street2 && touched.street2 && (
                    <Tooltip title={errors.street2} color="#5C5AD0">
                      {" "}
                      <img
                        src="/images/icons/exclamation_icon.svg"
                        alt="error"
                      />
                    </Tooltip>
                  )}
                </div>

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
                  onChange={handleDrpChange}
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
                  onChange={handleDrpChange}
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

                <SearchDropdown
                  width={331}
                  options={gsttraetmentOptional}
                  value={values.pos}
                  onChange={handleDrpChange}
                  name="pos"
                />

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
                />

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
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddNewCustomer;
