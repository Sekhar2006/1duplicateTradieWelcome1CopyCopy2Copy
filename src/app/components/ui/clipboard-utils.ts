/**
 * Clipboard Utilities
 * 
 * Cross-browser clipboard operations with fallback support.
 * Works in all environments including restricted contexts.
 * 
 * @module clipboard-utils
 */

import { toast } from 'sonner';

/**
 * Copy text to clipboard with multi-level fallback strategy
 * 
 * Level 1: Modern Clipboard API (Chrome 63+, Firefox 53+, Safari 13.1+)
 * Level 2: Legacy execCommand (All browsers)
 * Level 3: Manual copy via toast notification (Fallback)
 * 
 * @param text - The text to copy to clipboard
 * @param options - Optional configuration
 * @returns Promise<boolean> - True if copied successfully
 * 
 * @example
 * ```typescript
 * // Basic usage
 * await copyToClipboard('Hello World');
 * 
 * // With custom messages
 * await copyToClipboard('Token123', {
 *   successMessage: 'Token copied!',
 *   fallbackMessage: 'Token: Token123'
 * });
 * 
 * // Silent mode (no toast)
 * await copyToClipboard('data', { silent: true });
 * ```
 */
export async function copyToClipboard(
  text: string,
  options?: {
    successMessage?: string;
    fallbackMessage?: string;
    fallbackDuration?: number;
    silent?: boolean;
  }
): Promise<boolean> {
  const {
    successMessage = 'Copied to clipboard!',
    fallbackMessage,
    fallbackDuration = 10000,
    silent = false,
  } = options || {};

  try {
    // Level 1: Try modern Clipboard API first
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      if (!silent) {
        toast.success(successMessage);
      }
      return true;
    }

    // Level 2: Fallback for older browsers or insecure contexts
    const textArea = document.createElement('textarea');
    textArea.value = text;
    
    // Make textarea invisible but accessible
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    textArea.setAttribute('readonly', '');
    
    document.body.appendChild(textArea);
    
    // Focus and select
    textArea.focus();
    textArea.select();

    try {
      const successful = document.execCommand('copy');
      if (successful) {
        if (!silent) {
          toast.success(successMessage);
        }
        return true;
      } else {
        throw new Error('execCommand failed');
      }
    } catch (execErr) {
      // Level 3: Show text in toast for manual copy
      if (!silent) {
        toast.info(fallbackMessage || `${text}`, {
          description: 'Please copy manually',
          duration: fallbackDuration,
        });
      }
      return false;
    } finally {
      document.body.removeChild(textArea);
    }
  } catch (err) {
    // Final fallback - show text in toast
    if (!silent) {
      toast.info(fallbackMessage || `${text}`, {
        description: 'Please copy manually',
        duration: fallbackDuration,
      });
    }
    return false;
  }
}

/**
 * Check if Clipboard API is available in current context
 * 
 * @returns boolean - True if Clipboard API is available
 * 
 * @example
 * ```typescript
 * if (isClipboardAvailable()) {
 *   // Use modern clipboard features
 * } else {
 *   // Use fallback
 * }
 * ```
 */
export function isClipboardAvailable(): boolean {
  return !!(navigator.clipboard && window.isSecureContext);
}

/**
 * Copy text with visual feedback (button state change)
 * Useful for "Copy" buttons that should show "Copied!" temporarily
 * 
 * @param text - Text to copy
 * @param callback - Callback to update button state
 * @param duration - How long to show "copied" state (ms)
 * 
 * @example
 * ```typescript
 * const [copied, setCopied] = useState(false);
 * 
 * <Button onClick={() => copyWithFeedback('text', setCopied)}>
 *   {copied ? 'Copied!' : 'Copy'}
 * </Button>
 * ```
 */
export async function copyWithFeedback(
  text: string,
  callback: (copied: boolean) => void,
  duration: number = 2000
): Promise<void> {
  const success = await copyToClipboard(text);
  if (success) {
    callback(true);
    setTimeout(() => callback(false), duration);
  }
}

