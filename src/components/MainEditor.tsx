import React, { useState, useEffect } from 'react';
import PromptBlock from './PromptBlock';
import { MagicIcon } from './icons';
import config from '../utils/config';

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
  const [magicPromptResult, setMagicPromptResult] = useState('');
  const [isLoading, setIsLoading] = useState(false);

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
  const handleTextAreaChange = (id: string, value: string) => {
    setSections(prev =>
      prev.map(section =>
        section.id === id ? { ...section, content: value } : section
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

  // 处理复制功能
  const handleCopy = (section: PromptSection) => {
    const textToCopy = `${section.title}\n${section.content}`;
    navigator.clipboard.writeText(textToCopy).then(() => {
      alert('已复制到剪贴板！');
    });
  };

  // 处理清除功能
  const handleClear = (id: string) => {
    setSections(prev =>
      prev.map(section =>
        section.id === id ? { ...section, content: '' } : section
      )
    );
    setMagicPromptResult('');
  };

  // 处理 Magic Prompt 功能
  const handleMagicPrompt = async (section: PromptSection) => {
    if (!section.content.trim()) {
      alert('请先输入提示词');
      return;
    }

    setIsLoading(true);
    try {
      // 使用配置文件中的设置进行第一次调用
      const parseResponse = await fetch(config.api.baseUrl, {
        method: 'POST',
        headers: {
          'Authorization': config.api.key,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model: config.model.name,
          messages: [
            {
              role: config.prompts.analyzer.role,
              content: config.prompts.analyzer.content
            },
            {
              role: 'user',
              content: section.content
            }
          ],
          temperature: config.model.settings.analyzer.temperature,
          top_p: config.model.settings.analyzer.top_p
        })
      });
      const parsedElements = await parseResponse.json();

      // 使用配置文件中的设置进行第二次调用
      const integrateResponse = await fetch(config.api.baseUrl, {
        method: 'POST',
        headers: {
          'Authorization': config.api.key,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model: config.model.name,
          messages: [
            {
              role: config.prompts.generator.role,
              content: config.prompts.generator.content
            },
            {
              role: 'user',
              content: JSON.stringify(parsedElements)
            }
          ],
          temperature: config.model.settings.generator.temperature,
          top_p: config.model.settings.generator.top_p,
          max_tokens: config.model.settings.generator.max_tokens
        })
      });
      const finalResult = await integrateResponse.json();
      
      try {
        const jsonResult = JSON.parse(finalResult.choices[0].message.content);
        setMagicPromptResult(jsonResult['magic-prompt'] || '');
      } catch (e) {
        setMagicPromptResult(finalResult.choices[0].message.content);
      }
    } catch (error) {
      console.error('Magic prompt error:', error);
      setMagicPromptResult('Error generating magic prompt. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex-1 p-4 overflow-y-auto">
      {sections.map(section => (
        <div key={section.id} className="mb-4 prompt-card p-4 bg-white/90 backdrop-blur-sm shadow-sm hover:shadow-md transition-all">
          {/* 标题输入框 */}
          <input
            type="text"
            value={section.title}
            className="text-lg font-medium mb-2 px-2 w-full bg-transparent"
            onChange={(e) => handleTextAreaChange(section.id, e.target.value)}
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

          {/* Magic Prompt 结果显示区域 */}
          <div className="mt-4 relative">
            <textarea
              className="w-full p-2 border rounded min-h-[80px] bg-gray-50"
              value={magicPromptResult}
              readOnly
              placeholder="Magic prompt will appear here..."
            />
            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-white/50">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
              </div>
            )}
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
            <button
              className={`ms-button flex items-center gap-2 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
              onClick={() => !isLoading && handleMagicPrompt(section)}
              disabled={isLoading}
            >
              <MagicIcon className="w-4 h-4" />
              {isLoading ? 'Generating...' : 'Magic Prompt'}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MainEditor;