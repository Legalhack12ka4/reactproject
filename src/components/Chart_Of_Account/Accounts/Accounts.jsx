import { Button, Modal, Popover, Space, Table, Typography } from "antd";
import { React, useState, useRef, useEffect } from "react";
import FilterAndSearchBar from "../../FilterAndSearchBar/FilterAndSearchBar";
import OffCanvasExample from "../../OffCanvas/OffCanvasExample";
import Page_heading from "../../Page_Heading/Page_heading";
import AccountForm from "../AccountForm/AccountForm";
import "./Accounts.scss";
import editdelete from "../../../assets/Images/Confirmation/editdelete.svg";
import SearchDropdown from "../../AllDropdowns/SearchDropdown/SearchDropdown";
import deletelogo from "../../../assets/Images/ActionStatus/Delete.svg";
import editlogo from "../../../assets/Images/ActionStatus/edit.svg";
import statuslogo from "../../../assets/Images/ActionStatus/status.svg";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import alert from "../../../assets/Images/Confirmation/confirm.svg";
import config from "../../Database/config";

function Accounts() {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [confirm, setCofirm] = useState(false);
  const [deleteRecord, setDeleteRecord] = useState(null)
  const [reportingl, setReportingl]=useState([]);
  const [reportingl3, setReportingl3]=useState([]);
  
//for modal delete

  const handleConfirmCancel = (record) => {
    setDeleteRecord(record)
      setCofirm(true);
      //setPopOverVisible(false)
    };
  
    const handleConfirm = () => {
      setCofirm(false);
      setDeleteRecord(null)
      // setPopOverVisible(false)
    };
  
    const handleSubmit = () =>
    {
    //  alert("Data", record)
     // deleteUser(deleteRecord);
   //   getData();
      setCofirm(false);
   //   getData();
    }

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
    //   setFormData(resetValue);
  };

//dropodwn withtwo dropodwn
const getReporting = () => {
  return fetch(`${config.baseUrl}/reporting/`)
    .then((response) => response.json())
    .then((data) => {
      setReportingl(data);
      console.log(data);
    });
};
// const getReportingl3 = () => {
//   return fetch(`${config.baseUrl}/reporting/`)
//     .then((response) => response.json())
//     .then((data) => {
//       setReportingl3(data);
//       console.log(data);
//     });
// };


   useEffect(() => {
    getReporting();
  //  getReportingl3();
}, []);

const reporting3 =  reportingl.map((place)=>({
  
  
  label: place.reporting_l3,
  value: place.reporting_l3,
  
}))
  

const reporting =
// [
  // {
  //       label: 'Manager',
  //       options: [
          
  //           reportingl.map((place)=>({
  
  
  //             label: place.reporting_l2,
  //             value: place.reporting_l2,
              
  //           })),
        
  //         {
  //           label: 'Lucy',
  //           value: 'lucy',
  //         },
  //       ],
  //     },
 
    reportingl.map((place)=>({
  
  
  label: place.reporting_l2,
  value: place.reporting_l2,
  
}))
  
// ]

