import React from 'react';
import Navbar from '../components/Navbar/Navbar';
import { Outlet } from 'react-router';
import Footer from '../components/Footer/Footer';

const MainLayout = () => {
    return (
        <div>
            <Navbar></Navbar>
            <div className="pt-20">
                <Outlet></Outlet>
            </div >

            <div className='mb-0 mx-0'><Footer></Footer></div>


        </div>
    );
};

export default MainLayout;