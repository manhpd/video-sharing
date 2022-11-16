import "./App.css";
import Register from "./components/Register";
import { Route, Routes, Navigate } from "react-router-dom";
import AuthComponent from "./components/AuthComponent";
import Cookies from "universal-cookie";
const cookies = new Cookies();

function App() {
  return (
    <>
      <Register/>
       {/* create routes here */}
       <Routes>
        <Route
          path="/auth"
          element={
            // Good! Do your composition here instead of wrapping <Route>.
            // This is really just inverting the wrapping, but it's a lot
            // more clear which components expect which props.
            <RequireAuth redirectTo="/">
              <AuthComponent />
            </RequireAuth>
          }
        />
      </Routes>
    </>
   
  );
}

function RequireAuth({ children, redirectTo }) {
  const token = cookies.get("TOKEN");
  return token ? children : <Navigate to={redirectTo} />;
}

export default App;