import React from "react";
import accountnameimg from "../Images/account-name.svg";
import accountcode from "../Images/account-code.svg";
import "./AccountForm.scss";
import SearchDropdown from "../../AllDropdowns/SearchDropdown/SearchDropdown";
import { Tooltip } from "antd";
import { useFormik } from "formik";

import { chartOfAccountSchema } from "../../../Schemas";




const initialFieldValues = {
  accounttype: "",
  accountname: "",
  accountcode: "",
  moduletype: "",
  itemtype: "",
  reportingl1: "",
  reportingl2: "",
  reportingl3: "",
};


function AccountForm() {
  function handleclose() {
    var m = document.querySelector(".menu1 ");
    m.classList.remove("smenu");
    document.getElementById("gradient").classList.remove("body_gradient");
  }



  // validation 
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
  
    validationSchema: chartOfAccountSchema,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  const handleDrpChange = (field, value) => {
    setFieldValue(field, value);
    setFieldTouched(field, false);
    console.log(touched)
  
    // console.log("value", value);
    // console.log("field", field);
  };


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
    <form onSubmit={handleSubmit} autoComplete="off">
      <div className="accountform_heading">
      </div>
      
      <div className="leadform">
        <div className="accountsform">
          <h1 className="accountbox_heading1">Create Chart of Account</h1>
          <div className="accountform_details">
            <div className="accountform-left">


              <div className="dropdownBtn">
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
              <SearchDropdown width={331} options={accounts}  
                  name="accounttype"
                  onChange={handleDrpChange}
                  value={values.accounttype}
                  error={errors.accounttype && touched.accounttype ? true : false}
                  errorMsg="Account Type is required"/>
      </div>


      <div className="form_field">
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
              <div
                  className={`${
                    errors.accountname && touched.accountname && "inputError"
                  } accountforminput`}
                   style={{ marginTop: "5px" }}>
                <img src={accountnameimg} className="customerimg" />
                <input
                  type="text"
                  className="inputaccount"
                  placeholder="Placeholder"
                  name="accountname"
                    value={values.accountname}
                    onChange={handleChange}
                    onBlur={handleBlur}
                />
                {errors.accountname && touched.accountname && (
                    <div className="error_icon">
                    <img
                      src="/images/icons/exclamation_icon.svg"
                      alt="error"
                    />
                  </div>
                  )}
              </div>
              {errors.accountname &&  touched.accountname &&(
                    <p className="error_text">{errors.accountname}</p>
                  )}
              </div>



          <div className="form_field">
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
              <div className={`${
                    errors.accountcode && touched.accountcode && "inputError"
                  } accountforminput`} style={{ marginTop: "5px" }}>
                <img src={accountcode} className="customerimg" />
                <input
                  type="text"
                  className="inputaccount"
                  placeholder="Placeholder"
                  name="accountcode"
                  value={values.accountcode}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.accountcode && touched.accountcode && (
                    <div className="error_icon">
                    <img
                      src="/images/icons/exclamation_icon.svg"
                      alt="error"
                    />
                  </div>
                  )}
              </div>
              {errors.accountcode &&  touched.accountcode &&(
                    <p className="error_text">{errors.accountcode}</p>
                  )}
              </div>

            <div className="dropdownBtn">
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
              <SearchDropdown width={331} options={accounts}
              name="moduletype"
              onChange={handleDrpChange}
              value={values.moduletype}
              error={errors.moduletype && touched.moduletype ? true : false}
              errorMsg="Module Type is required" />
              </div>

              <div className="dropdownBtn">
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
              <SearchDropdown width={331} options={accounts}
              name="itemtype"
              onChange={handleDrpChange}
              value={values.itemtype}
              error={errors.itemtype && touched.itemtype ? true : false}
              errorMsg="Item Type is required" />
              </div>

              <div className="dropdownBtn">
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
              <SearchDropdown width={331} options={accounts}
               name="reportingl1"
               onChange={handleDrpChange}
               value={values.reportingl1}
               error={errors.reportingl1 && touched.reportingl1 ? true : false}
               errorMsg="Reporting L1 required" />
              </div>
        
              <div className="dropdownBtn">
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
              <SearchDropdown width={331} options={accounts}
               name="reportingl2"
               onChange={handleDrpChange}
               value={values.reportingl2}
               error={errors.reportingl2 && touched.reportingl2 ? true : false}
               errorMsg="Reporting L2 is required" />
              </div>

              <div className="dropdownBtn">
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
              <SearchDropdown width={331} options={accounts}
              name="reportingl3"
              onChange={handleDrpChange}
              value={values.reportingl3}
              error={errors.reportingl3 && touched.reportingl3 ? true : false}
              errorMsg="Reporting L3 is required" />
              </div>
             
              <div className="accountformbutton_bottom">
                {/* <button type="button" className="accountformsavebutton">
                  Submit
                </button> */}
                <input type="submit" className="accountformsavebutton" />
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
      </form>
    </>
  );
}

export default AccountForm;
