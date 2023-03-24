// import React from 'react'
// import Page_heading from '../../Page_Heading/Page_heading'
// import "./ContactPreview.scss"

// const ContactPreview = () => {

//   const [activeTab, setActiveTab] = React.useState("related_account")
//   return (
    // <div className='contact-preview-main'>
    //   <Page_heading  parent={"Business Account"} child={"Contact Details"} subchild={"Contact"}/>

    //   <div className="card-table-container">
    //     <div className="card-container"></div>
    //     <div className="table-container">
    //       <div className="tab-btn-container">
    //         <div className={`tab-btn sc-body-md ${activeTab=== "related_account" && "active"}`} onClick={()=>setActiveTab("related_account")}>Related Accounts</div>
    //         <div className={`tab-btn sc-body-md ${activeTab=== "analytics" && "active"}`} onClick={()=>setActiveTab("analytics")}>Analytics</div>
    //         <div className={`tab-btn sc-body-md ${activeTab=== "notes" && "active"}`} onClick={()=>setActiveTab("notes")}>Notes</div>
    //         <div className={`tab-btn sc-body-md ${activeTab=== "attachments" && "active"}`} onClick={()=>setActiveTab("attachments")}>Attachments</div>
    //         <div className={`tab-btn sc-body-md ${activeTab=== "timeline" && "active"}`} onClick={()=>setActiveTab("timeline")}>Timeline</div>
    //       </div>

    //       <div className="table-header">
    //         <h1 className='title-sb'>Related Accounts <span className='account-count'>(4)</span></h1>
    //         <p className='sc-body-sb assign-account-btn'>+ Assign Account</p>
    //       </div>

          
    //     </div>
    //   </div>
    // </div>
//   )
// }

// export default ContactPreview


import { React, useState, useRef } from "react";
import FilterAndSearchBar from "../../FilterAndSearchBar/FilterAndSearchBar";
import Page_heading from "../../Page_Heading/Page_heading";
import { Spin, Table, Tooltip, Tag, Skeleton, Popover, Button, Modal, Typography } from "antd";
import { useEffect } from "react";
import { useMemo } from "react";
import editdelete from "../../../assets/Images/Confirmation/editdelete.svg";
import deletelogo from "../../../assets/Images/ActionStatus/Delete.svg";
import editlogo from "../../../assets/Images/ActionStatus/edit.svg";
import statuslogo from "../../../assets/Images/ActionStatus/status.svg";
import alert from "../../../assets/Images/Confirmation/confirm.svg";
import SearchDropdown from "../../AllDropdowns/SearchDropdown/SearchDropdown";
import "./ContactPreview.scss"


const filterfield = {
  name: "",
  mobile: "",
  email: "",
  company: "",
  lead: "",
  ownership: "",
};

const ContactPreview = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [checked, setChecked] = useState("contacts");
  const [visible, setVisible] = useState(false);
  const [fetchlead, setFetchlead] = useState([]);
  const [loading, setloading] = useState(true);
  const [custfilter, setCustFilter] = useState(filterfield);
  const [filterarray, setFilteraaray] = useState([]);
  const [contact, setContact] = useState([]);
  const [other, setOther] = useState([]);
  const [confirm, setCofirm] = useState(false);
  const [deleteRecord, setDeleteRecord] = useState(null)
  const [activeTab, setActiveTab] =useState("related_account")
  
//for modal delete

  const handleConfirmCancel = (record) => {
    setDeleteRecord(record)
      setCofirm(true);
    };
  
    const handleConfirm = () => {
      setCofirm(false);
      setDeleteRecord(null)
    };

