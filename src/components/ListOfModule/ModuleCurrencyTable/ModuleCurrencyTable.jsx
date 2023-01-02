import { React, useState, useRef, useEffect } from "react";
import FilterAndSearchBar from '../../FilterAndSearchBar/FilterAndSearchBar'
import Page_heading from '../../Page_Heading/Page_heading'
import "./ModuleCurrencyTable.scss"
import Delete from "../../../assets/Images/ModulePaymentTerms/Delete.svg";
import Edit from "../../../assets/Images/ModulePaymentTerms/Edit.svg"
import { Table } from "antd";
import {Modal, Button } from "antd";
import axios from "axios";

const ModuleCurrencyTable = () => {
  let subtitle;
  const [modalIsOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [currency, setCurrency] = useState([]);
  const [loading, setloading] = useState(true);
  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    await axios.get("http://127.0.0.1:8000/currency/").then(
      res => {
        setloading(false);
        setCurrency(
          res.data.map(row => ({
            Currency_Name: row.currency_name,
            Symbol: row.symbol,
            Country_Name: row.country_name
          }))
        );
      }
    );
  };
  console.log(currency)

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = '#F3F6F9';
  }

  function closeModal() {
    setIsOpen(false);
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
          currency_name: cur.Currency_Name,
          symbol:cur.Symbol,
          country_name:cur.Country_Name,
        }));

      const columnsData = [
        {
          title: "Currency Code",
          label: "Currency Code",
          dataIndex: "currency_name",
          key: "currency_name",
          resizable: true,
          fixed: "left",
          align: "left",
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
        },
        {
          title: "Currency Name",
          label: "Currency Name",
          dataIndex: "country_name",
          key: "country_name",
          resizable: true,
          width: 230,
          align: "left",
        },
    
        {
          title: "Action",
          label: "Action",
          dataIndex: "action",
          key: "action",
          resizable: true,
          width: 260,
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
  

  const handleCancel = () => {
    setIsModalOpen(false);
  };


  return (
    <div className='module-data'>
        <Page_heading  parent={"List of Modules"} child={"Currency Table"}/>

        <div className="module-table-container">
        <FilterAndSearchBar columns={columnsData} addBtnName={"Currency"} onClick={showModal} onData={handleData} />
        {/* <OffCanvasExample  form={<Contacts/>}/> */}
        <Modal
                title="Add Currency"
                open={isModalOpen}
                onOk={handleOk}
                width={764}
                onCancel={handleCancel}
                style={{ top: 20 }}
                footer={[
                  <Button
                    key="submit"
                    type="primary"
                    onClick={handleSubmit}
                    style={{
                      width: "80px",
                      height: "38px",
                      backgroundColor: "#5C5AD0",
                      fontSize: "12px",
                    }}
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
                      <p>Currency Code</p>
                      <input type="text" placeholder="INR"/>
                      </div>
                      <div className="addPaymentTermModalInput">
                      <p>Currency Symbol</p>
                      <input type="text" placeholder="₹"/>
                      </div>
                      <div className="addPaymentTermModalInput">
                      <p>Currency Name</p>
                      <input type="text" placeholder="Indian Rupee"/>
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
            // scroll={{ y: 800, x: 720 }}
        //    style={{ width: "100%" }}
            rowClassName={(record) =>
              record.key % 2 === 0 ? "highlight_row" : ""
            }
            search={{
              keyword: search,
            }}
          />
        </div>
    </div>
  )
}

export default ModuleCurrencyTable