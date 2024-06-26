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
import ForgotPassword from "./components/ForgetPassword";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";
import { useEffect } from "react";
import { useSelector } from "react-redux";

function App() {
  const isDarkMode = useSelector((state) => state.premium.isDarkMode);

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [isDarkMode]);

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
            path="/forgotpassword"
            element={
              <UnauthenticatedRoute>
                <ForgotPassword />
              </UnauthenticatedRoute>
            }
          />
          <Route path="/profileUpdate" element={<ProfilePhotoUpdate />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
                <ExpenseForm />
                <ExpenseList />
              </ProtectedRoute>
            }
          />
        </Routes>
      </UserProvider>
    </BrowserRouter>
  );
}
export default App;
