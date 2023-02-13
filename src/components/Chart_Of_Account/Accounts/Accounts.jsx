import { Button, Modal, Popover, Select, Space, Table, Typography } from "antd";
import { React, useState, useRef, useEffect } from "react";
import FilterAndSearchBar from "../../FilterAndSearchBar/FilterAndSearchBar";
import OffCanvasExample from "../../OffCanvas/OffCanvasExample";
import Page_heading from "../../Page_Heading/Page_heading";
import AccountForm from "../AccountForm/AccountForm";
import "./Accounts.scss";
import editdelete from "../../../assets/Images/Confirmation/editdelete.svg";
import SearchDropdown from "../../AllDropdowns/SearchDropdown/SearchDropdown";
import deletelogo from "../../../assets/Images/ActionStatus/Delete.svg";
import editlogo from "../../../assets/Images/ActionStatus/edit.svg";
import statuslogo from "../../../assets/Images/ActionStatus/status.svg";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import alert from "../../../assets/Images/Confirmation/confirm.svg";
import config from "../../Database/config";

import axios from 'axios';
//import { OptionGroup } from 'react-form-elements';
const { OptGroup } = Select;

const resetValue = {
  account_type: "",
  account_code: "",
  parent_account: "",
  account_name: "",
  description: "",
};

function Accounts() {
  const [formData, setFormData] = useState(resetValue);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [confirm, setCofirm] = useState(false);
  const [deleteRecord, setDeleteRecord] = useState(null);
  //const [reportingl, setReportingl] = useState([]);
  const [groups, setGroups] = useState([]);
  const [reportingl3, setReportingl3] = useState([]);
  const [creditAmount, setCreditAmount] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [fetchaccount, setFetchaccount] = useState([]);
  const [loading, setloading] = useState(true);

  const { Option } = Select;


  function handleChange(value) {
    console.log(`selected ${value}`);
  }

  const handleInputChange = event => {
    setInputValue(event.target.value);
  };

  const firstFunction = () => {
    console.log("First function called");
  };

  const secondFunction = () => {
    console.log("Second function called");
  };
  //for modal delete

  const handleConfirmCancel = (record) => {
    setDeleteRecord(record);
    setCofirm(true);
    //setPopOverVisible(false)
  };

  const handleConfirm = () => {
    setCofirm(false);
    setDeleteRecord(null);
    // setPopOverVisible(false)
  };

  const handleSubmit = () => {
    //  alert("Data", record)
    // deleteUser(deleteRecord);
    //   getData();
    setCofirm(false);
    //   getData();
  };

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
    //   setFormData(resetValue);
  };

  //dropodwn withtwo dropodwn
  const handleReporting3 = (e) => {
    console.log("l3", e.target.value);
  };

  const handleSubmitChecked = (e) => {
    // e.preventDefault();
    console.log("You clicked submit.", e.target.value);
   // getReporting(e.target)
  };
  // \\onchange

  const handleDrpChange = (field, value) => {
    setFormData({ ...formData,account_type: value.value });
    console.log(field);
    console.log(value);
  };

  const handleDrpChangel3 = (field, value) => {
    setFormData({ ...formData,[field]: value });
    console.log(field);
    console.log(value);
  };
  // useEffect(() => {
  //   setFormData(value);
  // }, [value]);

  console.log(formData);
  //console.log(abc)
 // let abc = formData.account_type;
