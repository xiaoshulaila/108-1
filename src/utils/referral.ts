/**
 * Get the current domain from window.location
 * @returns {string} The current domain
 */
const getCurrentDomain = (): string => {
  if (typeof window !== 'undefined') {
    const { protocol, host } = window.location;
    return `${protocol}//${host}`;
  }
  return '';
};

/**
 * Generate a referral link with the current domain and wallet address
 * @param {string} walletAddress - The wallet address to use in the referral link
 * @returns {string} The complete referral link
 */
export const getReferralLink = (walletAddress: string): string => {
  const domain = getCurrentDomain();
  return `${domain}?ref=${walletAddress}`;
};