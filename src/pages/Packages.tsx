import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { 
  Plane, 
  Calendar, 
  Users, 
  DollarSign, 
  Hotel, 
  Map, 
  Car, 
  Shield,
  Palmtree,
  Utensils,
  Camera,
  Mountain,
  ChevronRight,
  ChevronLeft,
  Globe
} from 'lucide-react';

interface PackageFormData {
  tripType: string;
  destination: string;
  startDate: string;
  endDate: string;
  travelers: number;
  childrenCount: number;
  budget: string;
  accommodationType: string;
  activities: string[];
  transportation: string;
  extras: string[];
}

interface ItineraryDay {
  day: number;
  title: string;
  description: string;
  activities: {
    time: string;
    description: string;
    image?: string;
  }[];
}

interface PresetItinerary {
  id: string;
  title: string;
  description: string;
  duration: string;
  price: string;
  image: string;
  days: ItineraryDay[];
}

const presetItineraries: PresetItinerary[] = [
  {
    id: 'india',
    title: 'Incredible India',
    description: 'Experience the rich culture and heritage of India',
    duration: '10 Days',
    price: 'From ₹2,499',
    image: 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=800',
    days: [
      {
        day: 1,
        title: "Arrival in Delhi",
        description: "Welcome to India's capital city!",
        activities: [
          {
            time: "Morning",
            description: "Arrive at Indira Gandhi International Airport, transfer to hotel",
            image: "https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=800"
          },
          {
            time: "Evening",
            description: "Explore Connaught Place, welcome dinner with traditional North Indian cuisine",
            image: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=800"
          }
        ]
      },
      {
        day: 2,
        title: "Old Delhi Tour",
        description: "Explore the historic heart of Delhi",
        activities: [
          {
            time: "Morning",
            description: "Visit Red Fort and take a rickshaw ride through Chandni Chowk",
            image: "https://images.unsplash.com/photo-1585136917972-7697357e8e26?auto=format&fit=crop&w=800"
          },
          {
            time: "Afternoon",
            description: "Visit Jama Masjid and enjoy a street food tour",
            image: "https://images.unsplash.com/photo-1566552881560-0be862a7c445?auto=format&fit=crop&w=800"
          }
        ]
      }
    ]
  },
  {
    id: 'thailand',
    title: 'Thailand Adventure',
    description: 'Discover the beauty of Thailand',
    duration: '7 Days',
    price: 'From ₹1,899',
    image: 'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?auto=format&fit=crop&w=800',
    days: [
      {
        day: 1,
        title: "Welcome to Bangkok",
        description: "Begin your Thai adventure in the vibrant capital",
        activities: [
          {
            time: "Morning",
            description: "Arrive at Suvarnabhumi Airport, transfer to hotel",
            image: "https://images.unsplash.com/photo-1583417319070-4a69db38a482?auto=format&fit=crop&w=800"
          },
          {
            time: "Evening",
            description: "Visit Grand Palace and Wat Phra Kaew",
            image: "https://images.unsplash.com/photo-1563492065599-3520f775eeed?auto=format&fit=crop&w=800"
          }
        ]
      }
    ]
  },
  {
    id: 'japan',
    title: 'Japan Explorer',
    description: 'Journey through modern and traditional Japan',
    duration: '12 Days',
    price: 'From ₹3,299',
    image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=800',
    days: [
      {
        day: 1,
        title: "Tokyo Arrival",
        description: "Begin your Japanese journey in Tokyo",
        activities: [
          {
            time: "Morning",
            description: "Arrive at Narita International Airport, transfer to hotel",
            image: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=800"
          },
          {
            time: "Evening",
            description: "Explore Shibuya Crossing and enjoy local cuisine",
            image: "https://images.unsplash.com/photo-1542051841857-5f90071e7989?auto=format&fit=crop&w=800"
          }
        ]
      }
    ]
  }
];

const tripTypes = [
  { id: 'leisure', label: 'Leisure', icon: Plane },
  { id: 'adventure', label: 'Adventure', icon: Map },
  { id: 'business', label: 'Business', icon: DollarSign },
  { id: 'family', label: 'Family', icon: Users },
];

