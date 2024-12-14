import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './contexts/LanguageContext';
import { Web3Provider } from './providers/Web3Provider';
import Header from './components/Header';
import Navigation from './components/Navigation';
import Home from './pages/Home';
import Rankings from './pages/Rankings';
import Rewards from './pages/Rewards';
import FAQ from './pages/FAQ';
import Profile from './pages/Profile';

const App: React.FC = () => {
  return (
    <Web3Provider>
      <LanguageProvider>
        <Router>
          <div className="min-h-screen bg-[#0C0E12] text-white flex flex-col">
            <Header />
            <main className="flex-1 pb-16">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/rankings" element={<Rankings />} />
                <Route path="/rewards" element={<Rewards />} />
                <Route path="/faq" element={<FAQ />} />
                <Route path="/profile" element={<Profile />} />
              </Routes>
            </main>
            <Navigation />
          </div>
        </Router>
      </LanguageProvider>
    </Web3Provider>
  );
};

export default App;