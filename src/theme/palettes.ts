export interface Palette { id: string; name: string; sub: string; colors: [string, string, string] }
export const PALETTES: Palette[] = [
  { id: 'paper', name: '纸间手账', sub: '默认森绿', colors: ['#3C6A58', '#E1E9DF', '#E8A87C'] },
  { id: 'nightpink', name: '黑粉夜色', sub: '甜酷暗夜', colors: ['#2D2833', '#F28C9F', '#FCE8EE'] },
  { id: 'hawthorn', name: '山楂果茶', sub: '红润微甜', colors: ['#8D2C2C', '#F49D97', '#FFF0EC'] },
  { id: 'maple', name: '枫叶天妇罗', sub: '暖黄秋香', colors: ['#C05E28', '#F7BA70', '#FDF3E5'] },
  { id: 'blueberry', name: '蓝藻奶巧', sub: '静谧沉稳', colors: ['#294A58', '#8FB5C6', '#E8F1F5'] },
  { id: 'seasalt', name: '海盐气泡水', sub: '清爽夏日', colors: ['#3E7292', '#94D1E8', '#EBF6FB'] },
  { id: 'sakura', name: '樱花奶冻卷', sub: '软糯春风', colors: ['#944E63', '#F8B4C8', '#FDF0F4'] },
  { id: 'mint', name: '薄荷气泡水', sub: '解暑薄荷', colors: ['#2D6A5D', '#84CFBE', '#E9F7F4'] },
  { id: 'ink', name: '纸墨素雅', sub: '极简水墨', colors: ['#3B3B3B', '#A5A5A5', '#F5F5F0'] },
]
