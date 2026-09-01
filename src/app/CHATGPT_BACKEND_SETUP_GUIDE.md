# 🚀 ChatGPT Backend Setup - Quick Start Guide

**For Production Integration**

---

## 📋 Prerequisites

- [ ] Supabase account
- [ ] OpenAI API account
- [ ] TRADIE app with Supabase connection
- [ ] API key budget allocated

---

## Step 1: OpenAI API Setup

### 1.1 Create OpenAI Account
```
1. Go to https://platform.openai.com
2. Sign up or log in
3. Navigate to "API Keys" section
4. Click "Create new secret key"
5. Name it "TRADIE-ChatBot"
6. Copy the key (you'll only see it once!)
```

**Save your key:**
```
sk-proj-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

### 1.2 Set Billing
```
1. Go to Settings → Billing
2. Add payment method
3. Set usage limits (recommended: $50/month to start)
4. Enable usage notifications
```

**Pricing (GPT-4):**
- Input: $0.03 / 1K tokens
- Output: $0.06 / 1K tokens
- Average chat: ~500 tokens = $0.03

---

## Step 2: Supabase Database Setup

### 2.1 Create Tables

**Run in Supabase SQL Editor:**

```sql
-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Chat Sessions Table
CREATE TABLE chat_sessions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  user_role TEXT NOT NULL,
  session_name TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  is_active BOOLEAN DEFAULT true
);

-- Chat Messages Table
CREATE TABLE chat_messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  session_id UUID REFERENCES chat_sessions(id) ON DELETE CASCADE,
  role TEXT NOT NULL CHECK (role IN ('user', 'assistant', 'system')),
  content TEXT NOT NULL,
  timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  metadata JSONB,
  token_count INTEGER
);

-- Indexes for performance
CREATE INDEX idx_chat_sessions_user ON chat_sessions(user_id);
CREATE INDEX idx_chat_sessions_active ON chat_sessions(is_active);
CREATE INDEX idx_chat_messages_session ON chat_messages(session_id);
CREATE INDEX idx_chat_messages_timestamp ON chat_messages(timestamp);

-- Row Level Security
ALTER TABLE chat_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_messages ENABLE ROW LEVEL SECURITY;

