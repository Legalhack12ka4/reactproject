import React, { useState, useEffect,forwardRef, useRef } from "react";
import { Button, Divider, Input, Select, Space } from "antd";
import { useImperativeHandle } from "react";
import { PlusOutlined } from "@ant-design/icons";
import './Dropdowns.scss'
import CustomInput from "../CustomInput/CustomInput";

const { OptGroup, Option } = Select;

export const SearchSelect = forwardRef(({ onChange, options, name, value, error,errorMsg, editBtn, editBtnClick,multi, ...props },ref) =>  {

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
    suffixIcon =  <svg xmlns="http://www.w3.org/2000/svg" width="10" height="6.43" viewBox="0 0 10 6.43">
    <path id="Path_26" data-name="Path 26" d="M7.6,11.03l-5-5.106L3.9,4.6,7.6,8.382,11.3,4.6l1.3,1.324Z" transform="translate(-2.6 -4.6)" fill="#94a2b8"/>
  </svg>;
  }

  useEffect(() => {
    setSelectedOption(value);
  }, [value]);

  const handleReset = () => {
    setSelectedOption(null);
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

 console.log("openDD",open)
  return (
    <>
    <div className={`srchdrp srchSelct ${error && "drpError"} ${props.addNew && "bottom-padding-none"}`}>
    {props.lable && <p className="sc-body-md dropdown-lable">{props.lable}</p>}
    <Select
       
      disabled={props.isDisabled}
      showSearch
      placeholder={open ? "Type to search" : "Select Value"}
      mode={multi && "multiple"}
    //   allowClear={multi && true}
      optionFilterProp="children"
      value={selectedOption || undefined}
      //defaultValue={selectedOption}
      key={selectedOption}
    //   onBlur={() => setFocus(false)}
    //   onFocus={() => setFocus(true)}
      // filterOption={(input, option) =>
      //   (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
      // }
      filterOption={(input, option) => {
        const labelMatches = (option?.label ?? "").toLowerCase().includes(input.toLowerCase());
        const valueMatches = (option?.value ?? "").toLowerCase().includes(input.toLowerCase());
        const alphanumericRegex = /^[a-zA-Z0-9]*$/; // Only allows letters and numbers
        const inputIsValid = alphanumericRegex.test(input);
        return labelMatches || (valueMatches && inputIsValid);
      }}
      onKeyDown={(e) => {
        const alphanumericRegex = /^[a-zA-Z0-9]*$/;
        const keyIsAlphanumeric = alphanumericRegex.test(e.key);
        if (!keyIsAlphanumeric && e.key !== "Backspace" && e.key !== "Delete") {
          e.preventDefault();
        }
      }}
     onChange={handleChange}
     // onChange={(e) => {console.log(e); handleChange(e); handleInputChange(e, "selectedOption")}}
     // onSearch={(e) => handleInputChange(e, "selectedOption")}
      getPopupContainer={(trigger) => trigger.parentElement}
      style={{ width: props.width, padding: 0 }}
      size={"large"}
      removeIcon={<img src="/images/icons/cross-icon-primary.svg" alt="icon" />}
       suffixIcon={suffixIcon}
       onDropdownVisibleChange={(o) => setOpen(o)}
       dropdownRender={(menu) => (
        <>
          {menu}
            {props.addNew && <div className="add-new-btn" type="text" icon={<PlusOutlined style={{color:"#5C5AD0"}} />} >
              <img src="/images/icons/plus_fill_icon.svg" alt="icon" />
              <p className="sc-body-rg">Add New {props.addNew}</p>
            </div>}
        </>
      )}
    //   renderOption={(option) => (
    //     <>
    //       <div>{option.label}</div>
    //       <div>{option.description}</div>
    //     </>
    //   )}
      options={options}
    />
    {selectedOption && editBtn && <div className="editBtnContainer"><div className="editBtn" onClick={editBtnClick}><img src="/images/icons/edit_blue_icon.svg" alt="" /></div></div>}
    
  </div>
  {error && (
    <p className="error_text">{errorMsg}</p>
  )}
  </>
  )
})

// export const CategorySelect

