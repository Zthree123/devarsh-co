import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { IoHomeOutline } from "react-icons/io5";
import { CiEdit, CiFilter } from "react-icons/ci";
import { RiDeleteBinLine } from "react-icons/ri";

const BeatMaster = () => {
  const [name, setName] = useState("");
  const [beats, setBeats] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState("");
  const [searchFilter, setSearchFilter] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [deletedBeats, setDeletedBeats] = useState([]);

  useEffect(() => {
    const fetchBeats = async () => {
      try {
        const response = await fetch(
          "https://api.zthree.in/bizsura/Beats?action=showBeats",
          {
            headers: {
              Authorization: "Bearer your_secret_api_key",
              "Content-Type": "application/json",
            },
          }
        );
        const data = await response.json();

        if (data.status === "success") {
          const filteredBeats = data.results.filter(
            (beat) => !deletedBeats.includes(beat._id)
          ); 
          setBeats(filteredBeats);
        } else {
          setError("Failed to fetch beats.");
        }
      } catch (error) {
        console.error("Error fetching beats:", error);
        setError("An error occurred while fetching data.");
      }
    };

    fetchBeats();
  }, [deletedBeats]); 

  const handleAddOrUpdate = () => {
    if (!name) {
      setError("Please enter a name!");
      return;
    }

    if (editingId !== null) {
      setBeats((prevBeats) =>
        prevBeats.map((beat) =>
          beat._id === editingId ? { ...beat, BeatName: name } : beat
        )
      );
      setEditingId(null);
    } else {
      setBeats((prevBeats) => [
        ...prevBeats,
        { _id: `manual-${Date.now()}`, BeatName: name, isManual: true }, 
      ]);
    }

    setError("");
    setName("");
  };

  const handleEdit = (beat) => {
    setName(beat.BeatName);
    setEditingId(beat._id);
  };

  const handleDelete = (id) => {
    setBeats((prevBeats) => prevBeats.filter((beat) => beat._id !== id));
    setDeletedBeats((prevDeleted) => [...prevDeleted, id]); 
  };

  const filteredBeats = beats.filter((beat) =>
    beat.BeatName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <div className="flex justify-between items-center p-6 bg-gray-200">
        <p className="uppercase font-semibold">Devarsh & Co</p>
        <div className="flex gap-2">
          <Link
            to="/dashboard"
            className="flex items-center gap-2 bg-green-500 text-white px-5 py-2 cursor-pointer rounded-md hover:bg-green-600"
          >
            <IoHomeOutline />
            <span>Home</span>
          </Link>
        </div>
      </div>

      {error && <div className="py-2 text-xs text-red-600 text-center">{error}</div>}

      <div className="flex items-center justify-between gap-5 pb-6 pt-2 px-5">
        <label className="w-24 flex-shrink-0">BeatName *</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border border-gray-300 px-2 py-2 rounded-md w-full outline-none"
        />
        <button
          type="button"
          onClick={handleAddOrUpdate}
          className="bg-indigo-800 text-white px-5 py-2 rounded-md cursor-pointer"
        >
          {editingId !== null ? "Update" : "Add"}
        </button>
        <p onClick={() => setSearchFilter(!searchFilter)}>
          <CiFilter className="bg-indigo-800 text-white h-10 w-12 p-2 rounded-md" />
        </p>
      </div>

      {searchFilter && (
        <div className="px-5 pb-4">
          <input
            type="text"
            placeholder="SEARCH HEADQUARTERS"
            className="border border-gray-300 rounded-md w-full p-2 outline-none"
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      )}

      <div className="px-5">
        <table className="border border-gray-300 w-full">
          <thead>
            <tr className="bg-blue-900 text-white">
              <th className="py-2 font-medium border-r border-white w-40">S.No</th>
              <th className="py-2 font-medium border-r border-white w-96">Beat Name</th>
              <th className="py-2 font-medium w-96">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredBeats.map((beat, index) => (
              <tr key={beat._id} className="border-t border-gray-300">
                <td className="p-2 border-r border-gray-300 text-center">{index + 1}</td>
                <td className="p-2 border-r border-gray-300">{beat.BeatName}</td>
                <td className="p-2 flex gap-1 items-center justify-center border-r border-gray-300 ">
                  <div
                    onClick={() => handleEdit(beat)}
                    className="flex items-center justify-center gap-1 cursor-pointer hover:bg-gray-200 rounded-md p-2 "
                  >
                    <CiEdit className="text-2xl" />
                    <p>Edit</p>
                  </div>

                  <div
                    onClick={() => handleDelete(beat._id)}
                    className="flex items-center justify-center gap-1 cursor-pointer hover:bg-gray-200 rounded-md p-2 "
                  >
                    <RiDeleteBinLine className="text-2xl" />
                    <p>Delete</p>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BeatMaster;
