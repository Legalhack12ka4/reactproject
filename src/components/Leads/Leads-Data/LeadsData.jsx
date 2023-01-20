import { React, useState, useRef } from "react";
import FilterAndSearchBar from '../../FilterAndSearchBar/FilterAndSearchBar'
import Page_heading from '../../Page_Heading/Page_heading'
import "./Leads-Data.scss"
import { Spin, Table, Tooltip,Tag } from "antd";
import OffCanvasExample from "../../OffCanvas/OffCanvasExample";
import Leads from "../Leads"
import SearchDropdown from "../../AllDropdowns/SearchDropdown/SearchDropdown";
import SearchDropdownAddButton from "../../AllDropdowns/SearchDropdownAddButton/SearchDropdownAddButton";

const LeadsData = () => {

    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [selectedRows, setSelectedRows] = useState([]);
    const [loading, setloading] = useState(true);
    const [page, setPage]=useState(1);
    const [pageSize, setPageSize] = useState(10)
    const [checked, setChecked] = useState("contacts");
    const [visible, setVisible] = useState(false);
    
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
    const contacts = [
      {
        value: "1",
        label: "Aman Jaria",
      },
      {
        value: "2",
        label: "Ashish Jaria",
      },
      {
        value: "3",
        label: "Parth Goswami",
      },
      {
        value: "4",
        label: "Suryansh Jaria",
      },
      {
        value: "5",
        label: "Kushal Nahata",
      },
    ];
    const others = [
      {
        value: "1",
        label: "ITME 2022",
      },
      {
        value: "2",
        label: "it sOL 2019",
      },
      {
        value: "3",
        label: "itme 2018",
      },
      {
        value: "4",
        label: "Colortax",
      },
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

//tags

const log = (e) => {
  console.log(e);
};


const clearfilter =() =>
{
  console.log("button clicked");
}


  return (
    <div className='leads-data'>
        <Page_heading  parent={"Business Account"} child={"Leads"}/>

        <div className="leads-table-container">
        <FilterAndSearchBar
         filterdata= {
          [
            <div className="contact_filter_container">
                {/* <div className="leadinput" style={{ marginTop: "5px" }}>
                <img src={company} className="customerimg" />
                <input
                  type="text"
                  className="inputlead"
                  placeholder="Placeholder"
                />
              </div> */}

              <Tooltip title="prompt text" color="#5C5AD0">
                {" "}
                <label className="leadlabel">Lead Source Type</label>{" "}
              </Tooltip>
              <br />
              <div className="radio1-group">
                <label className="radio1">
                  <input
                    type="radio"
                    value="Contacts"
                    name="lead"
                    checked={checked == "contacts" ? true : false}
                    onClick={(e) => setChecked("contacts")}
                  />
                  Contacts
                  <span></span>
                </label>
                <label className="radio1">
                  <input
                    type="radio"
                    value="Others"
                    name="lead"
                    onClick={(e) => setChecked("Others")}
                    checked={checked == "Others" ? true : false}
                  />
                  Others
                  <span></span>
                </label>
              </div>
              <Tooltip title="prompt text" color="#5C5AD0">
                {" "}
                <label className="leadlabel" style={{ marginTop: "15px" }}>
                  {checked == "contacts" ? "Contacts" : "Others"}
                </label>{" "}
              </Tooltip>
              <br />
              {checked == "contacts" ? (
                <SearchDropdown options={contacts} width={330}  />
              ) : (
                <SearchDropdown options={others} width={330} />
              )}
  
              
  
                <div className="customer_filter_filed" style={{marginBottom:"20px", marginTop:"20px"}}>
                <Tooltip title="prompt text" color="#5C5AD0">
                    {" "}
                    <label className="label">Ownership</label>{" "}
                  </Tooltip>
                  <SearchDropdown
                    width={330}
                    name="gsttreat"
                    />
                </div>
  
            
            </div>
          ]
        }
        columns={columnsData} dataSource={dataSource} addBtnName={"Lead"} onData={handleData} />
        <OffCanvasExample form={<Leads/>}/>
  
        {!visible &&  <div className="tags" >
   <div className="appliedtag">Applied For :</div>
   <div  onClick={log}>
   <Tooltip title="Contact: Leads" color="#5C5AD0"> <Tag className="tag1" closable onClose={log}>
    Vimlesh
    </Tag></Tooltip>
      <Tooltip title="Ownership : Leads" color="#5C5AD0"> <Tag className="tag1" closable onClose={log}>
  Parth Goswami
    </Tag></Tooltip>
    <button type="submit" className="btnfilter" onClick={() => setVisible(!visible)}>Clear All</button>
   </div>
  </div>}

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