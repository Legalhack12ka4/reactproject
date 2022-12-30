import React, { useEffect, useState } from "react";
import SearchDropdown from "../AllDropdowns/SearchDropdown/SearchDropdown";
import Page_heading from "../Page_Heading/Page_heading";
import "./AddNewCustomer.scss";
import logo from "./images/Email.svg";

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
    setValues({
      ...values,
      [name]: value,
    });
    console.log(value);
    console.log(name);
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
              <SearchDropdown width={330} options={gsttraetmentOptional} />

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
              <SearchDropdown options={typeCategory} width={330} />

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
                  <SearchDropdown width={150} />
                </div>
                <div style={{ width: "50%" }}>
                  <label className="label">Payment Terms</label>
                  <br />
                  <SearchDropdown width={150} />
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
                City
              </label>
              <br />
              <div
                className="customerdropdown"
                style={{ backgroundColor: "#f2efeb" }}
              >
                <img src={logo} className="customerimg" />
                <input
                  className="citydis"
                  type="text"
                  style={{ border: "none", outline: "none", width: "100%" }}
                  placeholder="Placeholder"
                  disabled
                />
              </div>

              <label className="label" style={{ marginTop: "5px" }}>
                State
              </label>
              <br />
              <div
                className="customerdropdown"
                style={{ backgroundColor: "#f2efeb" }}
              >
                <img src={logo} className="customerimg" />
                <input
                  type="text"
                  style={{ border: "none", outline: "none", width: "100%" }}
                  placeholder="Placeholder"
                  disabled
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
            </div>

            <div className="form-right">
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

              <SearchDropdown width={330} options={gsttraetmentOptional} />
              <label className="label">Contacts</label>
              <br />

              <SearchDropdown width={330} options={gsttraetmentOptional} />
              <label className="label">Ownership</label>
              <br />

              <SearchDropdown width={330} options={gsttraetmentOptional} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AddNewCustomer;
