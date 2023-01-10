import { Table } from "antd";
import { React, useState, useRef } from "react";
import FilterAndSearchBar from '../../FilterAndSearchBar/FilterAndSearchBar';
import OffCanvasExample from '../../OffCanvas/OffCanvasExample';
import Page_heading from '../../Page_Heading/Page_heading';
import AccountForm from "../AccountForm/AccountForm";
import "./Accounts.scss";

function Accounts() {


    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [selectedRows, setSelectedRows] = useState([]);
    const [page, setPage]=useState(1);
    const [pageSize, setPageSize] = useState(10)


    const dataSource = [
        {
          key: "1",
          account_type: "Expense 1",
          account_name: "Cost of Goods Solds",
          account_code: "1002",
          reporting_l1: "Direct Expense",
          reporting_l2: "Null",
          reporting_l3: "Null",
          module_type: "Sales",
        },
        {
          key: "2",
          account_type: "Expense 2",
          account_name: "Cost of Goods Solds",
          account_code: "1002",
          reporting_l1: "Direct Expense",
          reporting_l2: "Null",
          reporting_l3: "Null",
          module_type: "Sales",
        },
        {
          key: "3",
          account_type: "Expense 2",
          account_name: "Cost of Goods Solds",
          account_code: "1002",
          reporting_l1: "Direct Expense",
          reporting_l2: "Null",
          reporting_l3: "Null",
          module_type: "Sales",
        },
        {
          key: "4",
          account_type: "Expense 1",
          account_name: "Cost of Goods Solds",
          account_code: "1002",
          reporting_l1: "Direct Expense",
          reporting_l2: "Null",
          reporting_l3: "Null",
          module_type: "Sales",
        },
        {
          key: "5",
          account_type: "Expense 1",
          account_name: "Cost of Goods Solds",
          account_code: "1002",
          reporting_l1: "Direct Expense",
          reporting_l2: "Null",
          reporting_l3: "Null",
          module_type: "Sales",
        },
        {
          key: "6",
          account_type: "Expense 2",
          account_name: "Cost of Goods Solds",
          account_code: "1002",
          reporting_l1: "Direct Expense",
          reporting_l2: "Null",
          reporting_l3: "Null",
          module_type: "Sales",
        },
        {
          key: "7",
          account_type: "Expense 4",
          account_name: "Cost of Goods Solds",
          account_code: "1002",
          reporting_l1: "Direct Expense",
          reporting_l2: "Null",
          reporting_l3: "Null",
          module_type: "Sales",
        },
        {
          key: "8",
          account_type: "Expense 5",
          account_name: "Cost of Goods Solds",
          account_code: "1002",
          reporting_l1: "Direct Expense",
          reporting_l2: "Null",
          reporting_l3: "Null",
          module_type: "Sales",
        },
        {
          key: "9",
          account_type: "Expense",
          account_name: "Cost of Goods Solds",
          account_code: "1002",
          reporting_l1: "Direct Expense",
          reporting_l2: "Null",
          reporting_l3: "Null",
          module_type: "Sales",
        },
        {
          key: "10",
          account_type: "Expense",
          account_name: "Cost of Goods Solds",
          account_code: "1002",
          reporting_l1: "Direct Expense",
          reporting_l2: "Null",
          reporting_l3: "Null",
          module_type: "Sales",
        },
        {
          key: "11",
          account_type: "Expense",
          account_name: "Cost of Goods Solds",
          account_code: "1002",
          reporting_l1: "Direct Expense",
          reporting_l2: "Null",
          reporting_l3: "Null",
          module_type: "Sales",
        },
        {
          key: "12",
          account_type: "Expense",
          account_name: "Cost of Goods Solds",
          account_code: "1002",
          reporting_l1: "Direct Expense",
          reporting_l2: "Null",
          reporting_l3: "Null",
          module_type: "Sales",
        },
        {
          key: "13",
          account_type: "Expense",
          account_name: "Cost of Goods Solds",
          account_code: "1002",
          reporting_l1: "Direct Expense",
          reporting_l2: "Null",
          reporting_l3: "Null",
          module_type: "Sales",
        },
        {
          key: "14",
          account_type: "Expense",
          account_name: "Cost of Goods Solds",
          account_code: "1002",
          reporting_l1: "Direct Expense",
          reporting_l2: "Null",
          reporting_l3: "Null",
          module_type: "Sales",
        },
        {
          key: "15",
          account_type: "Expense",
          account_name: "Cost of Goods Solds",
          account_code: "1002",
          reporting_l1: "Direct Expense",
          reporting_l2: "Null",
          reporting_l3: "Null",
          module_type: "Sales",
        },
        {
          key: "16",
          account_type: "Expense",
          account_name: "Cost of Goods Solds",
          account_code: "1002",
          reporting_l1: "Direct Expense",
          reporting_l2: "Null",
          reporting_l3: "Null",
          module_type: "Sales",
        },
    
        // ...
      ];
      const columnsData = [
        {
          title: "Account Type",
          label: "Account Type",
          dataIndex: "account_type",
          key: "account_type",
          resizable: true,
          fixed: "left",
          align: "left",
          sorter:(record1, record2)=>
          {
              return record1.account_type > record2.account_type
          },
          // filters:[
          //   {text:'Expense 1', value:'Expense 1'},
          //   {text:'Expense 2', value:'Expense 2'}
          // ],
          // // filterMultiple:false,
          // onFilter:(value,record)=>
          // {
          //   return record.account_type === value
          // }
          // width: 60,
        },
        {
          title: "Account Name",
          label: "Account Name",
          dataIndex: "account_name",
          key: "account_name",
          resizable: true,
          // width: 60,
          align: "left",
          sorter:(record1, record2)=>
          {
              return record1.account_name > record2.account_name
          },
          // filters:[
          //   {text:'Cost of Goods Solds', value:'Cost of Goods Solds'},
          //   {text:'INR', value:'INR'}
          // ],
          // // filterMultiple:false,
          // onFilter:(value,record)=>
          // {
          //   return record.account_name === value
          // }
        },
        {
          title: "Account Code",
          label: "Account Code",
          dataIndex: "account_code",
          key: "account_code",
          resizable: true,
          // width: 230,
          align: "right",
          sorter:(record1, record2)=>
          {
              return record1.account_code > record2.account_code
          },
          // filters:[
          //   {text:'1002', value:'1002'},
          //   {text:'1003', value:'1003'}
          // ],
          // // filterMultiple:false,
          // onFilter:(value,record)=>
          // {
          //   return record.account_code === value
          // }
        },
        {
          title: "Reporting L1",
          label: "Reporting L1",
          dataIndex: "reporting_l1",
          key: "reporting_l1",
          resizable: true,
          // width: 60,
          align: "left",
          sorter:(record1, record2)=>
          {
              return record1.reporting_l1 > record2.reporting_l1
          },
          // filters:[
          //   {text:'Direct Expense', value:'Direct Expense'},
          //   {text:'INR', value:'INR'}
          // ],
          // // filterMultiple:false,
          // onFilter:(value,record)=>
          // {
          //   return record.reporting_l1 === value
          // }
    
        },
        {
          title: "Reporting L2",
          label: "Reporting L2",
          dataIndex: "reporting_l2",
          key: "reporting_l2",
          resizable: true,
          // width: 260,
          align: "left",
          sorter:(record1, record2)=>
          {
              return record1.reporting_l2 > record2.reporting_l2
          },
          // filters:[
          //   {text:'Null', value:'Null'},
          //   {text:'INR', value:'INR'}
          // ],
          // // filterMultiple:false,
          // onFilter:(value,record)=>
          // {
          //   return record.reporting_l2 === value
          // }
        },
        {
          title: "Reporting L3",
          label: "Reporting L3",
          dataIndex: "reporting_l3",
          key: "reporting_l3",
          resizable: true,
          // width: 150,
          align: "left",
          sorter:(record1, record2)=>
          {
              return record1.reporting_l3 > record2.reporting_l3
          },
          // filters:[
          //   {text:'Null', value:'Null'},
          //   {text:'INR', value:'INR'}
          // ],
          // // filterMultiple:false,
          // onFilter:(value,record)=>
          // {
          //   return record.reporting_l3 === value
          // }
        },
        {
          title: "Module Type",
          label: "Module Type",
          dataIndex: "module_type",
          key: "module_type",
          resizable: true,
          // width: 150,
          align: "left",
          sorter:(record1, record2)=>
          {
              return record1.module_type > record2.module_type
          },
          // filters:[
          //   {text:'Sales', value:'Sales'},
          //   {text:'INR', value:'INR'}
          // ],
          // // filterMultiple:false,
          // onFilter:(value,record)=>
          // {
          //   return record.module_type === value
          // }
        }
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
    }
    const [search, setSearch] = useState('');
  
    const handleSearch = (event) => {
      setSearch(event.target.value);
    };
  
    const filteredData = dataSource.filter((record) =>
      record.account_type.toLowerCase().includes(search.toLowerCase())
    );
  return (
    <div className='account-data'>
        <Page_heading  parent={"Chart of Accounts"} child={"Accounts"}/>
        <div className="account-table-container">

        <FilterAndSearchBar columns={columnsData} addBtnName={"Account"} onData={handleData}/>

        <OffCanvasExample  form={<AccountForm/>}/>
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
            scroll={{  x:"1100px" }}
        //    style={{ width: "100%" }}
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
        </div>
    </div>

  )
}

export default Accounts
