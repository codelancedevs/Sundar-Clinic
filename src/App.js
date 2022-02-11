/**
 * Application
 */

// Dependencies
import { BrowserRouter as Router } from 'react-router-dom';
import Logo from './assets/logo/logo.svg';
import { useSelector, useDispatch } from 'react-redux';
import { rotate } from './store/features/test';
import AppRoutes from './routes';
// import { ErrorBoundary } from 'react-error-boundary';
// import Error from './components/Error/Error';

function App() {
	const dispatch = useDispatch();
	const rotateVal = useSelector((state) => state.test.value);
	console.log(rotateVal);
	return (
		<div className={`w-full h-screen bg-blue-${rotateVal}`}>
			{/* <ErrorBoundary
				FallbackComponent={<Error />}
				onError={(error) => console.log(error)}
			> */}
			<Router>
				<AppRoutes />
				<img
					src={Logo}
					alt='Sundar Clinic Logo'
					onClick={() => {
						dispatch(rotate());
					}}
				/>
			</Router>
			{/* </ErrorBoundary> */}
		</div>
	);
}

export default App;
