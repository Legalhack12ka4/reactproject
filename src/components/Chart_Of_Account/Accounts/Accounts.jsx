import { Button, Modal, Popover, Space, Table, Typography } from "antd";
import { React, useState, useRef } from "react";
import FilterAndSearchBar from "../../FilterAndSearchBar/FilterAndSearchBar";
import OffCanvasExample from "../../OffCanvas/OffCanvasExample";
import Page_heading from "../../Page_Heading/Page_heading";
import AccountForm from "../AccountForm/AccountForm";
import "./Accounts.scss";
import editdelete from "../../../assets/Images/Confirmation/editdelete.svg";
import SearchDropdown from "../../AllDropdowns/SearchDropdown/SearchDropdown";

function Accounts() {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [isModalOpen, setIsModalOpen] = useState(false);

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
      <div style={{display:"flex", gap:"10px"}}>
        <div><button style={{height:"38px", width:"80px"}}>Edit</button></div>
        <div><button style={{height:"38px", width:"80px"}}>Delete</button></div>
      </div>
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
          bodyStyle={{height:228}}
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
            {/* <div className="addAccountModalInputContainer">
              <div className="addAccountModalInput">
                <p>Terms</p>
                <input
                  type="text"
                  placeholder="Net 5"
                  name="terms"
                 // value={formData.terms}
                //  onChange={onChange}
                />
              </div>
              <div className="addPaymentTermModalInput">
                <p>Days</p>
                <input
                  type="text"
                  placeholder="5 Days"
                  name="days"
                //  value={formData.days}
                 // onChange={onChange}
                />
              </div>
              <div className="addPaymentTermModalInput">
                <p>Discount %</p>
                <input
                  type="text"
                  placeholder="10%"
                  name="discount"
               //   value={formData.discount}
                //  onChange={onChange}
                />
              </div>
              <div className="addPaymentTermModalInput">
                <p>Interest %</p>
                <input
                  type="text"
                  placeholder="1%"
                  name="interest"
                 // value={formData.interest}
                 // onChange={onChange}
                />
              </div>
            </div> */}
          <div style={{marginTop:"20px", display:"flex", gap:"20px"}}>
           
           <div>
             <p style={{fontSize: "14px", color: "#566A7F",fontWeight:"400"}}>Account Type</p>
             <SearchDropdown width={330} />


                 <p style={{marginTop:"18px", fontSize: "14px", color: "#566A7F",fontWeight:"400"}}>Account Name</p>
              <input
                style={{border: ".5px solid #C2CAD2",
                  width: "329px",
                  height: "37px",
                  borderRadius: "5px",
                marginTop:"8px"}}
                  type="text"
                  placeholder="Net 5"
                  name="terms"
                /> 

               </div> 
           
               <div>
             <p style={{fontSize: "14px", color: "#566A7F",fontWeight:"400"}}>Account Code</p>
             <input
                 className="accountcode"
                  type="text"
                  placeholder="0009"
                  name="terms"
                /> 
                 <p style={{marginTop:"18px",fontSize: "14px", color: "#566A7F",fontWeight:"400"}}>Description</p>
              <input
              className="description"
               
                  type="text"
                  placeholder="Something about account"
                  name="terms"
                /> 
               </div> 
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
      </div>
    </div>
  );
}

export default Accounts;
