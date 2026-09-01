import React, { useState } from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { Send, Phone, Image as ImageIcon, Camera, CheckCircle2, AlertCircle } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface Message {
  id: string;
  sender: 'user' | 'other';
  text: string;
  timestamp: string;
  type: 'text' | 'image' | 'request';
  status?: 'sent' | 'delivered' | 'read';
}

interface ChatScreenProps {
  chatWith: {
    name: string;
    type: 'buyer' | 'agent' | 'producer';
    virtualPhone: string;
    verified: boolean;
  };
  onRequestContact: () => void;
  onBack: () => void;
}

export const ChatScreen: React.FC<ChatScreenProps> = ({
  chatWith,
  onRequestContact,
  onBack,
}) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'other',
      text: 'Hello! I\'m interested in your wheat lot. Can we discuss the pricing?',
      timestamp: '10:30 AM',
      type: 'text',
      status: 'read',
    },
    {
      id: '2',
      sender: 'user',
      text: 'Sure! The lot is Grade A quality, 1000 kg. I\'m looking for ₹2,900/quintal.',
      timestamp: '10:32 AM',
      type: 'text',
      status: 'read',
    },
    {
      id: '3',
      sender: 'other',
      text: 'That sounds reasonable. Can you share more photos of the product?',
      timestamp: '10:35 AM',
      type: 'text',
      status: 'read',
    },
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [contactExchanged, setContactExchanged] = useState(false);

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    const message: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: newMessage,
      timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      type: 'text',
      status: 'sent',
    };

    setMessages([...messages, message]);
    setNewMessage('');

    // Simulate message delivery
    setTimeout(() => {
      setMessages((prev) =>
        prev.map((m) =>
          m.id === message.id ? { ...m, status: 'delivered' } : m
        )
      );
    }, 1000);
  };

  const handleRequestContact = () => {
    onRequestContact();
    setContactExchanged(true);
    toast.success('Contact exchange request sent');
  };

  const handleSendImage = () => {
    toast.info('Image upload would open here');
  };

  const handleTakePhoto = () => {
    toast.info('Camera would open here');
  };

  const getTypeColor = () => {
    switch (chatWith.type) {
      case 'buyer':
        return '#FFD700';
      case 'agent':
        return '#003E6D';
      case 'producer':
        return '#10B981';
      default:
        return '#6B7280';
    }
  };

  return (
    <div className="min-h-screen p-6" style={{ background: 'linear-gradient(to bottom, #F7FAFC, #D9F2FF)' }}>
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <Card className="p-4 mb-4 bg-white/90 backdrop-blur-sm shadow-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center text-white"
                style={{ backgroundColor: getTypeColor() }}
              >
                {chatWith.name.charAt(0)}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 style={{ color: '#003E6D' }}>{chatWith.name}</h3>
                  {chatWith.verified && (
                    <CheckCircle2 className="w-4 h-4 text-blue-500" />
                  )}
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <Badge variant="outline" className="text-xs">
                    {chatWith.type.charAt(0).toUpperCase() + chatWith.type.slice(1)}
                  </Badge>
                  <div className="flex items-center gap-1">
                    <Phone className="w-3 h-3" />
                    <span className="font-mono text-xs">{chatWith.virtualPhone}</span>
                  </div>
                </div>
              </div>
            </div>

            {!contactExchanged && (
              <Button
                onClick={handleRequestContact}
                variant="outline"
                size="sm"
              >
                Request Contact Info
              </Button>
            )}
          </div>

          {contactExchanged && (
            <div className="mt-3 p-3 bg-blue-50 rounded-lg flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-blue-600 mt-0.5" />
              <div>
                <p className="text-sm text-blue-900">Contact exchange requested</p>
                <p className="text-xs text-blue-700">Waiting for {chatWith.name} to accept</p>
              </div>
            </div>
          )}
        </Card>

        {/* Chat Messages */}
        <Card className="p-6 mb-4 bg-white/90 backdrop-blur-sm shadow-lg">
          <div className="space-y-4 mb-4 max-h-[500px] overflow-y-auto">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[70%] rounded-lg p-4 ${
                    message.sender === 'user'
                      ? 'text-white'
                      : 'bg-gray-100'
                  }`}
                  style={message.sender === 'user' ? { backgroundColor: getTypeColor() } : {}}
                >
                  <p className={message.sender === 'user' ? 'text-white' : 'text-gray-800'}>
                    {message.text}
                  </p>
                  <div className="flex items-center justify-between mt-2">
                    <p
                      className={`text-xs ${
                        message.sender === 'user' ? 'text-white/70' : 'text-gray-500'
                      }`}
                    >
                      {message.timestamp}
                    </p>
                    {message.sender === 'user' && message.status && (
                      <div className="flex gap-1">
                        <CheckCircle2
                          className={`w-3 h-3 ${
                            message.status === 'read'
                              ? 'text-white'
                              : 'text-white/50'
                          }`}
                        />
                        {message.status !== 'sent' && (
                          <CheckCircle2
                            className={`w-3 h-3 -ml-2 ${
                              message.status === 'read'
                                ? 'text-white'
                                : 'text-white/50'
                            }`}
                          />
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Privacy Notice */}
          <div className="mb-4 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
            <p className="text-sm text-yellow-800">
              🔒 Your privacy is protected. Virtual phone numbers are used for all communications.
            </p>
          </div>

          {/* Input Area */}
          <div className="space-y-3">
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleSendImage}
              >
                <ImageIcon className="w-4 h-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleTakePhoto}
              >
                <Camera className="w-4 h-4" />
              </Button>
            </div>

            <div className="flex gap-2">
              <Input
                placeholder="Type your message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              />
              <Button
                onClick={handleSendMessage}
                className="text-white"
                style={{ backgroundColor: getTypeColor() }}
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </Card>

        {/* Consent Prompt */}
        {contactExchanged && (
          <Card className="p-6 bg-white/90 backdrop-blur-sm shadow-lg border-2 border-blue-300">
            <h3 className="mb-3" style={{ color: '#003E6D' }}>Contact Exchange Consent</h3>
            <p className="text-gray-600 mb-4">
              Both parties must consent to exchange real contact information. This ensures privacy
              and security for all users.
            </p>
            <div className="flex gap-3">
              <Button className="flex-1 text-white" style={{ backgroundColor: '#FFD700' }}>
                Approve Exchange
              </Button>
              <Button variant="outline" className="flex-1">
                Decline
              </Button>
            </div>
          </Card>
        )}

        {/* Back Button */}
        <div className="flex justify-start mt-8">
          <Button variant="outline" onClick={onBack}>
            Back
          </Button>
        </div>
      </div>
    </div>
  );
};
