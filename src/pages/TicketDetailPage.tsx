import React from 'react';
import { useParams } from 'react-router-dom';
import { MessageSquare, User, Clock, Send } from 'lucide-react';

const TicketDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  // Mock data
  const ticket = {
    id,
    subject: 'Unable to find parking spot',
    description: 'I booked a spot but cannot locate it in the parking area.',
    status: 'in-progress',
    createdAt: new Date('2024-03-15T10:00:00'),
    updatedAt: new Date('2024-03-15T11:30:00'),
    user: {
      name: 'Michael Brown',
      email: 'michael@example.com'
    },
    messages: [
      {
        id: '1',
        userId: '1',
        message: 'I cannot find my parking spot. I\'ve been driving around for 10 minutes.',
        timestamp: new Date('2024-03-15T10:00:00'),
        isCustomer: true
      },
      {
        id: '2',
        userId: '2',
        message: 'I apologize for the inconvenience. Your spot is in Section A, spot number 12. There should be clear signage. Let me know if you still have trouble finding it.',
        timestamp: new Date('2024-03-15T10:15:00'),
        isCustomer: false
      },
      {
        id: '3',
        userId: '1',
        message: 'Found it, thank you!',
        timestamp: new Date('2024-03-15T10:30:00'),
        isCustomer: true
      }
    ]
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Support Ticket #{id}</h1>
        <div className="flex space-x-3">
          <select className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
            <option value="open">Open</option>
            <option value="in-progress" selected>In Progress</option>
            <option value="resolved">Resolved</option>
          </select>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            Update Status
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow mb-6">
            <div className="p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-2">{ticket.subject}</h2>
              <p className="text-gray-600">{ticket.description}</p>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow">
            <div className="p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Conversation</h2>
              <div className="space-y-6">
                {ticket.messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.isCustomer ? '' : 'flex-row-reverse'}`}
                  >
                    <div className={`flex-1 ${message.isCustomer ? 'mr-4' : 'ml-4'}`}>
                      <div
                        className={`rounded-lg p-4 ${
                          message.isCustomer
                            ? 'bg-gray-100'
                            : 'bg-blue-50'
                        }`}
                      >
                        <p className="text-gray-800">{message.message}</p>
                      </div>
                      <p className={`text-sm text-gray-500 mt-1 ${
                        message.isCustomer ? '' : 'text-right'
                      }`}>
                        {message.timestamp.toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Type your message..."
                    className="w-full rounded-lg border-gray-300 pr-12 focus:border-blue-500 focus:ring-blue-500"
                  />
                  <button className="absolute right-2 top-1/2 -translate-y-1/2 text-blue-600 hover:text-blue-700">
                    <Send className="h-6 w-6" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Ticket Details</h2>
            <div className="space-y-4">
              <div>
                <div className="flex items-center text-gray-500 mb-2">
                  <MessageSquare className="h-5 w-5 mr-2" />
                  <span>Status</span>
                </div>
                <p className="font-medium capitalize">{ticket.status.replace('-', ' ')}</p>
              </div>
              <div>
                <div className="flex items-center text-gray-500 mb-2">
                  <Clock className="h-5 w-5 mr-2" />
                  <span>Created</span>
                </div>
                <p className="font-medium">{ticket.createdAt.toLocaleString()}</p>
              </div>
              <div>
                <div className="flex items-center text-gray-500 mb-2">
                  <Clock className="h-5 w-5 mr-2" />
                  <span>Last Updated</span>
                </div>
                <p className="font-medium">{ticket.updatedAt.toLocaleString()}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Customer Information</h2>
            <div className="space-y-4">
              <div>
                <div className="flex items-center text-gray-500 mb-2">
                  <User className="h-5 w-5 mr-2" />
                  <span>Customer</span>
                </div>
                <p className="font-medium">{ticket.user.name}</p>
                <p className="text-sm text-gray-500">{ticket.user.email}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicketDetailPage;