import React, { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

interface CountdownTimerProps {
  timestamp: number;
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({ timestamp }) => {
  const { t } = useLanguage();
  const [timeLeft, setTimeLeft] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = Math.floor(Date.now() / 1000);
      const totalSeconds = Math.max(0, timestamp - now);

      return {
        hours: Math.floor(totalSeconds / 3600),
        minutes: Math.floor((totalSeconds % 3600) / 60),
        seconds: totalSeconds % 60
      };
    };

    // Initial calculation
    setTimeLeft(calculateTimeLeft());

    // Update every second
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [timestamp]);

  return (
    <div className="text-center">
      <div className="flex items-center justify-center gap-4 mb-2">
        <div className="flex-1 h-[1px] bg-binance-yellow"></div>
        <div className="text-xl text-binance-text">{t('countdown')}</div>
        <div className="flex-1 h-[1px] bg-binance-yellow"></div>
      </div>
      <div className="text-4xl font-bold">
        {String(timeLeft.hours).padStart(2, '0')}:
        {String(timeLeft.minutes).padStart(2, '0')}:
        {String(timeLeft.seconds).padStart(2, '0')}
      </div>
    </div>
  );
};

export default CountdownTimer;