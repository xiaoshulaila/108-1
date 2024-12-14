import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import Layout from '../components/Layout';
import { faqData } from '../data/faq';

const FAQ: React.FC = () => {
  const [expandedItems, setExpandedItems] = useState<string[]>([]);
  const { t, language } = useLanguage();

  const toggleItem = (key: string) => {
    setExpandedItems(prev => 
      prev.includes(key)
        ? prev.filter(k => k !== key)
        : [...prev, key]
    );
  };

  return (
    <Layout title={t('faq')} icon={<HelpCircle className="text-binance-yellow" />}>
      <div className="p-4 max-w-screen-xl mx-auto pb-20">
        <div className="space-y-4">
          {faqData.map((faq) => (
            <div key={faq.key} className="bg-binance-gray rounded-lg overflow-hidden">
              <button
                onClick={() => toggleItem(faq.key)}
                className="w-full p-6 text-left flex justify-between items-center"
              >
                <h3 className="text-lg font-semibold text-binance-yellow">
                  {faq.title[language]}
                </h3>
                {faq.isLong && (
                  expandedItems.includes(faq.key) 
                    ? <ChevronUp className="text-binance-text" />
                    : <ChevronDown className="text-binance-text" />
                )}
              </button>
              <div className={`px-6 ${
                faq.isLong 
                  ? `overflow-hidden transition-all duration-300 ${
                      expandedItems.includes(faq.key)
                        ? 'max-h-[1000px] pb-6'
                        : 'max-h-0'
                    }`
                  : 'pb-6'
              }`}>
                <p className="text-binance-text whitespace-pre-line">
                  {faq.content[language]}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default FAQ;