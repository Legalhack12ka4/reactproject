import {
  Button,
  Modal,
  Popover,
  Select,
  Space,
  Spin,
  Table,
  Typography,
} from "antd";
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
import { toast, ToastContainer } from "react-toastify";
import alert from "../../../assets/Images/Confirmation/confirm.svg";
import config from "../../Database/config";
import { useFormik } from "formik";

import axios from "axios";
import { chartOfAccountSchema } from "../../../Schemas";
//import { OptionGroup } from 'react-form-elements';
const { OptGroup } = Select;

const resetValue = {
  account_type: "",
  account_code: "",
  reporting: "",
  account_name: "",
  description: "",
};
const initialFieldValues = {
  account_type: "",
  account_code: "",
  reporting: "",
  account_name: "",
  description: "",
};

function Accounts() {
  const [lastAccountId, setLastAccountId] = useState(null); // account code
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
  const [inputValue, setInputValue] = useState("");
  const [fetchaccount, setFetchaccount] = useState([]);
  const [loading, setloading] = useState(true);
  const [confirmData, setCofirmData] = useState(false); // for popup conformation modal
  const [open, setOpen] = useState(false);
  let suffixIcon;
  if (open) {
    suffixIcon = (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="12.5"
        height="12.5"
        viewBox="0 0 16 16.001"
      >
        <path
          id="Path_23"
          data-name="Path 23"
          d="M8.342,15.185a6.8,6.8,0,0,0,4.187-1.443L16.291,17.5,17.5,16.291l-3.76-3.76a6.834,6.834,0,1,0-5.4,2.653Zm0-11.974A5.132,5.132,0,1,1,3.211,8.342,5.137,5.137,0,0,1,8.342,3.211Z"
          transform="translate(-1.5 -1.5)"
          fill="#8e9caa"
        />
      </svg>
    );
  } else {
    suffixIcon = (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="11.504"
        height="6.289"
        viewBox="0 0 11.504 6.289"
      >
        <path
          id="Path_125"
          data-name="Path 125"
          d="M11.43,14.84a1.21,1.21,0,0,0,1.62,0l4.4-4.19a1,1,0,1,0-1.42-1.41L12.36,12.7a.25.25,0,0,1-.33,0L7.9,9.11a1,1,0,0,0-1.32,1.51Z"
          transform="translate(-6.237 -8.862)"
          fill="#8e9caa"
        />
      </svg>
    );
  }

  const { Option } = Select;

  //cofirmation modal
  const handleConfirmData = () => {
    setCofirmData(true);
  };

  const handleConfirmDataClose = () => {
    setCofirmData(false);
    // setPopOverVisible(false)
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

  // const handleSubmit = () => {
  //   setCofirm(false);
  // };

  // validation

  const {
    errors,
    values,
    handleBlur,
    touched,
    handleChange,
    handleSubmit,
    setFieldValue,
    setFieldTouched,
  } = useFormik({
    initialValues: initialFieldValues,

    validationSchema: chartOfAccountSchema,
    onSubmit: (values) => {
      console.log(values);
    },

  });
  console.log(errors);
  console.log(values)
console.log(chartOfAccountSchema)
  const handleSubmitModal = () => {
    //  alert("Data", record)
    deleteUser(deleteRecord);
    getData();
    setCofirm(false);
    getData();
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setCofirmData(false);
    setCofirm(false);
    setIsModalOpen(false);
    setFormData(resetValue);
  };

  const onCancel = () => {
    if (Object.values(formData).every((val) => val === "")) {
      setIsModalOpen(false);
    } else {
      handleConfirmData();
    }
  };
  // \\onchange

  const onChange = (e) => {
    const { value, name } = e.target;

    setFormData({ ...formData, [name]: value });
    console.log(value);
    console.log(name);
  };

  const handleDrpChange = (field, value) => {
    setFormData({ ...formData, account_type: value.value });
    setFieldValue("account_type", value.value);
    setFieldTouched("account_type", false);
    console.log(field);
    console.log(value);
  };
  const reporting3 = groups.map((place) => ({
    key: place.id,
    label: place.reporting_l3,
    value: place.reporting_l3,
  }));

  const handleDrpChangel3 = (field, value) => {
    const selectedOption = reporting3.find((option) => option.value === value);
    setFormData({
      ...formData,
      [field]: value,
      reporting: selectedOption.key, // Add the id to the state
    });
    setFieldValue(field, value);
    setFieldTouched(field, false);
    console.log(field);
    console.log(value);
    console.log(selectedOption);
  };

  // const handleDrpChangel3 = (field, value) => {
  //   setFormData({ ...formData,[field]: value });
  //   console.log(field);
  //   console.log(value);
  // };

  console.log(formData);
  const getReporting = () => {
    return fetch(
      `${config.baseUrl}/reporting/?company_id=1${
        formData.account_type && `&reporting_l2=${formData.account_type}`
      }`
    )
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

  const options = Object.keys(groupedData).map((key) => (
    <OptGroup label={key} key={key.id}>
      {groupedData[key].map((child) => (
        <Option value={child} key={child.id}>
          {child}
        </Option>
      ))}
    </OptGroup>
  ));

  useEffect(() => {
    getReporting();
    console.log(formData.account_type);
    //  getReportingl3();
  }, [formData.account_type]);

  // console.log(reporting3.key)
  //insert data to account
  //fetch account data
  useEffect(() => {
    getData();
  }, [groups]);

  const handleFormSubmit = () => {
    axios
      .post(
        `${config.baseUrl}/chartofaccount/`,
        {
          reporting: formData.reporting,
          account_code: accountValue,
          account_name: formData.account_name,
          description: formData.description,
          is_active: true,
          is_deleted: false,
          status: 12,
          type: 12,
          modual_type: 12,
          item_type: 12,
          transaction_side: 12,
          company_id: 1,
          created_by: 1,
          updated_by: 1,
        },
        formData
      )
      .then((response) => {
        getData();
        setFormData(resetValue);
        // setFormData({
        //   reporting: "",
        //   account_code: "",
        //   account_name: "",
        //   description: "",
        //   account_type: "",
        // });
        //  closeModal();
        getData();
        handleCancel();
        getData();
        toast.success("Added Successfuly", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
        });
        getData();
      });
  };

  //delete data
  const deleteUser = (record) => {
    console.log(record);
    console.log(record.id);
    axios.delete(`${config.baseUrl}/chartofaccount/${record.id}/`);
    getData();
    //   console.log(currency)
  };

  // const fetchData = async () => {
  //   try {
  //     const response = await axios.get(`${config.baseUrl}/chartofaccount/`);
  //     const accountData = response.data;
  //     setLastAccountId(accountData[accountData.length - 1].id);
  //     setFetchaccount(accountData.map((row) => ({ /* map to desired object format */ })));
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  const getData = async () => {
    await axios.get(`${config.baseUrl}/chartofaccount/`).then((res) => {
      setloading(false);
      const maxId = res.data.reduce((acc, row) => Math.max(acc, row.id), 0);
      setLastAccountId(maxId);
      setFetchaccount(
        res.data.map((row) => ({
          Key: row.id,
          Account_Name: row.account_name,
          Account_Code: row.account_code,
          Description: row.description,
          // Reporting: groups.map((option) => option.id === row.reporting && option.reporting_l3)
          Reporting: reporting3.find(
            (option) => option.key === row.reporting && option.label
          ).label,

          id: row.id,
        }))
      );
      // console.log(res);
    });
  };
  // console.log(reporting3.find((option) => option.key === 1 && option.label).value)
  // console.log(groups.map((option) => option.id === 1 && option.reporting_l3));
  console.log(fetchaccount);

  const accountValue = lastAccountId ? lastAccountId + 1 : "";

  const dataSource = fetchaccount.map((customer) => ({
    key: customer.Key,
    id: customer.Key,
    account_name: customer.Account_Name,
    account_code: customer.Account_Code,
    description: customer.Description,
    reporting: customer.Reporting,
    status: "Active",
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
      title: "Reporting Account",
      label: "Reporting Account",
      dataIndex: "reporting",
      key: "reporting",
      resizable: true,
     // fixed: "left",
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
          onOk={handleConfirmDataClose}
          width={390}
          // bodyStyle={{ height: 370 }}
          onCancel={onCancel}
          style={{ top: 20 }}
          className={"footerconfirm"}
          footer=""
          //</div>footer={[
          // <Button
          //   key="submit"
          //   type="primary"
          //   //  onClick={handleSubmit}
          //   style={{
          //     width: "88px",
          //     height: "38px",
          //     backgroundColor: "#5C5AD0",
          //     fontSize: "14px",
          //     fontWeight: "400",
          //   }}
          //   onClick={() => handleFormSubmit()}
          // >
          //   Submit
          // </Button>,
          // <Button
          //   key="cancel"
          //   onClick={onCancel}
          //   // {formData && Object.values(formData).some(val => val !== "") && ()}
          //   style={{
          //     width: "86px",
          //     height: "38px",
          //     fontSize: "14px",
          //     color: "#8E9CAA",
          //     border: ".5px solid #C2CAD2",
          //   }}
          // >
          //   Cancel
          // </Button>,
          //  ]}
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
          <div style={{ padding: "0px 30px 0px 30px", paddingBottom: "30px" }}>
            <p className="subtitle">
              Create New Chart of Account
            </p>
            <hr style={{ marginTop: "20px",     border: "1px solid #eceef1"}} />
            <form onSubmit={handleSubmit} autoComplete="off">
              <div style={{ marginTop: "20px",  gridTemplateColumns:"repeat(2,1fr)" ,gap: "20px" }}>

              <div style={{marginBottom: "20px"}}>
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
                  name="account_code"
                  value={accountValue}
                />
                {/* <input
                  disabled
                  className="accountcode"
                  type="text"
                  placeholder="0009"
                  name="terms"
                /> */}

              </div>

               <div style={{marginBottom: "20px"}}>
                <p
                  style={{
                    fontSize: "14px",
                    color: "#566A7F",
                    fontWeight: "400",
                  }}
                >
                   Type
                </p>
                {/* <SearchDropdown width={330} options={options/> */}
                <div className={`srchdrp ${errors.account_type  && touched.account_type && "drpError"}`}>
                  {/* <div className={`${
                    errors.account_type && touched.account_type && "inputError"
                  } srchdrp`} > */}
                
                  <Select
                    name="account_type"
                    value={formData.account_type || undefined}
                    onChange={handleDrpChange}
                    // error={errors.account_type && touched.account_type ? true : false}
                    // errorMsg="Reporting is required"
                    showSearch
                    style={{
                      width: "330px",
                     // marginTop: "7px",
                      borderRadius: "6px !important",
                    }}
                    onFocus={() =>
                      setFormData((value) => ({
                        ...value,
                        account_type: "",
                        reporting: "",
                      }))
                    }
                    placeholder="Select Value"
                    size={"large"}
                    suffixIcon={suffixIcon}
                    onDropdownVisibleChange={(o) => setOpen(o)}
                  >
                    {loading ? (
                      <div>
                        <p>Loading...</p>
                      </div>
                    ) : (
                      options
                    )}
                  </Select>
                </div>
                {errors.account_type && touched.account_type && (
                  <p className="error_text">{errors.account_type}</p>
                )}
                </div>
                 
                <div style={{marginBottom: "20px"}}>
                <p
                  style={{
                  //  marginTop: "18px",
                    fontSize: "14px",
                    color: "#566A7F",
                    fontWeight: "400",
                  }}
                >
                  Sub Type
                </p>
                <SearchDropdown
                  width={330}
                  name="reporting"
                  values={formData.reporting || undefined}
                  onChange={handleDrpChangel3}
                  options={formData.account_type && reporting3}
                  error={errors.reporting && touched.reporting ? true : false}
                  errorMsg="Reporting is required"
                  // options={
                  //   formData.account_type && reporting3.length > 0 ? (
                  //     reporting3
                  //   ) : (
                  //     <Spin size="large" />
                  //   )
                  // }
                />
                </div>
               
              <div style={{marginBottom: "20px"}}>
                <p
                  style={{
                  //  marginTop: "18px",
                    fontSize: "14px",
                    color: "#566A7F",
                    fontWeight: "400",
                  }}
                >
                  Account Name
                </p>
                <div
                  className={`${
                    errors.account_name && touched.account_name && "inputError"
                  } parmentaccount  focus-outline`}
                  style={{ display: "flex", alignItems: "center" }}
                >
                  <input
                    // className="parmentaccount"
                   
                    type="text"
                    // placeholder="Something about account"
                    name="account_name"
                    value={formData.account_name}
                    onChange={(e) => {
                      handleChange(e);
                      onChange(e);
                    }}
                    onBlur={handleBlur}
                  />
                  {errors.account_name && touched.account_name && (
                    <div className="error_icon">
                      <img
                        src="/images/icons/exclamation_icon.svg"
                        alt="error"
                      />
                    </div>
                  )}
                </div>
                {errors.account_name && touched.account_name && (
                  <p className="error_text">{errors.account_name}</p>
                )}
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
                <div
                  className={`${
                    errors.description && touched.description && "inputError"
                  } description  focus-outline`}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    width: "318.4px",
                    height: "68.4px",
                    outline: "none",
                    resize: "none",
                    overflow:"hidden"
                  }}
                >
                  <textarea
                    resizable={false}
                    // className="description"
                    style={{
                      width: "668.4px",
                      height: "68.4px",
                      outline: "none",
                      border: "none",
                      resize: "none",
                    }}
                    type="text"
                    placeholder="Something about account"
                    name="description"
                    value={formData.description}
                    onChange={(e) => {
                      handleChange(e);
                      onChange(e);
                    }}
                  />
                  {errors.description && touched.description && (
                    <div className="error_icon">
                      <img
                        src="/images/icons/exclamation_icon.svg"
                        alt="error"
                      />
                    </div>
                  )}
                </div>
                {errors.description && touched.description && (
                  <p className="error_text">{errors.description}</p>
                )}
              </div>
              <div
                className="contactbutton_bottom"
                style={{ marginTop: "30px" }}
              >
                <button
                  type="submit"
                  className="contactsavebutton btn_hover_animation"
                  onClick={() => {
                    handleFormSubmit();
                  }}
                >
                  {formData.id ? "Update" : "Submit"}
                </button>
                {/* <input type="submit" className="contactsavebutton"  onClick={() => {handleFormSubmit()}}/> */}
                <button
             
                  type="button"
                  className="contactcancelbutton btn_hover_animation"
                  //onClick={handleclose}
                  onClick={onCancel}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </Modal>

        {/* <OffCanvasExample  form={<AccountForm/>}/> */}
        <Table
          ref={componentRef}
          rowSelection={{
            type: "checkbox",
            columnTitle: "",
            columnWidth: "40px",
            selectedRowKeys,
            onChange: (selectedRowKeys, selectedRows) => {
              setSelectedRowKeys(selectedRowKeys);
              setSelectedRows(selectedRows);
            },
          }}
          dataSource={filteredData}
          columns={columns}
          // scroll={{ y: 800, x: 720 }}
          scroll={{ x: "800px" }}
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
                onClick={handleSubmitModal}
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

        {/* Confirmation */}
        {/* {formData && Object.values(formData).some(val => val !== "") && ( */}
        <Modal
          open={confirmData}
          // onOk={handleMaterialOk}
          width={"max-content"}
          onCancel={handleConfirmDataClose}
          style={{ top: 20 }}
          className={"deleteconfirm"}
          footer={[
            <div style={{ marginLeft: "331px" }}>
              <Button
                key="cancel"
                onClick={handleConfirmDataClose}
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
                onClick={handleCancel}
                style={{
                  width: "88px",
                  height: "38px",
                  backgroundColor: "#DA2F58",
                  fontSize: "14px",
                  fontWeight: "700",
                  color: "#FFFFFF",
                }}
              >
                Submit
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
                  Warning
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
        <ToastContainer />
        {/* // )} */}
      </div>
    </div>
  );
}

export default Accounts;
