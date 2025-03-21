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
            <Route path="/billing" element={<Billing selectedProducts={selectedProducts} setSelectedProducts={setSelectedProducts} />} />
            <Route path="/transactions" element={<Masters selectedProducts={selectedProducts} setSelectedProducts={setSelectedProducts} />} />
            <Route path="/itemMaster" element={<ItemMaster />} />
            <Route path="/retailerMaster" element={<RetailerMaster />} />
            <Route path="/customerMaster" element={<CustomerMaster />} />
            <Route path="/beatMaster" element={<BeatMaster />} />
            <Route path="/distributorMaster" element={<DistributorMaster />} />
            <Route path="/addparty" element={<AddParty />} />
          
      
      </Routes>
    </BrowserRouter>
  );
};

export default App;
