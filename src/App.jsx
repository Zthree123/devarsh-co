import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './Dashboard';
import Payment from './Payment';
import Masters from './Master';
import Login from './Login';
import Billing from './Billing';
import ItemMaster from './ItemMaster';
import Additem from './Additem';
import SalesGraph from './SalesGraph';
import RetailerMaster from './RetailerMaster';
import AddParty from './AddParty';
import CustomerMaster from './CustomerMaster';
import BeatMaster from './BeatMaster';
import DistributorMaster from './DistributorMaster';
import ProtectedRoute from './ProtectedRoute';
import Purchases from './Purchases';
import ParentItems from './ParentItems';
import PartyAdding from './PartyAdding';
import Bill from './Bill';
import ExpenseCategory from './ExpenseCategory';
import Expenses from './Expenses';
import Purchase from './Purchase';
import Sale from './Sale';
import PurchaseReturn from './PurchaseReturn';
import SaleReturn from './SaleReturn';
import Order from './Order';

const App = () => {
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    setIsAuthenticated(!!localStorage.getItem("user"));
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />

        {/* <Route path="/" element={
          isAuthenticated ? <Navigate to="/dashboard" replace /> : <Navigate to="/login" replace />
        } /> */}


        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/addItem" element={<Additem />} />
        <Route path="/salesgraph" element={<SalesGraph />} />
        <Route path="/payment" element={<Payment selectedProducts={selectedProducts} setSelectedProducts={setSelectedProducts} />} />
        {/* <Route path="/billing" element={<Billing selectedProducts={selectedProducts} setSelectedProducts={setSelectedProducts} />} /> */}
        <Route path="/transactions" element={<Masters selectedProducts={selectedProducts} setSelectedProducts={setSelectedProducts} />} />
        <Route path="/itemMaster" element={<ItemMaster />} />
        <Route path="/retailerMaster" element={<RetailerMaster />} />
        <Route path="/customerMaster" element={<CustomerMaster />} />
        <Route path="/beatMaster" element={<BeatMaster />} />
        <Route path="/distributorMaster" element={<DistributorMaster />} />
        <Route path="/addretailer" element={<AddParty />} />
        <Route path="/purchases" element={<Purchases />} />
        <Route path="/purchase" element={<Purchase />} />
        <Route path="/purchase-return" element={<PurchaseReturn />} />
        <Route path="/parentItem" element={<ParentItems />} />
        <Route path="/partyadding" element={<PartyAdding />} />
        <Route path="/bill" element={<Bill />} />
        <Route path="/expensecategory" element={<ExpenseCategory />} />
        <Route path="/expense" element={<Expenses />} />
        <Route path="/sale" element={<Sale />} />
        <Route path="/sale-return" element={<SaleReturn />} />
        {/* <Route path="/order" element={<Order />} /> */}
      </Routes>
    </BrowserRouter>
  );
};

export default App;
