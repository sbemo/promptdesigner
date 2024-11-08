import React, { useState } from 'react';
import TopMenu from './TopMenu';
import MainEditor from './MainEditor';
import PromptDictionary from './PromptDictionary';

interface ActivePrompt {
  sectionId: string;
  updateContent: (content: string) => void;
}

const PromptDesigner: React.FC = () => {
  const [activePrompt, setActivePrompt] = useState<ActivePrompt | null>(null);

  const handleKeywordClick = (keyword: string) => {
    if (activePrompt) {
      // 调用更新函数来更新内容
      activePrompt.updateContent(keyword);
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <TopMenu />
      <div className="flex flex-1 overflow-hidden">
        <div className="flex-1">
          <MainEditor setActivePrompt={setActivePrompt} />
        </div>
        <PromptDictionary onKeywordClick={handleKeywordClick} />
      </div>
    </div>
  );
};

export default PromptDesigner; 