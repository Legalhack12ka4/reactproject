import { React, useState, useRef } from "react";
import FilterAndSearchBar from '../../FilterAndSearchBar/FilterAndSearchBar'
import Page_heading from '../../Page_Heading/Page_heading'
import "./ModulePaymentTerms.scss"
import { Table } from "antd";

const ModulePaymentTerms = () => {

    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [selectedRows, setSelectedRows] = useState([]);

    const dataSource = [
        {
          key: "1",
          terms: "Net 5",
          days: "5 days",
          discount: "10%",
          interest: "2%",
          action: (<div style={{display:"flex"
          }}>
            <div>ghf</div>
            <div>wdw</div>
          </div>)
        },
        {
          key: "2",
          terms: "Net 5",
          days: "5 days",
          discount: "10%",
          interest: "2%",
          action: (<div></div>)
        },
        {
          key: "3",
          terms: "Net 5",
          days: "5 days",
          discount: "10%",
          interest: "2%",
          action: (<div></div>)
        },
        {
          key: "4",
          terms: "Net 5",
          days: "5 days",
          discount: "10%",
          interest: "2%",
          action: (<div></div>)
        },
        {
          key: "5",
          terms: "Net 5",
          days: "5 days",
          discount: "10%",
          interest: "2%",
          action: (<div></div>)
        },
        {
          key: "6",
          terms: "Net 7",
          days: "7 days",
          discount: "9%",
          interest: "5%",
          action: (<div></div>)
        },
        {
          key: "7",
          terms: "Net 7",
          days: "7 days",
          discount: "9%",
          interest: "5%",
          action: (<div></div>)
        },
        {
          key: "8",
          terms: "Net 7",
          days: "7 days",
          discount: "9%",
          interest: "5%",
          action: (<div></div>)
        },
        {
          key: "9",
          terms: "Net 7",
          days: "7 days",
          discount: "9%",
          interest: "5%",
          action: (<div></div>)
        },
        {
          key: "10",
          terms: "Net 15",
          days: "15 days",
          discount: "5%",
          interest: "9%",
          action: (<div></div>)
        },
        {
          key: "11",
          terms: "Net 15",
          days: "15 days",
          discount: "5%",
          interest: "9%",
          action: (<div></div>)
        },
        {
          key: "12",
          terms: "Net 15",
          days: "15 days",
          discount: "5%",
          interest: "9%",
          action: (<div></div>)
        },
        {
          key: "13",
          terms: "Net 15",
          days: "15 days",
          discount: "5%",
          interest: "9%",
          action: (<div></div>)
        },
        {
          key: "14",
          terms: "Net 15",
          days: "15 days",
          discount: "5%",
          interest: "9%",
          action: (<div></div>)
        },
        {
          key: "15",
          terms: "Net 15",
          days: "15 days",
          discount: "5%",
          interest: "9%",
          action: (<div></div>)
        },
        {
          key: "16",
          terms: "Net 15",
          days: "15 days",
          discount: "5%",
          interest: "9%",
          action: (<div></div>)
        },
    
        // ...
      ];
      const columnsData = [
        {
          title: "Terms",
          label: "Terms",
          dataIndex: "terms",
          key: "terms",
          resizable: true,
          fixed: "left",
          align: "left",
          // width: 60,
        },
        {
          title: "Days",
          label: "Days",
          dataIndex: "days",
          key: "days",
          resizable: true,
          // width: 60,
          align: "left",
        },
        {
          title: "Discount",
          label: "Discount",
          dataIndex: "discount",
          key: "discount",
          resizable: true,
          width: 230,
          align: "left",
        },
        {
          title: "Interest",
          label: "Interest",
          dataIndex: "interest",
          key: "interest",
          resizable: true,
          // width: 60,
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
  return (
    <div className='contacts-data'>
        <Page_heading  parent={"List of Modules"} child={"Payment Terms"}/>

        <div className="contacts-table-container">
        <FilterAndSearchBar columns={columnsData} addBtnName={"Payment Terms"} />
        {/* <OffCanvasExample  form={<Contacts/>}/> */}
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

export default ModulePaymentTerms