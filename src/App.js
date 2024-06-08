import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Signup from "./components/Signup";
import Login from "./components/Login";
import ProfilePhotoUpdate from "./components/ProfilePhotoUpdate";
import VerifyEmail from "./components/VerifyEmail";
import Home from "./components/Home";
import { UserProvider } from "./contexts/UserContext";
import ProtectedRoute from "./routes/ProtectedRoute";
import AuthenticatedRoute from "./routes/AuthenticatedRoute";
import UnauthenticatedRoute from "./routes/UnauthenticatedRoute";

function App() {
  return (
    <BrowserRouter>
      <UserProvider>
        <Navbar />
        <Routes>
          <Route
            path="/register"
            element={
              <UnauthenticatedRoute>
                <Signup />
              </UnauthenticatedRoute>
            }
          />
          <Route
            path="/login"
            element={
              <UnauthenticatedRoute>
                <Login />
              </UnauthenticatedRoute>
            }
          />
          <Route
            path="/verifyemail"
            element={
              <AuthenticatedRoute>
                <VerifyEmail />
              </AuthenticatedRoute>
            }
          />
          <Route
            path="/profileUpdate"
            element={
              <AuthenticatedRoute>
                <ProfilePhotoUpdate />
              </AuthenticatedRoute>
            }
          />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <div></div>
              </ProtectedRoute>
            }
          />
        </Routes>
      </UserProvider>
    </BrowserRouter>
  );
}

export default App;
