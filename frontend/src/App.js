import "./App.css";
import Register from "./components/Register";
import { Route, Routes, Navigate } from "react-router-dom";
import MovieList from "./components/MovieList";
import Cookies from "universal-cookie";
import { Share } from "./components/Share";
import My404Component from "./components/My404Component";
const cookies = new Cookies();

function App() {
  return (
    <div className="container">
      <Register />
      {/* create routes here */}
      <Routes>
        <Route
          path="/"
          element={
            <MovieList />
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
        <Route path='*' component={My404Component} />
      </Routes>
    </div>
  );
}

function RequireAuth({ children, redirectTo }) {
  const token = cookies.get("TOKEN");
  return token ? children : <Navigate to={redirectTo} />;
}

export default App;