// const reporting=[
//   {
//     label: 'Manager',
//     options: [
//       {
//         label: 'Jack',
//         value: 'jack',
//       },
//       {
//         label: 'Lucy',
//         value: 'lucy',
//       },
//     ],
//   },
//   {
//     label: 'Engineer',
//     options: [
//       {
//         label: 'yiminghe',
//         value: 'Yiminghe',
//       },
//     ],
//   },
// ]
// const reporting=[
//   {
//     label: 'Manager',
//     options: [
//       { label: 'Jack', value: 'jack' },
//       { label: 'Lucy', value: 'lucy' },
//     ],
//   },
//   {
//     label: 'Engineer',
//     options: [{ label: 'yiminghe', value: 'Yiminghe' }],
//   },
// ];

  const dataSource = [
    {
      key: "1",
      account_name: "Cleaning Expenses",
      account_code: "0019",
      account_type: "Cost of Goods Sold",
      description: "Expenses regarding Goods",
      status: "Active",
    },
    {
      key: "2",
      account_name: "Cleaning Expenses",
      account_code: "0019",
      account_type: "Cost of Goods Sold",
      description: "Expenses regarding Goods",
      status: "Active",
    },
    {
      key: "3",
      account_name: "Cleaning Expenses",
      account_code: "0019",
      account_type: "Cost of Goods Sold",
      description: "Expenses regarding Goods",
      status: "Active",
    },
    {
      key: "4",
      account_name: "Cleaning Expenses",
      account_code: "0019",
      account_type: "Cost of Goods Sold",
      description: "Expenses regarding Goods",
      status: "Active",
    },
    {
      key: "5",
      account_name: "Cleaning Expenses",
      account_code: "0019",
      account_type: "Cost of Goods Sold",
      description: "Expenses regarding Goods",
      status: "Active",
    },
    {
      key: "6",
      account_name: "Cleaning Expenses",
      account_code: "0019",
      account_type: "Cost of Goods Sold",
      description: "Expenses regarding Goods",
      status: "Active",
    },
    {
      key: "7",
      account_name: "Cleaning Expenses",
      account_code: "0019",
      account_type: "Cost of Goods Sold",
      description: "Expenses regarding Goods",
      status: "Active",
    },
    {
      key: "8",
      account_name: "Cleaning Expenses",
      account_code: "0019",
      account_type: "Cost of Goods Sold",
      description: "Expenses regarding Goods",
      status: "Active",
    },
    {
      key: "9",
      account_name: "Cleaning Expenses",
      account_code: "0019",
      account_type: "Cost of Goods Sold",
      description: "Expenses regarding Goods",
      status: "Active",
    },
    {
      key: "10",
      account_name: "Cleaning Expenses",
      account_code: "0019",
      account_type: "Cost of Goods Sold",
      description: "Expenses regarding Goods",
      status: "Active",
    },
    {
      key: "11",
      account_name: "Cleaning Expenses",
      account_code: "0019",
      account_type: "Cost of Goods Sold",
      description: "Expenses regarding Goods",
      status: "Active",
    },
    {
      key: "12",
      account_name: "Cleaning Expenses",
      account_code: "0019",
      account_type: "Cost of Goods Sold",
      description: "Expenses regarding Goods",
      status: "Active",
    },
    {
      key: "13",
      account_name: "Cleaning Expenses",
      account_code: "0019",
      account_type: "Cost of Goods Sold",
      description: "Expenses regarding Goods",
      status: "Active",
    },
    {
      key: "14",
      account_name: "Cleaning Expenses",
      account_code: "0019",
      account_type: "Cost of Goods Sold",
      description: "Expenses regarding Goods",
      status: "Active",
    },
    {
      key: "15",
      account_name: "Cleaning Expenses",
      account_code: "0019",
      account_type: "Cost of Goods Sold",
      description: "Expenses regarding Goods",
      status: "Active",
    },
    {
      key: "16",
      account_name: "Cleaning Expenses",
      account_code: "0019",
      account_type: "Cost of Goods Sold",
      description: "Expenses regarding Goods",
      status: "Active",
    },
  ];

  const columnsData = [
    {
      title: "Account Name",
      label: "Account Name",
      dataIndex: "account_name",
      key: "account_name",
      resizable: true,
      fixed: "left",
      align: "left",
      width: "auto",
      showSorterTooltip:{ title: '' },
      sorter: (record1, record2) => {
        return record1.account_name > record2.account_name;
      },
    },

    {
      title: "Account Code",
      label: "Account Code",
      dataIndex: "account_code",
      key: "account_code",
      resizable: true,
      width: "auto",
      align: "left",
      showSorterTooltip:{ title: '' },
     // ellipsis:true,
      textWrap: 'ellipsis' | 'word-break',
      sorter: (record1, record2) => {
        return record1.account_code > record2.account_code;
      },
      render :(text,record)=>
      {
        return <div  style={{marginRight:"117px", display:"flex", justifyContent:"end", textOverflow: 'ellipsis',
        overflow: 'hidden'}}>{text}</div>
      }
    },

    {
      title: "Account Type",
      label: "Account Type",
      dataIndex: "account_type",
      key: "account_type",
      resizable: true,
      fixed: "left",
      align: "left",
      width: "auto",
      showSorterTooltip:{ title: '' },
      sorter: (record1, record2) => {
        return record1.account_type > record2.account_type;
      },
    },
    {
      title: "Description",
      label: "Description",
      dataIndex: "description",
      key: "description",
      resizable: true,
      width: "auto",
      align: "left",
      showSorterTooltip:{ title: '' },
      sorter: (record1, record2) => {
        return record1.module_type > record2.module_type;
      },
    },
    {
      title: "Status",
      label: "Status",
      dataIndex: "status",
      key: "status",
      resizable: true,
      width: 150,
      align: "left",
      showSorterTooltip:{ title: '' },
      sorter: (record1, record2) => {
        return record1.module_type > record2.module_type;
      },
      render: (status, record, text) => (
        <>
        <div style={{display:"flex", alignItems:"center"}}>
        <div 
        className="bullet_item"
        ></div>
          <Typography.Text
            style={
              record.status === "Active"
                ? { color: "#28A745", fontSize: "14px", fontWeight: "600" }
                : ""
            }
          >
            {record.status}
          </Typography.Text>
          <span
            style={{ marginLeft: "46px", display:"flex", alignItems:"center" }}
            //    className={`${this.props.className}-delete`}
            //  onClick={(e) => { this.onDelete(record.key, e); }}
          >
            
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
                    // onClick={() => handleUpdate(record)}
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
  
            {/* <img src={editdelete} /> */}
          </span>
          </div>
        </>
      ),
    },
  ];

  const [columns, setColumns] = useState(columnsData);

  const componentRef = useRef();

  function displaySerachbar() {
    document
      .getElementById("searchbar_container")
      .classList.toggle("container_display");
  }

  // search table functionality

  const handleData = (newData) => {
    setSearch(newData);
  };
  const [search, setSearch] = useState("");

  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  const filteredData = dataSource.filter((record) =>
    record.account_type.toLowerCase().includes(search.toLowerCase())
  );
  return (
    <div className="account-data">
      <Page_heading parent={"Chart of Accounts"} child={"Accounts"} />
      <div className="account-table-container">
        <FilterAndSearchBar
          columns={columnsData}
          setColumns={setColumns}
          addBtnName={"Account"}
          onClick={showModal}
          onData={handleData}
        />
        <Modal
          title="Create Account"
          open={isModalOpen}
          onOk={handleOk}
          width={740}
          bodyStyle={{height:345}}
          onCancel={handleCancel}
          style={{ top: 20 }}
          className={"footerconfirm"}
          footer={[
            <Button
              key="submit"
              type="primary"
              //  onClick={handleSubmit}
              style={{
                width: "88px",
                height: "38px",
                backgroundColor: "#5C5AD0",
                fontSize: "14px",
                fontWeight:"400"
              }}
            //  onClick={() => handleFormSubmit()}
            >
              Submit
            </Button>,
            <Button
              key="cancel"
              onClick={handleCancel}
              style={{
                width: "86px",
                height: "38px",
                fontSize: "14px",
                color: "#8E9CAA",
                border:".5px solid #C2CAD2"
              }}
            >
              Cancel
            </Button>,
          ]}
          closeIcon={
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
          }
        >
          <div style={{padding: "0px 30px 0px 30px"}}>
            <p className="subtitle">Create New Chart of Account according to your Need</p>
            <hr style={{marginTop:"20px"}}/>
        
          <div style={{marginTop:"20px", display:"flex", gap:"20px"}}>
           
           <div>
             <p style={{fontSize: "14px", color: "#566A7F",fontWeight:"400"}}>Account Type</p>
             <SearchDropdown width={330} options={reporting}/>


                 <p style={{marginTop:"18px", fontSize: "14px", color: "#566A7F",fontWeight:"400"}}>Parent Account</p>
                 <SearchDropdown width={330} options={reporting3}/>

               </div> 
           
               <div>
             <p style={{fontSize: "14px", color: "#566A7F",fontWeight:"400"}}>Account Code</p>
             <input
             disabled
                 className="accountcode"
                  type="text"
                  placeholder="0009"
                  name="terms"
                /> 
                 <p style={{marginTop:"18px",fontSize: "14px", color: "#566A7F",fontWeight:"400"}}>Account Name</p>
              <input
              className="parmentaccount"
             
                  type="text"
                 // placeholder="Something about account"
                  name="terms"
                /> 
               </div> 
          </div>
          <div>
          <p style={{marginTop:"18px",fontSize: "14px", color: "#566A7F",fontWeight:"400"}}>Description</p>
              <textarea
              resizable={false}
              className="description"
              style={{width:"668.4px", height:"68.4px", outline:"none"}}
                  type="text"
                  placeholder="Something about account"
                  name="terms"
                /> 
          </div>

          </div>
        </Modal>
        {/* <OffCanvasExample  form={<AccountForm/>}/> */}
        <Table
          ref={componentRef}
          rowSelection={{
            type: "checkbox",
            columnTitle: "",
            selectedRowKeys,
            onChange: (selectedRowKeys, selectedRows) => {
              setSelectedRowKeys(selectedRowKeys);
              setSelectedRows(selectedRows);
            },
          }}
          dataSource={filteredData}
          columns={columns}
          // scroll={{ y: 800, x: 720 }}
          scroll={{ x: "1100px" }}
          //    style={{ width: "100%" }}
          pagination={{
            current: page,
            pageSize: pageSize,
            onChange: (page, pageSize) => {
              setPage(page);
              setPageSize(pageSize);
            },
            total: 100,
          }}
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
                Delete Account
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
  );
}

export default Accounts;
