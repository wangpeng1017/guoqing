'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useSound } from '@/hooks/useSound';

interface PackagePageProps {
  onNext: () => void;
}

export default function PackagePage({ onNext }: PackagePageProps) {
  const [featherAttached, setFeatherAttached] = useState(false);
  const [showNextButton, setShowNextButton] = useState(false);
  const { playSound } = useSound();

  const handleFeatherClick = () => {
    if (featherAttached) return;
    
    setFeatherAttached(true);
    playSound('swoosh.mp3', { volume: 0.6 });

    // 延迟显示下一页按钮
    setTimeout(() => {
      setShowNextButton(true);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-100 to-pink-100 flex flex-col items-center justify-center relative overflow-hidden">
      {/* 背景装饰 */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-12 w-16 h-16 bg-purple-200 rounded-full opacity-30 animate-pulse" />
        <div className="absolute bottom-32 right-20 w-12 h-12 bg-pink-300 rounded-full opacity-40 animate-bounce" />
        <div className="absolute top-1/2 left-8 w-8 h-8 bg-yellow-200 rounded-full opacity-50" />
      </div>

      {/* 标题 */}
      <motion.h2
        className="text-3xl md:text-4xl font-bold text-purple-700 mb-8 text-center"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        制作"鸡毛信"
      </motion.h2>

      <div className="flex flex-col items-center">
        {/* 包裹 */}
        <div className="relative mb-8">
          <motion.svg
            width="200"
            height="150"
            viewBox="0 0 200 150"
            className={featherAttached ? 'bounce-in' : ''}
          >
            {/* 包裹主体 */}
            <rect x="50" y="60" width="100" height="70" rx="8" fill="#8B5CF6" stroke="#7C3AED" strokeWidth="2" />
            
            {/* 绳子 */}
            <path d="M50 95 Q30 85 35 105 Q40 110 50 100" stroke="#8B4513" strokeWidth="3" fill="none" />
            <path d="M150 95 Q170 85 165 105 Q160 110 150 100" stroke="#8B4513" strokeWidth="3" fill="none" />
            <line x1="70" y1="60" x2="130" y2="60" stroke="#8B4513" strokeWidth="3" />
            
            {/* 包裹装饰 */}
            <circle cx="100" cy="90" r="8" fill="#A855F7" />
            <path d="M95 85 L100 95 L105 85" stroke="#FFF" strokeWidth="2" />

            {/* 羽毛位置 */}
            {featherAttached && (
              <motion.g
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <path 
                  d="M155 65 Q165 55 160 75 Q155 80 150 75 Z" 
                  fill="#DC2626"
                  className="glow-animation"
                />
                <path 
                  d="M155 68 Q160 60 158 72 Q156 74 154 72 Z" 
                  fill="#F87171"
                />
              </motion.g>
            )}
          </motion.svg>
        </div>

        {/* 羽毛（未附着时） */}
        {!featherAttached && (
          <motion.div
            className="relative cursor-pointer"
            onClick={handleFeatherClick}
            whileHover={{ scale: 1.1, rotate: 5 }}
            whileTap={{ scale: 0.9 }}
          >
            <motion.svg
              width="80"
              height="60"
              viewBox="0 0 80 60"
              animate={{ 
                y: [0, -10, 0],
                rotate: [0, 5, -5, 0]
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <path 
                d="M20 30 Q40 10 35 40 Q30 50 25 45 Z" 
                fill="#DC2626"
                stroke="#B91C1C"
                strokeWidth="1"
              />
              <path 
                d="M25 25 Q35 15 32 35 Q28 40 26 38 Z" 
                fill="#EF4444"
              />
              <line x1="30" y1="30" x2="40" y2="30" stroke="#B91C1C" strokeWidth="1" />
            </motion.svg>
            
            <motion.p
              className="text-center text-red-600 font-bold mt-2"
              animate={{ opacity: [1, 0.7, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              点击羽毛
            </motion.p>
          </motion.div>
        )}

        {/* 羽毛飞行动画 */}
        {featherAttached && (
          <motion.div
            className="absolute"
            initial={{ x: 0, y: 100 }}
            animate={{ 
              x: [0, 100, 150],
              y: [100, 50, -20],
              rotate: [0, 45, 0]
            }}
            transition={{ 
              duration: 1,
              ease: "cubicBezier(0.25, 0.46, 0.45, 0.94)"
            }}
          >
            <svg width="60" height="45" viewBox="0 0 60 45">
              <path 
                d="M15 22 Q30 7 27 30 Q22 37 18 34 Z" 
                fill="#DC2626"
              />
            </svg>
          </motion.div>
        )}

        {/* 成功提示 */}
        {featherAttached && (
          <motion.div
            className="mt-8 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            <p className="text-2xl font-bold text-green-600 mb-2">✅ 鸡毛信制作完成！</p>
            <p className="text-gray-600">红色羽毛代表紧急任务</p>
          </motion.div>
        )}
      </div>

      {/* 说明文字 */}
      {!featherAttached && (
        <motion.div
          className="absolute bottom-32 left-1/2 transform -translate-x-1/2 text-center max-w-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <p className="text-lg text-purple-700 font-medium">
            在古代，红色羽毛代表十万火急的重要信件
          </p>
          <p className="text-sm text-purple-600 mt-2">
            点击羽毛，完成"鸡毛信"的制作
          </p>
        </motion.div>
      )}

      {/* 下一页按钮 */}
      {showNextButton && (
        <motion.button
          onClick={onNext}
          className="absolute bottom-8 right-8 bg-purple-500 hover:bg-purple-600 text-white font-bold py-3 px-6 rounded-full shadow-lg"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", stiffness: 200 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          准备出发 🚀
        </motion.button>
      )}
    </div>
  );
}