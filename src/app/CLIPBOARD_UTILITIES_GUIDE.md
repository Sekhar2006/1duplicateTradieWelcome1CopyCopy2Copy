# 📋 Clipboard Utilities Guide

**Universal clipboard operations for TRADIE Platform**  
**Date:** October 22, 2025  
**Status:** 🚀 Production Ready

---

## 🎯 Overview

A comprehensive clipboard utility library that works in **all environments**, including:
- ✅ Modern browsers (Chrome, Firefox, Safari, Edge)
- ✅ Legacy browsers (IE11, old mobile browsers)
- ✅ Insecure contexts (HTTP, localhost)
- ✅ Restricted contexts (iframes, Figma Make)
- ✅ Mobile devices (iOS Safari, Android Chrome)

**File:** `/components/ui/clipboard-utils.ts`

---

## 🚀 Quick Start

### **Basic Usage:**

```typescript
import { copyToClipboard } from './components/ui/clipboard-utils';

// Simple copy
await copyToClipboard('Hello World');

// Copy with custom message
await copyToClipboard('Token123', {
  successMessage: 'Token copied!',
  fallbackMessage: 'Token: Token123'
});
```

---

## 📚 Available Functions

### **1. copyToClipboard(text, options)**

Main function for copying text with multi-level fallback.

**Parameters:**
```typescript
text: string                    // Text to copy
options?: {
  successMessage?: string       // Toast on success (default: "Copied to clipboard!")
  fallbackMessage?: string      // Toast when manual copy needed
  fallbackDuration?: number     // Toast duration in ms (default: 10000)
  silent?: boolean              // No toast notifications (default: false)
}
```

**Returns:** `Promise<boolean>` - True if copied successfully

**Examples:**

```typescript
// Basic
await copyToClipboard('Hello');

// Custom success message
await copyToClipboard('TRD-VEG-123456', {
  successMessage: 'Token copied!'
});

// Silent mode (no toast)
await copyToClipboard('data', { silent: true });

// Custom fallback
await copyToClipboard('Secret123', {
  successMessage: 'Secret copied!',
  fallbackMessage: 'Secret: Secret123',
  fallbackDuration: 15000 // 15 seconds
});
```

---

### **2. isClipboardAvailable()**

Check if modern Clipboard API is available.

**Returns:** `boolean`

**Example:**

```typescript
import { isClipboardAvailable } from './components/ui/clipboard-utils';

if (isClipboardAvailable()) {
  console.log('Modern clipboard API available');
} else {
  console.log('Using fallback methods');
}
```

---

### **3. copyWithFeedback(text, callback, duration)**

Copy with visual feedback (button state change).

**Parameters:**
```typescript
text: string                              // Text to copy
callback: (copied: boolean) => void       // State update callback
duration?: number                         // Feedback duration in ms (default: 2000)
```

**Example:**

```typescript
import { copyWithFeedback } from './components/ui/clipboard-utils';
import { useState } from 'react';

function CopyButton() {
  const [copied, setCopied] = useState(false);
  
  return (
    <Button onClick={() => copyWithFeedback('text', setCopied)}>
      {copied ? '✓ Copied!' : 'Copy'}
    </Button>
  );
}
```

---

### **4. copyMultiple(items, format)**

Copy multiple key-value pairs as formatted text.

**Parameters:**
```typescript
items: Array<{ label: string; value: string }>
format?: 'list' | 'json' | 'csv'  // default: 'list'
```

**Examples:**

```typescript
import { copyMultiple } from './components/ui/clipboard-utils';

// Copy as list
await copyMultiple([
  { label: 'Name', value: 'John Doe' },
  { label: 'Email', value: 'john@example.com' },
  { label: 'Phone', value: '+1234567890' }
], 'list');

// Result:
// Name: John Doe
// Email: john@example.com
// Phone: +1234567890

// Copy as JSON
await copyMultiple([
  { label: 'token', value: 'TRD123' },
  { label: 'status', value: 'active' }
], 'json');

// Result:
// {
//   "token": "TRD123",
//   "status": "active"
// }

// Copy as CSV
await copyMultiple([
  { label: 'Name', value: 'John' },
  { label: 'Age', value: '30' }
], 'csv');

// Result:
// "Name","John"
// "Age","30"
```

---

### **5. copyCode(code, language)**

Copy code with syntax preservation.

**Parameters:**
```typescript
code: string          // Code to copy
language?: string     // Language name for toast message
```

**Example:**

```typescript
import { copyCode } from './components/ui/clipboard-utils';

await copyCode('console.log("Hello World")', 'javascript');
// Toast: "javascript code copied!"

await copyCode('<div>Hello</div>', 'html');
// Toast: "html code copied!"
```

---

### **6. smartCopy(content)**

Automatically detect content type and format message.

