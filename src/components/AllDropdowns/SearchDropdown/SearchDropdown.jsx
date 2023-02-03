import React, { useState, useEffect,forwardRef, useRef } from "react";
import { Select } from "antd";
import "./SearchDropdown.scss";
import { useImperativeHandle } from "react";
// import { ref } from "yup";

const SearchDropdown =  forwardRef(({ onChange, options, name, value, error,errorMsg, editBtn, editBtnClick, ...props },ref) => {
  const [selectedOption, setSelectedOption] = useState(null);


  useEffect(() => {
    setSelectedOption(value);
  }, [value]);

  const handleReset = () => {
    setSelectedOption(null);
 
   // onChange(name, value);
    //console.log(name)
    //alert("hello search")
   // console.log(value)
  };

  const handleChange = (value) => {
    setSelectedOption(value);
    onChange(name, value);
    console.log(name)
    console.log(value)
  };

 useImperativeHandle (ref, () => ({
  getAlert () {
    console.log("hoja bhai")
    props.popVisible();
    handleReset();
  }
 }))

  return (
    <>
      <div className={`srchdrp ${error && "drpError"}`}>
      <Select
        
        disabled={props.isDisabled}
        showSearch
        placeholder="Select Value"
        optionFilterProp="children"
        value={selectedOption || undefined}
        //defaultValue={selectedOption}
        key={selectedOption}
        filterOption={(input, option) =>
          (option?.value ?? "").toLowerCase().includes(input.toLowerCase())
        }
        onChange={handleChange}
        getPopupContainer={(trigger) => trigger.parentElement}
        style={{ width: props.width, padding: 0 }}
        size={"large"}
        suffixIcon={
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="11.504"
            height="6.289"
            viewBox="0 0 11.504 6.289"
          >
            <path
              id="Path_125"
              data-name="Path 125"
              d="M11.43,14.84a1.21,1.21,0,0,0,1.62,0l4.4-4.19a1,1,0,1,0-1.42-1.41L12.36,12.7a.25.25,0,0,1-.33,0L7.9,9.11a1,1,0,0,0-1.32,1.51Z"
              transform="translate(-6.237 -8.862)"
              fill="#8e9caa"
            />
          </svg>
        }
        options={options}
      />
      {selectedOption && editBtn && <div className="editBtnContainer"><div className="editBtn" onClick={editBtnClick}><img src="/images/icons/edit_blue_icon.svg" alt="" /></div></div>}
      
    </div>
    {error && (
      <p className="error_text">{errorMsg}</p>
    )}
    </>
  );
})

export default SearchDropdown;
