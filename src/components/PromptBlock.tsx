import React from 'react';

interface PromptBlockProps {
  content: string;
}

const PromptBlock: React.FC<PromptBlockProps> = ({ content }) => {
  const blocks = content.split(',').map(block => block.trim());

  return (
    <div className="w-1/2 p-2 border rounded">
      {blocks.map((block, index) => (
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