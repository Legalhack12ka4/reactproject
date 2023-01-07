import { React, useState, useRef,useEffect } from "react";
import FilterAndSearchBar from '../../FilterAndSearchBar/FilterAndSearchBar'
import Page_heading from '../../Page_Heading/Page_heading'
import "./VendorsData.scss"
import { Table } from "antd";
import axios from "axios";

const VendorsData = () => {

    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [selectedRows, setSelectedRows] = useState([]);
const [fetchvendor, setFetchvendor] = useState([]);
  const [loading, setloading] = useState(true);
  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    await axios.get("http://127.0.0.1:8000/customervendor/").then(
      res => {
        setloading(false);
        setFetchvendor(
          res.data.map(row => ({
            Gst_Treatment: row.gst_treatment,
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
  console.log(fetchvendor)


     const dataSource = fetchvendor.map(vendor =>
    ({
      gst_treatment:vendor.Gst_Treatment,
      gst_no:vendor.Gst_No,
      business_name:vendor.Business_Name,
      type_category:vendor.Type_Category,
      pan_card:vendor.Pan_Card,
      credit_limit:vendor.Credit_Limit,
      email:vendor.Email,
      pincode:vendor.Pincode,
      street1:vendor.Street1,
      street2:vendor.Street2,
      place_of_supply:vendor.Place_Of_Supply,
      contact:vendor.Contact,
      ownership:vendor.Ownsership
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
        onFilter: (value, record) => {
          return record.business_name.includes(value)
        }
      },
      {
        title: "Gst No",
        label: "Gst No",
        dataIndex: "gst_no",
        key: "gst_no",
        resizable: true,
        width: 80,
        align: "left",
      },
      {
        title: "Business Name",
        label: "Business Name",
        dataIndex: "business_name",
        key: "business_name",
        resizable: true,
        width: 100,
        align: "left",
      },
      {
        title: "Type Category",
        label: "Type Category",
        dataIndex: "type_category",
        key: "type_category",
        resizable: true,
        width: 110,
        align: "left",
      },
      {
        title: "PanCard",
        label: "PanCard",
        dataIndex: "pan_card",
        key: "pan_card",
        resizable: true,
        width: 90,
        align: "left",
      },
      {
        title: "Credit Limit",
        label: "Credit Limit",
        dataIndex: "credit_limit",
        key: "credit_limit",
        resizable: true,
        width: 110,
        align: "left",
      },
      {
        title: "Email",
        label: "Email",
        dataIndex: "email",
        key: "email",
        resizable: true,
        width: 110,
        align: "left",
      },
      {
        title: "PinCode",
        label: "PinCode",
        dataIndex: "pinCode",
        key: "pinCode",
        resizable: true,
        width: 110,
        align: "left",
      },
      {
        title: "Street1",
        label: "Street1",
        dataIndex: "street1",
        key: "street1",
        resizable: true,
        width: 110,
        align: "left",
      },
      {
        title: "Street2",
        label: "Street2",
        dataIndex: "street2",
        key: "street2",
        resizable: true,
        width: 110,
        align: "left",
      },
      {
        title: "Place Of Supply",
        label: "Place Of Supply",
        dataIndex: "place_of_supply",
        key: "place_of_supply",
        resizable: true,
        width: 110,
        align: "left",
      },
      {
        title: "Contact",
        label: "Contact",
        dataIndex: "contact",
        key: "contact",
        resizable: true,
        width: 110,
        align: "left",
      },
      {
        title: "Ownership",
        label: "Ownership",
        dataIndex: "ownership",
        key: "ownership",
        resizable: true,
        width: 110,
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
  return (
    <div className='Vendors-data'>
        <Page_heading  parent={"Business Account"} child={"Vendors"}/>

        <div className="Vendors-table-container">
        <FilterAndSearchBar columns={columnsData} addBtnName={"Vendors"} path={"add_Vendors"} onData={handleData} />

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
        //    style={{ width: "100%" }}
              scroll={{  x:"1100px" }}
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

export default VendorsData