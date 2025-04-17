import React, { useEffect, useState } from 'react';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import Modal from '../components/common/Modal';
import type { Driver } from '../types';
import apiCall from '../lib/apiCall';
import { API_ENDPOINTS, getStatusClass, getStatusIcon } from '../lib/constant';

const DriversPage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDriver, setSelectedDriver] = useState<Driver | null>(null);

  // Mock data
  const drivers: Driver[] = [
    {
      id: '1',
      name: 'Michael Brown',
      email: 'michael@example.com',
      phone: '+1 234-567-8901',
      vehicleNumber: 'ABC123'
    },
    {
      id: '2',
      name: 'Sarah Wilson',
      email: 'sarah@example.com',
      phone: '+1 234-567-8902',
      vehicleNumber: 'XYZ789'
    }
  ];

  const handleEdit = (driver: Driver) => {
    setSelectedDriver(driver);
    setIsModalOpen(true);
  };

  const handleDelete = (driverId: string) => {
    // Handle delete logic
    console.log('Delete driver:', driverId);
  };

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [sort, setSort] = useState('createdAt');
  const [order, setOrder] = useState('asc'); // or 'desc'
  const [filters, setFilters] = useState('');
  const [search, setSearch] = useState('');
  const [Customer, setCustomer] = useState([]);

  // Mock data

  useEffect(() => {
    const getCustomer = async () => {
      try {
        const queryParams = new URLSearchParams({
          page: page.toString(),
          limit: limit.toString(),
          sort: `${sort}:${order}`,
          filters,
          textSearch: search,
        }).toString();

        const response = await apiCall({
          method: "GET",
          endpoint: `${API_ENDPOINTS.Customer}?${queryParams}`,
        });

        setCustomer(response.data.data)
      } catch (error) {
        console.error("Login failed:", error);
        alert(error?.message || "Login failed. Please try again.");
      }
    };
    getCustomer()
  }, [page, limit, sort, order, filters, search]);

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Drivers</h1>
        <div className='gap-3'>
          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border px-3 py-1 rounded mb-4"
          />
          <select
            onChange={(e) => setFilters(e.target.value)}
            className="border px-2 py-1 rounded ml-4"
          >
            <option value="">All</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
        {/* <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          <Plus className="h-5 w-5 mr-2" />
          Add Driver
        </button> */}
      </div>

      <div className="bg-white rounded-lg shadow">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              {/* <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th> */}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {Customer.map((driver) => (
              <tr key={driver._id}>
                <td className="px-6 py-4 whitespace-nowrap">{driver.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">{driver.email}</td>
                <td className="px-6 py-4 whitespace-nowrap">{driver.phone.number}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    {getStatusIcon(driver.status)}
                    <span className={`ml-2 px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusClass(driver.status)}`}>
                      {driver.status.charAt(0).toUpperCase() + driver.status.slice(1)}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {/* <div className="flex space-x-3">
                    <button
                      onClick={() => handleEdit(driver)}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <Pencil className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => handleDelete(driver.id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div> */}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedDriver(null);
        }}
        title={selectedDriver ? 'Edit Driver' : 'Add New Driver'}
      >
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              defaultValue={selectedDriver?.name}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              defaultValue={selectedDriver?.email}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Phone</label>
            <input
              type="tel"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              defaultValue={selectedDriver?.phone}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Vehicle Number</label>
            <input
              type="text"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              defaultValue={selectedDriver?.vehicleNumber}
            />
          </div>
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              {selectedDriver ? 'Update' : 'Create'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default DriversPage;