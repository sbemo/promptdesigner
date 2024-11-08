import React from 'react';

interface Category {
  name: string;
  keywords: string[];
}

const categories: Category[] = [
  {
    name: '质量',
    keywords: ['high quality', 'best quality', 'masterpiece']
  },
  {
    name: '绘画',
    keywords: ['oil painting', 'watercolor', 'digital art']
  }
  // ... 其他分类
];

const PromptDictionary: React.FC = () => {
  return (
    <div className="w-64 border-l p-4 overflow-y-auto">
      <h2 className="text-lg font-bold mb-4">提示词词典</h2>
      {categories.map(category => (
        <div key={category.name} className="mb-4">
          <h3 className="font-medium mb-2">{category.name}</h3>
          <div className="flex flex-wrap gap-2">
            {category.keywords.map(keyword => (
              <button
                key={keyword}
                className="px-2 py-1 bg-gray-100 rounded text-sm"
                onClick={() => {
                  // 添加关键词到编辑器逻辑
                }}
              >
                {keyword}
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default PromptDictionary; 