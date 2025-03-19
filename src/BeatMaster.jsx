import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { IoHomeOutline } from "react-icons/io5";
import { CiEdit } from "react-icons/ci";
import { HiOutlineWrenchScrewdriver } from "react-icons/hi2";
import { RiDeleteBinLine } from "react-icons/ri";

const BeatMaster = () => {
    const [name, setName] = useState("")
    const [beats, setBeats] = useState([])
    const [editingId, setEditingId] = useState(null);

    const handleAddOrUpdate = () => {
        if (!name) {
            alert("Please enter a name!");
            return;
        }

        if (editingId !== null) {
            setBeats((prevBeats) =>
                prevBeats.map((beat) =>
                    beat.id === editingId ? { ...beat, name } : beat
                )
            );
            setEditingId(null);
        } else {
            setBeats((prevBeats) => [
                ...prevBeats,
                { id: prevBeats.length + 1, name }
            ]);
        }

        setName("");
    };

    const handleEdit = (beat) => {
        setName(beat.name);
        setEditingId(beat.id);
    };

    const handleDelete = (id) => {
        setBeats(beats.filter((beat) => beat.id !== id));
    };

    return (
        <div>
            <div className='flex justify-between items-center p-6 bg-gray-200'>
                <p className='uppercase font-semibold'>devarsh & co</p>
                <div className='flex gap-2'>
                    <Link
                        to='/dashboard'
                        className='flex items-center gap-2 bg-green-500 text-white px-5 py-2 cursor-pointer rounded-md hover:bg-green-600'
                    >
                        <IoHomeOutline />
                        <span>Home</span>
                    </Link>
                </div>
            </div>

            <div className='flex items-center justify-between gap-5 py-6 px-5'>
                <label htmlFor="" className='w-20'>Name *</label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className='border border-gray-300 px-2 py-2 rounded-md w-full outline-none' />
                <button
                    type="button"
                    onClick={handleAddOrUpdate}
                    className='bg-indigo-800 text-white px-5 py-2 rounded-md cursor-pointer'
                >
                    {editingId !== null ? "Update" : "Add"}
                </button>
            </div>

            <div className='px-5'>
                <table className='border border-gray-300 w-full'>
                    <thead>
                        <tr className='bg-blue-900 text-white'>
                            <th className='py-2 font-medium border-r border-white w-40'>S.No</th>
                            <th className='py-2 font-medium border-r border-white w- '>Beat Name</th>
                            <th className='py-2 font-medium border-r border-white w-96'>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {beats.map((beat, index) => (
                            <tr key={beat.id} className="border-t border-gray-300">
                                <td className='p-2 border-r border-gray-300 text-center'>{index + 1}</td>
                                <td className='p-2 border-r border-gray-300'>{beat.name} </td>
                                <td className='p-2 flex gap-1 items-center justify-center border-r border-gray-300 '>
                                    <CiEdit
                                        onClick={() => handleEdit(beat)}
                                        className='cursor-pointer hover:bg-gray-200 rounded-md p-2 text-4xl'
                                    />
                                    <HiOutlineWrenchScrewdriver
                                        onClick={() => handleEdit(beat)}
                                        className='cursor-pointer hover:bg-gray-200 rounded-md p-2 text-4xl'
                                    />
                                    <RiDeleteBinLine
                                        onClick={() => handleDelete(beat.id)}
                                        className='cursor-pointer hover:bg-gray-200 rounded-md p-2 text-4xl'
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default BeatMaster
