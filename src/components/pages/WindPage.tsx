'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useSound } from '@/hooks/useSound';

interface WindPageProps {
  onNext: () => void;
}

interface WindBaby {
  id: number;
  x: number;
  y: number;
  isFriendly: boolean;
}

export default function WindPage({ onNext }: WindPageProps) {
  const [windBabies, setWindBabies] = useState<WindBaby[]>([
    { id: 1, x: 200, y: 150, isFriendly: false },
    { id: 2, x: 400, y: 200, isFriendly: false },
    { id: 3, x: 600, y: 120, isFriendly: false },
    { id: 4, x: 300, y: 300, isFriendly: false },
  ]);
  const [allFriendly, setAllFriendly] = useState(false);
  const [showNextButton, setShowNextButton] = useState(false);
  const { playSound } = useSound();

  const handleWindClick = (id: number) => {
    const updatedWindBabies = windBabies.map(wind => 
      wind.id === id ? { ...wind, isFriendly: true } : wind
    );
    setWindBabies(updatedWindBabies);
    
    playSound('positive_chime.mp3', { volume: 0.5 });
    
    // 检查是否所有风宝宝都变友好了
    const allAreFriendly = updatedWindBabies.every(wind => wind.isFriendly);
    if (allAreFriendly && !allFriendly) {
      setAllFriendly(true);
      
      // 延迟显示下一页按钮
      setTimeout(() => {
        setShowNextButton(true);
      }, 3000);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-cyan-200 via-sky-100 to-blue-100 relative overflow-hidden">
      {/* 背景云朵 */}
      <div className="absolute inset-0">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className={`absolute bg-white rounded-full opacity-${40 + i * 10}`}
            style={{
              width: `${60 + i * 20}px`,
              height: `${40 + i * 10}px`,
              left: `${10 + i * 15}%`,
              top: `${10 + i * 8}%`
            }}
            animate={{
              x: [0, 30, -20, 0],
              y: [0, -10, 10, 0]
            }}
            transition={{
              duration: 4 + i,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      <div className="relative z-10 h-screen">
        {/* 标题 */}
        <motion.div
          className="absolute top-16 left-1/2 transform -translate-x-1/2 text-center"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-cyan-600 mb-4">
            得到风宝宝的帮助
          </h2>
          <p className="text-lg text-cyan-700">
            {!allFriendly ? "点击调皮的风宝宝，让它们变友好" : "太好了！风宝宝们都愿意帮忙！"}
          </p>
        </motion.div>

        {/* 小信鸽飞飞 - 中央被风吹摇摆 */}
        <motion.div
          className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"
          animate={!allFriendly ? {
            x: [0, -20, 15, -10, 0],
            y: [0, 10, -15, 5, 0],
            rotate: [0, -5, 3, -2, 0]
          } : {
            y: [0, -30, -60, -90],
            x: [0, 50, 100, 200]
          }}
          transition={!allFriendly ? {
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          } : {
            duration: 3,
            delay: 1,
            ease: "easeOut"
          }}
        >
          <svg width="120" height="100" viewBox="0 0 120 100">
            {/* 身体 */}
            <ellipse cx="60" cy="50" rx="30" ry="22" fill="#E5E7EB" />
            
            {/* 翅膀 - 努力扇动 */}
            <motion.path
              d="M35 45 Q15 30 12 50 Q18 60 35 55 Z"
              fill="#D1D5DB"
              animate={!allFriendly ? { rotate: [0, -20, 20, 0] } : { rotate: [0, -15, 15, 0] }}
              transition={{ duration: allFriendly ? 0.3 : 0.5, repeat: Infinity }}
              style={{ transformOrigin: "30px 50px" }}
            />
            <motion.path
              d="M85 45 Q105 30 108 50 Q102 60 85 55 Z"
              fill="#D1D5DB"
              animate={!allFriendly ? { rotate: [0, 20, -20, 0] } : { rotate: [0, 15, -15, 0] }}
              transition={{ duration: allFriendly ? 0.3 : 0.5, repeat: Infinity }}
              style={{ transformOrigin: "90px 50px" }}
            />
            
            {/* 头部 */}
            <circle cx="60" cy="32" r="18" fill="#F3F4F6" />
            
            {/* 眼睛 */}
            <circle cx="55" cy="28" r="2" fill="#1F2937" />
            <circle cx="65" cy="28" r="2" fill="#1F2937" />
            
            {/* 表情 */}
            {!allFriendly ? (
              // 担心的表情
              <path d="M55 35 Q60 32 65 35" stroke="#F59E0B" strokeWidth="2" fill="none" />
            ) : (
              // 开心的表情
              <path d="M55 35 Q60 40 65 35" stroke="#10B981" strokeWidth="2" fill="none" />
            )}
            
            {/* 包裹 */}
            <rect x="48" y="38" width="24" height="12" rx="2" fill="#8B5CF6" />
            <path d="M72 42 Q76 39 74 45 Q72 46 70 45 Z" fill="#DC2626" />
          </svg>

          {!allFriendly && (
            <motion.p
              className="text-center text-orange-600 font-bold mt-2"
              animate={{ opacity: [1, 0.7, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              被风吹得摇摇晃晃...
            </motion.p>
          )}
        </motion.div>

        {/* 风宝宝们 */}
        {windBabies.map((wind) => (
          <motion.div
            key={wind.id}
            className="absolute cursor-pointer"
            style={{ left: wind.x, top: wind.y }}
            onClick={() => handleWindClick(wind.id)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            animate={wind.isFriendly ? {} : { rotate: [0, 360] }}
            transition={wind.isFriendly ? {} : { duration: 2, repeat: Infinity, ease: "linear" }}
          >
            <svg width="80" height="80" viewBox="0 0 80 80">
              {/* 风宝宝主体 */}
              <circle 
                cx="40" 
                cy="40" 
                r="25" 
                fill={wind.isFriendly ? "#67E8F9" : "#0891B2"} 
                opacity="0.8"
              />
              
              {/* 旋转线条 */}
              <motion.g
                animate={wind.isFriendly ? {} : { rotate: [0, 360] }}
                transition={wind.isFriendly ? {} : { duration: 1, repeat: Infinity, ease: "linear" }}
                style={{ transformOrigin: "40px 40px" }}
              >
                <path 
                  d="M40 20 Q50 30 45 40 Q35 35 40 20" 
                  stroke={wind.isFriendly ? "#10B981" : "#0E7490"} 
                  strokeWidth="3" 
                  fill="none"
                />
                <path 
                  d="M60 40 Q50 50 40 45 Q45 35 60 40" 
                  stroke={wind.isFriendly ? "#10B981" : "#0E7490"} 
                  strokeWidth="3" 
                  fill="none"
                />
                <path 
                  d="M40 60 Q30 50 35 40 Q45 45 40 60" 
                  stroke={wind.isFriendly ? "#10B981" : "#0E7490"} 
                  strokeWidth="3" 
                  fill="none"
                />
              </motion.g>
              
              {/* 表情 */}
              {wind.isFriendly ? (
                <g>
                  {/* 开心的眼睛 */}
                  <circle cx="32" cy="35" r="3" fill="#10B981" />
                  <circle cx="48" cy="35" r="3" fill="#10B981" />
                  {/* 笑脸 */}
                  <path d="M30 45 Q40 55 50 45" stroke="#10B981" strokeWidth="2" fill="none" />
                </g>
              ) : (
                <g>
                  {/* 调皮的眼睛 */}
                  <circle cx="32" cy="35" r="3" fill="#DC2626" />
                  <circle cx="48" cy="35" r="3" fill="#DC2626" />
                  {/* 调皮的嘴 */}
                  <path d="M35 50 Q40 45 45 50" stroke="#DC2626" strokeWidth="2" fill="none" />
                </g>
              )}
            </svg>
            
            {!wind.isFriendly && (
              <motion.p
                className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs text-blue-600 font-bold"
                animate={{ opacity: [1, 0.5, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                点我！
              </motion.p>
            )}
          </motion.div>
        ))}

        {/* 友好风力效果 */}
        {allFriendly && (
          <motion.div
            className="absolute inset-0 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            {/* 温和的风线 */}
            {[...Array(12)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute"
                style={{
                  left: `${10 + i * 7}%`,
                  top: `${30 + Math.sin(i) * 20}%`
                }}
                initial={{ x: -50, opacity: 0 }}
                animate={{ 
                  x: [0, 100, 200],
                  opacity: [0, 1, 0]
                }}
                transition={{ 
                  duration: 2,
                  delay: i * 0.1,
                  repeat: 2
                }}
              >
                <svg width="40" height="6" viewBox="0 0 40 6">
                  <path 
                    d="M0 3 Q10 0 20 3 Q30 6 40 3" 
                    stroke="#67E8F9" 
                    strokeWidth="2" 
                    fill="none"
                    opacity="0.8"
                  />
                </svg>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* 成功提示 */}
        {allFriendly && (
          <motion.div
            className="absolute top-1/3 left-1/2 transform -translate-x-1/2 text-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 2, type: "spring" }}
          >
            <p className="text-2xl font-bold text-green-600 mb-2">
              🌪️ 风宝宝们托起了飞飞！
            </p>
            <p className="text-lg text-cyan-600">
              友善的风力让飞行变得轻松
            </p>
          </motion.div>
        )}
      </div>

      {/* 下一页按钮 */}
      {showNextButton && (
        <motion.button
          onClick={onNext}
          className="absolute bottom-8 right-8 bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-3 px-6 rounded-full shadow-lg"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", stiffness: 200 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          乘风前行 🌬️
        </motion.button>
      )}
    </div>
  );
}