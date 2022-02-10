import { ErrorBoundary } from 'react-error-boundary';
import Error from './components/Error/Error';
import Logo from './assets/logo/logo.svg';
import { useSelector, useDispatch } from 'react-redux';
import { rotate } from './store/features/test'

function App() {
  const dispatch = useDispatch();
  const rotateVal = useSelector((state) => state.test.value);
  
  return (
    <div className='w-full h-screen'>
      <ErrorBoundary
        FallbackComponent={<Error />}
        onError={(error) => console.log(error)}
      >
        <img
          src={Logo}
          alt='Sundar Clinic Logo'
          className={`mt-${rotateVal}`}
          onClick={() => {
            dispatch(rotate(2))
          }}
        />
      </ErrorBoundary>
    </div>
  );
}

export default App;


/**
 * Homepage
 *  Testimonials
 *  Latest Post
 * Contact
 * About
 * Gallery
 * Post
 * Admin
 *  Login and Signup
 *  Dashboard
 *    Admin Details
 *    Patient Details
 *      Search bar
 *      Selective Patient editing
 *    Site Details
*     Post Update
 * Patient
 *  Login and Signup
 *  Dashboard
 *    Account Details
 *    General Details
 *    Presenting Complaint
 *    History
 */
