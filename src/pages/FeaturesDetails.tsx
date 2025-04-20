import React, { useEffect, useState } from 'react';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import Modal from '../components/common/Modal';
import type { ParkingArea } from '../types';
import apiCall from '../lib/apiCall';
import { API_ENDPOINTS } from '../lib/constant';

const FeaturesDetails: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedArea, setSelectedArea] = useState<ParkingArea | null>(null);
    const [featureDetails, setFeatureDetails] = useState({
        _id: "",
        name: "",
        description: "",
        status: "",
        createdBy: "",
        createdAt: "",
        updatedAt: "",
        __v: 0,
    }); const FeaturesIds = window.location.pathname.split("/").pop();


    useEffect(() => {
        const getFeature = async () => {
            try {
                const response = await apiCall({
                    method: "GET",
                    endpoint: `${API_ENDPOINTS.Features}/${FeaturesIds}`,
                });

                setFeatureDetails(response.data); // Set the fetched object directly
            } catch (error) {
                console.error("Failed to load feature:", error);
                alert(error?.message || "Something went wrong.");
            }
        };

        getFeature();
    }, []);


    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-900">Features Details</h1>

            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-white rounded-lg shadow p-6">
                    <div className="flex justify-between items-start mb-4">
                        <div>
                            <h3 className="text-lg font-semibold text-gray-900">{featureDetails.name}</h3>
                        </div>
                        <div className="flex space-x-2">
                            <p
                                className={`capitalize p-2 rounded text-white ${featureDetails.status === "active"
                                    ? "bg-green-500"
                                    : "bg-red-500"
                                    }`}
                            >
                                {featureDetails.status}
                            </p>

                        </div>
                    </div>

                    <div className="space-y-2">
                        <div>
                            <h3 className="text-lg font-semibold text-gray-500">{featureDetails.description}</h3>
                        </div>

                    </div>
                </div>
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
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            defaultValue={selectedArea?.name}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Location</label>
                        <input
                            type="text"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            defaultValue={selectedArea?.location}
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Total Spots</label>
                            <input
                                type="number"
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                defaultValue={selectedArea?.totalSpots}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Price per Hour</label>
                            <input
                                type="number"
                                step="0.01"
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                defaultValue={selectedArea?.pricePerHour}
                            />
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

export default FeaturesDetails;