 import { React, useState, useRef } from "react";
import FilterAndSearchBar from "../../FilterAndSearchBar/FilterAndSearchBar";
import Page_heading from "../../Page_Heading/Page_heading";
import "./Leads-Data.scss";
import { Spin, Table, Tooltip, Tag, Skeleton, Popover, Button, Modal } from "antd";
import OffCanvasExample from "../../OffCanvas/OffCanvasExample";
import Leads,{ChildStateModificationFunc} from "../Leads";
import SearchDropdown from "../../AllDropdowns/SearchDropdown/SearchDropdown";
import SearchDropdownAddButton from "../../AllDropdowns/SearchDropdownAddButton/SearchDropdownAddButton";
import axios from "axios";
import config from "../../Database/config";
import { useEffect } from "react";
import { useMemo } from "react";
import editdelete from "../../../assets/Images/Confirmation/editdelete.svg";
import Swal from "sweetalert2";
import { toast, ToastContainer } from "react-toastify";
import deletelogo from "../../../assets/Images/ActionStatus/Delete.svg";
import editlogo from "../../../assets/Images/ActionStatus/edit.svg";
import statuslogo from "../../../assets/Images/ActionStatus/status.svg";
import alert from "../../../assets/Images/Confirmation/confirm.svg";


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
  const [confirm, setCofirm] = useState(false);
  const [deleteRecord, setDeleteRecord] = useState(null)
  
//for modal delete

  const handleConfirmCancel = (record) => {
    setDeleteRecord(record)
      setCofirm(true);
      //setPopOverVisible(false)
    };
  
    const handleConfirm = () => {
      setCofirm(false);
      setDeleteRecord(null)
      // setPopOverVisible(false)
    };
  
    const handleSubmit = () =>
    {
    //  alert("Data", record)
      deleteUser(deleteRecord);
      getData();
      setCofirm(false);
      getData();
    }

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
 
//update
function showCanvas() {
  var m = document.querySelector(".menu1");
  m.classList.add("smenu");
  //document.root.style.backgroundColor='rgba(0,0,0,0.4)';
  document.getElementById("gradient").classList.add("body_gradient");
}

const handleUpdate = (oldData) => {
  console.log(oldData);
  console.log(oldData.id);
  showCanvas();

    ChildStateModificationFunc(oldData)
    console.log(oldData)

};
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
      width: "max-content",
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
      width: "max-content",
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
      width: "max-content",
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
      width: "max-content",
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
      width: "max-content",
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
      width: "max-content",
      // width: 'auto',
      align: "left",
      sorter: (record1, record2) => {
        return record1.lead_source > record2.lead_source;
      },
    },
     {
          title: "",
          label: "Action",
          dataIndex: "action",
          key: "action",
          wodth: 60,
          render: (text, record) => (
            <>
            <Popover      getPopupContainer={(trigger) => trigger.parentElement} showArrow={false} content={
                 <>
           
                 <div style={{display:"flex", alignItems:"center", gap:"11px", marginBottom:"10px"}}>  
                 <img src={deletelogo} />
                 <div>
                 <button 
                 className="actionlabel"
                 onClick={() => handleConfirmCancel(record)}
                
                  
                 >
                Delete
                 </button>
                 </div>
                 </div>
                 <div style={{display:"flex", alignItems:"center", gap:"11px", marginBottom:"10px"}}>
                  <img src={editlogo} />
                  <div>
                 <button
      
                    className="actionlabel"
                    onClick={() => handleUpdate(record)}
                 >
                Update
                 </button>
                 </div>
                 </div>
                 <div style={{display:"flex", alignItems:"center", gap:"11px"}}>
                  <img src={statuslogo} />
                  <div>
                 <button
                  className="actionlabel"
                  style={{minWidth: "max-content"}}
                    // onClick={() => handleUpdate(record)}
                 >
                  Set as Activate
                 </button>
                 </div>
                 </div>
                 </>
        } title="" height={100} trigger="click">
        <img src={editdelete} style={{cursor:"pointer"}} />
        </Popover>
            </>
         
          

              ),
          resizable: true,
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

  //delete data
const deleteUser = (record)=>
{
  console.log(record);
  console.log(record.id);
  axios
  .delete(
    `${config.baseUrl}/leads/${record.id}/`);
       getData();
    //   console.log(currency)
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
   getPopupContainer={(trigger) => trigger.parentElement} 
        
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
                      } : ${customerfilter.value}`}
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
             <Modal
        open={confirm}
     //   onOk={handleMaterialOk}
        width={"max-content"}
        onCancel={handleConfirm}
        style={{ top: 20 }}
        className={"deleteconfirm"}
        footer={[
          <div style={{ marginLeft: "331px" }}>
            <Button
              key="cancel"
              onClick={handleConfirm}
              style={{
                width: "86px",
                height: "38px",
                fontSize: "14px",
                fontWeight: "700",
                color: "#8E9CAA",
                borderColor: "#C2CAD2",
              }}
            >
              Cancel
            </Button>
            <Button
              key="submit"
              type="primary"
              onClick={handleSubmit}
              style={{
                width: "88px",
                height: "38px",
                backgroundColor: "#DA2F58",
                fontSize: "14px",
                fontWeight: "700",
                color: "#FFFFFF",
              }}
            >
              Delete
            </Button>
          </div>,
        ]}
        closeIcon={
          <div className="icon">
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
          </div>
        }
      >
        <div className="confirmCoontainer">
          <div className="confirmresources">
            <div className="imgsetting">
              <div className="imgbackground">
                <img src={alert} style={{ width: "38px", height: "38px" }} />
              </div>
            </div>

            <div>
              <p
                style={{
                  fontSize: "22px",
                  color: "#2B3347",
                  fontWeight: "500",
                  padding: "21px 0px 0px 0px",
                }}
              >
                Delete Lead
              </p>
            </div>
          </div>
          <div>
            <p className="confirmationtext">
              Are you sure you want to close this window? <br /> All the value
              which you filled in the fields will be deleted.
              <br /> This action cannot recover the value.
            </p>
          </div>
        </div>
      </Modal>
        </div>
      </div>
    </div>
  );
};

export default LeadsData;
