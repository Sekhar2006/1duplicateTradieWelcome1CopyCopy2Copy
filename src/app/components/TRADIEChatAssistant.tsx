import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  MessageSquare,
  Send,
  X,
  Sparkles,
  User,
  Bot,
  Loader2,
  Minimize2,
  Maximize2,
  Trash2,
  Download,
  Copy,
  Check,
} from "lucide-react";
import { DSButton, DSInput, DSCard, designTokens } from "../design-system";
import { ScrollArea } from "./ui/scroll-area";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { toast } from "sonner@2.0.3";

const { colors, typography, spacing, radius, shadows } = designTokens;

interface Message {
  id: string;
  role: "user" | "assistant" | "system";
  content: string;
  timestamp: Date;
}

interface TRADIEChatAssistantProps {
  userRole?: string;
  userName?: string;
  onClose?: () => void;
  isMinimized?: boolean;
  onToggleMinimize?: () => void;
}

export function TRADIEChatAssistant({
  userRole = "Producer",
  userName = "User",
  onClose,
  isMinimized = false,
  onToggleMinimize,
}: TRADIEChatAssistantProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content: `Hello ${userName}! 👋 I'm your TRADIE AI Assistant. I can help you with:\n\n• Adding and managing produce listings\n• Understanding commodity prices\n• Navigating the KYC process\n• Payment and order tracking\n• Platform features and guidelines\n\nHow can I assist you today?`,
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateAIResponse = async (userMessage: string): Promise<string> => {
    // Mock AI responses based on keywords
    // In production, this would call OpenAI API through a secure backend
    
    await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate API delay

    const lowerMessage = userMessage.toLowerCase();

    // Context-aware responses based on TRADIE platform
    if (lowerMessage.includes("add") && lowerMessage.includes("produce")) {
      return `To add new produce to TRADIE:\n\n1. Click the "Add New Produce" button on your dashboard\n2. Select the commodity type (wheat, rice, vegetables, etc.)\n3. Enter quantity and quality grade\n4. Upload quality certificates if available\n5. Set your asking price\n6. Submit for verification\n\nYour listing will be live once approved (usually within 24 hours). Would you like help with any specific step?`;
    }

    if (lowerMessage.includes("kyc") || lowerMessage.includes("verification")) {
      return `For ${userRole} KYC verification, you'll need:\n\n📄 Required Documents:\n• Government-issued ID (Aadhaar/PAN)\n• Address proof\n• ${userRole === "Producer" ? "Land ownership documents\n• Farming certificates" : "Business registration\n• Tax documents"}\n\nThe process takes 2-3 business days. You can track your status in the "Profile & Security Settings" section. Need help uploading documents?`;
    }

    if (lowerMessage.includes("price") || lowerMessage.includes("market")) {
      return `📊 Current Market Insights:\n\nYou can view real-time commodity prices in the "Market Trends" tab. Prices are updated every 4 hours from major mandis.\n\nFor ${userRole}s, I recommend:\n• Check daily price trends before listing\n• Set competitive prices based on quality grade\n• Use the price alert feature for your commodities\n\nWould you like me to explain how to set up price alerts?`;
    }

    if (lowerMessage.includes("payment") || lowerMessage.includes("money")) {
      return `💰 Payment Information:\n\nAs a ${userRole}, you can:\n• Track payments in the "Payments Received" section\n• Request payment for completed orders\n• View transaction history\n• Download payment receipts\n\nPayments are processed within 24-48 hours after delivery confirmation. Need help with a specific transaction?`;
    }

    if (lowerMessage.includes("order") || lowerMessage.includes("buy")) {
      return `🛒 Order Management:\n\nYour active orders show:\n• Order status (pending, confirmed, in-transit)\n• Buyer/seller information\n• Delivery timeline\n• Payment status\n\nYou'll receive notifications for:\n✓ New order confirmations\n✓ Payment updates\n✓ Delivery schedules\n✓ Quality inspections\n\nNeed help with a specific order?`;
    }

    if (lowerMessage.includes("help") || lowerMessage.includes("support")) {
      return `🆘 TRADIE Support Options:\n\n1. **AI Chat** (me!) - Available 24/7\n2. **Help Center** - FAQs and guides\n3. **Email Support** - support@tradie.com\n4. **Phone Support** - 1800-XXX-XXXX (9 AM - 6 PM IST)\n5. **WhatsApp** - +91-XXXXX-XXXXX\n\nWhat specific issue can I help you with?`;
    }

    if (lowerMessage.includes("language") || lowerMessage.includes("translate")) {
      return `🌐 TRADIE supports 34 Indian + 60+ global languages!\n\nTo change language:\n1. Go to Settings ⚙️\n2. Select "Language & Region"\n3. Choose your preferred language\n4. All content updates instantly\n\nSupported Indian languages include Hindi, Tamil, Telugu, Bengali, Marathi, Gujarati, Kannada, Malayalam, and many more!`;
    }

    // Default response
    return `I understand you're asking about "${userMessage}". \n\nAs a ${userRole} on TRADIE, I can help you with:\n\n✓ Produce listings and inventory\n✓ Order and payment tracking\n✓ Market prices and trends\n✓ KYC and verification\n✓ Platform navigation\n\nCould you provide more details about what you'd like to know?`;
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: inputValue.trim(),
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);

    try {
      const aiResponse = await generateAIResponse(userMessage.content);
      
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: aiResponse,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error("Error generating response:", error);
      toast.error("Failed to get response. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleClearChat = () => {
    setMessages([
      {
        id: "1",
        role: "assistant",
        content: `Chat cleared! How can I help you today, ${userName}?`,
        timestamp: new Date(),
      },
    ]);
    toast.success("Chat history cleared");
  };

  const handleCopyMessage = (content: string, id: string) => {
    navigator.clipboard.writeText(content);
    setCopiedId(id);
    toast.success("Message copied to clipboard");
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleExportChat = () => {
    const chatText = messages
      .map(m => `[${m.role.toUpperCase()}] ${m.timestamp.toLocaleString()}\n${m.content}\n`)
      .join("\n---\n\n");

    const blob = new Blob([chatText], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `tradie-chat-${Date.now()}.txt`;
    a.click();
    toast.success("Chat exported successfully");
  };

  if (isMinimized) {
    return (
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="fixed bottom-4 right-4 z-50"
      >
        <DSButton
          onClick={onToggleMinimize}
          variant="primary"
          size="lg"
          className="rounded-full w-14 h-14 shadow-2xl"
          style={{
            background: `linear-gradient(135deg, ${colors.accent.gold}, ${colors.accent.goldDark})`,
            boxShadow: shadows.gold,
          }}
        >
          <MessageSquare size={24} />
        </DSButton>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95, y: 20 }}
      className="fixed bottom-4 right-4 z-50 flex flex-col"
      style={{
        width: "400px",
        maxWidth: "calc(100vw - 32px)",
        height: "600px",
        maxHeight: "calc(100vh - 32px)",
      }}
    >
      <DSCard variant="elevated" padding="none" className="flex flex-col h-full overflow-hidden">
        {/* Header */}
        <div
          className="flex items-center justify-between p-4 border-b"
          style={{
            background: `linear-gradient(135deg, ${colors.blue.primary}, ${colors.blue.light})`,
            borderColor: colors.border.light,
          }}
        >
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center"
              style={{
                background: `linear-gradient(135deg, ${colors.accent.gold}, ${colors.accent.goldDark})`,
                boxShadow: shadows.gold,
              }}
            >
              <Sparkles size={20} style={{ color: "white" }} />
            </div>
            <div>
              <h3
                style={{
                  fontFamily: typography.fonts.subheading,
                  fontSize: typography.sizes.base,
                  fontWeight: typography.weights.semibold,
                  color: "white",
                }}
              >
                TRADIE AI Assistant
              </h3>
              <p style={{ fontSize: typography.sizes.xs, color: "rgba(255,255,255,0.8)" }}>
                {isLoading ? "Typing..." : "Online"}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {onToggleMinimize && (
              <button
                onClick={onToggleMinimize}
                className="p-1 rounded hover:bg-white/10 transition-colors"
              >
                <Minimize2 size={18} style={{ color: "white" }} />
              </button>
            )}
            {onClose && (
              <button
                onClick={onClose}
                className="p-1 rounded hover:bg-white/10 transition-colors"
              >
                <X size={18} style={{ color: "white" }} />
              </button>
            )}
          </div>
        </div>

        {/* Chat Actions */}
        <div
          className="flex items-center justify-end gap-2 px-4 py-2 border-b"
          style={{ backgroundColor: colors.surface.secondary, borderColor: colors.border.light }}
        >
          <button
            onClick={handleExportChat}
            className="flex items-center gap-1 px-2 py-1 rounded text-xs hover:bg-white/50 transition-colors"
            style={{ color: colors.text.secondary }}
          >
            <Download size={14} />
            Export
          </button>
          <button
            onClick={handleClearChat}
            className="flex items-center gap-1 px-2 py-1 rounded text-xs hover:bg-white/50 transition-colors"
            style={{ color: colors.text.secondary }}
          >
            <Trash2 size={14} />
            Clear
          </button>
        </div>

        {/* Messages */}
        <ScrollArea className="flex-1 p-4">
          <div className="space-y-4">
            <AnimatePresence>
              {messages.map((message, index) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className={`flex gap-3 ${message.role === "user" ? "flex-row-reverse" : "flex-row"}`}
                >
                  {/* Avatar */}
                  <Avatar
                    className="w-8 h-8 flex-shrink-0"
                    style={{
                      backgroundColor:
                        message.role === "user" ? colors.blue.primary : colors.accent.gold,
                    }}
                  >
                    <AvatarFallback>
                      {message.role === "user" ? (
                        <User size={16} style={{ color: "white" }} />
                      ) : (
                        <Bot size={16} style={{ color: "white" }} />
                      )}
                    </AvatarFallback>
                  </Avatar>

                  {/* Message Bubble */}
                  <div
                    className={`flex-1 max-w-[75%] ${message.role === "user" ? "items-end" : "items-start"} flex flex-col gap-1`}
                  >
                    <div
                      className="rounded-2xl px-4 py-3 relative group"
                      style={{
                        backgroundColor:
                          message.role === "user" ? colors.blue.primary : colors.surface.secondary,
                        color: message.role === "user" ? "white" : colors.text.primary,
                      }}
                    >
                      <p
                        className="whitespace-pre-wrap break-words"
                        style={{
                          fontSize: typography.sizes.sm,
                          lineHeight: 1.5,
                        }}
                      >
                        {message.content}
                      </p>

                      {/* Copy Button */}
                      <button
                        onClick={() => handleCopyMessage(message.content, message.id)}
                        className="absolute -right-8 top-2 p-1 rounded opacity-0 group-hover:opacity-100 transition-opacity"
                        style={{ backgroundColor: colors.surface.secondary }}
                      >
                        {copiedId === message.id ? (
                          <Check size={14} style={{ color: colors.status.success }} />
                        ) : (
                          <Copy size={14} style={{ color: colors.text.muted }} />
                        )}
                      </button>
                    </div>

                    <span
                      className="px-2 text-xs"
                      style={{ color: colors.text.muted }}
                    >
                      {message.timestamp.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {/* Typing Indicator */}
            {isLoading && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex gap-3"
              >
                <Avatar
                  className="w-8 h-8"
                  style={{ backgroundColor: colors.accent.gold }}
                >
                  <AvatarFallback>
                    <Bot size={16} style={{ color: "white" }} />
                  </AvatarFallback>
                </Avatar>
                <div
                  className="rounded-2xl px-4 py-3 flex items-center gap-1"
                  style={{ backgroundColor: colors.surface.secondary }}
                >
                  <div className="flex gap-1">
                    <motion.div
                      animate={{ opacity: [0.4, 1, 0.4] }}
                      transition={{ duration: 1, repeat: Infinity, delay: 0 }}
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: colors.text.muted }}
                    />
                    <motion.div
                      animate={{ opacity: [0.4, 1, 0.4] }}
                      transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: colors.text.muted }}
                    />
                    <motion.div
                      animate={{ opacity: [0.4, 1, 0.4] }}
                      transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: colors.text.muted }}
                    />
                  </div>
                </div>
              </motion.div>
            )}

            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>

        {/* Input Area */}
        <div
          className="p-4 border-t"
          style={{
            backgroundColor: colors.surface.primary,
            borderColor: colors.border.light,
          }}
        >
          <div className="flex gap-2">
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message..."
              disabled={isLoading}
              className="flex-1 px-4 py-3 rounded-xl border outline-none transition-all"
              style={{
                borderColor: colors.border.default,
                backgroundColor: colors.surface.secondary,
                fontSize: typography.sizes.sm,
              }}
            />
            <DSButton
              onClick={handleSendMessage}
              disabled={!inputValue.trim() || isLoading}
              variant="primary"
              size="md"
              className="rounded-xl"
            >
              {isLoading ? (
                <Loader2 size={20} className="animate-spin" />
              ) : (
                <Send size={20} />
              )}
            </DSButton>
          </div>

          <p
            className="mt-2 text-xs text-center"
            style={{ color: colors.text.muted }}
          >
            AI responses are for guidance only. Verify important information.
          </p>
        </div>
      </DSCard>
    </motion.div>
  );
}
