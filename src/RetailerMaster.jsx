import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { IoHomeOutline } from "react-icons/io5";
import { FaPlus } from "react-icons/fa6";
import AddParty from './AddParty';
import { CiEdit } from "react-icons/ci";
import { RiDeleteBinLine } from "react-icons/ri";
import { BiFirstPage, BiLastPage } from "react-icons/bi";

const RetailerMaster = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [retailer, setRetailer] = useState([])
    const [searchQuery, setSearchQuery] = useState("")
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

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

    const filteredParty = retailer.filter((party) =>
        party.partyName.toLowerCase().includes(searchQuery.toLowerCase())
    )

    const totalPages = Math.ceil(filteredParty.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedParties = filteredParty.slice(startIndex, endIndex);

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
                <input
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className='border border-gray-300 outline-none w-full py-2 rounded-md px-2'
                    placeholder='SEARCH PARTY'
                    type="text"
                />
            </div>

            <div className='mx-6'>
                <table className='w-full table-fixed border border-gray-300 border-collapse'>
                    <thead className='bg-blue-900 text-white '>
                        <tr>
                            <th className='border-r border-gray-200 py-2 font-medium uppercase'>Party Name</th>
                            <th className='border-r border-gray-200 py-2 font-medium uppercase'>GSTIN</th>
                            <th className='border-r border-gray-200 py-2 font-medium uppercase'>Phone Number</th>
                            <th className='border-r border-gray-200 py-2 font-medium uppercase'>GST Type</th>
                            <th className='border-r border-gray-200 py-2 font-medium uppercase'>State</th>
                            <th className='border-r border-gray-200 py-2 font-medium uppercase'>Email ID</th>
                            <th className='border-r border-gray-200 py-2 font-medium uppercase'>Billing Address</th>
                            <th className='border-r border-gray-200 py-2 font-medium uppercase'>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            paginatedParties.length > 0 ? (
                                paginatedParties.map((party, index) => (
                                    <React.Fragment key={party.partyId || index}>
                                        <tr className={`border-b border-gray-50 text-gray-500 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
                                            <td className='border-r border-gray-100 px-4 py-2'>{party.partyName}</td>
                                            <td className='border-r border-gray-100 px-4 py-2'>{party.gstNo}</td>
                                            <td className='border-r border-gray-100 px-4 py-2'>{party.MobileNumber}</td>
                                            <td className='border-r border-gray-100 px-4 py-2'>{party.gstType}</td>
                                            <td className='border-r border-gray-100 px-4 py-2'>{party.partyState}</td>
                                            <td className='border-r border-gray-100 px-4 py-2'>{party.email}</td>
                                            <td className='border-r border-gray-100 px-4 py-2'>{party.partyFullAddress}</td>
                                            <td className='flex items-center justify-center py-3 gap-3'>
                                                <CiEdit className='text-2xl text-blue-800 cursor-pointer' />
                                                <RiDeleteBinLine
                                                    // onClick={() => handleDelete(party.partyId)}
                                                    className='text-2xl text-red-600 cursor-pointer'
                                                />
                                            </td>
                                        </tr>
                                        <tr className={`border-b border-gray-300 text-sm text-gray-600 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-100'}`}>
                                            <td colSpan={8} className="px-4 py-2 ">
                                                <span>Open Balance:  <strong className='font-medium'>{party.creditInfo?.OpenBal || "0.00"}</strong> |  </span>
                                                <span>Close Balance: <strong className='font-medium'>{party.creditInfo?.CloseBal || "0.00"}</strong> | </span>
                                                <span>Credit Limit:  <strong className='font-medium'>{party.creditInfo?.CreditLimit || "0.00"}</strong> | </span>
                                                <span>Credit Type:   <strong className='font-medium'>{party.creditInfo?.CreditLimitType || "N/A"}</strong></span>
                                            </td>
                                        </tr>
                                    </React.Fragment>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="8" className="text-center p-4 text-gray-500">No items found</td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>

            <div className="flex justify-center items-center gap-4 my-4">
                <button
                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className={`px-4 py-2 rounded-md ${currentPage === 1 ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600 text-white'}`}
                >
                    <BiFirstPage />
                </button>
                <span className="font-medium">{currentPage}</span>
                <button
                    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className={`px-4 py-2 rounded-md ${currentPage === totalPages ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600 text-white'}`}
                >
                    <BiLastPage />
                </button>
            </div>
        </div>
    )
}

export default RetailerMaster