//  console.log(abc);

  // const getReporting = () => {
  //   axios.get(`http://127.0.0.1:8000/backend/reporting/`)
  //     .then((response) => {
  //       setGroups(response.data);
  //       console.log(response.data);
  //     });
  // };

 // let abc="Current Assets"
  const getReporting = () => {
  return fetch(`${config.baseUrl}/reporting/?company_id=1${formData.account_type && `&reporting_l2=${formData.account_type}`}`)
      .then((response) => response.json())
      .then((data) => {
        setGroups(data);
        console.log(data);
      });
  };

  const groupedData = groups.reduce((acc, curr) => {
    if (!acc[curr.reporting_l1]) {
      acc[curr.reporting_l1] = [];
    }
    if (!acc[curr.reporting_l1].includes(curr.reporting_l2)) {
      acc[curr.reporting_l1].push(curr.reporting_l2);
    }
    return acc;
  }, {});

  const options = Object.keys(groupedData).map(key => (
    <OptGroup label={key} key={key.id}>
      {groupedData[key].map(child => (
        <Option value={child} key={child.id}>
          {child}
        </Option>
      ))}
    </OptGroup>
  ));

  // const uniqueData = groups.reduce((acc, item) => {
  //   if (!acc[item.reporting_l2]) {
  //     acc[item.reporting_l2] = item;
  //   }
  //   return acc;
  // }, {});
  // const uniqueDatal1 = groups.reduce((acc, item) => {
  //   if (!acc[item.reporting_l1]) {
  //     acc[item.reporting_l1] = item;
  //   }
  //   return acc;
  // }, {});

    const onBlur = (e) => {
    console.log(e.target.value)
    console.log(formData.account_type)
    //setGst(!gst);
   // console.log(gst);
  };

  useEffect(() => {
    getReporting();
    console.log(formData.account_type)
    //  getReportingl3();
  }, [formData.account_type]);

  const reporting3 = 
  groups.map((place) => ({
    key:place.id,
    label: place.reporting_l3,
    value: place.reporting_l3,
  }));

  // const reporting =
  // reportingl.map((place) => ({
  //   label: place.reporting_l2,
  //   value: place.reporting_l2,
  // }));
  // const l3g = [{
  //   label:"wedwe",
  //  // value:reporting,
  // }]


  //fetch account data
  useEffect(() => {
    getData();
    
  }, []);
  const getData = async () => {
    await axios.get(`${config.baseUrl}/chartofaccount/`).then((res) => {
      setloading(false);
      setFetchaccount(
        res.data.map((row) => ({
          Key: row.id,
          Account_Name: row.account_name,
          Account_Code: row.account_code,
          Description: row.description,
       
          // id: row.id
        }))
      );
      console.log(res);
    });
  };
  console.log(fetchaccount);

  const dataSource = fetchaccount.map((customer) => ({
    key: customer.Key,
    id: customer.Key,
    account_name: customer.Account_Name,
    account_code: customer.Account_Code,
    description: customer.Description,
    status:"Active"

  }));

  const columnsData = [
    {
      title: "Account Name",
      label: "Account Name",
      dataIndex: "account_name",
      key: "account_name",
      resizable: true,
      fixed: "left",
      align: "left",
      width: "auto",
      showSorterTooltip: { title: "" },
      sorter: (record1, record2) => {
        return record1.account_name > record2.account_name;
      },
    },

    {
      title: "Account Code",
      label: "Account Code",
      dataIndex: "account_code",
      key: "account_code",
      resizable: true,
      width: "auto",
      align: "left",
      showSorterTooltip: { title: "" },
      // ellipsis:true,
      textWrap: "ellipsis" | "word-break",
      sorter: (record1, record2) => {
        return record1.account_code > record2.account_code;
      },
      render: (text, record) => {
        return (
          <div
            style={{
              marginRight: "117px",
              display: "flex",
              justifyContent: "end",
              textOverflow: "ellipsis",
              overflow: "hidden",
            }}
          >
            {text}
          </div>
        );
      },
    },

    {
      title: "Account Type",
      label: "Account Type",
      dataIndex: "account_type",
      key: "account_type",
      resizable: true,
      fixed: "left",
      align: "left",
      width: "auto",
      showSorterTooltip: { title: "" },
      sorter: (record1, record2) => {
        return record1.account_type > record2.account_type;
      },
    },
    {
      title: "Description",
      label: "Description",
      dataIndex: "description",
      key: "description",
      resizable: true,
      width: "auto",
      align: "left",
      showSorterTooltip: { title: "" },
      sorter: (record1, record2) => {
        return record1.module_type > record2.module_type;
      },
    },
    {
      title: "Status",
      label: "Status",
      dataIndex: "status",
      key: "status",
      resizable: true,
      width: 150,
      align: "left",
      showSorterTooltip: { title: "" },
      sorter: (record1, record2) => {
        return record1.module_type > record2.module_type;
      },
      render: (status, record, text) => (
        <>
          <div style={{ display: "flex", alignItems: "center" }}>
            <div className="bullet_item"></div>
            <Typography.Text
              style={
                record.status === "Active"
                  ? { color: "#28A745", fontSize: "14px", fontWeight: "600" }
                  : ""
              }
            >
              {record.status}
            </Typography.Text>
            <span
              style={{
                marginLeft: "46px",
                display: "flex",
                alignItems: "center",
              }}
              //    className={`${this.props.className}-delete`}
              //  onClick={(e) => { this.onDelete(record.key, e); }}
            >
              <Popover
                getPopupContainer={(trigger) => trigger.parentElement}
                showArrow={false}
                content={
                  <>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "11px",
                        marginBottom: "10px",
                      }}
                    >
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
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "11px",
                        marginBottom: "10px",
                      }}
                    >
                      <img src={editlogo} />
                      <div>
                        <button
                          className="actionlabel"
                          // onClick={() => handleUpdate(record)}
                        >
                          Update
                        </button>
                      </div>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "11px",
                      }}
                    >
                      <img src={statuslogo} />
                      <div>
                        <button
                          className="actionlabel"
                          style={{ minWidth: "max-content" }}
                          // onClick={() => handleUpdate(record)}
                        >
                          Set as Activate
                        </button>
                      </div>
                    </div>
                  </>
                }
                title=""
                height={100}
                trigger="click"
              >
                <img src={editdelete} style={{ cursor: "pointer" }} />
              </Popover>

              {/* <img src={editdelete} /> */}
            </span>
          </div>
        </>
      ),
    },
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
  };
  const [search, setSearch] = useState("");

  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  const filteredData = dataSource.filter((record) =>
    record.account_name.toLowerCase().includes(search.toLowerCase())
  );
  return (
    <div className="account-data">
      <Page_heading parent={"Chart of Accounts"} child={"Accounts"} />
      <div className="account-table-container">
        <FilterAndSearchBar
          columns={columnsData}
          setColumns={setColumns}
          addBtnName={"Account"}
          onClick={showModal}
          onData={handleData}
        />
        <Modal
          title="Create Account"
          open={isModalOpen}
          onOk={handleOk}
          width={740}
          bodyStyle={{ height: 345 }}
          onCancel={handleCancel}
          style={{ top: 20 }}
          className={"footerconfirm"}
          footer={[
            <Button
              key="submit"
              type="primary"
              //  onClick={handleSubmit}
              style={{
                width: "88px",
                height: "38px",
                backgroundColor: "#5C5AD0",
                fontSize: "14px",
                fontWeight: "400",
              }}
              //  onClick={() => handleFormSubmit()}
            >
              Submit
            </Button>,
            <Button
              key="cancel"
              onClick={handleCancel}
              style={{
                width: "86px",
                height: "38px",
                fontSize: "14px",
                color: "#8E9CAA",
                border: ".5px solid #C2CAD2",
              }}
            >
              Cancel
            </Button>,
          ]}
          closeIcon={
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
          }
        >
          <div style={{ padding: "0px 30px 0px 30px" }}>
            <p className="subtitle">
              Create New Chart of Account according to your Need
            </p>
            <hr style={{ marginTop: "20px" }} />

            <div style={{ marginTop: "20px", display: "flex", gap: "20px" }}>
              <div>
                <p
                  style={{
                    fontSize: "14px",
                    color: "#566A7F",
                    fontWeight: "400",
                  }}
                >
                  Reporting Account
                </p>
                {/* <Select defaultValue="lucy" style={{ width: 200 }} onChange={handleChange}>
    <OptGroup label="Manager">
      <Option value="jack">
     
        Jack
      </Option>
      <Option value="lucy">Lucy</Option>
    </OptGroup>
    <OptGroup label="Engineer">
      <Option value="Yiminghe">yiminghe</Option>
    </OptGroup>
   </Select> */}

                {/* <Select
                 name="account_type"
                 value={formData.account_type || undefined}
                  onChange={handleDrpChange}
                        showSearch
                  style={{
                    width: "330px",
                    marginTop: "7px",
                    borderRadius: "6px !important",
                  }}
                  placeholder="Select Value"
                  size={"large"}
                >
                   {
                     Object.values(uniqueDatal1).map((group) => (
                  <Select.OptGroup
                    className="abc"
                    key={group.id}
                    label={group.reporting_l1}
                    style={{ fontSize: "20px" }}
                  >
                     {groups.length > 0 ? (
                     Object.values(uniqueData).map((group) => (
                      <Select
                        key={group.id}
                        label={group.reporting_l2}
                        value={group.reporting_l2}
                      >
                      </Select>
                    ))
                  ) : (
                    <Option disabled>Loading...</Option>
                  )}
                  </Select.OptGroup>
                  ))
                }
                  {/* {groups.length > 0 ? (
                     Object.values(uniqueData).map((group) => (
                      <Select
                        key={group.id}
                        label={group.reporting_l2}
                        value={group.reporting_l2}
                      >
                      </Select>
                    ))
                  ) : (
                    <Option disabled>Loading...</Option>
                  )} 
                </Select> */}

                {/* <Select
 //value={formData.account_type || undefined}
 onChange={handleDrpChange}
  style={{ width: '200px' }}
  placeholder="Select a value"
>
{
  groups && groups.map((parent) => (
    <Select.OptGroup key={parent.id} label={parent.reporting_l1}>
      {
        parent.children.map((child) => (
          <Select.Option key={child.id} value={child.reporting_l2}>
            {child.reporting_l2}
          </Select.Option>
        ))
      }
    </Select.OptGroup>
  ))
}

</Select> */}

                 {/* <SearchDropdown
          
                  width={330}
               //   OptGroup={<OptGroup label="Assets"></OptGroup>}
                //  options={reporting}
                  onChange={handleDrpChange}
                  onBlur={onBlur}
                  // onBlur={(e) => {
                  //   handleSubmitChecked(e);
                  // }}
                  name="account_type"
                  value={formData.account_type}
                  options={options}
                />     */}

<Select 
  name="account_type"
  value={formData.account_type || undefined}
   onChange={handleDrpChange}
         showSearch
   style={{
     width: "330px",
     marginTop: "7px",
     borderRadius: "6px !important",
   }}
   onFocus={()=> setFormData((value)=>({...value, account_type:"", parent_account:"" }))}
   placeholder="Select Value"
   size={"large"}>
      {options}
    </Select>

                {/* <input
      type="text"
      value={inputValue}
      onChange={event => {
        handleInputChange(event);
        firstFunction();
        secondFunction();
      }}
      /> */}
                <p
                  style={{
                    marginTop: "18px",
                    fontSize: "14px",
                    color: "#566A7F",
                    fontWeight: "400",
                  }}
                >
                  Parent Account
                </p>
                <SearchDropdown width={330} 
                name="parent_account"
                value={formData.parent_account}
                onChange={handleDrpChangel3}
                  //onFocus={()=> setFormData((value)=>({...value, account_type:"" }))}
                options={formData.account_type && reporting3} />
              </div>

              <div>
                <p
                  style={{
                    fontSize: "14px",
                    color: "#566A7F",
                    fontWeight: "400",
                  }}
                >
                  Account Code
                </p>
                <input
                  disabled
                  className="accountcode"
                  type="text"
                  placeholder="0009"
                  name="terms"
                />
                <p
                  style={{
                    marginTop: "18px",
                    fontSize: "14px",
                    color: "#566A7F",
                    fontWeight: "400",
                  }}
                >
                  Account Name
                </p>
                <input
                  className="parmentaccount"
                  type="text"
                  // placeholder="Something about account"
                  name="terms"
                />
              </div>
            </div>
            <div>
              <p
                style={{
                  marginTop: "18px",
                  fontSize: "14px",
                  color: "#566A7F",
                  fontWeight: "400",
                }}
              >
                Description
              </p>
              <textarea
                resizable={false}
                className="description"
                style={{ width: "668.4px", height: "68.4px", outline: "none" }}
                type="text"
                placeholder="Something about account"
                name="terms"
              />
            </div>
          </div>
        </Modal>
        {/* <OffCanvasExample  form={<AccountForm/>}/> */}
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
          scroll={{ x: "1100px" }}
          //    style={{ width: "100%" }}
          //  loading={true}
          pagination={
            !loading && {
              current: page,
              pageSize: pageSize,
              onChange: (page, pageSize) => {
                setPage(page);
                setPageSize(pageSize);
              },
              total: fetchaccount.length,
              showTotal: (total, range) =>
                `Showing ${range[1]}-${range[1]} of ${total} ChartOfAccounts`,
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
                  Delete Account
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
  );
}

export default Accounts;
