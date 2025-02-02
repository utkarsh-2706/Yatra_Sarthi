import React, { useState } from 'react';
import { 
  format, 
  startOfMonth, 
  endOfMonth, 
  eachDayOfInterval, 
  isSameMonth, 
  isSameDay 
} from 'date-fns';
import { 
  Calendar,
  Filter,
  Search,
  Bell,
  Download,
  MoreVertical,
  CheckCircle,
  Clock,
  XCircle,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

interface Booking {
  id: string;
  customerName: string;
  destination: string;
  startDate: string;
  endDate: string;
  status: 'confirmed' | 'pending' | 'cancelled';
  amount: number;
  type: 'flight' | 'hotel' | 'package';
}

interface BookingFormData {
  customerName: string;
  destination: string;
  startDate: string;
  endDate: string;
  status: 'confirmed' | 'pending' | 'cancelled';
  amount: string;
  type: 'flight' | 'hotel' | 'package';
}

const mockBookings: Booking[] = [
  {
    id: 'BK001',
    customerName: 'John Doe',
    destination: 'Maldives',
    startDate: '2024-03-20',
    endDate: '2024-03-27',
    status: 'confirmed',
    amount: 2499.99,
    type: 'package'
  },
  {
    id: 'BK002',
    customerName: 'Alice Smith',
    destination: 'Dubai',
    startDate: '2024-03-25',
    endDate: '2024-04-01',
    status: 'pending',
    amount: 1899.99,
    type: 'hotel'
  },
  {
    id: 'BK003',
    customerName: 'Bob Johnson',
    destination: 'Singapore',
    startDate: '2024-04-05',
    endDate: '2024-04-12',
    status: 'cancelled',
    amount: 1299.99,
    type: 'flight'
  }
];

const statusColors = {
  confirmed: 'bg-green-100 text-green-800',
  pending: 'bg-yellow-100 text-yellow-800',
  cancelled: 'bg-red-100 text-red-800'
};

const statusIcons = {
  confirmed: CheckCircle,
  pending: Clock,
  cancelled: XCircle
};

export default function Bookings() {
  const [bookings, setBookings] = useState<Booking[]>(mockBookings);
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [formData, setFormData] = useState<BookingFormData>({
    customerName: '',
    destination: '',
    startDate: format(new Date(), 'yyyy-MM-dd'),
    endDate: format(new Date(), 'yyyy-MM-dd'),
    status: 'confirmed',
    amount: '',
    type: 'hotel'
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const getCalendarDays = (date: Date) => {
    const monthStart = startOfMonth(date);
    const monthEnd = endOfMonth(date);
    return eachDayOfInterval({ start: monthStart, end: monthEnd });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors: Record<string, string> = {};
    
    if (!formData.customerName) validationErrors.customerName = 'Required';
    if (!formData.destination) validationErrors.destination = 'Required';
    if (new Date(formData.startDate) > new Date(formData.endDate)) {
      validationErrors.date = 'End date must be after start date';
    }
    if (!formData.amount || isNaN(Number(formData.amount))) {
      validationErrors.amount = 'Invalid amount';
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const newBooking: Booking = {
      id: `BK${String(bookings.length + 1).padStart(3, '0')}`,
      ...formData,
      amount: parseFloat(formData.amount),
    };

    setBookings([...bookings, newBooking]);
    setShowCreateForm(false);
    setFormData({
      customerName: '',
      destination: '',
      startDate: format(new Date(), 'yyyy-MM-dd'),
      endDate: format(new Date(), 'yyyy-MM-dd'),
      status: 'confirmed',
      amount: '',
      type: 'hotel'
    });
    setErrors({});
  };

  const filteredBookings = bookings.filter(booking => {
    const matchesFilter = selectedFilter === 'all' || booking.status === selectedFilter;
    const matchesSearch = booking.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         booking.destination.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         booking.id.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 space-y-4 sm:space-y-0">
          <h1 className="text-2xl font-semibold text-gray-900">Bookings</h1>
          <div className="flex flex-wrap gap-2">
            <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700">
              <Bell className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Notifications</span>
            </button>
            <button className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50">
              <Download className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Export</span>
            </button>
          </div>
        </div>

        {/* Create Booking Section */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <div className="flex flex-col sm:flex-row justify-between items-center mb-4 space-y-4 sm:space-y-0">
            <h2 className="text-lg font-medium text-gray-900">Create New Booking</h2>
            <button
              onClick={() => setShowCreateForm(!showCreateForm)}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
            >
              {showCreateForm ? 'Cancel' : 'Create Booking'}
            </button>
          </div>

          {showCreateForm && (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Customer Name</label>
                  <input
                    type="text"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    value={formData.customerName}
                    onChange={(e) => setFormData({...formData, customerName: e.target.value})}
                  />
                  {errors.customerName && <p className="text-red-500 text-sm">{errors.customerName}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Destination</label>
                  <input
                    type="text"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    value={formData.destination}
                    onChange={(e) => setFormData({...formData, destination: e.target.value})}
                  />
                  {errors.destination && <p className="text-red-500 text-sm">{errors.destination}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Start Date</label>
                  <input
                    type="date"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    value={formData.startDate}
                    onChange={(e) => setFormData({...formData, startDate: e.target.value})}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">End Date</label>
                  <input
                    type="date"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    value={formData.endDate}
                    onChange={(e) => setFormData({...formData, endDate: e.target.value})}
                  />
                  {errors.date && <p className="text-red-500 text-sm">{errors.date}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Status</label>
                  <select
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    value={formData.status}
                    onChange={(e) => setFormData({...formData, status: e.target.value as any})}
                  >
                    <option value="confirmed">Confirmed</option>
                    <option value="pending">Pending</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Type</label>
                  <select
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    value={formData.type}
                    onChange={(e) => setFormData({...formData, type: e.target.value as any})}
                  >
                    <option value="flight">Flight</option>
                    <option value="hotel">Hotel</option>
                    <option value="package">Package</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Amount</label>
                  <input
                    type="number"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    value={formData.amount}
                    onChange={(e) => setFormData({...formData, amount: e.target.value})}
                  />
                  {errors.amount && <p className="text-red-500 text-sm">{errors.amount}</p>}
                </div>
              </div>

              <button
                type="submit"
                className="inline-flex justify-center w-full py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700"
              >
                Create Booking
              </button>
            </form>
          )}
        </div>

        {/* Search and Filter Section */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <div className="flex-1">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="Search bookings..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            <div className="flex space-x-4">
              <select
                className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                value={selectedFilter}
                onChange={(e) => setSelectedFilter(e.target.value)}
              >
                <option value="all">All Bookings</option>
                <option value="confirmed">Confirmed</option>
                <option value="pending">Pending</option>
                <option value="cancelled">Cancelled</option>
              </select>
              <button className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50">
                <Filter className="h-4 w-4 mr-2" />
                <span className="hidden sm:inline">More Filters</span>
              </button>
            </div>
          </div>
        </div>

        {/* Calendar View */}
        <div className="bg-white rounded-lg shadow mb-6">
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-medium text-gray-900">Calendar View</h2>
              <div className="flex space-x-2">
                <button
                  onClick={() => setCurrentMonth(new Date(currentMonth.setMonth(currentMonth.getMonth() - 1)))}
                  className="p-2 rounded-full hover:bg-gray-100"
                >
                  <ChevronLeft className="h-5 w-5 text-gray-600" />
                </button>
                <span className="text-sm font-medium text-gray-900">
                  {format(currentMonth, 'MMMM yyyy')}
                </span>
                <button
                  onClick={() => setCurrentMonth(new Date(currentMonth.setMonth(currentMonth.getMonth() + 1)))}
                  className="p-2 rounded-full hover:bg-gray-100"
                >
                  <ChevronRight className="h-5 w-5 text-gray-600" />
                </button>
              </div>
            </div>
            <div className="grid grid-cols-7 gap-px bg-gray-200 rounded-lg overflow-hidden">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                <div key={day} className="bg-gray-50 py-2 text-center text-sm font-medium text-gray-500">
                  {day}
                </div>
              ))}
              {getCalendarDays(currentMonth).map((date, index) => {
                const dayBookings = bookings.filter(booking => 
                  isSameDay(new Date(booking.startDate), date) || 
                  isSameDay(new Date(booking.endDate), date)
                );

                return (
                  <div
                    key={index}
                    className={`bg-white p-2 h-24 border-t border-gray-200 text-sm ${
                      !isSameMonth(date, currentMonth) ? 'bg-gray-50' : ''
                    }`}
                  >
                    <div className="flex justify-between">
                      <span className={`${!isSameMonth(date, currentMonth) ? 'text-gray-400' : ''}`}>
                        {format(date, 'd')}
                      </span>
                    </div>
                    <div className="mt-1 overflow-y-auto max-h-16">
                      {dayBookings.map(booking => (
                        <div
                          key={booking.id}
                          className={`text-xs p-1 mb-1 rounded truncate ${statusColors[booking.status]}`}
                        >
                          {booking.customerName}
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Bookings List */}
        <div className="bg-white shadow rounded-lg">
          <div className="flex flex-col">
            <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                <div className="overflow-hidden border-b border-gray-200">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Booking Details
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Customer
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Dates
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Amount
                        </th>
                        <th scope="col" className="relative px-6 py-3">
                          <span className="sr-only">Actions</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {filteredBookings.map((booking) => {
                        const StatusIcon = statusIcons[booking.status];
                        return (
                          <tr key={booking.id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <div>
                                  <div className="text-sm font-medium text-gray-900">
                                    {booking.id}
                                  </div>
                                  <div className="text-sm text-gray-500">
                                    {booking.destination}
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900">{booking.customerName}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900">
                                {format(new Date(booking.startDate), 'MMM d, yyyy')}
                              </div>
                              <div className="text-sm text-gray-500">
                                to {format(new Date(booking.endDate), 'MMM d, yyyy')}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColors[booking.status]}`}>
                                <StatusIcon className="h-4 w-4 mr-1" />
                                {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              ₹{booking.amount.toFixed(2)}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                              <button className="text-gray-400 hover:text-gray-500">
                                <MoreVertical className="h-5 w-5" />
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}