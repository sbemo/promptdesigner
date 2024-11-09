import React, { useState, useEffect } from 'react';
import PromptBlock from './PromptBlock';

// 定义提示词区域的接口
interface PromptSection {
  id: string;      // 区域ID
  title: string;   // 区域标题
  content: string; // 区域内容
}

interface Props {
  setActivePrompt: (prompt: { sectionId: string; updateContent: (content: string) => void } | null) => void;
}

const MainEditor: React.FC<Props> = ({ setActivePrompt }) => {
  // 状态管理
  const [sections, setSections] = useState<PromptSection[]>([
    { id: '1', title: 'Prompt title', content: '' }
  ]);
  const [activeId, setActiveId] = useState<string | null>(null);

  // 组件挂载时自动激活第一个区域
  useEffect(() => {
    if (sections.length > 0) {
      const firstSection = sections[0];
      activateSection(firstSection);
    }
  }, []);

  // 激活指定区域
  const activateSection = (section: PromptSection) => {
    setActiveId(section.id);
    setActivePrompt({
      sectionId: section.id,
      updateContent: createUpdateHandler(section.id)
    });
  };

  // 创建内容更新处理函数
  const createUpdateHandler = (sectionId: string) => (keyword: string) => {
    setSections(prev => {
      const section = prev.find(s => s.id === sectionId);
      if (!section) return prev;

      const currentContent = section.content;
      let newContent: string;

      // 处理内容拼接逻辑
      if (!currentContent.trim()) {
        newContent = `${keyword}, `;
      } else {
        const lastChar = currentContent[currentContent.length - 1];
        if (lastChar === ',' || lastChar === ' ') {
          newContent = `${currentContent}${keyword}, `;
        } else {
          newContent = `${currentContent}, ${keyword}, `;
        }
      }

      return prev.map(s =>
        s.id === sectionId ? { ...s, content: newContent } : s
      );
    });
  };

  // 更新区域内容
  const updateContent = (id: string, newContent: string) => {
    setSections(prev =>
      prev.map(section =>
        section.id === id ? { ...section, content: newContent } : section
      )
    );
  };

  // 更新区域标题
  const updateTitle = (id: string, newTitle: string) => {
    setSections(prev =>
      prev.map(section =>
        section.id === id ? { ...section, title: newTitle } : section
      )
    );
  };

  // 处理文本区域获得焦点
  const handleTextAreaFocus = (section: PromptSection) => {
    setActiveId(section.id);
    setActivePrompt({
      sectionId: section.id,
      updateContent: createUpdateHandler(section.id)
    });
  };

  // 处理文本区域内容变化
  const handleTextAreaChange = (id: string, value: string) => {
    updateContent(id, value);
  };

  // 处理复制功能
  const handleCopy = (section: PromptSection) => {
    const textToCopy = `${section.title}\n${section.content}`;
    navigator.clipboard.writeText(textToCopy).then(() => {
      alert('已复制到剪贴板！');
    });
  };

  // 处理清除功能
  const handleClear = (id: string) => {
    updateContent(id, '');
    const section = sections.find(s => s.id === id);
    if (section) {
      activateSection(section);
    }
  };

  // 渲染UI
  return (
    <div className="flex-1 p-4 overflow-y-auto">
      {sections.map(section => (
        <div key={section.id} className="mb-4 prompt-card p-4 bg-white/90 backdrop-blur-sm shadow-sm hover:shadow-md transition-all">
          {/* 标题输入框 */}
          <input
            type="text"
            value={section.title}
            className="text-lg font-medium mb-2 px-2 w-full bg-transparent"
            onChange={(e) => updateTitle(section.id, e.target.value)}
          />
          <div className="flex gap-4">
            {/* 提示词输入区域 */}
            <textarea
              className={`w-1/2 p-2 border rounded min-h-[120px] bg-white/95 backdrop-blur-sm ${
                activeId === section.id ? 'border-ms-blue' : 'border-gray-200'
              }`}
              value={section.content}
              onChange={(e) => handleTextAreaChange(section.id, e.target.value)}
              onFocus={() => handleTextAreaFocus(section)}
              placeholder="在此输入提示词..."
            />
            {/* 提示词块显示区域 */}
            <PromptBlock content={section.content} />
          </div>
          {/* 操作按钮区域 */}
          <div className="mt-2 flex gap-2">
            <select className="ms-button-secondary bg-white/95 backdrop-blur-sm">
              <option>Midjourney</option>
            </select>
            <button 
              className="ms-button"
              onClick={() => handleCopy(section)}
            >
              复制
            </button>
            <button 
              className="ms-button-secondary bg-white/95 backdrop-blur-sm"
              onClick={() => handleClear(section.id)}
            >
              清除
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MainEditor;