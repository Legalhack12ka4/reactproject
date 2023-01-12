import { React, useState, useRef,useEffect } from "react";
import {useNavigate} from "react-router-dom";
import Page_heading from "../Page_Heading/Page_heading";
import "./Customers.scss";
import { Table, Tooltip } from "antd";
import axios from "axios";
import jsPDF from "jspdf";
import "jspdf-autotable";
import 'react-date-range/dist/styles.css'; 
import { addDays } from 'date-fns';
import 'react-date-range/dist/theme/default.css'; // theme css file
import FilterAndSearchBar from "../FilterAndSearchBar/FilterAndSearchBar";
import { Spin } from 'antd';
import config from "../Database/config";
import SearchDropdown from "../AllDropdowns/SearchDropdown/SearchDropdown";


const Customer = (props) => {
  const [exportOpen, setExportOpen] = useState(false);
  const [settingOpen, setSettingOpen] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [fetchcustomer, setFetchcustomer] = useState([]);
  const [page, setPage]=useState(1);
  const [pageSize, setPageSize] = useState(10)
  const [loading, setloading] = useState(true);
  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    await axios.get(`${config.baseUrl}/customervendor/`).then(
      res => {
        setloading(false);
        setFetchcustomer(
          res.data.map(row => ({
            Gst_Treatment: row.gst_treatment == 1 ? "Registerd Business" :row.gst_treatment ==2 ? "Consumer" : "",
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
        sorter:(record1, record2)=>
        {
            return record1.gst_treatment > record2.gst_treatment
        },
        // filters:[
        //   {text:'Expense 1', value:'Expense 1'},
        //   {text:'Expense 2', value:'Expense 2'}
        // ],
        // // filterMultiple:false,
        // onFilter:(value,record)=>
        // {
        //   return record.gst_treatment === value
        // }
        // onFilter: (value, record) => {
        //   return record.business_name.includes(value)
        // }
      },
      {
        title: "Gst No",
        label: "Gst No",
        dataIndex: "gst_no",
        key: "gst_no",
        resizable: true,
        width: 180,
        align: "left",
        sorter:(record1, record2)=>
        {
            return record1.gst_no > record2.gst_no
        },
        // filters:[
        //   {text:'Expense 1', value:'Expense 1'},
        //   {text:'Expense 2', value:'Expense 2'}
        // ],
        // // filterMultiple:false,
        // onFilter:(value,record)=>
        // {
        //   return record.gst_no === value
        // }
      },
      {
        title: "Business Name",
        label: "Business Name",
        dataIndex: "business_name",
        key: "business_name",
        resizable: true,
        width: 180,
        align: "left",
        sorter:(record1, record2)=>
        {
            return record1.business_name > record2.business_name
        },
        // filters:[
        //   {text:'Expense 1', value:'Expense 1'},
        //   {text:'Expense 2', value:'Expense 2'}
        // ],
        // // filterMultiple:false,
        // onFilter:(value,record)=>
        // {
        //   return record.business_name === value
        // }
      },
      {
        title: "Type Category",
        label: "Type Category",
        dataIndex: "type_category",
        key: "type_category",
        resizable: true,
        width: 180,
        align: "left",
        sorter:(record1, record2)=>
        {
            return record1.type_category > record2.type_category
        },
        // filters:[
        //   {text:'Expense 1', value:'Expense 1'},
        //   {text:'Expense 2', value:'Expense 2'}
        // ],
        // // filterMultiple:false,
        // onFilter:(value,record)=>
        // {
        //   return record.type_category === value
        // }
      },
      {
        title: "PanCard",
        label: "PanCard",
        dataIndex: "pan_card",
        key: "pan_card",
        resizable: true,
        width: 180,
        align: "left",
        sorter:(record1, record2)=>
        {
            return record1.pan_card > record2.pan_card
        },
        // filters:[
        //   {text:'Expense 1', value:'Expense 1'},
        //   {text:'Expense 2', value:'Expense 2'}
        // ],
        // // filterMultiple:false,
        // onFilter:(value,record)=>
        // {
        //   return record.pan_card === value
        // }
      },
      {
        title: "Credit Limit",
        label: "Credit Limit",
        dataIndex: "credit_limit",
        key: "credit_limit",
        resizable: true,
        width: 180,
        align: "left",
        sorter:(record1, record2)=>
        {
            return record1.credit_limit > record2.credit_limit
        },
        // filters:[
        //   {text:'Expense 1', value:'Expense 1'},
        //   {text:'Expense 2', value:'Expense 2'}
        // ],
        // // filterMultiple:false,
        // onFilter:(value,record)=>
        // {
        //   return record.credit_limit === value
        // }
      },
      {
        title: "Email",
        label: "Email",
        dataIndex: "email",
        key: "email",
        resizable: true,
        width: 180,
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
        title: "PinCode",
        label: "PinCode",
        dataIndex: "pincode",
        key: "pincode",
        resizable: true,
        width: 180,
        align: "left",
        sorter:(record1, record2)=>
        {
            return record1.pinCode > record2.pinCode
        },
        // filters:[
        //   {text:'Expense 1', value:'Expense 1'},
        //   {text:'Expense 2', value:'Expense 2'}
        // ],
        // // filterMultiple:false,
        // onFilter:(value,record)=>
        // {
        //   return record.pinCode === value
        // }
      },
      {
        title: "Street1",
        label: "Street1",
        dataIndex: "street1",
        key: "street1",
        resizable: true,
        width: 180,
        align: "left",
        sorter:(record1, record2)=>
        {
            return record1.street1 > record2.street1
        },
        // filters:[
        //   {text:'Expense 1', value:'Expense 1'},
        //   {text:'Expense 2', value:'Expense 2'}
        // ],
        // // filterMultiple:false,
        // onFilter:(value,record)=>
        // {
        //   return record.street1 === value
        // }
      },
      {
        title: "Street2",
        label: "Street2",
        dataIndex: "street2",
        key: "street2",
        resizable: true,
        width: 180,
        align: "left",
        sorter:(record1, record2)=>
        {
            return record1.street2 > record2.street2
        },
        // filters:[
        //   {text:'Expense 1', value:'Expense 1'},
        //   {text:'Expense 2', value:'Expense 2'}
        // ],
        // // filterMultiple:false,
        // onFilter:(value,record)=>
        // {
        //   return record.street2 === value
        // }
      },
      {
        title: "Place Of Supply",
        label: "Place Of Supply",
        dataIndex: "place_of_supply",
        key: "place_of_supply",
        resizable: true,
        width: 180,
        align: "left",
        sorter:(record1, record2)=>
        {
            return record1.place_of_supply > record2.place_of_supply
        },
        // filters:[
        //   {text:'Expense 1', value:'Expense 1'},
        //   {text:'Expense 2', value:'Expense 2'}
        // ],
        // // filterMultiple:false,
        // onFilter:(value,record)=>
        // {
        //   return record.place_of_supply === value
        // }
      },
      {
        title: "Contact",
        label: "Contact",
        dataIndex: "contact",
        key: "contact",
        resizable: true,
        width: 180,
        align: "left",
        sorter:(record1, record2)=>
        {
            return record1.contact > record2.contact
        },
        // filters:[
        //   {text:'Expense 1', value:'Expense 1'},
        //   {text:'Expense 2', value:'Expense 2'}
        // ],
        // // filterMultiple:false,
        // onFilter:(value,record)=>
        // {
        //   return record.contact === value
        // }
      },
      {
        title: "Ownership",
        label: "Ownership",
        dataIndex: "ownership",
        key: "ownership",
        resizable: true,
        width: 180,
        align: "left",
        sorter:(record1, record2)=>
        {
            return record1.ownership > record2.ownership
        },
        // filters:[
        //   {text:'Expense 1', value:'Expense 1'},
        //   {text:'Expense 2', value:'Expense 2'}
        // ],
        // // filterMultiple:false,
        // onFilter:(value,record)=>
        // {
        //   return record.ownership === value
        // }
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
      <FilterAndSearchBar  filterdata=
      {
        [
          <div className="customer_filter_container">
              <div className="customer_filter_filed">
              <Tooltip title="prompt text" color="#5C5AD0">
                  {" "}
                  <label className="label">GST Treatment</label>{" "}
                </Tooltip>
                <SearchDropdown
                  width={330}
                  name="gsttreat"
                  />
              </div>

              <div className="customer_filter_filed">
              
              <div style={{ display: "flex", gap: "20px" }}>
                  <div style={{ width: "50%" }}>
                    <Tooltip title="prompt text" color="#5C5AD0">
                      {" "}
                      <label className="label" style={{ marginTop: "5px" }}>
                        City
                      </label>
                    </Tooltip>
                    <br />
                    <SearchDropdown
                      width={155}
                     // options={currency}
                     // value={values.currency}
                     // onChange={handleDrpChange}
                      name="currency"
                    //  error={errors.currency && touched.currency ? true : false}

                    />
                  </div>
                  <div style={{ width: "50%" }}>
                    <Tooltip title="prompt text" color="#5C5AD0">
                      {" "}
                      <label className="label">State</label>
                    </Tooltip>
                    <br />
                    <SearchDropdown
                      width={155}
                     // options={paymentterms}
                    //  value={values.payment}
                    //  onChange={handleDrpChange}
                      name="payment"
                    //  error={errors.payment && touched.payment ? true : false}

                    />
                  </div>
                </div>
              </div>

              <div className="customer_filter_filed">
              <Tooltip title="prompt text" color="#5C5AD0">
                  {" "}
                  <label className="label">Type Category</label>{" "}
                </Tooltip>
                <SearchDropdown
                  width={330}
                  name="gsttreat"
                  />
              </div>

              <div className="customer_filter_filed">
              <Tooltip title="prompt text" color="#5C5AD0">
                  {" "}
                  <label className="label">Contact</label>{" "}
                </Tooltip>
                <SearchDropdown
                  width={330}
                  name="gsttreat"
                  />
              </div> 
              <div className="customer_filter_filed">
            
              <div style={{ display: "flex", gap: "20px" }}>
                  <div style={{ width: "50%" }}>
                    <Tooltip title="prompt text" color="#5C5AD0">
                      {" "}
                      <label className="label" style={{ marginTop: "5px" }}>
                        Currency
                      </label>
                    </Tooltip>
                    <br />
                    <SearchDropdown
                      width={155}
                     // options={currency}
                     // value={values.currency}
                     // onChange={handleDrpChange}
                      name="currency"
                     // error={errors.currency && touched.currency ? true : false}

                    />
                  </div>
                  <div style={{ width: "50%" }}>
                    <Tooltip title="prompt text" color="#5C5AD0">
                      {" "}
                      <label className="label">Payment Terms</label>
                    </Tooltip>
                    <br />
                    <SearchDropdown
                      width={155}
                    //  options={paymentterms}
                    //  value={values.payment}
                   //   onChange={handleDrpChange}
                      name="payment"
                   //   error={errors.payment && touched.payment ? true : false}

                    />
                  </div>
                </div>
              </div>
              <div className="customer_filter_filed">
              <Tooltip title="prompt text" color="#5C5AD0">
                  {" "}
                  <label className="label">Ownership</label>{" "}
                </Tooltip>
                <SearchDropdown
                  width={330}
                  name="gsttreat"
                  />
              </div>
              <div className="customer_filter_filed">
              <Tooltip title="prompt text" color="#5C5AD0">
                  {" "}
                  <label className="label">Default Place of Supply</label>{" "}
                </Tooltip>
                <SearchDropdown
                  width={330}
                  name="gsttreat"
                  />
              </div>
          </div>
        //  {name : "GST Treatment" , width:"330px"}, 
        //  {name: "City", width:"155px" },
        //  {name: "State", width:"155px"}, 
        //  {name:"Type Category",width:"330px"},
        //  {name: "Contact",width:"330px"},
        //   {name:"Currency",width:"155px"},
        //   {name: "Payment Terms",width:"155px"},
        //   {name: "Ownership",width:"330px"},
        //   { name:"Default Place of Supply",width:"330px" }
          
        ]

      }  columns={columnsData} addBtnName={"Customer"} path={"addcustomer"} onData={handleData}/>

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
          loading={{indicator : <div><Spin/></div>, spinning:loading}}
        
          dataSource={filteredData}
      
          columns={columns}
                
                              // scroll={{ y: 800, x: 1000 }}
          scroll={{  x:"1100px" }}
          style={{ maxWidth: 2200, width: "100%" }}
          
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
            record.key % 2 === 0 ? "highlight_row table-row" : "table-row"
            // "table-row"
          }
          search={{
            keyword: search,
          }}
        />
      {/* )} */}
        {/* </Resizable> */}
      </div>
      </div>
    </div>
    </>
  );
};

export default Customer;