-- Policies: Users can only access their own chats
CREATE POLICY "Users can view their own chat sessions"
  ON chat_sessions FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own chat sessions"
  ON chat_sessions FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own chat sessions"
  ON chat_sessions FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can view messages in their sessions"
  ON chat_messages FOR SELECT
  USING (
    session_id IN (
      SELECT id FROM chat_sessions WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Users can create messages in their sessions"
  ON chat_messages FOR INSERT
  WITH CHECK (
    session_id IN (
      SELECT id FROM chat_sessions WHERE user_id = auth.uid()
    )
  );
```

### 2.2 Verify Tables
```sql
-- Check tables were created
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_name LIKE 'chat_%';

-- Should return: chat_sessions, chat_messages
```

---

## Step 3: Create Supabase Edge Function

### 3.1 Initialize Function

**In your terminal:**
```bash
# Login to Supabase
supabase login

# Link to your project
supabase link --project-ref your-project-ref

# Create the function
supabase functions new chat-assistant
```

### 3.2 Function Code

**File: `supabase/functions/chat-assistant/index.ts`**

```typescript
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface ChatRequest {
  message: string;
  sessionId?: string;
  userRole: string;
}

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    // Get request data
    const { message, sessionId, userRole }: ChatRequest = await req.json();

    // Validate input
    if (!message || message.trim().length === 0) {
      throw new Error("Message is required");
    }

    // Get authenticated user
    const authHeader = req.headers.get("Authorization")!;
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    
    const supabase = createClient(supabaseUrl, supabaseKey, {
      global: { headers: { Authorization: authHeader } },
    });

    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      throw new Error("Unauthorized");
    }

    // Create or get session
    let currentSessionId = sessionId;
    
    if (!currentSessionId) {
      const { data: newSession, error: sessionError } = await supabase
        .from("chat_sessions")
        .insert({
          user_id: user.id,
          user_role: userRole,
          session_name: `Chat ${new Date().toLocaleDateString()}`,
        })
        .select()
        .single();

      if (sessionError) throw sessionError;
      currentSessionId = newSession.id;
    }

    // Build context-aware system prompt
    const systemPrompt = `You are a helpful AI assistant for TRADIE, a commodity trading platform in India.

The user is a ${userRole} on the platform. Provide helpful, accurate, and concise information about:

**For Producers:**
- Adding and managing produce listings
- Quality certification and grading
- Land ownership documentation
- Payment tracking and withdrawal
- Market price alerts

**For Traders:**
- Bulk ordering and procurement
- Credit facilities and payment terms
- Price negotiation
- Logistics and warehousing

**For Buyers:**
- Quality verification and inspection
- Delivery options and tracking
- Return and refund policies
- Payment methods

**General Topics:**
- KYC verification process and documents
- Platform navigation and features
- Multi-language support (34 Indian + 60+ global languages)
- Contact support options
- Market trends and commodity prices

Be friendly, professional, and specific to the ${userRole} role. Use examples relevant to Indian agriculture and commodity trading. Keep responses under 200 words when possible.`;

    // Call OpenAI API
    const openaiApiKey = Deno.env.get("OPENAI_API_KEY");
    
    if (!openaiApiKey) {
      throw new Error("OpenAI API key not configured");
    }

    const openaiResponse = await fetch("https://api.openai.com/v1/chat/completions", {
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
        presence_penalty: 0.6,
        frequency_penalty: 0.3,
      }),
    });

    if (!openaiResponse.ok) {
      const error = await openaiResponse.json();
      console.error("OpenAI Error:", error);
      throw new Error("Failed to get AI response");
    }

    const openaiData = await openaiResponse.json();
    const aiMessage = openaiData.choices[0].message.content;
    const tokensUsed = openaiData.usage.total_tokens;

    // Store messages in database
    const { error: messagesError } = await supabase
      .from("chat_messages")
      .insert([
        {
          session_id: currentSessionId,
          role: "user",
          content: message,
          token_count: tokensUsed / 2, // Approximate
        },
        {
          session_id: currentSessionId,
          role: "assistant",
          content: aiMessage,
          token_count: tokensUsed / 2, // Approximate
        },
      ]);

    if (messagesError) {
      console.error("Error storing messages:", messagesError);
      // Don't throw - still return the response
    }

    // Update session timestamp
    await supabase
      .from("chat_sessions")
      .update({ updated_at: new Date().toISOString() })
      .eq("id", currentSessionId);

    // Return response
    return new Response(
      JSON.stringify({
        response: aiMessage,
        sessionId: currentSessionId,
        tokensUsed,
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      }
    );

  } catch (error) {
    console.error("Function error:", error);
    
    return new Response(
      JSON.stringify({
        error: error.message || "An error occurred",
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 400,
      }
    );
  }
});
```

### 3.3 Deploy Function

```bash
# Set secrets
supabase secrets set OPENAI_API_KEY=sk-your-key-here

# Deploy
supabase functions deploy chat-assistant

# Test deployment
supabase functions invoke chat-assistant \
  --data '{"message":"Hello","userRole":"Producer"}' \
  --headers '{"Authorization":"Bearer YOUR_ANON_KEY"}'
```

---

## Step 4: Update Frontend Code

### 4.1 Create API Client

**File: `/lib/chatApi.ts`**

```typescript
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export interface ChatMessage {
  message: string;
  sessionId?: string;
  userRole: string;
}

export interface ChatResponse {
  response: string;
  sessionId: string;
  tokensUsed: number;
}

export async function sendChatMessage(
  message: string,
  userRole: string,
  sessionId?: string
): Promise<ChatResponse> {
  const { data: { session } } = await supabase.auth.getSession();
  
  if (!session) {
    throw new Error("User not authenticated");
  }

  const response = await supabase.functions.invoke("chat-assistant", {
    body: {
      message,
      userRole,
      sessionId,
    },
  });

  if (response.error) {
    throw new Error(response.error.message);
  }

  return response.data;
}

export async function getChatHistory(sessionId: string) {
  const { data, error } = await supabase
    .from("chat_messages")
    .select("*")
    .eq("session_id", sessionId)
    .order("timestamp", { ascending: true });

  if (error) throw error;
  return data;
}

