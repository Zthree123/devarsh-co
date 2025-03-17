import React, { useState, useMemo, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { PiMoney } from "react-icons/pi";
import { MdOutlineClose } from "react-icons/md";
import { IoIosKeypad } from "react-icons/io";
import { TbClockDollar } from "react-icons/tb";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { PiCurrencyInrBold } from "react-icons/pi";
import Masters from './Master';

const Payment = ({selectedProducts, setSelectedProducts}) => {
    const navigate = useNavigate()
    const location = useLocation();
    const netTotal = location.state?.netTotal || "0.00";
    const [paymentMethod, setPaymentMethod] = useState("cash");
    const [tenderedCash, setTenderedCash] = useState('')
    const [totalCash, setTotalCash] = useState(0);
    const [cardType, setCardType] = useState("");
    const [accountNumber, setAccountNumber] = useState("");
    const [cardPaid, setCardPaid] = useState(false)
    const [message, setMessage] = useState('')
    const selectedItems = useMemo(() => location.state?.selectedProducts || [], [location.state, selectedProducts]);

    const handleAddCash = () => {
        const tenderedAmount = parseFloat(tenderedCash);
        if (!isNaN(tenderedAmount) && tenderedAmount > 0) {
            setTotalCash(prevTotal => prevTotal + tenderedAmount);
            setTenderedCash("");
            setCardPaid(true)
        }
    };

    const handleCardPayment = () => {
        if (!cardType) {
            setMessage("Select Card Type.");

            setTimeout(() => {
                setMessage("");
            }, 3000);
            return;
        }
        if (accountNumber.length !== 4) {
            setMessage("Enter account Number.");

            setTimeout(() => {
                setMessage("");
            }, 3000);
            return;
        }
        if (cardPaid) return;
        const tenderedAmount = parseFloat(tenderedCash);
        if (!isNaN(tenderedAmount) && tenderedAmount > 0) {
            setTotalCash(prevTotal => prevTotal + tenderedAmount);
            setTenderedCash("");
            setCardPaid(true)
        }
        // setMessage("Payment Successful!");

        // setTimeout(() => {
        //     setMessage("");
        // }, 3000);
    };


    const handleClose = () => {
        localStorage.removeItem("selectedProducts"); 
        setSelectedProducts([]); 
        navigate('/', { state: { selectedProducts: [] } }); 
    };
    
       
    const handleKeypad = (value) => {
        if (value === "Del") {
            setTenderedCash((prev) => prev.slice(0, -1));
        } else {
            setTenderedCash((prev) => prev + value);
        }
    };


    const handleExactAmount = () => {
        setTenderedCash(netTotal.toString())
    }
    
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
            <div className='flex justify-between items-center bg-gray-200 p-3'>
                <div className='flex items-center gap-2'>
                    <PiMoney className='text-2xl text-red-600' />
                    <p className='font-medium'>For Customer Walk in</p>
                    
                </div>
                <MdOutlineClose
                    onClick={handleClose}
                    className='text-2xl text-gray-400'
                />
                
            </div>
             
            <div className='flex items-center justify-center py-3 gap-3'>
                {[
                    { label: "Cash", icon: <PiCurrencyInrBold />, value: "cash" },
                    { label: "Card", icon: <IoIosKeypad />, value: "card" },
                    { label: "PayLater", icon: <TbClockDollar />, value: "paylater" }
                ].map(({ label, icon, value }) => (
                    <div
                        key={value}
                        className={`border border-gray-400 w-28 rounded-md shadow-xl p-2 flex flex-col items-center ${paymentMethod === value ? "bg-violet-700" : "bg-violet-500"} text-white cursor-pointer`}
                        onClick={() => setPaymentMethod(value)}
                    >
                        <div className='text-6xl pb-1'>{icon}</div>
                        <div className='flex gap-1 bg-white text-black rounded py-1 px-2'>
                            <input type="radio" checked={paymentMethod === value} readOnly />
                            <p>{label}</p>
                        </div>
                    </div>
                ))}
            </div>
            <div className='border-1 border-dotted h-fit border-gray-400 flex justify-between gap-10 mx-5 py-3 px-5 rounded-md shadow-xl'>
                <div className=''>
                    <div className='py-2'>
                        <p className='text-2xl'>(Rs) Amount Due</p>
                        <p className='text-5xl text-red-700'>{netTotal}</p>
                    </div>
                    <div className='py-2'>
                        <p className='text-2xl'>(Rs)Tendered</p>
                        <p className='text-5xl text-green-800'>{tenderedCash || "0.00"}</p>
                    </div>
                    <div className='py-2'>
                        <p className='text-2xl'>(Rs) Change</p>
                        <p className='text-5xl'>0.00</p>
                    </div>
                    <div className='py-2'>
                        <p className='text-2xl'>(Rs) Round Off</p>
                        <p className='text-5xl'>0.00</p>
                    </div>
                </div>
                <div className=''>
                    <div className='flex items-center text-2xl gap-2 pb-1'>
                        <IoIosKeypad />
                        <p>Key Pad</p>
                    </div>
                    <div>
                        <div className='grid grid-cols-3 gap-2 py-2 '>
                            {[1, 2, 3, 4, 5, 6, 7, 8, 9, '.', 0, 'Del'].map((num, index) => (
                                <button
                                    key={index}
                                    onClick={() => handleKeypad(num.toString())}
                                    className='px-8 py-4 bg-violet-800 text-white rounded-md text-xl'
                                >
                                    {num}
                                </button>
                            ))}
                        </div>
                        <div
                            onClick={handleExactAmount}
                            className='flex gap-1 pb-3'>
                            <button className='bg-violet-800 px-10 py-5 rounded-md text-white text-xl w-full'><span></span>Exact</button>
                        </div>
                    </div>
                </div>
                {paymentMethod === "cash" && (
                    <div className='flex flex-col justify-between '>
                        <div className='flex items-center text-2xl gap-2 '>
                            <PiMoney className='text-red-600' />
                            <p>Add Tendered Cash</p>
                        </div>
                        <div
                            onClick={handleAddCash}
                            className='flex items-center gap-2 bg-yellow-300 p-5 w-96 justify-center rounded-md'
                        >
                            <PiMoney className='text-2xl' />
                            <p className='text-2xl'>Add Cash</p>
                        </div>
                    </div>
                )}

                {paymentMethod === "card" && (
                    <div className='flex flex-col '>
                        <div className='flex items-center text-2xl gap-2 pb-3'>
                            <PiMoney className='text-red-600' />
                            <p>Enter Card Details</p>
                        </div>
                        <div className='flex flex-col gap-2'>
                            <div className='flex flex-col py-2'>
                                <label htmlFor="" className='capitalize pb-3'>card type</label>
                                <select
                                    value={cardType}
                                    onChange={(e) => setCardType(e.target.value)}
                                    id="cardType"
                                    className='border w-96 px-2 border-gray-400 outline-none rounded py-2 bg-white'
                                >
                                    <option value="">Select Card Type</option>
                                    <option value="mastercard">MasterCard</option>
                                    <option value="debit">Debit Card</option>
                                    <option value="credit">Credit Card</option>
                                </select>
                                {message && (
                                    <div className="bg-green-500 fixed top-10 right-12  text-white px-4  text-center py-3 rounded-md shadow-md">
                                        {message}
                                    </div>
                                )}
                            </div>
                            <div className='flex flex-col py-2 pb-20'>
                                <label htmlFor="" className='capitalize pb-3'> account number (last 4 digits)</label>
                                <input type="text"
                                    value={accountNumber}
                                    onChange={(e) => {
                                        const value = e.target.value;
                                        if (/^\d{0,4}$/.test(value)) {
                                            setAccountNumber(value);
                                        }
                                    }}
                                    className='border w-96 px-2 border-gray-400 outline-none rounded py-2' placeholder='e.g 3217'
                                />
                                {message && (
                                    <div className="bg-green-500 fixed top-10 right-12  text-white px-4  text-center py-3 rounded-md shadow-md">
                                        {message}
                                    </div>
                                )}
                            </div>
                            <div
                                onClick={handleCardPayment}
                                className='flex items-center gap-2 bg-yellow-300 p-5 justify-center rounded-md'>
                                <PiMoney className='text-2xl' />
                                <p className='text-2xl'>Add Card Payment</p>
                                {/* {message && (
                                    <div className="bg-green-500 fixed top-10 right-12  text-white px-4  text-center py-3 rounded-md shadow-md">
                                        {message}
                                    </div>
                                )} */}
                            </div>
                        </div>
                    </div>
                )}

                {paymentMethod === "paylater" && <div className="w-96"></div>}

                <div className='flex flex-col justify-between'>
                    <div>
                        <div className='flex items-center text-2xl gap-2 pb-3'>
                            <PiMoney className='text-red-600' />
                            <p>Payment </p>
                        </div>
                        <div className='flex gap-2  bg-green-600 text-white'>
                            <p className='border-r border-white py-1 px-3 pr-12'>Total</p>
                            <p className='py-1 px-3 '>Rs.<span className='font-medium pr-20'>{totalCash || "0.00"}</span></p>
                        </div>
                    </div>
                    <Link
                        to='/masters' element={<Masters/>}
                        className='flex items-center gap-2 bg-violet-800 text-white cursor-pointer p-5 justify-center rounded-md'
                    >
                        <IoMdCheckmarkCircleOutline className='text-2xl' />
                        <p className='text-2xl'>Done</p>
                    </Link>
                </div>
            </div>

        </div >
    )
}

export default Payment