const dataSource=[
    {
      key: "1",
      business_name: "Reformiqo Business Services Pvt Ltd ",
      gstin_no: "22AAAAA0000A1Z5",
      type: "Customer",
      category: "Retailer",
      position: "Owner",
      status: "Active",
    }
]

  const ownership = [
    {
      value: "ubuntu",
      label: "ubuntu",
    },
    {
      value: "window",
      label: "window",
    },
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
      width: 500,
      sorter: (record1, record2) => {
        return record1.account_type > record2.account_type;
      },
      render: (text, record) => {
        let initials = "";
        if (record.business_name) {
          const nameArr = record.business_name.split(" ");
          if (nameArr.length > 1) {
            initials = nameArr[0].charAt(0) + nameArr[nameArr.length - 1].charAt(0);
          } else {
            initials = nameArr[0].charAt(0);
          }
        }
        return (
          <div style={{ display: "flex", alignItems: "center" }}>
            <div style={{ minWidth: 36, height: 36, backgroundColor: "#5C5AD133",border: "1px solid #C2CAD2" , borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ color: "#5C5AD0", fontWeight: 600 }}>{initials}</span>
            </div>
            <span style={{ marginLeft: 8 }}><div><p className=" sc-body-md" style={{ color:"#5C5AD1"}}>{record.business_name}</p>
            <div style={{display:"flex", alignItems:"center", gap:"5px", fontSize:"12px", fontWeight:"500", color:"#A1ACB8"}}>
              {/* <img src="images/icons/user_avatar.svg" alt="user" />  */}
              <p className="contact-key-personname caption-rg" style={{fontSize:"", color:"#465468 !important"}}> {record.gstin_no}</p></div></div></span>
          </div>
        );
      },
    },
    {
      title: "Type",
      label: "Type",
      dataIndex: "type",
      key: "type",
      resizable: true,
      width: 100,
      align: "left",
      sorter: (record1, record2) => {
        return record1.mobile_no > record2.mobile_no;
      },
    },
    {
        title: "Category",
        label: "Category",
        dataIndex: "category",
        key: "category",
        resizable: true,
        width: 100,
        align: "left",
        sorter: (record1, record2) => {
          return record1.mobile_no > record2.mobile_no;
        },
      },
      {
        title: "Position",
        label: "Position",
        dataIndex: "position",
        key: "position",
        resizable: true,
        width: 100,
        align: "left",
        sorter: (record1, record2) => {
          return record1.email > record2.email;
        },
      },
    {
      title: "Status",
      label: "Status",
      dataIndex: "status",
      key: "status",
      resizable: true,
      width: 100,
      align: "left",
      sorter: (record1, record2) => {
        return record1.email > record2.email;
      },
      render: (text, record) => (
        <div style={{display:"flex", alignItems:"center", gap:"4px",}}>
        <div className="table_bullet_item"></div>
            <Typography.Text
       
              style={
               
                  record.status
                  ? { color: "#179E40", fontSize: "14px", fontWeight: "600" }
                  : ""
              }
            >
              {record.status}
            </Typography.Text>
        </div>
      ),
    },
    
      {
        title: "",
        label: "Action",
        dataIndex: "action",
        key: "action",
        fixed: "right",
        align: "center",
        width: 40,
        // fixed:"right",
        render: (text, record) => (
          <>
        <Popover      getPopupContainer={(trigger) => trigger.parentElement} showArrow={false} content={
                   <>
             
                   <div style={{display:"flex", alignItems:"center", gap:"11px", marginBottom:"10px"}}>  
                   <img src={deletelogo} />
                   <div>
                   <button 
                   className="actionlabel"
                   onClick={() => handleConfirmCancel(record)}
                   >
                  Delete
                   </button>
                   </div>
                   </div>
                   <div style={{display:"flex", alignItems:"center", gap:"11px", marginBottom:"10px"}}>
                    <img src={editlogo} />
                    <div>
                   <button
        
                      className="actionlabel"
                     //  onClick={() => handleUpdate(record)}
                   >
                  Update
                   </button>
                   </div>
                   </div>
                   <div style={{display:"flex", alignItems:"center", gap:"11px"}}>
                    <img src={statuslogo} />
                    <div>
                   <button
                    className="actionlabel"
                    style={{minWidth: "max-content"}}
                      // onClick={() => handleUpdate(record)}
                   >
                    Set as Activate
                   </button>
                   </div>
                   </div>
                   </>
          } title="" height={100} trigger="click">
          <img src={editdelete} style={{cursor:"pointer"}} />
          </Popover>
          </>
       
        
  
            ),
        resizable: true,
        align: "left",
      },
  ];

  const [columns, setColumns] = useState(columnsData);

  const componentRef = useRef();

  function displaySerachbar() {
    document
      .getElementById("searchbar_container")
      .classList.toggle("container_display");
  }

  // Table Search


  const handleData = (newData) => {
    setSearch(newData);
  };
  const [search, setSearch] = useState("");

  const handleSearch = (event) => {
    setSearch(event.target.value);
  }
  

  const filteredData = dataSource.filter((record) =>
    record.business_name.toLowerCase().includes(search.toLowerCase())
  );
  //Filter field

  useEffect(() => {
    setFilteraaray(
      Object.entries(custfilter)
        .map(([key, value]) => {
          if (value) {
            return { key, value };
          }
        })
        .filter((item) => item)
    );
    //console.log(filterarray);
  }, [custfilter]);
  console.log(filterarray);

  console.log(custfilter);

  //Filter field

  useEffect(() => {
    setFilteraaray(
      Object.entries(custfilter)
        .map(([key, value]) => {
          if (value) {
            return { key, value };
          }
        })
        .filter((item) => item)
    );
  }, [custfilter]);
  console.log(filterarray);

  console.log(custfilter);

  const handleChange = (field, value) => {
    setCustFilter({ ...custfilter, [field]: value });
    console.log("value", value);
    console.log("field", value);
    setVisible(true);
  };

  //clear filter

  const clearfilter = () => {
    console.log("button click");
    setCustFilter(filterfield);
  };


  const onChangeCredit = (e) => {
    const { value, name } = e.target;
    setCustFilter({ ...custfilter, [name]: value });
  };

  const cusomizeData = dataSource.filter(
    (record) =>
      record.business_name.includes(custfilter.lead) 
      && record.business_name.toLowerCase().includes(search.toLowerCase())
    
  );

  console.log(cusomizeData);

  //tags
  console.log(cusomizeData);

  //tags
  console.log(filterarray.length);
  const log = (index, key) => {
    console.log(key);
    setFilteraaray(filterarray.filter((item, i) => i.key !== index.key));
    setCustFilter({ ...custfilter, [key]: "" });
  };
  console.log(filterarray.length);

  //table

 const [selectedColumns, setSelectedColumns] = useState(columns.map(col => col.dataIndex));
 const handleSelectColumn = (e) => {
   const { checked, value } = e.target;
   if(checked) setSelectedColumns([...selectedColumns, value]);
   else setSelectedColumns(selectedColumns.filter(col => col !== value));
 }

  const tableData = useMemo(
    () => (loading ? Array(10).fill({}) : cusomizeData),
    [loading, cusomizeData]
  );
  const tableColumns = useMemo(
    () =>
      loading
        ? columns.map((column) => ({
            ...column,
            sorter: false,
            render: function renderPlaceholder() {
              return (
                <Skeleton
                  key={column.key}
                  title
                  active={true}
                  paragraph={false}
                />
              );
            },
            // cell: <Skeleton />,
          }))
        : columns,
    [loading, columns]
  );


  return (

    <div className='contact-preview-main'>
      <Page_heading  parent={"Business Account"} child={"Contact Details"} subchild={"Contact"}/>

      <div className="card-table-container">
        <div className="card-container">
          <img className="contact-avatar" src="/images/icons/avatar.png" alt="avatar" />
          <p className="subtitle-sb mb-10">Parthbharti Goswami</p>
          <div className="contact-type caption-sb mb-20">Customer</div>
          <div className="contact-btn-container">
            <div className="btn-box">
              <div className="btn-icon">
                <img src="/images/icons/Email-icon.svg" alt="email" />
              </div>
              <p className="caption-md">Email</p>
            </div>
            <div className="btn-box">
              <div className="btn-icon">
              <img src="/images/icons/phone-gray.svg" alt="phone" />
              </div>
              <p className="caption-md">Phone</p>
            </div>
            <div className="btn-box">
              <div className="btn-icon more-icon">
                <img src="/images/icons/three-dot.svg" alt="more" />
              </div>
              <p className="caption-md">More</p>
            </div>
          </div>
          <hr className="h-line"/>

          <div className="contact-details-container">
            <div className="phone">
              <p className="phone-label sc-body-rg mb-4">Phone</p>
              <p className="sc-body-md clr-n-400">+91 84602 777976</p>
            </div>

            <div className="email">
              <p className="email-label sc-body-rg mb-4">Email</p>
              <p className="sc-body-md clr-n-400"> parth.goswami@reformiqo.com</p>
            </div>

            <div className="dob">
              <p className="dob-label sc-body-rg mb-4">Date of Birth</p>
              <p className="sc-body-md clr-p-100">Add</p>
            </div>

            <div className="ownership">
              <p className="ownership-label sc-body-rg mb-4">Ownership</p>
              <p className="sc-body-md clr-n-400">Ashish Jaria</p>
            </div>

            <div className="lead-source">
              <p className="lead-source-label sc-body-rg mb-4">Lead Source</p>
              <p className="sc-body-md clr-n-400">Kushal Nahata</p>
            </div>

            <div className="created-by">
              <p className="created-by-label sc-body-rg mb-4">Created By</p>
              <p className="sc-body-md mb-2 clr-n-400">Kushal Nahata</p>
              <p className="caption-md">8 Dec 2021 - 11:30 AM</p>
            </div>
          </div>
        </div>


        <div className="table-container">
          <div className="tab-btn-container">
            <div className={`tab-btn sc-body-md ${activeTab=== "related_account" && "active"}`} onClick={()=>setActiveTab("related_account")}>Related Accounts</div>
            <div className={`tab-btn sc-body-md ${activeTab=== "analytics" && "active"}`} onClick={()=>setActiveTab("analytics")}>Analytics</div>
            <div className={`tab-btn sc-body-md ${activeTab=== "notes" && "active"}`} onClick={()=>setActiveTab("notes")}>Notes</div>
            <div className={`tab-btn sc-body-md ${activeTab=== "attachments" && "active"}`} onClick={()=>setActiveTab("attachments")}>Attachments</div>
            <div className={`tab-btn sc-body-md ${activeTab=== "timeline" && "active"}`} onClick={()=>setActiveTab("timeline")}>Timeline</div>
          </div>

          <div className="table-header">
            <h1 className='title-sb'>Related Accounts <span className='account-count'>(4)</span></h1>
            <p className='sc-body-sb assign-account-btn'>+ Assign Account</p>
          </div>

          <div className="contact-preview-table-container">
      <div className="filter-searchbar-container">
        <FilterAndSearchBar
          getPopupContainer={(trigger) => trigger.parentElement} 
        
          filterdata={[
            <div className="contact_filter_container">

              <div
                className="customer_filter_filed"
                style={{ marginBottom: "20px", marginTop: "20px" }}
              >
                <Tooltip title="prompt text" color="#5C5AD0">
                    {" "}
                    <label className="label">Ownership</label>{" "}
                  </Tooltip>
                  <SearchDropdown
                    width={330}
                    name="ownership"
                    value={custfilter.ownership}
                    options={ownership}
                    onChange={handleChange} 
                    />
                </div>
  
            
            </div>
          ]}
          change={filterarray}
          onSelectColumn={handleSelectColumn}
          customer={fetchlead.length}
          filterLength={filterarray.length}
          columns={columns}
          setColumns={setColumns}
          addBtnName={"Sales Order"}
          onData={handleData}
          path={"add_sales"}
        //   filter={<Leads />}
          onFilter={(e) => {
            clearfilter(e);
            setVisible(!visible);
          }}
          activeMode={ <div className="filter-and-searchbar-delete-btn">
            <img src="/images/icons/delete-prmry-icon.svg" alt="delete" />
            <p className="sc-body-sb delete-text">Delete</p>
          </div> }
/>
          </div>
        <div className="tableData">
              {filterarray.length > 0 && (
            <div className="tags" id="tags">
              <div className="appliedtag ">Filtered by </div>
              {filterarray.map((customerfilter, index) => {
                return (
                  customerfilter.value && (
                    <Tooltip
                      className="tlpclr"
                      id="tlpclr"
                      title={`${
                        (customerfilter.key === "lead" && "Lead") ||
                        (customerfilter.key === "ownership" && "Ownership") 
                        
                      } : ${customerfilter.value}`}
                      color="#EBECF0"
                    >
                      <Tag
                        key={customerfilter.key}
                        className="tag1"
                        closable
                        closeIcon={<img src="images/icons/tag_close_icon.svg" style={{marginLeft:"4px"}}/>}
                        onClose={(e) => {
                          log(index, customerfilter.key);
                        }}
                      >
                        {customerfilter.value}
                      </Tag>
                    </Tooltip>
                  )
                );
              })}

              <button
                type="submit"
                className="btnfilter"
                onClick={(e) => {
                  setVisible(!visible);
                  clearfilter(e);
                }}
              >
                Clear All
              </button>
            </div>
          )}
          <Table
            ref={componentRef}
            rowSelection={{
                type: "checkbox",
                columnTitle: "",
                selectedRowKeys,
                columnWidth: "40px",
                onChange: (selectedRowKeys, selectedRows) => {
                  setSelectedRowKeys(selectedRowKeys);
                  setSelectedRows(selectedRows);
                },
            }}
             scroll={{x:"800px"}}
            dataSource={filteredData}
            columns={columns}
            pagination={
              !loading && {
                current: page,
                pageSize: pageSize,
                onChange: (page, pageSize) => {
                  setPage(page);
                  setPageSize(pageSize);
                },
                total: cusomizeData.length,
                showTotal: (total, range) =>
                  `Showing ${range[1]}-${range[1]} of ${total} Leads`,
              }
            }
            rowClassName={(record) =>
              record.key % 2 === 0 ? "highlight_row" : ""
            }
            search={{
              keyword: search,
            }}
          />

             <Modal
        open={confirm}
     //   onOk={handleMaterialOk}
        width={"max-content"}
        onCancel={handleConfirm}
        style={{ top: 20 }}
        className={"deleteconfirm"}
        footer={[
          <div style={{ marginLeft: "331px" }}>
            <Button
              key="cancel"
              onClick={handleConfirm}
              style={{
                width: "86px",
                height: "38px",
                fontSize: "14px",
                fontWeight: "700",
                color: "#8E9CAA",
                borderColor: "#C2CAD2",
              }}
            >
              Cancel
            </Button>
            <Button
              key="submit"
              type="primary"
             // onClick={handleSubmit}
              style={{
                width: "88px",
                height: "38px",
                backgroundColor: "#DA2F58",
                fontSize: "14px",
                fontWeight: "700",
                color: "#FFFFFF",
              }}
            >
              Delete
            </Button>
          </div>,
        ]}
        closeIcon={
          <div className="icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="13.51"
              height="13"
              viewBox="0 0 13.51 13"
            >
              <path
                id="Path_34362"
                data-name="Path 34362"
                d="M15.386,13.167l-4.593-4.42,4.593-4.42a1.183,1.183,0,0,0,0-1.723,1.3,1.3,0,0,0-1.79,0L9,7.025,4.41,2.605a1.3,1.3,0,0,0-1.79,0,1.183,1.183,0,0,0,0,1.723l4.593,4.42L2.62,13.167a1.183,1.183,0,0,0,0,1.723,1.3,1.3,0,0,0,1.79,0L9,10.47,13.6,14.89a1.3,1.3,0,0,0,1.79,0A1.189,1.189,0,0,0,15.386,13.167Z"
                transform="translate(-2.248 -2.248)"
                fill="#697a8d"
              />
            </svg>
          </div>
        }
      >
        <div className="confirmCoontainer">
          <div className="confirmresources">
            <div className="imgsetting">
              <div className="imgbackground">
                <img src={alert} style={{ width: "38px", height: "38px" }} />
              </div>
            </div>

            <div>
              <p
                style={{
                  fontSize: "22px",
                  color: "#2B3347",
                  fontWeight: "500",
                  padding: "21px 0px 0px 0px",
                }}
              >
                Delete Lead
              </p>
            </div>
          </div>
          <div>
            <p className="confirmationtext">
              Are you sure you want to close this window? <br /> All the value
              which you filled in the fields will be deleted.
              <br /> This action cannot recover the value.
            </p>
          </div>
        </div>
      </Modal>
        </div>
      </div>

          
        </div>
      </div>
    </div>
  );
};

export default ContactPreview;
