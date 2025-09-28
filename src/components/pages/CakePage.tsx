'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useSound } from '@/hooks/useSound';

interface CakePageProps {
  onNext: () => void;
}

export default function CakePage({ onNext }: CakePageProps) {
  const [gemPlaced, setGemPlaced] = useState(false);
  const [fireworksStarted, setFireworksStarted] = useState(false);
  const [showNextButton, setShowNextButton] = useState(false);
  const { playSound } = useSound();

  const handleCakeClick = () => {
    if (gemPlaced) return;
    
    setGemPlaced(true);
    
    // 延迟启动烟花
    setTimeout(() => {
      setFireworksStarted(true);
      playSound('celebration_music.mp3', { volume: 0.6 });
      
      // 延迟显示下一页按钮
      setTimeout(() => {
        setShowNextButton(true);
      }, 4000);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-900 via-red-700 to-yellow-600 relative overflow-hidden">
      {/* 夜空背景 */}
      <div className="absolute inset-0">
        {!fireworksStarted && [...Array(25)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 70}%`
            }}
            animate={{ 
              opacity: [0.3, 1, 0.3],
              scale: [1, 1.5, 1]
            }}
            transition={{
              duration: 2 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 2
            }}
          />
        ))}
      </div>

      <div className="relative z-10 h-screen flex flex-col items-center justify-center">
        
        {/* 标题 */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-yellow-300 mb-4">
            点亮生日蛋糕
          </h2>
          <p className="text-lg text-yellow-200">
            {!gemPlaced ? "点击蛋糕顶部，放上神奇的宝石" : "生日庆典开始！"}
          </p>
        </motion.div>

        {/* 生日蛋糕 */}
        <motion.div
          className="relative"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <svg width="300" height="250" viewBox="0 0 300 250">
            {/* 蛋糕底层 */}
            <ellipse cx="150" cy="220" rx="120" ry="20" fill="#8B4513" />
            <rect x="30" y="180" width="240" height="40" fill="#D2691E" />
            <ellipse cx="150" cy="180" rx="120" ry="20" fill="#F4A460" />
            
            {/* 蛋糕中层 */}
            <ellipse cx="150" cy="180" rx="90" ry="15" fill="#8B4513" />
            <rect x="60" y="150" width="180" height="30" fill="#DEB887" />
            <ellipse cx="150" cy="150" rx="90" ry="15" fill="#F5DEB3" />
            
            {/* 蛋糕顶层 */}
            <ellipse cx="150" cy="150" rx="60" ry="10" fill="#8B4513" />
            <rect x="90" y="120" width="120" height="30" fill="#FFB6C1" />
            <ellipse cx="150" cy="120" rx="60" ry="10" fill="#FFC0CB" />
            
            {/* 装饰 */}
            <circle cx="100" cy="200" r="8" fill="#FF1493" />
            <circle cx="200" cy="200" r="8" fill="#00CED1" />
            <circle cx="120" cy="165" r="6" fill="#32CD32" />
            <circle cx="180" cy="165" r="6" fill="#FF4500" />
            <circle cx="130" cy="135" r="4" fill="#9370DB" />
            <circle cx="170" cy="135" r="4" fill="#FFD700" />
            
            {/* 顶部宝石位置 */}
            <motion.g
              className={!gemPlaced ? "cursor-pointer" : ""}
              onClick={handleCakeClick}
              whileHover={!gemPlaced ? { scale: 1.1 } : {}}
              whileTap={!gemPlaced ? { scale: 0.9 } : {}}
            >
              <circle 
                cx="150" 
                cy="105" 
                r="15" 
                fill={gemPlaced ? "none" : "#FFD700"} 
                stroke={gemPlaced ? "none" : "#FFA500"}
                strokeWidth="2"
                strokeDasharray={gemPlaced ? "none" : "5,5"}
              />
              
              {!gemPlaced && (
                <motion.text
                  x="150"
                  y="110"
                  textAnchor="middle"
                  fill="#FFA500"
                  fontSize="10"
                  fontWeight="bold"
                  animate={{ opacity: [1, 0.5, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  点击
                </motion.text>
              )}

              {/* 放置的宝石 */}
              {gemPlaced && (
                <motion.g
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 200 }}
                >
                  <path 
                    d="M135 105 L150 85 L165 105 L158 120 L142 120 Z" 
                    fill="#DC2626"
                    className="glow-animation"
                  />
                  <path 
                    d="M142 95 L150 88 L158 95 L152 105 Z" 
                    fill="#EF4444"
                  />
                  
                  {/* 光芒效果 */}
                  <motion.g
                    animate={{ rotate: 360 }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                    style={{ transformOrigin: "150px 105px" }}
                  >
                    {[...Array(8)].map((_, i) => (
                      <line
                        key={i}
                        x1="150"
                        y1="105"
                        x2={150 + Math.cos(i * Math.PI / 4) * 25}
                        y2={105 + Math.sin(i * Math.PI / 4) * 25}
                        stroke="#FFD700"
                        strokeWidth="2"
                        opacity="0.7"
                      />
                    ))}
                  </motion.g>
                </motion.g>
              )}
            </motion.g>
          </svg>
        </motion.div>

        {/* 烟花效果 */}
        {fireworksStarted && (
          <div className="absolute inset-0 pointer-events-none">
            {/* 第一批烟花 */}
            <motion.div
              className="absolute top-20 left-1/4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <motion.svg
                width="120"
                height="120"
                viewBox="0 0 120 120"
                initial={{ scale: 0 }}
                animate={{ 
                  scale: [0, 1.5, 0],
                  rotate: [0, 180, 360]
                }}
                transition={{ 
                  duration: 3,
                  repeat: Infinity,
                  repeatDelay: 1
                }}
              >
                {[...Array(12)].map((_, i) => (
                  <motion.line
                    key={i}
                    x1="60"
                    y1="60"
                    x2={60 + Math.cos(i * Math.PI / 6) * 50}
                    y2={60 + Math.sin(i * Math.PI / 6) * 50}
                    stroke="#FF6B6B"
                    strokeWidth="3"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: [0, 1, 0] }}
                    transition={{ 
                      duration: 2,
                      delay: i * 0.1,
                      repeat: Infinity,
                      repeatDelay: 2
                    }}
                  />
                ))}
              </motion.svg>
            </motion.div>

            {/* 第二批烟花 */}
            <motion.div
              className="absolute top-16 right-1/4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              <motion.svg
                width="100"
                height="100"
                viewBox="0 0 100 100"
                initial={{ scale: 0 }}
                animate={{ 
                  scale: [0, 1.2, 0],
                  rotate: [0, -180, -360]
                }}
                transition={{ 
                  duration: 2.5,
                  repeat: Infinity,
                  repeatDelay: 1.5
                }}
              >
                {[...Array(10)].map((_, i) => (
                  <motion.line
                    key={i}
                    x1="50"
                    y1="50"
                    x2={50 + Math.cos(i * Math.PI / 5) * 40}
                    y2={50 + Math.sin(i * Math.PI / 5) * 40}
                    stroke="#4ECDC4"
                    strokeWidth="2"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: [0, 1, 0] }}
                    transition={{ 
                      duration: 1.8,
                      delay: i * 0.1,
                      repeat: Infinity,
                      repeatDelay: 2.2
                    }}
                  />
                ))}
              </motion.svg>
            </motion.div>

            {/* 第三批烟花 */}
            <motion.div
              className="absolute top-24 left-1/2 transform -translate-x-1/2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5 }}
            >
              <motion.svg
                width="140"
                height="140"
                viewBox="0 0 140 140"
                initial={{ scale: 0 }}
                animate={{ 
                  scale: [0, 1.8, 0],
                  rotate: [0, 270, 540]
                }}
                transition={{ 
                  duration: 3.5,
                  repeat: Infinity,
                  repeatDelay: 0.5
                }}
              >
                {[...Array(16)].map((_, i) => (
                  <motion.line
                    key={i}
                    x1="70"
                    y1="70"
                    x2={70 + Math.cos(i * Math.PI / 8) * 60}
                    y2={70 + Math.sin(i * Math.PI / 8) * 60}
                    stroke="#FFD93D"
                    strokeWidth="4"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: [0, 1, 0] }}
                    transition={{ 
                      duration: 2.5,
                      delay: i * 0.05,
                      repeat: Infinity,
                      repeatDelay: 1.5
                    }}
                  />
                ))}
              </motion.svg>
            </motion.div>

            {/* 粒子效果 */}
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 rounded-full"
                style={{
                  left: `${20 + Math.random() * 60}%`,
                  top: `${10 + Math.random() * 50}%`,
                  backgroundColor: ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD'][i % 6]
                }}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ 
                  scale: [0, 1.5, 0],
                  opacity: [0, 1, 0],
                  y: [0, -100],
                  x: [0, (Math.random() - 0.5) * 200]
                }}
                transition={{ 
                  duration: 3,
                  delay: Math.random() * 2,
                  repeat: Infinity,
                  repeatDelay: Math.random() * 2
                }}
              />
            ))}
          </div>
        )}

        {/* 庆祝消息 */}
        {fireworksStarted && (
          <motion.div
            className="absolute bottom-32 left-1/2 transform -translate-x-1/2 text-center"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2 }}
          >
            <h3 className="text-3xl font-bold text-yellow-200 mb-4">
              🎂 生日快乐！🎂
            </h3>
            <p className="text-xl text-yellow-100">
              红宝石的魔力点亮了整个庆典！
            </p>
          </motion.div>
        )}
      </div>

      {/* 下一页按钮 */}
      {showNextButton && (
        <motion.button
          onClick={onNext}
          className="absolute bottom-8 right-8 bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-6 rounded-full shadow-lg"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", stiffness: 200 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          英雄归来 🏆
        </motion.button>
      )}
    </div>
  );
}