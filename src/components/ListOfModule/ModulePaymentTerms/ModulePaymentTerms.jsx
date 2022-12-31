import { React, useState, useRef } from "react";
import FilterAndSearchBar from '../../FilterAndSearchBar/FilterAndSearchBar'
import Page_heading from '../../Page_Heading/Page_heading'
import "./ModulePaymentTerms.scss"
import Delete from "../../../assets/Images/ModulePaymentTerms/Delete.svg";
import Edit from "../../../assets/Images/ModulePaymentTerms/Edit.svg"
import { Table } from "antd";
import Modal from 'react-modal';

const ModulePaymentTerms = () => {
  let subtitle;
  const [modalIsOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = '#F3F6F9';
  }

  function closeModal() {
    setIsOpen(false);
  }
  const customStyles = {
    content: {
      top: '145px',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      border:'0px !important'
    },
  };

    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [selectedRows, setSelectedRows] = useState([]);

    const dataSource = [
        {
          key: "1",
          terms: "Net 5",
          days: "5 days",
          discount: "10%",
          interest: "2%",
          action: (<div style={{display:"flex"
          }}>
            <div><img src={Delete} /></div>
            <div style={{marginLeft:"20px"}}><img src={Edit} /></div>
          </div>)
        },
        {
          key: "2",
          terms: "Net 5",
          days: "5 days",
          discount: "10%",
          interest: "2%",
          action: (<div style={{display:"flex"
          }}>
            <div><img src={Delete} /></div>
            <div style={{marginLeft:"20px"}}><img src={Edit} /></div>
          </div>)
        },
        {
          key: "3",
          terms: "Net 5",
          days: "5 days",
          discount: "10%",
          interest: "2%",
          action: (<div style={{display:"flex"
        }}>
          <div><img src={Delete} /></div>
          <div style={{marginLeft:"20px"}}><img src={Edit} /></div>
        </div>)
        },
        {
          key: "4",
          terms: "Net 5",
          days: "5 days",
          discount: "10%",
          interest: "2%",
          action: (<div style={{display:"flex"
        }}>
          <div><img src={Delete} /></div>
          <div style={{marginLeft:"20px"}}><img src={Edit} /></div>
        </div>)
        },
        {
          key: "5",
          terms: "Net 5",
          days: "5 days",
          discount: "10%",
          interest: "2%",
          action: (<div style={{display:"flex"
          }}>
            <div><img src={Delete} /></div>
            <div style={{marginLeft:"20px"}}><img src={Edit} /></div>
          </div>)
        },
        {
          key: "6",
          terms: "Net 7",
          days: "7 days",
          discount: "9%",
          interest: "5%",
          action: (<div style={{display:"flex"
          }}>
            <div><img src={Delete} /></div>
            <div style={{marginLeft:"20px"}}><img src={Edit} /></div>
          </div>)
        },
        {
          key: "7",
          terms: "Net 7",
          days: "7 days",
          discount: "9%",
          interest: "5%",
          action: (<div style={{display:"flex"
        }}>
          <div><img src={Delete} /></div>
          <div style={{marginLeft:"20px"}}><img src={Edit} /></div>
        </div>)
        },
        {
          key: "8",
          terms: "Net 7",
          days: "7 days",
          discount: "9%",
          interest: "5%",
          action: (<div style={{display:"flex"
          }}>
            <div><img src={Delete} /></div>
            <div style={{marginLeft:"20px"}}><img src={Edit} /></div>
          </div>)
        },
        {
          key: "9",
          terms: "Net 7",
          days: "7 days",
          discount: "9%",
          interest: "5%",
          action: (<div style={{display:"flex"
        }}>
          <div><img src={Delete} /></div>
          <div style={{marginLeft:"20px"}}><img src={Edit} /></div>
        </div>)
        },
        {
          key: "10",
          terms: "Net 15",
          days: "15 days",
          discount: "5%",
          interest: "9%",
          action: (<div style={{display:"flex"
        }}>
          <div><img src={Delete} /></div>
          <div style={{marginLeft:"20px"}}><img src={Edit} /></div>
        </div>)
        },
        {
          key: "11",
          terms: "Net 15",
          days: "15 days",
          discount: "5%",
          interest: "9%",
          action: (<div style={{display:"flex"
        }}>
          <div><img src={Delete} /></div>
          <div style={{marginLeft:"20px"}}><img src={Edit} /></div>
        </div>)
        },
        {
          key: "12",
          terms: "Net 15",
          days: "15 days",
          discount: "5%",
          interest: "9%",
          action: (<div style={{display:"flex"
        }}>
          <div><img src={Delete} /></div>
          <div style={{marginLeft:"20px"}}><img src={Edit} /></div>
        </div>)
        },
        {
          key: "13",
          terms: "Net 15",
          days: "15 days",
          discount: "5%",
          interest: "9%",
          action: (<div style={{display:"flex"
        }}>
          <div><img src={Delete} /></div>
          <div style={{marginLeft:"20px"}}><img src={Edit} /></div>
        </div>)
        },
        {
          key: "14",
          terms: "Net 15",
          days: "15 days",
          discount: "5%",
          interest: "9%",
          action: (<div style={{display:"flex"
        }}>
          <div><img src={Delete} /></div>
          <div style={{marginLeft:"20px"}}><img src={Edit} /></div>
        </div>)
        },
        {
          key: "15",
          terms: "Net 15",
          days: "15 days",
          discount: "5%",
          interest: "9%",
          action:(<div style={{display:"flex"
        }}>
          <div><img src={Delete} /></div>
          <div style={{marginLeft:"20px"}}><img src={Edit} /></div>
        </div>)
        },
        {
          key: "16",
          terms: "Net 15",
          days: "15 days",
          discount: "5%",
          interest: "9%",
          action:(<div style={{display:"flex"
        }}>
          <div><img src={Delete} /></div>
          <div style={{marginLeft:"20px"}}><img src={Edit} /></div>
        </div>)
        },
    
        // ...
      ];
      const columnsData = [
        {
          title: "Terms",
          label: "Terms",
          dataIndex: "terms",
          key: "terms",
          resizable: true,
          fixed: "left",
          align: "left",
          // width: 60,
        },
        {
          title: "Days",
          label: "Days",
          dataIndex: "days",
          key: "days",
          resizable: true,
          // width: 60,
          align: "left",
        },
        {
          title: "Discount",
          label: "Discount",
          dataIndex: "discount",
          key: "discount",
          resizable: true,
          width: 230,
          align: "left",
        },
        {
          title: "Interest",
          label: "Interest",
          dataIndex: "interest",
          key: "interest",
          resizable: true,
          // width: 60,
          align: "left",
    
        },
        {
          title: "Action",
          label: "Action",
          dataIndex: "action",
          key: "action",
          resizable: true,
          width: 260,
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
    record.terms.toLowerCase().includes(search.toLowerCase())
  );



  return (
    <div className='module-data'>
        <Page_heading  parent={"List of Modules"} child={"Payment Terms"}/>

        <div className="module-table-container">
        <FilterAndSearchBar columns={columnsData} addBtnName={"Payment Terms"} onClick={openModal} onData={handleData} />
        {/* <button onClick={openModal}>Open Modal</button> */}
        {/* <OffCanvasExample  form={<Contacts/>}/> */}

        <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
          <div style={{width:"764.15px", height:"99px"}}>
            <div style={{display:"flex", justifyContent:"space-between"}}>
              <div style={{fontSize:"22px", color:"#697A8D", marginTop:"37px", marginLeft:"31px"}}>Add Payment Terms</div>
              <div style={{ width:"13.51px", height:"13px", marginTop:"40px"}}><span style={{cursor:"pointer", color:"#697A8D", fontSize:"32px", marginLeft:"-30px"}} onClick={closeModal}>&times;</span></div>
            </div>
            <div style={{marginTop:"20px", marginRight:"31px", marginLeft:"31px"}}><hr/></div>
          </div>
          <div  style={{width:"764.15px", height:"159px"}}>
            <div>
              <div style={{display:"flex"}}>
                <div style={{marginLeft:"30px"}}>
              <label className="plabel" style={{ marginTop: "5px" }}>
                Terms
              </label>
              <div className="paymentinput">
                {/* <img src={logo} className="customerimg" /> */}
                <input
                  type="text"
                  style={{ border: "none", outline: "none", overflow:"hidden" }}
                  placeholder="Net 5"
                />
              </div>
              </div>

              <div style={{marginLeft:"30px"}}>
              <label className="plabel" style={{ marginTop: "5px" }}>
                Days
              </label>
              <div className="paymentinput">
                {/* <img src={logo} className="customerimg" /> */}
                <input
                  type="text"
                  style={{ border: "none", outline: "none", overflow:"hidden" }}
                  placeholder="5 Days"
                />
              </div>
              </div>

              <div style={{marginLeft:"30px"}}>
              <label className="plabel" style={{ marginTop: "5px" }}>
                Discount %
              </label>
              <div className="paymentinput">
                {/* <img src={logo} className="customerimg" /> */}
                <input
                  type="text"
                  style={{ border: "none", outline: "none", overflow:"hidden" }}
                  placeholder="10%"
                />
              </div>
              </div>

              <div style={{marginLeft:"30px"}}>
              <label className="label" style={{ marginTop: "5px" }}>
                Interest %
              </label>
              <div className="paymentinput">
                {/* <img src={logo} className="customerimg" /> */}
                <input
                  type="text"
                  style={{ border: "none", outline: "none", overflow:"hidden" }}
                  placeholder="1%"
                />
              </div>
              </div>
              </div>

            
              <div className="paymentformbutton_bottom">
                <button type="button" className="paymentformsavebutton">
                  Submit
                </button>
                <button type="button" className="paymentformcancelbutton" onClick={closeModal}>
                Cancel
                </button>
              </div>
              </div>
            
          </div>
      </Modal>
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

export default ModulePaymentTerms