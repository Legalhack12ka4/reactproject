import { React, useState, useRef, useEffect } from "react";
import FilterAndSearchBar from "../../FilterAndSearchBar/FilterAndSearchBar";
import Page_heading from "../../Page_Heading/Page_heading";
import "./ModulePaymentTerms.scss";
import Delete from "../../../assets/Images/ModulePaymentTerms/Delete.svg";
import Edit from "../../../assets/Images/ModulePaymentTerms/Edit.svg";
import { Popover, Spin, Table } from "antd";
// import Modal from 'react-modal';
import { Modal, Button } from "antd";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import config from "../../Database/config";
import Swal from "sweetalert2";
import editdelete from "../../../assets/Images/Confirmation/editdelete.svg";
import deletelogo from "../../../assets/Images/ActionStatus/Delete.svg";
import editlogo from "../../../assets/Images/ActionStatus/edit.svg";
import statuslogo from "../../../assets/Images/ActionStatus/status.svg";
import alert from "../../../assets/Images/Confirmation/confirm.svg";
import CustomInput from "../../CustomInput/CustomInput";

const resetValue = {
  terms: "",
  days: "",
  discount: "",
  interest: "",
};

const ModulePaymentTerms = () => {
  let subtitle;
  const [modalIsOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState(resetValue);
  const [paymentterm, setPaymentterm] = useState([]);
    const [page, setPage]=useState(1);
  const [pageSize, setPageSize] = useState(10)
  const [loading, setloading] = useState(true);
  const [confirm, setCofirm] = useState(false);
  const [deleteRecord, setDeleteRecord] = useState(null)
  const [confirmData, setCofirmData] = useState(false); // for popup conformation modal


  //special character validation
const handleInputChange = (evt, property) => {
  let newValue = evt.target.value;

  if (property === 'terms') {
    newValue = newValue.charAt(0).toUpperCase() + newValue.slice(1);
    newValue = newValue.replace(/[^a-zA-Z\d\s]/g, "");
  }
  
  if (property === 'days') {
    newValue = newValue.replace(/[^a-zA-Z\d\s]/g, "");
    var firstNumber = newValue.match(/^\d+/)[0];
    var remainingString = newValue.substr(firstNumber.length + 1);
    remainingString = remainingString.charAt(0).toUpperCase() + remainingString.slice(1);
    newValue = firstNumber + " " + remainingString;
  }
  if (property === 'discount') {
    newValue = newValue.replace(/[^0-9%]/g, "");
    if (newValue.indexOf('%') !== -1) {
      var firstNumber = newValue.match(/^\d+/)[0];
      var percentSymbol = newValue.match(/%/)[0];
      newValue = firstNumber + percentSymbol;
    }
  }
  if (property === 'interest') {
    newValue = newValue.replace(/[^0-9%]/g, "");
    if (newValue.indexOf('%') !== -1) {
      var firstNumber = newValue.match(/^\d+/)[0];
      var percentSymbol = newValue.match(/%/)[0];
      newValue = firstNumber + percentSymbol;
    }
  }
  
  
  setFormData(prevState => ({
    ...prevState,
    [property]: newValue
  }));
};

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


  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    await axios.get(`${config.baseUrl}/paymentterms/`).then((res) => {
      setloading(false);
      setPaymentterm(
        res.data.map((row) => ({
          Key:row.id,
          Terms: row.terms,
          Days: row.days,
          Discount: row.discount,
          Interest: row.interest,
          // id: row.id
        }))
      );
    });
  };
  console.log(paymentterm);

 

  const handleFormSubmit = () => {
    axios
      .post(
        `${config.baseUrl}/paymentterms/`,
        {
          company_name: "Reformiqo",
          terms: formData.terms,
          days: formData.days,
          discount: formData.discount,
          interest: formData.interest,
          is_active: true,
          is_deleted: false,
          company_id: 1,
          created_by: 1,
          updated_by: 1,
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
  };
//delete data
const deleteUser = (record)=>
{
  console.log(record);
  console.log(record.id);
  axios
  .delete(
    `${config.baseUrl}/paymentterms/${record.id}/`);
       getData();
       console.log(paymentterm)
}

  const onChange = (e) => {
    const { value, name } = e.target;

    setFormData({ ...formData, [name]: value });
    console.log(value);
    console.log(name);
  };

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = "#F3F6F9";
  }

  function closeModal() {
    setIsOpen(false);
  }
  const customStyles = {
    content: {
      top: "145px",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      border: "0px !important",
    },
  };

  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);

  const dataSource = paymentterm.map((payments) => ({
    key:payments.Key,
    id:payments.Key,
    terms: payments.Terms,
    days: payments.Days,
    discount: payments.Discount,
    interest: payments.Interest,
  }));

  const columnsData = [
    {
      title: "Terms",
      label: "Terms",
      dataIndex: "terms",
      key: "terms",
      resizable: true,
      fixed: "left",
     width:"26%",
      align: "left",
        sorter:(record1, record2)=>
          {
              return record1.terms > record2.terms
          },
       
    },
    {
      title: "Days",
      label: "Days",
      dataIndex: "days",
      key: "days",
      resizable: true,
      width:"26%",
      align: "left",
        sorter:(record1, record2)=>
          {
              return record1.days > record2.days
          },
         
    },
    {
      title: "Discount",
      label: "Discount",
      dataIndex: "discount",
      key: "discount",
      resizable: true,
      width:"26%",
    //  width: 230,
      align: "left",
        sorter:(record1, record2)=>
          {
              return record1.discount > record2.discount
          },
          
         
    },
    
    {
      title: "Interest",
      label: "Interest",
      dataIndex: "interest",
      key: "interest",
      resizable: true,
      width:"10.5%",
      align: "left",
        sorter:(record1, record2)=>
          {
              return record1.interest > record2.interest
          },
    },
    {
      title: "",
      label: "Action",
      dataIndex: "action",
      key: "action",
      width:60,
      resizable: true,
     
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
        </>
     
      

          ),
      resizable: true,
      width: 230,
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

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleSubmit = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setFormData(resetValue);
    setCofirmData(false)
  };

  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  const filteredData = dataSource.filter((record) =>
    record.terms.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="module-data">
      <Page_heading parent={"List of Modules"} subchild={(<Link exact to= "/module">{"Module"}</Link>)} child={"Payment Terms"} />

      <div className="module-table-container">
        <FilterAndSearchBar
          columns={columnsData}
          addBtnName={"Payment Terms"}
          onClick={showModal}
          onData={handleData}
        />
        {/* <button onClick={openModal}>Open Modal</button> */}
        {/* <OffCanvasExample  form={<Contacts/>}/> */}
        <Modal
          title="Add Payment Terms"
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
                width: "80px",
                height: "38px",
                backgroundColor: "#5C5AD0",
                fontSize: "14px",
                fontWeight:"500"
              }}
              onClick={() => handleFormSubmit()}
            >
              Submit
            </Button>,
            <Button
              key="cancel"
              className="btn_hover_animation"
              onClick={handleConfirmData}
              style={{
                width: "80px",
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
              Create Payment Term according to use
            </p>
            <hr style={{border: "1px solid #eceef1", marginTop:"20px"}}/>
            <div className="addPaymentTermModalInputContainer">
              <div className="addPaymentTermModalInput">
                <p>Terms</p>
                <CustomInput
                  className=" focus-outline"
                  type="text"
                  placeholder="Net 5"
                  name="terms"
                  inputType={"AlphaNumericUpperCase"}
                  value={formData.terms}
                     onChange={(e, newValue) => 
                     setFormData(prevState => ({
                          ...prevState,
                          "terms": newValue
                        }))}
              />
                {/* <input
                className=" focus-outline"
                  type="text"
                  placeholder="Net 5"
                  name="terms"
                  value={formData.terms}
                  onChange={(e) => {onChange(e); handleInputChange(e, "terms")}}
                /> */}
              </div>
              <div className="addPaymentTermModalInput">
                <p>Days</p>
                <CustomInput
                  className=" focus-outline"
                  type="text"
                  placeholder="5 Days"
                  name="days"
                  inputType={"AlphaNumericUpperCase"}
                  value={formData.days}
                     onChange={(e, newValue) => 
                     setFormData(prevState => ({
                          ...prevState,
                          "days": newValue
                        }))}
              />
                {/* <input
                className="currency  focus-outline"
                  type="text"
                  placeholder="5 Days"
                  name="days"
                  value={formData.days}
                  onChange={(e) => {onChange(e); handleInputChange(e, "days")}}
                /> */}
              </div>
              <div className="addPaymentTermModalInput">
                <p>Discount %</p>
                <CustomInput
                  className=" focus-outline"
                  type="text"
                  placeholder="10%"
                  name="discount"
                  inputType={"NumericPercentage"}
                  value={formData.discount}
                     onChange={(e, newValue) => 
                     setFormData(prevState => ({
                          ...prevState,
                          "discount": newValue
                        }))}
              />
                {/* <input
                   className=" focus-outline"
                  type="text"
                  placeholder="10%"
                  name="discount"
                  value={formData.discount}
                  onChange={(e) => {onChange(e); handleInputChange(e, "discount")}}
                /> */}
              </div>
              <div className="addPaymentTermModalInput">
                <p>Interest %</p>
                <CustomInput
                  className=" focus-outline"
                  type="text"
                  placeholder="1%"
                  name="interest"
                  inputType={"NumericPercentage"}
                  value={formData.interest}
                     onChange={(e, newValue) => 
                     setFormData(prevState => ({
                          ...prevState,
                          "interest": newValue
                        }))}
              />
                {/* <input
                   className=" focus-outline"
                  type="text"
                  placeholder="1%"
                  name="interest"
                  value={formData.interest}
                  onChange={(e) => {onChange(e); handleInputChange(e, "interest")}}
                /> */}
              </div>
            </div>
          </div>
        </Modal>

        {/* {loading ? (
        "Loading"
      ) : ( */}
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
            total: paymentterm.length,
            showTotal: (total, range) =>
              `Showing ${range[1]}-${range[1]} of ${total} PaymentTerms`,
          }}
          rowClassName={(record) =>
            record.key % 2 === 0 ? "highlight_row" : ""
          }
          search={{
            keyword: search,
          }}
          
        />
               {/* )} */}
        <ToastContainer/>
        <Modal
        open={confirm}
     //   onOk={handleMaterialOk}
        width={"max-content"}
        onCancel={handleConfirm}
        style={{ top: 0 }}
   //   className={"footerconfirm1"}
        className={"deleteconfirm"}
        footer={[
          <div style={{ marginLeft: "331px" }}>
            <Button
              key="cancel"
              onClick={handleConfirm}
              className="btn_hover_animation"
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
              className="btn_hover_animation"
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
                Delete PaymentTerms
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
        style={{ top: 20 }}
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
};

export default ModulePaymentTerms;
