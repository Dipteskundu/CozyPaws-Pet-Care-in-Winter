import React from 'react';
import { createBrowserRouter } from 'react-router';
import MainLayout from '../MainLayout/MainLayout';
import Home from '../pages/Home';
import Services from '../pages/Services';
import ServiceDetails from '../pages/ServiceDetails';
import Login from '../pages/Login';
import Register from '../pages/Register';
import BookService from '../pages/BookService';
import Profile from '../pages/Profile';
import ProtectedRoute from '../components/ProtectedRoute/ProtectedRoute';
import ErrorPage from '../pages/ErrorPage';

const routes =  createBrowserRouter([
    {
        path:'/',
        element: <MainLayout></MainLayout>,
        children:[
            {
                index: true,
                element:<Home></Home>
            },
            {
                path: 'services',
                element: <Services></Services>
            },
            {
                path: 'services/:serviceId',
                element: (
                    <ProtectedRoute>
                        <ServiceDetails></ServiceDetails>
                    </ProtectedRoute>
                )
            },
            {
                path: 'login',
                element: <Login></Login>
            },
            {
                path: 'register',
                element: <Register></Register>
            },
            {
                path: 'book-service',
                element: (
                    <ProtectedRoute>
                        <BookService></BookService>
                    </ProtectedRoute>
                )
            },
            {
                path: 'profile',
                element: (
                    <ProtectedRoute>
                        <Profile></Profile>
                    </ProtectedRoute>
                )
            }
        ]
    },
    {
        path: '*',
        element: <ErrorPage></ErrorPage>
    }
])

export default routes;