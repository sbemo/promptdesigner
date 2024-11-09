module.exports = {
  // 指定需要处理的文件路径
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  
  theme: {
    extend: {
      // 扩展颜色配置
      colors: {
        // 自定义微软风格的颜色
        'ms-blue': '#0078d4',  // 主题蓝色
        'ms-gray': {
          100: '#faf9f8',      // 最浅的灰色
          200: '#f3f2f1',      // 浅灰色
          300: '#edebe9',      // 中灰色
          400: '#d2d0ce',      // 深灰色
        }
      }
    }
  },
  plugins: [], // 暂无使用插件
}; 