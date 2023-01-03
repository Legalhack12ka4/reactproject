import React, { useEffect, useState } from "react";
import "./Leads.scss";
import company from "../../assets/Images/FormIcon/Company Name.svg";
import email from "../../assets/Images/FormIcon/Email Lead.svg";
import Phone from "../../assets/Images/FormIcon/Phone.svg";
import Name from "../../assets/Images/FormIcon/Name.svg";
import SearchDropdown from "../AllDropdowns/SearchDropdown/SearchDropdown";
import SearchDropdownAddButton from "../AllDropdowns/SearchDropdownAddButton/SearchDropdownAddButton";
import { Tooltip } from "antd";

function Leads() {
  const [checked, setChecked] = useState("Contacts");
  function handleclose() {
    var m = document.querySelector(".menu1 ");
    m.classList.remove("smenu");
    document.getElementById("gradient").classList.remove("body_gradient");
  }
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
      <div className="lead_heading"></div>
      <div className="leadform">
        <div className="leads">
          <h1 className="box_heading1">New Lead</h1>
          <div className="lead_details">
            <div className="form-left">
              <Tooltip title="prompt text" color="#5C5AD0">
                <label className="leadlabel" style={{ marginTop: "5px" }}>
                  Name
                </label>{" "}
              </Tooltip>
              <br />
              <div className="leadinput" style={{ marginTop: "5px" }}>
                <img src={Name} className="customerimg" />
                <input
                  type="text"
                  className="inputlead"
                  placeholder="Placeholder"
                />
              </div>
              <Tooltip title="prompt text" color="#5C5AD0">
                {" "}
                <label className="leadlabel" style={{ marginTop: "5px" }}>
                  Mobile No.
                </label>{" "}
              </Tooltip>
              <br />
              <div className="leadinput" style={{ marginTop: "5px" }}>
                <img src={Phone} className="customerimg" />
                <input
                  type="text"
                  className="inputlead"
                  placeholder="Placeholder"
                />
              </div>
              <Tooltip title="prompt text" color="#5C5AD0">
                {" "}
                <label className="leadlabel" style={{ marginTop: "5px" }}>
                  Email
                </label>{" "}
              </Tooltip>
              <br />
              <div className="leadinput" style={{ marginTop: "5px" }}>
                <img src={email} className="customerimg" />
                <input
                  type="text"
                  className="inputlead"
                  placeholder="Placeholder"
                />
              </div>
              <Tooltip title="prompt text" color="#5C5AD0">
                {" "}
                <label className="leadlabel" style={{ marginTop: "5px" }}>
                  Company Name
                </label>{" "}
              </Tooltip>
              <br />
              <div className="leadinput" style={{ marginTop: "5px" }}>
                <img src={company} className="customerimg" />
                <input
                  type="text"
                  className="inputlead"
                  placeholder="Placeholder"
                />
              </div>

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
                    name="lead"
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
                <SearchDropdown width={331} options={contacts} />
              ) : (
                <SearchDropdownAddButton />
              )}
              <Tooltip title="prompt text" color="#5C5AD0">
                {" "}
                <label className="leadlabel" style={{ marginTop: "15px" }}>
                  Ownership
                </label>{" "}
              </Tooltip>
              <br />
              <SearchDropdown width={331} options={contacts} />

              <div className="leadbutton_bottom">
                <button type="button" className="leadsavebutton">
                  Submit
                </button>
                <button
                  type="button"
                  className="leadcancelbutton"
                  onClick={handleclose}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Leads;
