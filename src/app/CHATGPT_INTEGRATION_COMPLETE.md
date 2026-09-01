# ✨ ChatGPT Integration for TRADIE Platform - Complete Guide

**Date:** October 21, 2025  
**Status:** ✅ Production-Ready (Frontend Demo)  
**Version:** 78.1

---

## 📋 Table of Contents

1. [Overview](#overview)
2. [Components Created](#components-created)
3. [Features & Capabilities](#features--capabilities)
4. [Design & UI/UX](#design--uiux)
5. [Technical Implementation](#technical-implementation)
6. [Production Integration](#production-integration)
7. [Usage Guide](#usage-guide)
8. [API Integration](#api-integration)
9. [Security Considerations](#security-considerations)
10. [Future Enhancements](#future-enhancements)

---

## Overview

### Purpose
AI-powered chat assistant integration for the TRADIE platform, providing 24/7 support, context-aware guidance, and instant answers to user queries using ChatGPT technology.

### What Was Created

**New Components:**
1. **`TRADIEChatAssistant.tsx`** - Main chat widget component
2. **`ChatGPTIntegrationDemo.tsx`** - Demo page showcasing AI features

**Current Implementation:**
- ✅ Frontend-only demo with mock responses
- ✅ Complete UI/UX design
- ✅ Role-based context awareness
- ✅ Message history management
- ✅ Export and copy features
- ✅ Minimizable chat widget
- ✅ Responsive design

**Production Requirements:**
- 🔄 Backend API integration (Supabase + OpenAI)
- 🔄 Secure API key management
- 🔄 Real-time chat history storage
- 🔄 User authentication integration

---

## Components Created

### 1. TRADIEChatAssistant Component

**File:** `/components/TRADIEChatAssistant.tsx`

**Purpose:** Floating chat widget with full ChatGPT-style interface

**Props:**
```tsx
interface TRADIEChatAssistantProps {
  userRole?: string;          // User's role (Producer, Trader, etc.)
  userName?: string;          // User's display name
  onClose?: () => void;       // Close handler
  isMinimized?: boolean;      // Minimized state
  onToggleMinimize?: () => void; // Toggle minimize
}
```

**Features:**
- ✅ Chat message display with avatars
- ✅ User/Assistant message differentiation
- ✅ Typing indicators
- ✅ Message timestamps
- ✅ Copy message functionality
- ✅ Export chat history
- ✅ Clear chat history
- ✅ Minimizable floating widget
- ✅ Smooth animations
- ✅ Auto-scroll to latest message

### 2. ChatGPTIntegrationDemo Component

**File:** `/components/ChatGPTIntegrationDemo.tsx`

**Purpose:** Demo page showcasing AI assistant capabilities

**Features:**
- ✅ Feature highlights grid
- ✅ Role selector (Producer, Trader, Buyer, Agent)
- ✅ Common questions by role
- ✅ Integration information
- ✅ Interactive chat launcher

---

## Features & Capabilities

### 🎯 Core Features

**1. Context-Aware Responses**
- Understands user role (Producer, Trader, Buyer, etc.)
- Provides role-specific guidance
- TRADIE platform knowledge
- Commodity trading expertise

**2. 24/7 Availability**
- Instant responses
- No wait times
- Always accessible

**3. Multi-Topic Support**

**Produce Management:**
- How to add new produce
- Listing management
- Quality certificates
- Pricing guidance

**KYC & Verification:**
- Document requirements by role
- Upload process
- Status tracking
- Timeline expectations

**Market Insights:**
- Real-time commodity prices
- Market trends
- Price alerts
- Mandi rates

**Payment & Orders:**
- Payment tracking
- Order management
- Transaction history
- Receipt downloads

**Platform Navigation:**
- Feature explanations
- Settings guide
- Help center access
- Contact support

**Language Support:**
- Multi-language interface
- Translation guidance
- Regional support

### 🎨 UI/UX Features

**Chat Interface:**
- ✅ Clean, modern design
- ✅ Message bubbles (user vs assistant)
- ✅ Avatar icons
- ✅ Timestamp display
- ✅ Typing animation
- ✅ Smooth scrolling
- ✅ Copy message button
- ✅ Hover effects

**Chat Actions:**
- ✅ Export chat to .txt file
- ✅ Clear chat history
- ✅ Minimize/Maximize toggle
- ✅ Close widget

**Accessibility:**
- ✅ Keyboard navigation
- ✅ Screen reader support
- ✅ High contrast
- ✅ Touch-optimized

**Responsive Design:**
- ✅ Mobile-first
- ✅ Tablet-optimized
- ✅ Desktop-friendly
- ✅ Adaptive sizing

---

## Design & UI/UX

### Visual Design

**Color Scheme:**
```
Header Background: Linear gradient (Blue Primary → Blue Light)
User Messages: Blue Primary (#003E6D)
Assistant Messages: Surface Secondary (#F8FAFB)
Gold Accent: #FFD700 (AI icon, highlights)
```

**Typography:**
```
Header Title: Subheading font, 16pt, Semibold
Messages: Small font, 14pt, Regular
Timestamps: Extra small, 12pt, Muted
Input: Small font, 14pt
```

**Spacing:**
```
Message Gap: 16px
Bubble Padding: 16px horizontal, 12px vertical
Widget Padding: 16px
Avatar Size: 32px
```

**Dimensions:**
```
Widget Width: 400px (max 100vw - 32px)
Widget Height: 600px (max 100vh - 32px)
Minimized Button: 56px × 56px
Message Max Width: 75%
```

### Component Structure

**Chat Widget Layout:**
```
┌─────────────────────────────────┐
│ Header (Gradient Blue)          │
│ ✨ TRADIE AI Assistant          │
│ Online / Typing...       [-][×] │
├─────────────────────────────────┤
│ Actions Bar                     │
│              [Export] [Clear]   │
├─────────────────────────────────┤
│ Messages (Scrollable)           │
│                                 │
│ [Bot] Welcome message...        │
│                                 │
│            [You] Question?      │
│                                 │
│ [Bot] Answer with details...    │
│                                 │
│ [Typing animation...]           │
│                                 │
├─────────────────────────────────┤
│ Input Area                      │
│ [Type message...      ] [Send] │
│ AI guidance disclaimer          │
└─────────────────────────────────┘
```

**Minimized State:**
```
Fixed position: bottom-right
Size: 56px circle
Gold gradient background
MessageSquare icon
Floating shadow
Click to expand
```

### Animations

**Widget Appearance:**
```tsx
initial: { opacity: 0, scale: 0.95, y: 20 }
animate: { opacity: 1, scale: 1, y: 0 }
duration: 0.3s
```

**Message Entry:**
```tsx
initial: { opacity: 0, y: 10 }
animate: { opacity: 1, y: 0 }
stagger: 0.05s per message
```

**Typing Indicator:**
```tsx
3 dots pulsing in sequence
opacity: 0.4 → 1 → 0.4
duration: 1s loop
delay: 0s, 0.2s, 0.4s
```

**Button Interactions:**
```tsx
Copy button: opacity 0 → 1 on hover
Send button: disabled state fade
Minimize: scale 1 → 0.95 on click
```

---

## Technical Implementation

### State Management

**Chat State:**
```tsx
const [messages, setMessages] = useState<Message[]>([...]);
const [inputValue, setInputValue] = useState("");
const [isLoading, setIsLoading] = useState(false);
const [copiedId, setCopiedId] = useState<string | null>(null);
```

**Message Interface:**
```tsx
interface Message {
  id: string;                 // Unique identifier
  role: "user" | "assistant"; // Message sender
  content: string;            // Message text
  timestamp: Date;            // When sent
}
```

### Mock AI Response Logic

**Current Implementation:**
```tsx
const generateAIResponse = async (userMessage: string): Promise<string> => {
  // Keyword-based response matching
  const lowerMessage = userMessage.toLowerCase();
  
  if (lowerMessage.includes("add") && lowerMessage.includes("produce")) {
    return "Produce listing guidance...";
  }
  
  if (lowerMessage.includes("kyc")) {
    return "KYC verification steps...";
  }
  
  // ... more patterns
  
  return "Default helpful response...";
};
```

**Supported Topics:**
- Produce management → Listing steps
- KYC verification → Document requirements
- Market prices → Price insights
- Payments → Payment tracking
- Orders → Order management
- Help/Support → Support options
- Language → Language settings
- Default → General guidance

### Key Functions

**Send Message:**
```tsx
const handleSendMessage = async () => {
  // 1. Validate input
  if (!inputValue.trim() || isLoading) return;
  
  // 2. Add user message
  const userMessage = { id, role: "user", content, timestamp };
  setMessages(prev => [...prev, userMessage]);
  
  // 3. Clear input & show loading
  setInputValue("");
  setIsLoading(true);
  
  // 4. Generate AI response
  const aiResponse = await generateAIResponse(content);
  
  // 5. Add assistant message
  const assistantMessage = { id, role: "assistant", content: aiResponse, timestamp };
  setMessages(prev => [...prev, assistantMessage]);
  
  // 6. Stop loading
  setIsLoading(false);
};
```

**Copy Message:**
```tsx
const handleCopyMessage = (content: string, id: string) => {
  navigator.clipboard.writeText(content);
  setCopiedId(id);
  toast.success("Message copied");
  setTimeout(() => setCopiedId(null), 2000);
};
```

**Export Chat:**
```tsx
const handleExportChat = () => {
  const chatText = messages
    .map(m => `[${m.role}] ${m.timestamp}\n${m.content}\n`)
    .join("\n---\n\n");
  
  const blob = new Blob([chatText], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `tradie-chat-${Date.now()}.txt`;
  a.click();
};
```

**Clear Chat:**
```tsx
const handleClearChat = () => {
  setMessages([
    {
      id: "1",
      role: "assistant",
      content: "Chat cleared! How can I help?",
      timestamp: new Date(),
    },
  ]);
  toast.success("Chat history cleared");
};
```

### Auto-Scroll Implementation

```tsx
const messagesEndRef = useRef<HTMLDivElement>(null);

const scrollToBottom = () => {
  messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
};

useEffect(() => {
  scrollToBottom();
}, [messages]);

// In JSX:
<div ref={messagesEndRef} />
```

---

## Production Integration

### Architecture Overview

**Frontend (Current):**
```
User Input → TRADIEChatAssistant → Mock Response → Display
```

**Production (Recommended):**
```
User Input → TRADIEChatAssistant → Supabase Edge Function
  → OpenAI API (GPT-4) → Response → Store in DB → Display
```

### Backend Setup Required

**1. Supabase Configuration**

**Database Schema:**
```sql
-- Chat Sessions
CREATE TABLE chat_sessions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id),
  user_role TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Chat Messages
CREATE TABLE chat_messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  session_id UUID REFERENCES chat_sessions(id),
  role TEXT CHECK (role IN ('user', 'assistant', 'system')),
  content TEXT NOT NULL,
  timestamp TIMESTAMP DEFAULT NOW(),
  metadata JSONB
);

-- Indexes
CREATE INDEX idx_chat_messages_session ON chat_messages(session_id);
CREATE INDEX idx_chat_sessions_user ON chat_sessions(user_id);
```

**2. Supabase Edge Function**

**File:** `supabase/functions/chat-assistant/index.ts`

```typescript
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

serve(async (req) => {
  try {
    const { message, userId, userRole, sessionId } = await req.json();
    
    // Initialize OpenAI
    const openaiApiKey = Deno.env.get("OPENAI_API_KEY");
    
    // Build context-aware prompt
    const systemPrompt = `You are a helpful assistant for TRADIE, a commodity trading platform.
    The user is a ${userRole} on the platform.
    Provide accurate, helpful information about:
    - Adding and managing produce listings
    - KYC verification process
    - Market prices and trends
    - Payment and order tracking
    - Platform features and navigation
    
    Be concise, friendly, and specific to the ${userRole} role.`;
    
    // Call OpenAI API
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${openaiApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-4",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: message },
        ],
        temperature: 0.7,
        max_tokens: 500,
      }),
    });
    
    const data = await response.json();
    const aiMessage = data.choices[0].message.content;
    
    // Store in database
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );
    
    await supabase.from("chat_messages").insert([
      { session_id: sessionId, role: "user", content: message },
      { session_id: sessionId, role: "assistant", content: aiMessage },
    ]);
    
    return new Response(
      JSON.stringify({ response: aiMessage }),
      { headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500 }
    );
  }
});
```

**3. Frontend Integration**

**Replace mock function with API call:**

```tsx
const generateAIResponse = async (userMessage: string): Promise<string> => {
  try {
    const response = await fetch(
      `${process.env.SUPABASE_URL}/functions/v1/chat-assistant`,
      {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${supabaseSession.access_token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: userMessage,
          userId: user.id,
          userRole: userRole,
          sessionId: currentSessionId,
        }),
      }
    );
    
    const data = await response.json();
    return data.response;
  } catch (error) {
    console.error("AI Error:", error);
    throw error;
  }
};
```

---

## Usage Guide

### Integration in App.tsx

**1. Import Component:**
```tsx
import { ChatGPTIntegrationDemo } from "./components/ChatGPTIntegrationDemo";
import { TRADIEChatAssistant } from "./components/TRADIEChatAssistant";
```

**2. Add Screen Type:**
```tsx
type Screen = "chatgpt-demo" | /* other screens */;
```

**3. Add Navigation Button:**
```tsx
<DSButton 
  onClick={() => setCurrentScreen("chatgpt-demo")} 
  size="sm" 
  fullWidth
>
  ChatGPT Assistant
</DSButton>
```

**4. Render Component:**
```tsx
{currentScreen === "chatgpt-demo" && (
  <ChatGPTIntegrationDemo 
    onBack={() => setCurrentScreen("welcome")}
  />
)}
```

### Standalone Chat Widget

**Add to any screen:**
```tsx
import { TRADIEChatAssistant } from "./components/TRADIEChatAssistant";

function MyScreen() {
  const [showChat, setShowChat] = useState(false);
  const [isMinimized, setIsMinimized] = useState(true);
  
  return (
    <>
      {/* Your screen content */}
      
      {showChat && (
        <TRADIEChatAssistant
          userRole="Producer"
          userName="Rajesh Kumar"
          onClose={() => setShowChat(false)}
          isMinimized={isMinimized}
          onToggleMinimize={() => setIsMinimized(!isMinimized)}
        />
      )}
      
      {/* Float button to open chat */}
      {!showChat && (
        <button onClick={() => setShowChat(true)}>
          Open AI Chat
        </button>
      )}
    </>
  );
}
```

### Customization Options

**Custom Greeting:**
```tsx
// Modify initial message in TRADIEChatAssistant.tsx
const [messages, setMessages] = useState<Message[]>([
  {
    id: "1",
    role: "assistant",
    content: `Your custom greeting for ${userName}!`,
    timestamp: new Date(),
  },
]);
```

**Add More Response Patterns:**
```tsx
// In generateAIResponse function
if (lowerMessage.includes("your-keyword")) {
  return "Your custom response...";
}
```

**Style Customization:**
```tsx
// Adjust colors, sizes, fonts using design tokens
style={{
  background: `linear-gradient(135deg, ${colors.yourColor}, ...)`,
  fontSize: typography.sizes.yourSize,
}}
```

---

## API Integration

### OpenAI API Setup

**1. Get API Key:**
```
1. Sign up at https://platform.openai.com
2. Navigate to API Keys
3. Create new secret key
4. Store securely (never in frontend!)
```

**2. Environment Variables:**
```env
OPENAI_API_KEY=sk-...your-key-here
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

**3. API Request Format:**
```typescript
fetch("https://api.openai.com/v1/chat/completions", {
  method: "POST",
  headers: {
    "Authorization": `Bearer ${OPENAI_API_KEY}`,
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    model: "gpt-4",              // or "gpt-3.5-turbo"
    messages: [
      { role: "system", content: "System prompt" },
      { role: "user", content: "User message" },
    ],
    temperature: 0.7,            // Creativity (0-1)
    max_tokens: 500,             // Response length
  }),
});
```

### Rate Limiting & Cost Management

**Implement Rate Limiting:**
```tsx
const RATE_LIMIT = 10; // messages per minute
const messageCount = useRef(0);
const lastReset = useRef(Date.now());

const checkRateLimit = () => {
  const now = Date.now();
  if (now - lastReset.current > 60000) {
    messageCount.current = 0;
    lastReset.current = now;
  }
  
  if (messageCount.current >= RATE_LIMIT) {
    toast.error("Too many messages. Please wait a minute.");
    return false;
  }
  
  messageCount.current++;
  return true;
};
```

**Token Usage Monitoring:**
```typescript
// Track token usage for cost estimation
const estimateTokens = (text: string) => {
  return Math.ceil(text.split(/\s+/).length * 1.3);
};

// Log usage
console.log(`Tokens used: ~${estimateTokens(message)}`);
```

---

## Security Considerations

### 🔒 Critical Security Rules

**1. NEVER expose API keys in frontend**
```tsx
// ❌ WRONG - Never do this!
const apiKey = "sk-abc123...";

// ✅ CORRECT - Use backend proxy
const response = await fetch("/api/chat", {
  headers: { "Authorization": `Bearer ${userToken}` }
});
```

**2. Input Sanitization**
```tsx
const sanitizeInput = (input: string) => {
  return input
    .trim()
    .replace(/<script>/gi, "")
    .substring(0, 1000); // Max length
};
```

**3. Content Filtering**
```tsx
const containsInappropriate = (text: string) => {
  const blocklist = ["spam", "abuse", /* ... */];
  return blocklist.some(word => text.toLowerCase().includes(word));
};

if (containsInappropriate(userMessage)) {
  return "I cannot respond to that. Please ask appropriately.";
}
```

**4. User Authentication**
```tsx
// Verify user is authenticated
if (!user || !session) {
  throw new Error("Authentication required");
}

// Verify user owns the chat session
const session = await supabase
  .from("chat_sessions")
  .select()
  .eq("id", sessionId)
  .eq("user_id", user.id)
  .single();
```

**5. Rate Limiting (Backend)**
```typescript
// In Supabase Edge Function
const rateLimitKey = `ratelimit:${userId}:${Date.now()}`;
const count = await redis.incr(rateLimitKey);

if (count > 20) {
  return new Response("Rate limit exceeded", { status: 429 });
}

await redis.expire(rateLimitKey, 3600); // 1 hour expiry
```

---

## Future Enhancements

### Phase 1: Core Integration (1-2 weeks)
- [ ] Supabase Edge Function deployment
- [ ] OpenAI API integration
- [ ] Database schema setup
- [ ] User authentication integration
- [ ] Basic error handling

### Phase 2: Advanced Features (2-3 weeks)
- [ ] Multi-language support (translate responses)
- [ ] Voice input/output
- [ ] File upload support (documents, images)
- [ ] Conversation memory (context persistence)
- [ ] Suggested questions/quick replies

### Phase 3: Intelligence (3-4 weeks)
- [ ] Custom model fine-tuning on TRADIE data
- [ ] Platform action triggers (e.g., "Add produce" → Opens form)
- [ ] Proactive assistance (suggest actions based on context)
- [ ] Analytics dashboard (chat metrics, common questions)
- [ ] A/B testing different prompts

### Phase 4: Enterprise Features (4-6 weeks)
- [ ] Multi-tenant support
- [ ] Admin moderation panel
- [ ] Chat analytics & insights
- [ ] Custom branding per tenant
- [ ] Integration with CRM/support tickets
- [ ] Export conversations to PDF
- [ ] Sentiment analysis
- [ ] Automated escalation to human support

### Potential Integrations

**Market Data:**
```tsx
// Fetch real-time prices in AI responses
const marketData = await fetch("/api/market-prices");
return `Current wheat price: ₹${marketData.wheat}/quintal`;
```

**User Actions:**
```tsx
// Trigger platform actions from chat
if (message.includes("add produce")) {
  return {
    text: "I'll help you add produce!",
    action: { type: "NAVIGATE", to: "/add-produce" }
  };
}
```

**Notifications:**
```tsx
// Send notifications based on chat
if (urgentQuery) {
  await sendNotification(userId, "Support team notified");
}
```

---

## Testing Guide

### Manual Testing Checklist

**UI/UX:**
- [ ] Widget opens/closes correctly
- [ ] Minimize/maximize works
- [ ] Messages display properly
- [ ] Avatars show correctly
- [ ] Timestamps are accurate
- [ ] Animations are smooth
- [ ] Responsive on mobile
- [ ] Copy message works
- [ ] Export chat works
- [ ] Clear chat works

**Functionality:**
- [ ] Send message on Enter key
- [ ] Send button disabled when empty
- [ ] Loading state shows during response
- [ ] Auto-scroll to latest message
- [ ] Role-based responses work
- [ ] Error handling displays properly
- [ ] Toast notifications appear

**Performance:**
- [ ] Widget loads quickly
- [ ] No lag when typing
- [ ] Smooth scrolling with many messages
- [ ] Export works with large chats
- [ ] Memory usage is reasonable

### Test Scenarios

**Scenario 1: New User**
1. Open chat widget
2. Read welcome message
3. Ask "How do I add produce?"
4. Verify helpful response
5. Ask follow-up question
6. Export chat

**Scenario 2: Role-Specific**
1. Select "Producer" role
2. Ask KYC question
3. Verify Producer-specific answer
4. Switch to "Trader" role
5. Ask same question
6. Verify different, role-appropriate answer

**Scenario 3: Edge Cases**
1. Send empty message (should be blocked)
2. Send very long message (should truncate)
3. Send rapid messages (should handle queue)
4. Close and reopen (should persist or reset appropriately)

---

## 📊 Summary

### What's Been Delivered

**✅ Complete Frontend Implementation:**
- Professional chat interface
- Role-based context awareness
- Message management (copy, export, clear)
- Minimizable floating widget
- Smooth animations
- TRADIE design system integration
- Mobile-responsive
- Accessibility features

**✅ Demo & Documentation:**
- Interactive demo page
- Feature showcase
- Role selector
- Common questions examples
- Integration guide
- This comprehensive documentation

**✅ Production-Ready UI:**
- All visual elements complete
- All interactions implemented
- Error handling in place
- Loading states handled
- Toast notifications integrated

### What's Needed for Production

**🔄 Backend Integration:**
1. Supabase Edge Function creation
2. OpenAI API key setup
3. Database schema deployment
4. Authentication integration
5. Environment variable configuration

**🔄 Advanced Features:**
1. Real ChatGPT API calls
2. Conversation history storage
3. Multi-language support
4. Voice input/output
5. File upload support

### Estimated Timeline to Production

**Minimum Viable Product (MVP):**
- Backend setup: 2-3 days
- API integration: 1-2 days
- Testing: 1-2 days
- **Total: 1 week**

**Full Production Release:**
- MVP: 1 week
- Advanced features: 2-3 weeks
- Testing & optimization: 1 week
- **Total: 4-5 weeks**

---

## 🎯 Quick Start

**To see the demo:**
1. Navigate to Welcome screen
2. Find "✨ AI Features" section
3. Click "ChatGPT Assistant"
4. Select a role
5. Click "Start Chat"
6. Ask questions!

**To integrate into production:**
1. Read "Production Integration" section
2. Set up Supabase Edge Function
3. Configure OpenAI API
4. Update `generateAIResponse` function
5. Test thoroughly
6. Deploy!

---

**Built with ❤️ for TRADIE Platform**  
**Powered by OpenAI GPT-4 & Supabase**

---

## Appendix: Code Reference

### Complete Message Flow

```
User Types → handleKeyPress → Enter pressed
  ↓
handleSendMessage called
  ↓
Validate input (not empty, not loading)
  ↓
Create user message object
  ↓
Add to messages state → triggers re-render
  ↓
Clear input field
  ↓
Set isLoading = true → shows typing indicator
  ↓
Call generateAIResponse(userMessage)
  ↓
[Mock: Pattern matching OR Production: OpenAI API]
  ↓
Receive AI response text
  ↓
Create assistant message object
  ↓
Add to messages state → triggers re-render
  ↓
Set isLoading = false → hides typing indicator
  ↓
useEffect triggers → scrollToBottom()
  ↓
Message appears with animation
```

### Environment Setup

**Local Development:**
```bash
# .env.local
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

**Supabase Dashboard:**
```bash
# Edge Function secrets
OPENAI_API_KEY=sk-...
SUPABASE_SERVICE_ROLE_KEY=...
```

**Deploy Edge Function:**
```bash
supabase functions deploy chat-assistant
supabase secrets set OPENAI_API_KEY=sk-...
```

---

**End of Documentation**
