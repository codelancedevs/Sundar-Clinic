/**
 * Rendering Components Based on the Route
 */

// Dependencies
import { Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Home from '../pages/Home';
import NotFound from '../pages/NotFound';

const AppRoutes = () => {
    const loggedIn = useSelector(state => state.user.loggedIn);
	return <Routes>
        <Route exact path='/' element={<Home />}/>
        <Route path='*' element={<NotFound />} />
    </Routes>;
};

export default AppRoutes;
