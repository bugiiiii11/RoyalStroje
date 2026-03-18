import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import PortalLayout from './components/layout/PortalLayout';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import Catalog from './pages/Catalog';
import Booking from './pages/Booking';
import MyRentals from './pages/MyRentals';
import Profile from './pages/Profile';

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route element={<ProtectedRoute><PortalLayout /></ProtectedRoute>}>
            <Route index element={<Home />} />
            <Route path="/catalog" element={<Catalog />} />
            <Route path="/booking" element={<Booking />} />
            <Route path="/rentals" element={<MyRentals />} />
            <Route path="/profile" element={<Profile />} />
          </Route>

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}
