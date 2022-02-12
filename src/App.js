/**
 * Application
 */

// Dependencies
import { BrowserRouter as Router } from 'react-router-dom';
import { QueryClientProvider, QueryClient } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import Snackbar from '@mui/material/Snackbar';
import { Alert } from '@mui/material';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

import { useSelector, useDispatch } from 'react-redux';

// App Config
import config from './config';

// Application Routes
import AppRoutes from './routes';

// States and actions
import { hideSnackbar } from './store/features/app';

// Error Handling Components
// import { ErrorBoundary } from 'react-error-boundary';
// import Error from './components/Error/Error';

const queryClient = new QueryClient();

function App() {
	const dispatch = useDispatch();
	const { snackbar, showLoading } = useSelector((state) => state.app.value);

	// Functions
	const handleSnackbarClose = () => {
		dispatch(hideSnackbar());
	};
	return (
		<div className={`w-full h-screen`}>
			<QueryClientProvider client={queryClient}>
				{/* Common App Snackbar  */}
				<Snackbar
					open={snackbar.display}
					autoHideDuration={4000}
					onClose={handleSnackbarClose}
					anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
				>
					<Alert
						onClose={handleSnackbarClose}
						severity={snackbar.type}
						variant='standard'
						className='w-full z-50'
					>
						{snackbar.message}
					</Alert>
				</Snackbar>

				{/* Common Backdrop */}
				<Backdrop className='text-white z-50' open={showLoading}>
					<CircularProgress color='inherit' />
				</Backdrop>
				<Router>
					<AppRoutes />
				</Router>

				{/* React Query Dev Tools */}
				{!config.isProduction && (
					<ReactQueryDevtools
						initialIsOpen={false}
						position='bottom-right'
					/>
				)}
			</QueryClientProvider>
		</div>
	);
}

export default App;
