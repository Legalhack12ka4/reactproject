import { useEffect } from "react";
import { useState } from "react";
import "./CustomInput.scss";

const CustomInput = ({
  value,
  onChange,
  inputType,
  maxLength,
  placeholder,
  onBlur,
  name,
  className,
  type,
  width,
  onFocus,
  id,
  resizable,
  label,
  icon,
  error,
  onKeyPress,
  errorMsg,
  disabled,
  textArea,
  symbol,
  textAlign,
  rightIcon,
  onClick,
}) => {
  const [inputValue, setInputValue] = useState(value);
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    let newValue = value;
    setInputValue(newValue);
  }, [value]);

  const handleNameChange = (e) => {
    let newName = e.target.value;

    //First Name Upper
    // e.g  Vimlesh
    if (inputType === "CamelAlphabetical") {
      newName = newName.charAt(0).toUpperCase() + newName.slice(1);
      newName = newName.replace(/[^a-zA-Z\s]/g, "");
    }

    //Numeric
    //e.g 123
    if (inputType === "Numeric") {
      newName = newName.replace(/[^\d]/g, "");
    }

    //Alpha NUmeric
    //e.g  Vimlesh 123
    if (inputType === "AlphaNumericUpperCase") {
      newName = newName.charAt(0).toUpperCase() + newName.slice(1);
      newName = newName.replace(/[^a-zA-Z\d\s]/g, "");
    }

    //Numeric percentage
    //e.g 123%
    if (inputType === "NumericPercentage") {
      newName = newName.replace(/[^0-9%]/g, "");
      if (newName.indexOf("%") !== -1) {
        var firstNumber = newName.match(/^\d+/)[0];
        var percentSymbol = newName.match(/%/)[0];
        newName = firstNumber + percentSymbol;
      }
    }

    // ONLY ALPHABET UPPERCASE
    //e.g VIMLESH
    if (inputType === "Alphabetical") {
      newName = newName.toUpperCase().replace(/[^A-Z\s]/g, "");
    }

     // ONLY ALPHABET UPPERCASE and number
    //e.g VIMLESH123
    if (inputType === "AlphabeticalNumber") {
      newName = newName.toUpperCase().replace(/[^A-Z\d\s]/g, "");
    }
    // ONLY FOR SYMBOL
    //e.g $
    if (inputType === "Symbol") {
      newName = newName.replace(/[^@#$%&*₹]/g, "");
    }
    //For Email
    //e.g vimlesh@gmail.com
    
    if (inputType === "email") {
      newName = newName.replace(/[^a-zA-Z@\d\s.]/g, "");
    }

    setInputValue(newName);
    onChange(e, newName);
  };
  



  return (
    <div className="custom-input-container ">
      {label && <label htmlFor={id} className="input-label sc-body-md">
        {label}
      </label>}
      <div className="input-box">
        {icon && <img className="input-icon" src={icon} alt="icon" />}
        {rightIcon && <img className="input-rightIcon" src={rightIcon} alt="icon" onClick={onClick} />}
        {symbol && <p className="input-symbol sc-body-rg">{symbol}</p>}
      {textArea ? <textarea 
        resizable={false}
        id={`${id} focus-input`}
        style={{width:icon ? width-56:width-30, padding: icon ? "0px 14px 0px 40px":"0px 14px",maxWidth: icon ? width-56:width-30, padding: icon ? "0px 14px 0px 40px":"0px 14px"}}
        maxLength={maxLength}
        name={name}
        onBlur={(e) => {onBlur(e); setIsFocused(false)}}
        onFocus={(e) => {onFocus(e); setIsFocused(true)}}
        placeholder={placeholder}
        className={`focus-outline ${className} ${error && !isFocused &&  "inputError"} text-area ${disabled && "input-disabled"} `}
        type={type}
        value={inputValue}
        onChange={handleNameChange}
        disabled={disabled}
      />:<input
        resizable={resizable}
        id={`${id} focus-input`}
        style={{width:icon || symbol ||rightIcon ? width-56:width-30, maxWidth: icon || symbol ? width-56:width-30, padding: icon || symbol ? "0px 14px 0px 40px" : rightIcon ? "0px 40px 0px 14px" : "0px 14px", textAlign: textAlign}}
        maxLength={maxLength}
        name={name}
        onBlur={(e) => {onBlur(e); setIsFocused(false)}}
        onFocus={(e) => {onFocus(e); setIsFocused(true)}}
        placeholder={placeholder}
        className={`focus-outline ${className} ${error && !isFocused &&  "inputError"} ${disabled && "input-disabled"} `}
        type={type}
        value={inputValue}
        onChange={handleNameChange}
        disabled={disabled}
        onKeyPress={onKeyPress}
      />}
      </div>
      {error && (
    <p className="error_text">{errorMsg}</p>
  )}
    </div>
  );
};

export default CustomInput;
