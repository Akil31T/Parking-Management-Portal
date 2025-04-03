import React from 'react';
import { useParams } from 'react-router-dom';
import { Clock, MapPin, User, Car, CreditCard } from 'lucide-react';

const BookingDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  // Mock data
  const booking = {
    id,
    parkingArea: {
      name: 'Downtown Parking',
      location: '123 Main St'
    },
    driver: {
      name: 'Michael Brown',
      email: 'michael@example.com',
      phone: '+1 234-567-8901',
      vehicleNumber: 'ABC123'
    },
    startTime: new Date('2024-03-15T10:00:00'),
    endTime: new Date('2024-03-15T15:00:00'),
    status: 'active',
    totalAmount: 25,
    paymentStatus: 'paid',
    notes: 'Vehicle parked in spot A12'
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Booking Details #{id}</h1>
        <div className="flex space-x-3">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            Edit Booking
          </button>
          <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">
            Print Receipt
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Parking Details</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="flex items-center text-gray-500 mb-2">
                  <MapPin className="h-5 w-5 mr-2" />
                  <span>Parking Area</span>
                </div>
                <p className="font-medium">{booking.parkingArea.name}</p>
                <p className="text-sm text-gray-500">{booking.parkingArea.location}</p>
              </div>
              <div>
                <div className="flex items-center text-gray-500 mb-2">
                  <Clock className="h-5 w-5 mr-2" />
                  <span>Duration</span>
                </div>
                <p className="font-medium">
                  {booking.startTime.toLocaleTimeString()} - {booking.endTime.toLocaleTimeString()}
                </p>
                <p className="text-sm text-gray-500">{booking.startTime.toLocaleDateString()}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Driver Information</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="flex items-center text-gray-500 mb-2">
                  <User className="h-5 w-5 mr-2" />
                  <span>Driver Details</span>
                </div>
                <p className="font-medium">{booking.driver.name}</p>
                <p className="text-sm text-gray-500">{booking.driver.email}</p>
                <p className="text-sm text-gray-500">{booking.driver.phone}</p>
              </div>
              <div>
                <div className="flex items-center text-gray-500 mb-2">
                  <Car className="h-5 w-5 mr-2" />
                  <span>Vehicle Details</span>
                </div>
                <p className="font-medium">Vehicle Number</p>
                <p className="text-sm text-gray-500">{booking.driver.vehicleNumber}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Payment Information</h2>
            <div className="space-y-4">
              <div>
                <div className="flex items-center text-gray-500 mb-2">
                  <CreditCard className="h-5 w-5 mr-2" />
                  <span>Payment Status</span>
                </div>
                <p className="font-medium capitalize">{booking.paymentStatus}</p>
              </div>
              <div>
                <p className="text-gray-500">Total Amount</p>
                <p className="text-2xl font-semibold">${booking.totalAmount}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Additional Notes</h2>
            <p className="text-gray-600">{booking.notes}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingDetailPage;