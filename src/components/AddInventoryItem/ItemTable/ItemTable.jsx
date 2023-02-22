import { Popover, Table, Typography } from "antd";
import { React, useState, useRef, useEffect } from "react";
import FilterAndSearchBar from "../../FilterAndSearchBar/FilterAndSearchBar";
import Page_heading from "../../Page_Heading/Page_heading";
import { toast, ToastContainer } from "react-toastify";
import editdelete from "../../../assets/Images/Confirmation/editdelete.svg";
import deletelogo from "../../../assets/Images/ActionStatus/Delete.svg";
import editlogo from "../../../assets/Images/ActionStatus/edit.svg";
import statuslogo from "../../../assets/Images/ActionStatus/status.svg";
import shirt from "../../../assets/Images/ItemPreview/Shirt1.svg"
import { Link, useLocation } from "react-router-dom";

function ItemTable() {

    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [selectedRows, setSelectedRows] = useState([]);
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [loading, setloading] = useState(true);
    const componentRef = useRef();

    const location = useLocation();

    const dataSource = [
        {
          key: "1",
          item_name: "Gray Grick Shirt",
          group_name: "Grick Shirt",
          foreign_name:"CK Gray Shirt",
          barcode: "GS-GG-0001",
          hsn_code:"61051010",
          status:"Active",
          price:"₹499.00",
          uom: "Pcs",
        
       
        },
        {
            key: "2",
            item_name: "Polo White Perl",
            group_name: "Polo Shirt",
            foreign_name:"Polo Black",
            barcode: "GS-GG-0001",
            hsn_code:"61051010",
            status:"Active",
            price:"₹899.00",
            uom: "Pcs",
          },
         
          {
            key: "3",
            item_name: "CK Coral",
            group_name: "Grick Shirt",
            foreign_name:"CK Gray Shirt",
            barcode: "GS-GG-0001",
          hsn_code:"61051010",
          status:"Inactive",
          price:"₹999.00",
          uom: "Pcs",
          },
          {
            key: "4",
            item_name: "Polo Coral",
            group_name: "Polo Shirt",
            foreign_name:"Polo Red",
            barcode: "GS-GG-0001",
            hsn_code:"61051010",
            status:"Active",
            price:"₹1.20 K",
            uom: "Pcs",
          },
          {
            key: "5",
            item_name: "Gray Grick Shirt",
            group_name: "Grick Shirt",
            foreign_name:"CK Gray Shirt",
            barcode: "GS-GG-0001",
            hsn_code:"61051010",
            status:"Inactive",
            price:"₹2.10 K",
            uom: "Pcs",
          },
          {
            key: "6",
            item_name: "Gray Grick Shirt",
            group_name: "Grick Shirt",
            foreign_name:"CK Gray Shirt",
            barcode: "GS-GG-0001",
            hsn_code:"61051010",
            status:"Active",
            price:"₹0.9 K",
            uom: "Pcs",
          },
          
       
      ];
    
      const columnsData = [
        {
          title: "Item Name",
          label: "Item Name",
          dataIndex: "item_name",
          key: "item_name",
          resizable: true,
          fixed: "left",
          align: "left",
          width: 220,
          render: (text, record) => {
            return (
              <div style={{display:"flex", gap:"5px", alignItems:"center"}}>
                <div style={{width:"36px", height:"36px", borderRadius:"50%"}}>
                <img src={shirt} alt="" style={{width:"36px", height:"36px", borderRadius:"50%"}}/>
                </div>
              <div
                style={{
                    color:'#5C5AD0',
                    fontWeight:"600"
                }}
              >
                {record.item_name}
              </div>
              </div>
            );
          },
        },
        {
          title: "Group Name",
          label: "Group Name",
          dataIndex: "group_name",
          key: "group_name",
          width: 140,
         
        },
        {
          title: "Foreign Name",
          label: "Foreign Name",
          dataIndex: "foreign_name",
          key: "foreign_name",
          width: 140,
        },
        {
          title: "Barcode",
          label: "Barcode",
          dataIndex: "barcode",
          key: "barcode",
          width: 140,
        },
        {
          title: "HSN Code",
          label: "HSN Code",
          dataIndex: "hsn_code",
          key: "hsn_code",
          width: 130,
        },
        {
          title: "Status",
          label: "Status",
          dataIndex: "status",
          key: "status",
          width: 120,
          render: (status, record, text) => (
              <>
                <div style={{ display: "flex", alignItems: "center" }}>
                  {record.status === "Active" ? <div className="bullet_item"></div> :
                  <div className="bullet_itemred"></div>}
                  <Typography.Text
                    style={
                      record.status === "Active"
                        ? { color: "#28A745", fontSize: "14px", fontWeight: "600" }
                        :  { color: "#DA2F58", fontSize: "14px", fontWeight: "600" }
                    }
                  >
                    {record.status}
                  </Typography.Text>
                </div>
              </>
            ),
          
        },
        {
          title: "Price",
          label: "Price",
          dataIndex: "price",
          key: "price",
          width: 110,
          render: (status, record, text) => (
            <>
              <div style={{color:"#566A7F", fontWeight:"700"}}>
                {record.price}
              </div>
            </>
          ),
        },
  
        {
          title: "UOM",
          label: "UOM",
          dataIndex: "uom",
          key: "uom",
          width: 100,
        },
       
      
          {
            title: "",
            label: "Action",
            dataIndex: "action",
            key: "action",
            resizable: true,
            fixed: "right",
            align: "center",
            width: 40,
            render: (text, record) => (
              <>
              <Popover  id="popoverhide" 
            getPopupContainer={(trigger) => trigger.parentElement} showArrow={false}
             content={
                       <>
                 
                       <div style={{display:"flex", alignItems:"center", gap:"11px", marginBottom:"10px"}}>  
                       <img src={deletelogo} />
                       <div>
                       <button 
                       className="actionlabel"
                    //   onClick={() => { handleConfirmCancel(record); hide(); }}
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
              <img src={editdelete} style={{cursor:"pointer", position:"absolute",top:"20px"}} />
              </Popover>
                
              </>
           
            
      
                ),
            resizable: true,
            align: "left",
          },
      ];

      const [columns, setColumns] = useState(columnsData);
 // search table functionality

 const handleData = (newData) => {
    setSearch(newData);
  };
  const [search, setSearch] = useState("");

  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  const filteredData = dataSource.filter((record) =>
    record.item_name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="account-data">
    <Page_heading  parent={"Items & Services"} 
      //  subchild={
      //   <Link exact to="/item_&_service">
      //     {"Back"}
      //   </Link>
      // }
      child={location.pathname === "/itemtable" ? "Raw Material & Traded Items" : 
          location.pathname === "/itemtable1" ? "No Traded Items" : 
          location.pathname === "/itemtable2" ? "Manufactured Items" : 
          location.pathname === "/itemtable3" ? "Item Received for Jobwork" : 
          location.pathname === "/itemtable4" ? "Services" : 
          location.pathname === "/itemtable5" ? "Fixed Assets" : ""
          }/>
    <div className="account-table-container">
      <FilterAndSearchBar
        columns={columnsData}
        setColumns={setColumns}
      //  addBtnName={"Goods & Services"}
     //   onClick={showModal}
        onData={handleData}
      />
   

      {/* <OffCanvasExample  form={<AccountForm/>}/> */}
      <Table
        ref={componentRef}
        rowSelection={{
          type: "checkbox",
          columnTitle: "",
          columnWidth: "40px",
          selectedRowKeys,
          onChange: (selectedRowKeys, selectedRows) => {
            setSelectedRowKeys(selectedRowKeys);
            setSelectedRows(selectedRows);
          },
        }}
        dataSource={filteredData}
        columns={columns}
        // scroll={{ y: 800, x: 720 }}
        scroll={{ x: "800px" }}
        //    style={{ width: "100%" }}
        //  loading={true}
        pagination={
          {
            current: page,
            pageSize: pageSize,
            onChange: (page, pageSize) => {
              setPage(page);
              setPageSize(pageSize);
            },
            total: 60,
            showTotal: (total, range) =>
              `Showing ${range[1]}-${range[1]} of ${total} Items`,
          }
        }
        rowClassName={(record) =>
          record.key % 2 === 0 ? "highlight_row" : ""
        }
        search={{
          keyword: search,
        }}
      />
      {/* <Modal
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
              onClick={handleSubmitModal}
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
      </Modal> */}

      {/* Confirmation */}
      {/* {formData && Object.values(formData).some(val => val !== "") && ( */}
      {/* <Modal
        open={confirmData}
        // onOk={handleMaterialOk}
        width={"max-content"}
        onCancel={handleConfirmDataClose}
        style={{ top: 20 }}
        className={"deleteconfirm"}
        footer={[
          <div style={{ marginLeft: "331px" }}>
            <Button
              key="cancel"
              onClick={handleConfirmDataClose}
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
              onClick={handleCancel}
              style={{
                width: "88px",
                height: "38px",
                backgroundColor: "#DA2F58",
                fontSize: "14px",
                fontWeight: "700",
                color: "#FFFFFF",
              }}
            >
              Submit
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
                Warning
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
      </Modal> */}
      <ToastContainer />
      {/* // )} */}
    </div>
  </div>
  )
}

export default ItemTable
