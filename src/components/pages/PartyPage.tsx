'use client';

import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { useSound } from '@/hooks/useSound';

interface PartyPageProps {
  onNext: () => void;
}

export default function PartyPage({ onNext }: PartyPageProps) {
  const [isHovering, setIsHovering] = useState(false);
  const [showNextButton, setShowNextButton] = useState(false);
  const { playSound } = useSound();
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handleHover = (hovering: boolean) => {
    setIsHovering(hovering);
    
    if (hovering) {
      playSound('distant_party_music.mp3', { volume: 0.4 });
      setTimeout(() => {
        setShowNextButton(true);
      }, 2000);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-900 via-purple-900 to-blue-900 relative overflow-hidden">
      {/* 星空背景 */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 80}%`
            }}
            animate={{ 
              opacity: [0.3, 1, 0.3],
              scale: [1, 1.5, 1]
            }}
            transition={{
              duration: 2 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2
            }}
          />
        ))}
      </div>

      <div className="relative z-10 h-screen flex items-center justify-between px-8">
        
        {/* 左侧 - 小信鸽飞飞 */}
        <motion.div
          className="flex-1"
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        >
          <svg width="180" height="150" viewBox="0 0 180 150">
            {/* 身体 */}
            <ellipse cx="90" cy="75" rx="40" ry="30" fill="#E5E7EB" />
            
            {/* 翅膀 - 缓慢扇动 */}
            <motion.path
              d="M55 65 Q30 45 25 70 Q30 85 55 80 Z"
              fill="#D1D5DB"
              animate={{ rotate: [0, -8, 8, 0] }}
              transition={{ duration: 1, repeat: Infinity }}
              style={{ transformOrigin: "50px 70px" }}
            />
            <motion.path
              d="M125 65 Q150 45 155 70 Q150 85 125 80 Z"
              fill="#D1D5DB"
              animate={{ rotate: [0, 8, -8, 0] }}
              transition={{ duration: 1, repeat: Infinity }}
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
          </svg>
          
          <motion.p
            className="text-center text-white font-bold mt-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            飞飞终于看到了目的地！
          </motion.p>
        </motion.div>

        {/* 右侧 - 远山上的派对广场 */}
        <div className="flex-1 flex justify-center">
          <motion.div
            className="relative"
            onMouseEnter={() => handleHover(true)}
            onMouseLeave={() => handleHover(false)}
            onTouchStart={() => handleHover(true)}
            onTouchEnd={() => handleHover(false)}
            whileHover={{ scale: 1.05 }}
          >
            {/* 山峰轮廓 */}
            <svg width="300" height="250" viewBox="0 0 300 250">
              <path 
                d="M0 250 Q100 150 150 120 Q200 100 250 140 Q275 160 300 180 L300 250 Z" 
                fill="#1F2937" 
              />
              <path 
                d="M0 250 Q80 180 120 160 Q160 140 200 170 Q240 200 300 190 L300 250 Z" 
                fill="#374151" 
              />
            </svg>

            {/* 派对广场建筑 */}
            <div className="absolute top-16 left-1/2 transform -translate-x-1/2">
              <svg width="120" height="80" viewBox="0 0 120 80">
                {/* 主建筑 */}
                <rect x="30" y="40" width="60" height="40" fill="#8B5CF6" />
                <path d="M20 40 L60 15 L100 40 Z" fill="#DC2626" />
                
                {/* 窗户 */}
                <rect x="40" y="50" width="12" height="15" fill={isHovering ? "#FDE047" : "#374151"} />
                <rect x="68" y="50" width="12" height="15" fill={isHovering ? "#FDE047" : "#374151"} />
                <rect x="54" y="65" width="12" height="15" fill={isHovering ? "#FDE047" : "#374151"} />
              </svg>
            </div>

            {/* 灯笼装饰 */}
            <div className="absolute top-8 left-12">
              <motion.svg
                width="20" 
                height="30" 
                viewBox="0 0 20 30"
                animate={isHovering ? { scale: [1, 1.1, 1] } : {}}
                transition={{ duration: 0.5, repeat: isHovering ? Infinity : 0 }}
              >
                <ellipse cx="10" cy="15" rx="8" ry="12" fill={isHovering ? "#DC2626" : "#7F1D1D"} />
                <rect x="8" y="3" width="4" height="6" fill="#8B5CF6" />
                <line x1="10" y1="27" x2="10" y2="30" stroke="#FCD34D" strokeWidth="2" />
              </motion.svg>
            </div>
            
            <div className="absolute top-6 right-16">
              <motion.svg
                width="18" 
                height="28" 
                viewBox="0 0 18 28"
                animate={isHovering ? { scale: [1, 1.1, 1] } : {}}
                transition={{ duration: 0.7, repeat: isHovering ? Infinity : 0 }}
              >
                <ellipse cx="9" cy="14" rx="7" ry="11" fill={isHovering ? "#DC2626" : "#7F1D1D"} />
                <rect x="7" y="3" width="4" height="5" fill="#8B5CF6" />
                <line x1="9" y1="25" x2="9" y2="28" stroke="#FCD34D" strokeWidth="2" />
              </motion.svg>
            </div>

            {/* 彩灯串 */}
            <div className="absolute top-20 left-8 right-8">
              <svg width="140" height="20" viewBox="0 0 140 20">
                <path 
                  d="M10 10 Q35 5 70 10 Q105 15 130 10" 
                  stroke="#374151" 
                  strokeWidth="2" 
                  fill="none"
                />
                {[20, 40, 60, 80, 100, 120].map((x, i) => (
                  <motion.circle
                    key={i}
                    cx={x}
                    cy={10 + Math.sin(x * 0.1) * 3}
                    r="3"
                    fill={isHovering ? 
                      ['#EF4444', '#F59E0B', '#10B981', '#3B82F6', '#8B5CF6', '#EC4899'][i] 
                      : '#374151'
                    }
                    animate={isHovering ? { 
                      opacity: [0.7, 1, 0.7],
                      scale: [1, 1.2, 1]
                    } : {}}
                    transition={{ 
                      duration: 1,
                      repeat: isHovering ? Infinity : 0,
                      delay: i * 0.1
                    }}
                  />
                ))}
              </svg>
            </div>

            {/* 烟花效果 (悬停时) */}
            {isHovering && (
              <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute"
                    style={{
                      left: `${(i - 2) * 20}px`,
                      top: `${Math.random() * 20}px`
                    }}
                    initial={{ scale: 0, opacity: 1 }}
                    animate={{ 
                      scale: [0, 1.5, 0],
                      opacity: [1, 0.8, 0],
                      rotate: [0, 180, 360]
                    }}
                    transition={{ 
                      duration: 1.5,
                      repeat: Infinity,
                      delay: i * 0.2
                    }}
                  >
                    <svg width="12" height="12" viewBox="0 0 12 12">
                      <path 
                        d="M6 0 L7 5 L12 6 L7 7 L6 12 L5 7 L0 6 L5 5 Z" 
                        fill={['#FCD34D', '#F87171', '#60A5FA', '#A78BFA', '#FB7185'][i]}
                      />
                    </svg>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        </div>
      </div>

      {/* 说明文字 */}
      <motion.div
        className="absolute bottom-32 left-1/2 transform -translate-x-1/2 text-center"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 1.5 }}
      >
        <h2 className="text-3xl font-bold text-white mb-4">看到派对广场</h2>
        <p className="text-lg text-gray-300">
          {!isHovering ? "悬停在山顶广场上，看看发生什么" : "派对正在进行中！"}
        </p>
        
        {isHovering && (
          <motion.p
            className="text-yellow-300 font-bold mt-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            🎵 听到了远处的音乐声！
          </motion.p>
        )}
      </motion.div>

      {/* 下一页按钮 */}
      {showNextButton && (
        <motion.button
          onClick={onNext}
          className="absolute bottom-8 right-8 bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-3 px-6 rounded-full shadow-lg"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", stiffness: 200 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          飞向派对 🎉
        </motion.button>
      )}
    </div>
  );
}