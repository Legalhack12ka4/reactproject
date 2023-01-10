import { React, useState, useRef, useEffect } from "react";
import FilterAndSearchBar from "../../FilterAndSearchBar/FilterAndSearchBar";
import Page_heading from "../../Page_Heading/Page_heading";
import "./ModulePaymentTerms.scss";
import Delete from "../../../assets/Images/ModulePaymentTerms/Delete.svg";
import Edit from "../../../assets/Images/ModulePaymentTerms/Edit.svg";
import { Spin, Table } from "antd";
// import Modal from 'react-modal';
import { Modal, Button } from "antd";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";

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

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    await axios.get("http://127.0.0.1:8000/paymentterms/").then((res) => {
      setloading(false);
      setPaymentterm(
        res.data.map((row) => ({
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
        "http://127.0.0.1:8000/paymentterms/",
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
      align: "left",
        sorter:(record1, record2)=>
          {
              return record1.terms > record2.terms
          },
          // filters:[
          //   {text:'Net 5', value:'Net 5'},
          //   {text:'Net 6', value:'Net 6'}
          // ],
          // // filterMultiple:false,
          // onFilter:(value,record)=>
          // {
          //   return record.terms === value
          // }
    },
    {
      title: "Days",
      label: "Days",
      dataIndex: "days",
      key: "days",
      resizable: true,
      // width: 60,
      align: "left",
        sorter:(record1, record2)=>
          {
              return record1.days > record2.days
          },
          // filters:[
          //   {text:'5 Days', value:'5 Days'},
          //   {text:'50 ', value:'50 Days'}
          // ],
          // // filterMultiple:false,
          // onFilter:(value,record)=>
          // {
          //   return record.days === value
          // }
    },
    {
      title: "Discount",
      label: "Discount",
      dataIndex: "discount",
      key: "discount",
      resizable: true,
      width: 230,
      align: "right",
        sorter:(record1, record2)=>
          {
              return record1.discount > record2.discount
          },
          // filters:[
          //   {text:'10%', value:'10%'},
          //   {text:'2%', value:'2%'}
          // ],
          // // filterMultiple:false,
          // onFilter:(value,record)=>
          // {
          //   return record.discount === value
          // }
    },
    {
      title: "Interest",
      label: "Interest",
      dataIndex: "interest",
      key: "interest",
      resizable: true,
      // width: 60,
      align: "right",
        sorter:(record1, record2)=>
          {
              return record1.interest > record2.interest
          },
          // filters:[
          //   {text:'2%', value:'2%'},
          //   {text:'2%', value:'2%'}
          // ],
          // // filterMultiple:false,
          // onFilter:(value,record)=>
          // {
          //   return record.interest === value
          // }
    },

    // {
    //   title: "Action",
    //   label: "Action",
    //   dataIndex: "action",
    //   key: "action",
    //   resizable: true,
    //   width: 260,
    //   align: "left",
    // },
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
          onCancel={handleCancel}
          style={{ top: 20 }}
          footer={[
            <Button
              key="submit"
              type="primary"
              //  onClick={handleSubmit}
              style={{
                width: "80px",
                height: "38px",
                backgroundColor: "#5C5AD0",
                fontSize: "12px",
              }}
              onClick={() => handleFormSubmit()}
            >
              Submit
            </Button>,
            <Button
              key="cancel"
              onClick={handleCancel}
              style={{
                width: "80px",
                height: "38px",
                fontSize: "12px",
                color: "#8E9CAA",
                borderColor: "#8E9CAA",
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
            <hr />
            <div className="addPaymentTermModalInputContainer">
              <div className="addPaymentTermModalInput">
                <p>Terms</p>
                <input
                  type="text"
                  placeholder="Net 5"
                  name="terms"
                  value={formData.terms}
                  onChange={onChange}
                />
              </div>
              <div className="addPaymentTermModalInput">
                <p>Days</p>
                <input
                  type="text"
                  placeholder="5 Days"
                  name="days"
                  value={formData.days}
                  onChange={onChange}
                />
              </div>
              <div className="addPaymentTermModalInput">
                <p>Discount %</p>
                <input
                  type="text"
                  placeholder="10%"
                  name="discount"
                  value={formData.discount}
                  onChange={onChange}
                />
              </div>
              <div className="addPaymentTermModalInput">
                <p>Interest %</p>
                <input
                  type="text"
                  placeholder="1%"
                  name="interest"
                  value={formData.interest}
                  onChange={onChange}
                />
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
            pagination={{
            current:page,
            pageSize:pageSize, 
            onChange:(page, pageSize)=>
            {
              setPage(page);
              setPageSize(pageSize)
            },
            total:100}}
          rowClassName={(record) =>
            record.key % 2 === 0 ? "highlight_row" : ""
          }
          search={{
            keyword: search,
          }}
          
        />
               {/* )} */}
        <ToastContainer/>
      </div>
    </div>
  );
};

export default ModulePaymentTerms;
