import { React, useState, useRef,useEffect } from "react";
import FilterAndSearchBar from '../../FilterAndSearchBar/FilterAndSearchBar'
import Page_heading from '../../Page_Heading/Page_heading'
import "./ContactsData.scss"
import { Spin, Table } from "antd";
import OffCanvasExample from "../../OffCanvas/OffCanvasExample";
import Contacts from "../Contacts";
import SearchDropdown from "../../AllDropdowns/SearchDropdown/SearchDropdown";
import axios from "axios";

const ContactsData = () => {

    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [selectedRows, setSelectedRows] = useState([]);
 const [fetchcontact, setFetchcontact] = useState([]);
 const [page, setPage]=useState(1);
 const [pageSize, setPageSize] = useState(10)
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
          sorter:(record1, record2)=>
          {
              return record1.name > record2.name
          },
          // filters:[
          //   {text:'Null', value:'Null'},
          //   {text:'Vimlesh', value:'Vimlesh'}
          // ],
          // // filterMultiple:false,
          // onFilter:(value,record)=>
          // {
          //   return record.name === value
          // }
        },
        {
          title: "Mobile No.",
          label: "Mobile No.",
          dataIndex: "mobile",
          key: "mobile",
          resizable: true,
          width: 100,
          align: "left",
          sorter:(record1, record2)=>
          {
              return record1.mobile > record2.mobile
          },
          // filters:[
          //   {text:'Null', value:'Null'},
          //   {text:'9359676102', value:'9359676102'}
          // ],
          // // filterMultiple:false,
          // onFilter:(value,record)=>
          // {
          //   return record.mobile === value
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
          //   {text:'Null', value:'Null'},
          //   {text:'scott123@gamil.com', value:'scott123@gamil.com'}
          // ],
          // // filterMultiple:false,
          // onFilter:(value,record)=>
          // {
          //   return record.email === value
          // }
        },
        {
          title: "DOB",
          label: "DOB",
          dataIndex: "dob",
          key: "dob",
          resizable: true,
          width: 70,
          align: "left",
          sorter:(record1, record2)=>
          {
              return record1.dob > record2.dob
          },
          // filters:[
          //   {text:'Null', value:'Null'},
          //   {text:'2022-12-30', value:'2022-12-30'}
          // ],
          // // filterMultiple:false,
          // onFilter:(value,record)=>
          // {
          //   return record.dob === value
          // }
        },
        {
          title: "Position",
          label: "Position",
          dataIndex: "position",
          key: "position",
          resizable: true,
          width: 160,
          align: "left",
          sorter:(record1, record2)=>
          {
              return record1.position > record2.position
          },
          // filters:[
          //   {text:'Null', value:'Null'},
          //   {text:'1', value:'1'}
          // ],
          // // filterMultiple:false,
          // onFilter:(value,record)=>
          // {
          //   return record.position === value
          // }
        },
        {
          title: "Ownership ",
          label: "Ownership ",
          dataIndex: "ownership",
          key: "ownership",
          resizable: true,
          width: 100,
          align: "left",
          sorter:(record1, record2)=>
          {
              return record1.ownership > record2.ownership
          },
          // filters:[
          //   {text:'Null', value:'Null'},
          //   {text:'1', value:'1'}
          // ],
          // // filterMultiple:false,
          // onFilter:(value,record)=>
          // {
          //   return record.ownership === value
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
  return (
    <div className='contacts-data'>
        <Page_heading  parent={"Business Account"} child={"contacts"}/>

        <div className="contacts-table-container">
        <FilterAndSearchBar columns={columnsData} addBtnName={"Contacts"} onData={handleData} filter={<Contacts/>} />
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

            loading={{indicator : <div><Spin/></div>, spinning:loading}}
            dataSource={filteredData}
            columns={columns}
            // scroll={{ y: 800, x: 720 }}
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

          {/* <SearchDropdown/> */}
        </div>
    </div>
  )
}

export default ContactsData