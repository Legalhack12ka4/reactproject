import { React, useState, useRef } from "react";
import FilterAndSearchBar from '../../FilterAndSearchBar/FilterAndSearchBar'
import Page_heading from '../../Page_Heading/Page_heading'
import "./ModuleCurrencyTable.scss"
import Delete from "../../../assets/Images/ModulePaymentTerms/Delete.svg";
import Edit from "../../../assets/Images/ModulePaymentTerms/Edit.svg"
import { Table } from "antd";
import Modal from 'react-modal';

const ModuleCurrencyTable = () => {
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
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };

    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [selectedRows, setSelectedRows] = useState([]);

    const dataSource = [
        {
          key: "1",
          currency_code: "INR",
          currency_symbol: "₹",
          currency_name: "Indian Rupee",
          action: (<div style={{display:"flex"
          }}>
            <div><img src={Delete} /></div>
            <div style={{marginLeft:"20px"}}><img src={Edit} /></div>
          </div>)
        },
        {
          key: "2",
          currency_code: "INR",
          currency_symbol: "₹",
          currency_name: "Indian Rupee",
          action: (<div style={{display:"flex"
          }}>
            <div><img src={Delete} /></div>
            <div style={{marginLeft:"20px"}}><img src={Edit} /></div>
          </div>)
        },
        {
          key: "3",
          currency_code: "INR",
          currency_symbol: "₹",
          currency_name: "Indian Rupee",
          action: (<div style={{display:"flex"
        }}>
          <div><img src={Delete} /></div>
          <div style={{marginLeft:"20px"}}><img src={Edit} /></div>
        </div>)
        },
        {
          key: "4",
          currency_code: "INR",
          currency_symbol: "₹",
          currency_name: "Indian Rupee",
          action: (<div style={{display:"flex"
        }}>
          <div><img src={Delete} /></div>
          <div style={{marginLeft:"20px"}}><img src={Edit} /></div>
        </div>)
        },
        {
          key: "5",
          currency_code: "USD",
          currency_symbol: "$",
          currency_name: "United State Dollar",
          action: (<div style={{display:"flex"
          }}>
            <div><img src={Delete} /></div>
            <div style={{marginLeft:"20px"}}><img src={Edit} /></div>
          </div>)
        },
        {
          key: "6",
          currency_code: "USD",
          currency_symbol: "$",
          currency_name: "United State Dollar",
          action: (<div style={{display:"flex"
          }}>
            <div><img src={Delete} /></div>
            <div style={{marginLeft:"20px"}}><img src={Edit} /></div>
          </div>)
        },
        {
          key: "7",
          currency_code: "USD",
          currency_symbol: "$",
          currency_name: "United State Dollar",
          action: (<div style={{display:"flex"
        }}>
          <div><img src={Delete} /></div>
          <div style={{marginLeft:"20px"}}><img src={Edit} /></div>
        </div>)
        },
        {
          key: "8",
          currency_code: "USD",
          currency_symbol: "$",
          currency_name: "United State Dollar",
          action: (<div style={{display:"flex"
          }}>
            <div><img src={Delete} /></div>
            <div style={{marginLeft:"20px"}}><img src={Edit} /></div>
          </div>)
        },
        {
          key: "9",
          currency_code: "ASD",
          currency_symbol: "$",
          currency_name: "Australia Dollar",
          action: (<div style={{display:"flex"
        }}>
          <div><img src={Delete} /></div>
          <div style={{marginLeft:"20px"}}><img src={Edit} /></div>
        </div>)
        },
        {
          key: "10",
          currency_code: "ASD",
          currency_symbol: "$",
          currency_name: "Australia Dollar",
          action: (<div style={{display:"flex"
        }}>
          <div><img src={Delete} /></div>
          <div style={{marginLeft:"20px"}}><img src={Edit} /></div>
        </div>)
        },
        {
          key: "11",
          currency_code: "ASD",
          currency_symbol: "$",
          currency_name: "Australia Dollar",
          action: (<div style={{display:"flex"
        }}>
          <div><img src={Delete} /></div>
          <div style={{marginLeft:"20px"}}><img src={Edit} /></div>
        </div>)
        },
        {
          key: "12",
          currency_code: "ASD",
          currency_symbol: "$",
          currency_name: "Australia Dollar",
          action: (<div style={{display:"flex"
        }}>
          <div><img src={Delete} /></div>
          <div style={{marginLeft:"20px"}}><img src={Edit} /></div>
        </div>)
        },
        {
          key: "13",
          currency_code: "CAD",
          currency_symbol: "$",
          currency_name: "Canadian Dollar",
          action: (<div style={{display:"flex"
        }}>
          <div><img src={Delete} /></div>
          <div style={{marginLeft:"20px"}}><img src={Edit} /></div>
        </div>)
        },
        {
          key: "14",
          currency_code: "CAD",
          currency_symbol: "$",
          currency_name: "Canadian Dollar",
          action: (<div style={{display:"flex"
        }}>
          <div><img src={Delete} /></div>
          <div style={{marginLeft:"20px"}}><img src={Edit} /></div>
        </div>)
        },
        {
          key: "15",
          currency_code: "CAD",
          currency_symbol: "$",
          currency_name: "Canadian Dollar",
          action:(<div style={{display:"flex"
        }}>
          <div><img src={Delete} /></div>
          <div style={{marginLeft:"20px"}}><img src={Edit} /></div>
        </div>)
        },
        {
          key: "16",
          currency_code: "CAD",
          currency_symbol: "$",
          currency_name: "Canadian Dollar",
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
          title: "Currency Code",
          label: "Currency Code",
          dataIndex: "currency_code",
          key: "currency_code",
          resizable: true,
          fixed: "left",
          align: "left",
          // width: 60,
        },
        {
          title: "Currency Symbol",
          label: "Currency Symbol",
          dataIndex: "currency_symbol",
          key: "currency_symbol",
          resizable: true,
          // width: 60,
          align: "left",
        },
        {
          title: "Currency Name",
          label: "Currency Name",
          dataIndex: "currency_name",
          key: "currency_name",
          resizable: true,
          width: 230,
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
    record.currency_code.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className='module-data'>
        <Page_heading  parent={"List of Modules"} child={"Currency Table"}/>

        <div className="module-table-container">
        <FilterAndSearchBar columns={columnsData} addBtnName={"Currency"} onClick={openModal} onData={handleData} />
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
              <div style={{fontSize:"22px", color:"#697A8D", marginTop:"37px", marginLeft:"31px"}}>Add Currency</div>
              <div style={{ width:"13.51px", height:"13px", marginTop:"40px"}}><span style={{cursor:"pointer", color:"#697A8D", fontSize:"32px", marginLeft:"-30px"}} onClick={closeModal}>&times;</span></div>
            </div>
            <div style={{marginTop:"20px", marginRight:"31px", marginLeft:"31px"}}><hr/></div>
          </div>
          <div  style={{width:"764.15px", height:"159px"}}>
            <div>
              <div style={{display:"flex"}}>
                <div style={{marginLeft:"30px"}}>
              <label className="mlabel" style={{ marginTop: "5px" }}>
                Currency Code
              </label>
              <div className="paymentinput">
                {/* <img src={logo} className="customerimg" /> */}
                <input
                  type="text"
                  style={{ border: "none", outline: "none", overflow:"hidden" }}
                  placeholder="INR"
                />
              </div>
              </div>

              <div style={{marginLeft:"30px"}}>
              <label className="mlabel" style={{ marginTop: "5px" }}>
                Currency Symbol
              </label>
              <div className="paymentinput">
                {/* <img src={logo} className="customerimg" /> */}
                <input
                  type="text"
                  style={{ border: "none", outline: "none", overflow:"hidden" }}
                  placeholder="₹"
                />
              </div>
              </div>

              <div style={{marginLeft:"30px"}}>
              <label className="mlabel" style={{ marginTop: "5px" }}>
                Currency Name
              </label>
              <div className="paymentinput">
                {/* <img src={logo} className="customerimg" /> */}
                <input
                  type="text"
                  style={{ border: "none", outline: "none", overflow:"hidden" }}
                  placeholder="Indian Rupee"
                />
              </div>
              </div>

              {/* <div style={{marginLeft:"30px"}}>
              <label className="label" style={{ marginTop: "5px" }}>
                Interest %
              </label>
              <div className="paymentinput">
        
                <input
                  type="text"
                  style={{ border: "none", outline: "none", overflow:"hidden" }}
                  placeholder="Placeholder"
                />
              </div>
              </div> */}
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

export default ModuleCurrencyTable