const accommodationTypes = [
  { id: 'hotel', label: 'Hotel', icon: Hotel },
  { id: 'resort', label: 'Resort', icon: Hotel },
  { id: 'apartment', label: 'Apartment', icon: Hotel },
  { id: 'villa', label: 'Villa', icon: Hotel },
];

const activities = [
  { id: 'sightseeing', label: 'Sightseeing', icon: Camera },
  { id: 'adventure', label: 'Adventure Sports', icon: Mountain },
  { id: 'beach', label: 'Beach Activities', icon: Palmtree },
  { id: 'food', label: 'Food Tours', icon: Utensils },
];

const transportationTypes = [
  { id: 'rental', label: 'Car Rental', icon: Car },
  { id: 'transfer', label: 'Airport Transfer', icon: Plane },
  { id: 'public', label: 'Public Transport', icon: Users },
  { id: 'none', label: 'No Transport Needed', icon: Map },
];

const budgetRanges = [
  { id: 'budget', label: 'Budget', value: '₹0-₹10000' },
  { id: 'comfort', label: 'Comfort', value: '₹10000-₹30000' },
  { id: 'luxury', label: 'Luxury', value: '₹30000-₹50000' },
  { id: 'ultra', label: 'Ultra Luxury', value: '₹50000+' },
];

