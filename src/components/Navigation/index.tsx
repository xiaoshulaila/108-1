import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, Trophy, Gift, HelpCircle, User } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { NavItem } from './types';
import NavButton from './NavButton';

const Navigation: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useLanguage();

  const navItems: NavItem[] = [
    { path: '/', icon: Home, label: t('home') },
    { path: '/rankings', icon: Trophy, label: t('rankings') },
    { path: '/rewards', icon: Gift, label: t('rewards') },
    { path: '/faq', icon: HelpCircle, label: t('faq') },
    { path: '/profile', icon: User, label: t('profile') }
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-[#1E2329] border-t border-[#2B3139]">
      <div className="max-w-screen-xl mx-auto">
        <div className="flex justify-around items-center h-16">
          {navItems.map((item) => (
            <NavButton
              key={item.path}
              item={item}
              isActive={location.pathname === item.path}
              onClick={() => navigate(item.path)}
            />
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;