import React, { useState, useRef } from 'react';
//import "../SearchDropdown/SearchDropdown.scss";
import { PlusOutlined } from '@ant-design/icons';
import { Divider, Input, Select, Space, Button } from 'antd';
import type { InputRef } from 'antd';


let index = 0;
function SearchDropdownAddButton(props) {

    const [items, setItems] = useState(['ITME 2022', 'IT Sol 2019','ITME 2018','Colortax']);
    const [name, setName] = useState('');
    const inputRef = useRef<import('antd').InputRef>(null);
  
    const onNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setName(event.target.value);
    };
  
    const addItem = (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
      e.preventDefault();
      setItems([...items, name || `New item ${index++}`]);
      setName('');
      setTimeout(() => {
        inputRef.current?.focus();
      }, 0);
    };
    const onChange = (value) => {
        console.log(`selected ${value}`);
      };
      const onSearch = (value) => {
        console.log('search:', value);
      };

  return (
    <div className='srchdrp'>

<Select
      style={{ width: 330, padding:0 }}
      placeholder="Select Value"
      optionFilterProp="children"
      onChange={onChange}
      onSearch={onSearch}
      filterOption={(input, option) =>
        (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
      }
      getPopupContainer={(trigger) => trigger.parentElement}
      size={'large'}
      suffixIcon={<svg xmlns="http://www.w3.org/2000/svg" width="11.504" height="6.289" viewBox="0 0 11.504 6.289">
      <path id="Path_125" data-name="Path 125" d="M11.43,14.84a1.21,1.21,0,0,0,1.62,0l4.4-4.19a1,1,0,1,0-1.42-1.41L12.36,12.7a.25.25,0,0,1-.33,0L7.9,9.11a1,1,0,0,0-1.32,1.51Z" transform="translate(-6.237 -8.862)" fill="#8e9caa"/>
    </svg>}
      dropdownRender={(menu) => (
        <>
          {menu}
          <Divider style={{ margin: '8px 0' }} />
          <Space style={{ padding: '0 8px 4px' }}>
            <Input
              placeholder="Please enter item"
            //   ref={inputRef}
              value={name}
              onChange={onNameChange}
             
              onSearch={onSearch}
            //   filterOption={(input, option) =>
            //     (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
            //   }
            />
            <Button type="text" icon={<PlusOutlined />} onClick={addItem}>
              Add item
            </Button>
          </Space>
        </>
      )}
      options={items.map((item) => ({ label: item, value: item }))}
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

export default SearchDropdownAddButton
