'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useSound } from '@/hooks/useSound';

interface CoverPageProps {
  onNext: () => void;
}

export default function CoverPage({ onNext }: CoverPageProps) {
  const [isActivated, setIsActivated] = useState(false);
  const { playSound } = useSound();

  const handleStartStory = () => {
    console.log('handleStartStory called'); // Debug
    setIsActivated(true);
    playSound('magic_chime.mp3', { volume: 0.6 });
    
    // 立即跳转测试
    setTimeout(() => {
      console.log('calling onNext'); // Debug
      onNext();
    }, 100); // 缩短延迟以便测试
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-300 to-sky-100 flex flex-col items-center justify-center relative overflow-hidden">
      {/* 背景云朵 */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-10 left-10 w-20 h-12 bg-white rounded-full opacity-80"
          animate={{ x: [0, 20, 0], y: [0, -10, 0] }}
          transition={{ duration: 4, repeat: Infinity }}
        />
        <motion.div
          className="absolute top-20 right-16 w-16 h-10 bg-white rounded-full opacity-70"
          animate={{ x: [0, -15, 0], y: [0, 8, 0] }}
          transition={{ duration: 5, repeat: Infinity }}
        />
      </div>

      {/* 标题 */}
      <motion.h1
        className="text-4xl md:text-6xl font-bold text-red-600 mb-8 text-center"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        小信鸽飞飞的<br />国庆节任务
      </motion.h1>

      {/* 小信鸽飞飞 */}
      <div className="relative mb-12">
        {/* 信鸽身体 */}
        <motion.svg
          width="200"
          height="160"
          viewBox="0 0 200 160"
          className="drop-shadow-lg"
          animate={isActivated ? { scale: [1, 1.05, 1] } : {}}
          transition={{ duration: 0.5, repeat: isActivated ? Infinity : 0 }}
        >
          {/* 身体 */}
          <ellipse cx="100" cy="80" rx="45" ry="35" fill="#E5E7EB" />
          
          {/* 翅膀 */}
          <motion.path
            d="M65 70 Q40 50 35 75 Q40 85 65 85 Z"
            fill="#D1D5DB"
            className={isActivated ? 'wing-flap' : ''}
          />
          <motion.path
            d="M135 70 Q160 50 165 75 Q160 85 135 85 Z"
            fill="#D1D5DB"
            className={isActivated ? 'wing-flap' : ''}
          />
          
          {/* 头部 */}
          <circle cx="100" cy="50" r="25" fill="#F3F4F6" />
          
          {/* 眼睛 */}
          <motion.circle
            cx="92" cy="45" r="3" fill="#1F2937"
            animate={isActivated ? { scaleY: [1, 0.1, 1] } : {}}
            transition={{ duration: 0.3, delay: 0.2 }}
          />
          <motion.circle
            cx="108" cy="45" r="3" fill="#1F2937"
            animate={isActivated ? { scaleY: [1, 0.1, 1] } : {}}
            transition={{ duration: 0.3, delay: 0.2 }}
          />
          
          {/* 嘴巴 */}
          <path d="M100 55 L105 60 L95 60 Z" fill="#F97316" />
          
          {/* 包裹 */}
          <rect x="85" y="58" width="30" height="20" rx="3" fill="#8B5CF6" />
          
          {/* 红色羽毛 */}
          <motion.path
            d="M115 63 Q120 58 118 68 Q115 70 112 68 Z"
            fill={isActivated ? "#DC2626" : "#9CA3AF"}
            className={isActivated ? 'glow-animation' : ''}
            animate={isActivated ? { scale: [1, 1.2, 1] } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
          />
        </motion.svg>
      </div>

      {/* 开始按钮 */}
      {!isActivated && (
        <motion.button
          onClick={handleStartStory}
          className="bg-red-500 hover:bg-red-600 text-white text-xl md:text-2xl font-bold py-4 px-8 rounded-full shadow-lg transform transition-all duration-200 hover:scale-105"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          ✨ 开始故事 ✨
        </motion.button>
      )}

      {/* 激活后的提示文字 */}
      {isActivated && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center text-green-600 font-bold text-lg"
        >
          <p>飞飞准备好了！</p>
          <p className="text-sm mt-1">即将开始冒险...</p>
        </motion.div>
      )}
    </div>
  );
}