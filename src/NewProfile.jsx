import React, { useState } from 'react'

const NewProfile = ({ showProfile, onClose, addProfile }) => {
    const [error, setError] = useState('')
    const [profile, setProfile] = useState({
        name: '',
        contact: '',
        address: ''
    });

    const handleProfileChange = (e) => {
        const { name, value } = e.target;
        setProfile((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSaveProfile = () => {
        if (!profile.name || !profile.contact || !profile.address) {
            setError('All fields are required.');
            return;
        }

        addProfile(profile);
        resetProfile();
        onClose();
    };

    const handleContactChange = (e) => {
        const { value } = e.target;

        if (!/^\d*$/.test(value)) {
            return;
        }

        if (value.length > 10) {
            return;
        }

        setProfile((prev) => ({ ...prev, contact: value }));

        if (value.length === 10) {
            setError('');
        } else if (value.length > 0 && value.length < 10) {
            setError('Contact number must be exactly 10 digits.');
        } else {
            setError('');
        }
    };

    const resetProfile = () => {
        setProfile({
            name: '',
            email: '',
            contact: '',
        });
        setError('');
    };

    const handleCancel = () => {
        resetProfile();
        onClose();
    };

    return (
        <div>
            {
                showProfile && (
                    <>
                        <div className="fixed inset-0 bg-black/50 z-40"></div>

                        <div className="fixed inset-0 flex items-center justify-center z-50">
                            <div className="bg-white border border-gray-300 rounded-lg p-6 w-[600px] h-[550px]">
                                <h2 className='font-semibold text-xl text-center py-3'>Add New Profile</h2>

                                {error && <p className="text-red-500 text-sm">{error}</p>}

                                <div className=''>
                                    <p className='py-3 text-gray-700'>Account Type</p>
                                    <select name="" id="" className='border border-gray-400 text-gray-500 rounded-sm w-full p-2'>
                                        <option value="" className='text-gray-500'>Customer</option>
                                        <option value="" className='text-gray-500'>Supplier</option>
                                        <option value="" className='text-gray-500'>Salesman</option>
                                    </select>
                                </div>
                                <div className=''>
                                    <p className='py-3 text-gray-700'>Party Name</p>
                                    <input
                                        name='name'
                                        value={profile.name}
                                        onChange={handleProfileChange}
                                        className='border border-gray-400 w-full p-2 rounded-sm outline-none'
                                        type="text" />
                                </div>
                                <div>
                                    <p className='py-3 text-gray-700'>Contact No</p>
                                    <input
                                        name='contact'
                                        value={profile.contact}
                                        onChange={handleContactChange}
                                        className='border border-gray-400 w-full p-2 rounded-sm outline-none'
                                        type="text" />
                                </div>
                                <div className='pb-3'>
                                    <p className='py-3 text-gray-700'>Address</p>
                                    <textarea
                                        value={profile.address}
                                        onChange={handleProfileChange}
                                        className='border border-gray-400 w-full p-2 rounded-sm outline-none'
                                        name="address" id="" />
                                </div>

                                <div className='flex justify-between'>
                                    <button
                                        onClick={handleCancel}

                                        className='bg-red-600 text-white rounded-sm px-4 py-2'
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        className='bg-green-600 text-white rounded-sm px-4 py-2'
                                        onClick={handleSaveProfile}
                                    >
                                        Save
                                    </button>
                                </div>
                            </div>
                        </div>
                    </>
                )
            }
        </div>
    )
}

export default NewProfile
