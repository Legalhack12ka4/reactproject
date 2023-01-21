import React, { useState, useRef, useEffect } from "react";
import { Select } from "antd";
import "../SearchDropdown/SearchDropdown.scss";
import "./SelectAllDropdown.scss";
const { Option, SelectAll } = Select;

function SelectAllDropdown({ option }, props) {
  const [value, setValue] = useState([]);
  const [selectAll, setSelectAll] = useState(false);

  const selectContainerRef = useRef(null);

  const selectAllOptions = () => {
    setValue(option.map((item) => item.value));
    setSelectAll(true);
  };

  const clearSelection = () => {
    setValue([]);
    setSelectAll(false);
  };

  useEffect(() => {
    selectContainerRef.current.addEventListener("click", (e) => {
      e.stopPropagation();
      const select = selectContainerRef.current.querySelector("select");
      select.focus();
      select.click();
    });
  }, []);

  const countSelectedItems = (selectedItems, selectAll) => {
    if (selectAll) return <span>All</span>;
    return <span>{selectedItems.length > 0 && selectedItems.length}</span>;
  };

  const dropdownRender = (menu) => (
    <div>
      {menu}
      <div className="selectAll_Clear">
        <div
          style={{ cursor: "pointer", color: "#5C5AD0" }}
          onClick={selectAllOptions}
        >
          Select All
        </div>
        <div
          style={{ cursor: "pointer", color: "#C2CAD2" }}
          onClick={clearSelection}
        >
          Clear
        </div>
      </div>
    </div>
  );
  const handleChange = (selectedValue) => {
    setValue(selectedValue);
    setSelectAll(selectedValue.length === option.length);
  };

  return (
    <>
      <div
        className="srchdrp selectAllDrp select-container"
        ref={selectContainerRef}
      >
        <Select
          mode="multiple"
          showSearch={false}
          value={value}
          onChange={handleChange}
          className="dropdown-menu-width dont-show"
          getPopupContainer={(trigger) => trigger.parentElement}
          style={{ width: props.width, padding: 0, width: "100%" }}
          size={"large"}
          dropdownRender={dropdownRender}
          option={option}
        >
          {option.map((item, i) => (
            <Option value={item.value} key={i}>
              {item.label}
            </Option>
          ))}
        </Select>
        {
          <div className="selectedCount">
            {countSelectedItems(value, selectAll)}
          </div>
        }
      </div>
    </>
  );
}

export default SelectAllDropdown;
