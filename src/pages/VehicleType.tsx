
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Pencil, Trash2, Plus } from 'lucide-react';
import apiCall from '../lib/apiCall';
import { API_ENDPOINTS, getStatusClass, getStatusIcon } from '../lib/constant';
import { Modal } from 'react-bootstrap';
import DeleteModal from '../components/DeleteModel';
import Pagenation from '../components/pagenation';

interface Feature {
    _id: string;
    name: string;
    description: string;
    status: string;
}

const VehicleManagement: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);


    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(5);
    const [totalCount, setTotalCount] = useState(0);

    const [sort, setSort] = useState('createdAt');
    const [order, setOrder] = useState('asc'); // or 'desc'
    const [filters, setFilters] = useState('');
    const [search, setSearch] = useState('');
    const [Vehicle, setVehicle] = useState([]);
    const [selectedFeature, setSelectedFeature] = useState<Feature | null>(null);

    // Mock data
    const getVehicle = async () => {
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
                endpoint: `${API_ENDPOINTS.Vehicle}?${queryParams}`,
            });
            console.log(response.data.data)
            setVehicle(response.data.data)
            setTotalCount(response.data.totalCount); 
        } catch (error) {
            console.error("Login failed:", error);
            alert(error?.message || "Login failed. Please try again.");
        }
    };
    useEffect(() => {

        getVehicle()
    }, [page, limit, sort, order, filters, search]);

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState('active');

    useEffect(() => {
        if (selectedFeature) {
            setName(selectedFeature.name);
            setDescription(selectedFeature.description);
            setStatus(selectedFeature.status || 'active');
        }
    }, [selectedFeature]);

    const onSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        const updatedFeature = {
            name: name.trim(),
            description: description.trim(),
        };

        console.log(updatedFeature); // Debug to check form data

        try {
            await apiCall({
                method: selectedFeature ? 'PUT' : 'POST',
                endpoint: selectedFeature
                    ? `${API_ENDPOINTS.Vehicle}/${selectedFeature._id}`
                    : `${API_ENDPOINTS.Vehicle}`,
                body: updatedFeature,
            });
            setIsModalOpen(false);
            getVehicle()
        } catch (error) {
            console.error('Failed to update feature:', error);
            alert('Failed to update the feature. Please try again.');
        }
    };

    const handleEdit = async (feature: Feature) => {
        setSelectedFeature(feature);
        setIsModalOpen(true);
    };
    const handleDelete = async (featureId: string) => {
        console.log('Delete admin:', featureId);
        await apiCall({
            method: "DELETE",
            endpoint: `${API_ENDPOINTS.Vehicle}/${featureId}`,
        });
        setIsDeleteOpen(false);
        getVehicle()
    };
    const openDeleteModal = (feature) => {
        setSelectedFeature(feature);  // Set the selected feature for deletion
        setIsDeleteOpen(true);         // Open the delete modal
    };
    const closeDeleteModal = () => {
        setIsDeleteOpen(false);
        setSelectedFeature(null);
    };
    const handleAdd = () => {
        setSelectedFeature(null);
        setName('');
        setDescription('');
        setStatus('active');
        setIsModalOpen(true);
    };
    return (
        <div>
            <div className="flex justify-between items-center mb-6">

                <h1 className="text-2xl font-bold text-gray-900 mb-6">Vehicle Management</h1>
                {/* <div className='gap-3'>
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
                </div> */}

                <button
                    onClick={handleAdd}
                    className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                    <Plus className="h-5 w-5 mr-2" />
                    Add Vehicle
                </button>
            </div>
            <div className="bg-white rounded-lg shadow overflow-hidden">
                <div className="min-w-full">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead>
                            <tr>
                                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Name
                                </th>
                                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Description
                                </th>

                                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Status
                                </th>
                                <th className="px-6 py-3 bg-gray-50"></th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {Vehicle.map((Vehicle) => (
                                <tr key={Vehicle._id}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                        {Vehicle.name}
                                    </td>
                                    <td className="px-6 py-4 w-[20%]whitespace-nowrap text-sm text-gray-500">
                                        {Vehicle.description}
                                    </td>

                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            {getStatusIcon(Vehicle.status)}
                                            <span className={`ml-2 px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusClass(Vehicle.status)}`}>
                                                {Vehicle.status.charAt(0).toUpperCase() + Vehicle.status.slice(1)}
                                            </span>
                                        </div>
                                    </td>

                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <div className="flex space-x-3 gap-5">
                                            <Link
                                                to={`/Vehicle/${Vehicle._id}`}
                                                className="text-blue-600 hover:text-blue-900"
                                            >
                                                View Details
                                            </Link>


                                            <button
                                                onClick={() => handleEdit(Vehicle)}
                                                className="text-blue-600 hover:text-blue-800"
                                            >
                                                <Pencil className="h-5 w-5" />

                                            </button>

                                            <button
                                                onClick={() => openDeleteModal(Vehicle)}
                                                className="text-red-600 hover:text-red-800 ml-4"
                                            >
                                                <Trash2 className="h-5 w-5" />
                                            </button>
                                            <DeleteModal
                                                isOpen={isDeleteOpen}
                                                onClose={closeDeleteModal}
                                                onConfirm={() => handleDelete(selectedFeature?._id)}
                                            />


                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                     
                    </table>

                    {totalCount > 5 && (

<Pagenation setPage={setPage} page={page} limit={limit} setLimit={setLimit} />
)}
                </div>

                <Modal
                    show={isModalOpen}
                    onClose={() => {
                        setIsModalOpen(false);
                        setSelectedFeature(null);
                    }}
                    title={selectedFeature ? 'Edit Feature' : 'Add New Feature'}
                >
                    <form onSubmit={onSubmit} className="space-y-4 p-10">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Name</label>
                            <input
                                type="text"
                                className="mt-1 p-2 block w-full rounded-md border h-[40px] border-gray-500"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Description</label>
                            <textarea
                                className="mt-1 p-2 block w-full rounded-md border border-gray-500"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Status</label>
                            <select
                                className="mt-1 p-2 block w-full rounded-md border h-[40px] border-gray-500"
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}
                            >
                                <option value="active">Active</option>
                                <option value="inactive">Inactive</option>
                            </select>
                        </div>

                        <div className="flex justify-end space-x-3 pt-4">
                            <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 border rounded-md">
                                Cancel
                            </button>
                            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                                {selectedFeature ? 'Update' : 'Create'}
                            </button>
                        </div>
                    </form>
                </Modal>
            </div>

        </div>
    );
};

export default VehicleManagement;