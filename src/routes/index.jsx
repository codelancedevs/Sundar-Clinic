/**
 * Rendering Components Based on the Route
 */

// Dependencies
import { Routes, Route, Navigate } from 'react-router-dom';
// import { useSelector } from 'react-redux';

// Public Pages
import Home from '../pages/Home';
import About from '../pages/About';
import Gallery from '../pages/Gallery';
import Contact from '../pages/Contact';
import Posts from '../pages/Posts';
import NotFound from '../pages/NotFound';
import TermsOfService from '../pages/TermsOfService';
import PrivacyPolicy from '../pages/PrivacyPolicy';

// Email Pages
import VerifyAccount from '../pages/Email/VerifyAccount';
import ResetPassword from '../pages/Email/ResetPassword';

// Admin Pages
import AdminLoginAndSignup from '../pages/Admin/LoginAndSignup';
import AdminDashboard from '../pages/Admin/Dashboard';

// Patient Pages
import PatientLoginAndSignup from '../pages/Patient/LoginAndSignup';
import PatientDashboard from '../pages/Patient/Dashboard';

const AppRoutes = () => {
    // const loggedIn = useSelector((state) => state.user.loggedIn);
    const loggedIn = {
        token: 'asfasfadf',
        loggedInAs: 'Patient'
    };
    return (
        <Routes>
            {/* Open Routes  */}
            <Route exact path='/'>
                <Route index element={<Home />} />
                <Route path='about' element={<About />} />
                <Route path='gallery' element={<Gallery />} />
                <Route path='posts' element={<Posts />} />
                <Route path='contact' element={<Contact />} />
                <Route path='termsOfService' element={<TermsOfService />} />
                <Route path='privacyPolicy' element={<PrivacyPolicy />} />
                <Route path='verifyAccount/authToken=:authToken&userId=:userId&type=:type' element={<VerifyAccount />} />
                <Route path='resetPassword/authToken=:authToken&userId=:userId&type=:type' element={<ResetPassword />} />
            </Route>

            {/* Admin Routes */}
            <Route path='/admin'>
                <Route index element={loggedIn && loggedIn?.loggedInAs === 'Admin' ? <AdminDashboard /> : <AdminLoginAndSignup />} />
                <Route path='*' element={<Navigate to='/admin' />} />
            </Route>

            {/* Patient Routes */}
            <Route path='/patient'>
                <Route index element={loggedIn && loggedIn?.loggedInAs === 'Patient' ? <PatientDashboard /> : <PatientLoginAndSignup />} />
                <Route path='*' element={<Navigate to='/patient' />} />
            </Route>

            {/* Not Found Route */}
            <Route path='*' element={<NotFound />} />
        </Routes>
    );
};

export default AppRoutes;
