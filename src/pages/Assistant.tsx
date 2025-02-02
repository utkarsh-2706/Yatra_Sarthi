import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Plane, Hotel, Globe, Calendar, Users, DollarSign } from 'lucide-react';
import { api, HotelSearchParams } from '../lib/api';

interface Message {
  id: string;
  type: 'user' | 'bot';
  content: string;
  options?: Option[];
  form?: FormConfig;
}

interface Option {
  id: string;
  label: string;
  icon?: React.ElementType;
  action: () => void;
}

interface FormConfig {
  type: 'hotel-search';
  fields: {
    location: string;
    checkIn: string;
    checkOut: string;
    guests: number;
  };
}

export default function Assistant() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      type: 'bot',
      content: "Hi! I'm your personal travel assistant powered by AI. How can I help you plan your perfect trip today?",
      options: [
        {
          id: 'hotels',
          label: 'Find Hotels',
          icon: Hotel,
          action: () => handleHotelSearch()
        },
        {
          id: 'destinations',
          label: 'Suggest Destinations',
          icon: Globe,
          action: () => handleDestinationSuggestions()
        }
      ]
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [currentForm, setCurrentForm] = useState<FormConfig | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleHotelSearch = () => {
    const userMessageId = `user-${Date.now()}`;
    const formMessageId = `form-${Date.now()}`;
    
    addMessage('user', 'I want to search for hotels', userMessageId);
    setCurrentForm({
      type: 'hotel-search',
      fields: {
        location: '',
        checkIn: '',
        checkOut: '',
        guests: 1
      }
    });
    simulateTyping([
      {
        id: formMessageId,
        type: 'bot',
        content: 'Please fill in the details for your hotel search:',
        form: {
          type: 'hotel-search',
          fields: {
            location: '',
            checkIn: '',
            checkOut: '',
            guests: 1
          }
        }
      }
    ]);
  };

  const handleHotelSearchSubmit = async (formData: HotelSearchParams) => {
    setIsTyping(true);
    try {
      const hotels = await api.hotels.search(formData);
      simulateTyping([
        {
          id: `hotels-result-${Date.now()}`,
          type: 'bot',
          content: `I found ${hotels.length} hotels matching your criteria. Here are the top options:\n\n${
            hotels.slice(0, 3).map((hotel: any, index: number) => 
              `${index + 1}. ${hotel.name}\n   • Location: ${hotel.location}\n   • Price: $${hotel.price}/night\n`
            ).join('\n')
          }`,
          options: [
            {
              id: 'new-search',
              label: 'New Search',
              icon: Hotel,
              action: () => handleHotelSearch()
            },
            {
              id: 'modify',
              label: 'Modify Search',
              icon: Calendar,
              action: () => handleHotelSearch()
            }
          ]
        }
      ]);
    } catch (error) {
      simulateTyping([
        {
          id: `error-${Date.now()}`,
          type: 'bot',
          content: 'I apologize, but I encountered an error while searching for hotels. Would you like to try again?',
          options: [
            {
              id: 'retry',
              label: 'Try Again',
              icon: Hotel,
              action: () => handleHotelSearch()
            }
          ]
        }
      ]);
    }
    setCurrentForm(null);
  };

  const handleDestinationSuggestions = async () => {
    const userMessageId = `user-${Date.now()}`;
    addMessage('user', 'I need destination suggestions', userMessageId);
    setIsTyping(true);
    
    try {
      const suggestions = await api.gpt.getDestinationSuggestions(
        'looking for a mix of culture, nature, and relaxation'
      );
      
      simulateTyping([
        {
          id: `suggestions-${Date.now()}`,
          type: 'bot',
          content: suggestions,
          options: [
            {
              id: 'search-hotels',
              label: 'Search Hotels',
              icon: Hotel,
              action: () => handleHotelSearch()
            },
            {
              id: 'more-suggestions',
              label: 'More Suggestions',
              icon: Globe,
              action: () => handleDestinationSuggestions()
            }
          ]
        }
      ]);
    } catch (error) {
      simulateTyping([
        {
          id: `error-${Date.now()}`,
          type: 'bot',
          content: 'I apologize, but I encountered an error while getting destination suggestions. Would you like to try again?',
          options: [
            {
              id: 'retry',
              label: 'Try Again',
              icon: Globe,
              action: () => handleDestinationSuggestions()
            }
          ]
        }
      ]);
    }
  };

  const addMessage = (type: 'user' | 'bot', content: string, id?: string) => {
    setMessages(prev => [...prev, {
      id: id || `msg-${Date.now()}`,
      type,
      content
    }]);
  };

  const simulateTyping = (newMessages: Message[]) => {
    setIsTyping(true);
    setTimeout(() => {
      setMessages(prev => [...prev, ...newMessages]);
      setIsTyping(false);
    }, 1000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const userMessage = inputValue;
    const userMessageId = `user-${Date.now()}`;
    addMessage('user', userMessage, userMessageId);
    setInputValue('');
    setIsTyping(true);

    try {
      const response = await api.gpt.chat([
        {
          role: 'system',
          content: 'You are a helpful travel assistant. Keep responses concise and focused on travel-related queries.'
        },
        {
          role: 'user',
          content: userMessage
        }
      ]);

      simulateTyping([
        {
          id: `response-${Date.now()}`,
          type: 'bot',
          content: response,
          options: [
            {
              id: 'hotels',
              label: 'Search Hotels',
              icon: Hotel,
              action: () => handleHotelSearch()
            },
            {
              id: 'suggestions',
              label: 'Get Suggestions',
              icon: Globe,
              action: () => handleDestinationSuggestions()
            }
          ]
        }
      ]);
    } catch (error) {
      simulateTyping([
        {
          id: `error-${Date.now()}`,
          type: 'bot',
          content: 'I apologize, but I encountered an error processing your request. How else can I help you?',
          options: [
            {
              id: 'hotels',
              label: 'Search Hotels',
              icon: Hotel,
              action: () => handleHotelSearch()
            },
            {
              id: 'suggestions',
              label: 'Get Suggestions',
              icon: Globe,
              action: () => handleDestinationSuggestions()
            }
          ]
        }
      ]);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto w-full flex-1 flex flex-col p-4">
        <div className="bg-white shadow-lg rounded-lg flex-1 flex flex-col">
          {/* Header */}
          <div className="px-6 py-4 border-b border-gray-200 flex items-center">
            <Bot className="h-6 w-6 text-blue-500 mr-2" />
            <h2 className="text-lg font-semibold text-gray-900">AI Travel Assistant</h2>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-6">
            <div className="space-y-6">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex items-start max-w-[80%] ${message.type === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                    <div className={`flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center ${
                      message.type === 'user' ? 'bg-blue-500 ml-2' : 'bg-gray-200 mr-2'
                    }`}>
                      {message.type === 'user' ? (
                        <User className="h-5 w-5 text-white" />
                      ) : (
                        <Bot className="h-5 w-5 text-gray-600" />
                      )}
                    </div>
                    <div>
                      <div className={`rounded-lg px-4 py-2 ${
                        message.type === 'user'
                          ? 'bg-blue-500 text-white'
                          : 'bg-gray-100 text-gray-900'
                      }`}>
                        <p className="whitespace-pre-wrap">{message.content}</p>
                      </div>
                      {message.form && message.form.type === 'hotel-search' && (
                        <div className="mt-4 bg-white p-4 rounded-lg shadow">
                          <form onSubmit={(e) => {
                            e.preventDefault();
                            const formData = new FormData(e.currentTarget);
                            handleHotelSearchSubmit({
                              location: formData.get('location') as string,
                              checkIn: formData.get('checkIn') as string,
                              checkOut: formData.get('checkOut') as string,
                              guests: Number(formData.get('guests'))
                            });
                          }}>
                            <div className="space-y-4">
                              <div>
                                <label htmlFor="location" className="block text-sm font-medium text-gray-700">
                                  Destination
                                </label>
                                <input
                                  type="text"
                                  name="location"
                                  id="location"
                                  required
                                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                                />
                              </div>
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <label htmlFor="checkIn" className="block text-sm font-medium text-gray-700">
                                    Check-in
                                  </label>
                                  <input
                                    type="date"
                                    name="checkIn"
                                    id="checkIn"
                                    required
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                                  />
                                </div>
                                <div>
                                  <label htmlFor="checkOut" className="block text-sm font-medium text-gray-700">
                                    Check-out
                                  </label>
                                  <input
                                    type="date"
                                    name="checkOut"
                                    id="checkOut"
                                    required
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                                  />
                                </div>
                              </div>
                              <div>
                                <label htmlFor="guests" className="block text-sm font-medium text-gray-700">
                                  Number of Guests
                                </label>
                                <input
                                  type="number"
                                  name="guests"
                                  id="guests"
                                  min="1"
                                  defaultValue="1"
                                  required
                                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                                />
                              </div>
                              <button
                                type="submit"
                                className="w-full inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                              >
                                <Hotel className="h-4 w-4 mr-2" />
                                Search Hotels
                              </button>
                            </div>
                          </form>
                        </div>
                      )}
                      {message.options && (
                        <div className="mt-2 flex flex-wrap gap-2">
                          {message.options.map((option) => (
                            <button
                              key={option.id}
                              onClick={() => option.action()}
                              className="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-sm font-medium rounded-full text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            >
                              {option.icon && <option.icon className="h-4 w-4 mr-1.5" />}
                              {option.label}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex items-center space-x-2">
                  <Bot className="h-8 w-8 p-1.5 bg-gray-200 rounded-full text-gray-600" />
                  <div className="bg-gray-100 rounded-lg px-4 py-2">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </div>

          {/* Input */}
          <div className="px-6 py-4 border-t border-gray-200">
            <form onSubmit={handleSubmit} className="flex space-x-4">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button
                type="submit"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <Send className="h-4 w-4" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}