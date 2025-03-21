import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { IoHomeOutline } from "react-icons/io5";
import { CiEdit } from "react-icons/ci";
import { CiFilter } from "react-icons/ci";
import { HiOutlineWrenchScrewdriver } from "react-icons/hi2";
import { RiDeleteBinLine } from "react-icons/ri";

const BeatMaster = () => {
    const [name, setName] = useState("")
    const [beats, setBeats] = useState([])
    const [editingId, setEditingId] = useState(null);
    const [error, setError] = useState("")
    const [searchFilter, setSearchFilter] = useState(false)
    const [searchQuery, setSearchQuery] = useState("")

    const handleAddOrUpdate = async () => {
        if (!name) {
            setError("Please enter a name!");
            return;
        }
    
        try {
            if (editingId !== null) {
                const response = await fetch(`https://api.zthree.in/bizsura/Beats`, {
                    method: "PUT",
                    headers: {
                        "Authorization": "Bearer your_secret_api_key",
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        action: "updateBeat",
                        beat_name: name,
                        beat_id: editingId 
                    })
                });
    
                const data = await response.json();
    
                if (data.status === "success") {
                    setBeats((prevBeats) => prevBeats.map((beat) =>
                        beat._id === editingId ? { ...beat, BeatName: name } : beat
                    ));
                    setName("");
                    setEditingId(null);
                } else {
                    setError(`Update failed: ${data.message || "Unknown error"}`);
                }
            } else {
                const response = await fetch("https://api.zthree.in/bizsura/Beats", {
                    method: "POST",
                    headers: {
                        "Authorization": "Bearer your_secret_api_key",
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        action: "postBeat",
                        beat_name: name
                    })
                });
    
                const data = await response.json();
    
                if (data.status === "success") {
                    setBeats((prevBeats) => [...prevBeats, { _id: data.id, BeatName: name }]);
                    setName("");
                } else {
                    setError(`Failed to add beat: ${data.message || "Unknown error"}`);
                }
            }
        } catch (error) {
            setError(error.message);
        }
    };
    

    const handleEdit = (beat) => {
        setName(beat.BeatName);
        setEditingId(beat._id);

    }

    const handleDelete = async (id) => {
        try {
            const response = await fetch(`https://api.zthree.in/bizsura/Beats`, {
                method: "DELETE",
                headers: {
                    "Authorization": "Bearer your_secret_api_key",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    action: "deleteBeat",
                    beat_id: id
                })
            });
    
            const data = await response.json();
    
            if (data.status === "success") {
                setBeats(beats.filter((beat) => beat._id !== id));
            } else {
                setError("Failed to delete beat.");
            }
        } catch (error) {
            setError(error.message);
        }
    };
    

    const filteredBeats = beats.filter((beat) =>
        beat.BeatName.toLowerCase().includes(searchQuery.toLowerCase())
    )

    useEffect(() => {
        const fetchBeats = async () => {
            try {
                const response = await fetch("https://api.zthree.in/bizsura/Beats?action=showBeats", {
                    headers: {
                        "Authorization": "Bearer your_secret_api_key",
                        "Content-Type": "application/json"
                    }
                });
                const data = await response.json();

                if (data.status === "success") {
                    setBeats(data.results);
                    console.log(data.results)
                } else {
                    setError("Failed to fetch beats.");
                }
            } catch (error) {
                console.error("Error fetching beats:", error);
                setError("An error occurred while fetching data.");
            }
        }

        fetchBeats()
    }, [])

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

            <div className='py-2 text-xs text-red-600 text-center'>
                {error && <p>{error}</p>}
            </div>

            <div className='flex items-center justify-between gap-5 pb-6 pt-2 px-5'>
                <label htmlFor="" className='w-24 flex-shrink-0 '>BeatName *</label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className='border border-gray-300 px-2 py-2 rounded-md w-full outline-none'
                />
                <button
                    type="button"
                    onClick={handleAddOrUpdate}
                    className='bg-indigo-800 text-white px-5 py-2 rounded-md cursor-pointer'
                >
                    {editingId !== null ? "Update" : "Add"}
                </button>
                <p
                    onClick={() => setSearchFilter(!searchFilter)}
                >
                    <CiFilter className='bg-indigo-800 text-white h-10 w-12 p-2 rounded-md' />
                </p>

                {searchFilter &&
                    <input
                        type='text'
                        placeholder='SEARCH HEADQUARTERS'
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className='border border-gray-300 rounded-md w-full p-2 outline-none'
                    />
                }
            </div>

            <div className='px-5'>
                <table className='border border-gray-300 w-full'>
                    <thead>
                        <tr className='bg-blue-900 text-white'>
                            <th className='py-2 font-medium border-r border-white w-40'>S.No</th>
                            <th className='py-2 font-medium border-r border-white w-96'>Headquarters</th>
                            <th className='py-2 font-medium border-r border-white w-96'>Beat Name</th>
                            <th className='py-2 font-medium  w-96'>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredBeats.map((beat, index) => (
                            <tr key={beat._id} className="border-t border-gray-300">
                                <td className='p-2 border-r border-gray-300 text-center'>{index + 1}</td>
                                <td className='p-2 border-r border-gray-300 '></td>
                                <td className='p-2 border-r border-gray-300'>{beat.BeatName} </td>
                                <td className='p-2 flex gap-1 items-center justify-center border-r border-gray-300 '>
                                    <div
                                        onClick={() => handleEdit(beat)}
                                        className='flex items-center justify-center gap-1 text-blue-900 cursor-pointer hover:bg-gray-200 rounded-md p-2 '>
                                        <CiEdit
                                            className='text-2xl'
                                        />
                                        <p>Edit</p>
                                    </div>
                                    {/* <HiOutlineWrenchScrewdriver
                                        onClick={() => handleEdit(beat)}
                                        className='cursor-pointer hover:bg-gray-200 rounded-md p-2 text-4xl'
                                    /> */}
                                    <div
                                        onClick={() => handleDelete(beat._id)}
                                        className='flex items-center justify-center gap-1 text-red-600 cursor-pointer hover:bg-gray-200 rounded-md p-2 '
                                    >
                                        <RiDeleteBinLine
                                            className='text-2xl'
                                        />
                                        <p>Delete</p>
                                    </div>
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
