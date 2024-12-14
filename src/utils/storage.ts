export function clearWalletStorage() {
  // 清除所有wagmi相关的存储
  Object.keys(localStorage).forEach(key => {
    if (key.startsWith('wagmi') || 
        key.startsWith('wallet') || 
        key.startsWith('wc@') ||
        key.startsWith('dream108_')) {
      localStorage.removeItem(key);
    }
  });
  
  // 清除会话存储
  Object.keys(sessionStorage).forEach(key => {
    if (key.startsWith('wagmi') || 
        key.startsWith('wallet') || 
        key.startsWith('wc@') ||
        key.startsWith('dream108_')) {
      sessionStorage.removeItem(key);
    }
  });
  
  // 清除 IndexedDB
  if (window.indexedDB) {
    window.indexedDB.deleteDatabase('wagmi');
    window.indexedDB.deleteDatabase('wallet-connect-v2');
  }
}