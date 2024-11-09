import React from 'react';

// NotionIcon组件：渲染一个简单的方形图标
export const NotionIcon: React.FC = () => (
  // SVG容器：24x24大小的视图框
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* 绘制一个简单的方形路径 */}
    <path
      d="M4 4h16v16H4V4z"
      stroke="currentColor"  // 使用当前文本颜色作为描边色
      strokeWidth="2"       // 2像素的描边宽度
      strokeLinecap="round" // 圆形线帽
      strokeLinejoin="round" // 圆形连接
    />
  </svg>
); 