import React, { useState } from "react";
import Page_heading from "../../Page_Heading/Page_heading";
import SearchDropdown from "../../AllDropdowns/SearchDropdown/SearchDropdown";
import "./SalesOrder.scss";

const SalesOrder = () => {
  const [salesOrderItemList, setSalesOrderItemList] = useState([
    { id: 1, name: "row1", value: "" },
  ]);
  return (
    <div className="sales-order-main-container">
      <Page_heading parent={"Transactions"} child={"Sales Order"} />

      <div className="sales-order-container">
        <div className="company-and-order-details-container">
          <div className="company-details">
            <img src="/images/sidebar_icons/logo_main.svg" alt="" />

            <p className="company-address">
              308, 3rd Floor, "B" Wing, International Commerce Center, Near
              Kadiwala School Ring Road, Surat, Gujarat - 395002
            </p>
          </div>
          <div className="order-details">
            <div className="sales-order-id-container">
              <p className="sales-order-id-heading">Sales Order #</p>
              <div className="sales-order-id">
                <p className="order-number">SO-0009</p>
                <div className="setting-icon">
                  <img src="/images/icons/setting-blue.svg" alt="" />
                </div>
              </div>
            </div>

            <div className="order-date-container">
              <p className="order-date-heading">Sales Order Date :</p>
              <div className="sales-order-date-input focus-outline">
                <input type="date" />
              </div>
            </div>

            <div className="expected-shipment-date-container">
              <p className="expected-shipment-date-heading">
                Expected Shipment Date :
              </p>
              <div className="expected-shipment-date-input focus-outline">
                <input type="date" />
              </div>
            </div>
          </div>
        </div>

        <div className="contact-customer-container">
          <div className="select-contact">
            <p className="select-customer-heading">Contact</p>
            <SearchDropdown width={300} />
          </div>
          <div className="select-customer">
            <p className="select-customer-heading">Customer</p>
            <SearchDropdown width={300} />
          </div>
        </div>

        <div className="sales-order-items-container">
          <div className="sales-order-items-heading">
            <p className="heading-item-details">Item Details</p>
            <p className="heading-qty">Qty</p>
            <p className="heading-rate">Rate</p>
            <p className="heading-tax">Tax</p>
            <p className="heading-amount">Amount</p>
          </div>

          <div className="sales-order-items-row-container">
            {salesOrderItemList.map((item) => (
              <div className="sales-order-items-row" key={item.id}>
                <div className="sales-order-item-details">
                  <input type="text" placeholder="Select an Item" />
                </div>
                <div className="sales-order-item-qty">
                  <input type="text" placeholder="1.00" />
                </div>
                <div className="sales-order-item-rate">
                  <input type="text" placeholder="0.00" />
                </div>
                <div className="sales-order-item-tax">
                  <input type="text" disabled />
                </div>
                <div className="sales-order-item-amount">
                  <p>₹ 0.00</p>
                </div>
              </div>
            ))}
            <hr className="item-bottom-hr" />
          </div>
          <p className="add-item-row-btn">+ Add Item</p>
        </div>
      </div>
    </div>
  );
};

export default SalesOrder;
