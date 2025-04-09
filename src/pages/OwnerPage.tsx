import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Clock, CheckCircle, XCircle } from 'lucide-react';
import type { Booking } from '../types';
import apiCall from '../lib/apiCall';
import { API_ENDPOINTS } from '../lib/constant';

const OwnerPage: React.FC = () => {
    // Mock data
    const bookings: Booking[] = [
        {
            id: '1',
            parkingAreaId: '1',
            driverId: '1',
            startTime: new Date('2024-03-15T10:00:00'),
            endTime: new Date('2024-03-15T15:00:00'),
            status: 'active',
            totalAmount: 25
        },
        {
            id: '2',
            parkingAreaId: '2',
            driverId: '2',
            startTime: new Date('2024-03-16T09:00:00'),
            endTime: new Date('2024-03-16T12:00:00'),
            status: 'pending',
            totalAmount: 24
        }
    ];

    const getStatusIcon = (status: Booking['status']) => {
        switch (status) {
            case 'active':
                return <Clock className="h-5 w-5 text-blue-500" />;
            case 'completed':
                return <CheckCircle className="h-5 w-5 text-green-500" />;
            case 'cancelled':
                return <XCircle className="h-5 w-5 text-red-500" />;
            default:
                return <Clock className="h-5 w-5 text-yellow-500" />;
        }
    };

    const getStatusClass = (status: Booking['status']) => {
        switch (status) {
            case 'active':
                return 'bg-blue-100 text-blue-800';
            case 'completed':
                return 'bg-green-100 text-green-800';
            case 'cancelled':
                return 'bg-red-100 text-red-800';
            default:
                return 'bg-yellow-100 text-yellow-800';
        }
    };

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
            <h1 className="text-2xl font-bold text-gray-900 mb-6">Bookings</h1>

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
                                {/* <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Amount
                                </th> */}
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