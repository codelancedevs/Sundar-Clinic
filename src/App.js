/**
 * Application
 */

// Dependencies
import React, { useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { server } from "./functions/server";

// Components
import SnackbarComponent from "./components/Reusable/SnackbarComponent";
import BackdropComponent from "./components/Reusable/BackdropComponent";

// App Config
import config from "./config";

// Application Routes
import AppRoutes from "./routes";

// Backend Routes 
import routes from './config/routes';
const { site: { getIndex } } = routes;

// Error Handling Components
// import { ErrorBoundary } from 'react-error-boundary';
// import Error from './components/Error/Error';

// Initializing Query Client
const queryClient = new QueryClient();

function App() {
	useEffect(() => {
		// Get Site Details
		// server({...getIndex})
		// 		.then(res => console.log(res))
		// 		.catch(err => console.log(err))
	});
	return (
		<div className={`h-screen w-full`}>
			<QueryClientProvider client={queryClient}>

				{/* Common Snackbar Component  */}
				<SnackbarComponent />
				{/* Common Backdrop Component */}
				<BackdropComponent />

				{/* Application Routes */}
				<Router>
					<AppRoutes />
				</Router>

				{/* React Query Dev Tools */}
				{config.isProduction && (
					<ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
				)}
			</QueryClientProvider>
		</div>
	);
}

export default App;
