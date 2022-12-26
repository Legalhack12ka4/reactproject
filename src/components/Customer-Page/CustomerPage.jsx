import { React, useState, useRef } from "react";
import Page_heading from "../Page_Heading/Page_heading";
import Dashboard from "../Dashboard/Dashboard";
import "./CustomerPage.scss";
import { Table, Typography } from "antd";
import DateRangePickerComp from "../DateRangePicker/DateRangePicker";
import FilterAndSearchBar from "../FilterAndSearchBar/FilterAndSearchBar";


const CustomerPage = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);

  const dataSource = [
    {
      key: "1",
      so_number: "SO-10090",
      date: "06/12/2022",
      amount: "₹ 1.20 lacs",
      status: "ASSIGNED",
      expected_shipment_date: "06/12/2022",
    },
    {
      key: "2",
      so_number: "SO-10091",
      date: "06/12/2022",
      amount: "₹ 1.20 lacs",
      status: "ASSIGNED",
      expected_shipment_date: "06/12/2022",
    },
    {
      key: "3",
      so_number: "SO-10092",
      date: "06/12/2022",
      amount: "₹ 1.20 lacs",
      status: "UNASSIGNED",
      expected_shipment_date: "06/12/2022",
    },
    {
      key: "4",
      so_number: "SO-10093",
      date: "06/12/2022",
      amount: "₹ 1.20 lacs",
      status: "OVERDUE",
      expected_shipment_date: "06/12/2022",
    },
    {
      key: "5",
      so_number: "SO-10094",
      date: "06/12/2022",
      amount: "₹ 1.20 lacs",
      status: "ASSIGNED",
      expected_shipment_date: "06/12/2022",
    },
    {
      key: "6",
      so_number: "SO-10095",
      date: "06/12/2022",
      amount: "₹ 1.20 lacs",
      status: "OVERDUE",
      expected_shipment_date: "06/12/2022",
    },
    {
      key: "7",
      so_number: "SO-10096",
      date: "06/12/2022",
      amount: "₹ 1.20 lacs",
      status: "ASSIGNED",
      expected_shipment_date: "06/12/2022",
    },
    {
      key: "8",
      so_number: "SO-10097",
      date: "06/12/2022",
      amount: "₹ 1.20 lacs",
      status: "OVERDUE",
      expected_shipment_date: "06/12/2022",
    },
    {
      key: "9",
      so_number: "SO-10098",
      date: "06/12/2022",
      amount: "₹ 1.20 lacs",
      status: "ASSIGNED",
      expected_shipment_date: "06/12/2022",
    },
    {
      key: "10",
      so_number: "SO-10099",
      date: "06/12/2022",
      amount: "₹ 1.20 lacs",
      status: "UNASSINED",
      expected_shipment_date: "06/12/2022",
    },
    {
      key: "11",
      so_number: "SO-10100",
      date: "06/12/2022",
      amount: "₹ 1.20 lacs",
      status: "UNASSINED",
      expected_shipment_date: "06/12/2022",
    },
    {
      key: "12",
      so_number: "SO-10101",
      date: "06/12/2022",
      amount: "₹ 1.20 lacs",
      status: "UNASSINED",
      expected_shipment_date: "06/12/2022",
    },
    {
      key: "13",
      so_number: "SO-10102",
      date: "06/12/2022",
      amount: "₹ 1.20 lacs",
      status: "ASSIGNED",
      expected_shipment_date: "06/12/2022",
    },
    {
      key: "14",
      so_number: "SO-10103",
      date: "06/12/2022",
      amount: "₹ 1.20 lacs",
      status: "ASSIGNED",
      expected_shipment_date: "06/12/2022",
    },
    {
      key: "15",
      so_number: "SO-10104",
      date: "06/12/2022",
      amount: "₹ 1.20 lacs",
      status: "ASSIGNED",
      expected_shipment_date: "06/12/2022",
    },
    {
      key: "16",
      so_number: "SO-10105",
      date: "06/12/2022",
      amount: "₹ 1.20 lacs",
      status: "ASSIGNED",
      expected_shipment_date: "06/12/2022",
    },

    // ...
  ];
  const columnsData = [
    {
      title: "SO No.",
      label: "SO No.",
      dataIndex: "so_number",
      key: "so_no.",
      resizable: true,
      fixed: "left",
      align: "left",
      // width: 60,
    },
    {
      title: "Date",
      label: "Date",
      dataIndex: "date",
      key: "date",
      resizable: true,
      // width: 60,
      align: "left",
    },
    {
      title: "Amount",
      label: "Amount",
      dataIndex: "amount",
      key: "amount",
      resizable: true,
      // width: 60,
      align: "left",
    },
    {
      title: "Status",
      label: "Status",
      dataIndex: "status",
      key: "status",
      resizable: true,
      // width: 60,
      align: "left",
      render: (status, record) => (
        <>

          <Typography.Text 
          style={record.status === "OVERDUE" ? {background: "rgba(255, 62, 29, .15)", color:"#ff3e1d", padding:"0px 8px 2px 2px", borderRadius:"4px", fontSize:"13px"} : record.status === "ASSIGNED" ? {background: "rgba(92, 90, 209, .15)", color:"#5C5AD0", padding:"0px 8px 2px 2px", borderRadius:"4px", fontSize:"13px"} : {background: "rgba(255, 171, 0, .15)", color:"#ffab00", padding:"0px 8px 2px 2px", borderRadius:"4px", fontSize:"13px"}}
          >
            {record.status}          
          </Typography.Text>

        </>
      )

    },
    {
      title: "Expected Shipment Date",
      label: "Expected Shipment Date",
      dataIndex: "expected_shipment_date",
      key: "expected_shipment_date",
      resizable: true,
      width: 200,
      align: "left",
    },
    // {
    //   title: "Email",
    //   label: "Email",
    //   dataIndex: "email",
    //   key: "email",
    //   resizable: true,
    //   width: 150,
    //   align: "left",
    // },
  ];
  const [columns, setColumns] = useState(columnsData);

  const componentRef = useRef();

  function displaySerachbar() {
    document
      .getElementById("searchbar_container")
      .classList.toggle("container_display");
  }
  return (
    <div className="customers-page">
      <Page_heading
        parent={"Business Account"}
        child={window.location.pathname.slice(1)}
      />

      <div className="customer-dashboard">
        <div className="customer-dashboard-card">
          <div className="customer-dashboard-card-heading">
            <div>
              <h1>Sales Orders</h1>
              <h3>12</h3>
            </div>
            <div>
              <img
                className="analytic-icon"
                src="/images/icons/analytics_icon.svg"
                alt="analytics_icon"
              />
              <p>Analytics</p>
              <img
                className="right-arrow"
                src="/images/icons/right-arrow-icon.svg"
                alt="arrow-icon"
              />
            </div>
          </div>
          <div className="customer-dashboard-card-status">
            <div>
              <h4>₹ 0.9 lacs</h4>
              <div>
                <div className="green-bullet"></div>
                <h3>DRAFT (2)</h3>
              </div>
            </div>
            <div className="card-status-margin">
              <h4>₹ 2.19 lacs</h4>
              <div>
                <div className="yellow-bullet"></div>
                <h3>PENDING (2)</h3>
              </div>
            </div>
            <div className="card-status-margin">
              <h4>₹ 1.25 lacs</h4>
              <div>
                <div className="red-bullet"></div>
                <h3>OVERDUE (10)</h3>
              </div>
            </div>
          </div>
        </div>

        <div className="left-border"></div>
        <div className="customer-dashboard-card">
          <div className="customer-dashboard-card-heading">
            <div>
              <h1>Invoices</h1>
              <h3>12</h3>
            </div>
            <div>
              <img
                className="analytic-icon"
                src="/images/icons/analytics_icon.svg"
                alt="analytics_icon"
              />
              <p>Analytics</p>
              <img
                className="right-arrow"
                src="/images/icons/right-arrow-icon.svg"
                alt="arrow-icon"
              />
            </div>
          </div>
          <div className="customer-dashboard-card-status">
            <div>
              <h4>₹ 1.99 lacs</h4>
              <div>
                <div className="green-bullet"></div>
                <h3>DRAFT (2)</h3>
              </div>
            </div>
            <div className="card-status-margin">
              <h4>₹ 2.00 lacs</h4>
              <div>
                <div className="yellow-bullet"></div>
                <h3>PENDING (2)</h3>
              </div>
            </div>
            <div className="card-status-margin">
              <h4>₹ 16.25 lacs</h4>
              <div>
                <div className="red-bullet"></div>
                <h3>OVERDUE (10)</h3>
              </div>
            </div>
          </div>
        </div>

        <div className="left-border"></div>
        <div className="customer-dashboard-card">
          <div className="customer-dashboard-card-heading">
            <div>
              <h1>Payments</h1>
              <h3>12</h3>
            </div>
            <div>
              <img
                className="analytic-icon"
                src="/images/icons/analytics_icon.svg"
                alt="analytics_icon"
              />
              <p>Analytics</p>
              <img
                className="right-arrow"
                src="/images/icons/right-arrow-icon.svg"
                alt="arrow-icon"
              />
            </div>
          </div>
          <div className="customer-dashboard-card-status">
            <div>
              <h4>₹ 19.99 lacs</h4>
              <div>
                <div className="green-bullet"></div>
                <h3>RECEIVABLE (2)</h3>
              </div>
            </div>
            <div className="card-status-margin">
              <h4>98 Days</h4>
              <div>
                <div className="yellow-bullet"></div>
                <h3>INHAND (2)</h3>
              </div>
            </div>
            <div className="card-status-margin">
              <h4>₹ 1.25 lacs</h4>
              <div>
                <div className="red-bullet"></div>
                <h3>AVERAGES DAYS (10)</h3>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="customer-page-navbar">
        <div className="customer-navbar">
          <div className="active">Sales Orders (12)</div>
          <div>Invoices (9)</div>
          <div>Credit Notes (3)</div>
          <div>Payments (5)</div>
          <div>Contacts (13)</div>
          <div>Items (13)</div>
        </div>

        {/* calendar  */}

        <div className="customer-calendar">
          <DateRangePickerComp />
        </div>
      </div>

      {/* SearchBar and Filter */}

      <div className="searchBarAndFilter">
      <div className="SearchBar-filter">
        <FilterAndSearchBar columns={columnsData} addBtnName={"Sales Order"} path={"sales_order"}/>
      </div>

      <div className="table-customer-details">
        <div className="customer-table">
        <div className="table-width">
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
           style={{ width: 750 }}
            rowClassName={(record) =>
              record.key % 2 === 0 ? "highlight_row" : ""
            }
          />
        </div>
        </div>
        <div className="customer-details">
          <div className="customer-name-profile">
            <div className="customer-image">
              <img src="/images/icons/user-profile.svg" alt="" />
            </div>
            <div className="name-container">
              <h1 className="business-name">
                Reformiqo Business Service Pvt Ltd
              </h1>
              <h3 className="customer-name">Ashish Jaria</h3>
            </div>
          </div>

          <hr />

          <div className="customer-info">
            <h2 className="customer-info-heading">CUSTOMER INFO</h2>
            <div className="customer-gst">
              <img src="/images/icons/gst-icon.svg" alt="" />
              <h4>
                <span>GST IN :</span> 24GGGGG1314R9Z6
              </h4>
            </div>

            <div className="customer-email">
              <img src="/images/icons/email-green.svg" alt="" />
              <div className="email">
                <h4>
                  <span>Work :</span> Ashish.jaria@reformiqo.com
                </h4>
                <h4>
                  <span>Personal :</span> Ashish.jaria@gmail.com
                </h4>
              </div>
            </div>

            <div className="customer-email">
              <img src="/images/icons/phone-green.svg" alt="" />
              <div className="email">
                <h4>
                  <span>Work :</span> +91 XXXXXXXXXX
                </h4>
                <h4>
                  <span>Personal :</span> +91 XXXXXXXXXX
                </h4>
              </div>
            </div>

            <div className="customer-address">
              <img src="/images/icons/location-green.svg" alt="" />
              <div className="address">
                <h3>Billing Address</h3>
                <h4>
                  308, B Wing, International Commerce Center Ring Road, Surat -
                  395002
                </h4>
                <h3 className="margin-top">Shipping Address</h3>
                <h4>
                  901, International Business Center, Piplod Dumas Road, Surat -
                  395007
                </h4>
              </div>
            </div>

            <hr />
            <h2 className="customer-info-heading">OWNERSHIP</h2>
            <div className="ownership">
              <img src="/images/icons/location-green.svg" alt="" />
              <h2>Kushal Nahata</h2>
            </div>

          </div>
        </div>
      </div>
      </div>
    </div>
  );
};

export default CustomerPage;
