import React, { useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid';
import { MdOutlineClose } from "react-icons/md";

const Billing = ({ selectedProducts, setSelectedProducts, profiles }) => {
    const [search, setSearch] = useState('');
    const [showModePopup, setShowModePopup] = useState(false);
    const [productToAdd, setProductToAdd] = useState(null);
    const [searchTerm, setSearchTerm] = useState('')
    const [customUnit, setCustomUnit] = useState(1);
    const [selectedMode, setSelectedMode] = useState('');
    
    const products = [
        {
            id: '1',
            mode: 'Pack',
            item: 'FLAGYL',
            unit: 0,
            price: 'Rs 264.15',
            packPrice: 264.15,
            stripPrice: 66.05,
            numericPrice: 264.15,
            expiry: 'Apr-2024',
            discount: '0',
            subtotal: '252.00',
            generic: 'ANTAMIZOLE',
            batchNo: 'ABC-456',
            sheetSize: '10',
            packSize: '40',
            sgst: '3.00%',
            cgst: '3.00%',
            totalUnits: '80.00'
        },
        {
            id: '2',
            mode: 'Pack',
            item: 'PANADOL',
            unit: 0,
            price: 'Rs 264.15',
            packPrice: 264.15,
            stripPrice: 66.05,
            numericPrice: 264.15,
            expiry: 'Apr-2024',
            discount: '0',
            subtotal: '252.00',
            generic: 'PARACETAMOL',
            batchNo: 'ABC-123',
            sheetSize: '10',
            packSize: '40',
            sgst: '3.00%',
            cgst: '3.00%',
            totalUnits: '40.00'
        },
        {
            id: '3',
            mode: 'Pack',
            item: 'PANADOL',
            unit: 0,
            price: 'Rs 264.15',
            packPrice: 264.15,
            stripPrice: 66.05,
            numericPrice: 264.15,
            expiry: 'Apr-2024',
            discount: '0',
            subtotal: '252.00',
            generic: 'PARACETAMOL',
            batchNo: 'ABC-124',
            sheetSize: '10',
            packSize: '40',
            sgst: '3.00%',
            cgst: '3.00%',
            totalUnits: '40.00'
        },
        {
            id: '4',
            mode: 'Pack',
            item: 'PANADOL',
            unit: 0,
            price: 'Rs 264.15',
            packPrice: 264.15,
            stripPrice: 66.05,
            numericPrice: 264.15,
            expiry: 'Apr-2024',
            discount: '0',
            subtotal: '252.00',
            generic: 'PARACETAMOL',
            batchNo: 'ABC-126',
            sheetSize: '10',
            packSize: '40',
            sgst: '3.00%',
            cgst: '3.00%',
            totalUnits: '40.00'
        }
    ];

    const handleConfirmSelection = () => {
        if (productToAdd && selectedMode) {
            const price = calculatePriceBasedOnMode(productToAdd, selectedMode);

            const newProduct = {
                ...productToAdd,
                uniqueId: `${productToAdd.id}-${uuidv4()}`,
                unit: Number(customUnit),
                mode: selectedMode,
                pnumericPrice: price,
                price: `Rs ${price.toFixed(2)}`,
                subtotal: (price * Number(customUnit)).toFixed(2)
            };

            setSelectedProducts((prev) => [...prev, newProduct]);
            setShowModePopup(false);
            setProductToAdd(null);
            setSearchTerm('');
        }
    };

    const filteredItems = products.filter(item => {
        return item.item.toLowerCase().includes(searchTerm.toLowerCase())
    })

    const handleUnitChange = (e) => {
        let value = e.target.value;
    
        if (value === '' || value < 1) {
            setCustomUnit('');
        } else {
            setCustomUnit(Number(value));
        }
    };
    
    const cleanPrice = (priceString) => {
        return parseFloat(priceString.replace(/[^\d.]/g, '')) || 0;
    };

    const calculatePriceBasedOnMode = (product, mode) => {
        if (mode === 'Pack') {
            return product.packPrice;
        } else if (mode === 'Strip') {
            return product.stripPrice;
        }
        return cleanPrice(product.price);
    };

    const increaseCount = (uniqueId) => {
        console.log(`Increase count clicked for: ${uniqueId}`);
        setSelectedProducts((prev) => {
            return prev.map((product) => {
                if (product.uniqueId === uniqueId) {
                    const newUnit = Number(product.unit) + 1;
                    console.log(`Updating unit to: ${newUnit}`);
                    return {
                        ...product,
                        unit: newUnit,
                        subtotal: calculateSubtotal(product, newUnit)
                    };
                }
                return product;
            });
        });
    };

    const decreaseCount = (uniqueId) => {
        setSelectedProducts((prev) =>
            prev.map((product) =>
                product.uniqueId === uniqueId && Number(product.unit) > 1
                    ? {
                        ...product,
                        unit: Number(product.unit) - 1,
                        subtotal: calculateSubtotal(product, Number(product.unit) - 1)
                    }
                    : product
            )
        );
    };

    const calculateSubtotal = (product, unit) => {
        const discount = parseFloat(product.discount) || 0;
        const numericPrice = cleanPrice(product.price);
        const discountedPrice = numericPrice - (numericPrice * (discount / 100));
        return (discountedPrice * unit).toFixed(2);
    };

    const filteredProfiles = search
        ? profiles.filter((p) => {
            const nameMatch = p.name?.toLowerCase().includes(search.toLowerCase());
            const contactMatch = p.contact?.includes(search);
            return nameMatch || contactMatch;
        })
        : profiles;

    const handleProductSelection = (product) => {
        setProductToAdd(product);
        setShowModePopup(true);
        setSelectedMode('Pack');
        setCustomUnit(1);
    };

    const handleModeChange = (uniqueId, newMode) => {
        setSelectedProducts((prev) =>
            prev.map((product) => {
                if (product.uniqueId === uniqueId) {
                    const newPrice = calculatePriceBasedOnMode(product, newMode);
                    return {
                        ...product,
                        mode: newMode,
                        price: `Rs ${newPrice.toFixed(2)}`,
                        subtotal: (newPrice * product.unit).toFixed(2)
                    };
                }
                return product;
            })
        );
    };

    const handleDiscountChange = (uniqueId, discountValue) => {
        setSelectedProducts((prev) =>
            prev.map((product) => {
                if (product.uniqueId === uniqueId) {
                    const discount = parseFloat(discountValue) || 0;
                    const discountedPrice = product.pnumericPrice - (product.pnumericPrice * discount / 100);
                    const newSubtotal = (discountedPrice * product.unit).toFixed(2);

                    return {
                        ...product,
                        discount: discountValue,
                        subtotal: newSubtotal,
                    };
                }
                return product;
            })
        );
    };

    const removeProduct = (uniqueId, mode) => {
        setSelectedProducts((prev) =>
            prev.filter((product) => product.uniqueId !== uniqueId)
        );
    };

    useEffect(() => {
        localStorage.setItem('selectedProducts', JSON.stringify(selectedProducts));
    }, [selectedProducts]);

    return (
        <div>
            <div className='flex justify-between w-full gap-2 '>
                <div className='px-5 pt-6 w-full '>
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter" && filteredItems.length > 0) {
                                handleProductSelection(filteredItems[0]);
                            }
                        }}
                        className='outline-none w-full border border-gray-400 rounded px-1 py-2'
                        placeholder='SCAN BARCODE OR SEARCH ITEMS'
                    />
                    {showModePopup && (
                        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                            <div
                                className="bg-white p-6 rounded-lg shadow-lg"
                            >
                                <div className="flex justify-end  pb-2">
                                    <MdOutlineClose
                                        onClick={() => setShowModePopup(false)}
                                        className="bg-gray-200 p-1 text-2xl rounded cursor-pointer" />
                                </div>
                                <p
                                    className="text-lg font-semibold mb-4"
                                >
                                    Select Mode for {productToAdd?.item}
                                </p>

                                <div className="flex flex-col  gap-4">
                                    <button
                                        onClick={() => setSelectedMode('Pack')}
                                        className={`p-2 border border-gray-200 rounded ${selectedMode === 'Pack' ? 'bg-blue-500 text-white' : 'bg-gray-100'}`}
                                    >
                                        Pack
                                    </button>
                                    <button
                                        onClick={() => setSelectedMode('Strip')}
                                        className={`p-2 border border-gray-200 rounded ${selectedMode === 'Strip' ? 'bg-blue-500 text-white' : 'bg-gray-100'}`}
                                    >
                                        Strip
                                    </button>

                                    <div>
                                        <p className='text-lg font-semibold mb-4'>QUANTITY</p>
                                        <input
                                            type="number"
                                            value={customUnit}
                                            min="1"
                                            step="1"
                                            onChange={handleUnitChange}
                                            className="border border-gray-400 outline-none rounded p-2 w-full"
                                        />
                                    </div>
                                    <button
                                        onClick={handleConfirmSelection}
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter' || e.key === ' ') handleConfirmSelection();
                                        }}
                                        className="bg-green-500 text-white mx-auto px-3 py-1 rounded cursor-pointer hover:bg-green-600 "
                                    >
                                        OK
                                    </button>

                                </div>
                            </div>
                        </div>
                    )}

                    <div className='overflow-x-auto pb-16'>
                        {searchTerm && (
                            <div className="absolute top-28 left-2 w-60 bg-white border border-gray-300 z-50 max-h-40 overflow-y-auto shadow-lg">
                                {filteredItems.length > 0 ? (
                                    filteredItems.map((product) => (
                                        <div
                                            key={product.id}
                                            className="p-2 hover:bg-blue-100 cursor-pointer flex justify-between items-center"
                                            onClick={() => handleProductSelection(product)}
                                        >
                                            <span className="text-sm">{product.item}</span>
                                            <span className="text-xs text-gray-500">Batch: {product.batchNo}</span>
                                        </div>
                                    ))
                                ) : (
                                    <div className="p-2 text-gray-500">No items found</div>
                                )}
                            </div>
                        )}
                        <table className='w-full p-1 bg-blue-900 text-white mt-4 px-3 '>
                            <thead className=''>
                                <tr>
                                    {/* <th className='border-r border-gray-300'>MODE</th> */}
                                    <th className='border-r border-gray-300 py-1'>ITEM</th>
                                    <th className='border-r border-gray-300 py-1'>UNIT</th>
                                    <th className='border-r border-gray-300 py-1'>PRICE (RS)</th>
                                    <th className='border-r border-gray-300 py-1'>EXPIRY</th>
                                    <th className='border-r border-gray-300 py-1'>DISC (%)</th>
                                    <th className='border-r border-gray-300 py-1'>SUBTOTAL (RS)</th>
                                    <th>REMOVE</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    selectedProducts.map((item) => (
                                        <React.Fragment key={item.uniqueId}>
                                            <tr className='bg-white text-black'>
                                                {/* <td>
                                                    <select
                                                        value={item.mode}
                                                        onChange={(e) => handleModeChange(item.uniqueId, e.target.value)}
                                                        className="border rounded-sm w-6/6 border-gray-300 p-2"
                                                    >
                                                        <option value="Pack">Pack</option>
                                                        <option value="Strip">Strip</option>
                                                    </select>
                                                </td> */}
                                                <td className="border border-gray-300 p-2">{item.item}</td>
                                                <td className=" p-2 flex items-center">
                                                    <button
                                                        onClick={() => increaseCount(item.uniqueId)}
                                                        className="px-2 py-1 bg-green-500 rounded-sm cursor-pointer text-white"
                                                    >
                                                        +
                                                    </button>
                                                    <span className="px-2">{item.unit}</span>
                                                    <button
                                                        onClick={() => decreaseCount(item.uniqueId)}
                                                        className="px-2 py-1 bg-red-500 rounded-sm cursor-pointer text-white"
                                                    >
                                                        -
                                                    </button>
                                                </td>
                                                <td className="border border-gray-300 p-2">{item.price}</td>
                                                <td className="border border-gray-300 p-2">{item.expiry}</td>
                                                <td className=" p-2 flex items-center justify-center">
                                                    <input
                                                        value={item.discount}
                                                        onChange={(e) => handleDiscountChange(item.uniqueId, e.target.value)}
                                                        type="text"
                                                        className='w-16 px-2 py-1 outline-none rounded border border-gray-300' />
                                                </td>
                                                <td className="border border-gray-300 p-2">{item.subtotal}</td>
                                                <td className="border border-gray-300 p-2">
                                                    <button
                                                        onClick={() => removeProduct(item.uniqueId)}
                                                        className="bg-red-500 rounded-sm text-white px-2 py-1 cursor-pointer"
                                                    >
                                                        Remove
                                                    </button>
                                                </td>
                                            </tr>
                                            <tr className="bg-green-600  text-white">
                                                <td colSpan="8" className="p-1 text-sm">
                                                    <span className="font-bold">GENERIC:</span>
                                                    <span className="bg-red-500 text-white px-1 ml-1 rounded">{item.generic}</span>
                                                    &nbsp;|&nbsp; BATCH NO: {item.batchNo}
                                                    &nbsp;|&nbsp; SHEET SIZE: {item.sheetSize}
                                                    &nbsp;|&nbsp; PACK SIZE: {item.packSize}
                                                    &nbsp;|&nbsp; SGST: {item.sgst}
                                                    &nbsp;|&nbsp; CGST: {item.cgst}
                                                    &nbsp;|&nbsp; TOTAL UNITS: {item.totalUnits}
                                                </td>
                                            </tr>
                                        </React.Fragment>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* <div className=' w-1/4 py-2 px-2 pb-20 text-gray-600 font-semibold'>
                    <input
                        type="text"
                        placeholder='Walk in'
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className='outline-none w-full border border-gray-400 rounded p-2 placeholder:text-sm'
                    />

                    <div className="space-y-2 pt-3 ">
                        {
                            search && filteredProfiles.length > 0 ? (
                                filteredProfiles.map((p, index) => (
                                    <div key={index} className="border p-3 rounded shadow">
                                        <p className='font-bold text-sm'><span className='font-semibold'>Name:</span> {p.name}</p>
                                        <p className='font-normal text-sm'><span className='font-semibold'>Contact:</span> {p.contact}</p>
                                        <p className='font-normal text-sm'><span className='font-semibold'>Address:</span> {p.address}</p>
                                    </div>
                                ))
                            ) : search ? (
                                <p className="text-gray-500 text-sm">No profiles found.</p>
                            ) : null}
                    </div>
                </div> */}
            </div>
        </div>
    )
}

export default Billing
