import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const Bill = () => {
    const location = useLocation();
    const { subTotalQty = 0, totalQty = 0, itemNames = [], totalAmount = 0 } = location.state || {};
    console.log("Received totalAmount:", totalAmount);


    useEffect(() => {
        console.log("Updated:", { subTotalQty, totalQty, itemNames, totalAmount });
    }, [subTotalQty, totalQty, itemNames, totalAmount]);

    return (
        <div className="p-6 border border-gray-300 rounded-lg shadow-md w-96 font-mono bg-white mx-auto mt-10">
            <h2 className="text-xl font-bold text-center mb-3">🛒 Bill</h2>
            <hr className="border-t-2 border-gray-300 mb-3" />

            <table className="w-full border-collapse mt-3">
                <thead>
                    <tr className="">
                        <th className=" border-b px-4 py-2 w-1/3">Item</th>
                        <th className=" border-b px-4 py-2 w-1/3">Qty</th>
                        <th className=" border-b px-4 py-2 w-1/3">Amount</th>
                    </tr>
                </thead>
                <tbody>
                    {itemNames.length > 0 ? (
                        itemNames.map((item, index) => (
                            <tr key={index} className="text-center">
                                <td className=" px-4 py-2">
                                    {typeof item === "object" ? item.name : item}
                                </td>
                                <td className=" px-4 py-2">{item.quantity}</td>
                                <td className=" px-4 py-2">
                                    ₹{Number(item.amount).toFixed(2)}
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="3" className="text-center text-gray-500 py-3">
                                No items added
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>

            <hr className="border-t-2 border-gray-300 mb-3" />

            <div className="flex justify-between text-lg">
                <span>Total Qty:</span>
                <span>{subTotalQty || 0}</span>
            </div>
            <div className="flex justify-between text-lg mt-1">
                <span>Net Total:</span>
                <span className='font-semibold'>₹ {Number(totalAmount).toFixed(2)}</span>
            </div>

            {/* <button
                className="mt-4 w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition-all"
                onClick={() => window.print()}
            >
                Print Bill
            </button> */}
        </div>
    );
};

export default Bill;
