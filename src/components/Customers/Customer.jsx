import React from "react";

import Page_heading from "../Page_Heading/Page_heading";
import { useState, useEffect, useRef } from "react";
import "./Customers.scss";
import { Table } from "antd";

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
  const [dateRange, setDateRange] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 7),
      key: 'selection'
    }
  ]);

  const menuRef = useRef(null);

  const dataSource = [
    {
      key: "1",
      business_name: "Reformiqo Business Service Pvt. Ltd",
      type: "Customer",
      account: "Account Receivable",
      unadjusted_account: "Unadjested Receipts",
      type_category: "Wholeseler",
      email: "parth@gmail.com",
      phone: 9988998899,
      address: "Reformiqo Business Service Pvt. Ltd.",
    },
    {
      key: "2",
      business_name: "Reformiqo Business Service Pvt. Ltd",
      type: "Customer",
      account: "Account Receivable",
      unadjusted_account: "Unadjested Receipts",
      type_category: "Wholeseler",
      email: "parth@gmail.com",
      phone: 9988998899,
      address: "Reformiqo Business Service Pvt. Ltd.",
    },
    {
      key: "3",
      business_name: "Reformiqo Business Service Pvt. Ltd",
      type: "Customer",
      account: "Account Receivable",
      unadjusted_account: "Unadjested Receipts",
      type_category: "Wholeseler",
      email: "parth@gmail.com",
      phone: 9988998899,
      address: "Reformiqo Business Service Pvt. Ltd.",
    },
    {
      key: "4",
      business_name: "Reformiqo Business Service Pvt. Ltd",
      type: "Customer",
      account: "Account Receivable",
      unadjusted_account: "Unadjested Receipts",
      type_category: "Wholeseler",
      email: "parth@gmail.com",
      phone: 9988998899,
      address: "Reformiqo Business Service Pvt. Ltd.",
    },
    {
      key: "5",
      business_name: "Reformiqo Business Service Pvt. Ltd",
      type: "Customer",
      account: "Account Receivable",
      unadjusted_account: "Unadjested Receipts",
      type_category: "Wholeseler",
      email: "parth@gmail.com",
      phone: 9988998899,
      address: "Reformiqo Business Service Pvt. Ltd.",
    },
    {
      key: "6",
      business_name: "Reformiqo Business Service Pvt. Ltd",
      type: "Customer",
      account: "Account Receivable",
      unadjusted_account: "Unadjested Receipts",
      type_category: "Wholeseler",
      email: "parth@gmail.com",
      phone: 9988998899,
      address: "Reformiqo Business Service Pvt. Ltd.",
    },
    {
      key: "7",
      business_name: "Reformiqo Business Service Pvt. Ltd",
      type: "Customer",
      account: "Account Receivable",
      unadjusted_account: "Unadjested Receipts",
      type_category: "Wholeseler",
      email: "parth@gmail.com",
      phone: 9988998899,
      address: "Reformiqo Business Service Pvt. Ltd.",
    },
    {
      key: "8",
      business_name: "Reformiqo Business Service Pvt. Ltd",
      type: "Customer",
      account: "Account Receivable",
      unadjusted_account: "Unadjested Receipts",
      type_category: "Wholeseler",
      email: "parth@gmail.com",
      phone: 9988998899,
      address: "Reformiqo Business Service Pvt. Ltd.",
    },
    {
      key: "9",
      business_name: "Reformiqo Business Service Pvt. Ltd",
      type: "Customer",
      account: "Account Receivable",
      unadjusted_account: "Unadjested Receipts",
      type_category: "Wholeseler",
      email: "parth@gmail.com",
      phone: 9988998899,
      address: "Reformiqo Business Service Pvt. Ltd.",
    },
    {
      key: "10",
      business_name: "Reformiqo Business Service Pvt. Ltd",
      type: "Customer",
      account: "Account Receivable",
      unadjusted_account: "Unadjested Receipts",
      type_category: "Wholeseler",
      email: "parth@gmail.com",
      phone: 9988998899,
      address: "Reformiqo Business Service Pvt. Ltd.",
    },
    {
      key: "11",
      business_name: "Reformiqo Business Service Pvt. Ltd",
      type: "Customer",
      account: "Account Receivable",
      unadjusted_account: "Unadjested Receipts",
      type_category: "Wholeseler",
      email: "parth@gmail.com",
      phone: 9988998899,
      address: "Reformiqo Business Service Pvt. Ltd.",
    },
    {
      key: "12",
      business_name: "Reformiqo Business Service Pvt. Ltd",
      type: "Customer",
      account: "Account Receivable",
      unadjusted_account: "Unadjested Receipts",
      type_category: "Wholeseler",
      email: "parth@gmail.com",
      phone: 9988998899,
      address: "Reformiqo Business Service Pvt. Ltd.",
    },
    {
      key: "13",
      business_name: "Reformiqo Business Service Pvt. Ltd",
      type: "Customer",
      account: "Account Receivable",
      unadjusted_account: "Unadjested Receipts",
      type_category: "Wholeseler",
      email: "parth@gmail.com",
      phone: 9988998899,
      address: "Reformiqo Business Service Pvt. Ltd.",
    },
    {
      key: "14",
      business_name: "Reformiqo Business Service Pvt. Ltd",
      type: "Customer",
      account: "Account Receivable",
      unadjusted_account: "Unadjested Receipts",
      type_category: "Wholeseler",
      email: "parth@gmail.com",
      phone: 9988998899,
      address: "Reformiqo Business Service Pvt. Ltd.",
    },
    {
      key: "15",
      business_name: "Reformiqo Business Service Pvt. Ltd",
      type: "Customer",
      account: "Account Receivable",
      unadjusted_account: "Unadjested Receipts",
      type_category: "Wholeseler",
      email: "parth@gmail.com",
      phone: 9988998899,
      address: "Reformiqo Business Service Pvt. Ltd.",
    },
    {
      key: "16",
      business_name: "Reformiqo Business Service Pvt. Ltd",
      type: "Customer",
      account: "Account Receivable",
      unadjusted_account: "Unadjested Receipts",
      type_category: "Wholeseler",
      email: "parth@gmail.com",
      phone: 9988998899,
      address: "Reformiqo Business Service Pvt. Ltd.",
    },

    // ...
  ];
  const columnsData = [
    {
      title: "Business Name",
      label: "Business Name",
      dataIndex: "business_name",
      key: "business_name",
      resizable: true,
      fixed: "left",
      align: "left",
      width: 270,
    },
    {
      title: "Type",
      label: "Type",
      dataIndex: "type",
      key: "type",
      resizable: true,
      width: 100,
      align: "left",
    },
    {
      title: "Account",
      label: "Account",
      dataIndex: "account",
      key: "account",
      resizable: true,
      width: 170,
      align: "left",
    },
    {
      title: "Unadjusted Account",
      label: "Unadjusted Account",
      dataIndex: "unadjusted_account",
      key: "unadjusted_account",
      resizable: true,
      width: 180,
      align: "left",
    },
    {
      title: "Type Category",
      label: "Type Category",
      dataIndex: "type_category",
      key: "type_category",
      resizable: true,
      width: 150,
      align: "left",
    },
    {
      title: "Email",
      label: "Email",
      dataIndex: "email",
      key: "email",
      resizable: true,
      width: 150,
      align: "left",
    },
  ];
  const [columns, setColumns] = useState(columnsData);
 
  

 

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
      <FilterAndSearchBar  columns={columnsData} addBtnName={"Customer"}/>

      <div className="tableData">
        {/* <Resizable> */}
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
          dataSource={dataSource}
          columns={columns}
          scroll={{ y: 800, x: 1000 }}
          style={{ maxWidth: 2200, width: "100%" }}
          rowClassName={(record) =>
            record.key % 2 === 0 ? "highlight_row" : ""
          }
        />
        {/* </Resizable> */}
      </div>
      </div>
    </div>
    </>
  );
};

export default Customer;
