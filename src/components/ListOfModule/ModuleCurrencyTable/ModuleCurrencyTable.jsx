import { React, useState, useRef, useEffect } from "react";
import FilterAndSearchBar from '../../FilterAndSearchBar/FilterAndSearchBar'
import Page_heading from '../../Page_Heading/Page_heading'
import "./ModuleCurrencyTable.scss"
import Delete from "../../../assets/Images/ModulePaymentTerms/Delete.svg";
import Edit from "../../../assets/Images/ModulePaymentTerms/Edit.svg"
import { Popover, Spin, Table } from "antd";
import {Modal, Button } from "antd";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import config from "../../Database/config";
import editdelete from "../../../assets/Images/Confirmation/editdelete.svg";
import deletelogo from "../../../assets/Images/ActionStatus/Delete.svg";
import editlogo from "../../../assets/Images/ActionStatus/edit.svg";
import statuslogo from "../../../assets/Images/ActionStatus/status.svg";
import alert from "../../../assets/Images/Confirmation/confirm.svg";

const resetValue = {

   currency_name: "" ,
   symbol:"",
   country_name:""
  };

const ModuleCurrencyTable = () => {
  let subtitle;
  const [modalIsOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState(resetValue);
  const [currency, setCurrency] = useState([]);
  const [page, setPage]=useState(1);
  const [pageSize, setPageSize] = useState(10)
  const [confirm, setCofirm] = useState(false);
  const [deleteRecord, setDeleteRecord] = useState(null)
  const [confirmData, setCofirmData] = useState(false); // for popup conformation modal

//cofirmation modal 
const handleConfirmData = () => {
  setCofirmData(true);
 // setPopOverVisible(false)
};


const handleConfirmDataClose = () => {
  setCofirmData(false);
  // setPopOverVisible(false)
};



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
  
    const handleSubmitModal = () =>
    {
    //  alert("Data", record)
      deleteUser(deleteRecord);
      getData();
      setCofirm(false);
      getData();
    }


  const [loading, setloading] = useState(true);
  useEffect(() => {
    getData();
    
  }, []);


  //get data
  const getData = async () => {

    await axios.get(`${config.baseUrl}/currency/`).then(
      res => {
        setloading(false);
        setCurrency(
          res.data.map(row => ({
            Key:row.id,
            Currency_Name: row.currency_name,
            Symbol: row.symbol,
            Country_Name: row.country_name,
           
                  
      }))
    );
  });
}
  console.log(currency)

//   const notify =() =>
//  ("Wow")
//add data


//INsert and update data
const handleFormSubmit = () => {

  //Update data
if (formData.id)
{
  axios
    .put(
      `${config.baseUrl}/currency/` + formData.id + "/",
      {
    
        currency_name: formData.currency_name,
        symbol: formData.symbol,
        country_name: formData.country_name,
        currency_from:"USD",
        currency_to:"INR",
       // time_stamp:new Date().toLocaleString(),
        "time_stamp": "2022-12-30T13:37:00Z",
        "amount": "1",
        "is_active": true,
        "is_deleted": false,
        "created_by": 1,
        "updated_by": 1
      },
      formData
    )
    .then((response) => {
      closeModal();
      handleCancel();
      getData();
      toast.success("Updated Successfuly", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
      });
    
     
    });
}
else{
  //insert data
  axios
    .post(
      `${config.baseUrl}/currency/`,
      {
        currency_name: formData.currency_name,
        symbol: formData.symbol,
        country_name: formData.country_name,
        currency_from:"USD",
        currency_to:"INR",
       // time_stamp:new Date().toLocaleString(),
        "time_stamp": "2022-12-30T13:37:00Z",
        "amount": "1",
        "is_active": true,
        "is_deleted": false,
        "created_by": 1,
        "updated_by": 1
      },
      formData
    )
    .then((response) => {
      closeModal();
      handleCancel();
      getData();
      toast.success("Added Successfuly", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
      });
    
     
    });
  }
}

//delete data
const deleteUser = (record)=>
{
  console.log(record);
  console.log(record.id);
  axios
  .delete(
    `${config.baseUrl}/currency/${record.id}/`);
       getData();
       console.log(currency)
}


