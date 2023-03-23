import React, { useEffect, useState } from "react";
import Page_heading from "../../../Page_Heading/Page_heading";
import "./PreviewSalesOrder.scss";
import CustomInput from "../../../CustomInput/CustomInput";
import { InputGroup, SearchSelect } from "../../../Dropdowns/Dropdowns";
import { Button, Modal, Popover, Upload } from "antd";
import {
  ContainedButton,
  ContainedIconButton,
  ContainedIconButtonGray,
  ContainedSecondaryButton,
  GhostIconButton,
} from "../../../Buttons/Button";
import axios from "axios";

const PreviewSalesOrder = () => {
  const [attachmentShow, setAttachmentShow] = useState(false);
  const [itemList, setItemList] = useState([
    { id: 1, name: "row1", value: "" },
    { id: 2, name: "row2", value: "" },
    { id: 3, name: "row3", value: "" },
  ]);


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

  const currencyCodes = [
    {
      value: "rupees",
      label: "₹",
    },
    {
      value: "percent",
      label: "%",
    },
  ];
  

  return (
    <div className="sales-order-main-container">
      <Page_heading parent={"Transactions"} child={"Sales Order"} />

    <div className="sales-order-sub-container">
      <div className="sales-order-container">
        <div className="status-tag sc-body-bd">Draft <div className="d-design"></div></div>
        <div className="top-container">
          <div className="top-left-container">
            <div className="sales-order-number-container">
              <h1 className="heading-sb">Sales Order #</h1>
              <p className="subtitle-sb width-align">SO-00009</p>
            </div>

            <div className="sales-order-date-container display-flex-clr">
              <p className="sc-body-md">Sales Order Date</p>
              <p className="subtitle-sb width-align">13 March 2023</p>
            </div>

            <div className="expected-shipment-date-container display-flex-clr">
              <p className="sc-body-md">Expected Shipment Date</p>
              <p className="subtitle-sb width-align">20 March 2023</p>
            </div>

            <div className="payment-terms-container display-flex-clr">
              <p className="sc-body-md">Payment Terms</p>
              <p className="subtitle-sb width-align">Net 7</p>
            </div>

            <div className="commission-terms-container display-flex-clr">
              <p className="sc-body-md">Commission Terms</p>
              <p className="subtitle-sb width-align">Net 2</p>
            </div>

            <div className="agent-name-container display-flex-clr">
              <p className="sc-body-md">Agent Name</p>
              <p className="subtitle-sb width-align">Aman Jaria</p>
            </div>

            <div className="warehouse-container display-flex-clr">
              <p className="sc-body-md">Warehouse</p>
              <p className="subtitle-sb width-align">Ganesha Stocks</p>
            </div>

            <div className="reference-container display-flex-clr">
              <p className="sc-body-md">Reference</p>
              <p className="subtitle-sb width-align"># EST - 000012</p>
            </div>

            <div className="ownership-container display-flex-clr">
              <p className="sc-body-md">Ownership</p>
              <p className="subtitle-sb width-align">Ashish Jaria</p>
            </div>
          </div>

          <div className="top-right-container">
            <div className="bill-to-container">
              <div className="bill-to-heading">
                <h4 className="body-md">Bill To</h4>
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
              <p className="caption-sb item-count">#</p>
              <p className="caption-sb item-details">Items Details</p>
              <p className="caption-sb item-qty">Qty</p>
              <p className="caption-sb item-rate">Rate</p>
              <p className="caption-sb item-tax">Tax</p>
              <p className="caption-sb item-amount">Amount</p>
            </div>

            <div className="item-row-container">
              {itemList.map((item) => (
                <>
                  <div className="sales-order-items-row" key={item.id}>
                    <div className="item-count">
                        <p className="sc-body-rg">{item.id}</p>
                    </div>

                    <div className="item-details">
                    <div className="selected-item-container">
                          <div className="selected-item-details">
                            <p className="sc-body-sb mb-12 p-1">
                              Grick Polo Box Shirt
                            </p>
                            <p className="caption-md mb-8">SKU : GR-PL-009</p>

                          </div>
                        </div>
                    </div>
                    <div className="item-qty">
                      <p className="sc-body-rg">18.00 Pcs</p>
                    </div>
                    <div className="item-rate">
                      <p className="sc-body-rg tax-inc">₹ 100.00</p>
                    </div>
                    <div className="item-tax">
                    <p className="sc-body-rg tax-inc">Gst5 (5%)</p>
                    </div>
                    <div className="item-amount">
                      <p className="sc-body-sb">₹ 0.00</p>
                    </div>
                    <div
                      className="delete-item-row"
                    >
                    </div>
                  </div>
                  <hr className="item-bottom-hr" />
                </>
              ))}
            </div>

            <div className="item-total-container">
              <div className="notes-attachment-container">
                <div className="notes-container">
                    <p className="sc-body-md notes-label">Notes</p>
                    <p className="sc-body-rg">Thank you for the business.</p>
                </div>
                <div className="attachments-input">
                  <p className="sc-body-md attachment-label">Attachments</p>
                  <div className="d-flex align-center upload-count-container">
                  
                  <div className="d-flex align-center attachment-icon-count-prv ">
                    <img src="/images/icons/attachment-icon.svg" alt="attach" className="attachment-icon" onClick={()=>{setAttachmentShow(!attachmentShow)}} />
                    <div className="attachment-count">4</div>
                  </div>
                  </div>
                </div>
              </div>
              <div className="total-amount-container">
                <div className="sub-total-container">
                  <p className="sc-body-md title">Sub Total</p>
                  <p className="sc-body-md amount">₹ 0.00</p>
                </div>
                <div className="discount-container">
                  <Popover 
                    getPopupContainer={(trigger) => trigger.parentElement}
                    placement="top"
                    content={
                      <div>
                        <InputGroup 
                        options={currencyCodes}
                        label="Add Discount"
                        type="number"
                        // value="Rs."
                        // inputType={"email"}
                        // placeholder="Placeholder"
                        rightIcon="/images/icons/input-save-icon.svg"
                        width={60}
                        inputWidth={116}
                        // onChange={(e) => {onChange(e);}}
                        />
                      </div>
                    }
                    title=""
                    height={100}
                    trigger="click">
                  <div className="discount-title" >
                    <p className="sc-body-md">Discount</p>
                    <img src="/images/icons/edit.svg" alt="edit icon" />
                  </div>
                  </Popover>
                  <p className="sc-body-md amount">₹ 0.00</p>
                </div>
                <div className="gst-container">
                  <p className="sc-body-md">GST 5%</p>
                  <p className="sc-body-md">₹ 0.00</p>
                </div>
                <div className="shipping-container">

                <div className="d-flex align-center justify-between">
                  <div className="shipping-title-container">
                  <Popover 
                    getPopupContainer={(trigger) => trigger.parentElement}
                    placement="top"
                    content={
                      <div>
                        <InputGroup 
                        options={currencyCodes}
                        label="Shipping Charges"
                        type="number"
                        // value="Rs."
                        // inputType={"email"}
                        // placeholder="Placeholder"
                        rightIcon="/images/icons/input-save-icon.svg"
                        width={60}
                        inputWidth={116}
                        // onChange={(e) => {onChange(e);}}
                        />
                      </div>
                    }
                    title=""
                    height={100}
                    trigger="click">
                      <div className="shipping-title" >
                    <p className="sc-body-md">Shipping Charges</p>
                    <img src="/images/icons/edit.svg" alt="edit icon" />
                  </div>
                  </Popover>

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
      </div>
      <div className="timeline-tag-container">
    
      <div className="edit-delete-btn">
        <ContainedIconButtonGray value="Edit" icon="/images/icons/edit-gray-con.svg" />
        <ContainedIconButtonGray value="Delete" icon="/images/icons/delete-gray-icon.svg" />
      </div>
      <div className="subtitle-md tag-title-container">
        <p className="subtitle-md tag-title">Related Tags</p>
        <div className="tags-container">
        <div className="tag-conatiner caption-sb">Items</div>
        <div className="tag-conatiner caption-sb">Approval Pending</div>
        </div>
      </div>
      </div>
    </div>
    </div>
  );
};

export default PreviewSalesOrder;
