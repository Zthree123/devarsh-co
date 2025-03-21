import React, { useState } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { Routes, Route } from 'react-router-dom'
import { Navigate } from 'react-router-dom'
import Dashboard from './Dashboard'
import Payment from './Payment'
import Masters from './Master'
import Login from './Login'
import Billing from './Billing'
import ItemMaster from './ItemMaster'
import Additem from './Additem'
import SalesGraph from './SalesGraph'
import RetailerMaster from './RetailerMaster'
import AddParty from './AddParty'
import CustomerMaster from './CustomerMaster'
import BeatMaster from './BeatMaster'
import DistributorMaster from './DistributorMaster'
import ProtectedRoute from './ProtectedRoute'

const App = () => {
  const [selectedProducts, setSelectedProducts] = useState([]);

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />

          <Route path="/" element={
            localStorage.getItem("user") ? <Navigate to="/dashboard" /> : <Navigate to="/login" />
          } />

          <Route element={<ProtectedRoute />}>
            <Route path='/login' element={<Login />} />
            <Route path='/dashboard' element={<Dashboard />} />
            <Route path='/addItem' element={<Additem />} />
            <Route path='/salesgraph' element={<SalesGraph />} />
            {/* <Route path='/billing' element={<Billing />} /> */}
            <Route path='/payment' element={<Payment selectedProducts={selectedProducts} setSelectedProducts={setSelectedProducts} />} />
            <Route path='/billing' element={<Billing selectedProducts={selectedProducts} setSelectedProducts={setSelectedProducts} />} />
            <Route path='/transactions' element={<Masters selectedProducts={selectedProducts} setSelectedProducts={setSelectedProducts} />} />
            <Route path='/itemMaster' element={<ItemMaster />} />
            <Route path='/retailerMaster' element={<RetailerMaster />} />
            <Route path='/customerMaster' element={<CustomerMaster />} />
            <Route path='/beatMaster' element={<BeatMaster />} />
            <Route path='/distributorMaster' element={<DistributorMaster />} />
            <Route path='/addparty' element={<AddParty />} />
          </Route>

          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
