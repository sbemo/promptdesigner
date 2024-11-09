import React from 'react';
import { NotionIcon } from './icons';

// TopMenu组件：应用的顶部导航栏
const TopMenu: React.FC = () => {
  return (
    // 头部容器：弹性布局，带有半透明背景和毛玻璃效果
    <header className="flex justify-between items-center px-4 py-2 border-b border-gray-200/30 bg-white/50 backdrop-blur-sm">
      {/* 应用标题 */}
      <div className="text-xl font-bold text-gray-800">PromptDesigner</div>
      {/* 图标按钮：悬停时有背景色变化效果 */}
      <button className="p-2 hover:bg-gray-100/50 rounded-full transition-colors">
        <NotionIcon />
      </button>
    </header>
  );
};

export default TopMenu; 