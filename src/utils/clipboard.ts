/**
 * Cross-browser clipboard copy function that works on both desktop and mobile
 */
export async function copyToClipboard(text: string): Promise<void> {
  try {
    // 优先使用现代 Clipboard API
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return;
    }

    // 回退方案：使用传统的 execCommand
    const textArea = document.createElement('textarea');
    textArea.value = text;
    
    // 防止滚动
    textArea.style.position = 'fixed';
    textArea.style.left = '0';
    textArea.style.top = '0';
    textArea.style.opacity = '0';
    
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
      document.execCommand('copy');
      textArea.remove();
    } catch (err) {
      console.error('Failed to copy text:', err);
      textArea.remove();
      throw new Error('Failed to copy');
    }
  } catch (err) {
    console.error('Failed to copy text:', err);
    throw err;
  }
}