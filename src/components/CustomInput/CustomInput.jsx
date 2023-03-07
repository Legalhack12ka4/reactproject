import { useEffect } from "react";
import { useState } from "react";

const CustomInput = ({ value, onChange, inputType,maxLength, placeholder, onBlur , name, className, type, style, onFocus, id, resizable}) => {
  const [inputValue, setInputValue] = useState(value);

  useEffect(() => {
    let newValue=value
    setInputValue(newValue)

  }, [value]);

  const handleNameChange = e => {
    
    let newName = e.target.value;

    //First Name Upper 
     // e.g  Vimlesh
    if (inputType === "CamelAlphabetical") {
      newName = newName.charAt(0).toUpperCase() + newName.slice(1);
      newName = newName.replace(/[^a-zA-Z\s]/g, "");
    } 

    //Numeric
    //e.g 123
    if (inputType === "Numeric")
    {
      newName = newName.replace(/[^\d]/g, "");
    }
    

     //Alpha NUmeric
     //e.g  Vimlesh 123
    if (inputType === "AlphaNumericUpperCase")
    {
      newName = newName.charAt(0).toUpperCase() + newName.slice(1);
      newName = newName.replace(/[^a-zA-Z\d\s]/g, "");
    }

    //Numeric percentage
    //e.g 123%
    if (inputType === "NumericPercentage")
    {
      newName = newName.replace(/[^0-9%]/g, "");
    if (newName.indexOf('%') !== -1) {
      var firstNumber = newName.match(/^\d+/)[0];
      var percentSymbol = newName.match(/%/)[0];
      newName = firstNumber + percentSymbol;
    }
  }

    // ONLY ALPHABET UPPERCASE
    //e.g VIMLESH
    if (inputType === "Alphabetical")
    {
       newName = newName.toUpperCase().replace(/[^A-Z\s]/g, "");
    }
   // ONLY FOR SYMBOL
   //e.g $
    if (inputType === "Symbol")
    {
      newName = newName.replace(/[^@#$%&*₹]/g, "");
    }
    //For Email
    //e.g vimlesh@gmail.com
    if (inputType === 'email') {
      newName = newName.replace(/[^a-zA-Z@\d\s.]/g, "");
    }
  

 //setInputValue(newName);
    onChange(e, newName);
  };



  return (
    <input
    resizable={resizable}
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
