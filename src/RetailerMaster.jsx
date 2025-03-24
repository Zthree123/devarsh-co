import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { IoHomeOutline } from "react-icons/io5";
import { FaPlus } from "react-icons/fa6";
import AddParty from './AddParty';

const RetailerMaster = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [retailer, setRetailer] = useState([])

    const fetchRetailer = async () => {
        try {
            const response = await fetch("https://api.zthree.in/bizsura/Party?action=showParties&vendor_id=001", {
                headers: {
                    "Authorization": "Bearer your_secret_api_key",
                    "Content-Type": "application/json"
                }
            })
            const data = await response.json()

            if (data.status === "success") {
                setRetailer(data.results)
                console.log(data.results)
            } else {
                setRetailer([])
                console.log("Error when fetching data.")
            }
        } catch (error) {
            console.error("Error fetching beats:", error);
            setRetailer([])
        }
    }

    useEffect(() => {
        fetchRetailer()
    }, [])

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
                        <p>Add Retailer</p>
                    </button>
                </div>

                {isOpen && (
                    <>
                        <div className="fixed inset-0 bg-black/30 z-40"></div>

                        <div className="fixed inset-0 flex items-center justify-center z-50">
                            <div className="bg-white p-5 rounded-lg shadow-lg w-[900px] ">
                                <AddParty setIsOpen={setIsOpen} setRetailer={setRetailer} fetchRetailer={fetchRetailer} />
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
                            <th className='border-r border-gray-200 py-2 font-medium'>State</th>
                            <th className='border-r border-gray-200 py-2 font-medium'>Email ID</th>
                            <th className='border-r border-gray-200 py-2 font-medium'>Billing Address</th>
                        </tr>
                    </thead>
                    <tbody className=''>
                        {
                            retailer.length > 0 ? (
                                retailer.map((party, index) => (
                                    <>
                                        <tr className={`border-b border-gray-100 text-gray-900 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
                                            <td className='border-r border-gray-200 px-4 py-2'>{party.partyName}</td>
                                            <td className='border-r border-gray-200 px-4 py-2'>{party.gstNo}</td>
                                            <td className='border-r border-gray-200 px-4 py-2'>{party.MobileNumber}</td>
                                            <td className='border-r border-gray-200 px-4 py-2'>{party.gstType}</td>
                                            <td className='border-r border-gray-200 px-4 py-2'>{party.partyState}</td>
                                            <td className='border-r border-gray-200 px-4 py-2'>{party.email}</td>
                                            <td className='px-4 py-2'>{party.partyFullAddress}</td>
                                        </tr>
                                        <tr className={`border-b border-gray-300 text-sm text-gray-600 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-100'}`}>
                                            <td colSpan={7} className="px-4 py-2 ">
                                                <span>Open Balance: {party.creditInfo?.OpenBal || "0.00"} |  </span>
                                                <span>Close Balance: {party.creditInfo?.CloseBal || "0.00"} | </span>
                                                <span>Credit Limit: {party.creditInfo?.CreditLimit || "0.00"} | </span>
                                                <span>Credit Type: {party.creditInfo?.CreditLimitType || "N/A"}</span>
                                            </td>
                                        </tr>
                                    </>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="7" className="text-center p-4 text-gray-500">Loading ...</td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default RetailerMaster
