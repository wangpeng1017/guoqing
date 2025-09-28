# 小信鸽飞飞的国庆节任务 🕊️🎉

一个精美的国庆节主题互动故事应用，讲述小信鸽飞飞完成送信任务的冒险故事。

## ✨ 特性

- 🎨 **精美动画** - 使用 Framer Motion 制作流畅的交互动画
- 🎵 **音效支持** - 每个交互都有对应的音效反馈
- 📱 **响应式设计** - 完美适配桌面端和移动端
- 🎭 **互动故事** - 10个精心设计的交互页面
- 🌈 **色彩鲜艳** - 卡通风格的SVG插图

## 📖 故事概述

跟随小信鸽飞飞的国庆节冒险之旅：

1. **封面与开始** - 点击按钮开始故事
2. **接受任务** - 从猫头鹰村长那里接受重要任务
3. **制作“鸡毛信”** - 为紧急任务封装特殊包裹
4. **勇敢出发** - 开始送信之旅
5. **悄悄经过瞌睡熊** - 学会小心和安静
6. **得到风宝宝的帮助** - 化敌为友的智慧
7. **看到派对广场** - 发现目的地的美好
8. **成功送达** - 完成核心任务
9. **点亮生日蛋糕** - 见证庆典的高潮
10. **英雄的荣耀** - 获得应有的奖励和赞美

## 🛠️ 技术栈

- **Next.js 15** - React 框架
- **TypeScript** - 类型安全
- **Tailwind CSS** - 样式框架
- **Framer Motion** - 动画库
- **Lucide React** - 图标库

## 🎮 交互说明

每个页面都有独特的交互方式：
- 点击、悬停、拖拽等不同交互
- 实时动画反馈
- 音效提示
- 渐进式故事展开

## 📁 项目结构

```
src/
├── app/
│   ├── globals.css          # 全局样式
│   └── page.tsx             # 主应用页面
├── components/
│   └── pages/               # 各个故事页面组件
│       ├── CoverPage.tsx    # 封面页
│       ├── MissionPage.tsx  # 任务页
│       ├── PackagePage.tsx  # 包装页
│       ├── DeparturePage.tsx# 出发页
│       ├── BearPage.tsx     # 瞌睡熊页
│       ├── WindPage.tsx     # 风宝宝页
│       ├── PartyPage.tsx    # 派对广场页
│       ├── DeliveryPage.tsx # 送达页
│       ├── CakePage.tsx     # 蛋糕页
│       └── VictoryPage.tsx  # 胜利页
├── hooks/
│   ├── useSound.ts          # 音效管理hook
│   └── usePageTransition.ts # 页面切换hook
└── styles/
    └── animations.css       # 动画样式
```

## 🎵 音效文件

应用需要以下音效文件（放在 `public/sounds/` 目录）：

- `magic_chime.mp3` - 魔法音效
- `sparkle.mp3` - 闪亮音效
- `swoosh.mp3` - 嗖声音效
- `wing_flap.mp3` - 翅膀扇动
- `positive_chime.mp3` - 积极音效
- `distant_party_music.mp3` - 远处派对音乐
- `crowd_cheer.mp3` - 群众欢呼
- `celebration_music.mp3` - 庆祝音乐

*注：音效文件为可选项，缺失时应用仍能正常运行*

## 🚀 本地开发

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build
```

## 📱 响应式支持

- **桌面端**: 完整的悬停效果和详细动画
- **移动端**: 触摸友好的交互和适配的布局
- **平板**: 中等尺寸的优化体验

## 🎨 设计亮点

- 每个页面都有独特的配色方案
- 卡通风格的SVG插图，边缘圆润
- 平滑的页面过渡动画
- 丰富的粒子效果和视觉反馈
- 符合儿童审美的色彩搭配

## 📱 在线体验

访问: [https://guoqing.vercel.app](https://guoqing.vercel.app)

## 📜 许可证

MIT License

## 🙏 致谢

感谢所有为国庆节庆典贡献力量的朋友们！

---

**祝大家国庆节快乐！** 🇨🇳🎊
