import React, { useState, useEffect,forwardRef, useRef } from "react";
import { Select } from "antd";
import "./SearchDropdown.scss";
import { useImperativeHandle } from "react";
// import { ref } from "yup";

const SearchDropdown =  forwardRef(({ onChange, options, name, value, error,errorMsg, editBtn, editBtnClick, ...props },ref) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [focus, setFocus]= useState(false)
  const [open, setOpen] = useState(false);
  let suffixIcon;
  if (open) {
    suffixIcon = <svg xmlns="http://www.w3.org/2000/svg" 
    width="12.5" 
    height="12.5"
     viewBox="0 0 16 16.001">
    <path id="Path_23" data-name="Path 23" 
    d="M8.342,15.185a6.8,6.8,0,0,0,4.187-1.443L16.291,17.5,17.5,16.291l-3.76-3.76a6.834,6.834,0,1,0-5.4,2.653Zm0-11.974A5.132,5.132,0,1,1,3.211,8.342,5.137,5.137,0,0,1,8.342,3.211Z" transform="translate(-1.5 -1.5)" fill="#8e9caa"/>
    </svg>;
  } else {
    suffixIcon =  <svg
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
  </svg>;
  }

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
        onBlur={() => setFocus(false)}
        onFocus={() => setFocus(true)}
        filterOption={(input, option) =>
          (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
        }
        onChange={handleChange}
        getPopupContainer={(trigger) => trigger.parentElement}
        style={{ width: props.width, padding: 0 }}
        size={"large"}
      
         suffixIcon={suffixIcon}
         onDropdownVisibleChange={(o) => setOpen(o)}
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
