import React from 'react'
import { Link } from 'react-router-dom'
import { IoHomeOutline } from "react-icons/io5";
import { RiDeleteBinLine } from "react-icons/ri";

const Order = () => {
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
                </div>
            </div>

            <div className='py-10 px-10'>
                <table className='w-full border border-gray-300 '>
                    <thead className='bg-blue-900 text-white'>
                        <tr>
                            <th className='py-1 uppercase border-r'>Id</th>
                            <th className='py-1 uppercase border-r'>Date</th>
                            <th className='py-1 uppercase border-r'>amount</th>
                            <th className='py-1 uppercase border-r'>status</th>
                            <th className='py-1 uppercase border-r'>track</th>
                            <th className='py-1 uppercase border-r'>action</th>
                        </tr>
                    </thead>
                    <tbody className='border border-gray-300'>
                        <tr>
                            <td className='border-r border-gray-300 px-2 py-3'>ygdhserjuh</td>
                            <td className='border-r border-gray-300 px-2 py-3'>ygdhserjuh</td>
                            <td className='border-r border-gray-300 px-2 py-3'>ygdhserjuh</td>
                            <td className='border-r border-gray-300 px-2 py-3'>ygdhserjuh</td>
                            <td className='border-r border-gray-300 px-2 py-3'>ygdhserjuh</td>
                            <td className="border border-gray-300 p-2 text-center">
                                <button
                                    className="w-7 h-7 bg-red-500 rounded-sm pl-1.5 cursor-pointer text-white"
                                >
                                    <RiDeleteBinLine />
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Order
