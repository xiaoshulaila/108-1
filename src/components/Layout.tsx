import React, { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
  title?: string;
  icon?: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children, title, icon }) => {
  return (
    <div className="min-h-screen bg-[#0C0E12] text-white">
      {title && (
        <header className="mb-6 text-center pt-4">
          <h1 className="text-2xl font-bold inline-flex items-center gap-2 justify-center">
            {icon}
            {title}
          </h1>
        </header>
      )}
      {children}
    </div>
  );
};

export default Layout;