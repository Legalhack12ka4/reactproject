import { React, useState, useRef } from "react";
import FilterAndSearchBar from '../../FilterAndSearchBar/FilterAndSearchBar'
import Page_heading from '../../Page_Heading/Page_heading'

import "./Leads-Data.scss"


import { Spin, Table } from "antd";
import OffCanvasExample from "../../OffCanvas/OffCanvasExample";
import Leads from "../Leads"

const LeadsData = () => {

    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [selectedRows, setSelectedRows] = useState([]);
    const [loading, setloading] = useState(true);
    const [page, setPage]=useState(1);
    const [pageSize, setPageSize] = useState(10)


    const dataSource = [
      {
        key: "1",
        name: "Parth Goswami",
        mobile_no: "+91 XXXXXXXXXX",
        email: "parth.goswami@reformiqo.com",
        type: "Key Person",
        business_names: "Reformiqo Business Service Pvt Ltd",
        lead_source: "Expo 2022",
      },
      {
        key: "2",
        name: "Parth Goswami",
        mobile_no: "+91 XXXXXXXXXX",
        email: "parth.goswami@reformiqo.com",
        type: "Key Person",
        business_names: "Reformiqo Business Service Pvt Ltd",
        lead_source: "Expo 2022",
      },
      {
        key: "3",
        name: "Parth Goswami",
        mobile_no: "+91 XXXXXXXXXX",
        email: "parth.goswami@reformiqo.com",
        type: "Key Person",
        business_names: "Reformiqo Business Service Pvt Ltd",
        lead_source: "Expo 2022",
      },
      {
        key: "4",
        name: "Parth Goswami",
        mobile_no: "+91 XXXXXXXXXX",
        email: "parth.goswami@reformiqo.com",
        type: "Key Person",
        business_names: "Reformiqo Business Service Pvt Ltd",
        lead_source: "Expo 2022",
      },
      {
        key: "5",
        name: "Parth Goswami",
        mobile_no: "+91 XXXXXXXXXX",
        email: "parth.goswami@reformiqo.com",
        type: "Key Person",
        business_names: "Reformiqo Business Service Pvt Ltd",
        lead_source: "Expo 2022",
      },
      {
        key: "6",
        name: "Parth Goswami",
        mobile_no: "+91 XXXXXXXXXX",
        email: "parth.goswami@reformiqo.com",
        type: "Key Person",
        business_names: "Reformiqo Business Service Pvt Ltd",
        lead_source: "Expo 2022",
      },
      {
        key: "7",
        name: "Parth Goswami",
        mobile_no: "+91 XXXXXXXXXX",
        email: "parth.goswami@reformiqo.com",
        type: "Key Person",
        business_names: "Reformiqo Business Service Pvt Ltd",
        lead_source: "Expo 2022",
      },
      {
        key: "8",
        name: "Parth Goswami",
        mobile_no: "+91 XXXXXXXXXX",
        email: "parth.goswami@reformiqo.com",
        type: "Key Person",
        business_names: "Reformiqo Business Service Pvt Ltd",
        lead_source: "Expo 2022",
      },
      {
        key: "9",
        name: "Parth Goswami",
        mobile_no: "+91 XXXXXXXXXX",
        email: "parth.goswami@reformiqo.com",
        type: "Key Person",
        business_names: "Reformiqo Business Service Pvt Ltd",
        lead_source: "Expo 2022",
      },
      {
        key: "10",
        name: "Parth Goswami",
        mobile_no: "+91 XXXXXXXXXX",
        email: "parth.goswami@reformiqo.com",
        type: "Key Person",
        business_names: "Reformiqo Business Service Pvt Ltd",
        lead_source: "Expo 2022",
      },
      {
        key: "11",
        name: "Parth Goswami",
        mobile_no: "+91 XXXXXXXXXX",
        email: "parth.goswami@reformiqo.com",
        type: "Key Person",
        business_names: "Reformiqo Business Service Pvt Ltd",
        lead_source: "Expo 2022",
      },
      {
        key: "12",
        name: "Parth Goswami",
        mobile_no: "+91 XXXXXXXXXX",
        email: "parth.goswami@reformiqo.com",
        type: "Key Person",
        business_names: "Reformiqo Business Service Pvt Ltd",
        lead_source: "Expo 2022",
      },
      {
        key: "13",
        name: "Parth Goswami",
        mobile_no: "+91 XXXXXXXXXX",
        email: "parth.goswami@reformiqo.com",
        type: "Key Person",
        business_names: "Reformiqo Business Service Pvt Ltd",
        lead_source: "Expo 2022",
      },
      {
        key: "14",
        name: "Parth Goswami",
        mobile_no: "+91 XXXXXXXXXX",
        email: "parth.goswami@reformiqo.com",
        type: "Key Person",
        business_names: "Reformiqo Business Service Pvt Ltd",
        lead_source: "Expo 2022",
      },
      {
        key: "15",
        name: "Parth Goswami",
        mobile_no: "+91 XXXXXXXXXX",
        email: "parth.goswami@reformiqo.com",
        type: "Key Person",
        business_names: "Reformiqo Business Service Pvt Ltd",
        lead_source: "Expo 2022",
      },
      {
        key: "16",
        name: "Parth Goswami",
        mobile_no: "+91 XXXXXXXXXX",
        email: "parth.goswami@reformiqo.com",
        type: "Key Person",
        business_names: "Reformiqo Business Service Pvt Ltd",
        lead_source: "Expo 2022",
      },
  
      // ...
    ];
    const columnsData = [
      {
        title: "Name",
        label: "Name",
        dataIndex: "name",
        key: "name",
        resizable: true,
        fixed: "left",
        align: "left",
        width: 80,
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
        // minWidth: 260,
      },
      {
        title: "Mobile No.",
        label: "Mobile No.",
        dataIndex: "mobile_no",
        key: "mobile_no",
        resizable: true,
        width: 100,
        align: "left",
        sorter:(record1, record2)=>
        {
            return record1.mobile_no > record2.mobile_no
        },
        // filters:[
        //   {text:'Expense 1', value:'Expense 1'},
        //   {text:'Expense 2', value:'Expense 2'}
        // ],
        // // filterMultiple:false,
        // onFilter:(value,record)=>
        // {
        //   return record.mobile_no === value
        // }
      },
      {
        title: "Email",
        label: "Email",
        dataIndex: "email",
        key: "email",
        resizable: true,
        width: 150,
        align: "left",
        sorter:(record1, record2)=>
        {
            return record1.email > record2.email
        },
        // filters:[
        //   {text:'Expense 1', value:'Expense 1'},
        //   {text:'Expense 2', value:'Expense 2'}
        // ],
        // // filterMultiple:false,
        // onFilter:(value,record)=>
        // {
        //   return record.email === value
        // }
      },
      {
        title: "Type",
        label: "Type",
        dataIndex: "type",
        key: "type",
        resizable: true,
        width: 70,
        align: "left",
        sorter:(record1, record2)=>
        {
            return record1.type > record2.type
        },
        // filters:[
        //   {text:'Expense 1', value:'Expense 1'},
        //   {text:'Expense 2', value:'Expense 2'}
        // ],
        // // filterMultiple:false,
        // onFilter:(value,record)=>
        // {
        //   return record.type === value
        // }
      },
      {
        title: "Business Names",
        label: "Business Names",
        dataIndex: "business_names",
        key: "business_names",
        resizable: true,
        // minWidth: 260, 
        width: 160  ,
        // width: 'auto',
        align: "left",
        sorter:(record1, record2)=>
        {
            return record1.business_names > record2.business_names
        },
        // filters:[
        //   {text:'Expense 1', value:'Expense 1'},
        //   {text:'Expense 2', value:'Expense 2'}
        // ],
        // // filterMultiple:false,
        // onFilter:(value,record)=>
        // {
        //   return record.business_names === value
        // }
      },
      {
        title: "Lead Source",
        label: "Lead Source",
        dataIndex: "lead_source",
        key: "lead_source",
        resizable: true,
        width: 100,
        // width: 'auto',
        align: "left",
        sorter:(record1, record2)=>
        {
            return record1.lead_source > record2.lead_source
        },
        // filters:[
        //   {text:'Expense 1', value:'Expense 1'},
        //   {text:'Expense 2', value:'Expense 2'}
        // ],
        // // filterMultiple:false,
        // onFilter:(value,record)=>
        // {
        //   return record.lead_source === value
        // }
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
    record.name.toLowerCase().includes(search.toLowerCase())
  );
  return (
    <div className='leads-data'>
        <Page_heading  parent={"Business Account"} child={"Leads"}/>

        <div className="leads-table-container">
        <FilterAndSearchBar columns={columnsData} dataSource={dataSource} addBtnName={"Lead"} onData={handleData} />
        <OffCanvasExample form={<Leads/>}/>
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
            // loading={{indicator : <div><Spin/></div>, spinning:loading}}
            dataSource={filteredData}
            columns={columns}
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

export default LeadsData