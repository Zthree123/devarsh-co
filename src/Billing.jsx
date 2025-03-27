import React, { useState, useEffect } from 'react'

const Billing = () => {
    const [products, setProducts] = useState([]);
    const [selectedProducts, setSelectedProducts] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedPriceType, setSelectedPriceType] = useState("withoutTax")

    const filteredProducts = products.filter((product) =>
        product.name?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    useEffect(() => {
        fetch("https://api.zthree.in/bizsura/Products?action=showProducts", {
            headers: {
                "Authorization": "Bearer your_secret_api_key"
            }
        })
            .then((res) => res.json())
            .then((data) => {
                console.log("Fetched products:", data);
                setProducts(data.results)
            })
            .catch((err) => console.error("Error fetching products:", err));
    }, []);

    const addProduct = (product) => {
        setSelectedProducts((prevProducts) => {
            const existingProduct = prevProducts.find((p) => p.id === product.id);
            if (existingProduct) {
                return prevProducts.map((p) =>
                    p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p
                );
            } else {
                return [...prevProducts, { ...product, quantity: 1, discount: 0 }];
            }
        });
        setSearchQuery("");
    };


    const updateQuantity = (index, amount) => {
        setSelectedProducts((prevProducts) => {
            return prevProducts.map((p, i) =>
                i === index ? { ...p, quantity: Math.max(1, p.quantity + amount) } : p
            );
        });
    };

    const removeProduct = (index) => {
        setSelectedProducts(selectedProducts.filter((_, i) => i !== index));
    };

    return (
        <div>
            <div className='flex justify-between w-full gap-2 '>
                <div className='px-5 pt-6 w-full '>
                    <input
                        type="text"
                        className='outline-none w-full border border-gray-400 rounded px-1 py-2'
                        placeholder='SEARCH ITEMS'
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />

                    {searchQuery && filteredProducts.length > 0 && (
                        <div className="border border-gray-300 rounded mt-2 bg-white absolute z-10 w-60 shadow-md">
                            {filteredProducts.map((product) => (
                                <div
                                    key={product.id}
                                    className="p-2 cursor-pointer hover:bg-gray-100"
                                    onClick={() => addProduct(product)}
                                >
                                    {product.name}
                                </div>
                            ))}
                        </div>
                    )}

                    <div className='overflow-x-auto pb-16'>
                        <table className='w-full border border-gray-300  mt-4 px-3 '>
                            <thead className='p-1 bg-blue-900 text-white'>
                                <tr>
                                    <th className='border-r border-gray-300 py-1 w-1/10'>ITEM</th>
                                    <th className='border-r border-gray-300 py-1 w-1/10'>BATCH NO</th>
                                    <th className='border-r border-gray-300 py-1 w-1/10'>EXPIRY</th>
                                    <th className='border-r border-gray-300 py-1 w-1/10'>MRP</th>
                                    <th className='border-r border-gray-300 py-1 w-1/10'>QTY</th>
                                    <th className='border-r border-gray-300 py-1 w-1/10'> PRICE (RS)
                                       
                                    </th>
                                    <th className='border-r border-gray-300 py-1 w-1/10' colSpan={2}>DISCOUNT</th>
                                    <th className='border-r border-gray-300 py-1 w-1/10' colSpan={2}>TAX</th>
                                    <th className='border-r border-gray-300 py-1 w-1/10'>AMOUNT</th>
                                    <th>REMOVE</th>
                                </tr>
                                <tr>
                                    <th className='border-r border-gray-300 py-1 w-1/10'></th>
                                    <th className='border-r border-gray-300 py-1 w-1/10'></th>
                                    <th className='border-r border-gray-300 py-1 w-1/10'></th>
                                    <th className='border-r border-gray-300 py-1 w-1/10'></th>
                                    <th className='border-r border-gray-300 py-1 w-1/10'></th>
                                    <th className='border border-gray-300 py-1 w-1/10 bg-white'>
                                    <select
                                            className='rounded w-32 outline-none bg-white text-black'
                                            value={selectedPriceType}
                                            onChange={(e) => setSelectedPriceType(e.target.value)}
                                        >
                                            <option value="withoutTax">Without Tax</option>
                                            <option value="withTax">With Tax</option>
                                        </select>
                                    </th>

                                    {/* Two separate discount sub-columns */}
                                    <th className='border border-gray-300 py-1 w-1/10'>%</th>
                                    <th className='border border-gray-300 py-1 w-1/10'>AMOUNT</th>

                                    <th className='border border-gray-300 py-1 w-1/10'>%</th>
                                    <th className='border border-gray-300 py-1 w-1/10'>AMOUNT</th>

                                    <th className='border-r border-gray-300 py-1 w-1/10'></th>    
                                    <th className='border-r border-gray-300 py-1 w-1/10'></th>    
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    selectedProducts.length > 0 ? (
                                        selectedProducts.map((product, index) => (
                                            <tr key={product.id} className='bg-white text-gray-700'>
                                                <td className="border border-gray-300 p-2">{product.name}</td>
                                                <td className="p-2 flex items-center justify-center">
                                                    <button
                                                        onClick={() => updateQuantity(index, 1)}
                                                        className="px-2 py-1 bg-green-500 rounded-sm cursor-pointer text-white"
                                                    >
                                                        +
                                                    </button>
                                                    <span className="px-2">{product.quantity}</span>
                                                    <button
                                                        onClick={() => updateQuantity(index, -1)}
                                                        className="px-2 py-1 bg-red-500 rounded-sm cursor-pointer text-white"
                                                    >
                                                        -
                                                    </button>
                                                </td>
                                                <td className="border border-gray-300 p-2">{product.expiry || ""}</td>
                                                <td className="border border-gray-300 p-2">{product.price_mrp || ""}</td>
                                                <td className="border border-gray-300 p-2">{product.qty || ""}</td>
                                                <td className="border border-gray-300 p-2 text-center">
                                                    {selectedPriceType === "withTax" ? product.price_nett_ptr : product.price_ptr}
                                                </td>
                                                <td className="p-2 flex items-center justify-center">
                                                    <input
                                                        type="text"
                                                        min="0"
                                                        max="100"
                                                        value={product.discount}
                                                        className='w-16 px-2 py-1 outline-none rounded border border-gray-300'
                                                        onChange={(e) => {
                                                            const newDiscount = parseFloat(e.target.value) || 0;
                                                            setSelectedProducts(prevProducts =>
                                                                prevProducts.map((p, i) =>
                                                                    i === index ? { ...p, discount: newDiscount } : p
                                                                )
                                                            );
                                                        }}
                                                    />
                                                </td>
                                                <td></td>
                                                <td>{product.gstRate}</td>
                                                <td></td>
                                                <td className="border border-gray-300 p-2">
                                                    {(
                                                        (parseFloat(product.selectedPriceType === "withTax" ? product.price_nett_ptr : product.price_ptr)
                                                            * product.quantity * (1 - product.discount / 100)
                                                        ).toFixed(2))}
                                                </td>

                                                <td className="border border-gray-300 p-2">
                                                    <button
                                                        onClick={() => removeProduct(index)}
                                                        className="bg-red-500 rounded-sm text-white px-2 py-1 cursor-pointer"
                                                    >
                                                        Remove
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="9" className="text-center p-4 text-gray-500">No items found</td>
                                        </tr>
                                    )
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <div className='flex items-center justify-end gap-5 px-5'>
                <label htmlFor="">Total:</label>
                <input
                    type="text"
                    className='w-56 h-10 px-2 outline-none border-b border-gray-300 font-semibold'
                    value={selectedProducts.reduce((total, product) => {
                        const subtotal = (parseFloat(
                            product.selectedPriceType === "withTax" ? product.price_nett_ptr : product.price_ptr
                        ) || 0) * product.quantity * (1 - product.discount / 100);

                        return total + subtotal;
                    }, 0).toFixed(2)}
                    readOnly
                />
            </div>
        </div>
    )
}

export default Billing
