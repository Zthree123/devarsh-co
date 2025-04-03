import React, { useEffect, useState, useRef } from 'react'

const PartyAdding = () => {
    const [retailers, setRetailers] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedRetailer, setSelectedRetailer] = useState(null);
    const [showDropdown, setShowDropdown] = useState(false);
    const dropdownRef = useRef(null);
    const [date, setDate] = useState("")

    useEffect(() => {
        const today = new Date().toISOString().split("T")[0]
        setDate(today)
    }, [])

    useEffect(() => {
        fetch("https://api.zthree.in/bizsura/Party?action=showParties&vendor_id=001", {
            headers: { "Authorization": "Bearer your_secret_api_key" }
        })
            .then((res) => res.json())
            .then((data) => {
                console.log("Full API Response:", data);
                if (Array.isArray(data.results)) {
                    setRetailers(data.results);
                } else {
                    console.error("Unexpected API response:", data);
                }
            })
            .catch((err) => console.error("Error fetching retailers:", err));
    }, []);

    const filteredRetailers = retailers.filter(retailer =>
        retailer.partyName?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const selectRetailer = (retailer) => {
        console.log("Selected Retailer:", retailer);
        setSelectedRetailer(retailer);
        setSearchQuery(retailer.partyName);
        setShowDropdown(false);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setShowDropdown(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div>
            <div className='relative flex justify-between w-full pb-6 pt-10 px-5 gap-4' ref={dropdownRef}>
                <input
                    type="text"
                    placeholder='SEARCH BY NAME'
                    value={searchQuery}
                    onChange={(e) => {
                        setSearchQuery(e.target.value);
                        setShowDropdown(true);
                    }}
                    className='w-60 h-10 px-2 outline-none border border-gray-300 rounded-md text-gray-500'
                />

                {showDropdown && searchQuery && (
                    <div className="absolute left-5 top-24 w-60  bg-white border border-gray-300 rounded-md shadow-md z-20">
                        {filteredRetailers.length > 0 ? (
                            filteredRetailers.map((retailer) => (
                                <div key={retailer.id} className="p-2 cursor-pointer text-gray-500 hover:bg-gray-50"
                                    onClick={() => selectRetailer(retailer)}>
                                    <p className='text-gray-500'>{retailer.partyName}</p>
                                </div>
                            ))
                        ) : (
                            <div className="p-2 text-gray-500">No retailers found</div>
                        )}
                    </div>
                )}

                <div className='flex gap-2 items-center justify-center'>
                    <label htmlFor="" className=' uppercase'>Invoice Number</label>
                    <input
                        type="text"
                        className='w-44 h-10 px-2 outline-none border-b border-gray-300 text-gray-500'
                    />
                </div>
                <div className='flex gap-2 items-center justify-center'>
                    <label htmlFor="" className='uppercase'>Invoice Date</label>
                    <input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className='w-44 h-10 px-2 outline-none border-b border-gray-300 text-gray-500'
                    />
                </div>
                <div className='flex gap-2 items-center justify-center'>
                    <label htmlFor="" className='uppercase'>State of supply</label>
                    <input
                        className='w-44 h-10 px-2 outline-none border-b border-gray-300 text-gray-500'
                        type="text"
                        value={selectedRetailer?.partyState || ""}
                        readOnly
                    />
                </div>
            </div>
        </div>
    )
}

export default PartyAdding
