import { React, useState, useRef, useEffect,useMemo } from "react";
import FilterAndSearchBar from "../../FilterAndSearchBar/FilterAndSearchBar";
import Page_heading from "../../Page_Heading/Page_heading";
import "./ContactsData.scss";
import { Spin, Table, Tooltip, Tag, Skeleton, Popover, Button, Modal, Typography } from "antd";
import OffCanvasExample from "../../OffCanvas/OffCanvasExample";
import Contacts, {ChildStateModificationFunc} from "../Contacts";
import SearchDropdown from "../../AllDropdowns/SearchDropdown/SearchDropdown";
import axios from "axios";
import config from "../../Database/config";
import dob from "../../../assets/Images/FormIcon/DOB.svg";
import Swal from "sweetalert2";
import { toast, ToastContainer } from "react-toastify";
import editdelete from "../../../assets/Images/Confirmation/editdelete.svg";
import CalendarComp from "../../Calendar/CalendarComp"
// import 'react-date-range/dist/styles.css'; // main style file
// import 'react-date-range/dist/theme/default.css'; // theme css file
import deletelogo from "../../../assets/Images/ActionStatus/Delete.svg";
import editlogo from "../../../assets/Images/ActionStatus/edit.svg";
import statuslogo from "../../../assets/Images/ActionStatus/status.svg";
import alert from "../../../assets/Images/Confirmation/confirm.svg";
import { Link } from "react-router-dom";


const filterfield = {
  name: "",
  mobile: "",
  email: "",
  dob: "",
  position: "",
  ownership: "",
};



const ContactsData = (props) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [fetchcontact, setFetchcontact] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [loading, setLoading] = useState(true);
  const [visible, setVisible] = useState(false);
  const [custfilter, setCustFilter] = useState(filterfield);
  const [filterarray, setFilteraaray] = useState([]);
  const [oldData, setoldData] = useState([]);
  const [confirm, setCofirm] = useState(false);
  const [deleteRecord, setDeleteRecord] = useState(null)
   const [popOverVisible, setPopOverVisible] = useState(false);
   const [open, setOpen] = useState(false);
   

  const hide = () => {
    setOpen(false);
   // document.getElementById("popoverhide").style.display="none";
   // document.getElementById("popoverhide").style.display="block";
    console.log(open)
    console.log("line55")
  };
  const popvisible = () => {
    setOpen(false);
    //document.getElementById("popoverhide").style.display="block";
    console.log(open)
    console.log("line55")
  };


  const handleOpenChange = (newOpen) => {
    setOpen(newOpen);
  };


  const handleConfirmCancel = (record) => {
  setDeleteRecord(record)
    setCofirm(true);
    setPopOverVisible(false)
  };

  const handleConfirm = () => {
    setCofirm(false);
    setDeleteRecord(null)
    // setPopOverVisible(false)
  };

  const handleSubmit = () =>
  {
  //  alert("Data", record)
    deleteUser(deleteRecord);
    getData();
    setCofirm(false);
    getData();
  }
  useEffect(() => {
    getData();
  }, []);
  console.log(selectedRows)

  const getData = async () => {
    await axios.get(`${config.baseUrl}/contact/`).then((res) => {
      
      setFetchcontact(
        res.data.map((row) => ({
          Key: row.id,
          Name: row.name,
          Mobile: row.mobile,
          Email: row.email,
          DOB: row.dob,
          Position:
            row.position == 1
              ? "Owner"
              : row.position == 2
              ? "Accountant"
              :  row.position == 2
               ?"Manger"
               :"SalesPerson",
          Ownership: row.ownership == 1 ? "ubuntu" : "window",
          // id: row.id
        }))
      );
      console.log(res);
      setLoading(false);
    });
  };
  console.log(fetchcontact);

//delete data
const deleteUser = (record)=>
{
  
  console.log(record);
  console.log(record.id);
  axios
  .delete(
    `${config.baseUrl}/contact/${record.id}/`);
    setDeleteRecord(null)
       getData();
       console.log(fetchcontact)
}

  //All dropdowns

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

  const position = [
    {
      value: "Owner",
      label: "Owner",
    },
    {
      value: "Accountant",
      label: "Accountant",
    },
    {
      value: "Manger",
      label: "Manger",
    },
  ];

  function showCanvas() {
    var m = document.querySelector(".menu1");
    m.classList.add("smenu");
    //document.root.style.backgroundColor='rgba(0,0,0,0.4)';
    document.getElementById("gradient").classList.add("body_gradient");
  }


  //Get data in textbox on edit button
  const handleUpdate = (oldData) => {
    console.log(oldData);
    console.log(oldData.id);
    showCanvas();
      ChildStateModificationFunc(oldData)
      console.log(oldData)
  };
