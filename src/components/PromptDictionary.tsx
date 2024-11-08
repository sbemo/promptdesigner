import React, { useState, useRef, useEffect } from 'react';
import { promptCategories } from '../data/promptDictionary';

interface Props {
  onKeywordClick: (keyword: string) => void;
}

const PromptDictionary: React.FC<Props> = ({ onKeywordClick }) => {
  const [width, setWidth] = useState(256);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      
      // 计算新宽度：窗口宽度减去鼠标位置
      const newWidth = window.innerWidth - e.clientX;
      
      // 限制宽度范围
      if (newWidth >= 150 && newWidth <= 500) {
        setWidth(newWidth);
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  return (
    <div 
      ref={containerRef}
      className="relative bg-white"
      style={{ width: `${width}px` }}
    >
      <div 
        className="absolute left-0 top-0 bottom-0 w-1 cursor-ew-resize hover:bg-ms-blue"
        onMouseDown={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
      />
      <div className="h-full border-l p-4 overflow-y-auto">
        <h2 className="text-lg font-bold mb-4">提示词词典</h2>
        {promptCategories.map(category => (
          <div key={category.id} className="mb-4">
            <h3 className="font-medium mb-2">{category.name}</h3>
            <div className="flex flex-wrap gap-2">
              {category.keywords.map(keyword => (
                <button
                  key={keyword}
                  className="px-2 py-1 bg-ms-gray-100 rounded text-sm hover:bg-ms-gray-200 transition-colors"
                  onClick={() => onKeywordClick(keyword)}
                >
                  {keyword}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PromptDictionary; 