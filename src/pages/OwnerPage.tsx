import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Clock, CheckCircle, XCircle } from 'lucide-react';
import type { Booking } from '../types';
import apiCall from '../lib/apiCall';
import { API_ENDPOINTS, getStatusClass, getStatusIcon } from '../lib/constant';

const OwnerPage: React.FC = () => {

    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [sort, setSort] = useState('createdAt');
    const [order, setOrder] = useState('asc'); // or 'desc'
    const [filters, setFilters] = useState('');
    const [search, setSearch] = useState('');
    const [Owners, setOwners] = useState([]);

    // Mock data

    useEffect(() => {
        const getOwner = async () => {
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
                    endpoint: `${API_ENDPOINTS.Owner}?${queryParams}`,
                });

                setOwners(response.data.data)
            } catch (error) {
                console.error("Login failed:", error);
                alert(error?.message || "Login failed. Please try again.");
            }
        };
        getOwner()
    }, [page, limit, sort, order, filters, search]);

    return (
        <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-6">Owners</h1>

            <div className="bg-white rounded-lg shadow overflow-hidden">
                <div className="min-w-full">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead>
                            <tr>
                                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Name
                                </th>
                                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Email
                                </th>
                                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Mobile No
                                </th>
                                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Status
                                </th>
                                <th className="px-6 py-3 bg-gray-50"></th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {Owners.map((booking) => (
                                <tr key={booking._id}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                        {booking.name}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {booking.email}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        +{booking.phone.code}  {booking.phone.number}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            {getStatusIcon(booking.status)}
                                            <span className={`ml-2 px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusClass(booking.status)}`}>
                                                {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                                            </span>
                                        </div>
                                    </td>
                                    {/* <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        ${booking.totalAmount}
                                    </td> */}
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <Link
                                            to={`/owner/${booking._id}`}
                                            className="text-blue-600 hover:text-blue-900"
                                        >
                                            View Details
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default OwnerPage;