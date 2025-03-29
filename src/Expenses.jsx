import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { IoHomeOutline } from "react-icons/io5";

const Expenses = () => {
    const [expenseCategory, setExpenseCategory] = useState("");
    const [amount, setAmount] = useState("");
    const [expenses, setExpenses] = useState([]);
    const [particular, setParticular] = useState("")
    
    const handleSave = () => {
        if (expenseCategory && amount) {
            const newExpense = {
                id: expenses.length + 1,
                category: expenseCategory,
                particular: particular,
                amount: amount
            };
            setExpenses([...expenses, newExpense]);
            setExpenseCategory("");
            setAmount("");
        }
    };

    useEffect(() => {
        const savedExpenses = JSON.parse(localStorage.getItem("expenses")) || [];
        setExpenses(savedExpenses);
    }, []);

    useEffect(() => {
        localStorage.setItem("expenses", JSON.stringify(expenses));
    }, [expenses]);

    return (
        <div>
            <div className='bg-gray-200 py-5 flex items-center justify-between px-16'>
                <p className='font-semibold uppercase'>Expenses</p>
                <Link
                    to='/dashboard'
                    className='flex items-center gap-2 bg-green-500 text-white px-5 py-2 cursor-pointer rounded-md hover:bg-green-600'>
                    <IoHomeOutline />
                    <span>Home</span>
                </Link>
            </div>

            <div className='flex items-center justify-between px-16 py-8'>
                <div className='flex flex-col items-center gap-2'>
                    <label className='self-start'>Expense Category</label>
                    <input
                        type="text"
                        value={expenseCategory}
                        onChange={(e) => setExpenseCategory(e.target.value)}
                        className='outline-none border border-gray-300 rounded-md px-2 py-2 w-72' />
                </div>
                <div className='flex flex-col items-center gap-2'>
                    <label className='self-start'>Particular</label>
                    <input
                        type="text"
                        value={particular}
                        onChange={(e) => setParticular(e.target.value)}
                        className='outline-none border border-gray-300 rounded-md px-2 py-2 w-72' />
                </div>
                <div className='flex flex-col items-center gap-2'>
                    <label className='self-start'>Amount</label>
                    <input
                        type="text"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        className='outline-none border border-gray-300 rounded-md px-2 py-2 w-72' />
                </div>
                <div
                    className='bg-blue-600 text-white px-20 py-3 rounded-md cursor-pointer'
                    onClick={handleSave}>
                    <button className='cursor-pointer'>Save</button>
                </div>
            </div>

            <div className='mx-12'>
                <table className='w-full px-12 border border-gray-300'>
                    <thead>
                        <tr className='bg-blue-900 text-white'>
                            <th className='font-medium uppercase py-2 border border-white w-48'>S.No</th>
                            <th className='font-medium uppercase py-2 border border-white w-96'>Expense Category</th>
                            <th className='font-medium uppercase py-2 border border-white w-96'>Particular</th>
                            <th className='font-medium uppercase py-2 border border-white w-96'>Amount</th>
                            {/* <th className='font-medium uppercase py-2 border border-white w-96'>Action</th> */}
                        </tr>
                    </thead>
                    <tbody >
                        {
                            expenses.length > 0 ?
                                (
                                    expenses.map((expense, index) => (
                                        <tr key={expense.id} className='border-b border-gray-300'>
                                            <td className='border-r border-gray-300 text-center py-2 w-48'>{index + 1}</td>
                                            <td className='border-r border-gray-300 text-center py-2 w-96'>{expense.category}</td>
                                            <td className='border-r border-gray-300 text-center py-2 w-96'>{expense.particular}</td>
                                            <td className='border-r border-gray-300 text-center py-2 w-96'>₹ {expense.amount}.00</td>
                                            {/* <td className='border-r border-gray-300 text-center py-2'></td> */}
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={4} className='border border-gray-300 text-center py-2 w-full'>No expenses yet.</td>
                                    </tr>
                                )
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Expenses;
