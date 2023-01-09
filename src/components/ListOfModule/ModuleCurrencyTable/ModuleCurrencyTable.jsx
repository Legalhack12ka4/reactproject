import { React, useState, useRef, useEffect } from "react";
import FilterAndSearchBar from '../../FilterAndSearchBar/FilterAndSearchBar'
import Page_heading from '../../Page_Heading/Page_heading'
import "./ModuleCurrencyTable.scss"
import Delete from "../../../assets/Images/ModulePaymentTerms/Delete.svg";
import Edit from "../../../assets/Images/ModulePaymentTerms/Edit.svg"
import { Table } from "antd";
import {Modal, Button } from "antd";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Swal from "sweetalert2";

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

  const [loading, setloading] = useState(true);
  useEffect(() => {
    getData();
  }, []);


  //get data
  const getData = async () => {

    await axios.get("http://127.0.0.1:8000/currency/").then(
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
      "http://127.0.0.1:8000/currency/" + formData.id + "/",
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
      "http://127.0.0.1:8000/currency/",
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
    "http://127.0.0.1:8000/currency/" + record.id + "/");
       getData();
       console.log(currency)
}


console.log(currency.Id)

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
        {
        
          title: "Id",
          label: "Id",
          dataIndex: "id",
          key: "id",
          resizable: true,
          fixed: "left",
          align: "left",
         
        },
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
          filters:[
            {text:'USD', value:'USD'},
            {text:'INR', value:'INR'}
          ],
          // filterMultiple:false,
          onFilter:(value,record)=>
          {
            return record.currency_name === value
          }
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
          filters:[
            {text:'₹', value:'₹'},
            {text:'$', value:'$'}
          ],
          // filterMultiple:false,
          onFilter:(value,record)=>
          {
            return record.symbol === value
          }
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
          filters:[
            {text:'India', value:'India'},
            {text:'Usa', value:'Usa'}
          ],
          // filterMultiple:false,
          onFilter:(value,record)=>
          {
            return record.country_name === value
          }
        },
        {
          title: "Action",
          label: "Action",
          dataIndex: "action",
          key: "action",
          render: (text, record) => (
         
            <span style={{display:"flex"}}>
            <Button
               className="btn btn-primary mx-2 my-2"
                onClick={() => handleUpdate(record)}
            >
              Edit
            </Button>
         
            <button 
             style={{marginLeft:"20px"}}
              onClick={() =>
                Swal.fire({
                  title: "Are you sure?",
                  text: "Once deleted, you will not be able to recover!",
                  icon: "warning",
                  showCancelButton: true,
                  confirmButtonColor: "#3085d6",
                  cancelButtonColor: "#d33",
                  confirmButtonText: "Yes, delete it!",
                }).then((result) => {
                  if (result.isConfirmed) {
                    if (deleteUser(record)) {
                      getData();
                      toast.success("Deleted Successfuly", {
                        position: "top-right",
                        autoClose: 2000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: false,
                        draggable: true,
                        progress: undefined,
                      });
                    }
                  }
                })
              }
            >
           Delete
            </button>
        </span>

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
  };


  return (
    <div className="module-data">
      <Page_heading parent={"List of Modules"} child={"Currency Table"} />

      <div className="module-table-container">
        <FilterAndSearchBar
          columns={columnsData}
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
             {formData.id?"Update":"Submit"} 
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
                <p>Currency Code</p>
                <input
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
      </div>
    </div>
  );
}

export default ModuleCurrencyTable