import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { IoHomeOutline } from "react-icons/io5";
import { FaPlus } from "react-icons/fa6";
import AddParty from './AddParty';

const CustomerMaster = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [parties, setParties] = useState([]);

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
                    <button
                        onClick={() => setIsOpen(true)}
                        to='/addparty'
                        className='flex items-center gap-2 bg-blue-500 text-white px-5 py-2 cursor-pointer rounded-md hover:bg-blue-600'
                    >
                        <FaPlus />
                        <p>Add Party</p>
                    </button>
                </div>

                {isOpen && (
                    <>
                        <div className="fixed inset-0 bg-black/30 z-40"></div>

                        <div className="fixed inset-0 flex items-center justify-center z-50">
                            <div className="bg-white p-5 rounded-lg shadow-lg w-[900px] ">
                                <AddParty setIsOpen={setIsOpen} setParties={ setParties} />
                            </div>
                        </div>
                    </>
                )}
            </div>

            <div className='py-8 mx-6'>
                <table className='w-full table-fixed border border-gray-300 border-collapse'>
                    <thead className='bg-blue-900 text-white '>
                        <tr>
                            <th className='border-r border-gray-200 py-2 font-medium'>Party Name</th>
                            <th className='border-r border-gray-200 py-2 font-medium'>GSTIN</th>
                            <th className='border-r border-gray-200 py-2 font-medium'>Phone Number</th>
                            <th className='border-r border-gray-200 py-2 font-medium'>GST Type</th>
                            <th className='border-r border-gray-200 py-2 font-medium'>Place</th>
                            <th className='border-r border-gray-200 py-2 font-medium'>Email ID</th>
                            <th className='border-r border-gray-200 py-2 font-medium'>Billing Address</th>
                        </tr>
                    </thead>
                    <tbody className=''>
                        {parties.map((party, index) => (
                            <tr key={index} className="border-b border-gray-300 odd:bg-white even:bg-gray-100">
                                <td className='border-r border-gray-200 px-4 py-2'>{party.partyName}</td>
                                <td className='border-r border-gray-200 px-4 py-2'>{party.gstin}</td>
                                <td className='border-r border-gray-200 px-4 py-2'>{party.phone}</td>
                                <td className='border-r border-gray-200 px-4 py-2'>{party.gstType}</td>
                                <td className='border-r border-gray-200 px-4 py-2'>{party.place}</td>
                                <td className='border-r border-gray-200 px-4 py-2'>{party.email}</td>
                                <td className='px-4 py-2'>{party.billingAddress}</td>
                            </tr>
                        ))}
                        {parties.length === 0 && (
                            <tr>
                                <td colSpan="7" className="text-center p-4 text-gray-500">No data available</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

        </div>
    )
}

export default CustomerMaster
