import React, { useState, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router';
import { useAuth } from '../Provider/AuthProvider';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaEye, FaEyeSlash, FaGoogle } from 'react-icons/fa';

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);
    
    const emailRef = useRef();
    const passwordRef = useRef();
    
    const { login, googleSignIn, resetPassword } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    
    // Get the page user was trying to access before login
    const from = location.state?.from?.pathname || '/';

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess(false);
        setLoading(true);

        const email = emailRef.current.value;
        const password = passwordRef.current.value;

        try {
            // Login with Firebase
            await login(email, password);
            setSuccess(true);
            toast.success('Login successful! Redirecting...');
            
            // Redirect to the page user was trying to access, or home page
            setTimeout(() => {
                navigate(from, { replace: true });
            }, 1000);
        } catch (err) {
            let errorMessage = 'An error occurred during login';
            
            // Handle specific Firebase errors
            if (err.code === 'auth/user-not-found') {
                errorMessage = 'User not found. Please check your email or register.';
            } else if (err.code === 'auth/wrong-password') {
                errorMessage = 'Incorrect password. Please try again.';
            } else if (err.code === 'auth/invalid-email') {
                errorMessage = 'Invalid email format.';
            } else if (err.code === 'auth/too-many-requests') {
                errorMessage = 'Too many failed login attempts. Please try again later.';
            }
            
            setError(errorMessage);
            toast.error(errorMessage);
        } finally {
            setLoading(false);
        }
    };
    
    const handleGoogleSignIn = async () => {
        setLoading(true);
        
        try {
            // Sign in with Google using Firebase
            await googleSignIn();
            toast.success("Google sign-in successful!");
            
            // Navigate to the page user was trying to access, or home page
            setTimeout(() => {
                navigate(from, { replace: true });
            }, 1000);
        } catch (error) {
            toast.error("Google sign-in failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleForgotPassword = async () => {
        const email = emailRef.current?.value;
        if (!email) {
            toast.error('Please enter your email address first');
            return;
        }
        
        try {
            // Send password reset email using Firebase
            await resetPassword(email);
            toast.info(`Password reset link has been sent to ${email}`);
        } catch (error) {
            let errorMessage = 'Failed to send password reset email';
            
            // Handle specific Firebase errors
            if (error.code === 'auth/user-not-found') {
                errorMessage = 'No user found with this email address';
            } else if (error.code === 'auth/invalid-email') {
                errorMessage = 'Invalid email format';
            }
            
            toast.error(errorMessage);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-indigo-100 to-blue-200 px-4 rounded-lg">
            <div className="bg-white w-full max-w-md rounded-2xl shadow-lg p-8">
                <h1 className="text-3xl font-bold text-center text-indigo-600 mb-2">
                    Login
                </h1>
                <p className="text-center text-gray-500 mb-6">
                    Sign in to access your account
                </p>

                <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Email */}
                    <div>
                        <label className="block mb-1 font-medium text-gray-700 text-left">Email</label>
                        <input
                            type="email"
                            name="email"
                            ref={emailRef}
                            placeholder="Enter your email"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    {/* Password */}
                    <div>
                        <label className="block mb-1 font-medium text-gray-700 text-left">Password</label>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                ref={passwordRef}
                                placeholder="Enter password"
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-indigo-600"
                            >
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </button>
                        </div>
                        <p
                            onClick={handleForgotPassword}
                            className="text-sm text-blue-600 hover:underline cursor-pointer mt-2 text-left"
                        >
                            Forgot Password?
                        </p>
                    </div>

                    {/* Submit Button */}
                    <button 
                        type="submit" 
                        disabled={loading}
                        className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 transition-colors"
                    >
                        {loading ? 'Signing In...' : 'Sign In'}
                    </button>

                    {/* Feedback Messages */}
                    {success && (
                        <p className="text-green-600 text-center mt-3">
                            Login successful! Redirecting...
                        </p>
                    )}
                    {error && <p className="text-red-500 text-center mt-3">{error}</p>}
                </form>

                {/* Google Sign In */}
                <div className="mt-6">
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-300"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-2 bg-white text-gray-500">Or continue with</span>
                        </div>
                    </div>

                    <button
                        onClick={handleGoogleSignIn}
                        className="w-full mt-4 flex items-center justify-center gap-2 bg-white border border-gray-300 rounded-lg py-2 px-4 hover:bg-gray-50 disabled:bg-gray-200 transition-colors"
                        disabled={loading}
                    >
                        <FaGoogle className="text-red-500" />
                        <span>Sign in with Google</span>
                    </button>
                </div>

                {/* Extra Links */}
                <p className="text-center text-gray-600 mt-5">
                    Don't have an account?{" "}
                    <Link to="/register" className="text-indigo-600 hover:underline">
                        Register
                    </Link>
                </p>
            </div>
            <ToastContainer position="top-right" autoClose={3000} />
        </div>
    );
};

export default Login;