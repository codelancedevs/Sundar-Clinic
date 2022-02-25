/**
 * Rendering Components Based on the Route
 */

// Dependencies
import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
// import { useSelector } from 'react-redux';

// Public Pages
import Home from '../pages/Home';
import About from '../pages/About';
import Gallery from '../pages/Gallery';
import Contact from '../pages/Contact';
import Posts from '../pages/Posts';
import TermsOfService from '../pages/TermsOfService';
import PrivacyPolicy from '../pages/PrivacyPolicy';
import Auth from '../pages/Auth';
import NotFound from '../pages/NotFound';

// Components
import Navbar from '../components/Navigation/Navbar';
import Footer from '../components/Navigation/Footer';

// Email Pages
import VerifyAccount from '../pages/Email/VerifyAccount';
import ResetPassword from '../pages/Email/ResetPassword';

// Admin Pages and Components
import Admin from '../pages/Admin';
import AdminAuth from '../components/Admin/Auth';
import AdminCreateAccount from '../components/Admin/Auth/CreateAccount';
import AdminLogin from '../components/Admin/Auth/Login';
import AdminResetPassword from '../components/Admin/Auth/ResetPassword';

// Patient Pages and Components
import Patient from '../pages/Patient';
import PatientAuth from '../components/Patient/Auth';
import PatientCreateAccount from '../components/Patient/Auth/CreateAccount';
import PatientLogin from '../components/Patient/Auth/Login';
import PatientResetPassword from '../components/Patient/Auth/ResetPassword';

const AppRoutes = () => {
    const location = useLocation();
    const [currentPath, setCurrentPath] = useState('/home');
    // const {user} = useSelector((state) => state.user);
    const user = {
        // role: 'Admin'
    };

    useEffect(() => {
        setCurrentPath(location.pathname)
    }, [location.pathname]);

    const PUBLIC_PATHS = [
        '/home',
        '/about',
        '/posts',
        '/gallery',
        '/contact',
        '/termsOfService',
        '/privacyPolicy',
        '/verifyAccount',
        '/resetPassword'
    ];

    const CheckUserState = () => {
        if (!user || !user?.role) return <Auth />
        return user && user?.role === 'Admin' ? <Navigate to='/admin' /> : <Navigate to='/patient' />
    }

    const CheckAdminState = () => {
        return user && user?.role === 'Admin' ? <Admin /> : <Navigate to='/auth' />
    }

    const CheckPatientState = () => {
        return user && user?.role === 'Patient' ? <Patient /> : <Navigate to='/auth' />
    }

    return (
        <>
            {PUBLIC_PATHS.includes(currentPath) && <Navbar />}
            {/* Open Routes  */}
            <Routes>
                <Route exact path='/'>
                    <Route index element={<Navigate to='/home' />} />
                    <Route path='home' element={<Home />} />
                    <Route path='about' element={<About />} />
                    <Route path='gallery' element={<Gallery />} />
                    <Route path='posts' element={<Posts />} />
                    <Route path='contact' element={<Contact />} />
                    <Route path='termsOfService' element={<TermsOfService />} />
                    <Route path='privacyPolicy' element={<PrivacyPolicy />} />
                    <Route path='verifyAccount/authToken=:authToken' element={<VerifyAccount />} />
                    <Route path='resetPassword/authToken=:authToken' element={<ResetPassword />} />
                </Route>

                {/* Auth Routes */}
                <Route path='/auth/*' element={<CheckUserState />}>
                    {/* <Route index element={<Auth />} /> */}
                    <Route path='admin/*' element={<AdminAuth />}>
                        <Route index element={<Navigate to='/auth/admin/login' />} />
                        <Route path='login' element={<AdminLogin />} />
                        <Route path='create-account' element={<AdminCreateAccount />} />
                        <Route path='reset-password' element={<AdminResetPassword />} />
                        <Route path='*' element={<Navigate to='/not-found' />} />
                    </Route>
                    <Route path='patient/*' element={<PatientAuth />}>
                        <Route index element={<Navigate to='/auth/patient/login' />} />
                        <Route path='login' element={<PatientLogin />} />
                        <Route path='create-account' element={<PatientCreateAccount />} />
                        <Route path='reset-password' element={<PatientResetPassword />} />
                        <Route path='*' element={<Navigate to='/not-found' />} />
                    </Route>
                    <Route path='*' element={<Navigate to='/not-found' />} />
                </Route>

                {/* Admin Routes */}
                <Route path='/admin/*' element={<CheckAdminState />}>
                    <Route path='*' element={<Navigate to='/admin' />} />
                </Route>
                {/* Patient Routes */}
                <Route path='/patient/*' element={<CheckPatientState />}>
                    <Route path='*' element={<Navigate to='/admin' />} />
                </Route>

                {/* Not Found Route */}
                <Route path='/not-found' element={<NotFound />} />
                <Route path='*' element={<Navigate to='/not-found' />} />
            </Routes>
            {PUBLIC_PATHS.includes(currentPath) && <Footer />}
        </>
    );
};

export default AppRoutes;
