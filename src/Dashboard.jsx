import React, { useEffect, useState } from 'react'
import { IoHomeOutline } from "react-icons/io5";
import { AiOutlineProduct } from "react-icons/ai";
import { TbWindowMaximize } from "react-icons/tb";
import { TbReport } from "react-icons/tb";
import { RiShutDownLine } from "react-icons/ri";
import { FaAngleDown } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import Login from './Login';
import shortage_qty from './images/shortage_qty.png'
import item_qty from './images/item_qty.png'
import sales_qty from './images/sales_qty.png'
import sales from './images/sales.png'
import ItemMaster from './ItemMaster'
import SalesGraph from './SalesGraph';

const Dashboard = () => {
    const [mastersOpen, setMastersOpen] = useState(false)
    const [totalItems, setTotalItems] = useState(0)

    const dashboard = [
        { head: 'Shortage Qty', amount: '#0', text: 'Items need to import', img: shortage_qty },
        { head: 'Items Qty', amount: `#${totalItems}`, text: 'No of items in stock', img: item_qty },
        { head: 'Sales Today', amount: 'Rs 0.00', text: 'Amount of pos sales', img: sales },
        { head: 'Sales Qty', amount: '#209', text: 'No of pos sales', img: sales_qty },
    ]

    useEffect(() => {
        const fetchItems = async () => {
            try {
                const response = await fetch("https://api.zthree.in/bizsura/Products?action=showProducts", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": "Bearer your_secret_api_key"
                    }
                })
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const data = await response.json()
                console.log("API Response:", data)

                setTotalItems(data.total_records || 0)
            } catch (error) {
                console.log("Error fetching the item", error)
            }
        }

        fetchItems()
    }, [])

    return (
        <div>
            <div className='flex items-center justify-center gap-1 py-1 '>
                <div className='flex items-center gap-2 bg-gray-200 p-3 rounded-md hover:bg-white cursor-pointer'>
                    <IoHomeOutline />
                    <p>Dashboard</p>
                </div>
                <div
                    onClick={() => setMastersOpen(!mastersOpen)}
                    className='relative flex items-center gap-2 bg-gray-200 p-3 rounded-md hover:bg-white cursor-pointer'
                >
                    <AiOutlineProduct />
                    <p>Masters</p>
                    <FaAngleDown />

                    {
                        mastersOpen && (
                            <div className='absolute top-16 left-0 border z-10 bg-white border-gray-300 rounded-md w-36'>
                                <ul className='py-1 flex flex-col'>
                                    <Link
                                        to='/itemMaster' 
                                        className='hover:bg-blue-500 hover:text-white  p-2 w-full '
                                    >
                                        Item Master
                                    </Link>
                                    <Link
                                        to='/retailerMaster' 
                                        className='hover:bg-blue-500 hover:text-white  p-2 w-full '
                                    >
                                        Retailer Master
                                    </Link>
                                    {/* <Link
                                        to='/customerMaster'
                                        className='hover:bg-blue-500 hover:text-white p-2'
                                    >
                                        Customer Master
                                    </Link> */}
                                    <Link
                                        to='/beatMaster'
                                        className='hover:bg-blue-500 hover:text-white p-2'
                                    >
                                        Beat Master
                                    </Link>
                                    <li className='hover:bg-blue-500 hover:text-white p-2'>Disributor Master</li>
                                    <li className='hover:bg-blue-500 hover:text-white p-2'>Category Master</li>
                                </ul>
                            </div>
                        )
                    }
                </div>
                <Link
                    to='/transactions'
                    className='flex items-center gap-2 bg-gray-200 p-3 rounded-md hover:bg-white cursor-pointer'>
                    <TbWindowMaximize />
                    <p>Transactions</p>
                </Link>
                <div className='flex items-center gap-2 bg-gray-200 p-3 rounded-md hover:bg-white cursor-pointer'>
                    <TbReport />
                    <p>Reports</p>
                </div>
                <Link
                    to='/login' element={<Login />}
                    className='flex items-center gap-2 bg-gray-200 p-3 rounded-md hover:bg-white cursor-pointer'>
                    <RiShutDownLine />
                    <p>Log out</p>
                </Link>
            </div>

            <hr className="border-t-2 border-gray-300 w-full my-1" />

            <div className='flex items-center gap-2 pl-5 py-3'>
                <IoHomeOutline size={23} />
                <p className='font-semibold text-xl uppercase'>Devarsh & Co</p>
            </div>

            <div className='flex justify-center gap-5 py-2'>
                {
                    dashboard.map((item, index) => (
                        <div key={index} className='flex gap-3 border border-gray-300 rounded-md p-3'>
                            <div>
                                <p className='text-gray-500'>{item.head}</p>
                                <p className='text-4xl text-gray-600 py-2'>{item.amount}</p>
                                <p className='text-sm text-gray-500 pt-2'>{item.text}</p>
                            </div>
                            <div>
                                <img src={item.img} alt="" className='h-28 w-24' />
                            </div>
                        </div>
                    ))
                }
            </div>

            <div className='px-12 py-10'>
                <p className='font-semibold text-xl pb-7'>Sales Overview</p>
                <SalesGraph />
            </div>

            <div className='text-center bg-blue-800 text-white py-2'>
                <p>Copyright &copy; 2025 Devarsh & Co. All rights reserved.</p>
            </div>
        </div>
    )
}

export default Dashboard
