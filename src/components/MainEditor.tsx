import React, { useState, useEffect } from 'react';
import PromptBlock from './PromptBlock';

interface PromptSection {
  id: string;
  title: string;
  content: string;
}

interface Props {
  setActivePrompt: (prompt: { sectionId: string; updateContent: (content: string) => void } | null) => void;
}

const MainEditor: React.FC<Props> = ({ setActivePrompt }) => {
  const [sections, setSections] = useState<PromptSection[]>([
    { id: '1', title: 'untitled', content: '' }
  ]);
  const [activeId, setActiveId] = useState<string | null>(null);

  // 组件挂载时自动设置第一个section为激活状态
  useEffect(() => {
    if (sections.length > 0) {
      const firstSection = sections[0];
      activateSection(firstSection);
    }
  }, []); // 只在组件挂载时执行一次

  // 激活section的函数
  const activateSection = (section: PromptSection) => {
    setActiveId(section.id);
    setActivePrompt({
      sectionId: section.id,
      updateContent: createUpdateHandler(section.id)
    });
  };

  const createUpdateHandler = (sectionId: string) => (keyword: string) => {
    setSections(prev => {
      const section = prev.find(s => s.id === sectionId);
      if (!section) return prev;

      const currentContent = section.content;
      let newContent: string;

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

  const updateContent = (id: string, newContent: string) => {
    setSections(prev =>
      prev.map(section =>
        section.id === id ? { ...section, content: newContent } : section
      )
    );
  };

  const updateTitle = (id: string, newTitle: string) => {
    setSections(prev =>
      prev.map(section =>
        section.id === id ? { ...section, title: newTitle } : section
      )
    );
  };

  const handleTextAreaFocus = (section: PromptSection) => {
    setActiveId(section.id);
    setActivePrompt({
      sectionId: section.id,
      updateContent: createUpdateHandler(section.id)
    });
  };

  const handleTextAreaChange = (id: string, value: string) => {
    // 只更新内容，不重新激活 section
    updateContent(id, value);
  };

  const handleCopy = (section: PromptSection) => {
    const textToCopy = `${section.title}\n${section.content}`;
    navigator.clipboard.writeText(textToCopy).then(() => {
      alert('已复制到剪贴板！');
    });
  };

  const handleClear = (id: string) => {
    updateContent(id, '');
    const section = sections.find(s => s.id === id);
    if (section) {
      activateSection(section);
    }
  };

  return (
    <div className="flex-1 p-4 overflow-y-auto">
      {sections.map(section => (
        <div key={section.id} className="mb-4 prompt-card p-4">
          <input
            type="text"
            value={section.title}
            className="text-lg font-medium mb-2 px-2 w-full"
            onChange={(e) => updateTitle(section.id, e.target.value)}
          />
          <div className="flex gap-4">
            <textarea
              className={`w-1/2 p-2 border rounded min-h-[120px] ${
                activeId === section.id ? 'border-ms-blue' : ''
              }`}
              value={section.content}
              onChange={(e) => handleTextAreaChange(section.id, e.target.value)}
              onFocus={() => handleTextAreaFocus(section)}
              placeholder="在此输入提示词..."
            />
            <PromptBlock content={section.content} />
          </div>
          <div className="mt-2 flex gap-2">
            <select className="ms-button-secondary">
              <option>Midjourney</option>
            </select>
            <button 
              className="ms-button"
              onClick={() => handleCopy(section)}
            >
              复制
            </button>
            <button 
              className="ms-button-secondary"
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