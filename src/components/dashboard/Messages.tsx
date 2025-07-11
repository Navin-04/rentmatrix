import React, { useState } from 'react';
import { MessageCircle, Send, Search, Phone, User } from 'lucide-react';

interface Message {
  id: number;
  senderId: number;
  text: string;
  timestamp: string;
  isRead: boolean;
}

interface Conversation {
  id: number;
  user: {
    id: number;
    name: string;
    avatar: string;
    lastSeen: string;
  };
  lastMessage: {
    text: string;
    timestamp: string;
    isRead: boolean;
  };
  messages: Message[];
}

const Messages: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedConversation, setSelectedConversation] = useState<number | null>(1); // Default to first conversation
  const [newMessage, setNewMessage] = useState('');
  
  // Mock data
  const conversations: Conversation[] = [
    {
      id: 1,
      user: {
        id: 101,
        name: 'Priya Sharma',
        avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        lastSeen: 'Online',
      },
      lastMessage: {
        text: 'Is the camera still available for rent?',
        timestamp: '10:30 AM',
        isRead: true,
      },
      messages: [
        {
          id: 1,
          senderId: 101,
          text: 'Hi there! I noticed your Sony A7 III listing.',
          timestamp: '10:15 AM',
          isRead: true,
        },
        {
          id: 2,
          senderId: 101,
          text: 'Is the camera still available for rent?',
          timestamp: '10:30 AM',
          isRead: true,
        },
        {
          id: 3,
          senderId: 999, // Current user
          text: 'Yes, it is available. When would you like to rent it?',
          timestamp: '10:45 AM',
          isRead: true,
        },
      ],
    },
    {
      id: 2,
      user: {
        id: 102,
        name: 'Rahul Mehta',
        avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        lastSeen: '5 mins ago',
      },
      lastMessage: {
        text: 'Thanks for the quick response!',
        timestamp: 'Yesterday',
        isRead: false,
      },
      messages: [
        {
          id: 1,
          senderId: 102,
          text: 'Hello, I am interested in your MacBook Pro listing',
          timestamp: 'Yesterday',
          isRead: true,
        },
        {
          id: 2,
          senderId: 999, // Current user
          text: 'Sure, it\'s available from next week. Let me know if you\'re interested.',
          timestamp: 'Yesterday',
          isRead: true,
        },
        {
          id: 3,
          senderId: 102,
          text: 'Thanks for the quick response!',
          timestamp: 'Yesterday',
          isRead: false,
        },
      ],
    },
    {
      id: 3,
      user: {
        id: 103,
        name: 'Kavita Reddy',
        avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        lastSeen: '1 hour ago',
      },
      lastMessage: {
        text: 'I would like to rent your sofa for the entire month.',
        timestamp: '2 days ago',
        isRead: true,
      },
      messages: [
        {
          id: 1,
          senderId: 103,
          text: 'Hi, I\'m interested in your Modern Sofa Set listing',
          timestamp: '2 days ago',
          isRead: true,
        },
        {
          id: 2,
          senderId: 103,
          text: 'I would like to rent your sofa for the entire month.',
          timestamp: '2 days ago',
          isRead: true,
        },
      ],
    },
  ];
  
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };
  
  const handleSendMessage = () => {
    // Placeholder: Implement send message logic here
    alert('Message sent!');
  };
  
  // Filter conversations based on search query
  const filteredConversations = conversations.filter(conversation => {
    return conversation.user.name.toLowerCase().includes(searchQuery.toLowerCase());
  });
  
  // Get the selected conversation
  const activeConversation = conversations.find(c => c.id === selectedConversation);
  
  return (
    <div>
      <div className="flex items-center mb-6">
        <MessageCircle size={24} className="text-primary-500 mr-2" />
        <h1 className="text-2xl font-bold">Messages</h1>
      </div>
      
      <div className="bg-white border rounded-lg overflow-hidden">
        <div className="flex flex-col md:flex-row h-[600px]">
          {/* Conversations List */}
          <div className="md:w-1/3 border-r">
            <div className="p-3 border-b">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search conversations..."
                  value={searchQuery}
                  onChange={handleSearchChange}
                  className="input-field pl-10 w-full"
                />
                <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
            </div>
            
            <div className="overflow-y-auto h-[calc(600px-56px)]">
              {filteredConversations.length === 0 ? (
                <div className="text-center py-4">
                  <p className="text-gray-500">No conversations found.</p>
                </div>
              ) : (
                filteredConversations.map(conversation => (
                  <button
                    key={conversation.id}
                    onClick={() => setSelectedConversation(conversation.id)}
                    className={`w-full text-left p-3 border-b hover:bg-gray-50 transition-colors ${
                      selectedConversation === conversation.id ? 'bg-gray-50' : ''
                    }`}
                    title={`Open conversation with ${conversation.user.name}`}
                    aria-label={`Open conversation with ${conversation.user.name}`}
                  >
                    <div className="flex items-start">
                      <img 
                        src={conversation.user.avatar} 
                        alt={conversation.user.name} 
                        className="w-12 h-12 rounded-full object-cover mr-3"
                      />
                      <div className="flex-grow">
                        <div className="flex justify-between items-baseline">
                          <h3 className="font-medium">{conversation.user.name}</h3>
                          <span className="text-xs text-gray-500">{conversation.lastMessage.timestamp}</span>
                        </div>
                        <p className={`text-sm line-clamp-1 ${
                          !conversation.lastMessage.isRead ? 'font-semibold text-gray-900' : 'text-gray-500'
                        }`}>
                          {conversation.lastMessage.text}
                        </p>
                      </div>
                      {!conversation.lastMessage.isRead && (
                        <span className="w-2 h-2 bg-primary-500 rounded-full"></span>
                      )}
                    </div>
                  </button>
                ))
              )}
            </div>
          </div>
          
          {/* Conversation */}
          <div className="md:w-2/3 flex flex-col">
            {selectedConversation && activeConversation ? (
              <>
                {/* Header */}
                <div className="p-3 border-b flex justify-between items-center">
                  <div className="flex items-center">
                    <img 
                      src={activeConversation.user.avatar} 
                      alt={activeConversation.user.name} 
                      className="w-10 h-10 rounded-full object-cover mr-3"
                    />
                    <div>
                      <h3 className="font-medium">{activeConversation.user.name}</h3>
                      <p className="text-xs text-gray-500">{activeConversation.user.lastSeen}</p>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button className="p-2 rounded-full hover:bg-gray-100 transition-colors" title="Call User" aria-label="Call User">
                      <Phone size={18} className="text-gray-700" />
                    </button>
                    <button className="p-2 rounded-full hover:bg-gray-100 transition-colors" title="View Profile" aria-label="View Profile">
                      <User size={18} className="text-gray-700" />
                    </button>
                  </div>
                </div>
                
                {/* Messages */}
                <div className="flex-grow p-4 overflow-y-auto">
                  {activeConversation.messages.map(message => {
                    const isCurrentUser = message.senderId === 999;
                    
                    return (
                      <div 
                        key={message.id} 
                        className={`max-w-xs mb-4 ${isCurrentUser ? 'ml-auto' : 'mr-auto'}`}
                      >
                        <div className={`p-3 rounded-lg ${
                          isCurrentUser ? 'bg-primary-500 text-white' : 'bg-gray-100'
                        }`}>
                          {message.text}
                        </div>
                        <div className={`text-xs text-gray-500 mt-1 ${
                          isCurrentUser ? 'text-right' : 'text-left'
                        }`}>
                          {message.timestamp}
                        </div>
                      </div>
                    );
                  })}
                </div>
                
                {/* Input */}
                <div className="p-3 border-t">
                  <form onSubmit={(e) => { e.preventDefault(); handleSendMessage(); }} className="flex items-center">
                    <input
                      type="text"
                      placeholder="Type your message..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      className="input-field flex-grow mr-2"
                    />
                    <button 
                      type="submit" 
                      title="Send Message"
                      aria-label="Send Message"
                      className="btn-primary p-2 rounded-full"
                      disabled={newMessage.trim() === ''}
                    >
                      <Send size={18} />
                    </button>
                  </form>
                </div>
              </>
            ) : (
              <div className="flex-grow flex items-center justify-center">
                <div className="text-center">
                  <MessageCircle size={48} className="text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">Select a conversation to start messaging</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Messages;