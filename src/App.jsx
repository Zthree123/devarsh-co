import React, { useState } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { Routes, Route } from 'react-router-dom'
import Dashboard from './Dashboard'
import Payment from './Payment'
import Masters from './Master'
import Login from './Login'
import Billing from './Billing'
import ItemMaster from './ItemMaster'
import Additem from './Additem'

const App = () => {
  const [selectedProducts, setSelectedProducts] = useState([]);

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/login' element={<Login />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/addItem' element={<Additem />} />
          {/* <Route path='/billing' element={<Billing />} /> */}
          <Route path='/payment' element={<Payment selectedProducts={selectedProducts} setSelectedProducts={setSelectedProducts} />} />
          <Route path='/billing' element={<Billing selectedProducts={selectedProducts} setSelectedProducts={setSelectedProducts} />} />
          <Route path='/transactions' element={<Masters selectedProducts={selectedProducts} setSelectedProducts={setSelectedProducts} />} />
          <Route path='/itemMaster' element={<ItemMaster />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
