import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { IoHomeOutline } from "react-icons/io5";
import { FaPlus } from "react-icons/fa6";
import { MdFirstPage, MdLastPage } from "react-icons/md";

const ItemMaster = () => {
  // const [mrp, setMrp] = useState(122);
  const [products, setProducts] = useState([])
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // const retailerMargin = 0.2;
  // const stockistMargin = 0.1;

  // const calculatePTR = (mrp) => (mrp / (1 + retailerMargin)).toFixed(2);
  // const calculatePTS = (ptr) => (ptr / (1 + stockistMargin)).toFixed(2);

  // const ptr = calculatePTR(mrp);
  // const pts = calculatePTS(ptr);

  const filteredProducts = products.filter((product) =>
    product.name?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    fetch("https://api.zthree.in/bizsura/Products?action=showProducts", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer your_secret_api_key"
      }
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Full API Response:", data);

        if (data.success && data.results.length > 0) {
          setProducts([...data.results]);
          console.log("Updated Products:", [...data.results]);

        } else {
          console.error("API Error:", data.message);
        }
      })
      .catch((error) => console.error("Fetch Error:", error));
  }, []);


  return (
    <div>
      <div className='flex justify-between items-center p-6 bg-gray-200'>
        <p className='uppercase font-semibold'>devarsh & co</p>
        <div className='flex gap-2'>
          <Link
            to='/dashboard'
            className='flex items-center gap-2 bg-green-500 text-white px-5 py-2 cursor-pointer rounded-md hover:bg-green-600'
          >
            <IoHomeOutline />
            <span>Home</span>
          </Link>
          <Link
            to='/addItem'
            className='flex items-center gap-2 bg-blue-500 text-white px-5 py-2 cursor-pointer rounded-md hover:bg-blue-600'
          >
            <FaPlus />
            <p>Add Item</p>
          </Link>
        </div>
      </div>

      <div className='py-7 px-5'>
        <input
          type="text"
          placeholder='SEARCH ITEMS HERE'
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className='w-full outline-none border border-gray-300 rounded-md py-2 px-2 focus:ring-2 ring-blue-500'
        />
      </div>

      <div className="border border-gray-300 rounded-md overflow-hidden mx-5">
        <table className="w-full table-fixed border-collapse">
          <thead className="bg-cyan-800 w-20">
            <tr className="text-left font-normal text-white">
              <th className="p-3 border-r-2 border-gray-300 w-1/7 text-center">Item</th>
              <th className="p-3 border-r-2 border-gray-300 w-1/7 text-center">MRP</th>
              <th className="p-3 border-r-2 border-gray-300 w-2/7 text-center">Pricing (Without Tax)</th>
              <th className="p-3 border-r-2 border-gray-300 w-1/7 text-center">GST</th>
              <th className="p-3  w-2/7 text-center">Pricing (With Tax)</th>
            </tr>
          </thead>
          <tbody >
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product, index) => {
                return (
                  <React.Fragment key={index}>
                    <tr className="text-gray-500 border-b border-gray-300 odd:bg-white even:bg-emerald-50">
                      <td className="p-2 border-r border-gray-300 w-1/7">
                        <div className='flex items-center justify-between'>
                          <p>{product.name || "N/A"}</p>
                        </div>
                      </td>
                      <td className="p-2 border-r border-gray-300  w-1/7">₹{product.price_mrp || []}</td>
                      <td className="px-5 border-r border-gray-300  w-2/7">
                        <div className="flex items-center gap-6">
                          <div className='flex items-center justify-center gap-2'>
                            <label>PTS:</label>
                            <input
                              type="text"
                              value={product.price_pts}
                              readOnly
                              className="outline-none border border-gray-300 rounded-md w-16 px-1 py-1"
                            />
                          </div>

                          <div className="h-20 w-12 border-r-2 border-gray-300"></div>

                          <div className='flex items-center justify-center gap-2'>
                            <label>PTR:</label>
                            <input
                              type="text"
                              value={product.price_ptr}
                              readOnly
                              className="outline-none border border-gray-300 rounded-md w-16 px-1 py-1"
                            />
                          </div>
                        </div>
                      </td>
                      <td className="p-2 border-r border-gray-300  w-1/7">{product.gstRate || "N/A"}</td>
                      <td className="px-5 border-r border-gray-300  w-2/7">
                        <div className="flex items-center gap-6">
                        <div className='flex items-center justify-center gap-2'>
                            <label>PTS:</label>
                            <input
                              type="text"
                              value={product.price_nett_pts}
                              readOnly
                              className="outline-none border border-gray-300 rounded-md w-16 px-1 py-1"
                            />
                          </div>

                          <div className="h-20 w-12 border-r-2 border-gray-300"></div>

                          <div className='flex items-center justify-center gap-2'>
                            <label>PTR:</label>
                            <input
                              type="text"
                              value={product.price_nett_ptr}
                              readOnly
                              className="outline-none border border-gray-300 rounded-md w-16 px-1 py-1"
                            />
                          </div>
                        </div>
                      </td>
                    </tr>
                  </React.Fragment>
                );
              })
            ) : (
              <tr>
                <td colSpan="7" className="text-center p-4 text-gray-500">
                  Loading products...
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className='flex items-center justify-center gap-3 py-10'>
        <MdFirstPage size={25} className='text-gray-500 cursor-pointer' onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} />
        <span> {currentPage}</span>
        <MdLastPage size={25} className='text-gray-500 cursor-pointer' onClick={() => setCurrentPage(prev => prev + 1)} />
      </div>

    </div>
  )
}

export default ItemMaster