export const CategorySelect = forwardRef(({ onChange, options, name, value, error,errorMsg, editBtn, editBtnClick,multi, ...props },ref) =>  {

    const [selectedOption, setSelectedOption] = useState(null);
  const [focus, setFocus]= useState(false)
  const [open, setOpen] = useState(false);
  const GroupOptions = Object.keys(options).map((key) => (
    <OptGroup label={key} key={key.id}>
      {options[key].map((child) => (
        <Option value={child} key={child.id}>
          {child}
        </Option>
      ))}
    </OptGroup>
  ));

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
    suffixIcon =  <svg xmlns="http://www.w3.org/2000/svg" width="10" height="6.43" viewBox="0 0 10 6.43">
    <path id="Path_26" data-name="Path 26" d="M7.6,11.03l-5-5.106L3.9,4.6,7.6,8.382,11.3,4.6l1.3,1.324Z" transform="translate(-2.6 -4.6)" fill="#94a2b8"/>
  </svg>;
  }

  useEffect(() => {
    setSelectedOption(value);
  }, [value]);

  const handleReset = () => {
    setSelectedOption(null);
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

 console.log("openDD",open)
  return (
    <>
    <div className={`srchdrp catSelect ${error && "drpError"}`}>
    {props.lable && <p className="sc-body-md dropdown-lable">{props.lable}</p>}
    <Select
      
      disabled={props.isDisabled}
      showSearch
      placeholder={open ? "Type to search" : "Select Value"}
      multi={multi}
      optionFilterProp="children"
      value={selectedOption || undefined}
      //defaultValue={selectedOption}
      key={selectedOption}
      onBlur={() => setFocus(false)}
      onFocus={() => setFocus(true)}
      // filterOption={(input, option) =>
      //   (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
      // }
      filterOption={(input, option) => {
        const labelMatches = (option?.label ?? "").toLowerCase().includes(input.toLowerCase());
        const valueMatches = (option?.value ?? "").toLowerCase().includes(input.toLowerCase());
        const alphanumericRegex = /^[a-zA-Z0-9]*$/; // Only allows letters and numbers
        const inputIsValid = alphanumericRegex.test(input);
        return labelMatches || (valueMatches && inputIsValid);
      }}
      onKeyDown={(e) => {
        const alphanumericRegex = /^[a-zA-Z0-9]*$/;
        const keyIsAlphanumeric = alphanumericRegex.test(e.key);
        if (!keyIsAlphanumeric && e.key !== "Backspace" && e.key !== "Delete") {
          e.preventDefault();
        }
      }}
     onChange={handleChange}
      getPopupContainer={(trigger) => trigger.parentElement}
      style={{ width: props.width, padding: 0 }}
      size={"large"}
    
       suffixIcon={suffixIcon}
       onDropdownVisibleChange={(o) => setOpen(o)}
    >{GroupOptions}
    </Select>
    {selectedOption && editBtn && <div className="editBtnContainer"><div className="editBtn" onClick={editBtnClick}><img src="/images/icons/edit_blue_icon.svg" alt="" /></div></div>}
    
  </div>
  {error && (
    <p className="error_text">{errorMsg}</p>
  )}
  </>
  )
})


export const  InputGroup = ( {onChange, options, name, value, error,errorMsg, editBtn, editBtnClick,multi, ...props} ) => {



    const [selectedOption, setSelectedOption] = useState(null);
  const [focus, setFocus]= useState(false)
  const [open, setOpen] = useState(false);

  const [searchValue, setSearchValue] = useState('');
  const filteredOptions = options.filter(({ value }) =>
    value.toLowerCase().includes(searchValue.toLowerCase())
  );
  let suffixIcon;
  if (open) {
    suffixIcon = 
  <svg xmlns="http://www.w3.org/2000/svg" width="10" height="6.43" viewBox="0 0 10 6.43">
  <g id="small-down" transform="translate(10 6.43) rotate(180)">
    <path id="Path_26" data-name="Path 26" d="M7.6,11.03l-5-5.106L3.9,4.6,7.6,8.382,11.3,4.6l1.3,1.324Z" transform="translate(-2.6 -4.6)" fill="#94a2b8"/>
  </g>
</svg>

  
  ;
  } else {
    suffixIcon =  <svg xmlns="http://www.w3.org/2000/svg" width="10" height="6.43" viewBox="0 0 10 6.43">
    <path id="Path_26" data-name="Path 26" d="M7.6,11.03l-5-5.106L3.9,4.6,7.6,8.382,11.3,4.6l1.3,1.324Z" transform="translate(-2.6 -4.6)" fill="#94a2b8"/>
  </svg>;
  }

  useEffect(() => {
    setSelectedOption(value);
  }, [value]);

  const handleReset = () => {
    setSelectedOption(null);
  };

  const handleChange = (value) => {
    const selectedOption = options.find(option => option.value === value);
    setSelectedOption(value);
    onChange(name, value);
    console.log(name)
    console.log(value)
    console.log(selectedOption.code); // This will log the country code of the selected option
  };

    return (
        <div className="input-group srchdrp focus-outline">
         <div>  <Select
       
       disabled={props.isDisabled}
       optionFilterProp="children"
       value={selectedOption || "India"}
       key={selectedOption}
       filterOption={(input, option) => {
         const labelMatches = (option?.label ?? "").toLowerCase().includes(input.toLowerCase());
         const valueMatches = (option?.value ?? "").toLowerCase().includes(input.toLowerCase());
         const alphanumericRegex = /^[a-zA-Z0-9]*$/; // Only allows letters and numbers
         const inputIsValid = alphanumericRegex.test(input);
         return labelMatches || (valueMatches && inputIsValid);
       }}
      onChange={handleChange}
       getPopupContainer={(trigger) => trigger.parentElement}
       style={{ width: props.width, padding: 0 }}
       size={"large"}
       removeIcon={<img src="/images/icons/cross-icon-primary.svg" alt="icon" />}
        suffixIcon={suffixIcon}
        onDropdownVisibleChange={(o) => setOpen(o)}
        // optionLabelProp="value"
        dropdownRender={(menu) => (
         <>
           {props.addNew && <div className="search-input-box" type="text" icon={<PlusOutlined style={{color:"#5C5AD0"}} />} >
           <Input
        placeholder="Search Country"
        // allowClear
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        style={{ marginBottom: 8 }}
      />
             </div>}
           {menu}
         </>
       )}


     >{filteredOptions.map(({ value, label }) => (
        <Option  key={value} value={value}>
        {label}
        </Option>
      ))}</Select>
    </div><CustomInput className="mobile_input" placeholder="Enter Number" width={232}/>
        </div>
    )
}