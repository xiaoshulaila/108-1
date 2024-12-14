import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import Layout from '../components/Layout';
import Carousel from '../components/Carousel';
import { PoolInfo, PoolStats } from '../components/home';
import ReferralLink from '../components/ReferralLink';

const Home: React.FC = () => {
  const { t } = useLanguage();

  return (
    <Layout>
      <div className="flex-1 p-4 max-w-screen-xl mx-auto w-full pb-20">
        <div className="space-y-6">
          <Carousel />
          
          <div className="grid gap-6 md:grid-cols-2">
            <PoolInfo />
            <PoolStats />
          </div>

          <div className="bg-[#2B3139] rounded-lg p-6">
            <ReferralLink />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Home;