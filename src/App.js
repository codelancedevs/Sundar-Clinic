import { ErrorBoundary } from "react-error-boundary";
import AppRoutes from "./components/AppRoutes/AppRoutes";
import Error from "./components/Error/Error";
import Logo from "./assets/logo.svg"

function App() {
  return (
    <div className="App">
      <ErrorBoundary FallbackComponent={<Error />} onError={(error) => console.log(error)}>
        <AppRoutes />
        <img src={Logo} alt="Sundar Clinic Logo"/>
      </ErrorBoundary>
    </div>
  );
}

export default App;
