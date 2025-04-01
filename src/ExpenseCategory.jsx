import React from 'react';
import { Link } from 'react-router-dom';
import { IoHomeOutline } from "react-icons/io5";
import { CiEdit } from "react-icons/ci";
import { RiDeleteBinLine } from "react-icons/ri";

const ExpenseCategory = () => {
    return (
        <div>
            <div className='bg-gray-200 py-5 flex items-center justify-between px-16'>
                <p className='font-semibold uppercase'>devarsh & co</p>
                <Link
                    to='/dashboard'
                    className='flex items-center gap-2 bg-green-500 text-white px-5 py-2 cursor-pointer rounded-md hover:bg-green-600'>
                    <IoHomeOutline />
                    <span>Home</span>
                </Link>
            </div>

            <div className='flex flex-col gap-2 px-10 py-5'>
                <label htmlFor="" className='uppercase'>Expense Category</label>
                <div className='flex gap-6'>
                <input
                    type="text"
                    className='w-full border border-gray-300 outline-none px-2 py-2 rounded-md'
                />
                <button className='bg-blue-600 text-white px-9 rounded-md cursor-pointer'>Save</button>
                </div>
            </div>

            <div className='px-10 pt-5'>
                <table className='border border-gray-300 w-full'>
                    <thead className='bg-blue-900 text-white '>
                        <tr>
                            <th className='font-medium uppercase border-r border-white py-2'>S.No</th>
                            <th className='font-medium uppercase border-r border-white py-2'>Expense Category</th>
                            <th className='font-medium uppercase border-r border-white py-2'>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className='text-center py-2 border-r border-gray-300'>1</td>
                            <td className='text-center py-2 border-r border-gray-300'>edrfs</td>
                            <td className='text-center py-2 border-r border-gray-300'>
                                <div className='flex items-center justify-center gap-3'>
                                    <p className='text-xl text-blue-800 hover:bg-gray-200 p-2 rounded-md cursor-pointer'><CiEdit /></p>
                                    <p className='text-xl text-red-500  hover:bg-gray-200 p-2 rounded-md cursor-pointer'><RiDeleteBinLine /></p>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ExpenseCategory;
