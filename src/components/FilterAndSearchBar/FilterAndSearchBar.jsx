import React from "react";


import { useState, useEffect, useRef } from "react";
import { Input } from "antd";
import { Link } from "react-router-dom";
import ReactToPrint from "react-to-print";
import { CSVLink } from "react-csv";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import filter from "./Icons/Filter.svg";

import "./FilterAndSearchBar.scss";
import Select from "react-select";

import { CgSearch } from "react-icons/cg";
import { BiExport } from "react-icons/bi";
import { BiFilter } from "react-icons/bi";
import { GoPlus } from "react-icons/go";

const FilterAndSearchBar = (props) => {
  const [exportOpen, setExportOpen] = useState(false);
  const [settingOpen, setSettingOpen] = useState(false);
  // const [search, setSearch] = useState("");



  //   const [dateRange, setDateRange] = useState([
  //     {
  //       startDate: new Date(),
  //       endDate: addDays(new Date(), 7),
  //       key: 'selection'
  //     }
  //   ]);

  const menuRef = useRef(null);

  const dataSource = [
    {
      key: "1",
      business_name: "Reformiqo Business Service Pvt. Ltd",
      type: "Customer",
      account: "Account Receivable",
      unadjusted_account: "Unadjested Receipts",
      type_category: "Wholeseler",
      email: "parth@gmail.com",
      phone: 9988998899,
      address: "Reformiqo Business Service Pvt. Ltd.",
    },
    {
      key: "2",
      business_name: "Reformiqo Business Service Pvt. Ltd",
      type: "Customer",
      account: "Account Receivable",
      unadjusted_account: "Unadjested Receipts",
      type_category: "Wholeseler",
      email: "parth@gmail.com",
      phone: 9988998899,
      address: "Reformiqo Business Service Pvt. Ltd.",
    },
    {
      key: "3",
      business_name: "Reformiqo Business Service Pvt. Ltd",
      type: "Customer",
      account: "Account Receivable",
      unadjusted_account: "Unadjested Receipts",
      type_category: "Wholeseler",
      email: "parth@gmail.com",
      phone: 9988998899,
      address: "Reformiqo Business Service Pvt. Ltd.",
    },
    {
      key: "4",
      business_name: "Reformiqo Business Service Pvt. Ltd",
      type: "Customer",
      account: "Account Receivable",
      unadjusted_account: "Unadjested Receipts",
      type_category: "Wholeseler",
      email: "parth@gmail.com",
      phone: 9988998899,
      address: "Reformiqo Business Service Pvt. Ltd.",
    },
    {
      key: "5",
      business_name: "Reformiqo Business Service Pvt. Ltd",
      type: "Customer",
      account: "Account Receivable",
      unadjusted_account: "Unadjested Receipts",
      type_category: "Wholeseler",
      email: "parth@gmail.com",
      phone: 9988998899,
      address: "Reformiqo Business Service Pvt. Ltd.",
    },
    {
      key: "6",
      business_name: "Reformiqo Business Service Pvt. Ltd",
      type: "Customer",
      account: "Account Receivable",
      unadjusted_account: "Unadjested Receipts",
      type_category: "Wholeseler",
      email: "parth@gmail.com",
      phone: 9988998899,
      address: "Reformiqo Business Service Pvt. Ltd.",
    },
    {
      key: "7",
      business_name: "Reformiqo Business Service Pvt. Ltd",
      type: "Customer",
      account: "Account Receivable",
      unadjusted_account: "Unadjested Receipts",
      type_category: "Wholeseler",
      email: "parth@gmail.com",
      phone: 9988998899,
      address: "Reformiqo Business Service Pvt. Ltd.",
    },
    {
      key: "8",
      business_name: "Reformiqo Business Service Pvt. Ltd",
      type: "Customer",
      account: "Account Receivable",
      unadjusted_account: "Unadjested Receipts",
      type_category: "Wholeseler",
      email: "parth@gmail.com",
      phone: 9988998899,
      address: "Reformiqo Business Service Pvt. Ltd.",
    },
    {
      key: "9",
      business_name: "Reformiqo Business Service Pvt. Ltd",
      type: "Customer",
      account: "Account Receivable",
      unadjusted_account: "Unadjested Receipts",
      type_category: "Wholeseler",
      email: "parth@gmail.com",
      phone: 9988998899,
      address: "Reformiqo Business Service Pvt. Ltd.",
    },
    {
      key: "10",
      business_name: "Reformiqo Business Service Pvt. Ltd",
      type: "Customer",
      account: "Account Receivable",
      unadjusted_account: "Unadjested Receipts",
      type_category: "Wholeseler",
      email: "parth@gmail.com",
      phone: 9988998899,
      address: "Reformiqo Business Service Pvt. Ltd.",
    },
    {
      key: "11",
      business_name: "Reformiqo Business Service Pvt. Ltd",
      type: "Customer",
      account: "Account Receivable",
      unadjusted_account: "Unadjested Receipts",
      type_category: "Wholeseler",
      email: "parth@gmail.com",
      phone: 9988998899,
      address: "Reformiqo Business Service Pvt. Ltd.",
    },
    {
      key: "12",
      business_name: "Reformiqo Business Service Pvt. Ltd",
      type: "Customer",
      account: "Account Receivable",
      unadjusted_account: "Unadjested Receipts",
      type_category: "Wholeseler",
      email: "parth@gmail.com",
      phone: 9988998899,
      address: "Reformiqo Business Service Pvt. Ltd.",
    },
    {
      key: "13",
      business_name: "Reformiqo Business Service Pvt. Ltd",
      type: "Customer",
      account: "Account Receivable",
      unadjusted_account: "Unadjested Receipts",
      type_category: "Wholeseler",
      email: "parth@gmail.com",
      phone: 9988998899,
      address: "Reformiqo Business Service Pvt. Ltd.",
    },
    {
      key: "14",
      business_name: "Reformiqo Business Service Pvt. Ltd",
      type: "Customer",
      account: "Account Receivable",
      unadjusted_account: "Unadjested Receipts",
      type_category: "Wholeseler",
      email: "parth@gmail.com",
      phone: 9988998899,
      address: "Reformiqo Business Service Pvt. Ltd.",
    },
    {
      key: "15",
      business_name: "Reformiqo Business Service Pvt. Ltd",
      type: "Customer",
      account: "Account Receivable",
      unadjusted_account: "Unadjested Receipts",
      type_category: "Wholeseler",
      email: "parth@gmail.com",
      phone: 9988998899,
      address: "Reformiqo Business Service Pvt. Ltd.",
    },
    {
      key: "16",
      business_name: "Reformiqo Business Service Pvt. Ltd",
      type: "Customer",
      account: "Account Receivable",
      unadjusted_account: "Unadjested Receipts",
      type_category: "Wholeseler",
      email: "parth@gmail.com",
      phone: 9988998899,
      address: "Reformiqo Business Service Pvt. Ltd.",
    },

    // ...
  ];
  const columnsData = [
    {
      title: "Business Name",
      label: "Business Name",
      dataIndex: "business_name",
      key: "business_name",
      resizable: true,
      fixed: "left",
      align: "left",
      width: 270,
    },
    {
      title: "Type",
      label: "Type",
      dataIndex: "type",
      key: "type",
      resizable: true,
      width: 100,
      align: "left",
    },
    {
      title: "Account",
      label: "Account",
      dataIndex: "account",
      key: "account",
      resizable: true,
      width: 170,
      align: "left",
    },
    {
      title: "Unadjusted Account",
      label: "Unadjusted Account",
      dataIndex: "unadjusted_account",
      key: "unadjusted_account",
      resizable: true,
      width: 180,
      align: "left",
    },
    {
      title: "Type Category",
      label: "Type Category",
      dataIndex: "type_category",
      key: "type_category",
      resizable: true,
      width: 150,
      align: "left",
    },
    {
      title: "Email",
      label: "Email",
      dataIndex: "email",
      key: "email",
      resizable: true,
      width: 150,
      align: "left",
    },
  ];
  const [columns, setColumns] = useState(props.columns);

  const csvLink = {
    filename: "customer_data.csv",
    headers: columns,
    data: dataSource,
  };

  const downloadPdf = () => {
    const doc = new jsPDF();
    doc.text("Customer Data", 20, 10);
    doc.autoTable({
      columns: columns.map((col) => ({ ...col, dataKey: col.key })),
      body: dataSource,
    });
    doc.save("customer_data.pdf");
  };

  const openExport = () => {
    setExportOpen(!exportOpen);
  };
  const openSetting = () => {
    setSettingOpen(!settingOpen);
  };

  useEffect(() => {
    let handleClickOutside = (event) => {
      if (!menuRef.current.contains(event.target)) {
        // Close the dropdown list
        setSettingOpen(false);
        setExportOpen(false);
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

  const customStyle = {
    control: (base, state) => ({
      ...base,
      background: "white",
      width: "300px",
      border: "none",
      borderRadius: "5px",
      boxShadow: "none",
      height: "40px",
      marginLeft: "-8px",

      "&:hover": {
        border: "none",
      },
    }),
    option: (provided, state) => ({
      ...provided,
      color: state.isSelected ? "white" : "black",
      backgroundColor: state.isSelected ? "#697A8D" : "white",
      "&:hover": {
        backgroundColor: "#697A8D",
        color: "white",
      },
    }),
    menu: (provided, state) => ({
      ...provided,
      borderRadius: "5px",
      border: "none",
      boxShadow: "0px 2px 2px rgba(0, 0, 0, 0.25)",
      zIndex: "5",
      width: "300px",
    }),
    menuList: (provided, state) => ({
      ...provided,
      padding: "0px",
    }),
    singleValue: (provided, state) => ({
      ...provided,
      color: "#697A8D",
      fontSize: "14px",
      fontWeight: "400",
      lineHeight: "20px",
      letterSpacing: "0.25px",
    }),
    input: (provided, state) => ({
      ...provided,
      color: "#697A8D",
      fontSize: "14px",
      fontWeight: "400",
      lineHeight: "20px",
      letterSpacing: "0.25px",
      height: "40px",
      // maxHeight: "30px",
      margin: "0px",
    }),
    placeholder: (provided, state) => ({
      ...provided,
      color: "#697A8D",
      fontSize: "14px",
      fontWeight: "400",
      lineHeight: "20px !important",
      letterSpacing: "0.25px",
      // marginTop: "-5px",
    }),
    indicatorSeparator: (provided, state) => ({
      ...provided,
      display: "none",
    }),
    dropdownIndicator: (provided, state) => ({
      ...provided,
      color: "#697A8D",
      fontSize: "14px",
      fontWeight: "400",
      lineHeight: "20px",
      letterSpacing: "0.25px",
    }),
    // valueContainer: (provided, state) => ({
    //   ...provided,
    //   height: "40px",
    //   // minHeight: "30px",
    //   lineHeight: "20px !important",
    // }),
  };

  return (
    <>
      <div className="table_nav">
        {/* <div className="search_customer">
          <div className="search_icon">
            <CgSearch size={23} color="#697A8D" />
          </div>

          {/* <input type="text" placeholder="Search Customer" /> */}

        {/* <div className="searchbar_typehead">
          <Select styles={customStyle} placeholder="Search Customer" noOptionsMessage={({inputValue}) => !inputValue ? "Search Customer" : "No Customer Found"} />
          </div> */}

        {/* 
        </div> */}

        {/* <div className="tableBtn">
            <div className="btn_icon">
              <img src={filter} size={15} />
            </div>
            Filter
          </div> */}

        <div className="tableBtn_container" ref={menuRef}>
          <div style={{ display: "flex" }}>
            <div className="tableBtn">
              <div className="btn_icon">
                <img src={filter} size={15} />
              </div>
              Filter
            </div>
            <div
              className="tableBtn export"
              onClick={openExport}
              style={{ width: "101.5px" }}
            >
              <div className="btn_icon">
                <BiExport size={15} />
              </div>
              <span>Export</span>

              <div
                className={`export_dropdown ${
                  exportOpen ? "active" : "inactive"
                }`}
              >
                <div className="export_dropdown_btn">
                  <div className="export_icon">
                    <img src="/images/icons/print_icon.svg" alt="print_icon" />
                  </div>
                  {/* <span>Print</span> */}
                  <ReactToPrint
                    trigger={() => <span>Print</span>}
                    content={() => componentRef.current}
                  />
                </div>
                <CSVLink {...csvLink} className="csvLink">
                  <div className="export_dropdown_btn">
                    <div className="export_icon">
                      <img
                        src="/images/icons/document_icon.svg"
                        alt="document_icon"
                      />
                    </div>
                    <span>Csv</span>
                  </div>
                </CSVLink>
                <div className="export_dropdown_btn" onClick={downloadPdf}>
                  <div className="export_icon">
                    <img src="/images/icons/pdf_icon.svg" alt="pdf_icon" />
                  </div>
                  <span>Pdf</span>
                </div>
                <div className="export_dropdown_btn">
                  <div className="export_icon">
                    <img src="/images/icons/copy_icon.svg" alt="copy_icon" />
                  </div>
                  Copy
                </div>
              </div>
            </div>

            {/* <div className="tableBtn">
            <div className="btn_icon">
              <img src={filter} size={15} />
            </div>
            Filter
          </div> */}

            <div className="tableBtn addNewBtn" onClick={showCanvas}>
              <GoPlus />
             <Link exact to={props.path}  style={{color:"white"}}> <div className="addNewBtn_text">New {props.addBtnName}</div></Link>
            </div>
          </div>

          <div style={{ display: "flex", gap: "20px" }}>
            <div className="search_customer">
              <div className="search_icon">
                <CgSearch size={23} color="#697A8D" />
              </div>
              <input type="text" placeholder="Search Customer" />


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
            </div>

            <div className="settings" ref={menuRef}>
              <img
                src="/images/icons/setting.svg"
                alt="icon"
                onClick={openSetting}
              />
              <DragDropContext onDragEnd={handleDragEnd}>
                <div
                  className={`table_setting_dropdown ${
                    settingOpen ? "active" : "inactive"
                  }`}
                >
                  <h5>Manage Columns</h5>
                  <Droppable droppableId="draggable_item">
                    {(provider) => (
                      <div ref={provider.innerRef} {...provider.droppableProps}>
                        {columns.map((item, index) => (
                          <Draggable
                            draggableId={item.key}
                            index={index}
                            key={item.key}
                            isDragDisabled={
                              item.title === "Business Name" ? true : false
                            }
                          >
                            {(provider) => (
                              <div
                                className="columns_fields"
                                ref={provider.innerRef}
                                {...provider.draggableProps}
                                {...provider.dragHandleProps}
                              >
                                <div className="chekbox_title">
                                  <input type="checkbox" />
                                  <span>{item.title}</span>
                                </div>
                                <div>
                                  <img
                                    src="/images/icons/bx-dialpad-alt.svg"
                                    alt="icon"
                                  />
                                </div>
                              </div>
                            )}
                          </Draggable>
                        ))}
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
    </>
  );
};

export default FilterAndSearchBar;
