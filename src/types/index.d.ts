/// <reference types="react" />
/// <reference types="react-dom" />

// 声明 SVG 文件模块的类型
declare module '*.svg' {
  const content: React.FunctionComponent<React.SVGAttributes<SVGElement>>;
  export default content;
}

// 声明 CSS 文件模块的类型
declare module '*.css' {
  const content: { [className: string]: string };
  export default content;
} 