import { useEffect } from "react";
import { useState } from "react";

const CustomInput = ({ value, onChange, inputType,maxLength, placeholder, onBlur , name, className, type, style, onFocus, id}) => {
  const [inputValue, setInputValue] = useState(value);

  useEffect(() => {
    let newValue=value
    setInputValue(newValue)

  }, [value]);

  const handleNameChange = e => {
    
    let newName = e.target.value;

    //First Name Upper 

    if (inputType === "CamelAlphabetical") {
      newName = newName.charAt(0).toUpperCase() + newName.slice(1);
      newName = newName.replace(/[^a-zA-Z\s]/g, "");
    } 
    //Alpha NUmeric
  
    if (inputType === "  AlphaNumeric")
    {
       newName = newName.replace( /[^a-zA-Z@\d\s.]/g, "");
    }

    // // ONLY ALPHABET UPPERCASE
    if (inputType === "Alphabetical")
    {
       newName = newName.toUpperCase().replace(/[^A-Z\s]/g, "");
    }
   // ONLY FOR SYMBOL
    if (inputType === "Symbol")
    {
      newName = newName.replace(/[^@#$%&*₹]/g, "");
    }
    //For Email
    if (inputType === 'email') {
      newName = newName.replace(/[^a-zA-Z@\d\s._-]/g, "");
    }
  

 //setInputValue(newName);
    onChange(e, newName);
  };



  return (
    <input
    id={id}
    style={style}
    maxLength={maxLength}
    name={name}
    onBlur={onBlur}
    onFocus={onFocus}
    placeholder={placeholder}
    className={className}
    type={type}
    value={inputValue}
    onChange={handleNameChange}
    />
  );
};

export default CustomInput;
