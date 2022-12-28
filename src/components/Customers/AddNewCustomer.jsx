import React, { useEffect, useState } from "react";
// import Footer from '../Footer/Footer';
import Page_heading from "../Page_Heading/Page_heading";
import "./AddNewCustomer.scss";
import logo from "./images/Email.svg";
import Select from "react-select";
import DropdownWithProfile from "../DropdownWithProfile/DropdownWithProfile";
import DropdownSimple from "../Contacts/DropdownSimple/DropdownSimple";
import DropdownSimpleCategory from "./DropdownSimpleCategory/DropdownSimpleCategory";
import UniversalDropdown from "../UniversalDropdown/UniversalDropdown";
import DropdownWithLargeWidth from "../UniversalDropdown/DropdownWithLargeWidth/DropdownWithLargeWidth";
import DropdownWithLargeWidthCustomer from "./DropdownWithLargeWidthCustomer/DropdownWidthLargeWidthCustomer";
// import axios from "axios";

const initialFieldValues = {
  lgnm: "",
  gstin: "",
};

function AddNewCustomer(props) {
  const [values, setValues] = useState(initialFieldValues);
  const [customer, setCustomer] = useState([]);
  const [gst, setGst] = useState(false);
  console.log(values);
  let gstinparams = values.gstin;


  const getData = () => {
    fetch (
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
    setValues({
      ...values,
      [name]: value,
    });
    console.log(value);
    console.log(name);
  };

  const option = [
    {
      value: "one",
      label: (
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div>
            <div className="drpName">Parth Goswami</div>
            <div className="drpEmail">Parth.goswami@reformiqo.com</div>
          </div>
          <div>
            <div className="drpContact">Contact Added</div>
            <div className="drpDate">10 Dec 2022</div>
          </div>
        </div>
      ),
    },
    {
      value: "two",
      label: (
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div>
            <div className="drpName">Parth Goswami</div>
            <div className="drpEmail">Parth.goswami@reformiqo.com</div>
          </div>
          <div>
            <div className="drpContact">Contact Added</div>
            <div className="drpDate">10 Dec 2022</div>
          </div>
        </div>
      ),
    },
    {
      value: "three",
      label: (
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div>
            <div className="drpName">Parth Goswami</div>
            <div className="drpEmail">Parth.goswami@reformiqo.com</div>
          </div>
          <div>
            <div className="drpContact">Contact Added</div>
            <div className="drpDate">10 Dec 2022</div>
          </div>
        </div>
      ),
    },
    {
      value: "four",
      label: (
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div>
            <div className="drpName">Parth Goswami</div>
            <div className="drpEmail">Parth.goswami@reformiqo.com</div>
          </div>
          <div>
            <div className="drpContact">Contact Added</div>
            <div className="drpDate">10 Dec 2022</div>
          </div>
        </div>
      ),
    },
    {
      value: "five",
      label: (
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div>
            <div className="drpName">Parth Goswami</div>
            <div className="drpEmail">Parth.goswami@reformiqo.com</div>
          </div>
          <div>
            <div className="drpContact">Contact Added</div>
            <div className="drpDate">10 Dec 2022</div>
          </div>
        </div>
      ),
    },
  ];

  return (
    <>
      <div className="addcustomer_heading">
        <Page_heading parent={"Business Account"} child={"Add New Customer"} />
      </div>
      <div className="customerform">
        <div className="newcustomer">
          <h1 className="box_heading1">New Customer</h1>
          <div className="container_details1">
            <div className="form-left">
              <label className="label">GST Treatment</label>
              <br />
            <DropdownWithLargeWidth/>
              <label className="label" style={{ marginTop: "5px" }}>
                GST No.
              </label>
              <br />
              <div className="customerdropdown" style={{ marginTop: "5px" }}>
                <img src={logo} className="customerimg" />
                <input
                  type="text"
                  style={{ border: "none", outline: "none" }}
                  placeholder="Placeholder"
                  name="gstin"
                  value={values.gstin}
                  onBlur={onBlur}
                  onChange={onChange}
                />
              </div>
              <label className="label" style={{ marginTop: "5px" }}>
                Business Name
              </label>
              <br />
              <div className="customerdropdown" style={{ marginTop: "5px" }}>
                <img src={logo} className="customerimg" />
                <input
                  type="text"
                  style={{ border: "none", outline: "none" }}
                  placeholder="Placeholder"
                />
              </div>
              <label className="label">Type Category</label>
              <br />
            <DropdownSimpleCategory/>
            {/* <DropdownWithLargeWidthCustomer/> */}
              {/* <Select placeholder="Select value" options={option} /> */}

             
              {/* <select  className='customerinput' style={{marginBottom:"18px",  color:"#697A8D", outline:"none"}} placeholder='select value' name="values" id="values" >

                    <option value="" selected hidden>Select value</option>
                     <option value="1">1</option>
                     <option value="2">2</option>
                     <option value="3">3</option>
                     <option value="4">4</option>
                    </select> */}
              <label className="label" style={{ marginTop: "5px" }}>
                Pancard
              </label>
              <br />
              <div className="customerdropdown">
                <img src={logo} className="customerimg" />
                <input
                  type="text"
                  style={{ border: "none", outline: "none" }}
                  placeholder="Placeholder"
                />
              </div>
              <div style={{ display: "flex", gap: "30px" }}>
                <div style={{ width: "50%" }}>
                  <label className="label" style={{ marginTop: "5px" }}>
                    Currency
                  </label>
                  <br />
                  <UniversalDropdown/>
                  {/* <select
                    className="customerinput1"
                    style={{
                      marginBottom: "18px",
                      color: "#697A8D",
                      outline: "none",
                      border: "0.5px solid #D9DEE3"
                    }}
                    placeholder="select value"
                    name="values"
                    id="values"
                  >
                    <option value="" selected hidden>
                      Select value
                    </option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                  </select> */}
                </div>
                <div style={{ width: "50%"}}>
                  <label className="label">Payment Terms</label>
                  <br />
                    <UniversalDropdown/>
                  {/* <select
                    className="customerinput1"
                    style={{
                      marginBottom: "18px",
                      color: "#697A8D",
                      outline: "none",
                      border: "0.5px solid #D9DEE3"
                    }}
                    placeholder="select value"
                    name="values"
                    id="values"
                  >
                    <option value="" selected hidden>
                      Select value
                    </option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                  </select> */}
                </div>
              </div>
              
              <div className="customerbutton_bottom">
                <button type="button" className="leadsavebutton">
                  Save
                </button>
                <button type="button" className="leadcancelbutton">
                Cancel
                </button>
                </div>
            </div>

            <div className="form-center">

            <label className="label" style={{ marginTop: "5px" }}>
                Credit Limit
              </label>
              <br />
              <div className="customerdropdown">
                <img src={logo} className="customerimg" />
                <input
                  type="text"
                  style={{ border: "none", outline: "none" }}
                  placeholder="Placeholder"
                />
              </div>

              <label className="label" style={{ marginTop: "5px" }}>
                Email
              </label>
              <br />
              <div className="customerdropdown">
                <img src={logo} className="customerimg" />
                <input
                  type="email"
                  style={{ border: "none", outline: "none" }}
                  placeholder="Placeholder"
                />
              </div>
              <label className="label" style={{ marginTop: "5px" }}>
                Pincode
              </label>
              <br />
              <div className="customerdropdown">
                <img src={logo} className="customerimg" />
                <input
                  type="number"
                  style={{ border: "none", outline: "none" }}
                  placeholder="Placeholder"
                />
              </div>
              <label className="label" style={{ marginTop: "5px" }}>
                Street 1
              </label>
              <br />
              <div className="customerstreet">
                <img src={logo} className="customerimg" />
                <input
                  type="text"
                  style={{ border: "none", outline: "none" }}
                  placeholder="Placeholder"
                />
              </div>

              <label className="label" style={{ marginTop: "5px" }}>
                Street 2
              </label>
              <br />
              <div className="customerstreet">
                 <img src={logo} className="customerimg" />
                <input
                  type="text"
                  style={{ border: "none", outline: "none" }}
                  placeholder="Placeholder"
                />
              </div>
              <label className="label">Default Place of Supply</label>
              <br />
              <DropdownWithLargeWidth/>
              {/* <Select placeholder="Select value" options={option} /> */}

              {/* <label className="label" style={{ marginTop: "5px" }}>
                Address
              </label>
              <input
                type="text"
                className="customeraddress"
                placeholder="Placeholder"
              /> */}


             
            </div>

            <div className="form-right">

            
            
              <label className="label">Contacts</label>
              <br />
              <Select placeholder="Select value" options={option} />
    
              <label className="label">Ownership</label>
              <br />
              <DropdownWithProfile />
              {/* <Select
                placeholder="Select value"
                style={{ height: "41px" }}
                options={option}
              /> */}
              
  </div>



 


          </div>
        </div>
      </div>
    </>
  );
}

export default AddNewCustomer;