export default function Packages() {
  const [currentStep, setCurrentStep] = useState(0);
  const [showItinerary, setShowItinerary] = useState(false);
  const [selectedItinerary, setSelectedItinerary] = useState<PresetItinerary | null>(null);
  const [currentDay, setCurrentDay] = useState(0);
  const [showSummary, setShowSummary] = useState(false);
  
  const { register, handleSubmit, watch } = useForm<PackageFormData>({
    defaultValues: {
      activities: [],
    }
  });
  const watchedFields = watch();

  const steps = [
    {
      title: 'Trip Type',
      description: "Let's start planning your dream trip",
      component: (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {tripTypes.map((type) => (
            <label
              key={type.id}
              className={`relative flex cursor-pointer rounded-lg border bg-white p-4 shadow-sm focus:outline-none ${
                watchedFields.tripType === type.id ? 'border-blue-500 ring-2 ring-blue-500' : 'border-gray-300'
              }`}
            >
              <input
                type="radio"
                {...register('tripType')}
                value={type.id}
                className="sr-only"
              />
              <div className="flex w-full items-center justify-between">
                <div className="flex items-center">
                  <div className="text-sm">
                    <type.icon className={`h-6 w-6 ${
                      watchedFields.tripType === type.id ? 'text-blue-500' : 'text-gray-400'
                    }`} />
                    <p className={`font-medium mt-2 ${
                      watchedFields.tripType === type.id ? 'text-blue-900' : 'text-gray-900'
                    }`}>{type.label}</p>
                  </div>
                </div>
              </div>
            </label>
          ))}
        </div>
      ),
    },
    {
      title: 'Destination & Dates',
      description: 'Where and when would you like to travel?',
      component: (
        <div className="space-y-6">
          <div>
            <label htmlFor="destination" className="block text-sm font-medium text-gray-700">
              Destination
            </label>
            <input
              type="text"
              {...register('destination')}
              className="mt-1 āblock w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              placeholder="e.g., Thailand, Japan, India"
            />
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="startDate" className="block text-sm font-medium text-gray-700">
                Start Date
              </label>
              <input
                type="date"
                {...register('startDate')}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="endDate" className="block text-sm font-medium text-gray-700">
                End Date
              </label>
              <input
                type="date"
                {...register('endDate')}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              />
            </div>
          </div>
        </div>
      ),
    },
    {
      title: 'Travelers',
      description: 'Who will be traveling?',
      component: (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="travelers" className="block text-sm font-medium text-gray-700">
              Number of Adults
            </label>
            <input
              type="number"
              min="1"
              {...register('travelers')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            />
          </div>
          <div>
            <label htmlFor="childrenCount" className="block text-sm font-medium text-gray-700">
              Number of Children
            </label>
            <input
              type="number"
              min="0"
              {...register('childrenCount')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            />
          </div>
        </div>
      ),
    },
    {
      title: 'Budget',
      description: 'What is your budget range?',
      component: (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {budgetRanges.map((range) => (
            <label
              key={range.id}
              className={`relative flex cursor-pointer rounded-lg border bg-white p-4 shadow-sm focus:outline-none ${
                watchedFields.budget === range.id ? 'border-blue-500 ring-2 ring-blue-500' : 'border-gray-300'
              }`}
            >
              <input
                type="radio"
                {...register('budget')}
                value={range.id}
                className="sr-only"
              />
              <div className="flex w-full flex-col">
                <div className="text-sm">
                  <p className={`font-medium ${
                    watchedFields.budget === range.id ? 'text-blue-900' : 'text-gray-900'
                  }`}>{range.label}</p>
                  <p className="mt-1 text-gray-500">{range.value}</p>
                </div>
              </div>
            </label>
          ))}
        </div>
      ),
    },
    {
      title: 'Accommodation',
      description: 'Where would you like to stay?',
      component: (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {accommodationTypes.map((type) => (
            <label
              key={type.id}
              className={`relative flex cursor-pointer rounded-lg border bg-white p-4 shadow-sm focus:outline-none ${
                watchedFields.accommodationType === type.id ? 'border-blue-500 ring-2 ring-blue-500' : 'border-gray-300'
              }`}
            >
              <input
                type="radio"
                {...register('accommodationType')}
                value={type.id}
                className="sr-only"
              />
              <div className="flex w-full items-center justify-between">
                <div className="flex items-center">
                  <div className="text-sm">
                    <type.icon className={`h-6 w-6 ${
                      watchedFields.accommodationType === type.id ? 'text-blue-500' : 'text-gray-400'
                    }`} />
                    <p className={`font-medium mt-2 ${
                      watchedFields.accommodationType === type.id ? 'text-blue-900' : 'text-gray-900'
                    }`}>{type.label}</p>
                  </div>
                </div>
              </div>
            </label>
          ))}
        </div>
      ),
    },
    {
      title: 'Activities',
      description: 'What activities interest you?',
      component: (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {activities.map((activity) => (
            <label
              key={activity.id}
              className={`relative flex cursor-pointer rounded-lg border bg-white p-4 shadow-sm focus:outline-none ${
                Array.isArray(watchedFields.activities) && watchedFields.activities.includes(activity.id)
                  ? 'border-blue-500 ring-2 ring-blue-500'
                  : 'border-gray-300'
              }`}
            >
              <input
                type="checkbox"
                {...register('activities')}
                value={activity.id}
                className="sr-only"
              />
              <div className="flex w-full items-center justify-between">
                <div className="flex items-center">
                  <div className="text-sm">
                    <activity.icon className={`h-6 w-6 ${
                      Array.isArray(watchedFields.activities) && watchedFields.activities.includes(activity.id)
                        ? 'text-blue-500'
                        : 'text-gray-400'
                    }`} />
                    <p className={`font-medium mt-2 ${
                      Array.isArray(watchedFields.activities) && watchedFields.activities.includes(activity.id)
                        ? 'text-blue-900'
                        : 'text-gray-900'
                    }`}>{activity.label}</p>
                  </div>
                </div>
              </div>
            </label>
          ))}
        </div>
      ),
    },
    {
      title: 'Transportation',
      description: 'How would you like to get around?',
      component: (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {transportationTypes.map((type) => (
            <label
              key={type.id}
              className={`relative flex cursor-pointer rounded-lg border bg-white p-4 shadow-sm focus:outline-none ${
                watchedFields.transportation === type.id ? 'border-blue-500 ring-2 ring-blue-500' : 'border-gray-300'
              }`}
            >
              <input
                type="radio"
                {...register('transportation')}
                value={type.id}
                className="sr-only"
              />
              <div className="flex w-full items-center justify-between">
                <div className="flex items-center">
                  <div className="text-sm">
                    <type.icon className={`h-6 w-6 ${
                      watchedFields.transportation === type.id ? 'text-blue-500' : 'text-gray-400'
                    }`} />
                    <p className={`font-medium mt-2 ${
                      watchedFields.transportation === type.id ? 'text-blue-900' : 'text-gray-900'
                    }`}>{type.label}</p>
                  </div>
                </div>
              </div>
            </label>
          ))}
        </div>
      ),
    },
  ];

  const onSubmit = (data: PackageFormData) => {
    setShowSummary(true);
  };

  const getSelectedLabel = (value: string, options: { id: string; label: string }[]) => {
    return options.find(option => option.id === value)?.label || 'Not specified';
  };

  const selectItinerary = (itinerary: PresetItinerary) => {
    setSelectedItinerary(itinerary);
    setCurrentDay(0);
    setShowItinerary(true);
  };

  const nextDay = () => {
    if (selectedItinerary) {
      setCurrentDay((prev) => Math.min(prev + 1, selectedItinerary.days.length - 1));
    }
  };

  const previousDay = () => {
    setCurrentDay((prev) => Math.max(prev - 1, 0));
  };

  return (
    <div className="py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {!showItinerary ? (
          <>
            {/* Preset Itineraries Section */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Preset Itineraries</h2>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {presetItineraries.map((itinerary) => (
                  <div
                    key={itinerary.id}
                    className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
                  >
                    <img
                      src={itinerary.image}
                      alt={itinerary.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-6">
                      <h3 className="text-xl font-semibold text-gray-900">{itinerary.title}</h3>
                      <p className="mt-2 text-gray-600">{itinerary.description}</p>
                      <div className="mt-4 flex items-center justify-between">
                        <div className="text-sm text-gray-500">
                          <Calendar className="h-4 w-4 inline-block mr-1" />
                          {itinerary.duration}
                        </div>
                        <div className="text-sm font-medium text-gray-900">
                          {itinerary.price}
                        </div>
                      </div>
                      <button
                        onClick={() => selectItinerary(itinerary)}
                        className="mt-4 w-full inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                      >
                        <Globe className="h-4 w-4 mr-2" />
                        View Itinerary
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Custom Package Builder */}
            <div className="bg-white shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Create Custom Package</h2>
                
                {/* Progress bar */}
                <div className="mb-8">
                  <div className="relative">
                    <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-gray-200">
                      <div
                        style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
                        className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500 transition-all duration-500"
                      ></div>
                    </div>
                    <div className="flex justify-between">
                      {steps.map((step, index) => (
                        <div
                          key={step.title}
                          className={`text-xs ${
                            index <= currentStep ? 'text-blue-600' : 'text-gray-400'
                          }`}
                        >
                          {step.title}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {showSummary ? (
                  <div className="bg-white shadow rounded-lg p-6">
                    <div className="mb-6 flex justify-between items-center">
                      <h2 className="text-2xl font-bold text-gray-900">Package Summary</h2>
                      <button
                        onClick={() => setShowSummary(false)}
                        className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                      >
                        Back to Form
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Trip Details */}
                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold flex items-center gap-2">
                          <Plane className="w-5 h-5 text-blue-500" />
                          Trip Details
                        </h3>
                        <div className="space-y-2">
                          <p><strong>Type:</strong> {getSelectedLabel(watchedFields.tripType, tripTypes)}</p>
                          <p><strong>Destination:</strong> {watchedFields.destination || 'Not specified'}</p>
                          <p>
                            <strong>Dates:</strong>{" "}
                            {new Date(watchedFields.startDate).toLocaleDateString()} -{" "}
                            {new Date(watchedFields.endDate).toLocaleDateString()}
                          </p>
                        </div>
                      </div>

                      {/* Travelers */}
                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold flex items-center gap-2">
                          <Users className="w-5 h-5 text-blue-500" />
                          Travelers
                        </h3>
                        <div className="space-y-2">
                          <p><strong>Adults:</strong> {watchedFields.travelers}</p>
                          <p><strong>Children:</strong> {watchedFields.childrenCount}</p>
                        </div>
                      </div>

                      {/* Budget */}
                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold flex items-center gap-2">
                          <DollarSign className="w-5 h-5 text-blue-500" />
                          Budget
                        </h3>
                        <p>
                          {budgetRanges.find(b => b.id === watchedFields.budget)?.value || 'Not specified'}
                        </p>
                      </div>

                      {/* Accommodation */}
                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold flex items-center gap-2">
                          <Hotel className="w-5 h-5 text-blue-500" />
                          Accommodation
                        </h3>
                        <p>
                          {getSelectedLabel(watchedFields.accommodationType, accommodationTypes)}
                        </p>
                      </div>

                      {/* Activities */}
                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold flex items-center gap-2">
                          <Mountain className="w-5 h-5 text-blue-500" />
                          Activities
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          {watchedFields.activities?.map(activityId => (
                            <span 
                              key={activityId}
                              className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                            >
                              {getSelectedLabel(activityId, activities)}
                            </span>
                          ))}
                          {!watchedFields.activities?.length && 'No activities selected'}
                        </div>
                      </div>

                      {/* Transportation */}
                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold flex items-center gap-2">
                          <Car className="w-5 h-5 text-blue-500" />
                          Transportation
                        </h3>
                        <p>
                          {getSelectedLabel(watchedFields.transportation, transportationTypes)}
                        </p>
                      </div>
                    </div>

                    <div className="mt-8 border-t pt-6">
                      <button
                        onClick={() => {
                          setShowSummary(false);
                          setCurrentStep(0);
                        }}
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                      >
                        Confirm and Book Package
                      </button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-8">
                      <h3 className="text-lg font-medium text-gray-900">{steps[currentStep].title}</h3>
                      <p className="mt-1 text-sm text-gray-500">{steps[currentStep].description}</p>
                    </div>

                    {steps[currentStep].component}

                    <div className="mt-8 flex justify-between">
                      <button
                        type="button"
                        onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
                        disabled={currentStep === 0}
                        className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
                      >
                        Previous
                      </button>
                      
                      {currentStep < steps.length - 1 ? (
                        <button
                          type="button"
                          onClick={() => setCurrentStep(Math.min(steps.length - 1, currentStep + 1))}
                          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                        >
                          Next
                        </button>
                      ) : (
                        <button
                          type="submit"
                          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                        >
                          Create Package
                        </button>
                      )}
                    </div>
                  </form>
                )}
              </div>
            </div>
          </>
        ) : selectedItinerary ? (
          <div className="bg-white shadow rounded-lg p-6">
            <div className="flex justify-between items-center mb-6">
              <button
                onClick={() => {
                  setShowItinerary(false);
                  setSelectedItinerary(null);
                }}
                className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
              >
                Back to Packages
              </button>
              <div className="flex space-x-4">
                <button
                  onClick={previousDay}
                  disabled={currentDay === 0}
                  className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 disabled:opacity-50"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={nextDay}
                  disabled={currentDay === selectedItinerary.days.length - 1}
                  className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 disabled:opacity-50"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Itinerary Content */}
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  Day {selectedItinerary.days[currentDay].day}: {selectedItinerary.days[currentDay].title}
                </h2>
                <p className="mt-2 text-gray-600">{selectedItinerary.days[currentDay].description}</p>
              </div>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {selectedItinerary.days[currentDay].activities.map((activity, index) => (
                  <div key={index} className="bg-gray-50 rounded-lg overflow-hidden">
                    {activity.image && (
                      <img
                        src={activity.image}
                        alt={activity.description}
                        className="w-full h-48 object-cover"
                      />
                    )}
                    <div className="p-4">
                      <h3 className="font-medium text-gray-900">{activity.time}</h3>
                      <p className="mt-1 text-gray-600">{activity.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}