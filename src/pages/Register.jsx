import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { FaEye, FaEyeSlash, FaGoogle } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from '../Provider/AuthProvider';

const Register = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [passwordError, setPasswordError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { user, registerUser, updateUserProfile, googleSignIn } = useAuth();

    // Redirect if already logged in
    if (user) {
        navigate('/');
    }

    const validatePassword = (password) => {
        const hasUpperCase = /[A-Z]/.test(password);
        const hasLowerCase = /[a-z]/.test(password);
        const isLongEnough = password.length >= 6;

        if (!hasUpperCase) {
            return "Password must contain at least one uppercase letter";
        }
        if (!hasLowerCase) {
            return "Password must contain at least one lowercase letter";
        }
        if (!isLongEnough) {
            return "Password must be at least 6 characters long";
        }
        return "";
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setPasswordError('');

        const form = e.target;
        const name = form.name.value;
        const email = form.email.value;
        const photoURL = form.photoURL.value;
        const password = form.password.value;
        const confirmPassword = form.confirmPassword.value;

        // Validate password
        const passwordValidationError = validatePassword(password);
        if (passwordValidationError) {
            setPasswordError(passwordValidationError);
            setLoading(false);
            return;
        }

        // Check if passwords match
        if (password !== confirmPassword) {
            setPasswordError("Passwords do not match");
            setLoading(false);
            return;
        }

        try {
            // Register user with Firebase
            const userCredential = await registerUser(email, password);
            
            // Update user profile with name and photo URL
            await updateUserProfile(name, photoURL);
            
            toast.success("Registration successful!");
            
            // Navigate to home page after a short delay
            setTimeout(() => {
                navigate('/');
            }, 1500);
        } catch (error) {
            let errorMessage = "Registration failed. Please try again.";
            
            // Handle specific Firebase errors
            if (error.code === 'auth/email-already-in-use') {
                errorMessage = "Email is already in use. Please use a different email.";
            } else if (error.code === 'auth/invalid-email') {
                errorMessage = "Invalid email format.";
            } else if (error.code === 'auth/weak-password') {
                errorMessage = "Password is too weak.";
            }
            
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
            
            // Navigate to home page after a short delay
            setTimeout(() => {
                navigate('/');
            }, 1500);
        } catch (error) {
            toast.error("Google sign-in failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-100 to-indigo-200 px-4">
            <div className="bg-white w-full max-w-md rounded-2xl shadow-lg p-8 my-8">
                <h1 className="text-3xl font-bold text-center text-indigo-600 mb-2">
                    Sign Up
                </h1>
                <p className="text-center text-gray-500 mb-6">
                    Fill in the details below to register.
                </p>

                <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Full Name */}
                    <div>
                        <label className="block mb-1 font-medium text-gray-700 text-left">
                            Full Name
                        </label>
                        <input
                            type="text"
                            name="name"
                            placeholder="Enter your full name"
                            className="input input-bordered w-full"
                            required
                        />
                    </div>

                    {/* Email */}
                    <div>
                        <label className="block mb-1 font-medium text-gray-700 text-left">Email</label>
                        <input
                            type="email"
                            name="email"
                            placeholder="Enter your email"
                            className="input input-bordered w-full"
                            required
                        />
                    </div>

                    {/* Photo URL */}
                    <div>
                        <label className="block mb-1 font-medium text-gray-700 text-left">
                            Photo URL
                        </label>
                        <input
                            type="url"
                            name="photoURL"
                            placeholder="Enter your photo URL"
                            className="input input-bordered w-full"
                            required
                        />
                    </div>

                    {/* Password */}
                    <div>
                        <label className="block mb-1 font-medium text-gray-700 text-left">
                            Password
                        </label>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                placeholder="Enter password"
                                className="input input-bordered w-full pr-10"
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-indigo-600"
                            >
                                {showPassword ?  <FaEyeSlash /> : <FaEye />}
                            </button>
                        </div>
                    </div>

                    {/* Confirm Password */}
                    <div>
                        <label className="block mb-1 font-medium text-gray-700 text-left">
                            Confirm Password
                        </label>
                        <div className="relative">
                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                name="confirmPassword"
                                placeholder="Re-enter password"
                                className="input input-bordered w-full pr-10"
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-indigo-600"
                            >
                                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                            </button>
                        </div>
                    </div>

                    {/* Password Error Message */}
                    {passwordError && (
                        <p className="text-red-500 text-sm">{passwordError}</p>
                    )}

                    {/* Submit Button */}
                    <button 
                        type="submit" 
                        className="btn btn-primary w-full mt-4"
                        disabled={loading}
                    >
                        {loading ? "Registering..." : "Register"}
                    </button>
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
                        className="btn btn-outline w-full mt-4 flex items-center justify-center gap-2"
                        disabled={loading}
                    >
                        <FaGoogle className="text-red-500" />
                        Sign up with Google
                    </button>
                </div>

                {/* Login Link */}
                <p className="text-center text-gray-600 mt-5">
                    Already have an account?{" "}
                    <Link to="/login" className="text-indigo-600 hover:underline">
                        Login
                    </Link>
                </p>

                {/* Toast Container */}
                <ToastContainer position="top-right" autoClose={3000} />
            </div>
        </div>
    );
};

export default Register;