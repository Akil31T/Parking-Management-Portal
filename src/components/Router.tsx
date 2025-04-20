import { Navigate, Route, Routes } from "react-router-dom";
import Header from "./layout/Header";
import Sidebar from "./layout/Sidebar";
import AdminsPage from "../pages/AdminsPage";
import BookingDetailPage from "../pages/BookingDetailPage";
import BookingsPage from "../pages/BookingsPage";
import DashboardPage from "../pages/DashboardPage";
import DriversPage from "../pages/DriversPage";
import ParkingAreasPage from "../pages/ParkingAreasPage";
import ProfilePage from "../pages/ProfilePage";
import SupportTicketsPage from "../pages/SupportTicketsPage";
import TicketDetailPage from "../pages/TicketDetailPage";
import TransactionsPage from "../pages/TransactionsPage";
import OwnerPage from "../pages/OwnerPage";
import FeaturesManagement from "../pages/FeaturesManagement";
import VehicleManagement from "../pages/VehicleType";

export default function PageRouter() {
  return (
    <>
      <div className="min-h-screen bg-gray-100">
        <Header />
        <div className="flex">
          <Sidebar />
          <main className="flex-1 p-8">
            <Routes>
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/admins" element={<AdminsPage />} />
              <Route path="/parking-areas" element={<ParkingAreasPage />} />
              <Route path="/drivers" element={<DriversPage />} />
              <Route path="/bookings" element={<BookingsPage />} />
              <Route path="/features" element={<FeaturesManagement />} />
              <Route path="/owner" element={<OwnerPage/>} />
              <Route path="/vehicle" element={<VehicleManagement/>} />

              <Route path="/bookings/:id" element={<BookingDetailPage />} />
              <Route path="/transactions" element={<TransactionsPage />} />
              <Route path="/support-tickets" element={<SupportTicketsPage />} />
              <Route
                path="/support-tickets/:id"
                element={<TicketDetailPage />}
              />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="*" element={<Navigate to="/dashboard" replace />} />
              </Routes>
          </main>
        </div>
      </div>
    </>
  );
}
