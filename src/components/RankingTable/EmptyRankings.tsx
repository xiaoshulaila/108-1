import React from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { Trophy } from 'lucide-react';

const EmptyRankings: React.FC = () => {
  const { t } = useLanguage();
  
  return (
    <div className="bg-binance-gray rounded-lg p-8 text-center">
      <Trophy className="mx-auto mb-4 text-binance-yellow" size={48} />
      <p className="text-binance-text text-lg">
        {t('noRankingData')}
      </p>
    </div>
  );
};

export default EmptyRankings;