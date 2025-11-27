import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { useAuth } from '../Provider/AuthProvider';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const { resetPassword } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    // Get email from state if available (passed from login page)
    useEffect(() => {
        if (location.state && location.state.email) {
            setEmail(location.state.email);
        }
    }, [location.state]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!email) {
            toast.error('Please enter your email address');
            return;
        }
        
        setLoading(true);
        
        try {
            await resetPassword(email);
            toast.success(`Password reset link has been sent to ${email}`);
            
            // Redirect to Gmail after 2 seconds
            setTimeout(() => {
                window.open('https://mail.google.com', '_blank');
            }, 2000);
            
        } catch (error) {
            let errorMessage = 'Failed to send password reset email';
            
            if (error.code === 'auth/user-not-found') {
                errorMessage = 'No user found with this email address';
            } else if (error.code === 'auth/invalid-email') {
                errorMessage = 'Invalid email format';
            }
            
            toast.error(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-indigo-100 to-blue-200 px-4 rounded-lg">
            <div className="bg-white w-full max-w-md rounded-2xl shadow-lg p-8">
                <h1 className="text-3xl font-bold text-center text-indigo-600 mb-2">
                    Reset Password
                </h1>
                <p className="text-center text-gray-500 mb-6">
                    Enter your email to receive a password reset link
                </p>

                <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Email */}
                    <div>
                        <label className="block mb-1 font-medium text-gray-700 text-left">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    {/* Submit Button */}
                    <button 
                        type="submit" 
                        disabled={loading}
                        className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 transition-colors"
                    >
                        {loading ? 'Sending...' : 'Reset Password'}
                    </button>
                </form>

                {/* Back to Login */}
                <p className="text-center text-gray-600 mt-5">
                    Remember your password?{" "}
                    <button 
                        onClick={() => navigate('/login')}
                        className="text-indigo-600 hover:underline"
                    >
                        Back to Login
                    </button>
                </p>
            </div>
            <ToastContainer position="top-right" autoClose={3000} />
        </div>
    );
};

export default ForgotPassword;