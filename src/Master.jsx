import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { CiGlobe } from "react-icons/ci";
import { FaPlus } from "react-icons/fa6";
import { MdClear } from "react-icons/md";
import { IoHomeOutline } from "react-icons/io5";
import { FaArrowRight } from "react-icons/fa6";
import { BiLinkExternal } from "react-icons/bi";
import NewProfile from './NewProfile';
import Dashboard from './Dashboard';
import Billing from './Billing';
import PartyAdding from './PartyAdding';

const Masters = () => {
    const [selectedProducts, setSelectedProducts] = useState([])
    const [showProfile, setShowProfile] = useState(false)
    const [profiles, setProfiles] = useState([]);
    const [isCredit, setIsCredit] = useState(true);

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

    const handleAddProfile = (newProfile) => {
        setProfiles((prev) => {
            const updatedProfiles = [...prev, newProfile];
            console.log('Profiles:', updatedProfiles);
            return updatedProfiles;
        });
    };

    const handleNewProfile = () => {
        setShowProfile(true)
    }

    const closeProfileModal = () => {
        setShowProfile(false);
    };

    const clearScreen = () => {
        setSelectedProducts([])
    }

    const getTotalQty = () => {
        return selectedProducts.reduce((total, product) => total + Number(product.unit), 0)
    }

    const getTotalGross = () => {
        return selectedProducts.reduce((total, product) => {
            return total + (product.numericPrice * product.unit);
        }, 0).toFixed(2);
    };

    const getTotalDiscount = () => {
        return selectedProducts.reduce((total, product) => {
            const discount = (product.numericPrice * product.unit * parseFloat(product.discount) / 100);
            return total + discount;
        }, 0).toFixed(2);
    };

    const getNetTotal = () => {
        return selectedProducts.reduce((total, product) => {
            const numericPrice = cleanPrice(product.price);
            const discount = parseFloat(product.discount) || 0;
            const discountedPrice = numericPrice - (numericPrice * (discount / 100));
            return total + (discountedPrice * product.unit);
        }, 0).toFixed(2);
    };

    const cleanPrice = (priceString) => {
        return parseFloat(priceString.replace(/[^\d.]/g, '')) || 0;
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
                        <select name="" id="" className='border text-gray-500  w-44 outline-none bg-white border-gray-400 p-1 rounded'>
                            <option value="purchase" className='uppercase text-gray-500 '>PURCHASE</option>
                            <option value="purchase" className='uppercase text-gray-500 '>SALE</option>
                            <option value="purchase-return" className='uppercase text-gray-500'>PURCHASE RETURN</option>
                            <option value="purchase-return" className='uppercase text-gray-500'>SALE RETURN</option>
                        </select>
                    </div>
                    {/* <CiGlobe className='text-xl' />
                    <p className='uppercase font-semibold'>devarsh & co</p> */}
                </div>
                <div className='flex gap-3 '>
                    {/* <div
                        onClick={clearScreen}
                        className='inline-flex items-center text-white bg-red-600 rounded gap-1 py-1 px-2 cursor-pointer text-sm hover:bg-red-700'>
                        <MdClear />
                        <p className='capitalize'>clear screen</p>
                    </div> */}
                    <Link to="/dashboard">
                        <button className=' bg-green-400 rounded gap-1 h-8 w-8 flex items-center justify-center  cursor-pointer hover:bg-green-500' size={10}>
                            <IoHomeOutline />
                        </button>
                    </Link>
                    <button
                        onClick={handleFullScreen}
                        className=' bg-yellow-400 rounded gap-1 py-1 px-2 cursor-pointer text-md hover:bg-yellow-500'
                    >
                        <BiLinkExternal />
                    </button>
                </div>
            </div>

            {/* <NewProfile
                showProfile={showProfile}
                onClose={closeProfileModal}
                addProfile={handleAddProfile}
            /> */}

            <PartyAdding />

            <Billing
                selectedProducts={selectedProducts}
                setSelectedProducts={setSelectedProducts}
                profiles={profiles}
            />

            {/* <div className='grid grid-cols-6 fixed bottom-0 w-full right-0 text-white'>
                <Link
                    to='/dashboard' element={<Dashboard />}
                    className='flex items-center justify-center gap-3 py-6 bg-green-500 hover:bg-green-600'
                >
                    <IoHomeOutline />
                    <button className='uppercase '>home</button>
                </Link>
                <div className='grid grid-rows-2 place-items-center bg-blue-900 border-r border-r-indigo-400'>
                    <p className='uppercase'>total qty</p>
                    <p># {getTotalQty()}</p>
                </div>
                <div className='grid grid-rows-2  place-items-center bg-blue-900 border-r border-r-indigo-400'>
                    <p className='uppercase'>total gross</p>
                    <p>RS {getTotalGross()}</p>
                </div>
                <div className='grid grid-rows-2  place-items-center bg-blue-900 border-r border-r-indigo-400'>
                    <p className='uppercase'>total disc</p>
                    <p>RS {getTotalDiscount()}</p>
                </div>
                <div className='grid grid-rows-2  place-items-center bg-blue-900 border-r border-r-indigo-400'>
                    <p className='uppercase'>net total</p>
                    <p>RS {getNetTotal()}</p>
                </div>

                {selectedProducts.length > 0 ? (
                    <Link
                        to='/payment'
                        state={{ netTotal: getNetTotal(), selectedProducts }}
                        className="flex items-center justify-center gap-3 px-4 py-2 uppercase text-white bg-green-500 hover:bg-green-600 rounded-md"
                    >
                        <FaArrowRight /> Next
                    </Link>
                ) : (
                    <button
                        disabled
                        className="flex items-center justify-center gap-3 px-4 py-2 uppercase cursor-not-allowed text-gray-500 bg-green-400 rounded-md"
                    >
                        <FaArrowRight /> Next
                    </button>
                )}
            </div> */}
        </div>
    )
}

export default Masters
