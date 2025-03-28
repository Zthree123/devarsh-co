import React from 'react';
import { useLocation } from 'react-router-dom';

const Bill = () => {
  const location = useLocation();
  const { subTotalQty = 0, totalQty = 0, itemNames = [] } = location.state || {};

  // Calculate Net Total from item prices
  const totalAmount = itemNames.reduce(
    (acc, item) => acc + (item?.price || 0) * (1 - (item?.discount || 0) / 100),
    0
  );

  return (
    <div className="p-6 border rounded-lg shadow-md w-80 bg-white mx-auto mt-10">
      <h2 className="text-xl font-bold text-center mb-3">🛒 Market Bill</h2>
      <hr className="border-t-2 border-gray-300 mb-3" />

      <div className="text-sm">
        {itemNames.length > 0 ? (
          itemNames.map((item, index) => (
            <div key={index} className="flex justify-between my-2">
              <span>
                {item?.name || "Unknown Item"} x{item?.quantity || 1}
              </span>
              <span>₹{((item?.price || 0) * (1 - (item?.discount || 0) / 100)).toFixed(2)}</span>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No items added</p>
        )}
      </div>

      <hr className="border-t-2 border-gray-300 my-3" />

      <div className="flex justify-between font-semibold text-lg">
        <span>Total Qty:</span>
        <span>{subTotalQty || 0}</span>
      </div>
      <div className="flex justify-between font-semibold text-lg mt-1">
        <span>Net Total:</span>
        <span>₹{totalAmount.toFixed(2)}</span>
      </div>

      <button
        className="mt-4 w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition-all"
        onClick={() => window.print()}
      >
        Print Bill
      </button>
    </div>
  );
};

export default Bill;