**Detects:**
- URLs (https://...)
- Emails (user@domain.com)
- Phone numbers (+1234567890)

**Example:**

```typescript
import { smartCopy } from './components/ui/clipboard-utils';

await smartCopy('https://example.com');
// Toast: "URL copied!"

await smartCopy('user@example.com');
// Toast: "Email copied!"

await smartCopy('+91 98765 43210');
// Toast: "Phone number copied!"

await smartCopy('Regular text');
// Toast: "Copied!"
```

---

### **7. copyWithCustomToast(text, toastOptions)**

Copy with fully customized toast notification.

**Parameters:**
```typescript
text: string
toastOptions: {
  title?: string
  description?: string
  icon?: string
}
```

**Example:**

```typescript
import { copyWithCustomToast } from './components/ui/clipboard-utils';

await copyWithCustomToast('Sensitive data', {
  title: '🔒 Secure Data Copied!',
  description: 'Keep it safe',
  icon: '🔐'
});
```

---

### **8. batchCopy(items, delay)**

Copy multiple items sequentially with delay.

**Parameters:**
```typescript
items: string[]      // Array of texts to copy
delay?: number       // Delay between copies in ms (default: 1000)
```

**Example:**

```typescript
import { batchCopy } from './components/ui/clipboard-utils';

const tokens = ['TRD-001', 'TRD-002', 'TRD-003'];
const results = await batchCopy(tokens, 1500);

console.log(results); // [true, true, true]
// Toast: "Copied 1/3"
// ... wait 1.5s ...
// Toast: "Copied 2/3"
// ... wait 1.5s ...
// Toast: "Copied 3/3"
```

---

## 🎨 Real-World Examples

### **Example 1: Copy Button in Card**

```typescript
import { copyToClipboard } from './components/ui/clipboard-utils';
import { Button } from './components/ui/button';
import { Card } from './components/ui/card';

function TokenCard({ token }: { token: string }) {
  return (
    <Card className="p-4">
      <div className="flex items-center justify-between">
        <code className="font-mono">{token}</code>
        <Button 
          size="sm" 
          onClick={() => copyToClipboard(token, {
            successMessage: 'Token copied!',
            fallbackMessage: `Token: ${token}`
          })}
        >
          Copy
        </Button>
      </div>
    </Card>
  );
}
```

---

### **Example 2: Copy Button with State**

```typescript
import { copyWithFeedback } from './components/ui/clipboard-utils';
import { useState } from 'react';
import { Button } from './components/ui/button';
import { Check, Copy } from 'lucide-react';

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  
  return (
    <Button 
      variant={copied ? 'default' : 'outline'}
      onClick={() => copyWithFeedback(text, setCopied, 2000)}
    >
      {copied ? (
        <>
          <Check className="w-4 h-4 mr-2" />
          Copied!
        </>
      ) : (
        <>
          <Copy className="w-4 h-4 mr-2" />
          Copy
        </>
      )}
    </Button>
  );
}
```

---

### **Example 3: Copy User Details**

```typescript
import { copyMultiple } from './components/ui/clipboard-utils';
import { Button } from './components/ui/button';

function UserProfile({ user }: { user: User }) {
  const copyUserDetails = async () => {
    await copyMultiple([
      { label: 'Name', value: user.name },
      { label: 'Email', value: user.email },
      { label: 'Phone', value: user.phone },
      { label: 'ID', value: user.id }
    ], 'list');
  };
  
  return (
    <div>
      <h2>{user.name}</h2>
      <Button onClick={copyUserDetails}>
        Copy Details
      </Button>
    </div>
  );
}
```

---

### **Example 4: Smart Copy Links**

```typescript
import { smartCopy } from './components/ui/clipboard-utils';
import { Button } from './components/ui/button';
import { ExternalLink } from 'lucide-react';

function ShareButton({ url }: { url: string }) {
  return (
    <Button onClick={() => smartCopy(url)}>
      <ExternalLink className="w-4 h-4 mr-2" />
      Share Link
    </Button>
  );
}

// Usage:
<ShareButton url="https://tradie.com/share/123" />
// Toast: "URL copied!"
```

---

### **Example 5: Copy Code Snippet**

```typescript
import { copyCode } from './components/ui/clipboard-utils';
import { Button } from './components/ui/button';
import { Code } from 'lucide-react';

function CodeBlock({ code, language }: { code: string; language: string }) {
  return (
    <div className="relative">
      <pre className="p-4 bg-gray-900 text-white rounded">
        <code>{code}</code>
      </pre>
      <Button 
        size="sm"
        variant="ghost"
        className="absolute top-2 right-2"
        onClick={() => copyCode(code, language)}
      >
        <Code className="w-4 h-4" />
      </Button>
    </div>
  );
}
```

---

### **Example 6: Batch Copy Tokens**

```typescript
import { batchCopy } from './components/ui/clipboard-utils';
import { Button } from './components/ui/button';

function TokenList({ tokens }: { tokens: string[] }) {
  return (
    <div>
      <h3>Generated Tokens ({tokens.length})</h3>
      <ul>
        {tokens.map(token => (
          <li key={token}>{token}</li>
        ))}
      </ul>
      <Button onClick={() => batchCopy(tokens, 1000)}>
        Copy All Tokens
      </Button>
    </div>
  );
}
```

---

## 🔧 Integration Examples

### **Quality Check Workflow (Already Implemented)**

```typescript
import { copyToClipboard } from '../ui/clipboard-utils';

<Button
  onClick={() => copyToClipboard(generatedToken, {
    successMessage: 'Token copied to clipboard!',
    fallbackMessage: `Token: ${generatedToken}`
  })}
>
  Copy
</Button>
```

---

### **Referral Code Sharing**

```typescript
import { smartCopy } from './components/ui/clipboard-utils';

function ReferralCard({ code }: { code: string }) {
  return (
    <Button onClick={() => smartCopy(code)}>
      Share Referral Code
    </Button>
  );
}
```

---

### **Order ID Copy**

```typescript
import { copyToClipboard } from './components/ui/clipboard-utils';

function OrderDetails({ orderId }: { orderId: string }) {
  return (
    <div className="flex items-center gap-2">
      <span>Order #{orderId}</span>
      <Button 
        size="sm" 
        variant="ghost"
        onClick={() => copyToClipboard(orderId, {
          successMessage: 'Order ID copied!'
        })}
      >
        Copy
      </Button>
    </div>
  );
}
```

---

## 🎯 Best Practices

### **1. Always Provide Fallback Message**

```typescript
// ✅ Good
await copyToClipboard(token, {
  successMessage: 'Token copied!',
  fallbackMessage: `Token: ${token}`  // User can see token if copy fails
});

// ❌ Bad
await copyToClipboard(token);  // User has no way to get token if copy fails
```

---

### **2. Use Appropriate Functions**

```typescript
// ✅ Good - Use smartCopy for URLs
await smartCopy('https://example.com');  // "URL copied!"

// ❌ Okay but less informative
await copyToClipboard('https://example.com');  // "Copied to clipboard!"
```

---

### **3. Handle Sensitive Data**

```typescript
// ✅ Good - Silent mode for sensitive data
await copyToClipboard(apiKey, { 
  silent: true,  // No toast with sensitive data
  successMessage: 'API key copied'
});

// ❌ Bad - Shows sensitive data in toast
await copyToClipboard(apiKey, {
  fallbackMessage: `API Key: ${apiKey}`  // Exposed in toast!
});
```

---

### **4. Provide Visual Feedback**

```typescript
// ✅ Good - Button state changes
const [copied, setCopied] = useState(false);
<Button onClick={() => copyWithFeedback(text, setCopied)}>
  {copied ? 'Copied!' : 'Copy'}
</Button>

// ❌ Bad - No visual feedback
<Button onClick={() => copyToClipboard(text, { silent: true })}>
  Copy
</Button>
```

---

## 📱 Mobile Considerations

### **iOS Safari:**
- ✅ Clipboard API works with user gesture
- ✅ execCommand fallback available
- ⚠️ May show "Paste" prompt

### **Android Chrome:**
- ✅ Full Clipboard API support
- ✅ All fallbacks work

### **Best Practices for Mobile:**

```typescript
// Use appropriate toast duration for mobile
await copyToClipboard(text, {
  fallbackDuration: 15000  // Longer on mobile for manual copy
});
```

---

## 🔒 Security Notes

1. **HTTPS Required:** Clipboard API only works on HTTPS (except localhost)
2. **User Gesture:** All methods require user interaction (click/tap)
3. **No Read Access:** These utilities only write to clipboard, never read
4. **Fallback Visible:** Manual copy fallback shows text in toast (don't use for secrets)

---

## 🧪 Testing

### **Test in All Environments:**

```typescript
// Test modern browser
if (isClipboardAvailable()) {
  console.log('✅ Clipboard API available');
}

// Test insecure context
try {
  await copyToClipboard('test');
  console.log('✅ Fallback works');
} catch (err) {
  console.error('❌ All methods failed');
}
```

---

## 📊 Browser Support

| Feature | Chrome | Firefox | Safari | Edge | IE11 |
|---------|--------|---------|--------|------|------|
| Clipboard API | 63+ | 53+ | 13.1+ | 79+ | ❌ |
| execCommand | ✅ | ✅ | ✅ | ✅ | ✅ |
| Toast Fallback | ✅ | ✅ | ✅ | ✅ | ✅ |

**Result:** Works in all browsers! ✅

---

## 📋 Summary

**What You Get:**

✅ 8 clipboard utility functions  
✅ Multi-level fallback strategy  
✅ Works in all browsers and contexts  
✅ Mobile-friendly  
✅ Toast notifications  
✅ Visual feedback support  
✅ Batch operations  
✅ Smart content detection  
✅ TypeScript types  
✅ Comprehensive documentation  

**Files:**
- `/components/ui/clipboard-utils.ts` - Utilities
- `/CLIPBOARD_UTILITIES_GUIDE.md` - This guide
- `/BUGFIX_CLIPBOARD_API.md` - Technical details

---

**🎊 Use these utilities anywhere in your TRADIE platform! 🚀**

**No more clipboard errors! ✅**
