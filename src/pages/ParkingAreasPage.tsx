import React, { useEffect, useState } from 'react';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import Modal from '../components/common/Modal';
import type { ImageUrl, ParkingArea } from '../types';
import apiCall from '../lib/apiCall';
import { API_ENDPOINTS } from '../lib/constant';

const ParkingAreasPage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedArea, setSelectedArea] = useState<ParkingArea | null>(null);

  const handleEdit = async (area) => {
    const response = await apiCall({
      method: "GET",
      endpoint: `${API_ENDPOINTS.EditProperties}${area}`,
    });
    setSelectedArea(response.data);
    setIsModalOpen(true);
  };

  const handleDelete = (areaId: string) => {
    console.log('Delete area:', areaId);
  };

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [sort, setSort] = useState('createdAt');
  const [order, setOrder] = useState('asc'); // or 'desc'
  const [filters, setFilters] = useState('');
  const [search, setSearch] = useState('');
  const [Properties, setProperties] = useState([]);
  const [selectedVehicle, setSelectedVehicle] = useState<ImageUrl>();

  // Mock data
console.log(selectedArea.type, 'selectedArea');

  useEffect(() => {
    const getProperties = async () => {
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
          endpoint: `${API_ENDPOINTS.Properties}?${queryParams}`,
        });

        setProperties(response.data.data)
      } catch (error) {
        console.error("Login failed:", error);
        alert(error?.message || "Login failed. Please try again.");
      }
    };
    const getImageUrl = async () => {
      try {
        const response = await apiCall({
          method: "GET",
          endpoint: `${API_ENDPOINTS.Photo}?key=${selectedArea.type || ''}`,
        });
        setSelectedVehicle(response.data)
      } catch (error) {
        console.error("Login failed:", error);
        alert(error?.message || "Login failed. Please try again.");
      }
    };
    getProperties()
    getImageUrl()
  }, [page, limit, sort, order, filters, search]);


  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Parking Areas</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          <Plus className="h-5 w-5 mr-2" />
          Add Parking Area
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Properties.map((area) => (
          <div key={area._id} className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{area.name}</h3>
                <p className="text-gray-500">{area.type}</p>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleEdit(area._id)}
                  className="text-blue-600 hover:text-blue-800"
                >
                  <Pencil className="h-5 w-5" />
                </button>
                <button
                  onClick={() => handleDelete(area.id)}
                  className="text-red-600 hover:text-red-800"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <div>
                <h3 className="text-lg font-semibold text-gray-500">{area.name}</h3>
                <span className="font-medium">{area.address.street},{area.address.city},{area.address.state},{area.address.country} - {area.address.pinCode}</span>

              </div>

            </div>
          </div>
        ))}
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedArea(null);
        }}
        title={selectedArea ? 'Edit Parking Area' : 'Add New Parking Area'}
      >
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              className="mt-1 block p-2 w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              defaultValue={selectedArea?.name}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Location</label>
            <input
              type="text"
              className="mt-1 block p-2 w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              defaultValue={`${selectedArea?.address.street},${selectedArea?.address.city},${selectedArea?.address.state},${selectedArea?.address.country} - ${selectedArea?.address.pinCode}`}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Vehicle Types Allowed</label>
              <select
                className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                defaultValue={(selectedArea?.vehicle_types_allowed?.[0]?._id) || ''}
              >
                {(selectedArea?.vehicle_types_allowed as any[])?.map((vehicle) => (
                  <option key={vehicle._id} value={vehicle._id}>
                    {vehicle.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="inline-block text-sm font-medium text-gray-700">Features</label>
              <div className='p-2'>
                {(selectedArea?.features as any[])?.map((Features) => (
                  <option key={Features._id} value={Features._id}>
                    {Features.name}
                  </option>
                ))}
              </div>
              {/* <input
                type="number"
                step="0.01"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                defaultValue={selectedArea?.pricePerHour}
              /> */}
            </div>
            <div className='grid grid-row-2 gap-4'>
              {selectedVehicle && selectedVehicle.signedUrl && (
                <img
                  src={selectedVehicle.signedUrl}
                  alt="Photo"
                  style={{
                    width: '300px',
                    height: '200px',
                    objectFit: 'cover',
                    margin: '10px',
                  }}
                />
              )}
            </div>
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
              {selectedArea ? 'Update' : 'Create'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default ParkingAreasPage;