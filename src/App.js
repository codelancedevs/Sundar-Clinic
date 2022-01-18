import { ErrorBoundary } from "react-error-boundary";
import Error from "./components/Error/Error";
import Logo from "./assets/logo/logo.svg";

function App() {
  return (
    <div className="App">
      <ErrorBoundary FallbackComponent={<Error />} onError={(error) => console.log(error)}>
        <img src={Logo} alt="Sundar Clinic Logo" />
      </ErrorBoundary>
    </div>
  );
}

export default App;
