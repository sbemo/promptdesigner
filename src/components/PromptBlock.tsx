import React from 'react';

// 定义组件的属性接口
interface PromptBlockProps {
  content: string;  // 提示词内容字符串
}

// PromptBlock组件：用于以标签形式显示提示词
const PromptBlock: React.FC<PromptBlockProps> = ({ content }) => {
  // 将提示词字符串按逗号分割成数组，并去除每个词的首尾空格
  const blocks = content.split(',').map(block => block.trim());

  return (
    // 容器：占据一半宽度，带有边框和内边距
    <div className="w-1/2 p-2 border rounded">
      {/* 遍历所有提示词块 */}
      {blocks.map((block, index) => (
        // 每个提示词块：内联块级元素，带有灰色背景和圆角
        <span
          key={index}
          className="inline-block px-2 py-1 m-1 bg-gray-100 rounded"
        >
          {block}
        </span>
      ))}
    </div>
  );
};

export default PromptBlock; 