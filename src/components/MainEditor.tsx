import React, { useState, ChangeEvent } from 'react';
import PromptBlock from './PromptBlock';

interface PromptSection {
  id: string;
  title: string;
  content: string;
}

const MainEditor: React.FC = () => {
  const [sections, setSections] = useState<PromptSection[]>([
    { id: '1', title: 'untitled', content: '' }
  ]);

  const updateTitle = (id: string, newTitle: string) => {
    setSections((prev: PromptSection[]) =>
      prev.map((section: PromptSection) =>
        section.id === id ? { ...section, title: newTitle } : section
      )
    );
  };

  const updateContent = (id: string, newContent: string) => {
    setSections((prev: PromptSection[]) =>
      prev.map((section: PromptSection) =>
        section.id === id ? { ...section, content: newContent } : section
      )
    );
  };

  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>, id: string) => {
    updateTitle(id, e.target.value);
  };

  const handleContentChange = (e: ChangeEvent<HTMLTextAreaElement>, id: string) => {
    updateContent(id, e.target.value);
  };

  return (
    <div className="flex-1 p-4 overflow-y-auto">
      {sections.map((section: PromptSection) => (
        <div key={section.id} className="mb-4">
          <input
            type="text"
            value={section.title}
            className="text-lg font-medium mb-2 px-2"
            onChange={(e) => handleTitleChange(e, section.id)}
          />
          <div className="flex gap-4">
            <textarea
              className="w-1/2 p-2 border rounded"
              value={section.content}
              onChange={(e) => handleContentChange(e, section.id)}
            />
            <PromptBlock content={section.content} />
          </div>
          <div className="mt-2 flex gap-2">
            <select className="border rounded px-2 py-1">
              <option>Midjourney</option>
            </select>
            <button className="px-3 py-1 border rounded">复制</button>
            <button className="px-3 py-1 border rounded">清除</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MainEditor; 