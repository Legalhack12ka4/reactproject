import { React, useState, useRef } from "react";
import FilterAndSearchBar from "../../FilterAndSearchBar/FilterAndSearchBar";
import Page_heading from "../../Page_Heading/Page_heading";
import "./Leads-Data.scss";
import { Spin, Table, Tooltip, Tag, Skeleton } from "antd";
import OffCanvasExample from "../../OffCanvas/OffCanvasExample";
import Leads from "../Leads";
import SearchDropdown from "../../AllDropdowns/SearchDropdown/SearchDropdown";
import SearchDropdownAddButton from "../../AllDropdowns/SearchDropdownAddButton/SearchDropdownAddButton";
import axios from "axios";
import config from "../../Database/config";
import { useEffect } from "react";
import { useMemo } from "react";

const filterfield = {
  name: "",
  mobile: "",
  email: "",
  company: "",
  lead: "",
  ownership: "",
};

const LeadsData = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [checked, setChecked] = useState("contacts");
  const [visible, setVisible] = useState(false);
  const [fetchlead, setFetchlead] = useState([]);
  const [loading, setloading] = useState(true);
  const [custfilter, setCustFilter] = useState(filterfield);
  const [filterarray, setFilteraaray] = useState([]);
  const [contact, setContact] = useState([]);
  const [other, setOther] = useState([]);
  //get lead

  useEffect(() => {
    getData();
    
  }, []);
  const getData = async () => {
    await axios.get(`${config.baseUrl}/leads/`).then((res) => {
      setloading(false);
      setFetchlead(
        res.data.map((row) => ({
          Key: row.id,
          Name: row.name,
          Mobile_no: row.mobile_no,
          Email: row.email,
          Company_name: row.company_name,
          Lead_Source_Type: row.lead_source_type,
          Ownsership: row.ownership == 1 ? "ubuntu" : "window",
          // id: row.id
        }))
      );
      console.log(res);
    });
  };
  console.log(fetchlead);

  const dataSource = fetchlead.map((customer) => ({
    key: customer.Key,
    id: customer.Key,
    name: customer.Name,
    mobile_no: customer.Mobile_no,
    email: customer.Email,
    company_name: customer.Company_name,
    lead_source_type: customer.Lead_Source_Type,
    ownership: customer.Ownsership,
  }));
  // const dataSource = [
  //   {
  //     key: "1",
  //     name: "Parth Goswami",
  //     mobile_no: "+91 XXXXXXXXXX",
  //     email: "parth.goswami@reformiqo.com",
  //     type: "Key Person",
  //     business_names: "Reformiqo Business Service Pvt Ltd",
  //     lead_source: "Expo 2022",
  //   },
  //   {
  //     key: "2",
  //     name: "Parth Goswami",
  //     mobile_no: "+91 XXXXXXXXXX",
  //     email: "parth.goswami@reformiqo.com",
  //     type: "Key Person",
  //     business_names: "Reformiqo Business Service Pvt Ltd",
  //     lead_source: "Expo 2022",
  //   },
  //   {
  //     key: "3",
  //     name: "Parth Goswami",
  //     mobile_no: "+91 XXXXXXXXXX",
  //     email: "parth.goswami@reformiqo.com",
  //     type: "Key Person",
  //     business_names: "Reformiqo Business Service Pvt Ltd",
  //     lead_source: "Expo 2022",
  //   },
  //   {
  //     key: "4",
  //     name: "Parth Goswami",
  //     mobile_no: "+91 XXXXXXXXXX",
  //     email: "parth.goswami@reformiqo.com",
  //     type: "Key Person",
  //     business_names: "Reformiqo Business Service Pvt Ltd",
  //     lead_source: "Expo 2022",
  //   },
  //   {
  //     key: "5",
  //     name: "Parth Goswami",
  //     mobile_no: "+91 XXXXXXXXXX",
  //     email: "parth.goswami@reformiqo.com",
  //     type: "Key Person",
  //     business_names: "Reformiqo Business Service Pvt Ltd",
  //     lead_source: "Expo 2022",
  //   },
  //   {
  //     key: "6",
  //     name: "Parth Goswami",
  //     mobile_no: "+91 XXXXXXXXXX",
  //     email: "parth.goswami@reformiqo.com",
  //     type: "Key Person",
  //     business_names: "Reformiqo Business Service Pvt Ltd",
  //     lead_source: "Expo 2022",
  //   },
  //   {
  //     key: "7",
  //     name: "Parth Goswami",
  //     mobile_no: "+91 XXXXXXXXXX",
  //     email: "parth.goswami@reformiqo.com",
  //     type: "Key Person",
  //     business_names: "Reformiqo Business Service Pvt Ltd",
  //     lead_source: "Expo 2022",
  //   },
  //   {
  //     key: "8",
  //     name: "Parth Goswami",
  //     mobile_no: "+91 XXXXXXXXXX",
  //     email: "parth.goswami@reformiqo.com",
  //     type: "Key Person",
  //     business_names: "Reformiqo Business Service Pvt Ltd",
  //     lead_source: "Expo 2022",
  //   },
  //   {
  //     key: "9",
  //     name: "Parth Goswami",
  //     mobile_no: "+91 XXXXXXXXXX",
  //     email: "parth.goswami@reformiqo.com",
  //     type: "Key Person",
  //     business_names: "Reformiqo Business Service Pvt Ltd",
  //     lead_source: "Expo 2022",
  //   },
  //   {
  //     key: "10",
  //     name: "Parth Goswami",
  //     mobile_no: "+91 XXXXXXXXXX",
  //     email: "parth.goswami@reformiqo.com",
  //     type: "Key Person",
  //     business_names: "Reformiqo Business Service Pvt Ltd",
  //     lead_source: "Expo 2022",
  //   },
  //   {
  //     key: "11",
  //     name: "Parth Goswami",
  //     mobile_no: "+91 XXXXXXXXXX",
  //     email: "parth.goswami@reformiqo.com",
  //     type: "Key Person",
  //     business_names: "Reformiqo Business Service Pvt Ltd",
  //     lead_source: "Expo 2022",
  //   },
  //   {
  //     key: "12",
  //     name: "Parth Goswami",
  //     mobile_no: "+91 XXXXXXXXXX",
  //     email: "parth.goswami@reformiqo.com",
  //     type: "Key Person",
  //     business_names: "Reformiqo Business Service Pvt Ltd",
  //     lead_source: "Expo 2022",
  //   },
  //   {
  //     key: "13",
  //     name: "Parth Goswami",
  //     mobile_no: "+91 XXXXXXXXXX",
  //     email: "parth.goswami@reformiqo.com",
  //     type: "Key Person",
  //     business_names: "Reformiqo Business Service Pvt Ltd",
  //     lead_source: "Expo 2022",
  //   },
  //   {
  //     key: "14",
  //     name: "Parth Goswami",
  //     mobile_no: "+91 XXXXXXXXXX",
  //     email: "parth.goswami@reformiqo.com",
  //     type: "Key Person",
  //     business_names: "Reformiqo Business Service Pvt Ltd",
  //     lead_source: "Expo 2022",
  //   },
  //   {
  //     key: "15",
  //     name: "Parth Goswami",
  //     mobile_no: "+91 XXXXXXXXXX",
  //     email: "parth.goswami@reformiqo.com",
  //     type: "Key Person",
  //     business_names: "Reformiqo Business Service Pvt Ltd",
  //     lead_source: "Expo 2022",
  //   },
  //   {
  //     key: "16",
  //     name: "Parth Goswami",
  //     mobile_no: "+91 XXXXXXXXXX",
  //     email: "parth.goswami@reformiqo.com",
  //     type: "Key Person",
  //     business_names: "Reformiqo Business Service Pvt Ltd",
  //     lead_source: "Expo 2022",
  //   },

  //   // ...
  // ];
 

  const ownership = [
    {
      value: "ubuntu",
      label: "ubuntu",
    },
    {
      value: "window",
      label: "window",
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
      width: 70,
      sorter: (record1, record2) => {
        return record1.account_type > record2.account_type;
      },
    },
    {
      title: "Mobile No.",
      label: "Mobile No.",
      dataIndex: "mobile_no",
      key: "mobile_no",
      resizable: true,
      width: 80,
      align: "left",
      sorter: (record1, record2) => {
        return record1.mobile_no > record2.mobile_no;
      },
    },
    {
      title: "Email",
      label: "Email",
      dataIndex: "email",
      key: "email",
      resizable: true,
      width: 100,
      align: "left",
      sorter: (record1, record2) => {
        return record1.email > record2.email;
      },
    },
    {
      title: "Company Name",
      label: "Company Name",
      dataIndex: "company_name",
      key: "company_name",
      resizable: true,
      // minWidth: 260,
      width: 100,
      // width: 'auto',
      align: "left",
      sorter: (record1, record2) => {
        return record1.business_names > record2.business_names;
      },
    },
    {
      title: "Lead Source",
      label: "Lead Source",
      dataIndex: "lead_source_type",
      key: "lead_source_type",
      resizable: true,
      width: 100,
      align: "left",
      sorter: (record1, record2) => {
        return record1.type > record2.type;
      },
    },
    {
      title: "Ownership",
      label: "Ownership",
      dataIndex: "ownership",
      key: "ownership",
      resizable: true,
      width: 70,
      // width: 'auto',
      align: "left",
      sorter: (record1, record2) => {
        return record1.lead_source > record2.lead_source;
      },
    },
  ];

  const [columns, setColumns] = useState(columnsData);

  const componentRef = useRef();

  function displaySerachbar() {
    document
      .getElementById("searchbar_container")
      .classList.toggle("container_display");
  }

