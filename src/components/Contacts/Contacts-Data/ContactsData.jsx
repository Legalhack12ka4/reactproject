import { React, useState, useRef, useEffect,useMemo } from "react";
import FilterAndSearchBar from "../../FilterAndSearchBar/FilterAndSearchBar";
import Page_heading from "../../Page_Heading/Page_heading";
import "./ContactsData.scss";
import { Spin, Table, Tooltip, Tag, Skeleton } from "antd";
import OffCanvasExample from "../../OffCanvas/OffCanvasExample";
import Contacts from "../Contacts";
import SearchDropdown from "../../AllDropdowns/SearchDropdown/SearchDropdown";
import axios from "axios";
import config from "../../Database/config";
import dob from "../../../assets/Images/FormIcon/DOB.svg";

const filterfield = {
  name: "",
  mobile: "",
  email: "",
  dob: "",
  position: "",
  ownership: "",
};

const ContactsData = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [fetchcontact, setFetchcontact] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [loading, setLoading] = useState(true);
  const [visible, setVisible] = useState(false);
  const [custfilter, setCustFilter] = useState(filterfield);
  const [filterarray, setFilteraaray] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    await axios.get(`${config.baseUrl}/contact/`).then((res) => {
      
      setFetchcontact(
        res.data.map((row) => ({
          Key: row.id,
          Name: row.name,
          Mobile: row.mobile,
          Email: row.email,
          DOB: row.dob,
          Position:
            row.position == 1
              ? "Owner"
              : row.position == 2
              ? "Accountant"
              : "Manger",
          Ownership: row.ownership == 1 ? "ubuntu" : "window",
          // id: row.id
        }))
      );
      console.log(res);
      setLoading(false);
    });
  };
  console.log(fetchcontact);

  //All dropdowns

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

  const position = [
    {
      value: "Owner",
      label: "Owner",
    },
    {
      value: "Accountant",
      label: "Accountant",
    },
    {
      value: "Manger",
      label: "Manger",
    },
  ];

  const dataSource = fetchcontact.map((contact) => ({
    key: contact.Key,
    id: contact.Key,
    name: contact.Name,
    mobile: contact.Mobile,
    email: contact.Email,
    dob: contact.DOB,
    position: contact.Position,
    ownership: contact.Ownership,
  }));
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
      showSorterTooltip: { title: "" },
      sorter: (record1, record2) => {
        return record1.name > record2.name;
      },
    },
    {
      title: "Mobile No.",
      label: "Mobile No.",
      dataIndex: "mobile",
      key: "mobile",
      resizable: true,
      width: "max-content",
      align: "left",
      showSorterTooltip: { title: "" },
      sorter: (record1, record2) => {
        return record1.mobile > record2.mobile;
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
      showSorterTooltip: { title: "" },
      sorter: (record1, record2) => {
        return record1.email > record2.email;
      },
    },
    {
      title: "DOB",
      label: "DOB",
      dataIndex: "dob",
      key: "dob",
      resizable: true,
      width: "max-content",
      align: "left",
      showSorterTooltip: { title: "" },
      sorter: (record1, record2) => {
        return record1.dob > record2.dob;
      },
    },
    {
      title: "Position",
      label: "Position",
      dataIndex: "position",
      key: "position",
      resizable: true,
      width: "max-content",
      align: "left",
      showSorterTooltip: { title: "" },
      sorter: (record1, record2) => {
        return record1.position > record2.position;
      },
    },
    {
      title: "Ownership ",
      label: "Ownership ",
      dataIndex: "ownership",
      key: "ownership",
      resizable: true,
      width: "max-content",
      align: "left",
      showSorterTooltip: { title: "" },
      sorter: (record1, record2) => {
        return record1.ownership > record2.ownership;
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

  // Table Search

  const handleData = (newData) => {
    setSearch(newData);
  };
  const [search, setSearch] = useState("");

  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  const filteredData = dataSource.filter(
    (record) =>
      record.name.toLowerCase().includes(search.toLowerCase()) ||
      record.mobile.toString().includes(search.toString())
  );

  //Filter

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

  const onChangedob = (e) => {
    const { value, name } = e.target;
    setCustFilter({ ...custfilter, [name]: value });
    console.log(value);
    console.log(name);
  };

  const cusomizeData = dataSource.filter(
    (record) =>
      record.position.includes(custfilter.position) &&
      record.ownership.includes(custfilter.ownership) &&
      record.dob.toString().includes(custfilter.dob.toString())
  );

  console.log(cusomizeData);

  var strDate = custfilter.dob;
  var convertedDate = new Date(strDate)
    .toLocaleDateString("IN")
    .replaceAll("/", "-");
  console.log(convertedDate); // 2-23-2021

  //tags

  const log = (index, key) => {
    console.log(key);
    setFilteraaray(filterarray.filter((item, i) => i.key !== index.key));
    setCustFilter({ ...custfilter, [key]: "" });
  };
  console.log(filterarray);

  //

  const handlecheckgetData = () => {
    alert("Data call");
  };

  const tableData = useMemo(
    () => (loading ? Array(10).fill({}) : cusomizeData),
    [loading, cusomizeData]
  ); 
  const tableColumns = useMemo(
    () =>
      (loading
        ? columns.map((column) => ({
          ...column,sorter: false,
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
        : columns),
    [loading, columns]
  );

  return (
    <div className="contacts-data">
      <Page_heading parent={"Business Account"} child={"contacts"} />

      <div className="contacts-table-container">
        <FilterAndSearchBar
          filterdata={[
            <div className="contact_filter_container">
              <div className="customer_filter_filed">
                <Tooltip title="prompt text" color="#5C5AD0">
                  {" "}
                  <label className="label">Position</label>{" "}
                </Tooltip>
                <SearchDropdown
                  width={330}
                  name="position"
                  options={position}
                  value={custfilter.position}
                  onChange={handleChange}
                />
              </div>

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

              <div className="customer_filter_filed">
                <Tooltip title="prompt text" color="#5C5AD0">
                  {" "}
                  <label className="contactlabel" style={{ marginTop: "5px" }}>
                    Date of Birth
                  </label>{" "}
                </Tooltip>
                <br />
                <div className="contactinput" style={{ marginTop: "5px" }}>
                  <img src={dob} className="customerimg" />
                  <input
                    type="date"
                    className="inputcontact"
                    placeholder="Placeholder"
                    name="dob"
                    value={custfilter.dob}
                    onChange={onChangedob}
                  />
                </div>
              </div>
            </div>,
          ]}
          change={filterarray}
          customer={fetchcontact.length}
          columns={columnsData}
          addBtnName={"Contacts"}
          onData={handleData}
          filter={<Contacts />}
          onFilter={(e) => {
            clearfilter(e);
            setVisible(!visible);
          }}
        />
        <OffCanvasExample form={<Contacts onClick={getData} />} />
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
                        (customerfilter.key === "position" && "Position") ||
                        (customerfilter.key === "ownership" && "Ownership") ||
                        (customerfilter.key === "dob" && "Date of Birth")
                      } : Contact`}
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
                        {customerfilter.key == "dob"
                          ? convertedDate
                          : customerfilter.value}
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
            rowSelection={!loading &&{
              type: "checkbox",
              columnTitle: "",
              selectedRowKeys,
              onChange: (selectedRowKeys, selectedRows) => {
                setSelectedRowKeys(selectedRowKeys);
                setSelectedRows(selectedRows);
              },
            }}
            // loading={{
            //   indicator: (
            //     <div>
            //       <Spin />
            //     </div>
            //   ),
            //   spinning: loading,
            // }}
            dataSource={tableData}
            columns={tableColumns}
            // scroll={{ y: 800, x: 720 }}
            scroll={!loading && { x: "1100px" }}
            //    style={{ width: "100%" }}
            pagination={!loading &&{
              current: page,
              pageSize: pageSize,
              onChange: (page, pageSize) => {
                setPage(page);
                setPageSize(pageSize);
              },
              total: cusomizeData.length,
              showTotal: (total, range) =>
                `Showing ${range[1]}-${range[1]} of ${total} Contacts`,
            }}
            rowClassName={(record) =>
              record.key % 2 === 0 ? "highlight_row" : ""
            }
            search={{
              keyword: search,
            }}
          />

          {/* <SearchDropdown/> */}
        </div>
      </div>
    </div>
  );
};

export default ContactsData;
