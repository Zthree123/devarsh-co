import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { IoHomeOutline } from "react-icons/io5";
import { BiLinkExternal } from "react-icons/bi";
import Dashboard from './Dashboard';
import PartyAdding from './PartyAdding';
import BillingReturn from './BillingReturn';

const PurchaseReturn = () => {
    const [isCredit, setIsCredit] = useState(true);
    const [subTotalQty, setSubTotalQty] = useState(0);
    const [totalQty, setTotalQty] = useState(0);
    const [discAmount, setDiscAmount] = useState(0);
    const [totalAmount, setTotalAmount] = useState(0);
    const [itemNames, setItemNames] = useState([]);
    const location = useLocation();  
    const navigate = useNavigate();  

    const [selectedOption, setSelectedOption] = useState("sale"); 

    useEffect(() => {
        const path = location.pathname.replace("/", ""); 
        setSelectedOption(path || "sale"); 
    }, [location.pathname]); 

    const handleChange = (event) => {
        const value = event.target.value;
        setSelectedOption(value);
        navigate(`/${value}`);
    };

    const togglePaymentMode = () => {
        setIsCredit(!isCredit);
    };

    const handleFullScreen = () => {
        if (document.documentElement.requestFullscreen) {
            document.documentElement.requestFullscreen();
        } else if (document.documentElement.mozRequestFullScreen) {
            document.documentElement.mozRequestFullScreen();
        } else if (document.documentElement.webkitRequestFullscreen) {
            document.documentElement.webkitRequestFullscreen();
        } else if (document.documentElement.msRequestFullscreen) {
            document.documentElement.msRequestFullscreen();
        }
    };

    useEffect(() => {
        const savedProducts = localStorage.getItem('selectedProducts');
        if (savedProducts) {
            const parsedProducts = JSON.parse(savedProducts);
            if (parsedProducts.length > 0) {
                setSelectedProducts(parsedProducts);
            }
        }
    }, []);

    useEffect(() => {
        console.log("Updated values:", { subTotalQty, totalQty, itemNames, totalAmount });
    }, [subTotalQty, totalQty, itemNames, totalAmount]);

    return (
        <div>
            <div className='flex justify-between px-5 py-3 bg-gray-200'>
                <div className='inline-flex items-center gap-5'>
                    <div className="flex items-center space-x-3">
                        <span className={!isCredit ? "text-blue-600 font-semibold" : "text-gray-500"}>
                            Cash
                        </span>
                        <button
                            onClick={togglePaymentMode}
                            className={`w-12 h-6 flex items-center rounded-full p-1 transition-all 
                              ${isCredit ? "bg-blue-200" : "bg-blue-200"}`}
                        >
                            <div
                                className={`w-4 h-4 bg-blue-600 rounded-full shadow-md transform transition-all 
                                 ${isCredit ? "translate-x-6" : "translate-x-0"}`}
                            />
                        </button>
                        <span className={isCredit ? "text-blue-600 font-semibold" : "text-gray-500"}>
                            Credit
                        </span>
                    </div>

                    <div className='inline-flex items-center'>
                        <select value={selectedOption} onChange={handleChange} className='border text-gray-500  w-44 outline-none bg-white border-gray-400 p-1 rounded'>
                            <option value="sale" className='uppercase text-gray-500'>SALE</option>
                            <option value="purchase" className='uppercase text-gray-500'>PURCHASE</option>
                            <option value="purchase-return" className='uppercase text-gray-500'>PURCHASE RETURN</option>
                            <option value="sale-return" className='uppercase text-gray-500'>SALE RETURN</option>
                        </select>
                    </div>
                </div>

                <div className='flex gap-3'>
                    <button
                        onClick={handleFullScreen}
                        className='bg-yellow-400 rounded gap-1 py-1 px-2 cursor-pointer text-md hover:bg-yellow-500'
                    >
                        <BiLinkExternal />
                    </button>
                </div>
            </div>

            <div className="min-h-screen flex flex-col">
                <div className="flex-grow">
                    <PartyAdding />
                    <BillingReturn
                        setSubTotalQty={setSubTotalQty}
                        setTotalQty={setTotalQty}
                        setDiscAmount={setDiscAmount}
                        setTotalAmount={setTotalAmount}
                        setItemNames={setItemNames}
                    />
                </div>

                <div className='grid grid-cols-5 sticky bottom-0 w-full text-white bg-blue-900'>
                    <Link
                        to='/dashboard' element={<Dashboard />}
                        className='flex items-center justify-center gap-3 py-6 bg-green-500 hover:bg-green-600'
                    >
                        <IoHomeOutline />
                        <button className='uppercase '>home</button>
                    </Link>
                    <div className='grid grid-rows-2 place-items-center bg-blue-900 border-r border-r-indigo-400'>
                        <p className='uppercase'>total qty</p>
                        <p># {subTotalQty}</p>
                    </div>
                    <div className='grid grid-rows-2 place-items-center bg-blue-900 border-r border-r-indigo-400'>
                        <p className='uppercase'>total disc</p>
                        <p>RS {discAmount}</p>
                    </div>
                    <div className='grid grid-rows-2 place-items-center bg-blue-900 border-r border-r-indigo-400'>
                        <p className='uppercase'>net total</p>
                        <p>RS  {totalAmount}</p>
                    </div>
                    <Link
                        to='/bill'
                        state={{ subTotalQty, totalQty, itemNames, totalAmount }}
                        className='flex items-center justify-center gap-3 py-6 bg-green-500 hover:bg-green-600'
                    >
                        <button className='uppercase '>next</button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default PurchaseReturn
