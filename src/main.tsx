import React from 'react'
import ReactDOM from 'react-dom/client'
import PromptDesigner from './components/PromptDesigner'
import './index.css'

// 创建 React 根实例并渲染应用
ReactDOM.createRoot(document.getElementById('root')!).render(
  // 严格模式包裹
  <React.StrictMode>
    <PromptDesigner />
  </React.StrictMode>
) 