const onChange = (e) => {
  const { value, name } = e.target;

  setFormData({ ...formData, [name]: value });
  console.log(value);
  console.log(name);
};
console.log(formData)

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = '#F3F6F9';
  }

  function closeModal() {
    setIsOpen(false);
    setFormData(resetValue);
  }

  const customStyles = {
    content: {
      top: '145px',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      border:'0px !important'
    },
  };

    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [selectedRows, setSelectedRows] = useState([]);

   const dataSource = 
      currency.map (cur =>
       ( {
         key:cur.Key,
         id:cur.Key,
          currency_name: cur.Currency_Name,
          symbol:cur.Symbol,
          country_name:cur.Country_Name,
        }));

      const columnsData = [
        // {
        
        //   title: "Id",
        //   label: "Id",
        //   dataIndex: "id",
        //   key: "id",
        //   resizable: true,
        //   fixed: "left",
        //   align: "left",
         
        // },
        {
         
          title: "Currency Code",
          label: "Currency Code",
          dataIndex: "currency_name",
          key: "currency_name",
          resizable: true,
          fixed: "left",
          align: "left",
          sorter:(record1, record2)=>
          {
              return record1.currency_name > record2.currency_name
          },
          // filters:[
          //   {text:'USD', value:'USD'},
          //   {text:'INR', value:'INR'}
          // ],
          // // filterMultiple:false,
          // onFilter:(value,record)=>
          // {
          //   return record.currency_name === value
          // }
          // width: 60,
        },
        {
          title: "Currency Symbol",
          label: "Currency Symbol",
          dataIndex: "symbol",
          key: "symbol",
          resizable: true,
          // width: 60,
          align: "left",
          sorter:(record1, record2)=>
          {
              return record1.symbol > record2.symbol
          },
          // filters:[
          //   {text:'₹', value:'₹'},
          //   {text:'$', value:'$'}
          // ],
          // // filterMultiple:false,
          // onFilter:(value,record)=>
          // {
          //   return record.symbol === value
          // }
        },
        {
          title: "Currency Name",
          label: "Currency Name",
          dataIndex: "country_name",
          key: "country_name",
          resizable: true,
          width: 230,
          align: "left",
          sorter:(record1, record2)=>
          {
              return record1.country_name > record2.country_name
          },
          // filters:[
          //   {text:'India', value:'India'},
          //   {text:'Usa', value:'Usa'}
          // ],
          // // filterMultiple:false,
          // onFilter:(value,record)=>
          // {
          //   return record.country_name === value
          // }
        },
        {
          title: "",
          label: "Action",
          dataIndex: "action",
          key: "action",
          width: 60,
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
                  //  onClick={(e) =>
                  //    Swal.fire({
                  //      title: "Are you sure?",
                  //      text: "Once deleted, you will not be able to recover!",
                  //      icon: "warning",
                  //      showCancelButton: true,
                  //      confirmButtonColor: "#3085d6",
                  //      cancelButtonColor: "#d33",
                  //      confirmButtonText: "Yes, delete it!",
                  //    }).then((result) => {
                  //     getData();
                  //      if (result.isConfirmed) {
                  //       getData();
                  //        console.log(result.isConfirmed)
                  //      // getData();
                  //        if (deleteUser(record)) {
                  //        // alert("2",getData())
                  //          toast.warning("Deleted Successfuly", {
                  //            position: "top-right",
                  //            autoClose: 2000,
                  //            hideProgressBar: false,
                  //            closeOnClick: true,
                  //            pauseOnHover: false,
                  //            draggable: true,
                  //            progress: undefined,
                  //          });
                  //        }
                  //      }
                  //    })
                    
                   //}
                  
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
  }
  const [search, setSearch] = useState('');

  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  const filteredData = dataSource.filter((record) =>
    record.currency_name.toLowerCase().includes(search.toLowerCase())
  );

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleSubmit = () => {
    setIsModalOpen(false);
  };
  

  //Get data in textbox on edit button
  const handleUpdate = (oldData) => {
    console.log(oldData);
    console.log(oldData.id);
    setFormData(oldData);
    showModal();
  };


  const handleCancel = () => {
    setIsModalOpen(false);
    setFormData(resetValue);
    setCofirmData(false)
  };


  return (
    <div className="module-data">
      <Page_heading parent={"List of Modules"} subchild={(<Link exact to= "/module">{"Module"}</Link>)} child={"Currency Table"} />

      <div className="module-table-container">
        <FilterAndSearchBar
          columns={columnsData}
          setColumns={setColumns}
          addBtnName={"Currency"}
          onClick={showModal}
          onData={handleData}
        />
        {/* <OffCanvasExample  form={<Contacts/>}/> */}
        <Modal
          title= {formData.id ? "Update Currency" : "Add Currency"}
          open={isModalOpen}
          onOk={handleOk}
          width={764}
          onCancel={handleConfirmData}
          style={{ top: 0 }}
         className={"footerconfirm1"}
          footer={[
            <Button
              key="submit"
              type="primary"
              className="btn_hover_animation"
              //  onClick={handleSubmit}
              style={{
                width: "92px",
                height: "38px",
                backgroundColor: "#5C5AD0",
                fontSize: "14px",
                fontWeight:"500"
              }}
              onClick={() => handleFormSubmit()}
            >
             {formData.id?"Update":"Submit"} 
            </Button>,
            <Button
              key="cancel"
           //   onClick={handleCancel}
           className="btn_hover_animation"
              onClick={handleConfirmData}
              style={{
                width: "92px",
                height: "38px",
                fontSize: "14px",
                color: "#697a8d",
                borderColor: "#8E9CAA",
                fontWeight:"500"
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
          <div className="addPaymentTermModal">
          <p className="subtitle">
              Create Currency according to use
            </p>
            <hr style={{border: "1px solid #eceef1", marginTop:"20px"}}/>
            <div className="addPaymentTermModalInputContainer">
              <div className="addPaymentTermModalInput">
                <p>Currency Code</p>
                <input
                className="currency"
                  type="text"
                  placeholder="INR"
                  name="currency_name"
                  value={formData.currency_name}
                  onChange={onChange}
                />
              </div>
              <div className="addPaymentTermModalInput">
                <p>Currency Symbol</p>
                <input
                   className="currency"
                  type="text"
                  placeholder="₹"
                  name="symbol"
                  value={formData.symbol}
                  onChange={onChange}
                />
              </div>
              <div className="addPaymentTermModalInput">
                <p>Currency Name</p>
                <input
                   className="currency"
                  type="text"
                  placeholder="Indian Rupee"
                  name="country_name"
                  value={formData.country_name}
                  onChange={onChange}
                />
              </div>
            </div>
          </div>
        </Modal>

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
          loading={{indicator : <div><Spin/></div>, spinning:loading}}
          dataSource={filteredData}
          columns={columns}
          pagination={!loading &&{
            current: page,
            pageSize: pageSize,
            onChange: (page, pageSize) => {
              setPage(page);
              setPageSize(pageSize);
            },
            total: currency.length,
            showTotal: (total, range) =>
              `Showing ${range[1]}-${range[1]} of ${total} Currency`,
          }}
          rowClassName={(record) =>
            record.key % 2 === 0 ? "highlight_row" : ""
          }
          search={{
            keyword: search,
          }}
        />
        <ToastContainer/>
         {/* <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover={false}
      /> */}
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
              className="btn_hover_animation"
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
              className="btn_hover_animation"
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
                Delete Currency
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
         {/* Confirmation */}

         <Modal
        open={confirmData}
       // onOk={handleMaterialOk}
        width={"max-content"}
        onCancel={handleConfirmDataClose}
        style={{ top: 0 }}
        className={"deleteconfirm"}
        footer={[
          <div style={{ marginLeft: "331px" }}>
            <Button
              key="cancel"
              className="btn_hover_animation"
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
              className="btn_hover_animation"
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
      </Modal>
      </div>
    </div>
  );
}

export default ModuleCurrencyTable