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
  const [values, setValues] = useState(initialFieldValues);
  const [customer, setCustomer] = useState([]);

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
  
    setValues({ ...values, [name]: value });
    console.log(value);
    console.log(name);
  };
  const [gst, setGst] = useState(false);
  console.log(values);
  let gstinparams = values.gstin;

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
    setValues(initialFieldValues)
  };

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
    <div className="vendors_container">
      <div className="addvendor_heading">
        <Page_heading parent={"Business Account"} subchild={(<Link exact to= "/vendors">{"Vendor"}</Link>)}  child={"Add New Vendor"} />
      </div>
      <div className="vendorform">
        <div className="newvendor">
          {/* <h1 className="box_heading1">New Vendor</h1> */}
          <div className="container_details1">
            <div className="form-left">
              <Tooltip title="prompt text" color="#5C5AD0">
                {" "}
                <label className="label">GST Treatment</label>{" "}
              </Tooltip>
              <br />
              <SearchDropdown width={331} options={gsttreatment} />

              <Tooltip title="prompt text" color="#5C5AD0">
                {" "}
                <label className="label" style={{ marginTop: "5px" }}>
                  GST No.
                </label>{" "}
              </Tooltip>
              <br />
              <div className="vendordropdown" style={{ marginTop: "5px" }}>
                <img src={gstno} className="customerimg" />
                <input
                  type="text"
                  style={{ border: "none", outline: "none", width: "82%" }}
                  placeholder="Placeholder"
                  // name="gstin"
                  // value={values.gstin}
                  // onBlur={onBlur}
                  // onChange={onChange}
                  name="gstin"
                  value={values.gstin}
                  onChange={onChange}
                />
              </div>
              <Tooltip title="prompt text" color="#5C5AD0">
                {" "}
                <label className="label" style={{ marginTop: "5px" }}>
                  Business Name
                </label>{" "}
              </Tooltip>
              <br />
              <div className="vendordropdown" style={{ marginTop: "5px" }}>
                <img src={business} className="customerimg" />
                <input
                  type="text"
                  style={{ border: "none", outline: "none", width: "82%" }}
                  placeholder="Placeholder"
                  name="businessname"
                  value={values.businessname}
                  onChange={onChange}
                />
              </div>
              <Tooltip title="prompt text" color="#5C5AD0">
                {" "}
                <label className="label">Type Category</label>{" "}
              </Tooltip>
              <br />
              <SearchDropdown options={typeCategory} width={330} />

              <Tooltip title="prompt text" color="#5C5AD0">
                {" "}
                <label className="label" style={{ marginTop: "5px" }}>
                  Pancard
                </label>{" "}
              </Tooltip>
              <br />
              <div className="vendordropdown">
                <img src={pan} className="customerimg" />
                <input
                  type="text"
                  style={{ border: "none", outline: "none", width: "82%" }}
                  placeholder="Placeholder"
                  name="pancard"
                  value={values.pancard}
                  onChange={onChange}
                />
              </div>
              <div style={{ display: "flex", gap: "30px" }}>
                <div style={{ width: "50%" }}>
                  <Tooltip title="prompt text" color="#5C5AD0">
                    {" "}
                    <label className="label" style={{ marginTop: "5px" }}>
                      Currency
                    </label>{" "}
                  </Tooltip>
                  <br />
                  <SearchDropdown width={150} />
                </div>
                <div style={{ width: "50%" }}>
                  <Tooltip title="prompt text" color="#5C5AD0">
                    {" "}
                    <label className="label">Payment Terms</label>{" "}
                  </Tooltip>
                  <br />
                  <SearchDropdown width={150} />
                </div>
              </div>

              <div className="vendorbutton_bottom">
                <button type="button" className="vendorsavebutton"  onClick={() => handleFormSubmit()}>
                  Submit
                </button>
                <button
                  type="button"
                  className="vendorcancelbutton"
                  onClick={handleClose}
                >
                  Cancel
                </button>
              </div>
            </div>

            <div className="form-center">
              <Tooltip title="prompt text" color="#5C5AD0">
                {" "}
                <label className="label" style={{ marginTop: "5px" }}>
                  Credit Limit
                </label>{" "}
              </Tooltip>
              <br />
              <div className="vendordropdown">
                <img src={creditcard} className="customerimg" />
                <input
                  type="text"
                  style={{ border: "none", outline: "none", width: "82%" }}
                  placeholder="Placeholder"
                  name="credit"
                  value={values.credit}
                  onChange={onChange}
                />
              </div>

              <Tooltip title="prompt text" color="#5C5AD0">
                {" "}
                <label className="label" style={{ marginTop: "5px" }}>
                  Email
                </label>{" "}
              </Tooltip>
              <br />
              <div className="vendordropdown">
                <img src={email} className="customerimg" />
                <input
                  type="email"
                  style={{ border: "none", outline: "none", width: "82%" }}
                  placeholder="Placeholder"
                  name="email"
                  value={values.email}
                  onChange={onChange}
                />
              </div>
              <Tooltip title="prompt text" color="#5C5AD0">
                {" "}
                <label className="label" style={{ marginTop: "5px" }}>
                  Pincode
                </label>{" "}
              </Tooltip>
              <br />
              <div className="vendordropdown">
                <img src={pin} className="customerimg" />
                <input
                  type="number"
                  style={{ border: "none", outline: "none", width: "82%" }}
                  placeholder="Placeholder"
                  name="pincode"
                  value={values.pincode}
                  onChange={onChange}
                />
              </div>

              <Tooltip title="prompt text" color="#5C5AD0">
                {" "}
                <label className="label" style={{ marginTop: "5px" }}>
                  Street 1
                </label>{" "}
              </Tooltip>
              <br />
              <div className="vendorstreet">
                <img src={street} className="customerimg" />
                <input
                  type="text"
                  style={{ border: "none", outline: "none", width: "82%" }}
                  placeholder="Placeholder"
                  name="street1"
                  value={values.street1}
                  onChange={onChange}
                />
              </div>
              <Tooltip title="prompt text" color="#5C5AD0">
                {" "}
                <label className="label" style={{ marginTop: "5px" }}>
                  Street 2
                </label>{" "}
              </Tooltip>
              <br />
              <div className="vendorstreet">
                <img src={street} className="customerimg" />
                <input
                  type="text"
                  style={{ border: "none", outline: "none", width: "82%" }}
                  placeholder="Placeholder"
                  name="street2"
                  value={values.street2}
                  onChange={onChange}
                />
              </div>

              <Tooltip title="prompt text" color="#5C5AD0">
                {" "}
                <label className="label" style={{ marginTop: "5px" }}>
                  City
                </label>{" "}
              </Tooltip>
              <br />
              <SearchDropdown
                width={331}
                options={gsttraetmentOptional}
                isDisabled={true}
              />
            </div>

            <div className="form-right">
              <Tooltip title="prompt text" color="#5C5AD0">
                {" "}
                <label className="label" style={{ marginTop: "5px" }}>
                  State
                </label>{" "}
              </Tooltip>
              <br />
              <SearchDropdown
                width={331}
                options={gsttraetmentOptional}
                isDisabled={true}
              />

              <Tooltip title="prompt text" color="#5C5AD0">
                {" "}
                <label className="label">Default Place of Supply</label>{" "}
              </Tooltip>
              <br />

              <SearchDropdown width={331} options={gsttraetmentOptional} />
              <Tooltip title="prompt text" color="#5C5AD0">
                {" "}
                <label className="label">Contacts</label>{" "}
              </Tooltip>
              <br />

              <SearchDropdown width={331} options={contacts} />
              <Tooltip title="prompt text" color="#5C5AD0">
                {" "}
                <label className="label">Ownership</label>{" "}
              </Tooltip>
              <br />

              <SearchDropdown width={331} options={ownershipwithemail} />
            </div>
          </div>
          <ToastContainer/>
        </div>
      </div>
    </div>
  );
}

export default Vendors;
