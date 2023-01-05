import { React, useState, useRef,useEffect } from "react";
import {useNavigate} from "react-router-dom";
import Page_heading from "../Page_Heading/Page_heading";
import "./Customers.scss";
import { Table } from "antd";
import axios from "axios";
import jsPDF from "jspdf";
import "jspdf-autotable";
import 'react-date-range/dist/styles.css'; 
import { addDays } from 'date-fns';
import 'react-date-range/dist/theme/default.css'; // theme css file
import FilterAndSearchBar from "../FilterAndSearchBar/FilterAndSearchBar";

const Customer = (props) => {
  const [exportOpen, setExportOpen] = useState(false);
  const [settingOpen, setSettingOpen] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [fetchcustomer, setFetchcustomer] = useState([]);
  const [loading, setloading] = useState(true);
  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    await axios.get("http://127.0.0.1:8000/customervendor/").then(
      res => {
        setloading(false);
        setFetchcustomer(
          res.data.map(row => ({
            Gst_Treatment: row.gst_treatment,
            Gst_No: row.gst_no,
            Business_Name: row.business_name,
            Type_Category: row.type_category,
            Pan_Card: row.pan_card,
            Credit_Limit: row.credit_limit,
            Email: row.email,
            Pincode: row.pincode,
            Street1: row.street1,
            Street2: row.street2,
            Place_Of_Supply: row.place_of_supply,
            Contact: row.contact,
            Ownsership: row.ownership
           // id: row.id
          }))
        );
        console.log(res);
      }
    );
  };
  console.log(fetchcustomer)



  const [dateRange, setDateRange] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 7),
      key: 'selection'
    }
  ]);

  const menuRef = useRef(null);

  const dataSource = fetchcustomer.map(customer =>
    ({
      gst_treatment:customer.Gst_Treatment,
      gst_no:customer.Gst_No,
      business_name:customer.Business_Name,
      type_category:customer.Type_Category,
      pan_card:customer.Pan_Card,
      credit_limit:customer.Credit_Limit,
      email:customer.Email,
      pincode:customer.Pincode,
      street1:customer.Street1,
      street2:customer.Street2,
      place_of_supply:customer.Place_Of_Supply,
      contact:customer.Contact,
      ownership:customer.Ownsership
    }));
  const columnsData = [
    {
      title: "Gst Treatment",
      label: "Gst Treatment",
      dataIndex: "gst_treatment",
      key: "gst_treatment",
      resizable: true,
      fixed: "left",
      align: "left",
      width: 180,
      onFilter: (value, record) => {
        return record.business_name.includes(value)
      }
    },
    {
      title: "Gst No",
      label: "Gst No",
      dataIndex: "gst_no",
      key: "gst_no",
      resizable: true,
      width: 80,
      align: "left",
    },
    {
      title: "Business Name",
      label: "Business Name",
      dataIndex: "business_name",
      key: "business_name",
      resizable: true,
      width: 100,
      align: "left",
    },
    {
      title: "Type Category",
      label: "Type Category",
      dataIndex: "type_category",
      key: "type_category",
      resizable: true,
      width: 110,
      align: "left",
    },
    {
      title: "PanCard",
      label: "PanCard",
      dataIndex: "pan_card",
      key: "pan_card",
      resizable: true,
      width: 90,
      align: "left",
    },
    {
      title: "Credit Limit",
      label: "Credit Limit",
      dataIndex: "credit_limit",
      key: "credit_limit",
      resizable: true,
      width: 110,
      align: "left",
    },
    {
      title: "Email",
      label: "Email",
      dataIndex: "email",
      key: "email",
      resizable: true,
      width: 110,
      align: "left",
    },
    {
      title: "PinCode",
      label: "PinCode",
      dataIndex: "pinCode",
      key: "pinCode",
      resizable: true,
      width: 110,
      align: "left",
    },
    {
      title: "Street1",
      label: "Street1",
      dataIndex: "street1",
      key: "street1",
      resizable: true,
      width: 110,
      align: "left",
    },
    {
      title: "Street2",
      label: "Street2",
      dataIndex: "street2",
      key: "street2",
      resizable: true,
      width: 110,
      align: "left",
    },
    {
      title: "Place Of Supply",
      label: "Place Of Supply",
      dataIndex: "place_of_supply",
      key: "place_of_supply",
      resizable: true,
      width: 110,
      align: "left",
    },
    {
      title: "Contact",
      label: "Contact",
      dataIndex: "contact",
      key: "contact",
      resizable: true,
      width: 110,
      align: "left",
    },
    {
      title: "Ownership",
      label: "Ownership",
      dataIndex: "ownership",
      key: "ownership",
      resizable: true,
      width: 110,
      align: "left",
    },
  ];
  const [columns, setColumns] = useState(columnsData);

  // search table functionality

  const handleData = (newData) => {
    setSearch(newData);
  }
  const [search, setSearch] = useState('');

  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  const filteredData = dataSource.filter((record) =>
    record.business_name.toLowerCase().includes(search.toLowerCase())
  );


  // redirect to another page on click of row 

  const navigate = useNavigate();

  const handleRowClick = (record) => {
    const link = record.link; // assume that the link is stored in a "link" field of the data for the row
    navigate(link);
  };
  
  
  // search table functionality
  

 

  const componentRef = useRef();



  return (
    <>
      <div className="customers">
      <Page_heading
        parent={"Business Account"}
        child={window.location.pathname.slice(1)}
      />


    
    {/* <DateRangePickerComp /> */}
  
      


      <div className="customer-table-container">
      <FilterAndSearchBar  columns={columnsData} addBtnName={"Customer"} path={"addcustomer"} onData={handleData}/>

      <div className="tableData">
        {/* <Resizable> */}
        <Table
          ref={componentRef}
          onRow={(record) => {
            return {
              onClick: () => handleRowClick(record),
            };
          }}
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
          // scroll={{ y: 800, x: 1000 }}
          scroll={{  x:"1100px" }}
          style={{ maxWidth: 2200, width: "100%" }}
          rowClassName={(record) =>
            record.key % 2 === 0 ? "highlight_row table-row" : "table-row"
            // "table-row"
          }
          search={{
            keyword: search,
          }}
        />
        {/* </Resizable> */}
      </div>
      </div>
    </div>
    </>
  );
};

export default Customer;
