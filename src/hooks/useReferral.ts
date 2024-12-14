import { useSearchParams } from 'react-router-dom';

const DEFAULT_REFERRER = '0xFA9b4a6E0d41FdAbCCA065245F5b1503dd844f15';

export function useReferral() {
  const [searchParams] = useSearchParams();
  
  const getReferrer = () => {
    const ref = searchParams.get('ref');
    if (!ref) {
      console.log('No referrer found, using default address');
      return DEFAULT_REFERRER;
    }
    
    // Validate address format
    const isValidAddress = /^0x[a-fA-F0-9]{40}$/.test(ref);
    if (!isValidAddress) {
      console.log('Invalid referrer address format, using default address');
      return DEFAULT_REFERRER;
    }
    
    return ref;
  };

  return {
    referrer: getReferrer()
  };
}