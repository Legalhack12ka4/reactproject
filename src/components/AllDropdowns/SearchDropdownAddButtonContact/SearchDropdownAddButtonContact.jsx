import React, { useState, useRef } from 'react';
//import "../SearchDropdown/SearchDropdown.scss";
import { PlusOutlined } from '@ant-design/icons';
import { Divider, Input, Select, Space, Button } from 'antd';
import type { InputRef } from 'antd';
import axios from 'axios';
import config from '../../Database/config';
import { toast } from 'react-toastify';
import { useEffect } from 'react';
import { get } from 'jquery';
import "./SearchDropdownAddButtonContact.scss";


const resetValue = {
  position_name: "",
};
let index = 0;
function SearchDropdownAddButtonContact({ onChange,name, options, value, error,errorMsg, ...props }) {

    const [items, setItems] = useState(['ITME 2022', 'IT Sol 2019','ITME 2018','Colortax']);
    //const [name, setName] = useState('');
    const [formData, setFormData] = useState(resetValue);
    const [addSouce, setAddSource] = useState([]);
    const inputRef = useRef<import('antd').InputRef>(null);
    const [selectedOption, setSelectedOption] = useState(null);
  

    useEffect(() => {
      setSelectedOption(value);
    }, [value]);

    const handleChange = (value) => {
      setSelectedOption(value);
      onChange(name, value);
    };

    // const onNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    //   setName(event.target.value);
    // };
  
    // const addItem = (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
    //   e.preventDefault();
    //   setItems([...items, name || `New item ${index++}`]);
    //   setName('');
    //   setTimeout(() => {
    //     inputRef.current?.focus();
    //   }, 0);
    // };
    // const onChange = (value) => {
    //     console.log(`selected ${value}`);
    //   };
    //   const onSearch = (value) => {
    //     console.log('search:', value);
    //   };

//get data

const othersource =addSouce.map((place)=>({
  label: place.position_name,
  value: place.position_name,
}))

useEffect (()=>
{
  getSource();
}, [])

const getSource = () => {
  return fetch(`${config.baseUrl}/position/`)
    .then((response) => response.json())
    .then((data) => {
      setAddSource(data);
      console.log(data);
    });
};

console.log(addSouce)


//add

const handleFormSubmit = () => {

  axios
    .post(
      `${config.baseUrl}/position/`,
      {
        position_name: formData.position_name,
        "is_active": true,
        "is_deleted": false,
        "company_id": 1,
        "created_by": 1,
        "updated_by": 1
      },
      formData
    )

    .then((response) => {
      getSource();
   setFormData(resetValue)
     // props.onClick();
   //   handleclose();

       toast.success("Added Successfuly", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
      });
    
    //  document.getElementById("inputsource").value=""
    });
   // document.getElementById("inputsource").value=""
}

// const handleDrpChange = (field, value) => {
//   setFormData({ ...formData, [field]: value });
// // setFieldValue(field, value);
// // setFieldTouched(field, false);
//  console.log(field)
//  console.log(value)
// };

const onChangeValue = (e) => {
  const { value, name } = e.target;
  
  setFormData({ ...formData, [name]: value });

  console.log(value);
  console.log(name);
  };
  console.log(formData)

  return (
    <div className='srchdrp'>

<Select
      style={{ width: 330, padding:0 }}
      showSearch
      placeholder="Select Value"
      optionFilterProp="children"
      // name="name"
      // value={formData.name}
      onChange={handleChange}
     // onSearch={onSearch}
      value={selectedOption || undefined}
      key={selectedOption}
      //options={othersource}
      filterOption={(input, option) =>
        (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
      }
      getPopupContainer={(trigger) => trigger.parentElement}
      style={{ width: props.width, padding: 0 }}
      size={"large"}
      suffixIcon={<svg xmlns="http://www.w3.org/2000/svg" width="11.504" height="6.289" viewBox="0 0 11.504 6.289">
   
      <path id="Path_125" data-name="Path 125" d="M11.43,14.84a1.21,1.21,0,0,0,1.62,0l4.4-4.19a1,1,0,1,0-1.42-1.41L12.36,12.7a.25.25,0,0,1-.33,0L7.9,9.11a1,1,0,0,0-1.32,1.51Z" transform="translate(-6.237 -8.862)" fill="#8e9caa"/>
    </svg>}
      dropdownRender={(menu) => (
        <>
          {menu}
          <Divider style={{ margin: '8px 0' }} />
          <Space style={{ padding: '0 8px 4px' }}>
            <Input
            style={{color:"#566A7F", fontSize:"14px", fontWeight:"500"}}
          id="inputsource"
           //   placeholder="Please enter item"
            //   ref={inputRef}
            //  value={name}
              //onChange={onNameChange}
              onChange={onChangeValue}
              name="position_name"
              value={formData.position_name}
           //   onSearch={onSearch}
              className="inputchnage"
            //   filterOption={(input, option) =>
            //     (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
            //   }
            />
         {/* //   onClick={addItem}  */}
            <Button type="text" icon={<PlusOutlined />} onClick={() => {handleFormSubmit()}}>
              Add Position
            </Button>
          </Space>
        </>
      )}
      options={othersource}
    />

  {/* <Select
   showSearch
   placeholder="Select Value"
   optionFilterProp="children"
   onChange={onChange}
   onSearch={onSearch}
   filterOption={(input, option) =>
     (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
   }
    getPopupContainer={(trigger) => trigger.parentElement}
    style={{width:props.width,  padding: 0}}    
    size={'large'}
    suffixIcon={<svg xmlns="http://www.w3.org/2000/svg" width="11.504" height="6.289" viewBox="0 0 11.504 6.289">
    <path id="Path_125" data-name="Path 125" d="M11.43,14.84a1.21,1.21,0,0,0,1.62,0l4.4-4.19a1,1,0,1,0-1.42-1.41L12.36,12.7a.25.25,0,0,1-.33,0L7.9,9.11a1,1,0,0,0-1.32,1.51Z" transform="translate(-6.237 -8.862)" fill="#8e9caa"/>
  </svg>}
    

    options={props.options}
  /> */}


  
    </div>
  )
}

export default SearchDropdownAddButtonContact
