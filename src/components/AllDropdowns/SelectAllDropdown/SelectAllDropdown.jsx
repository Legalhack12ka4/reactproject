import React, {useState, useRef} from 'react'
import { Select } from 'antd';

const SelectAllDropdown = ({option},props) => {
    const [value, setValue] = useState([]);

    const selectRef = useRef(null);


    function handleChange(newValue) {
      if (newValue.includes('all')) {
        setValue(['all']);
        selectRef.current.blur();
      } else {
        setValue(newValue);
      }
    }

  
  return (
    <div className={`srchdrp`}>
      <Select
      disabled={props.isDisabled}
      showSearch
      ref={selectRef}
        mode="multiple"
        style={{ width: '100%' }}
        placeholder="Please select"
        optionFilterProp="children"
        className="dropdown-menu-width"
        // key={selectedOption}
        getPopupContainer={(trigger) => trigger.parentElement}
        value={value}
        onChange={handleChange}
        options={option}
      />
    </div>

  
      
      
      
      
      
     
      

      
      // style={{ width: props.width, padding: 0 }}
      // size={"large"}
      // options={options}

  );
}

export default SelectAllDropdown
