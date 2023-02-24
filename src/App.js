
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
import PageNotFound from './components/PageNotFound/PageNotFound';
import NewEstimate from './components/Sales/Estimate/New Estimate/NewEstimate';
import SalesOrder from './components/Sales/SalesOrder/SalesOrder';
import Invoice from './components/Sales/Invoice/Invoice';
import PurchaseOrder from './components/Purchase/PurchaseOrder/PurchaseOrder';
import ItemandService from './components/ItemandService/ItemandService';
import NewInventoryItem from './components/NewInventoryItem/NewInventoryItem';
import NewInventoryGroup from './components/NewInventoryGroup/NewInventoryGroup';
import ItemPreview from './components/AddInventoryItem/ItemGroup/ItemPreview';
import ItemTable from './components/AddInventoryItem/ItemTable/ItemTable';
import ItemGroupTable from './components/AddInventoryItem/ItemGroupTable/ItemGroupTable';
import UnitOfMeasurement from './components/UnitofMeasurement/UnitOfMeasurement';
import LoginPage from './components/LoginPage/LoginPage';

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
          {/* <Route path='add_inventory' element={<AddInventoryItem/>} /> */}
          <Route path='item_&_service' element={<ItemandService/>} />
          <Route path='item_&_service/new_inventory_item' element={<NewInventoryItem/>} />
          <Route path='item_&_service/new_inventory_group' element={<NewInventoryGroup/>} />
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
          <Route path="*" element={<PageNotFound/>} />
          <Route path="Sales/new_estimate" element={<NewEstimate/>}/>
          <Route path="Sales/sales_order" element={<SalesOrder/>}/>
          <Route path="Sales/invoice" element={<Invoice/>}/>
          <Route path="Purchase/purchase_orders" element={<PurchaseOrder/>}/>
          <Route path="itempreview" element={<ItemPreview/>}/>
          <Route path="itemtable" element={<ItemTable/>}/>
          <Route path="itemtable1" element={<ItemTable/>}/>
          <Route path="itemtable2" element={<ItemTable/>}/>
          <Route path="itemtable3" element={<ItemTable/>}/>
          <Route path="itemtable4" element={<ItemTable/>}/>
          <Route path="itemtable5" element={<ItemTable/>}/>
          <Route path="itemgrouptable" element={<ItemGroupTable/>}/>
          <Route path="itemgrouptable1" element={<ItemGroupTable/>}/>
          <Route path="itemgrouptable2" element={<ItemGroupTable/>}/>
          <Route path="itemgrouptable3" element={<ItemGroupTable/>}/>
          <Route path="itemgrouptable4" element={<ItemGroupTable/>}/>
          <Route path="itemgrouptable5" element={<ItemGroupTable/>}/>
          <Route path="unitofmeasurement" element={<UnitOfMeasurement/>}/>
          <Route path="login" element={<LoginPage/>}/>
          </Routes>
          {/* <Footer /> */}
          </div>
          </div>
          
         
      </div>    
  );
}

export default App;
