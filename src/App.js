/**
 * Application
 */

// Dependencies
import { BrowserRouter as Router } from "react-router-dom";
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

import { useSelector, useDispatch } from "react-redux";
import SnackbarComponent from "./components/Reusable/SnackbarComponent";

// App Config
import config from "./config";

// Application Routes
import AppRoutes from "./routes";

// States and actions
import { hideSnackbar } from "./store/features/app";

// Error Handling Components
// import { ErrorBoundary } from 'react-error-boundary';
// import Error from './components/Error/Error';

const queryClient = new QueryClient();

function App() {
	const dispatch = useDispatch();
	const { showLoading } = useSelector((state) => state.app.value);

	// Functions
	const handleSnackbarClose = () => {
		console.log("clicked");
		dispatch(hideSnackbar());
	};
	return (
		<div className={`h-screen w-full`}>
			<QueryClientProvider client={queryClient}>
				<SnackbarComponent />

				{/* Common Backdrop */}
				<Backdrop className="z-50 text-white" open={showLoading}>
					<CircularProgress color="inherit" />
				</Backdrop>
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
