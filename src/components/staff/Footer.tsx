import React from 'react';

interface FooterProps {
  activeTables: number;
  activeOrders: number;
}

const Footer: React.FC<FooterProps> = ({ activeTables, activeOrders }) => {
  return (
    <footer className="bg-gray-800 text-white py-2 px-4">
      <div className="container mx-auto flex justify-between items-center">
        <p>Active Tables: {activeTables} Active Orders: {activeOrders}</p>
        <p>Last Update: {new Date().toLocaleTimeString()}</p>
      </div>
    </footer>
  );
};

export default Footer;