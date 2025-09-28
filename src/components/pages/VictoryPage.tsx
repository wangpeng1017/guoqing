'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useSound } from '@/hooks/useSound';

interface VictoryPageProps {
  onNext: () => void;
}

export default function VictoryPage({ }: VictoryPageProps) {
  const [medalGiven, setMedalGiven] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [showReplayButton, setShowReplayButton] = useState(false);
  const { playSound } = useSound();

  const handleMedalClick = () => {
    if (medalGiven) return;
    
    setMedalGiven(true);
    playSound('positive_chime.mp3', { volume: 0.8 });
    
    setTimeout(() => {
      setShowMessage(true);
      setTimeout(() => {
        setShowReplayButton(true);
      }, 2000);
    }, 1500);
  };

  const handleReplay = () => {
    window.location.reload(); // 重新开始故事
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-200 via-orange-200 to-red-200 relative overflow-hidden">
      {/* 庆祝背景 */}
      <div className="absolute inset-0">
        {/* 彩带飘落 */}
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-3 h-16 rounded-full"
            style={{
              left: `${5 + i * 6}%`,
              backgroundColor: ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD'][i % 6]
            }}
            initial={{ y: -100, rotate: 0 }}
            animate={{ 
              y: [0, window.innerHeight + 100],
              rotate: [0, 360, 720],
              x: [0, Math.sin(i) * 50]
            }}
            transition={{
              duration: 4 + Math.random() * 2,
              repeat: Infinity,
              delay: i * 0.2,
              ease: "easeInOut"
            }}
          />
        ))}
        
        {/* 星星闪烁 */}
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-yellow-400 text-2xl"
            style={{
              left: `${10 + Math.random() * 80}%`,
              top: `${10 + Math.random() * 60}%`
            }}
            animate={{ 
              scale: [1, 1.5, 1],
              rotate: [0, 180, 360],
              opacity: [0.7, 1, 0.7]
            }}
            transition={{
              duration: 2 + Math.random(),
              repeat: Infinity,
              delay: Math.random() * 2
            }}
          >
            ⭐
          </motion.div>
        ))}
      </div>

      <div className="relative z-10 h-screen flex flex-col items-center justify-center px-8">
        
        {/* 标题 */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <h2 className="text-4xl md:text-6xl font-bold text-red-600 mb-6">
            英雄的荣耀
          </h2>
          <p className="text-xl text-orange-700 max-w-2xl mx-auto">
            飞飞成功完成了国庆节的重要任务，为大家带来了最珍贵的生日礼物！
          </p>
        </motion.div>

        {/* 主舞台 */}
        <div className="relative">
          
          {/* 舞台背景 */}
          <motion.div
            className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 w-80 h-6 bg-gradient-to-r from-yellow-400 via-red-400 to-yellow-400 rounded-full opacity-60"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          />
          
          {/* 小信鸽飞飞 - 英雄姿态 */}
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 1 }}
          >
            <svg width="200" height="180" viewBox="0 0 200 180">
              {/* 身体 */}
              <ellipse cx="100" cy="90" rx="45" ry="35" fill="#E5E7EB" />
              
              {/* 翅膀 - 展开的胜利姿态 */}
              <motion.path
                d="M60 80 Q20 60 10 85 Q20 105 60 95 Z"
                fill="#D1D5DB"
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                style={{ transformOrigin: "50px 85px" }}
              />
              <motion.path
                d="M140 80 Q180 60 190 85 Q180 105 140 95 Z"
                fill="#D1D5DB"
                animate={{ rotate: [0, -5, 5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                style={{ transformOrigin: "150px 85px" }}
              />
              
              {/* 头部 */}
              <circle cx="100" cy="60" r="28" fill="#F3F4F6" />
              
              {/* 眼睛 - 开心的表情 */}
              <circle cx="92" cy="55" r="4" fill="#1F2937" />
              <circle cx="108" cy="55" r="4" fill="#1F2937" />
              
              {/* 开心的笑脸 */}
              <path d="M85 70 Q100 80 115 70" stroke="#10B981" strokeWidth="3" fill="none" />
              
              {/* 嘴巴 */}
              <path d="M100 65 L103 68 L97 68 Z" fill="#F97316" />
              
              {/* 胸前的奖牌位置 */}
              <motion.g
                className={!medalGiven ? "cursor-pointer" : ""}
                onClick={handleMedalClick}
                whileHover={!medalGiven ? { scale: 1.1 } : {}}
                whileTap={!medalGiven ? { scale: 0.9 } : {}}
              >
                {!medalGiven && (
                  <motion.circle
                    cx="100"
                    cy="110"
                    r="20"
                    fill="#FFD700"
                    stroke="#FFA500"
                    strokeWidth="3"
                    strokeDasharray="8,4"
                    animate={{ 
                      rotate: 360,
                      scale: [1, 1.1, 1]
                    }}
                    transition={{ 
                      rotate: { duration: 3, repeat: Infinity, ease: "linear" },
                      scale: { duration: 1.5, repeat: Infinity }
                    }}
                  />
                )}
                
                {!medalGiven && (
                  <motion.text
                    x="100"
                    y="115"
                    textAnchor="middle"
                    fill="#FF6B00"
                    fontSize="12"
                    fontWeight="bold"
                    animate={{ opacity: [1, 0.5, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  >
                    点击奖牌
                  </motion.text>
                )}

                {/* 奖牌 */}
                {medalGiven && (
                  <motion.g
                    initial={{ scale: 0, y: -100 }}
                    animate={{ scale: 1, y: 0 }}
                    transition={{ 
                      type: "spring",
                      stiffness: 200,
                      damping: 10
                    }}
                  >
                    {/* 奖牌绳子 */}
                    <line x1="100" y1="85" x2="100" y2="105" stroke="#8B4513" strokeWidth="4" />
                    
                    {/* 奖牌主体 */}
                    <motion.circle
                      cx="100"
                      cy="115"
                      r="18"
                      fill="#FFD700"
                      stroke="#FFA500"
                      strokeWidth="2"
                      className="medal-shine"
                    />
                    
                    {/* 奖牌图案 */}
                    <motion.path
                      d="M90 115 L95 105 L100 110 L105 105 L110 115 L100 125 Z"
                      fill="#FF6B00"
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                    
                    {/* 小红旗 */}
                    <rect x="98" y="105" width="4" height="8" fill="#DC2626" />
                    <path d="M102 105 L108 108 L102 111 Z" fill="#EF4444" />
                  </motion.g>
                )}
              </motion.g>
              
              {/* 脚 */}
              <line x1="85" y1="125" x2="83" y2="135" stroke="#F97316" strokeWidth="3" />
              <line x1="115" y1="125" x2="117" y2="135" stroke="#F97316" strokeWidth="3" />
            </svg>
          </motion.div>
        </div>

        {/* 庆祝信息 */}
        {showMessage && (
          <motion.div
            className="text-center mb-8"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 200 }}
          >
            <motion.h3
              className="text-4xl font-bold text-red-500 mb-4"
              animate={{ 
                scale: [1, 1.05, 1],
                color: ["#EF4444", "#DC2626", "#B91C1C", "#EF4444"]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              🏆 国庆节快乐！🏆
            </motion.h3>
            <p className="text-xl text-gray-700 mb-4">
              小信鸽飞飞是真正的英雄！
            </p>
            <motion.div
              className="text-lg text-gray-600"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              <p>感谢飞飞为大家带来了最珍贵的国庆节礼物，</p>
              <p>让这个生日庆典变得如此特别！</p>
            </motion.div>
          </motion.div>
        )}

        {/* 重新开始按钮 */}
        {showReplayButton && (
          <motion.button
            onClick={handleReplay}
            className="bg-gradient-to-r from-red-500 to-yellow-500 hover:from-red-600 hover:to-yellow-600 text-white font-bold py-4 px-8 rounded-full shadow-lg text-lg"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 200 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            🔄 再玩一次
          </motion.button>
        )}

        {/* 飘落的花瓣效果 */}
        {medalGiven && (
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(25)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute text-2xl"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: "-50px"
                }}
                initial={{ y: 0, rotate: 0, opacity: 1 }}
                animate={{ 
                  y: window.innerHeight + 100,
                  rotate: [0, 180, 360, 540],
                  opacity: [1, 0.7, 0.4, 0]
                }}
                transition={{
                  duration: 4 + Math.random() * 2,
                  delay: i * 0.1,
                  ease: "easeInOut"
                }}
              >
                {['🌸', '🌺', '🌻', '🌹', '🏵️'][i % 5]}
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* 感谢信息 */}
      <motion.div
        className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: showMessage ? 0.8 : 0 }}
        transition={{ delay: 3 }}
      >
        <p className="text-sm text-gray-500">
          感谢您陪伴飞飞完成这段精彩的国庆节冒险！
        </p>
      </motion.div>
    </div>
  );
}