/**
 * Copy multiple items to clipboard as formatted text
 * 
 * @param items - Array of key-value pairs to copy
 * @param format - Format style ('list' | 'json' | 'csv')
 * 
 * @example
 * ```typescript
 * copyMultiple([
 *   { label: 'Name', value: 'John' },
 *   { label: 'Email', value: 'john@example.com' }
 * ], 'list');
 * 
 * // Copies as:
 * // Name: John
 * // Email: john@example.com
 * ```
 */
export async function copyMultiple(
  items: Array<{ label: string; value: string }>,
  format: 'list' | 'json' | 'csv' = 'list'
): Promise<boolean> {
  let text = '';

  switch (format) {
    case 'list':
      text = items.map(item => `${item.label}: ${item.value}`).join('\n');
      break;
    case 'json':
      text = JSON.stringify(
        items.reduce((obj, item) => ({ ...obj, [item.label]: item.value }), {}),
        null,
        2
      );
      break;
    case 'csv':
      text = items.map(item => `"${item.label}","${item.value}"`).join('\n');
      break;
  }

  return await copyToClipboard(text, {
    successMessage: `${items.length} items copied!`,
  });
}

/**
 * Copy formatted code with syntax preservation
 * 
 * @param code - Code string to copy
 * @param language - Programming language (for toast message)
 * 
 * @example
 * ```typescript
 * copyCode('console.log("Hello")', 'javascript');
 * ```
 */
export async function copyCode(
  code: string,
  language?: string
): Promise<boolean> {
  return await copyToClipboard(code, {
    successMessage: language 
      ? `${language} code copied!` 
      : 'Code copied!',
    fallbackMessage: code,
  });
}

/**
 * Copy with custom toast styling
 * 
 * @param text - Text to copy
 * @param toastOptions - Custom toast configuration
 * 
 * @example
 * ```typescript
 * copyWithCustomToast('Important data', {
 *   title: 'Data Copied!',
 *   description: 'You can now paste it',
 *   icon: '✅'
 * });
 * ```
 */
export async function copyWithCustomToast(
  text: string,
  toastOptions: {
    title?: string;
    description?: string;
    icon?: string;
  }
): Promise<boolean> {
  try {
    const success = await copyToClipboard(text, { silent: true });
    
    if (success) {
      toast.success(toastOptions.title || 'Copied!', {
        description: toastOptions.description,
      });
    } else {
      toast.info(toastOptions.title || text, {
        description: toastOptions.description || 'Please copy manually',
        duration: 10000,
      });
    }
    
    return success;
  } catch (err) {
    return false;
  }
}

/**
 * Batch copy - copy array items one by one with delay
 * Useful for copying multiple tokens/codes sequentially
 * 
 * @param items - Array of strings to copy
 * @param delay - Delay between copies (ms)
 * 
 * @example
 * ```typescript
 * await batchCopy(['token1', 'token2', 'token3'], 1000);
 * ```
 */
export async function batchCopy(
  items: string[],
  delay: number = 1000
): Promise<boolean[]> {
  const results: boolean[] = [];
  
  for (let i = 0; i < items.length; i++) {
    const success = await copyToClipboard(items[i], {
      successMessage: `Copied ${i + 1}/${items.length}`,
      silent: false,
    });
    results.push(success);
    
    if (i < items.length - 1) {
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
  
  return results;
}

/**
 * Smart copy - automatically formats based on content type
 * Detects URLs, emails, phone numbers, etc.
 * 
 * @param content - Content to copy
 * 
 * @example
 * ```typescript
 * smartCopy('https://example.com'); // "URL copied!"
 * smartCopy('user@example.com');   // "Email copied!"
 * smartCopy('+1234567890');         // "Phone copied!"
 * ```
 */
export async function smartCopy(content: string): Promise<boolean> {
  const urlPattern = /^https?:\/\/.+/i;
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phonePattern = /^[\d\s\-\+\(\)]+$/;

  let message = 'Copied!';

  if (urlPattern.test(content)) {
    message = 'URL copied!';
  } else if (emailPattern.test(content)) {
    message = 'Email copied!';
  } else if (phonePattern.test(content)) {
    message = 'Phone number copied!';
  }

  return await copyToClipboard(content, {
    successMessage: message,
  });
}

// Export all functions
export default {
  copyToClipboard,
  isClipboardAvailable,
  copyWithFeedback,
  copyMultiple,
  copyCode,
  copyWithCustomToast,
  batchCopy,
  smartCopy,
};
