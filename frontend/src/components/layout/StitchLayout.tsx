import React from 'react';
import { Outlet } from 'react-router-dom';
import { StitchNavbar } from './StitchNavbar';

interface StitchLayoutProps {
  children?: React.ReactNode;
}

export const StitchLayout: React.FC<StitchLayoutProps> = ({ children }) => {
  return (
    <div className="stitch-porcelain min-h-screen flex flex-col bg-[#faf9fd] text-[#1b1b1f] selection:bg-[#e3dfff] selection:text-[#2a14b4]">
      <StitchNavbar />
      <main className="w-full pt-16 flex-1 flex flex-col">
        {children || <Outlet />}
      </main>
    </div>
  );
};
