import { React, useState, useRef,useEffect } from "react";
import FilterAndSearchBar from '../../FilterAndSearchBar/FilterAndSearchBar'
import Page_heading from '../../Page_Heading/Page_heading'
import "./ContactsData.scss"
import { Table } from "antd";
import OffCanvasExample from "../../OffCanvas/OffCanvasExample";
import Contacts from "../Contacts";
import SearchDropdown from "../../AllDropdowns/SearchDropdown/SearchDropdown";
import axios from "axios";

const ContactsData = () => {

    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [selectedRows, setSelectedRows] = useState([]);
 const [fetchcontact, setFetchcontact] = useState([]);
  const [loading, setloading] = useState(true);
  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    await axios.get("http://127.0.0.1:8000/contact/").then(
      res => {
        setloading(false);
        setFetchcontact(
          res.data.map(row => ({
            Name: row.name,
            Mobile: row.mobile,
            Email: row.email,
            DOB: row.dob,
            Position:row.position,
            Ownership:row.ownership
           // id: row.id
          }))
        );
        console.log(res);
      }
      
    );
  };
  console.log(fetchcontact)


    const dataSource = 
      fetchcontact.map(contact =>
        ({
          name:contact.Name,
          mobile:contact.Mobile,
          email:contact.Email,
          dob:contact.DOB,
          position:contact.Position,
          ownership:contact.Ownership
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
          width: 80,
        },
        {
          title: "Mobile No.",
          label: "Mobile No.",
          dataIndex: "mobile",
          key: "mobile",
          resizable: true,
          width: 100,
          align: "left",
        },
        {
          title: "Email",
          label: "Email",
          dataIndex: "email",
          key: "email",
          resizable: true,
          width: 150,
          align: "left",
        },
        {
          title: "DOB",
          label: "DOB",
          dataIndex: "dob",
          key: "dob",
          resizable: true,
          width: 70,
          align: "left",
    
        },
        {
          title: "Position",
          label: "Position",
          dataIndex: "position",
          key: "position",
          resizable: true,
          width: 160,
          align: "left",
        },
        {
          title: "Ownership ",
          label: "Ownership ",
          dataIndex: "ownership",
          key: "ownership",
          resizable: true,
          width: 100,
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
  return (
    <div className='contacts-data'>
        <Page_heading  parent={"Business Account"} child={"contacts"}/>

        <div className="contacts-table-container">
        <FilterAndSearchBar columns={columnsData} addBtnName={"Contacts"} onData={handleData} />
        <OffCanvasExample  form={<Contacts/>}/>
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
            scroll={{  x:"1100px" }}
        //    style={{ width: "100%" }}
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
  )
}

export default ContactsData