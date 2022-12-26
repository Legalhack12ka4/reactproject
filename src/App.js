
import './App.css';

import Footer from './components/Footer/Footer';
import SearchBar from './components/SearchBar/SearchBar';
import Sidebar from './components/Sidebar/Sidebar';
import Customers from "./components/Customers/Customer"
import {Routes ,Route } from 'react-router-dom'
import Page_heading from './components/Page_Heading/Page_heading';
import Dashboard from './components/Dashboard/Dashboard';
import AddNewCustomer from './components/Customers/AddNewCustomer';
import CustomerPage from './components/Customer-Page/CustomerPage';
import Leads from './components/Leads/Leads';
import Contacts from './components/Contacts/Contacts';
import LeadsData from './components/Leads/Leads-Data/LeadsData';
import ContactsData from './components/Contacts/Contacts-Data/ContactsData';

import Accounts from './components/Chart_Of_Account/Accounts/Accounts';

import VendorsData from './components/Vendors/Vendors-Data/VendorsData';
import Vendors from './components/Vendors/Vendors';





function App() {
  return (
    
      <div className="App">

          
          <div className='main'>
          <div className='' id="gradient"></div>
          <Sidebar/>
          <div className='rightScreen'>
          {/* <SearchBar /> */}
          

          <Routes>
          {/* <Route path='/' element={<Dashboard/>} /> */}
            {/* <Route path='customers' element={<Customers />} /> */}
          <Route path='customers' element={<CustomerPage/>} />
          <Route path='leads' element={<LeadsData/>} />
          <Route path='leads/add_leads' element={<Leads/>} />
          <Route path='contacts' element={<ContactsData/>} />
          <Route path='vendors' element={<VendorsData/>} />
          <Route path='vendors/add_vendors' element={<Vendors/>} />
          <Route path='contacts/add_contacts' element={<Contacts/>} />
          <Route path='customers' element={<Customers/>} />
          <Route path='addcustomers' element={<AddNewCustomer/>} />
          <Route path='accounts' element={<Accounts/>} />
          <Route path='/' element={<Dashboard/>} />
          </Routes>
          {/* <Footer /> */}
          </div>
          </div>
          
         
      </div>    
  );
}

export default App;
