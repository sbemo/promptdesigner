import React from 'react';
import { NotionIcon } from './icons';

const TopMenu: React.FC = () => {
  return (
    <header className="flex justify-between items-center px-4 py-2 border-b">
      <div className="text-xl font-bold">sbemo/PromptDesigner</div>
      <button className="p-2 hover:bg-gray-100 rounded-full">
        <NotionIcon />
      </button>
    </header>
  );
};

export default TopMenu; 