'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useSound } from '@/hooks/useSound';

interface DeparturePageProps {
  onNext: () => void;
}

export default function DeparturePage({ onNext }: DeparturePageProps) {
  const [birdFlying, setBirdFlying] = useState(false);
  const { playSound } = useSound();

  const handleBirdClick = () => {
    if (birdFlying) return;
    
    setBirdFlying(true);
    playSound('wing_flap.mp3', { volume: 0.6 });

    // 自动跳转到下一页
    setTimeout(() => {
      onNext();
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-300 via-blue-100 to-green-100 relative overflow-hidden">
      {/* 滚动背景 */}
      <div className={`absolute inset-0 ${birdFlying ? 'background-scroll' : ''}`}>
        {/* 云朵背景 */}
        <motion.div
          className="absolute top-16 left-1/4 w-32 h-20 bg-white rounded-full opacity-70"
          animate={{ x: birdFlying ? [-50, -200] : [0, 20, 0] }}
          transition={{ duration: birdFlying ? 3 : 4, repeat: birdFlying ? 0 : Infinity }}
        />
        <motion.div
          className="absolute top-32 right-1/3 w-24 h-16 bg-white rounded-full opacity-60"
          animate={{ x: birdFlying ? [-30, -150] : [0, -15, 0] }}
          transition={{ duration: birdFlying ? 3 : 5, repeat: birdFlying ? 0 : Infinity }}
        />
        <motion.div
          className="absolute top-48 left-1/2 w-28 h-18 bg-white rounded-full opacity-50"
          animate={{ x: birdFlying ? [-40, -180] : [0, 10, 0] }}
          transition={{ duration: birdFlying ? 3 : 6, repeat: birdFlying ? 0 : Infinity }}
        />
        
        {/* 远山 */}
        <div className="absolute bottom-0 w-full">
          <svg width="100%" height="200" viewBox="0 0 800 200" className="w-full">
            <path 
              d="M0 200 Q200 120 400 140 Q600 160 800 100 L800 200 Z" 
              fill="#10B981" 
              opacity="0.6"
            />
            <path 
              d="M0 200 Q300 100 500 120 Q700 140 800 80 L800 200 Z" 
              fill="#059669" 
              opacity="0.4"
            />
          </svg>
        </div>
      </div>

      <div className="relative z-10 flex items-center justify-between h-screen px-8">
        {/* 小信鸽飞飞 */}
        <motion.div
          className="cursor-pointer"
          onClick={handleBirdClick}
          animate={birdFlying ? { 
            x: [0, 100, 300, 600, 1000],
            y: [0, -20, -10, -30, -40]
          } : {}}
          transition={{ duration: 2.5, ease: "easeInOut" }}
          whileHover={!birdFlying ? { scale: 1.1 } : {}}
          whileTap={!birdFlying ? { scale: 0.95 } : {}}
        >
          <svg width="180" height="150" viewBox="0 0 180 150">
            {/* 身体 */}
            <ellipse cx="90" cy="75" rx="40" ry="30" fill="#E5E7EB" />
            
            {/* 翅膀 */}
            <motion.path
              d="M55 65 Q30 45 25 70 Q30 85 55 80 Z"
              fill="#D1D5DB"
              animate={birdFlying ? { rotate: [0, -15, 15, -10, 10, 0] } : {}}
              transition={{ duration: 0.3, repeat: birdFlying ? Infinity : 0 }}
              style={{ transformOrigin: "50px 70px" }}
            />
            <motion.path
              d="M125 65 Q150 45 155 70 Q150 85 125 80 Z"
              fill="#D1D5DB"
              animate={birdFlying ? { rotate: [0, 15, -15, 10, -10, 0] } : {}}
              transition={{ duration: 0.3, repeat: birdFlying ? Infinity : 0 }}
              style={{ transformOrigin: "130px 70px" }}
            />
            
            {/* 头部 */}
            <circle cx="90" cy="50" r="22" fill="#F3F4F6" />
            
            {/* 眼睛 */}
            <circle cx="83" cy="45" r="3" fill="#1F2937" />
            <circle cx="97" cy="45" r="3" fill="#1F2937" />
            
            {/* 嘴巴叼着包裹 */}
            <path d="M90 55 L93 58 L87 58 Z" fill="#F97316" />
            
            {/* 包裹 */}
            <rect x="75" y="58" width="30" height="18" rx="3" fill="#8B5CF6" />
            <path 
              d="M105 62 Q110 57 108 67 Q105 69 102 67 Z" 
              fill="#DC2626"
              className="glow-animation"
            />
            
            {/* 尾巴 */}
            <path d="M50 80 Q35 75 40 90 Q45 85 50 85 Z" fill="#D1D5DB" />
            
            {/* 脚 */}
            <line x1="80" y1="105" x2="78" y2="115" stroke="#F97316" strokeWidth="2" />
            <line x1="100" y1="105" x2="102" y2="115" stroke="#F97316" strokeWidth="2" />
          </svg>
        </motion.div>

        {/* 右侧天空和提示 */}
        <div className="flex-1 flex flex-col items-center justify-center ml-8">
          <motion.h2
            className="text-3xl md:text-4xl font-bold text-blue-600 mb-8 text-center"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            勇敢出发！
          </motion.h2>

          {!birdFlying && (
            <motion.div
              className="text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              <p className="text-xl text-blue-700 font-medium mb-4">
                点击飞飞，开始送信之旅
              </p>
              <motion.div
                className="text-4xl"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                ✈️
              </motion.div>
            </motion.div>
          )}

          {birdFlying && (
            <motion.div
              className="text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <p className="text-2xl text-green-600 font-bold mb-2">
                飞飞出发了！
              </p>
              <p className="text-lg text-blue-600">
                向着派对广场飞去...
              </p>
            </motion.div>
          )}
        </div>
      </div>

      {/* 飞行轨迹效果 */}
      {birdFlying && (
        <motion.div
          className="absolute"
          initial={{ x: 180, y: 400 }}
          animate={{ 
            x: [180, 300, 500, 800, 1200],
            y: [400, 380, 390, 370, 360]
          }}
          transition={{ duration: 2.5, ease: "easeInOut" }}
        >
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-3 h-3 bg-blue-400 rounded-full opacity-60"
              initial={{ scale: 0, x: 0, y: 0 }}
              animate={{ 
                scale: [0, 1, 0],
                x: i * -20,
                y: Math.sin(i * 0.5) * 10
              }}
              transition={{ 
                duration: 0.8,
                delay: i * 0.2,
                repeat: 3
              }}
            />
          ))}
        </motion.div>
      )}
    </div>
  );
}