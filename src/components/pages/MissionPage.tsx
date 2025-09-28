'use client';

import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { useSound } from '@/hooks/useSound';

interface MissionPageProps {
  onNext: () => void;
}

export default function MissionPage({ onNext }: MissionPageProps) {
  const [gemActivated, setGemActivated] = useState(false);
  const [showNextButton, setShowNextButton] = useState(false);
  const [particles, setParticles] = useState<Array<{id: number, x: number, y: number}>>([]);
  const { playSound } = useSound();
  const particleIdRef = useRef(0);

  const handleGemClick = () => {
    if (gemActivated) return;
    
    setGemActivated(true);
    playSound('sparkle.mp3', { volume: 0.7 });

    // 创建粒子效果
    const newParticles = [];
    for (let i = 0; i < 8; i++) {
      newParticles.push({
        id: particleIdRef.current++,
        x: Math.random() * 100 - 50,
        y: Math.random() * 100 - 50
      });
    }
    setParticles(newParticles);

    // 清理粒子
    setTimeout(() => {
      setParticles([]);
    }, 1000);

    // 显示下一页按钮
    setTimeout(() => {
      setShowNextButton(true);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-100 to-orange-100 flex items-center justify-center relative overflow-hidden">
      {/* 背景装饰 */}
      <div className="absolute inset-0">
        <div className="absolute top-16 left-8 w-12 h-12 bg-yellow-300 rounded-full opacity-50 animate-pulse" />
        <div className="absolute bottom-20 right-12 w-8 h-8 bg-red-400 rounded-full opacity-60 animate-bounce" />
      </div>

      <div className="flex flex-col md:flex-row items-center justify-center w-full max-w-6xl px-8">
        
        {/* 猫头鹰村长 */}
        <div className="flex-1 flex flex-col items-center mb-8 md:mb-0">
          <motion.svg
            width="150"
            height="180"
            viewBox="0 0 150 180"
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
          >
            {/* 身体 */}
            <ellipse cx="75" cy="110" rx="40" ry="50" fill="#8B4513" />
            
            {/* 头部 */}
            <ellipse cx="75" cy="60" rx="45" ry="40" fill="#A0522D" />
            
            {/* 眼睛 */}
            <circle cx="60" cy="55" r="12" fill="#FFF" />
            <circle cx="90" cy="55" r="12" fill="#FFF" />
            <circle cx="60" cy="55" r="6" fill="#000" />
            <circle cx="90" cy="55" r="6" fill="#000" />
            
            {/* 嘴巴 */}
            <path d="M75 70 L70 75 L80 75 Z" fill="#FF6B35" />
            
            {/* 翅膀指向宝石 */}
            <motion.path
              d="M30 100 Q10 90 20 110 Q25 115 35 105 Z"
              fill="#654321"
              animate={gemActivated ? { rotate: [0, -10, 0] } : {}}
              transition={{ duration: 0.5, delay: 0.5 }}
            />
            
            {/* 帽子 */}
            <path d="M45 35 Q75 25 105 35 Q100 45 95 40 L55 40 Q50 45 45 35 Z" fill="#1F2937" />
          </motion.svg>
          
          <motion.p
            className="text-center text-lg font-bold text-amber-800 mt-4 max-w-xs"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
          >
&ldquo;飞飞，这是一颗神奇的红宝石，需要你送到派对现场！&rdquo;
          </motion.p>
        </div>

        {/* 红宝石 */}
        <div className="flex-1 flex flex-col items-center relative">
          <div className="relative">
            <motion.svg
              width="120"
              height="120"
              viewBox="0 0 120 120"
              className="cursor-pointer"
              onClick={handleGemClick}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {/* 红布 */}
              <ellipse cx="60" cy="80" rx="50" ry="20" fill="#DC2626" />
              
              {/* 宝石 */}
              <motion.path
                d="M40 60 L60 30 L80 60 L70 80 L50 80 Z"
                fill={gemActivated ? "#EF4444" : "#B91C1C"}
                className={gemActivated ? 'glow-animation' : ''}
                animate={gemActivated ? { 
                  filter: [
                    "drop-shadow(0 0 5px rgba(239, 68, 68, 0.5))",
                    "drop-shadow(0 0 20px rgba(239, 68, 68, 1))",
                    "drop-shadow(0 0 5px rgba(239, 68, 68, 0.5))"
                  ] 
                } : {}}
                transition={{ duration: 1, repeat: gemActivated ? Infinity : 0 }}
              />
              
              {/* 宝石光泽 */}
              {gemActivated && (
                <motion.path
                  d="M50 50 L58 35 L65 50 L58 65 Z"
                  fill="#FCA5A5"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{ duration: 0.5, repeat: Infinity }}
                />
              )}
            </motion.svg>

            {/* 粒子效果 */}
            {particles.map(particle => (
              <motion.div
                key={particle.id}
                className="absolute w-2 h-2 bg-yellow-400 rounded-full"
                style={{
                  left: `calc(50% + ${particle.x}px)`,
                  top: `calc(50% + ${particle.y}px)`
                }}
                initial={{ opacity: 1, scale: 1 }}
                animate={{ 
                  opacity: 0, 
                  scale: 0,
                  y: particle.y - 50
                }}
                transition={{ duration: 1 }}
              />
            ))}
          </div>

          <motion.p
            className="text-center text-red-600 font-bold mt-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
          >
            {!gemActivated ? "点击红宝石接受任务" : "任务已接受！"}
          </motion.p>
        </div>

        {/* 小信鸽飞飞 */}
        <div className="flex-1 flex flex-col items-center">
          <motion.svg
            width="140"
            height="140"
            viewBox="0 0 140 140"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            {/* 身体 */}
            <ellipse cx="70" cy="70" rx="35" ry="28" fill="#E5E7EB" />
            
            {/* 翅膀 */}
            <path d="M45 60 Q25 45 20 65 Q25 75 45 75 Z" fill="#D1D5DB" />
            <path d="M95 60 Q115 45 120 65 Q115 75 95 75 Z" fill="#D1D5DB" />
            
            {/* 头部 */}
            <circle cx="70" cy="45" r="20" fill="#F3F4F6" />
            
            {/* 眼睛 */}
            <circle cx="65" cy="40" r="2" fill="#1F2937" />
            <circle cx="75" cy="40" r="2" fill="#1F2937" />
            
            {/* 嘴巴 */}
            <path d="M70 48 L73 52 L67 52 Z" fill="#F97316" />
            
            {/* 表情变化 */}
            {gemActivated && (
              <motion.path
                d="M65 42 Q70 38 75 42"
                stroke="#22C55E"
                strokeWidth="2"
                fill="none"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              />
            )}
          </motion.svg>

          <motion.p
            className="text-center text-gray-600 mt-2"
            animate={gemActivated ? { color: "#22C55E" } : {}}
          >
            {gemActivated ? "我一定完成任务！" : "期待地看着..."}
          </motion.p>
        </div>
      </div>

      {/* 下一页按钮 */}
      {showNextButton && (
        <motion.button
          onClick={onNext}
          className="absolute bottom-8 right-8 bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-6 rounded-full shadow-lg"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          下一页 →
        </motion.button>
      )}
    </div>
  );
}