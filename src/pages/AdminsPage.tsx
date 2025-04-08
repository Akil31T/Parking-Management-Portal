import React, { useEffect, useState } from 'react';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import Modal from '../components/common/Modal';
import type { Admin, AdminUser, User } from '../types';
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import apiCall from '../lib/apiCall';
import { API_ENDPOINTS } from '../lib/constant';
import Pagenation from '../components/pagenation';

const AdminsPage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAdmin, setSelectedAdmin] = useState<Admin | null>(null);


  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [countryCode, setCountryCode] = useState('');
  const [gender, setGender] = useState("male");
  const [about, setAbout] = useState("");
  const [status, setStatus] = useState("active");

  // Address State
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [pinCode, setPinCode] = useState("");
  const [location, setLocation] = useState(
    [80.2325252, 13.0560723]
  );
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [sort, setSort] = useState('createdAt');
  const [order, setOrder] = useState('asc'); // or 'desc'
  const [filters, setFilters] = useState('');
  const [search, setSearch] = useState('');
  // Mock data


  const handleEdit = (admin: AdminUser) => {
    // setSelectedAdmin(admin );
    setIsModalOpen(true);
  };

  const handleDelete = (adminId: string) => {
    console.log('Delete admin:', adminId);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addAdmin()
    setIsModalOpen(false);
    setSelectedAdmin(null);
  };

  const [isMapOpen, setIsMapOpen] = useState(false);
  const [selectedCity, setSelectedCity] = useState("");

  const handleLocationSelect = (address: any) => {
    setSelectedCity(address.city);
    setIsMapOpen(false);
  };
  const [phone, setPhone] = useState("")


  const addAdmin = async () => {

    const body = {
      name,
      email,
      phone: {
        number: Number(phone), // Convert to number
        code: Number(countryCode), // Ensure this is a number too
      },
      password: "Password@1234", // Consider taking password as input
      gender,
      photo: "string",
      about,
      user_type: "admin",
      addresses: [
        {
          type: "primary",
          city,
          country,
          pinCode,
          location,
        },
      ],
      status,
    };
    await apiCall({
      method: "POST",
      endpoint: API_ENDPOINTS.AddAdmin,
      body: body,
    });

  }

  const [users, setUsers] = useState<AdminUser[]>([]);

  const [searchInput, setSearchInput] = useState("");

  // Debounce the search input
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      setSearch(searchInput);
    }, 500); // 500ms delay

    return () => clearTimeout(delayDebounce);
  }, [searchInput]);

  useEffect(() => {
    const getUser = async () => {
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
          endpoint: `${API_ENDPOINTS.AddAdmin}?${queryParams}`,
        });

        setUsers(response.data.data)
      } catch (error) {
        console.error("Login failed:", error);
        alert(error?.message || "Login failed. Please try again.");
      }
    };
    getUser()
  }, [page, limit, sort, order, filters, search]);

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Administrators</h1>
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
          Add Admin
        </button> */}
      </div>

      <div className="bg-white rounded-lg shadow">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {users.map((admin) => (
              <tr key={admin._id}>
                <td className="px-6 py-4 whitespace-nowrap">{admin.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">{admin.email}</td>
                <td className="px-6 py-4 whitespace-nowrap">{admin.createdAt}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex space-x-3">
                    <button
                      onClick={() => handleEdit(admin)}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <Pencil className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => handleDelete(admin._id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Pagenation setPage={setPage} page={page} limit={limit} setLimit={setLimit} />
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedAdmin(null);
        }}
        title={selectedAdmin ? 'Edit Admin' : 'Add New Admin'}
      >
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              className="mt-1 p-2 block w-full rounded-md border h-[40px] border-gray-500"
              defaultValue={selectedAdmin?.name}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              className="mt-1 p-2 block w-full rounded-md border h-[40px] border-gray-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Phone</label>
              <div className="flex gap-8">
                <div className="w-16" style={{ height: "40px" }}>
                  <PhoneInput
                    country={"ae"}
                    value={countryCode}
                    onChange={(countryCode) => setCountryCode(countryCode)}
                    inputClass="form-control !w-full !py-2 !px-3 h-[20px] !border rounded-r-md border border-gray-300"                  />
                </div>
                <input
                  type="tel"
                  className="flex-1 rounded-md border border-gray-300"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Gender</label>
              <select
                className="mt-1 p-2 block w-full rounded-md border h-[40px] border-gray-500"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                required
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">About</label>
            <textarea
              className="mt-1 p-2 block w-full rounded-md border border-gray-500"
              rows={3}
              value={about}
              onChange={(e) => setAbout(e.target.value)}
            />
          </div>

          <div>
            <button onClick={() => setIsMapOpen(true)} className="p-2 bg-blue-500 text-white rounded-md">
              Select Location
            </button>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">City</label>
              <input
                type="text"
                className="mt-1 p-2 block w-full rounded-md border h-[40px] border-gray-500"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Country</label>
              <input
                type="text"
                className="mt-1 p-2 block w-full rounded-md border h-[40px] border-gray-500"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Pin Code</label>
              <input
                type="text"
                className="mt-1 p-2 block w-full rounded-md border h-[40px] border-gray-500"
                value={pinCode}
                onChange={(e) => setPinCode(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Status</label>
              <select
                className="mt-1 p-2 block w-full rounded-md border h-[40px] border-gray-500"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                required
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 border rounded-md">
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              {selectedAdmin ? 'Update' : 'Create'}
            </button>
          </div>


        </form>




      </Modal>
    </div>
  );
};

export default AdminsPage;