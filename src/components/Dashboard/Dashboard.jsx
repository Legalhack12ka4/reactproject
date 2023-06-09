import React from "react";
import { useEffect } from "react";
import { Navigate} from 'react-router-dom';
import { toast, ToastContainer } from "react-toastify";
import PrivateRoutes from "../../Authentication/PrivateRoutes";

//import Offcanvas from "../OffCanvas/OffCanvasExample";
import "./Dashboard.scss";


const Dashboard = () => {
  useEffect(() => {
    const loggedIn = localStorage.getItem('loggedIn');
    const message = localStorage.getItem('message');
    if (loggedIn && message) {
      toast.success(message);
      localStorage.removeItem('loggedIn');
      localStorage.removeItem('message');
    }
  }, []);
// {<PrivateRoutes/>}


//   const token = localStorage.getItem("jwt")
//   let loggedIn= true
//   if(token == null)
//   {
//     loggedIn = false
//   }
//  // Details={loggedIn}

// if(loggedIn == false)
// {
//   return <Navigate to="/"/>
// }


  return (
    <>
        {/* <div className="dashboard_details">

          <div className="dashboard_container">
          <div className="sales_order">
        <div className="container_dashboard_details">
          <div className="box_heading">
            <h3>Sales Order</h3>
            <div className="number_count">
              <span>12</span>
            </div>
          </div>

          <div className="amount_status">
            <div className="draft">
              <p className="amount">₹19.99k</p>
              <div className="status">
                <div className="dashboard_bullet green_bullet"></div>
                <p>DRAFT (2)</p>
              </div>
            </div>
            <div className="pending ">
              <p className="amount">₹2.19k</p>
              <div className="status">
                <div className="dashboard_bullet yellow_bullet"></div>
                <p>PENDING (2)</p>
              </div>
            </div>
            <div className="overdue">
              <p className="amount">₹16.25k</p>
              <div className="status">
                <div className="dashboard_bullet red_bullet"></div>
                <p>OVERDUE (10)</p>
              </div>
            </div>
          </div>
        </div>

      </div>
      <div className="invoices">
        <div className="container_dashboard_details">
          <div className="box_heading">
            <h3>Invoices</h3>
            <div className="number_count">
              <span>12</span>
            </div>
          </div>

          <div className="amount_status">
            <div className="draft">
              <p className="amount">₹19.99k</p>
              <div className="status">
                <div className="dashboard_bullet green_bullet"></div>
                <p>DRAFT (2)</p>
              </div>
            </div>
            <div className="pending ">
              <p className="amount">₹2.19k</p>
              <div className="status">
                <div className="dashboard_bullet yellow_bullet"></div>
                <p>PENDING (2)</p>
              </div>
            </div>
            <div className="overdue">
              <p className="amount">₹16.25k</p>
              <div className="status">
                <div className="dashboard_bullet red_bullet"></div>
                <p>OVERDUE (10)</p>
              </div>
            </div>
          </div>

          
        </div>
      </div>
      <div className="credit_notes">
        <div className="container_dashboard_details">
          <div className="box_heading">
            <h3>Credit Notes</h3>
            <div className="number_count">
              <span>12</span>
            </div>
          </div>

          <div className="amount_status">
            <div className="unapplied">
              <p className="amount">₹19.99k</p>
              <div className="status">
                <div className="dashboard_bullet red_bullet"></div>
                <p>UNAPPLIED (12)</p>
              </div>
            </div>
            
            
          </div>


        </div>
      </div>
      <div className="payments">
        <div className="container_dashboard_details">
          <div className="box_heading">
            <h3>Payments</h3>
            <div className="number_count">
              <span>12</span>
            </div>
          </div>

          <div className="amount_status">
            <div className="draft">
              <p className="amount">₹19.99k</p>
              <div className="status">
                <div className="dashboard_bullet green_bullet"></div>
                <p>IN HAND (2)</p>
              </div>
            </div>
            <div className="pending ">
              <p className="amount">₹2.19k</p>
              <div className="status">
                <div className="dashboard_bullet yellow_bullet"></div>
                <p>CLEARING (2)</p>
              </div>
            </div>
            <div className="overdue">
              <p className="amount">₹16.25k</p>
              <div className="status">
                <div className="dashboard_bullet red_bullet"></div>
                <p>RETURNED (10)</p>
              </div>
            </div>
          </div>


        </div>
      </div>
          </div>
      
    </div> */}

<ToastContainer/>
    </>
  );
};

export default Dashboard;