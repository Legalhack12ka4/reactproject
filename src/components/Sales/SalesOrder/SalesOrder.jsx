import React, { useEffect, useState } from "react";
import Page_heading from "../../Page_Heading/Page_heading";
import "./SalesOrder.scss";
import CustomInput from "../../CustomInput/CustomInput";
import { SearchSelect } from "../../Dropdowns/Dropdowns";
import { Button, Modal, Upload } from "antd";
import {
  ContainedButton,
  ContainedSecondaryButton,
  GhostIconButton,
} from "../../Buttons/Button";
import axios from "axios";

const SalesOrder = () => {
  const [salesOrderItemList, setSalesOrderItemList] = useState([
    { id: 1, name: "row1", value: "" },
  ]);
  const [fileList, setFileList] = useState([]);
  const [salesOrderModal, setSalesOrderModal] = useState(true);
  const [isCustomerSelected, setIsCustomerSelected] = useState(false);
  const [customerSubmit, setCustomerSubmit] = useState(false);
  const [selectItem, setSelectItem] = useState(false);
  const [attachmentShow, setAttachmentShow] = useState(false);

  const customerDataSelectOptions = [
    {
      value: "customer1",
      label: (
        <div className="sales-order-customer-data-container">
          <p className="business-name">Reformiqo Business Service Pvt Ldt</p>
          <div className="gst-city-container">
            <p className="caption-md gstin-title">
              GSTIN : <span className="caption-md">22AAAAA0000A1Z5</span>
            </p>
            <p className="caption-md city-title">
              City : <span className="caption-md">Surat</span>
            </p>
          </div>
          <p className="caption-md contact-title">
            Contact : <span className="caption-md">Ashish Jaria</span>
          </p>
        </div>
      ),
    },
    {
      value: "customer2",
      label: (
        <div className="sales-order-customer-data-container">
          <p className="business-name">Reformiqo Business Service Pvt Ldt</p>
          <div className="gst-city-container">
            <p className="caption-md gstin-title">
              GSTIN : <span className="caption-md">22AAAAA0000A1Z5</span>
            </p>
            <p className="caption-md city-title">
              City : <span className="caption-md">Surat</span>
            </p>
          </div>
          <p className="caption-md contact-title">
            Contact : <span className="caption-md">Kushal Nahata</span>
          </p>
        </div>
      ),
    },
  ];

  const itemOptions = [
    { value: "item1", label: "Item 1" },
    { value: "item2", label: "Item 2" },
    { value: "item3", label: "Item 3" },
  ];

  const handleAddItemRow = () => {
    setSalesOrderItemList([
      ...salesOrderItemList,
      { id: salesOrderItemList.length + 1, name: "row1", value: "" },
    ]);
  };
  const onChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const handleDeleteOrderItemRow = (id) => {
    setSalesOrderItemList(salesOrderItemList.filter((item) => item.id !== id));
  };

  const handleCancel = () => {
    if (isCustomerSelected && customerSubmit) {
      setSalesOrderModal(false);
    } else {
      setSalesOrderModal(false);
      window.history.back(-1);
    }
  };

  const handleCustomerSelect = (value) => {
    setIsCustomerSelected(true);
  };

  const handleSubmit = () => {
    setSalesOrderModal(false);
    setCustomerSubmit(true);
  };

  const changeCustomer = () => {
    setSalesOrderModal(true);
  };

  const handleItemSelect = (value) => {
    setSelectItem(true);
  };



  const accessToken = () => {
    axios
      .post(
        "https://pro.mastersindia.co/oauth/access_token",
        {
          headers: {
            "username": "kushal.nahata@reformiqo.com",
            "password": "Kushal@123",
            "client_id": "NKPAiQRmOqdrbeyOIJ",
            "client_secret": "9xDG6A0jmMOi76WiH11aW4U8",
            "grant_type": "password"
           }
        },
      )
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };



  useEffect(() => {
    // getData();
    accessToken();
  
  }, []);
  //   const getData = (gstin) => {
     
  //     axios.get(
  //  //    `https://commonapi.mastersindia.co/commonapis/searchgstin?gstin=${gstin}`,
  //      `https://commonapi.mastersindia.co/commonapis/searchgstin?gstin=24ABNFS4438A1ZB`,
  //       {
  //         headers: {
  //           "Authorization": `Bearer c6c932943d1e645f802cf28d9a8f621f4fbea07d`,
  //           "client_id": `NKPAiQRmOqdrbeyOIJ`,
  //         },
  //         mode: 'cors', // add CORS mode
  //         credentials: 'same-origin', // add credentials option if needed
  //       }
  //     )
  //       .then((response) => {
  //         return response.json();
  //       })
  //       .then((data) => {
  //         setGno(data);
  //         console.log("data", data);
  //         console.log(data)
  //       });
  //   };
  

  return (
    <div className="sales-order-main-container">
      <Page_heading parent={"Transactions"} child={"Sales Order"} />

      <div className="sales-order-container">
        <div className="top-container">
          <div className="top-left-container">
            <div className="sales-order-number-container">
              <h1 className="heading-sb">Sales Order #</h1>
              <CustomInput width={155} disabled value="SO-0009" />
            </div>

            <div className="sales-order-date-container display-flex-clr">
              <p className="sc-body-md">Sales Order Date</p>
              <CustomInput width={155} type={"date"} value="2021-01-01" />
            </div>

            <div className="expected-shipment-date-container display-flex-clr">
              <p className="sc-body-md">Expected Shipment Date</p>
              <CustomInput width={155} type={"date"} value="2021-01-01" />
            </div>

            <div className="payment-terms-container display-flex-clr">
              <p className="sc-body-md">Payment Terms</p>
              <SearchSelect width={155} />
            </div>

            <div className="commission-terms-container display-flex-clr">
              <p className="sc-body-md">Commission Terms</p>
              <SearchSelect width={155} />
            </div>

            <div className="agent-name-container display-flex-clr">
              <p className="sc-body-md">Agent Name</p>
              <SearchSelect width={155} />
            </div>

            <div className="warehouse-container display-flex-clr">
              <p className="sc-body-md">Warehouse</p>
              <SearchSelect width={155} />
            </div>

            <div className="reference-container display-flex-clr">
              <p className="sc-body-md">Reference</p>
              <CustomInput width={155} placeholder="PO-00256" />
            </div>

            <div className="ownership-container display-flex-clr">
              <p className="sc-body-md">Ownership</p>
              <SearchSelect width={155} />
            </div>
          </div>

          <div className="top-right-container">
            <div className="bill-to-container">
              <div className="bill-to-heading">
                <h4 className="body-md">Bill To</h4>
                <img
                  src="/images/icons/edit.svg"
                  alt="edit icon"
                  onClick={changeCustomer}
                />
              </div>
              <h4 className="company-name sc-body-bd">
                Reformiqo Business Service Pvt Ltd
              </h4>
              <p className="sc-body-rg">
                G-2, Ground Floor, InternationalBusiness Center, Near Rahul Raj
                Mall Piplod, Surat Gujarat - 395007
              </p>
              <h4 className="sc-body-bd">GSTIN : 22AAAAA0000A1Z5</h4>
            </div>
            <div className="ship-to-container">
              <div className="ship-to-heading">
                <h4 className="body-md">Ship To</h4>
                <img src="/images/icons/edit.svg" alt="edit icon" />
              </div>
              <p className="sc-body-rg">
                G-2, Ground Floor, InternationalBusiness Center, Near Rahul Raj
                Mall Piplod, Surat Gujarat - 395007
              </p>
              <p className="sc-body-sb">Place of Supply : Gujarat</p>
            </div>
            <div className="transporter-container">
              <div className="transporter-heading">
                <h4 className="body-md">Transporter</h4>
                <img src="/images/icons/edit.svg" alt="edit icon" />
              </div>
              <h4 className="transporter-name sc-body-bd">
                Balaji Transport Services
              </h4>
              <p className="transporter-id sc-body-md">
                Transporter Id : TS12AA56LP15935
              </p>
              <p className="sc-body-rg">
                G-202, Balaji House, Sosyo Circle, Udhna-Magdalla road, Bhatar,
                Surat{" "}
              </p>
            </div>
          </div>
        </div>

        <div className="bottom-container">
          <div className="item-container">
            <div className="item-heading">
              <p className="caption-sb item-details">Item Details</p>
              <p className="caption-sb item-qty">Qty</p>
              <p className="caption-sb item-rate">Rate</p>
              <p className="caption-sb item-tax">Tax</p>
              <p className="caption-sb item-discount">Discount</p>
              <p className="caption-sb item-amount">Amount</p>
            </div>

            <div className="item-row-container">
              {salesOrderItemList.map((item) => (
                <>
                  <div className="sales-order-items-row" key={item.id}>
                    <div className="item-details">
                      {!selectItem ? (
                        <SearchSelect
                          placeholder="Item"
                          options={itemOptions}
                          showSearch={false}
                          onChange={handleItemSelect}
                          width={208}
                        />
                      ) : (
                        <div className="selected-item-container">
                          <div className="item-image">
                            <img
                              src="/images/icons/shirt-img.png"
                              alt="shirt"
                            />
                          </div>
                          <div className="selected-item-details">
                            <p className="sc-body-sb mb-12 p-1">
                              Grick Polo Box Shirt
                            </p>
                            <p className="caption-md mb-8">SKU : GR-PL-009</p>
                            <p className="caption-md">HSN : 61051010</p>
                            <img
                              className="item-delete-icon"
                              onClick={() => {
                                setSelectItem(false);
                              }}
                              src="/images/icons/cross-icon-n100.svg"
                              alt=""
                            />
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="item-qty">
                      <CustomInput placeholder="1.00" width={100} />
                      <div className="caption-sb invoiced-count">
                        8.00 Invoiced
                      </div>
                    </div>
                    <div className="item-rate">
                      <CustomInput placeholder="0.00" width={100} />
                      <p className="caption-md tax-inc">Inc. Tax</p>
                    </div>
                    <div className="item-tax">
                      <CustomInput disabled width={80} />
                    </div>
                    <div className="item-discount">
                      <CustomInput
                        placeholder="0.00"
                        symbol="₹"
                        textAlign="right"
                        width={100}
                      />
                      <CustomInput
                        placeholder="0.00"
                        symbol="%"
                        textAlign="right"
                        width={100}
                      />
                    </div>
                    <div className="item-amount">
                      <p className="sc-body-sb">₹ 0.00</p>
                    </div>
                    <div
                      className="delete-item-row"
                      onClick={() => handleDeleteOrderItemRow(item.id)}
                    >
                      <img src="/images/icons/cross-icon.svg" alt="" />
                    </div>
                  </div>
                  <hr className="item-bottom-hr" />
                </>
              ))}
              <p className="add-item-btn sc-body-bd" onClick={handleAddItemRow}>
                + Add Item{" "}
              </p>
            </div>

            <div className="item-total-container">
              <div className="notes-attachment-container">
                <CustomInput label="Notes" width={330} />
                <div className="attachments-input">
                  <p className="sc-body-md attachment-label">Attachments</p>
                  <div className="d-flex align-center upload-count-container">
                  <Upload
                    action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                    fileList={fileList}
                    onChange={onChange}
                    showUploadList={attachmentShow}
                  >
                    <GhostIconButton
                      value="Upload"
                      className="upload-btn"
                      icon="/images/icons/upload-cloud-icon.svg"
                    />
                  </Upload>
                  <div className="d-flex align-center attachment-icon-count ">
                    <img src="/images/icons/attachment-icon.svg" alt="attach" className="attachment-icon" onClick={()=>{setAttachmentShow(!attachmentShow)}} />
                    <div className="attachment-count">{fileList.length}</div>
                  </div>
                  </div>
                  <p className="image-upload-limits caption-rg">
                      Maximum of 5 Files (2MB each)
                    </p>
                </div>
              </div>
              <div className="total-amount-container">
                <div className="sub-total-container">
                  <p className="sc-body-md title">Sub Total</p>
                  <p className="sc-body-md amount">₹ 0.00</p>
                </div>
                <div className="discount-container">
                  <div className="discount-title">
                    <p className="sc-body-md">Discount</p>
                    <img src="/images/icons/edit.svg" alt="edit icon" />
                  </div>
                  <p className="sc-body-md amount">₹ 0.00</p>
                </div>
                <div className="gst-container">
                  <p className="sc-body-md">GST 5%</p>
                  <p className="sc-body-md">₹ 0.00</p>
                </div>
                <div className="shipping-container">
                <div className="d-flex align-center justify-between">
                  <div className="shipping-title-container">
                  <div className="shipping-title">
                    <p className="sc-body-md">Shipping Charges</p>
                    <img src="/images/icons/edit.svg" alt="edit icon" />
                  </div>
                  </div>
                  <p className="sc-body-md amount">₹ 0.00</p>
                  </div>
                  <div className="d-flex align-center justify-between">
                  <p className="caption-md mt-8 neu-6">GST 5%</p>
                  <p className="caption-md mt-8 neu-6">₹ 0.00</p>
                  </div>
                </div>
                <div className="round-off-container">
                  <p className="sc-body-md title">Round off</p>
                  <p className="sc-body-md amount">₹ 0.00</p>
                </div>
                <div className="total-container">
                  <p className="subtitle-sb title">Total</p>
                  <p className="subtitle-sb amount">₹ 0.00</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="button-container">
          <ContainedButton type="submit" value="Save" />
          <ContainedSecondaryButton
            value="Cancel"
            onClick={() => {
              window.history.back(-1);
            }}
          />
        </div>
      </div>

      <Modal
        open={salesOrderModal}
        //   onOk={handleMaterialOk}
        width={"max-content"}
        onCancel={handleCancel}
        style={{ top: 0, height: "auto", }}
        className={"sales-order-modal"}
        footer={false}
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
        <div className="sales-order-modal-container">
          <div className="select-customer-container">
            <h1 className="heading-sb">Customer Account</h1>
            <p className="sc-body-rg title">
              Choose customer account by considering the details
            </p>
            <hr className="h-line" />

            <SearchSelect
              width={381}
              height={400}
              label="Customer Account"
              placeholder="Customer Account"
              icon="/images/icons/customer-contact-icon.svg"
              options={customerDataSelectOptions}
              onChange={handleCustomerSelect}
            />
          </div>
          {isCustomerSelected && (
            <div className="animated zoomIn">
              <div className="customer-account-details-container">
                <div className="customer-details">
                  <img
                    className="company-icon"
                    src="/images/icons/logo-customer.svg"
                    alt=""
                  />
                  <div className="company-name-container">
                    <div className="company-name">
                      <h3 className="subtitle-sb">
                        Reformiqo Business Services Pvt Ltd
                      </h3>
                      <img src="/images/icons/redirect-icon.svg" alt="icon" />
                    </div>
                    <p className="customer-address sc-body-rg">
                      G-2, Ground Floor, InternationalBusiness Center, Near
                      Rahul Raj Mall Piplod, Surat Gujarat - 395007, Gujarat,
                      India
                    </p>
                    <p></p>
                  </div>
                </div>
              </div>

              <div className="outstanding-unused-container">
                <div className="outstansing-container">
                  <p className="sc-body-rg title">Outstanding Amount</p>
                  <p className="subtitle-sb amount">₹ 60,200.00</p>
                </div>
                <div className="unused-container">
                  <p className="sc-body-rg title">Unused Credits</p>
                  <p className="subtitle-sb amount">₹ 0.00</p>
                </div>
              </div>

              <div className="customer-details-container">
                <hr className="h-line" />
                <div className="gst-treatment d-flex">
                  <p className="sc-body-rg title">GST Treatment</p>
                  <p className="sc-body-sb">Registered Business - Regular </p>
                </div>
                <div className="gstin d-flex">
                  <p className="sc-body-rg title">GSTIN</p>
                  <p className="sc-body-sb">24AABCR1234Q1Z5</p>
                </div>
                <div className="email d-flex">
                  <p className="sc-body-rg title">Email</p>
                  <p className="sc-body-sb">sales@reformiqo.com</p>
                </div>
                <div className="pancard d-flex">
                  <p className="sc-body-rg title">PAN Card</p>
                  <p className="sc-body-sb">AABCR1234Q</p>
                </div>
                <div className="type d-flex">
                  <p className="sc-body-rg title">Type</p>
                  <p className="sc-body-sb">Retailer</p>
                </div>
                <div className="currency d-flex">
                  <p className="sc-body-rg title">Currency</p>
                  <p className="sc-body-sb">₹ - Indian Rupee</p>
                </div>
                <div className="payment-terms d-flex">
                  <p className="sc-body-rg title">Payment Terms</p>
                  <p className="sc-body-sb">Net 7</p>
                </div>
                <div className="credit-limit d-flex">
                  <p className="sc-body-rg title">Credit Limit</p>
                  <p className="sc-body-sb">₹ 90,000.00</p>
                </div>
              </div>

              <div className="buttons-container">
                <ContainedButton
                  type="submit"
                  value="Submit"
                  onClick={handleSubmit}
                />
                <ContainedSecondaryButton
                  value="Cancel"
                  onClick={handleCancel}
                />
              </div>
            </div>
          )}
        </div>
      </Modal>
    </div>
  );
};

export default SalesOrder;
