import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Signup from "./components/Signup";
import Login from "./components/Login";
import ProfilePhotoUpdate from "./components/ProfilePhotoUpdate";
import { UserProvider } from "./contexts/UserContext";

function App() {
  return (
    <BrowserRouter>
      <UserProvider>
        <Navbar />
        <Routes>
          <Route path="/register" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<div>Home Page</div>} />
          <Route path="/profileUpdate" element={<ProfilePhotoUpdate />} />
        </Routes>
      </UserProvider>
    </BrowserRouter>
  );
}

export default App;
