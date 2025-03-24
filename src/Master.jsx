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

const Masters = () => {
    const [selectedProducts, setSelectedProducts] = useState([])
    const [showProfile, setShowProfile] = useState(false)
    const [profiles, setProfiles] = useState([]);

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
            <div className='flex justify-between px-3 py-3 bg-gray-200'>
                <div className='inline-flex items-center gap-1'>
                    <CiGlobe className='text-xl' />
                    <p className='uppercase font-semibold'>devarsh & co</p>
                </div>
                <div className='flex gap-1 '>
                    <div className='inline-flex items-center'>
                        <select name="" id="" className='border text-gray-500  w-44 outline-none bg-white border-gray-400 p-1 rounded'>
                            <option value="purchase" className='uppercase text-gray-500 '>PURCHASE</option>
                            <option value="purchase-return" className='uppercase text-gray-500'>PURCHASE RETURN</option>
                        </select>
                    </div>
                    <div
                        onClick={handleNewProfile}
                        className='inline-flex items-center text-white bg-green-600 rounded gap-1 py-1 px-2 cursor-pointer text-sm hover:bg-green-700'>
                        <FaPlus />
                        <p className='capitalize'>new profile</p>
                    </div >
                    <div
                        onClick={clearScreen}
                        className='inline-flex items-center text-white bg-red-600 rounded gap-1 py-1 px-2 cursor-pointer text-sm hover:bg-red-700'>
                        <MdClear />
                        <p className='capitalize'>clear screen</p>
                    </div>
                    <button
                        onClick={handleFullScreen}
                        className='inline-flex items-center bg-yellow-400 rounded gap-1 py-1 px-2 cursor-pointer text-sm hover:bg-yellow-500'
                    >
                        <BiLinkExternal />
                    </button>
                </div>
            </div>

            <NewProfile
                showProfile={showProfile}
                onClose={closeProfileModal}
                addProfile={handleAddProfile}
            />

            <Billing
                selectedProducts={selectedProducts}
                setSelectedProducts={setSelectedProducts}
                profiles={profiles}
            />

            <div className='grid grid-cols-6 fixed bottom-0 w-full right-0 text-white'>
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
                <div
                    className={`flex items-center justify-center gap-3 px-4 py-2 cursor-pointer
                 ${selectedProducts.length > 0 ? 'bg-green-500 hover:bg-green-600' : 'bg-green-400'}`}
                >
                    {selectedProducts.length > 0 ? (
                        <Link to='/payment' state={{ netTotal: getNetTotal(), selectedProducts }} className='uppercase text-white flex items-center gap-2'>
                            <FaArrowRight /> Next
                        </Link>
                    ) : (
                        <button disabled className='uppercase cursor-not-allowed text-gray-500 flex items-center gap-2'>
                            <FaArrowRight /> Next
                        </button>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Masters
