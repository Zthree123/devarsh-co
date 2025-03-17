import React, { useState } from "react";
import { MdOutlineClose } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const Additem = () => {
    const navigate = useNavigate()
  const [itemName, setItemName] = useState("");
  const [itemHSN, setItemHSN] = useState("");
  const [category, setCategory] = useState("");
  const [itemCode, setItemCode] = useState("");
  const [salePrice, setSalePrice] = useState("");
  const [wholesalePrice, setWholesalePrice] = useState("");
  const [discountPrice, setDiscountPrice] = useState("");
    const [selectedTab, setSelectedTab] = useState("sale");

    const handleClose = () => {
        navigate('/itemMaster')
    }

  return (
    <div>
      <div className="flex items-center justify-between py-3 px-6">
        <p className="text-xl">Add Item</p>
              <MdOutlineClose
                  onClick={handleClose}
                  className="cursor-pointer text-xl"
              />
      </div>

      <hr className="border-t-2 border-gray-400 mb-10" />

      <div className="flex flex-col gap-10 px-10">
        <div className="flex gap-10">
          <div className="relative w-72">
            <input
              type="text"
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
              onFocus={() => setItemName((prev) => prev || " ")}
              onBlur={() => !itemName.trim() && setItemName("")}
              className="border border-gray-400 outline-none rounded-md p-2 w-full focus:border-blue-700"
            />
            <label
              className={`absolute left-3 transition-all duration-200 
    ${itemName ? "text-xs -top-2 bg-white px-1 text-blue-600" : "text-gray-400 top-2"}`}
            >
              Item Name
            </label>
          </div>

          <div className="relative w-72">
            <input
              type="text"
              value={itemHSN}
              onChange={(e) => setItemHSN(e.target.value)}
              onFocus={() => setItemHSN((prev) => prev || " ")}
              onBlur={() => !itemHSN.trim() && setItemHSN("")}
              className="border border-gray-400 outline-none rounded-md p-2 w-full focus:border-blue-700 "
            />
            <label
              className={`absolute left-3 transition-all duration-200 
    ${itemHSN ? "text-xs -top-2 bg-white px-1 text-blue-600" : "text-gray-400 top-2"}`}
            >
              Item HSN
            </label>
          </div>

          <button className="bg-blue-500 text-white px-10 py-2 w-60 rounded-md cursor-pointer hover:bg-blue-600">
            Edit Unit
          </button>
        </div>

        <div className="flex gap-10">
          <div className="relative w-72">
            <input
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              onFocus={() => setCategory((prev) => prev || " ")}
              onBlur={() => !category.trim() && setCategory("")}
              className="border border-gray-400 outline-none rounded-md p-2 w-full focus:border-blue-700 "
            />
            <label
              className={`absolute left-3 transition-all duration-200 
    ${category ? "text-xs -top-2 bg-white px-1 text-blue-600" : "text-gray-400 top-2"}`}
            >
              Category
            </label>

          </div>

          <div className="relative w-72 pb-16">
            <input
              type="text"
              value={itemCode}
              onChange={(e) => setItemCode(e.target.value)}
              onFocus={() => setItemCode((prev) => prev || " ")}
              onBlur={() => !itemCode.trim() && setItemCode("")}
              className="border border-gray-400 outline-none rounded-md p-2 w-full focus:border-blue-700 "
            />
            <label
              className={`absolute left-3 transition-all duration-200 
    ${itemCode ? "text-xs -top-2 bg-white px-1 text-blue-600" : "text-gray-400 top-2"}`}
            >
              Item Code
            </label>
          </div>
        </div>
      </div>

      <div className="flex gap-10 pl-16">
        <p
          className={`font-semibold cursor-pointer w-24 pb-5  ${selectedTab === "sale" ? "text-blue-600 border-b-4 border-blue-600" : "text-gray-600"
            }`}
          onClick={() => setSelectedTab("sale")}
        >
          Sale
        </p>
        <p
          className={`font-semibold cursor-pointer w-24 pb-5  ${selectedTab === "wholesale" ? "text-blue-600 border-b-4 border-blue-600" : "text-gray-600"
            }`}
          onClick={() => setSelectedTab("wholesale")}
        >
          Wholesale
        </p>
      </div>

      <hr className="border-t-2 border-gray-400 mx-10 " />

      <div className="p-10 ">
        {selectedTab === "sale" && (
          <div className="flex gap-10">
            <div className="relative w-72 flex">
              <input
                type="text"
                value={salePrice}
                onChange={(e) => setSalePrice(e.target.value)}
                className="border border-gray-400 outline-none rounded-md p-2 w-full focus:border-blue-700 peer"
                placeholder=" "
              />
              <label className="absolute left-3 transition-all duration-200 peer-placeholder-shown:top-2 peer-placeholder-shown:text-gray-400 peer-focus:text-xs peer-focus:-top-2 peer-focus:bg-white peer-focus:px-1 peer-focus:text-blue-600">
                Sale Price
              </label>
              <select className="border border-gray-400 outline-none rounded-md p-2 w-full focus:border-blue-700 peer">
                <option value="withtax">With Tax</option>
                <option value="withouttax">Without Tax</option>
              </select>
            </div>

            <div className="relative w-72">
              <input
                type="text"
                value={discountPrice}
                onChange={(e) => setDiscountPrice(e.target.value)}
                className="border border-gray-400 outline-none rounded-md p-2 w-full focus:border-blue-700 peer"
                placeholder=" "
              />
              <label className="absolute left-3 transition-all duration-200 peer-placeholder-shown:top-2 peer-placeholder-shown:text-gray-400 peer-focus:text-xs peer-focus:-top-2 peer-focus:bg-white peer-focus:px-1 peer-focus:text-blue-600">
                Discount Percentage
              </label>
            </div>
          </div>
        )}

        {selectedTab === "wholesale" && (
          <div className="flex gap-10">
            <div className="relative w-72 flex">
              <input
                type="text"
                value={wholesalePrice}
                onChange={(e) => setWholesalePrice(e.target.value)}
                className="border border-gray-400 outline-none rounded-md p-2 w-full focus:border-blue-700 peer"
                placeholder=" "
              />
              <label className="absolute left-3 transition-all duration-200 peer-placeholder-shown:top-2 peer-placeholder-shown:text-gray-400 peer-focus:text-xs peer-focus:-top-2 peer-focus:bg-white peer-focus:px-1 peer-focus:text-blue-600">
                Wholesale Price
              </label>
              <select className="border border-gray-400 outline-none rounded-md p-2 w-full focus:border-blue-700 peer">
                <option value="withtax">With Tax</option>
                <option value="withouttax">Without Tax</option>
              </select>
            </div>
          </div>
        )}
      </div>

    </div>
  );
};

export default Additem;

