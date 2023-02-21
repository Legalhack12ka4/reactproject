import React from "react";
import { useState, useEffect, useRef } from "react";
import { Input, Checkbox, Tooltip, Modal, Popover } from "antd";
import { Link, useLocation } from "react-router-dom";
import ReactToPrint from "react-to-print";
import { CSVLink } from "react-csv";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import filter from "../../assets/Images/FilterIcon/filter.svg";
import filterblue from "../../assets/Images/FilterIcon/filterblue.svg";
import "./FilterAndSearchBar.scss";
import Select from "react-select";
import { CgSearch } from "react-icons/cg";
import { BiExport } from "react-icons/bi";
import { BiFilter } from "react-icons/bi";
import { GoPlus } from "react-icons/go";
import { event } from "jquery";
import SearchDropdown from "../AllDropdowns/SearchDropdown/SearchDropdown";
import { getContainer } from "rsuite/esm/DOMHelper";
import DateRangePicker from "../DateRangePicker/DateRangePicker";

const FilterAndSearchBar = (props, { filterdata, width }) => {
  const [exportOpen, setExportOpen] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);
  const [settingOpen, setSettingOpen] = useState(false);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const menuRef = useRef(null);
  const fliterRef = useRef(null);
  const [columns, setColumns] = useState(
    props.columns.slice(0, props.columns.length - 1)
  );
  const [visible, setVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [firstColumn, setFirstColumn] = useState(columns[0].title);

  // const [activeOption, setActiveOption] = useState('Item Groups');
  const location = useLocation();
  const [activeOption, setActiveOption] = useState('');
  const visibleRoutes = ['/itemgrouptable','/itemgrouptable1','/itemgrouptable2','/itemgrouptable3','/itemgrouptable4',
                        '/itemgrouptable5', '/itemtable', '/itemtable1', '/itemtable2', '/itemtable3', '/itemtable4', '/itemtable5'];

 
  //usefefect for switch

  useEffect(() => {
 
    const path = location.pathname;
    setActiveOption(path === '/itemgrouptable' ? 'Item Groups' : 
    path === '/itemgrouptable1' ? 'Item Groups' : 
    path === '/itemgrouptable2' ? 'Item Groups' : 
    path === '/itemgrouptable3' ? 'Item Groups' : 
    path === '/itemgrouptable4' ? 'Item Groups' : 
    path === '/itemgrouptable5' ? 'Item Groups' : 'Item',
    );
  }, [location]);

  const handleVisibleChange = (newVisible) => {
    setVisible(newVisible);
  };

  const handleContentClick = () => {
    setVisible(false);
  };

  // const csvLink = {
  //   filename: "customer_data.csv",
  //   headers: columns,
  //   data: dataSource,
  // };

  // const downloadPdf = () => {
  //   const doc = new jsPDF();
  //   doc.text("Customer Data", 20, 10);
  //   doc.autoTable({
  //     columns: columns.map((col) => ({ ...col, dataKey: col.key })),
  //     body: dataSource,
  //   });
  //   doc.save("customer_data.pdf");
  // };

  const openExport = () => {
    setExportOpen(!exportOpen);
  };
  const openFilter = () => {
    //  alert("clcik")
    setFilterOpen(!filterOpen);
  };
  const openSetting = () => {
    setSettingOpen(!settingOpen);
  };
  console.log(settingOpen);
  useEffect(() => {
    let handleClickOutside = (event) => {
      if (!menuRef.current.contains(event.target)) {
        // Close the dropdown list
        setSettingOpen(false);
        setExportOpen(false);
        setFilterOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  });

  const handleDragEnd = (e) => {
    if (e.destination.index === 0) {
      return;
    } else {
      let tempData = Array.from(columns);
      let [source_data] = tempData.splice(e.source.index, 1);
      tempData.splice(e.destination.index, 0, source_data);
      setColumns(tempData);
      props.setColumns(tempData);
    }
    console.log(e.destination.index);
  };

  const componentRef = useRef();

  function showCanvas() {
    var m = document.querySelector(".menu1");
    m.classList.add("smenu");
    //document.root.style.backgroundColor='rgba(0,0,0,0.4)';
    document.getElementById("gradient").classList.add("body_gradient");
  }

  //Search
  const [search, setSearch] = useState("");

  const handleChange = (event) => {
    setSearch(event.target.value);
  };
  props.onData(search);

  //Modal Filter

  const showFilterModal = () => {
    setIsFilterModalOpen(true);
  };

  const handleFilterOk = () => {
    setIsFilterModalOpen(false);
  };

  const handleFilterCancel = () => {
    setIsFilterModalOpen(false);
  };

  const selectedCheckboxes = columns.filter((column) => column.selected);

  console.log(
    columns.filter((column) =>
      column.title.toLowerCase().includes(searchQuery.trim().toLowerCase())
    )
  );
  console.log(searchQuery);

  // useEffect(() => {
  //   handleChange();
  // },[search])
  return (
    <>
      <Modal
        open={isFilterModalOpen}
        getContainer={() => fliterRef.current}
        width={"max-content"}
        onOk={handleFilterOk}
        onCancel={handleFilterCancel}
        footer={""}
        closable={false}
        style={{
          top: 230,
          left: 287,
          position: "absolute",
          maxWidth: "2200px",
        }}
      >
        <div
          className="filter_dropdown_btn"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div style={{ fontSize: "18px" }}>Filters</div>
          {props.change == "" ? (
            <span className="closeModal" onClick={handleFilterOk}>
              &times;
            </span>
          ) : (
            <div
              style={{ color: "#5C5AD0", fontWeight: "500", fontSize: "14px" }}
              onClick={(e) => {
                props.onFilter();
                handleFilterCancel(e);
              }}
            >
              Clear Filter
            </div>
          )}
          {console.log(props.change)}
        </div>

        <hr
          style={{
            marginTop: "18px",
            marginBottom: "18px",
            backgroundColor: "#C2CAD2",
            border: "0.5px solid #C2CAD2",
          }}
        />

        {props.filterdata}
      </Modal>
      <div className="table_nav">
        <div className="tableBtn_container">
          <div className="new_btn_or_reports_main">
            <div className="view_reports_container">
              <img src="images/icons/report_icon.svg" alt="" />
              <p>View Reports</p>
            </div>
            <div className="new_btn_container">
              <Link exact to={props.path} onClick={props.onClick}>
                <div className="tableBtn addNewBtn" onClick={showCanvas}>
                  <GoPlus />
                  <div style={{ color: "white" }}>
                    {" "}
                    <div className="addNewBtn_text">New {props.addBtnName}</div>
                  </div>
                </div>
              </Link>
            </div>
          </div>

          <div style={{ display: "flex" }}>
            {/* <div className="total_table_result">{props.results_length}</div> */}
            {props.customer == "" ? (
              <div className="search_customer">
                <div className="search_icon">
                  <CgSearch size={20} color="#697A8D" />
                </div>
                <input
                  disabled

                  //type="text"
                  // placeholder="Search Customer"
                  //  onChange={handleChange}
                />
              </div>
            ) : (
              <div className="search_customer">
                <div className="search_icon">
                  <CgSearch size={20} color="#697A8D" />
                </div>
                <input
                  type="text"
                  placeholder="Search for Contacts"
                  onChange={handleChange}
                />
              </div>
            )}
          </div>
          {/* <div className="switch-button">
  <Link to="/itemgrouptable" onClick={() => setActiveOption('Item Groups')}>
    <div className={`option ${activeOption === 'Item Groups' ? 'active' : ''}`}>
      Item Groups
    </div>
  </Link>
  <Link to="/itemtable" onClick={() => setActiveOption('Item')}>
    <div className={`option ${activeOption === 'Item' ? 'active' : ''}`}>
      Item
    </div>
  </Link>
</div> */}

{!visibleRoutes.includes(location.pathname)  ? "" :<div className="switch-button">
      <Link to="/itemgrouptable" onClick={() => setActiveOption('Item Groups')}>
        <div className={`option ${activeOption === 'Item Groups' ? 'active' : ''}`}>
          Item Groups
        </div>
      </Link>
      <Link to="/itemtable" onClick={() => setActiveOption('Item')}>
        <div className={`option ${activeOption === 'Item' ? 'active' : ''}`}>
          Item
        </div>
      </Link>
     
      
    </div>}
    {/* {!visibleRoutes.includes(location.pathname) ? "" :<div className="switch-button">
      <Link to="/itemgrouptable1" onClick={() => setActiveOption('Item Groups')}>
        <div className={`option ${activeOption === 'Item Groups' ? 'active' : ''}`}>
          Item Groups
        </div>
      </Link>
      <Link to="/itemtable1" onClick={() => setActiveOption('Item')}>
        <div className={`option ${activeOption === 'Item' ? 'active' : ''}`}>
          Item
        </div>
      </Link>
    </div>} */}

          {/* <div className="switch-button">
      <Link to="/itemgrouptable">
      <div
        className={`option ${activeOption === 'Item Groups' ? 'active' : ''}`}
        onClick={() => setActiveOption('Item Groups')}
      >
        Item Groups
      </div>
      </Link>
      <Link to="/itemtable">
      <div
        className={`option ${activeOption === 'Item' ? 'active' : ''}`}
        onClick={() => setActiveOption('Item')}
      >
        Item
      </div>
      </Link>
    </div> */}

          <div style={{ display: "flex", gap: "10px" }}>
            <DateRangePicker />

            {props.customer == "" ? (
              <div
                className={`${props.filterLength > 0 && "filter"} tableBtn `}
                style={{
                  width: "101.5px",
                  position: "relative",
                  cursor: "default",
                }}
                ref={fliterRef}
              >
                <div className="btn_icon">
                  {props.filterLength > 0 ? (
                    <img
                      src={filterblue}
                      id="filtericon"
                      height="12px"
                      width="12px"
                    />
                  ) : (
                    <img
                      src={filter}
                      id="filtericon"
                      height="12px"
                      width="12px"
                    />
                  )}
                </div>
                <div className={`${props.filterLength > 0 && "filterl"}  `}>
                  Filter
                </div>
                {props.filterLength > 0 && (
                  <div className="filterlength">{props.filterLength}</div>
                )}
              </div>
            ) : (
              <div
                className={`${props.filterLength > 0 && "filter"} tableBtn `}
                onClick={showFilterModal}
                style={{ width: "101.5px", position: "relative" }}
                ref={fliterRef}
              >
                <div className="btn_icon">
                  {props.filterLength > 0 ? (
                    <img
                      src={filterblue}
                      id="filtericon"
                      height="12px"
                      width="12px"
                    />
                  ) : (
                    <img
                      src={filter}
                      id="filtericon"
                      height="12px"
                      width="12px"
                    />
                  )}
                </div>
                <div className={`${props.filterLength > 0 && "filterl"}  `}>
                  Filter
                </div>
                {props.filterLength > 0 && (
                  <div className="filterlength">{props.filterLength}</div>
                )}
              </div>
            )}
            {/* <div className="searchbar_typehead">
                <Select
                  styles={customStyle}
                  placeholder="Search Customer"
                  noOptionsMessage={( {inputValue} ) =>
                    !inputValue ? "Search Customer" : "No Customer Found"
                  }
                  menuIsOpen={({inputValue})=>
                  !inputValue ? false : true}
                />
              </div> */}

            {/* <div className="searchbar_typehead">
          <Select styles={customStyle}/>
          </div> */}

            <Popover
              open={visible}
              onOpenChange={handleVisibleChange}
              content={
                <div className="setting_container">
                  <div
                    className="setting_btn"
                    style={{ paddingBottom: "20px" }}
                    onClick={() => {
                      openSetting();
                      handleContentClick();
                    }}
                  >
                    <img src="images/icons/columns_icon.svg" alt="" />
                    <p>Columns</p>
                  </div>

                  <div
                    className="setting_btn"
                    style={{ paddingBottom: "20px" }}
                  >
                    <img src="images/icons/import_data_icon.svg" alt="" />
                    <p>Import Data</p>
                  </div>
                  <div
                    className="setting_btn"
                    style={{ paddingBottom: "20px" }}
                  >
                    <img src="images/icons/export_data_icon.svg" alt="" />
                    <p>Export Data</p>
                  </div>
                  <div className="setting_btn">
                    <img src="images/icons/Preferences_icon.svg" alt="" />
                    <p>Preferences</p>
                  </div>
                </div>
              }
              trigger="click"
              placement="bottomRight"
              showArrow={false}
              getPopupContainer={(trigger) => trigger.parentElement}
            >
              <div className="settings">
                <img
                  className="setting_icon"
                  src="/images/icons/setting.svg"
                  alt="icon"
                />
              </div>
            </Popover>
            <div>
              <div
                className="gradient-overlay"
                style={{
                  display: settingOpen ? "block" : "none",
                }}
              />
              
              <div className="settings" ref={menuRef}>
              {/* <img
                  className="setting_icon"
                  src="/images/icons/setting.svg"
                  alt="icon"
                /> */}

              <DragDropContext onDragEnd={handleDragEnd}>
                <div
                  className={`table_setting_dropdown ${
                    settingOpen ? "active" : "inactive"
                  }`}
                >
                  <h5>Manage Columns</h5>
                  <p className="manage_column_title">
                    Select the columns you'd like to see in table.
                  </p>
                  <hr />
                  <div className="selected_count">
                    <h2 className="selected_columns">Slected Columns</h2>{" "}
                    <div className="count">
                      {props.selectedColumnsLength - 1}
                    </div>
                  </div>

                  <div className="columns_search">
                    <CgSearch size={20} color="#697A8D" />
                    <input
                      type="text"
                      placeholder="Search"
                      value={searchQuery}
                      id="columnSearch"
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <Droppable droppableId="draggable_item">
                    {(provider) => (
                      <div
                        ref={provider.innerRef}
                        {...provider.droppableProps}
                        className="field_container"
                      >
                        {columns
                          .filter((column) =>
                            column.title
                              .toLowerCase()
                              .includes(searchQuery.trim().toLowerCase())
                          )
                          .map((item, index) => {
                            if (firstColumn === item.title) {
                              return (
                                <Draggable
                                  draggableId={item.key}
                                  index={index}
                                  key={item.key}
                                  isDragDisabled={true}
                                >
                                  {(provider) => (
                                    <div
                                      className="columns_fields disabled"
                                      ref={provider.innerRef}
                                      {...provider.draggableProps}
                                      {...provider.dragHandleProps}
                                    >
                                      <div className="chekbox_title">
                                        <img
                                          src="images/icons/lock_icon.svg"
                                          alt=""
                                        />
                                        <p>{item.title}</p>
                                      </div>
                                      <div className="drag_icon">
                                        <img
                                          src="/images/icons/bx-dialpad-alt.svg"
                                          alt="icon"
                                        />
                                      </div>
                                    </div>
                                  )}
                                </Draggable>
                              );
                            } else {
                              return (
                                <Draggable
                                  draggableId={item.key}
                                  index={index}
                                  key={item.key}
                                >
                                  {(provider) => (
                                    <div
                                      className="columns_fields"
                                      ref={provider.innerRef}
                                      {...provider.draggableProps}
                                      {...provider.dragHandleProps}
                                    >
                                      <div className="chekbox_title">
                                        <div>
                                          <Checkbox
                                            value={item.dataIndex}
                                            onChange={props.onSelectColumn}
                                            defaultChecked={true}
                                          />
                                        </div>
                                        <p>{item.title}</p>
                                      </div>
                                      <div className="drag_icon">
                                        <img
                                          src="/images/icons/bx-dialpad-alt.svg"
                                          alt="icon"
                                        />
                                      </div>
                                    </div>
                                  )}
                                </Draggable>
                              );
                            }
                          })}
                        {provider.placeholder}
                      </div>
                    )}
                  </Droppable>
                </div>
              </DragDropContext>
            </div>

            </div>
            
          </div>
        </div>
      </div>
    </>
  );
};

export default FilterAndSearchBar;



