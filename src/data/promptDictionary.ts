export interface PromptCategory {
  id: string;
  name: string;
  keywords: string[];
}

export const promptCategories: PromptCategory[] = [
  {
    id: 'quality',
    name: '质量',
    keywords: ['high quality', 'best quality', 'masterpiece']
  },
  {
    id: 'style',
    name: '绘画',
    keywords: ['oil painting', 'watercolor', 'digital art']
  }
  // 可以继续添加更多分类
]; 