console.log(oldData);
//alert(oldData)

//get form data




  const dataSource = fetchcontact.map((contact) => ({
    key: contact.Key,
    id: contact.Key,
    name: contact.Name,
    mobile: contact.Mobile,
    email: contact.Email,
    dob: contact.DOB,
    position: contact.Position,
    companyname:"Reformiqo",
    status:"Customer",
    ownership: contact.Ownership,
  }));
  const columnsData = [
    {
      title: "Contact Name",
      label: "Contact Name",
      dataIndex: "name",
      key: "name",
      resizable: true,
      fixed: "left",
      align: "left",
      // width: "max-content",
      // width: "max-content",
      // style: { maxWidth: "100px" },
      render: (text, record) => {
        let initials = "";
        if (record.name) {
          const nameArr = record.name.split(" ");
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
            <span style={{ marginLeft: 8 }}><div style={{ maxWidth: '180px' }}><p style={{fontSize:""}}>{record.name}</p><div style={{display:"flex", alignItems:"center", gap:"5px", fontSize:"12px", fontWeight:"500", color:"#A1ACB8"}}><img src="images/icons/user_avatar.svg" alt="user" /> {record.position}</div></div></span>
          </div>
        );
      },
      showSorterTooltip: { title: "" },
      sorter: (record1, record2) => {
        return record1.name > record2.name;
      },
    },
    {
      title: "Contact details",
      label: "Contact details",
      dataIndex: "mobile",
      key: "mobile",
      resizable: true,
      // width: "max-content",
      align: "left",
      showSorterTooltip: { title: "" },
      sorter: (record1, record2) => {
        return record1.contactdetails > record2.contactdetails;
      },
      render: (text, record) => (
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
            <img src="images/icons/mail_gray_icon.svg" alt="mail" />
            <div style={{ maxWidth: '200px' }}>{record.email}</div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
            <img src="images/icons/phone_icon_gray.svg" alt="phone" />
            {record.mobile}
          </div>
        </div>
      ),
    },
    {
      title: "Lead Source",
      label: "Lead Source",
      dataIndex: "leadsource",
      key: "leadsource",
      resizable: true,
      // width: "max-content",
      align: "left",
      showSorterTooltip: { title: "" },
      sorter: (record1, record2) => {
        return record1.leadsource > record2.leadsource;
      },
      render: (text, record) => (
        <div>
          <div style={{display: "flex", alignItems: "center", gap: "5px", width: "max-content", padding: "4px 16px", borderRadius: "19px", backgroundColor:"#ECEEF1"}}>
            Parth Goswami
          </div>
        </div>
      ),
    },
    {
      title: "Status",
      label: "Status",
      dataIndex: "status",
      key: "  ",
      resizable: true,
      align: "left",
      showSorterTooltip: { title: "" },
      sorter: (record1, record2) => {
        return record1.status > record2.status;
      },
      render: (text, record) => (
        <div style={{display:"flex", alignItems:"center", gap:"5px"}}>
        <div className="table_bullet_item"></div>
            <Typography.Text
              style={
                record.status === "Customer"
                  ? { color: "#28A745", fontSize: "14px", fontWeight: "600" }
                  : ""
              }
            >
              {record.status}
            </Typography.Text>
        </div>
      ),

    },
    {
      title: "Company Name",
      label: "Company Name",
      dataIndex: "companyname",
      key: "companyname",
      resizable: true,
      // width: "max-content",
      align: "left",
      showSorterTooltip: { title: "" },
      sorter: (record1, record2) => {
        return record1.position > record2.position;
      },
    },
    {
      title: "Ownership ",
      label: "Ownership ",
      dataIndex: "ownership",
      key: "ownership",
      resizable: true,
      // width: "150px",
      // width: "max-content",
      align: "left",
      showSorterTooltip: { title: "" },
      sorter: (record1, record2) => {
        return record1.ownership > record2.ownership;
      },
      render: (text, record) => (
        <div>
          <div style={{display:"flex", alignItems:"center", gap:"10px"}}>
            <img src="images/icons/profile.png" alt="" style={{width:"30px"}} />
            <p>{record.ownership}</p>
          </div>
        </div>
      ),
    },
    {
      title: "",
      label: "Action",
      dataIndex: "action",
      key: "action",
      // width: 60,
      // width: "max-content",
      render: (text, record) => (
        <>
        <Popover  id="popoverhide"  defaultOpen={open} onOpenChange={setOpen}
      getPopupContainer={(trigger) => trigger.parentElement} showArrow={false}
       content={
                 <>
           
                 <div style={{display:"flex", alignItems:"center", gap:"11px", marginBottom:"10px"}}>  
                 <img src={deletelogo} />
                 <div>
                 <button 
                 className="actionlabel"
                 onClick={() => { handleConfirmCancel(record); hide(); }}
                //onClick={hide}
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
                    onClick={() => handleUpdate(record)}
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
        <img src={editdelete} style={{cursor:"pointer"}} onClick={(e) => {setOpen(open); popvisible(e);}}/>
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
  };

  const filteredData = dataSource.filter(
    (record) =>
      record.name.toLowerCase().includes(search.toLowerCase())
      // record.mobile.toString().includes(search.toString())
  );

  //Filter

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

  // useEffect(() => {
  //  setCustFilter({...custfilter, ["credit"] :currentValue})

  // }, [currentValue]);

  const onChangedob = (e) => {
    const { value, name } = e.target;
    setCustFilter({ ...custfilter, [name]: value });
    console.log(value);
    console.log(name);
  };

  const cusomizeData = dataSource.filter(
    (record) =>
      record.position.includes(custfilter.position) &&
      record.ownership.includes(custfilter.ownership) &&
      record.dob.toString().includes(custfilter.dob.toString())
      && record.name.toLowerCase().includes(search.toLowerCase())
      // && record.email.toLowerCase().includes(search.toLowerCase())
      // || record.dob.toString().includes(search.toString())
      // && record.mobile.toString().includes(search.toString())
      // && record.position.toLowerCase().includes(search.toLowerCase())
      // && record.ownership.toLowerCase().includes(search.toLowerCase())
  );

  console.log(cusomizeData);

  var strDate = custfilter.dob;
  var convertedDate = new Date(strDate)
    .toLocaleDateString("IN")
    .replaceAll("/", "-");
  console.log(convertedDate); // 2-23-2021

  //tags

  const log = (index, key) => {
    console.log(key);
    setFilteraaray(filterarray.filter((item, i) => i.key !== index.key));
    setCustFilter({ ...custfilter, [key]: "" });
  };
  console.log(filterarray);

  //

  const handlecheckgetData = () => {
    alert("Data call");
  };

  const tableData = useMemo(
    () => (loading ? Array(10).fill({}) : cusomizeData),
    [loading, cusomizeData]
  ); 
  const tableColumns = useMemo(
    () =>
      (loading
        ? columns.map((column) => ({
          ...column,sorter: false,
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
        : columns),
    [loading, columns]
  );


  // selectedColumns 

  const [selectedColumns, setSelectedColumns] = useState(tableColumns.map(col => col.dataIndex));
  const handleSelectColumn = (e) => {
    const { checked, value } = e.target;
    if(checked) setSelectedColumns([...selectedColumns, value]);
    else setSelectedColumns(selectedColumns.filter(col => col !== value));
  }

  const handleSelect=(date)=>{
    console.log(date); // native Date object
  }

const getDataChild = () => 
{
setoldData(oldData)
}

  return (
    <div className="contacts-data">
        {/* <Popover
          getPopupContainer={(trigger) => trigger.parentElement} 
      content={
        <>
           
        <div style={{display:"flex", alignItems:"center", gap:"11px", marginBottom:"10px"}}>  
        <img src={deletelogo} />
        <div>
        <button 
        className="actionlabel"
       // onClick={() => handleConfirmCancel(record)}    
       onClick={hide}
        >
       Delete
        </button>
        </div>
        </div>
        <div style={{display:"flex", alignItems:"center", gap:"11px", marginBottom:"10px"}}>
         <img src={editlogo} />
         <div>
        <Link to="addcustomer"><button

           className="actionlabel"
           // onClick={() => handleUpdate(record)}
        >
       Update
        </button></Link>
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
      }
      title="Title"
      trigger="click"
      open={open}
     onOpenChange={handleOpenChange}
    >
      <Button type="primary">Click me</Button>
    </Popover>  */}
      <Page_heading parent={"Business Account"} child={"contacts"} />

      <div className="contacts-table-container">
        <FilterAndSearchBar
          results_length={`${cusomizeData.length} Contacts`}
          filterdata={[
            <div className="contact_filter_container">
              <div className="customer_filter_filed">
                <Tooltip title="prompt text" color="#5C5AD0">
                  {" "}
                  <label className="label">Position</label>{" "}
                </Tooltip>
                <SearchDropdown
                  width={330}
                  name="position"
                  options={position}
                  value={custfilter.position}
                  onChange={handleChange}
                />
              </div>

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
                  options={ownership}
                  value={custfilter.ownership}
                  onChange={handleChange}
                />
              </div>

              <div className="customer_filter_filed">
                <Tooltip title="prompt text" color="#5C5AD0">
                  {" "}
                  <label className="contactlabel" style={{ marginTop: "5px" }}>
                    Date of Birth
                  </label>{" "}
                </Tooltip>
                <br />
                <div className="contactinput" style={{ marginTop: "5px" }}>
                  <img src={dob} className="customerimg" />
                  {/* <Calendar
        date={new Date()}
        onChange={handleSelect}
          /> */}

          <CalendarComp    name="dob"
                    value={custfilter.dob}
                    onChange={onChangedob}/>
                  {/* <input
                    type="date"
                    className="inputcontact"
                    placeholder="Placeholder"
                    name="dob"
                    value={custfilter.dob}
                    onChange={onChangedob}
                  /> */}
                </div>
              </div>
            </div>,
          ]}
          change={filterarray}
          onSelectColumn={handleSelectColumn}
          customer={fetchcontact.length}
          filterLength={filterarray.length}
          columns={columns}
          setColumns={setColumns}
          addBtnName={"Contacts"}
          onData={handleData}
          filter={<Contacts />}
          onFilter={(e) => {
            clearfilter(e);
            setVisible(!visible);
          }}
        />
        <OffCanvasExample form={<Contacts handledata={getDataChild} onClick={getData} />} />
        <div className="tableData">
          {filterarray.length > 0 && (
            <div className="tags" id="tags">
              <div className="appliedtag ">Applied Filters :</div>
              {filterarray.map((customerfilter, index) => {
                return (
                  customerfilter.value && (
                    <Tooltip
                      className="tlpclr"
                      id="tlpclr"
                      title={`${
                        (customerfilter.key === "position" && "Position") ||
                        (customerfilter.key === "ownership" && "Ownership") ||
                        (customerfilter.key === "dob" && "Date of Birth")
                      } : ${customerfilter.value}`}
                      color="#EBECF0"
                    >
                      <Tag
                        key={customerfilter.key}
                        className="tag1"
                        closable
                        onClose={(e) => {
                          log(index, customerfilter.key);
                        }}
                      >
                        {customerfilter.key == "dob"
                          ? convertedDate
                          : customerfilter.value}
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
            rowSelection={!loading &&{
              type: "checkbox",
              columnTitle: "",
              selectedRowKeys,
              onChange: (selectedRowKeys, selectedRows) => {
                setSelectedRowKeys(selectedRowKeys);
                setSelectedRows(selectedRows);
              },
            }}
            dataSource={tableData}
            columns={tableColumns.filter(col => selectedColumns.includes(col.dataIndex))}
            // scroll={{ y: 800, x: 720 }}
            // scroll={!loading && { x: ("30px", "800px" )}}
            pagination={!loading &&{
              current: page,
              pageSize: pageSize,
              onChange: (page, pageSize) => {
                setPage(page);
                setPageSize(pageSize);
              },
              total: cusomizeData.length,
              showTotal: (total, range) =>
                `Showing ${range[1]}-${range[1]} of ${total} Contacts`,
            }}
            rowClassName={(record) =>
              record.key % 2 === 0 ? "highlight_row" : ""
            }
            search={{
              keyword: search,
            }}
          />

          {
            selectedRows.length > 1 && (
              <div className="bulk_changes_container">
                    <div className="selected_container">
                      {selectedRows.length} Contacts Selected
                      <span onClick={()=>{setSelectedRows([]); setSelectedRowKeys([])}}>Unselect all</span>
                    </div>
                    <div className="modify_container">
                      <div className="send_email">
                      <img src="images/icons/mail_gray_icon.svg" alt="mail" />
                        <p>Send Email</p>
                      </div>
                      <div className="change_status">
                        <img src="images/icons/reload_icon.svg" alt="" />
                        <p>Change Status</p>
                      </div>
                      <div className="change_position">
                        <img src="images/icons/user_avatar.svg" alt="user" />
                        <p>Change Position</p>
                      </div>
                    </div>

                    <div className="delete_container">
                      <img src="images/icons/delete_red_icon.svg" alt="" />
                      <p>Delete</p>
                    </div>
          </div>
            )
          }
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
              onClick={handleSubmit}
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
                Delete Contact
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
          {/* <SearchDropdown/> */}
        </div>
      </div>
    </div>
  );
};

export default ContactsData;
