import React, { useState } from 'react';
import TopMenu from './TopMenu';
import MainEditor from './MainEditor';
import PromptDictionary from './PromptDictionary';

// 定义活动提示词区域的接口
interface ActivePrompt {
  sectionId: string;          // 当前活动区域的ID
  updateContent: (content: string) => void;  // 更新内容的函数
}

const PromptDesigner: React.FC = () => {
  // 状态管理：跟踪当前活动的提示词区域
  const [activePrompt, setActivePrompt] = useState<ActivePrompt | null>(null);

  // 处理词典中关键词被点击的事件
  const handleKeywordClick = (keyword: string) => {
    if (activePrompt) {
      // 如果有活动区域，则更新其内容
      activePrompt.updateContent(keyword);
    }
  };

  return (
    // 主容器：全屏高度，带有渐变背景和毛玻璃效果
    <div className="flex flex-col h-screen bg-gradient-to-br from-white/90 to-gray-50/90 backdrop-blur-xl">
      {/* 顶部菜单栏 */}
      <TopMenu />
      {/* 主要内容区域：编辑器和词典的容器 */}
      <div className="flex flex-1 overflow-hidden">
        {/* 左侧编辑器区域 */}
        <div className="flex-1 bg-gradient-to-br from-white/80 to-gray-50/80 backdrop-blur-md">
          <MainEditor setActivePrompt={setActivePrompt} />
        </div>
        {/* 右侧提示词词典 */}
        <PromptDictionary onKeywordClick={handleKeywordClick} />
      </div>
    </div>
  );
};

export default PromptDesigner; 