export async function getUserSessions(userId: string) {
  const { data, error } = await supabase
    .from("chat_sessions")
    .select("*")
    .eq("user_id", userId)
    .eq("is_active", true)
    .order("updated_at", { ascending: false });

  if (error) throw error;
  return data;
}
```

### 4.2 Update TRADIEChatAssistant

**In `TRADIEChatAssistant.tsx`, replace the mock function:**

```typescript
import { sendChatMessage } from "../lib/chatApi";

// Replace generateAIResponse function with:
const generateAIResponse = async (userMessage: string): Promise<string> => {
  try {
    const response = await sendChatMessage(
      userMessage,
      userRole,
      currentSessionId
    );
    
    setCurrentSessionId(response.sessionId);
    
    // Optional: Track token usage
    console.log(`Tokens used: ${response.tokensUsed}`);
    
    return response.response;
  } catch (error) {
    console.error("Chat error:", error);
    toast.error("Failed to get response. Please try again.");
    throw error;
  }
};
```

---

## Step 5: Testing

### 5.1 Test Checklist

- [ ] User can authenticate
- [ ] Chat widget opens
- [ ] Message sends successfully
- [ ] AI response appears
- [ ] Messages stored in database
- [ ] Session persists
- [ ] Different roles get different responses
- [ ] Error handling works
- [ ] Rate limiting works (if implemented)

### 5.2 Test Commands

**Check database:**
```sql
-- View recent sessions
SELECT * FROM chat_sessions 
ORDER BY created_at DESC 
LIMIT 10;

-- View recent messages
SELECT * FROM chat_messages 
ORDER BY timestamp DESC 
LIMIT 20;

-- Token usage per user
SELECT 
  cs.user_id,
  SUM(cm.token_count) as total_tokens,
  COUNT(cm.id) as message_count
FROM chat_sessions cs
JOIN chat_messages cm ON cs.id = cm.session_id
GROUP BY cs.user_id;
```

**Test Edge Function:**
```bash
curl -X POST \
  https://your-project.supabase.co/functions/v1/chat-assistant \
  -H "Authorization: Bearer YOUR_ANON_KEY" \
  -H "Content-Type: application/json" \
  -d '{"message":"How do I add produce?","userRole":"Producer"}'
```

---

## Step 6: Production Optimizations

### 6.1 Add Rate Limiting

**Create rate limit table:**
```sql
CREATE TABLE rate_limits (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id),
  endpoint TEXT,
  request_count INTEGER DEFAULT 0,
  window_start TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, endpoint)
);

CREATE INDEX idx_rate_limits_user ON rate_limits(user_id);
```

**Add to Edge Function:**
```typescript
// Before calling OpenAI
const rateLimit = await checkRateLimit(user.id, "chat-assistant");
if (rateLimit.exceeded) {
  throw new Error("Rate limit exceeded. Please try again later.");
}
```

### 6.2 Add Monitoring

**Create analytics table:**
```sql
CREATE TABLE chat_analytics (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  session_id UUID REFERENCES chat_sessions(id),
  event_type TEXT,
  metadata JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### 6.3 Cost Monitoring

**Track daily usage:**
```sql
CREATE VIEW daily_token_usage AS
SELECT 
  DATE(timestamp) as date,
  COUNT(*) as message_count,
  SUM(token_count) as total_tokens,
  SUM(token_count) * 0.00003 as estimated_cost_usd
FROM chat_messages
GROUP BY DATE(timestamp)
ORDER BY date DESC;

-- Check today's usage
SELECT * FROM daily_token_usage WHERE date = CURRENT_DATE;
```

---

## 🎉 You're Done!

### Verification Steps

1. ✅ OpenAI API key is set
2. ✅ Database tables created
3. ✅ Edge function deployed
4. ✅ Frontend updated
5. ✅ Testing completed
6. ✅ Monitoring in place

### Next Steps

- Monitor usage and costs
- Gather user feedback
- Fine-tune prompts
- Add more features (voice, file upload, etc.)
- Scale as needed

---

## 📞 Support

**Issues?**
- Check Supabase logs: Dashboard → Edge Functions → Logs
- Check OpenAI usage: platform.openai.com → Usage
- Review database: Supabase → Table Editor

**Common Errors:**
- "Unauthorized" → Check auth token
- "API key not configured" → Set secrets
- "Rate limit" → Wait or increase limits
- "Database error" → Check RLS policies

---

**Setup Time: ~2-3 hours**  
**Ready for production!** 🚀
