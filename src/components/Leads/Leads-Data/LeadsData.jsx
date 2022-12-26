import { React, useState, useRef } from "react";
import FilterAndSearchBar from '../../FilterAndSearchBar/FilterAndSearchBar'
import Page_heading from '../../Page_Heading/Page_heading'

import "./Leads-Data.scss"


import { Table } from "antd";
import OffCanvasExample from "../../OffCanvas/OffCanvasExample";
import Leads from "../Leads"

const LeadsData = () => {

    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [selectedRows, setSelectedRows] = useState([]);



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
        // width: 60,
      },
      {
        title: "Mobile No.",
        label: "Mobile No.",
        dataIndex: "mobile_no",
        key: "mobile_no",
        resizable: true,
        // width: 60,
        align: "left",
      },
      {
        title: "Email",
        label: "Email",
        dataIndex: "email",
        key: "email",
        resizable: true,
        width: 230,
        align: "left",
      },
      {
        title: "Type",
        label: "Type",
        dataIndex: "type",
        key: "type",
        resizable: true,
        // width: 60,
        align: "left",
  
      },
      {
        title: "Business Names",
        label: "Business Names",
        dataIndex: "business_names",
        key: "business_names",
        resizable: true,
        width: 260,
        align: "left",
      },
      {
        title: "Lead Source",
        label: "Lead Source",
        dataIndex: "lead_source",
        key: "lead_source",
        resizable: true,
        width: 150,
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
  return (
    <div className='leads-data'>
        <Page_heading  parent={"Business Account"} child={"Leads"}/>

        <div className="leads-table-container">
        <FilterAndSearchBar columns={columnsData} addBtnName={"Lead"} path={"add_leads"} />
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
            dataSource={dataSource}
            columns={columns}
            // scroll={{ y: 800, x: 720 }}
        //    style={{ width: "100%" }}
            rowClassName={(record) =>
              record.key % 2 === 0 ? "highlight_row" : ""
            }
          />
        </div>
    </div>
  )
}

export default LeadsData