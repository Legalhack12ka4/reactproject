
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
import NonInventoryGroup from './components/ItemandService/Non-InventoryGroup/NonInventoryGroup';
import NonInventoryItem from './components/ItemandService/Non-InventoryItem/NonInventoryItem';
import NoItemGroupTable from './components/AddInventoryItem/NoTradedItem/NoItemGroupTable';
import ServiceGroup from './components/ItemandService/ServiceGroup/ServiceGroup';
import ServiceItem from './components/ItemandService/ServiceItem/ServiceItem';
import ServiceItemGroupTable from './components/AddInventoryItem/Service/ServiceItemGroupTable';
import ManufacturedGroup from './components/ItemandService/ManufacturedGroup/ManufacturedGroup';
import ManufacturedItem from './components/ItemandService/ManufacturedItem/ManufacturedItem';
import ManufacturedItemTable from './components/AddInventoryItem/ManufacturedItem/ManufacturedItemTable';
import JobWorkGroup from './components/ItemandService/JobWorkGroup/JobWorkGroup';
import JobWorkItem from './components/ItemandService/JobWorkItem/JobWorkItem';
import JobWorkGroupTable from './components/AddInventoryItem/JobWorkGroupTable/JobWorkGroupTable';
import FixedAssetsGroup from './components/ItemandService/FixedAssetsGroup/FixedAssetsGroup';
import FixedAssetsItem from './components/ItemandService/FixedAssetsItem/FixedAssetsItem';
import FixedAssetsGroupTable from './components/AddInventoryItem/FixedAssets/FixedAssetsGroupTable';
import SalesData from './components/Sales/SalesOrder/Sales-Data/SalesData';
import PrivateRoutes from './Authentication/PrivateRoutes';

function App() {
  return (
    
      <div className="App">

          
          <div className='main'>
          
          <Sidebar/>
          
          <div className='rightScreen'>
          <SearchBar />
          

          <Routes>
      <Route path= '/' element={<PrivateRoutes />}>
          {/* <Route path='/' element={<Dashboard/>} /> */}
            {/* <Route path='customers' element={<Customers />} /> */}
            {/* <Route path='customers1' element={<AddInventoryItem />} /> */}
          <Route path='customers/customerPage' element={<CustomerPage/>} />
          <Route path='leads' element={<LeadsData/>} />
          <Route path='leads/add_leads' element={<Leads/>} />
          <Route path='contacts' element={<ContactsData/>} />
          {/* <Route path='add_inventory' element={<AddInventoryItem/>} /> */}
          <Route path='item_&_service' element={<ItemandService/>} />
          <Route path='item_&_service/new_inventory_item' element={<NewInventoryItem/>} />
          <Route path='item_&_service/new_inventory_group' element={<NewInventoryGroup/>} />
          <Route path="item_&_service/non_traded_group" element={<NonInventoryGroup/>}/>
          <Route path="item_&_service/non_traded_item" element={<NonInventoryItem/>}/>
          <Route path="item_&_service/service_group" element={<ServiceGroup/>}/>
          <Route path="item_&_service/service_item" element={<ServiceItem/>}/>
          <Route path="item_&_service/manufactured_group" element={<ManufacturedGroup/>}/>
          <Route path="item_&_service/manufactured_item_form" element={<ManufacturedItem/>}/>
          <Route path="item_&_service/jobwork_group" element={<JobWorkGroup/>}/>
          <Route path="item_&_service/jobwork_item" element={<JobWorkItem/>}/>
          <Route path="item_&_service/fixedassets_group" element={<FixedAssetsGroup/>}/>
          <Route path="item_&_service/fixedassets_item" element={<FixedAssetsItem/>}/>
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
          <Route path='dashboard' element={<Dashboard/>} />
          <Route path="*" element={<PageNotFound/>} />
          <Route path="Sales/new_estimate" element={<NewEstimate/>}/>
          <Route path="Sales/sales_order" element={<SalesData/>}/>
          <Route path="Sales/invoice" element={<Invoice/>}/>
          <Route path="Purchase/purchase_orders" element={<PurchaseOrder/>}/>
          <Route path="itempreview" element={<ItemPreview/>}/>
          <Route path="itemtable" element={<ItemTable/>}/>
          <Route path="itemtable1" element={<ItemTable/>}/>
          <Route path="itemtable2" element={<ItemTable/>}/>
          <Route path="itemtable3" element={<ItemTable/>}/>
          <Route path="itemtable4" element={<ItemTable/>}/>
          <Route path="itemtable5" element={<ItemTable/>}/>
          <Route path="item_&_service/raw_material_&_traded_item" element={<ItemGroupTable/>}/>
          <Route path="item_&_service/no_traded_item" element={<NoItemGroupTable/>}/>
          <Route path="item_&_service/manufactured_item" element={<ManufacturedItemTable/>}/>
          <Route path="item_&_service/items_jobwork" element={<JobWorkGroupTable/>}/>
          <Route path="item_&_service/services" element={<ServiceItemGroupTable/>}/>
          <Route path="item_&_service/fixed_assets" element={<FixedAssetsGroupTable/>}/>
          <Route path="unitofmeasurement" element={<UnitOfMeasurement/>}/>
          {/* <Route path="unitofmeasurement" element={<UnitOfMeasurement/>}/> */}
          <Route path="sales/sales_order" element={<SalesData/>}/>
          <Route path='sales/sales_order/add_sales' element={<SalesOrder/>} />
      </Route>
      <Route path="/login" element={<LoginPage/>}/>
          </Routes>
          {/* <Footer /> */}
          </div>
          </div>
          
         
      </div>    
  );
}

export default App;