//get contact
const getContact = () => {
  return fetch(`${config.baseUrl}/contact/`)
    .then((response) => response.json())
    .then((data) => {
      setContact(data);
      console.log(data);
    });
};

const getOthers = () => {
  return fetch(`${config.baseUrl}/othersource/`)
    .then((response) => response.json())
    .then((data) => {
      setOther(data);
      console.log(data);
    });
};

const others =other.map((con) => ({
  label: con.name,
  value: con.name,
}));
const contacts = contact.map((con) => ({
  label: con.name,
  value: con.name,
}));

useEffect (()=>{
  getContact();
  getOthers();
},[])


  // Table Search

  const handleData = (newData) => {
    setSearch(newData);
  };
  const [search, setSearch] = useState("");

  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  const filteredData = dataSource.filter((record) =>
    record.email.toLowerCase().includes(search.toLowerCase())
  );
  //Filter field

  useEffect(() => {
    setFilteraaray(
      Object.entries(custfilter)
        .map(([key, value]) => {
          if (value) {
            return { key, value };
          }
        })
        .filter((item) => item)
    );
    //console.log(filterarray);
  }, [custfilter]);
  console.log(filterarray);

  console.log(custfilter);

  const handleChange = (field, value) => {
    setCustFilter({ ...custfilter, [field]: value });
    console.log("value", value);
    console.log("field", value);
    setVisible(true);
  };

  //clear filter

  const clearfilter = () => {
    console.log("button click");
    setCustFilter(filterfield);
  };

  // useEffect(() => {
  //  setCustFilter({...custfilter, ["credit"] :currentValue})

  // }, [currentValue]);

  const onChangeCredit = (e) => {
    const { value, name } = e.target;
    setCustFilter({ ...custfilter, [name]: value });
  };

  const cusomizeData = dataSource.filter(
    (record) =>
      record.lead_source_type.includes(custfilter.lead) &&
      record.ownership.includes(custfilter.ownership)
      && record.name.toLowerCase().includes(search.toLowerCase())
    
  );

  console.log(cusomizeData);

  //tags

  const log = (index, key) => {
    console.log(key);
    setFilteraaray(filterarray.filter((item, i) => i.key !== index.key));
    setCustFilter({ ...custfilter, [key]: "" });
  };
  console.log(filterarray.length);

 // selectedColumns 

 const [selectedColumns, setSelectedColumns] = useState(columns.map(col => col.dataIndex));
 const handleSelectColumn = (e) => {
   const { checked, value } = e.target;
   if(checked) setSelectedColumns([...selectedColumns, value]);
   else setSelectedColumns(selectedColumns.filter(col => col !== value));
 }



  const tableData = useMemo(
    () => (loading ? Array(10).fill({}) : cusomizeData),
    [loading, cusomizeData]
  );
  const tableColumns = useMemo(
    () =>
      loading
        ? columns.map((column) => ({
            ...column,
            sorter: false,
            render: function renderPlaceholder() {
              return (
                <Skeleton
                  key={column.key}
                  title
                  active={true}
                  paragraph={false}
                />
              );
            },
            // cell: <Skeleton />,
          }))
        : columns,
    [loading, columns]
  );
  return (
    <div className="leads-data">
      <Page_heading parent={"Business Account"} child={"Leads"} />

      <div className="leads-table-container">
        <FilterAndSearchBar
          filterdata={[
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
                <SearchDropdown options={contacts} width={330}   name="lead"
              
                value={custfilter.lead}
                onChange={handleChange}/>
              ) : (
                <SearchDropdown options={others} width={330}
                name="lead"
             
                value={custfilter.lead}
                onChange={handleChange} />
              )}

              <div
                className="customer_filter_filed"
                style={{ marginBottom: "20px", marginTop: "20px" }}
              >
                <Tooltip title="prompt text" color="#5C5AD0">
                  {" "}
                  <label className="label">Ownership</label>{" "}
                </Tooltip>
                <SearchDropdown
                  width={330}
                  name="ownership"
                  options={ownership}
                  value={custfilter.ownership}
                  onChange={handleChange}
                />
              </div>
            </div>,
          ]}
          change={filterarray}
          customer={fetchlead.length}
          filterLength={filterarray.length}
          columns={columnsData}
          setColumns={setColumns}
          dataSource={dataSource}
          addBtnName={"Lead"}
          onData={handleData}
          onFilter={(e) => {
            clearfilter(e);
            setVisible(!visible);
          }}
        />
        <OffCanvasExample form={<Leads onClick={getData}/>} />
        <div className="tableData">
          {filterarray.length > 0 && (
            <div className="tags" id="tags">
              <div className="appliedtag ">Applied Filters :</div>
              {filterarray.map((customerfilter, index) => {
                return (
                  customerfilter.value && (
                    <Tooltip
                      className="tlpclr"
                      id="tlpclr"
                      title={`${
                        (customerfilter.key === "lead" && "Lead Source Type") ||
                        (customerfilter.key === "ownership" && "Ownership")
                      } : Lead`}
                      color="#EBECF0"
                    >
                      <Tag
                        key={customerfilter.key}
                        className="tag1"
                        closable
                        onClose={(e) => {
                          log(index, customerfilter.key);
                        }}
                      >
                        {customerfilter.value}
                      </Tag>
                    </Tooltip>
                  )
                );
              })}

              <button
                type="submit"
                className="btnfilter"
                onClick={(e) => {
                  setVisible(!visible);
                  clearfilter(e);
                }}
              >
                Clear All
              </button>
            </div>
          )}

          <Table
            ref={componentRef}
            rowSelection={
              !loading && {
                type: "checkbox",
                columnTitle: "",
                selectedRowKeys,
                onChange: (selectedRowKeys, selectedRows) => {
                  setSelectedRowKeys(selectedRowKeys);
                  setSelectedRows(selectedRows);
                },
              }
            }
            // loading={{indicator : <div><Spin/></div>, spinning:loading}}
            dataSource={tableData}
            columns={tableColumns}
            scroll={!loading && { x: "800px" }}
            //    style={{ width: "100%" }}
            pagination={
              !loading && {
                current: page,
                pageSize: pageSize,
                onChange: (page, pageSize) => {
                  setPage(page);
                  setPageSize(pageSize);
                },
                total: cusomizeData.length,
                showTotal: (total, range) =>
                  `Showing ${range[1]}-${range[1]} of ${total} Leads`,
              }
            }
            rowClassName={(record) =>
              record.key % 2 === 0 ? "highlight_row" : ""
            }
            search={{
              keyword: search,
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default LeadsData;
