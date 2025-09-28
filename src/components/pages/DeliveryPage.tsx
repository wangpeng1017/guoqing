'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useSound } from '@/hooks/useSound';

interface DeliveryPageProps {
  onNext: () => void;
}

export default function DeliveryPage({ onNext }: DeliveryPageProps) {
  const [packageDelivered, setPackageDelivered] = useState(false);
  const [animalsChearing, setAnimalsChearing] = useState(false);
  const [showNextButton, setShowNextButton] = useState(false);
  const { playSound } = useSound();

  const handlePackageClick = () => {
    if (packageDelivered) return;
    
    setPackageDelivered(true);
    
    // 延迟显示动物欢呼
    setTimeout(() => {
      setAnimalsChearing(true);
      playSound('crowd_cheer.mp3', { volume: 0.7 });
      
      // 再延迟显示下一页按钮
      setTimeout(() => {
        setShowNextButton(true);
      }, 2500);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-200 via-yellow-100 to-red-100 relative overflow-hidden">
      {/* 背景装饰 - 派对现场 */}
      <div className="absolute inset-0">
        {/* 彩带 */}
        <div className="absolute top-16 left-1/4 w-2 h-32 bg-gradient-to-b from-pink-400 to-red-400 transform rotate-12 opacity-70" />
        <div className="absolute top-20 right-1/3 w-2 h-28 bg-gradient-to-b from-blue-400 to-purple-400 transform -rotate-12 opacity-70" />
        <div className="absolute top-12 left-1/2 w-2 h-36 bg-gradient-to-b from-green-400 to-yellow-400 transform rotate-6 opacity-70" />
        
        {/* 气球 */}
        <motion.div
          className="absolute top-10 left-12"
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          <div className="w-8 h-10 bg-red-400 rounded-full" />
          <div className="w-0.5 h-12 bg-gray-600 mx-auto" />
        </motion.div>
        <motion.div
          className="absolute top-16 right-16"
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 2.5, repeat: Infinity }}
        >
          <div className="w-7 h-9 bg-blue-400 rounded-full" />
          <div className="w-0.5 h-10 bg-gray-600 mx-auto" />
        </motion.div>
      </div>

      <div className="relative z-10 h-screen flex items-center justify-center px-8">
        
        {/* 主要场景 */}
        <div className="flex items-center justify-center w-full max-w-4xl">
          
          {/* 小信鸽飞飞 - 左侧 */}
          <motion.div
            className="mr-16"
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
          >
            <svg width="140" height="120" viewBox="0 0 140 120">
              {/* 身体 */}
              <ellipse cx="70" cy="60" rx="35" ry="26" fill="#E5E7EB" />
              
              {/* 翅膀 */}
              <path d="M40 50 Q20 35 16 55 Q20 68 40 62 Z" fill="#D1D5DB" />
              <path d="M100 50 Q120 35 124 55 Q120 68 100 62 Z" fill="#D1D5DB" />
              
              {/* 头部 */}
              <circle cx="70" cy="40" r="20" fill="#F3F4F6" />
              
              {/* 眼睛 */}
              <circle cx="64" cy="35" r="3" fill="#1F2937" />
              <circle cx="76" cy="35" r="3" fill="#1F2937" />
              
              {/* 嘴巴 */}
              <path d="M70 45 L73 48 L67 48 Z" fill="#F97316" />
              
              {/* 包裹 - 根据状态显示 */}
              {!packageDelivered && (
                <motion.g
                  className="cursor-pointer"
                  onClick={handlePackageClick}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <rect x="57" y="48" width="26" height="16" rx="3" fill="#8B5CF6" />
                  <path d="M83 52 Q87 49 85 57 Q83 58 81 57 Z" fill="#DC2626" />
                </motion.g>
              )}
            </svg>
            
            <motion.p
              className="text-center text-gray-700 font-bold mt-4"
              animate={packageDelivered ? { color: "#10B981" } : {}}
            >
              {packageDelivered ? "任务完成！" : "点击包裹交给猴子"}
            </motion.p>
          </motion.div>

          {/* 小猴子主持人 - 右侧 */}
          <motion.div
            className="ml-16"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            <svg width="120" height="140" viewBox="0 0 120 140">
              {/* 身体 */}
              <ellipse cx="60" cy="80" rx="30" ry="40" fill="#CD853F" />
              
              {/* 头部 */}
              <circle cx="60" cy="45" r="25" fill="#DEB887" />
              
              {/* 耳朵 */}
              <circle cx="40" cy="30" r="8" fill="#CD853F" />
              <circle cx="80" cy="30" r="8" fill="#CD853F" />
              
              {/* 眼睛 */}
              <circle cx="52" cy="40" r="4" fill="#FFF" />
              <circle cx="68" cy="40" r="4" fill="#FFF" />
              <circle cx="52" cy="40" r="2" fill="#000" />
              <circle cx="68" cy="40" r="2" fill="#000" />
              
              {/* 鼻子 */}
              <ellipse cx="60" cy="48" rx="3" ry="2" fill="#8B4513" />
              
              {/* 嘴巴 */}
              <path d="M55 52 Q60 58 65 52" stroke="#8B4513" strokeWidth="2" fill="none" />
              
              {/* 伸出的手臂 */}
              <motion.path
                d="M30 70 Q10 65 15 75 Q20 80 35 75 Z"
                fill="#CD853F"
                animate={packageDelivered ? { rotate: [0, -10, 0] } : {}}
                transition={{ duration: 0.5, delay: 1 }}
                style={{ transformOrigin: "30px 75px" }}
              />
              
              {/* 接收到的包裹 */}
              {packageDelivered && (
                <motion.g
                  initial={{ scale: 0, x: 100, y: -20 }}
                  animate={{ scale: 1, x: 0, y: 0 }}
                  transition={{ 
                    type: "spring",
                    stiffness: 200,
                    delay: 0.5
                  }}
                >
                  <rect x="15" y="65" width="26" height="16" rx="3" fill="#8B5CF6" />
                  <path d="M41 69 Q45 66 43 74 Q41 75 39 74 Z" fill="#DC2626" />
                </motion.g>
              )}
              
              {/* 帽子 */}
              <path d="M35 25 Q60 15 85 25 Q80 35 75 30 L45 30 Q40 35 35 25 Z" fill="#1F2937" />
            </svg>
            
            <motion.p
              className="text-center text-gray-700 font-bold mt-4"
              animate={packageDelivered ? { color: "#DC2626" } : {}}
            >
              {packageDelivered ? "谢谢飞飞！" : "等待重要物品..."}
            </motion.p>
          </motion.div>
        </div>

        {/* 围观的小动物们 */}
        <div className="absolute bottom-20 left-0 right-0">
          <div className="flex justify-center space-x-12">
            
            {/* 小兔子 */}
            <motion.div
              animate={animalsChearing ? { y: [0, -15, 0] } : {}}
              transition={{ duration: 0.6, repeat: animalsChearing ? Infinity : 0 }}
            >
              <svg width="60" height="70" viewBox="0 0 60 70">
                <ellipse cx="30" cy="50" rx="18" ry="20" fill="#F3F4F6" />
                <circle cx="30" cy="35" r="12" fill="#FFF" />
                <ellipse cx="25" cy="18" rx="3" ry="8" fill="#F3F4F6" />
                <ellipse cx="35" cy="18" rx="3" ry="8" fill="#F3F4F6" />
                <circle cx="27" cy="32" r="2" fill="#000" />
                <circle cx="33" cy="32" r="2" fill="#000" />
                <ellipse cx="30" cy="38" rx="2" ry="1" fill="#FFC0CB" />
              </svg>
            </motion.div>

            {/* 小松鼠 */}
            <motion.div
              animate={animalsChearing ? { y: [0, -12, 0] } : {}}
              transition={{ duration: 0.5, repeat: animalsChearing ? Infinity : 0, delay: 0.1 }}
            >
              <svg width="55" height="65" viewBox="0 0 55 65">
                <ellipse cx="27" cy="45" rx="15" ry="18" fill="#8B4513" />
                <circle cx="27" cy="30" r="10" fill="#A0522D" />
                <circle cx="24" cy="27" r="2" fill="#000" />
                <circle cx="30" cy="27" r="2" fill="#000" />
                <path d="M15 25 Q10 15 20 20 Q25 25 20 30" fill="#8B4513" />
                <ellipse cx="27" cy="32" rx="1.5" ry="1" fill="#000" />
              </svg>
            </motion.div>

            {/* 小浣熊 */}
            <motion.div
              animate={animalsChearing ? { y: [0, -18, 0] } : {}}
              transition={{ duration: 0.7, repeat: animalsChearing ? Infinity : 0, delay: 0.2 }}
            >
              <svg width="65" height="75" viewBox="0 0 65 75">
                <ellipse cx="32" cy="50" rx="20" ry="22" fill="#708090" />
                <circle cx="32" cy="32" r="14" fill="#F5F5F5" />
                <path d="M20 28 Q25 25 30 28 Q35 25 40 28 Q37 32 32 30 Q27 32 24 28" fill="#000" />
                <circle cx="28" cy="29" r="2" fill="#000" />
                <circle cx="36" cy="29" r="2" fill="#000" />
                <ellipse cx="32" cy="36" rx="2" ry="1.5" fill="#000" />
              </svg>
            </motion.div>

            {/* 小刺猬 */}
            <motion.div
              animate={animalsChearing ? { y: [0, -10, 0] } : {}}
              transition={{ duration: 0.8, repeat: animalsChearing ? Infinity : 0, delay: 0.3 }}
            >
              <svg width="50" height="60" viewBox="0 0 50 60">
                <ellipse cx="25" cy="40" rx="16" ry="18" fill="#8B4513" />
                <circle cx="25" cy="25" r="8" fill="#D2B48C" />
                <circle cx="22" cy="22" r="1.5" fill="#000" />
                <circle cx="28" cy="22" r="1.5" fill="#000" />
                <ellipse cx="25" cy="26" rx="1" ry="0.8" fill="#000" />
                {/* 刺 */}
                {[...Array(6)].map((_, i) => (
                  <line
                    key={i}
                    x1={15 + i * 3}
                    y1="35"
                    x2={13 + i * 3}
                    y2="30"
                    stroke="#654321"
                    strokeWidth="1"
                  />
                ))}
              </svg>
            </motion.div>
          </div>
        </div>
      </div>

      {/* 标题和说明 */}
      <motion.div
        className="absolute top-20 left-1/2 transform -translate-x-1/2 text-center"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        <h2 className="text-3xl md:text-4xl font-bold text-orange-600 mb-4">
          成功送达！
        </h2>
        <p className="text-lg text-orange-700">
          {!packageDelivered ? "点击包裹，完成最重要的任务" : 
           !animalsChearing ? "猴子接到了重要物品！" : 
           "所有小动物都在为飞飞欢呼！"}
        </p>
      </motion.div>

      {/* 欢呼效果 */}
      {animalsChearing && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-2xl"
              style={{
                left: `${10 + Math.random() * 80}%`,
                top: `${20 + Math.random() * 60}%`
              }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ 
                opacity: [0, 1, 0],
                scale: [0, 1.2, 0],
                y: [0, -30]
              }}
              transition={{ 
                duration: 2,
                delay: i * 0.1,
                repeat: 2
              }}
            >
              {['🎉', '👏', '✨', '🎊', '🌟'][i % 5]}
            </motion.div>
          ))}
        </div>
      )}

      {/* 下一页按钮 */}
      {showNextButton && (
        <motion.button
          onClick={onNext}
          className="absolute bottom-8 right-8 bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-6 rounded-full shadow-lg"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", stiffness: 200 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          庆祝时刻 🎂
        </motion.button>
      )}
    </div>
  );
}