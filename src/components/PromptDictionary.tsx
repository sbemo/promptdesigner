import React, { useState, useRef, useEffect } from 'react';
import { promptCategories } from '../data/promptDictionary';

interface Props {
  onKeywordClick: (keyword: string) => void; // 点击关键词时的回调函数
}

// 箭头图标组件，用于显示分类的展开/收起状态
const ChevronIcon: React.FC<{ expanded: boolean }> = ({ expanded }) => (
  <svg
    className={`w-4 h-4 transition-transform duration-200 ${expanded ? 'rotate-90' : ''}`}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M9 18l6-6-6-6" />
  </svg>
);

const PromptDictionary: React.FC<Props> = ({ onKeywordClick }) => {
  // 状态管理
  const [width, setWidth] = useState(500); // 词典面板宽度
  const [isDragging, setIsDragging] = useState(false); // 是否正在拖动调整宽度
  const [expandedCategories, setExpandedCategories] = useState<string[]>([]); // 已展开的分类ID列表
  const containerRef = useRef<HTMLDivElement>(null); // 容器引用

  // 处理拖动调整宽度的效果
  useEffect(() => {
    // 鼠标移动时更新宽度
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      
      const newWidth = window.innerWidth - e.clientX;
      // 限制宽度在合理范围内
      if (newWidth >= 150 && newWidth <= 500) {
        setWidth(newWidth);
      }
    };

    // 鼠标松开时停止拖动
    const handleMouseUp = () => {
      setIsDragging(false);
    };

    // 仅在拖动状态时添加事件监听
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    // 清理事件监听
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  // 切换分类的展开/收起状态
  const toggleCategory = (categoryId: string) => {
    setExpandedCategories(prev => {
      if (prev.includes(categoryId)) {
        // 如果已展开则收起
        return prev.filter(id => id !== categoryId);
      } else {
        // 如果已收起则展开
        return [...prev, categoryId];
      }
    });
  };

  return (
    <div 
      ref={containerRef}
      className="relative backdrop-blur-xl bg-gradient-to-br from-blue-100/80 to-cyan-100/80"
      style={{ width: `${width}px` }}
    >
      {/* 左侧拖动条 */}
      <div 
        className="absolute left-0 top-0 bottom-0 w-1 cursor-ew-resize hover:bg-pink-400"
        onMouseDown={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
      />
      {/* 主要内容区域 */}
      <div className="h-full border-l border-pink-200/50 p-4 overflow-y-auto">
        <h2 className="text-lg font-bold mb-4 text-gray-700">提示词词典</h2>
        {/* 遍历所有分类 */}
        {promptCategories.map(category => (
          <div key={category.id} className="mb-4">
            {/* 分类标题按钮 */}
            <button
              onClick={() => toggleCategory(category.id)}
              className="inline-flex items-center gap-2 px-3 py-1 bg-blue-500/10 rounded-full font-medium text-blue-700 border border-blue-200 shadow-sm mb-3 hover:bg-blue-500/20 transition-colors"
            >
              <ChevronIcon expanded={expandedCategories.includes(category.id)} />
              <span>{category.name}</span>
            </button>
            {/* 展开时显示关键词列表 */}
            {expandedCategories.includes(category.id) && (
              <div className="flex flex-wrap gap-2">
                {category.keywords.map(keyword => (
                  <button
                    key={keyword.en}
                    className="inline-flex items-center rounded-md overflow-hidden hover:scale-105 transition-all shadow-sm hover:shadow-md"
                    onClick={() => onKeywordClick(keyword.en)}
                  >
                    {/* 中文关键词 */}
                    <span className="px-2 py-1 bg-gradient-to-r from-blue-500 to-blue-400 text-white border-0">
                      {keyword.zh}
                    </span>
                    {/* 英文关键词 */}
                    <span className="px-2 py-1 bg-gradient-to-r from-cyan-500 to-cyan-400 text-white border-0">
                      {keyword.en}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PromptDictionary; 