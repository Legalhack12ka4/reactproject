import React, { useState } from "react";
import Page_heading from "../../Page_Heading/Page_heading";
import "./SalesOrder.scss";
import CustomInput from "../../CustomInput/CustomInput";
import { SearchSelect } from "../../Dropdowns/Dropdowns";

const SalesOrder = () => {
  const [salesOrderItemList, setSalesOrderItemList] = useState([
    { id: 1, name: "row1", value: "" },
  ]);
  const [fileList, setFileList] = useState([]);

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
                <img src="/images/icons/edit.svg" alt="edit icon" />
              </div>
              <h4 className="company-name sc-body-bd">Reformiqo Business Service Pvt Ltd</h4>
              <p className="sc-body-rg">G-2, Ground Floor, InternationalBusiness Center, Near Rahul Raj Mall Piplod, Surat Gujarat - 395007</p>
              <h4 className="sc-body-bd">GSTIN : 22AAAAA0000A1Z5</h4>
            </div>
            <div className="ship-to-container">
              <div className="ship-to-heading">
                <h4 className="body-md">Ship To</h4>
                <img src="/images/icons/edit.svg" alt="edit icon" />
              </div>
              <p className="sc-body-rg">G-2, Ground Floor, InternationalBusiness Center, Near Rahul Raj Mall Piplod, Surat Gujarat - 395007</p>
              <p className="sc-body-sb">Place of Supply : Gujarat</p>
            </div>
            <div className="transporter-container">
              <div className="transporter-heading">
                <h4 className="body-md">Transporter</h4>
                <img src="/images/icons/edit.svg" alt="edit icon" />
              </div>
              <h4 className="transporter-name sc-body-bd">Balaji Transport Services</h4>
              <p className="transporter-id sc-body-md">Transporter Id : TS12AA56LP15935</p>
              <p className="sc-body-rg">G-202, Balaji House, Sosyo Circle, Udhna-Magdalla road, Bhatar, Surat </p>
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
                      <CustomInput placeholder="Select Item" width={208} />
                    </div>
                    <div className="item-qty">
                    <CustomInput placeholder="1.00" width={100} />
                    </div>
                    <div className="item-rate">
                    <CustomInput placeholder="0.00" width={100} />
                    </div>
                    <div className="item-tax">
                    <CustomInput disabled width={80} />
                    </div>
                    <div className="item-discount">
                    <CustomInput placeholder="0.00" symbol="₹" textAlign="right" width={100} />
                    <CustomInput placeholder="0.00" symbol="%" textAlign="right" width={100} />

                    </div>
                    <div className="item-amount">
                      <p className="sc-body-sb">₹ 0.00</p>
                    </div>
                    <div className="delete-item-row" onClick={()=>handleDeleteOrderItemRow(item.id)}>
                      <img src="/images/icons/cross-icon.svg" alt="" />
                    </div>
                  </div>
                  <hr className="item-bottom-hr" />
                </>
                ))}
              </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default SalesOrder;
