
import './App.css';
import './components/AntdStyles/AntdStyles.scss';

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
import AddInventoryItem from './components/AddInventoryItem/AddInventoryItem';

import Module from './components/ListOfModule/Module/Module';
import ModulePaymentTerms from './components/ListOfModule/ModulePaymentTerms/ModulePaymentTerms';
import ModuleCurrencyTable from './components/ListOfModule/ModuleCurrencyTable/ModuleCurrencyTable';

function App() {
  return (
    
      <div className="App">

          
          <div className='main'>
          
          <Sidebar/>
          <div className='rightScreen'>
          <SearchBar />
          

          <Routes>
          {/* <Route path='/' element={<Dashboard/>} /> */}
            <Route path='customers' element={<Customers />} />
          <Route path='customers/customerPage' element={<CustomerPage/>} />
          <Route path='leads' element={<LeadsData/>} />
          <Route path='leads/add_leads' element={<Leads/>} />
          <Route path='contacts' element={<ContactsData/>} />
          <Route path='add_inventory' element={<AddInventoryItem/>} />
          <Route path='vendors' element={<VendorsData/>} />
          <Route path='vendors/add_vendors' element={<Vendors/>} />
          <Route path='contacts/add_contacts' element={<Contacts/>} />
          <Route path='customers' element={<Customers/>} />
          <Route path='customers/addcustomer' element={<AddNewCustomer/>} />
          <Route path='accounts' element={<Accounts/>} />
          <Route path='/module/customer/customerPage' element={<CustomerPage />} />
          <Route path='module' element={<Module/>} />
          <Route path='module/module_paymenttable' element={<ModulePaymentTerms/>} />
          <Route path='module/module_currencytable' element={<ModuleCurrencyTable/>} />
          <Route path='/' element={<Dashboard/>} />
          </Routes>
          {/* <Footer /> */}
          </div>
          </div>
          
         
      </div>    
  );
}

export default App;
