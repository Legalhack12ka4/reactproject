import React from "react";
import accountname from "../Images/account-name.svg";
import accountcode from "../Images/account-code.svg";
import "./AccountForm.scss";
import SearchDropdown from "../../AllDropdowns/SearchDropdown/SearchDropdown";
import { Tooltip } from "antd";


function AccountForm() {
  function handleclose() {
    var m = document.querySelector(".menu1 ");
    m.classList.remove("smenu");
    document.getElementById("gradient").classList.remove("body_gradient");
  }

  const accounts = [
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
      <div className="accountform_heading">
      </div>
      <div className="leadform">
        <div className="accountsform">
          <h1 className="accountbox_heading1">Create Chart of Account</h1>
          <div className="accountform_details">
            <div className="accountform-left">
              <Tooltip title="prompt text" color="#5C5AD0">
                {" "}
                <label
                  className="accountformlabel"
                  style={{ marginTop: "15px" }}
                >
                  Account Type
                </label>
              </Tooltip>
              <br />
              <SearchDropdown width={331} options={accounts} />

              <Tooltip title="prompt text" color="#5C5AD0">
                {" "}
                <label
                  className="accountformlabel"
                  style={{ marginTop: "5px" }}
                >
                  Account Name
                </label>
              </Tooltip>
              <br />
              <div className="accountforminput" style={{ marginTop: "5px" }}>
                <img src={accountname} className="customerimg" />
                <input
                  type="text"
                  className="inputaccount"
                  placeholder="Placeholder"
                />
              </div>

              <Tooltip title="prompt text" color="#5C5AD0">
                {" "}
                <label
                  className="accountformlabel"
                  style={{ marginTop: "5px" }}
                >
                  Account Code
                </label>
              </Tooltip>
              <br />
              <div className="accountforminput" style={{ marginTop: "5px" }}>
                <img src={accountcode} className="customerimg" />
                <input
                  type="text"
                  className="inputaccount"
                  placeholder="Placeholder"
                />
              </div>

              <Tooltip title="prompt text" color="#5C5AD0">
                {" "}
                <label
                  className="accountformlabel"
                  style={{ marginTop: "15px" }}
                >
                  Module Type
                </label>
              </Tooltip>
              <br />
              <SearchDropdown width={331} options={accounts} />
              <Tooltip title="prompt text" color="#5C5AD0">
                {" "}
                <label
                  className="accountformlabel"
                  style={{ marginTop: "15px" }}
                >
                  Item Type
                </label>
              </Tooltip>
              <br />
              <SearchDropdown width={331} options={accounts} />
              <Tooltip title="prompt text" color="#5C5AD0">
                {" "}
                <label
                  className="accountformlabel"
                  style={{ marginTop: "15px" }}
                >
                  Reporting L1
                </label>
              </Tooltip>
              <br />
              <SearchDropdown width={331} options={accounts} />
              <Tooltip title="prompt text" color="#5C5AD0">
                {" "}
                <label
                  className="accountformlabel"
                  style={{ marginTop: "15px" }}
                >
                  Reporting L2
                </label>
              </Tooltip>
              <br />
              <SearchDropdown width={331} options={accounts} />
              <Tooltip title="prompt text" color="#5C5AD0">
                {" "}
                <label
                  className="accountformlabel"
                  style={{ marginTop: "15px" }}
                >
                  Reporting L3
                </label>
              </Tooltip>
              <br />
              <SearchDropdown width={331} options={accounts} />
             
              <div className="accountformbutton_bottom">
                <button type="button" className="accountformsavebutton">
                  Submit
                </button>
                <button
                  type="button"
                  className="accountformcancelbutton"
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

export default AccountForm;
