import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import DashboardLayout from './components/layout/DashboardLayout';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import NewDeal from './pages/deals/NewDeal';
import DealDetail from './pages/deals/DealDetail';
import EquipmentCatalog from './pages/equipment/EquipmentCatalog';
import ClientDirectory from './pages/clients/ClientDirectory';
import ClientDetail from './pages/clients/ClientDetail';
import CalendarView from './pages/calendar/CalendarView';
import InvoiceList from './pages/invoices/InvoiceList';
import InvoiceDetail from './pages/invoices/InvoiceDetail';
import Reports from './pages/reports/Reports';

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* Public */}
          <Route path="/login" element={<Login />} />

          {/* Protected dashboard routes */}
          <Route
            element={
              <ProtectedRoute>
                <DashboardLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Dashboard />} />
            <Route path="/deals/new" element={<NewDeal />} />
            <Route path="/deals/:id" element={<DealDetail />} />
            <Route path="/equipment" element={<EquipmentCatalog />} />
            <Route path="/clients" element={<ClientDirectory />} />
            <Route path="/clients/:id" element={<ClientDetail />} />
            <Route path="/calendar" element={<CalendarView />} />
            <Route path="/invoices" element={<InvoiceList />} />
            <Route path="/invoices/:id" element={<InvoiceDetail />} />
            <Route path="/reports" element={<Reports />} />
          </Route>

          {/* Catch-all */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}
