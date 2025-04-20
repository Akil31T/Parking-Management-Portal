import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import AdminsPage from "./pages/AdminsPage";
import ParkingAreasPage from "./pages/ParkingAreasPage";
import DriversPage from "./pages/DriversPage";
import BookingsPage from "./pages/BookingsPage";
import BookingDetailPage from "./pages/BookingDetailPage";
import TransactionsPage from "./pages/TransactionsPage";
import SupportTicketsPage from "./pages/SupportTicketsPage";
import TicketDetailPage from "./pages/TicketDetailPage";
import ProfilePage from "./pages/ProfilePage";
import ProtectedLayout from "./components/layout/ProtectedLayout";
import SettingsPage from "./pages/Setting";
import OwnerPage from "./pages/OwnerPage";
import OwnerDetailPage from "./pages/OwnersDetailsPage";
import FeaturesManagement from "./pages/FeaturesManagement";
import FeaturesDetails from "./pages/FeaturesDetails";
import VehicleManagement from "./pages/VehicleType";

export function AppRoutes() {
  return (
    <Routes>
      {/* Public Pages (No Sidebar, No Header) */}
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />

      {/* Protected Pages (With Sidebar & Header) */}
      <Route element={<ProtectedLayout />}>
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/admins" element={<AdminsPage />} />
        <Route path="/parking-areas" element={<ParkingAreasPage />} />
        <Route path="/drivers" element={<DriversPage />} />
        <Route path="/owner" element={<OwnerPage />} />
        <Route path="/owner/:ownerId" element={<OwnerDetailPage />} />
        <Route path="/features" element={<FeaturesManagement />} />
        <Route path="/features/:featuresId" element={<FeaturesDetails />} />
        <Route path="/vehicle" element={<VehicleManagement />} />

        <Route path="/bookings" element={<BookingsPage />} />
        <Route path="/bookings/:id" element={<BookingDetailPage />} />
        <Route path="/transactions" element={<TransactionsPage />} />
        <Route path="/support-tickets" element={<SupportTicketsPage />} />
        <Route path="/support-tickets/:id" element={<TicketDetailPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/settings" element={<SettingsPage />} />
      </Route>

      {/* Redirect unknown routes */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}
