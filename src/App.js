/**
 * Application
 */

// Dependencies
import React, { useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
// import { server } from "./functions/server";

// Components
import Snackbar from "./components/Reusable/Snackbar";
import Backdrop from "./components/Reusable/Backdrop";

// App Config
import config from "./config";

// Application Routes
import AppRoutes from "./routes";

// Backend Routes
// import routes from './config/routes';
// const { site: { getIndex } } = routes;

// Error Handling Components
// import { ErrorBoundary } from 'react-error-boundary';
// import Error from './components/Error/Error';

function App() {
	useEffect(() => {
		// Get Site Details
		// server({...getIndex})
		// 		.then(res => console.log(res))
		// 		.catch(err => console.log(err))
	});
	return (
		<div className={`h-screen w-full`}>
			{/* Common Components  */}
			<Snackbar />
			<Backdrop />

			{/* Application Routes */}
			<Router>
				<AppRoutes />
			</Router>

		</div>
	);
}

export default App;
