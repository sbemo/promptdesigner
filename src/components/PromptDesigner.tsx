import React from 'react';
import TopMenu from './TopMenu';
import MainEditor from './MainEditor';
import PromptDictionary from './PromptDictionary';

const PromptDesigner: React.FC = () => {
  return (
    <div className="flex flex-col h-screen">
      <TopMenu />
      <div className="flex flex-1 overflow-hidden">
        <MainEditor />
        <PromptDictionary />
      </div>
    </div>
  );
};

export default PromptDesigner; 