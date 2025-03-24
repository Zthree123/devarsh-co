import React from 'react'
import { IoHomeOutline } from "react-icons/io5";
import { Link } from 'react-router-dom';
import { FaArrowRight } from "react-icons/fa6";

const ItemsPurchase = () => {
    return (
        <div>
            <div className='flex gap-2 py-5 px-5'>
                <input
                    className='outline-none w-full border border-gray-400 rounded px-1 py-2'
                    placeholder='SEARCH ITEMS'
                    type="text"
                />
                <input
                    className='outline-none w-96 border border-gray-400 rounded px-1 py-2'
                    placeholder='Walk in'
                    type="text" />
            </div>

            <div className='mx-5'>
                <table className='w-full border border-gray-300'>
                    <thead className='bg-blue-900 text-white'>
                        <tr>
                            <th className='border-r border-white py-1'>Item</th>
                            <th className='border-r border-white py-1'>Batch No</th>
                            <th className='border-r border-white py-1'>Expiry</th>
                            <th className='border-r border-white py-1'>Quantity</th>
                            <th className='border-r border-white py-1'>MRP</th>
                            <th className='border-r border-white py-1'>GST</th>
                            <th className='border-r border-white py-1'>Purchase price</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className='border-r border-gray-200 py-1 px-2 w-1/7'>1</td>
                            <td className='border-r border-gray-200 py-1 px-2 w-1/7'>123</td>
                            <td className='border-r border-gray-200 py-1 px-2 w-1/7'>2025-12-31</td>
                            <td className='border-r border-gray-200 py-1 px-2 w-1/7'>100</td>
                            <td className='border-r border-gray-200 py-1 px-2 w-1/7'>99</td>
                            <td className='border-r border-gray-200 py-1 px-2 w-1/7'>18</td>
                            <td className='border-r border-gray-200 py-1 px-2 w-1/7'>10</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div className='grid grid-cols-6 fixed bottom-0 w-full right-0 text-white'>
                <Link
                    to='/dashboard' 
                    className='flex items-center justify-center gap-3 py-6 bg-green-500 hover:bg-green-600'
                >
                    <IoHomeOutline />
                    <button className='uppercase '>home</button>
                </Link>
                <div className='grid grid-rows-2 place-items-center bg-blue-900 border-r border-r-indigo-400'>
                    <p className='uppercase'>total qty</p>
                    <p># 0.00</p>
                </div>
                <div className='grid grid-rows-2  place-items-center bg-blue-900 border-r border-r-indigo-400'>
                    <p className='uppercase'>total gross</p>
                    <p>RS 0.00</p>
                </div>
                <div className='grid grid-rows-2  place-items-center bg-blue-900 border-r border-r-indigo-400'>
                    <p className='uppercase'>total disc</p>
                    <p>RS 0.00</p>
                </div>
                <div className='grid grid-rows-2  place-items-center bg-blue-900 border-r border-r-indigo-400'>
                    <p className='uppercase'>net total</p>
                    <p>RS 0.00</p>
                </div>
                <div
                    className="flex items-center justify-center gap-3 px-4 py-2 cursor-pointer
                 bg-green-500 hover:bg-green-600"
                >
                        <button  className='uppercase cursor-not-allowed text-gray-500 flex items-center gap-2'>
                            <FaArrowRight /> Next
                        </button>
                </div>
            </div>
        </div>
    )
}

export default ItemsPurchase
