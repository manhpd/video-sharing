import "./App.css";
import Register from "./components/Register";
import { Route, Routes, Navigate } from "react-router-dom";
import MovieList from "./components/MovieList";
import Cookies from "universal-cookie";
import { Share } from "./components/Share";
const cookies = new Cookies();

function App() {
  return (
    <>
      <Register/>
       {/* create routes here */}
       <Routes>
        <Route
          path="/list"
          element={
            <RequireAuth redirectTo="/">
              <MovieList />
            </RequireAuth>
          }
        />
        <Route
          path="/share"
          element={
            <RequireAuth redirectTo="/">
              <Share />
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