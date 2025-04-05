import React, { useState, useEffect } from 'react'
import { RiDeleteBinLine } from "react-icons/ri";

const Billing = ({ setSubTotalQty, setTotalQty, setDiscAmount, setTotalAmount, setItemNames }) => {
    const [products, setProducts] = useState([]);
    const [selectedProducts, setSelectedProducts] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedPriceType, setSelectedPriceType] = useState("withTax")

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
        setSelectedProducts((prevProducts) => [
            ...prevProducts,
            { ...product, quantity: 1, discount: 0, uniqueId: Date.now() }
        ]);
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

    useEffect(() => {
        const subTotalQty = selectedProducts.reduce((total, product) => total + product.quantity, 0);
        const totalQty = selectedProducts.reduce((sum, product) => sum + product.quantity, 0);
        const itemDetailsList = selectedProducts.map((product) => ({
            name: product.name,
            quantity: product.quantity,
            amount: (selectedPriceType === "withTax" ? product.price_nett_ptr : product.price_ptr) * product.quantity * (1 - product.discount / 100)
        }));

        const discAmount = selectedProducts.reduce((total, product) => {
            const price = selectedPriceType === "withTax" ? product.price_nett_ptr : product.price_ptr;
            return total + ((price * product.quantity * product.discount) / 100);
        }, 0);

        const totalAmount = selectedProducts.reduce((total, product) => {
            const price = selectedPriceType === "withTax" ? product.price_nett_ptr : product.price_ptr;
            return total + ((price * product.quantity) - ((price * product.quantity * product.discount) / 100));
        }, 0);

        setSubTotalQty(subTotalQty);
        setTotalQty(totalQty);
        setDiscAmount(discAmount.toFixed(2));
        setTotalAmount(totalAmount.toFixed(2));

        if (typeof setItemNames === "function") {
            setItemNames(itemDetailsList);
        }
    }, [selectedProducts, selectedPriceType, setSubTotalQty, setTotalQty, setDiscAmount, setTotalAmount, setItemNames]);

    return (
        <div>
            <div className='flex justify-between w-full gap-2 '>
                <div className='px-5 pt-6 w-full '>
                    <input
                        type="text"
                        className='outline-none w-full border border-gray-300 rounded px-2 py-2'
                        placeholder='SEARCH ITEMS'
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />

                    {searchQuery && filteredProducts.length > 0 && (
                        <div className="border border-gray-300 rounded mt-2 bg-white absolute z-30 w-60 shadow-md">
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

                    <div className='overflow-y-auto '>
                        <table className='w-full border-2 border-gray-300  mt-4 px-3 '>
                            <thead className='p-1 bg-blue-900 text-white sticky top-0 z-10'>
                                <tr>
                                    <th className='border-r border-gray-300 py-1 w-1/10 font-medium'>ITEM</th>
                                    <th className='border-r border-gray-300 py-1 w-1/10 font-medium'>BATCH </th>
                                    <th className='border-r border-gray-300 py-1 w-1/10 font-medium'>EXPIRY</th>
                                    <th className='border-r border-gray-300 py-1 w-1/10 font-medium'>MRP</th>
                                    <th className='border-r border-gray-300 py-1 w-1/10 font-medium'>QTY</th>
                                    <th className='border-r border-gray-300 py-1 w-1/10 font-medium'> PRICE (RS)</th>
                                    <th className='border-r border-gray-300 py-1 w-1/10 font-medium' colSpan={2}>DISCOUNT</th>
                                    <th className='border-r border-gray-300 py-1 w-1/10 font-medium' colSpan={2}>GST</th>
                                    <th className='border-r border-gray-300 py-1 w-1/10 font-medium'>AMOUNT</th>
                                    <th className='font-medium'>REMOVE</th>
                                </tr>
                                <tr>
                                    <th className='border-r border-gray-300 py-1 w-1/10'></th>
                                    <th className='border-r border-gray-300 py-1 w-1/10 font-medium'>NO</th>
                                    <th className='border-r border-gray-300 py-1 w-1/10 '></th>
                                    <th className='border-r border-gray-300 py-1 w-1/10 font-medium'>(RS)</th>
                                    <th className='border-r border-gray-300 py-1 w-1/10'></th>
                                    <th className='border border-gray-300 py-1 w-1/10 bg-white'>
                                        <select
                                            className='rounded w-32 outline-none bg-white text-black font-medium'
                                            value={selectedPriceType}
                                            onChange={(e) => setSelectedPriceType(e.target.value)}
                                        >
                                            <option value="withoutTax">Without Tax</option>
                                            <option value="withTax">With Tax</option>
                                        </select>
                                    </th>

                                    <th className='border border-gray-300 py-1 w-20 font-medium'>%</th>
                                    <th className='border border-gray-300 py-1 w-20 font-medium'>RS</th>

                                    <th className='border border-gray-300 py-1 w-20 font-medium'>%</th>
                                    <th className='border border-gray-300 py-1 w-20 font-medium'>RS</th>

                                    <th className='border-r border-gray-300 py-1 w-1/10 font-medium'>(RS)</th>
                                    <th className='border-r border-gray-300 py-1 w-1/10'></th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    selectedProducts.length > 0 ? (
                                        selectedProducts.map((product, index) => (
                                            <tr key={product.id} className='bg-white text-gray-700'>
                                                <td className="border border-gray-300 p-2">{product.name}</td>
                                                <td className="border border-gray-300 p-2">{product.batchno || ""}</td>
                                                <td className="border border-gray-300 p-2">{product.expiry || ""}</td>
                                                <td className="border border-gray-300 p-2 text-center">{product.price_mrp || ""}</td>
                                                <td className="border border-gray-300 p-2 text-center">
                                                    <button
                                                        onClick={() => updateQuantity(index, 1)}
                                                        className="w-7 h-7 bg-green-500 rounded-sm cursor-pointer text-white"
                                                    >
                                                        +
                                                    </button>
                                                    <span className="px-2">{product.quantity}</span>
                                                    <button
                                                        onClick={() => updateQuantity(index, -1)}
                                                        className="w-7 h-7 bg-red-500 rounded-sm cursor-pointer text-white"
                                                    >
                                                        -
                                                    </button>
                                                </td>
                                                <td className="border border-gray-300 p-2 text-center">
                                                    {selectedPriceType === "withTax" ? product.price_nett_ptr : product.price_ptr}
                                                </td>
                                                <td className="p-2 border border-gray-300">
                                                    <input
                                                        type="text"
                                                        min="0"
                                                        max="100"
                                                        value={product.discount}
                                                        className='w-16 px-2 py-1 text-center outline-none rounded border border-gray-300'
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
                                                <td className="border border-gray-300 p-2 text-center">{((product.price_ptr * product.quantity * product.discount) / 100).toFixed(2)}</td>
                                                <td className="border border-gray-300 p-2 text-center">{product.gstRate}</td>
                                                <td className="border border-gray-300 p-2 text-center">{(((product.price_ptr * product.quantity * (1 - product.discount / 100)) * product.gstRate) / 100).toFixed(2)}</td>
                                                <td className="border border-gray-300 p-2 text-center">
                                                    {(
                                                        (selectedPriceType === "withTax" ? product.price_nett_ptr : product.price_ptr) *
                                                        product.quantity *
                                                        (1 - product.discount / 100)
                                                    ).toFixed(2)}
                                                </td>
                                                <td className="border border-gray-300 p-2 text-center">
                                                    <button
                                                        onClick={() => removeProduct(index)}
                                                        className="w-7 h-7 bg-red-500 rounded-sm pl-1.5 cursor-pointer text-white"
                                                    >
                                                        <RiDeleteBinLine />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="12" className="text-center p-4 text-gray-500">No items found</td>
                                        </tr>
                                    )
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <div className='flex items-center justify-end gap-5 px-5 py-9'>
                <label htmlFor="" className='uppercase font-mono'>Total:</label>
                <input
                    type="text"
                    className='w-56 h-10 px-2 outline-none border-b border-gray-300 font-semibold shadow-md'
                    value={selectedProducts.reduce((total, product) => {
                        const price = selectedPriceType === "withTax" ? product.price_nett_ptr : product.price_ptr;
                        const subtotal = (parseFloat(price) || 0) * product.quantity * (1 - product.discount / 100);
                        return total + subtotal;
                    }, 0).toFixed(2)}
                    readOnly
                />
            </div>
        </div>
    )
}

export default Billing
