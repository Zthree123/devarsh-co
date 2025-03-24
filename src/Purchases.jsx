import React, {useState} from 'react'
import { CiGlobe } from "react-icons/ci";
import { FaPlus } from "react-icons/fa6";
import { MdClear } from "react-icons/md";
import { BiLinkExternal } from "react-icons/bi";
import ItemsPurchase from './ItemsPurchase';

const Purchases = () => {
    const [selectedProducts, setSelectedProducts] = useState([])
    const [showProfile, setShowProfile] = useState(false)


    const handleNewProfile = () => {
        setShowProfile(true)
    }

    const clearScreen = () => {
        setSelectedProducts([])
    }

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

            <div>
                <ItemsPurchase />
            </div>
        </div>
    )
}

export default Purchases
