import React, { useState } from 'react';
import { useAuth } from '../Provider/AuthProvider';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Profile = () => {
    const { user, updateUserProfile } = useAuth();
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        name: user?.displayName || '',
        email: user?.email || '',
        photoURL: user?.photoURL || ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            await updateUserProfile(formData.name, formData.photoURL);
            toast.success('Profile updated successfully!');
            setIsEditing(false);
        } catch (error) {
            toast.error('Failed to update profile. Please try again.');
            console.error('Update profile error:', error);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-blue-200 py-16 px-4">
            <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg p-8">
                <h1 className="text-3xl font-bold text-center text-indigo-600 mb-6">
                    My Profile
                </h1>
                
                {!isEditing ? (
                    <div className="space-y-6">
                        {/* Profile Image */}
                        <div className="flex justify-center">
                            {user?.photoURL ? (
                                <img 
                                    src={user.photoURL} 
                                    alt={user.displayName || 'User'} 
                                    className="w-32 h-32 rounded-full object-cover border-4 border-indigo-200"
                                />
                            ) : (
                                <div className="w-32 h-32 rounded-full bg-indigo-200 flex items-center justify-center">
                                    <span className="text-4xl text-indigo-500">
                                        {user?.displayName?.charAt(0) || user?.email?.charAt(0) || '?'}
                                    </span>
                                </div>
                            )}
                        </div>
                        
                        {/* User Info */}
                        <div className="space-y-4 text-center">
                            <div>
                                <h2 className="text-xl font-semibold text-gray-800">
                                    {user?.displayName || 'No Name Set'}
                                </h2>
                            </div>
                            <div>
                                <p className="text-gray-600">{user?.email}</p>
                            </div>
                        </div>
                        
                        {/* Update Profile Button */}
                        <div className="pt-4">
                            <button 
                                onClick={() => setIsEditing(true)}
                                className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors"
                            >
                                Update Profile
                            </button>
                        </div>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-5">
                        {/* Name */}
                        <div>
                            <label className="block mb-1 font-medium text-gray-700 text-left">Name</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Enter your name"
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                required
                            />
                        </div>

                        {/* Email (read-only) */}
                        <div>
                            <label className="block mb-1 font-medium text-gray-700 text-left">Email</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100"
                                disabled
                            />
                            <p className="text-xs text-gray-500 mt-1">Email cannot be changed</p>
                        </div>

                        {/* Photo URL */}
                        <div>
                            <label className="block mb-1 font-medium text-gray-700 text-left">Photo URL</label>
                            <input
                                type="url"
                                name="photoURL"
                                value={formData.photoURL}
                                onChange={handleChange}
                                placeholder="Enter photo URL"
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                        </div>

                        {/* Action Buttons */}
                        <div className="flex space-x-4 pt-2">
                            <button 
                                type="submit"
                                className="flex-1 bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors"
                            >
                                Save Changes
                            </button>
                            <button 
                                type="button"
                                onClick={() => setIsEditing(false)}
                                className="flex-1 border border-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors"
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                )}
                
                {/* Toast Container */}
                <ToastContainer />
            </div>
        </div>
    );
};

export default Profile;