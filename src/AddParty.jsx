import React, { useState } from 'react';
import { IoMdClose } from "react-icons/io";

const AddParty = ({ setIsOpen, setRetailer, fetchRetailer }) => {
    const [error, setError] = useState("")

    const [party, setParty] = useState({
        partyName: "",
        gstIn: "",
        mobileNumber: "",
        gstType: "Unregistered/Consumer",
        state: "",
        email: "",
        billingAddress: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === "mobileNumber") {
            if (!/^\d*$/.test(value)) return;
            if (value.length > 10) return;
        }

        if (name === "gstIn") {
            if (!/^[0-9A-Z]{0,15}$/.test(value)) return;
            if (value.length > 15) return;
        }

        setParty((prev) => {
            const updated = { ...prev, [name]: value }

            if (name === "gstIn") {
                updated.gstType = value.length === 15 ? "Registered Business - Regular" : "Unregistered/Consumer"
            }

            return updated
        });
    };

    const handleSave = async () => {
        setError("")

        if (!party.partyName || !party.mobileNumber) {
            setError("Please fill the required fields.");
            return;
        }

        if (party.mobileNumber.length !== 10) {
            setError("Phone number must be exactly 10 digits.");
            return;
        }

        if (party.gstIn && party.gstIn.length !== 15) {
            setError("GSTIN must be exactly 15 digits.");
            return;
        }

        if (party.gstIn.length === 15) {
            party.gstType = "Registered Business - Regular";
        }

        try {
            const response = await fetch("https://api.zthree.in/bizsura/Party", {
                method: "POST",
                headers: {
                    "Authorization": "Bearer your_secret_api_key",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    action: "addParty",
                    partyName: party.partyName,
                    gstNo: party.gstIn,
                    MobileNumber: party.mobileNumber,
                    fullAddress: party.billingAddress,
                    city: "",
                    state: party.state,
                    vendorId: "001"
                })
            })

            const data = await response.json()

            if (data.status === "success") {
                setIsOpen(false)
                fetchRetailer()
            } else {
                console.log(data?.message || "Failed to add retailer.");
            }
        } catch (error) {
            console.log("Error adding retailer", error)
        }
    };

    return (
        <div>
            <div className='flex items-center justify-between px-10 py-5'>
                <p className='text-2xl font-semibold'>Add Retailer</p>
                <IoMdClose
                    onClick={() => setIsOpen(false)}
                    size={40}
                    className='hover:bg-gray-300 rounded-full p-2 cursor-pointer'
                />
            </div>

            <hr className='py-6 text-gray-300' />

            <div className="flex flex-col gap-10 px-10 pb-10">
                <div className="flex gap-10">
                    <div className="relative w-72">
                        <input
                            type="text"
                            name="partyName"
                            value={party.partyName}
                            onChange={handleChange}
                            className="border border-gray-400 outline-none rounded-md p-2 w-full focus:border-blue-700"
                        />
                        <label className={`absolute left-3 transition-all duration-200 ${party.partyName ? "text-xs -top-2 bg-white px-1 text-blue-600" : "text-gray-400 top-2"}`}>
                            Party Name *
                        </label>
                    </div>

                    <div className="relative w-72">
                        <input
                            type="text"
                            name="gstIn"
                            value={party.gstIn}
                            onChange={handleChange}
                            className="border border-gray-400 outline-none rounded-md p-2 w-full focus:border-blue-700"
                        />
                        <label className={`absolute left-3 transition-all duration-200 ${party.gstIn ? "text-xs -top-2 bg-white px-1 text-blue-600" : "text-gray-400 top-2"}`}>
                            GSTIN
                        </label>
                    </div>

                    <div className="relative w-72">
                        <input
                            type="text"
                            name="mobileNumber"
                            value={party.mobileNumber}
                            onChange={handleChange}
                            className="border border-gray-400 outline-none rounded-md p-2 w-full focus:border-blue-700"
                        />
                        <label className={`absolute left-3 transition-all duration-200 ${party.mobileNumber ? "text-xs -top-2 bg-white px-1 text-blue-600" : "text-gray-400 top-2"}`}>
                            Phone Number *
                        </label>
                    </div>
                </div>
            </div>

            <div className="flex px-10">
                <div className="gap-10">
                    <div className="relative w-72 pb-8">
                        <select
                            name="gstType"
                            value={party.gstType}
                            onChange={handleChange}
                            className="border border-gray-400 outline-none rounded-md p-2 w-full focus:border-blue-700"
                        >
                            <option value="Unregistered/Consumer">Unregistered/Consumer</option>
                            <option value="Registered Business - Regular">Registered Business - Regular</option>
                        </select>
                        <label className="absolute left-3 text-xs -top-2 bg-white px-1 text-blue-600 transition-all duration-200">
                            GST Type
                        </label>
                    </div>

                    <div className="relative w-72 pb-8">
                        <input
                            type="text"
                            name="state"
                            value={party.state}
                            onChange={handleChange}
                            className="border border-gray-400 outline-none rounded-md p-2 w-full focus:border-blue-700"
                        />
                        <label className={`absolute left-3 transition-all duration-200 ${party.state ? "text-xs -top-2 bg-white px-1 text-blue-600" : "text-gray-400 top-2"}`}>
                            State
                        </label>
                    </div>

                    <div className="relative w-72">
                        <input
                            type="email"
                            name="email"
                            value={party.email}
                            onChange={handleChange}
                            className="border border-gray-400 outline-none rounded-md p-2 w-full focus:border-blue-700"
                        />
                        <label className={`absolute left-3 transition-all duration-200 ${party.email ? "text-xs -top-2 bg-white px-1 text-blue-600" : "text-gray-400 top-2"}`}>
                            Email ID
                        </label>
                    </div>
                </div>

                <div className='border-r-2 border-gray-200 ml-18'></div>

                <div className='pl-10 '>
                    <textarea
                        name="billingAddress"
                        value={party.billingAddress}
                        onChange={handleChange}
                        placeholder='Billing Address'
                        className='border border-gray-400 rounded-md w-60 outline-none px-2 h-20 leading-[2rem]'
                    ></textarea>
                </div>
            </div>

            <div className='text-center text-sm text-red-600 py-8'>
                {error && <p>{error}</p>}
            </div>

            <div className='flex justify-end pr-16 pb-5'>
                <button onClick={handleSave} className='bg-red-600 text-white px-5 py-2 rounded-md'>Save</button>
            </div>
        </div>
    );
}

export default AddParty;
