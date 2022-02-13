/**
 * Application
 */

// Dependencies
import { BrowserRouter as Router } from "react-router-dom";
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

// Components
import SnackbarComponent from "./components/Reusable/SnackbarComponent";
import BackdropComponent from "./components/Reusable/BackdropComponent";

// App Config
import config from "./config";

// Application Routes
import AppRoutes from "./routes";


// Error Handling Components
// import { ErrorBoundary } from 'react-error-boundary';
// import Error from './components/Error/Error';

const queryClient = new QueryClient();

function App() {
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
