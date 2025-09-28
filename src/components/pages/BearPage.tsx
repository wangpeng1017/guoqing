'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useSound } from '@/hooks/useSound';

interface BearPageProps {
  onNext: () => void;
}

export default function BearPage({ onNext }: BearPageProps) {
  const [steps, setSteps] = useState(0);
  const [birdPosition, setBirdPosition] = useState(0);
  const [showNextButton, setShowNextButton] = useState(false);
  const { playSound } = useSound();

  const handleFootstepClick = () => {
    if (steps >= 4) return;
    
    const newSteps = steps + 1;
    setSteps(newSteps);
    setBirdPosition(newSteps * 100);
    
    // 播放踮脚音效
    playSound('swoosh.mp3', { volume: 0.3 });
    
    // 完成所有步骤后
    if (newSteps >= 4) {
      setTimeout(() => {
        setShowNextButton(true);
      }, 1500);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-200 via-yellow-100 to-green-100 relative overflow-hidden">
      {/* 背景装饰 */}
      <div className="absolute inset-0">
        {/* 树木 */}
        <div className="absolute bottom-0 left-16">
          <svg width="80" height="120" viewBox="0 0 80 120">
            <rect x="35" y="80" width="10" height="40" fill="#8B4513" />
            <circle cx="40" cy="70" r="25" fill="#10B981" />
            <circle cx="30" cy="60" r="15" fill="#059669" />
            <circle cx="50" cy="65" r="18" fill="#0D9488" />
          </svg>
        </div>
        <div className="absolute bottom-0 right-20">
          <svg width="100" height="140" viewBox="0 0 100 140">
            <rect x="45" y="90" width="10" height="50" fill="#8B4513" />
            <circle cx="50" cy="80" r="30" fill="#10B981" />
            <circle cx="35" cy="70" r="20" fill="#059669" />
            <circle cx="65" cy="75" r="22" fill="#0D9488" />
          </svg>
        </div>
        
        {/* 小草 */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute bottom-0"
            style={{
              left: `${20 + i * 10}%`,
            }}
            animate={{ rotate: [-2, 2, -2] }}
            transition={{ duration: 2 + i * 0.3, repeat: Infinity }}
          >
            <svg width="20" height="30" viewBox="0 0 20 30">
              <path d="M10 30 Q5 15 8 0 Q12 5 15 0 Q12 15 10 30" fill="#22C55E" />
            </svg>
          </motion.div>
        ))}
      </div>

      <div className="relative z-10 flex items-center justify-center h-screen">
        
        {/* 道路 */}
        <div className="absolute bottom-32 w-full h-20 bg-gradient-to-r from-amber-200 via-yellow-200 to-amber-200 opacity-80" 
             style={{ 
               backgroundImage: 'repeating-linear-gradient(90deg, transparent, transparent 20px, rgba(0,0,0,0.1) 20px, rgba(0,0,0,0.1) 22px)',
             }}
        />

        {/* 瞌睡熊 */}
        <div className="absolute bottom-40 left-1/2 transform -translate-x-1/2">
          <motion.svg
            width="150"
            height="120"
            viewBox="0 0 150 120"
            animate={{ scale: [1, 1.02, 1] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            {/* 身体 */}
            <ellipse cx="75" cy="80" rx="45" ry="35" fill="#8B4513" />
            
            {/* 头部 */}
            <ellipse cx="75" cy="45" rx="35" ry="30" fill="#A0522D" />
            
            {/* 耳朵 */}
            <circle cx="55" cy="25" r="12" fill="#8B4513" />
            <circle cx="95" cy="25" r="12" fill="#8B4513" />
            <circle cx="55" cy="25" r="6" fill="#CD853F" />
            <circle cx="95" cy="25" r="6" fill="#CD853F" />
            
            {/* 眼睛（闭着） */}
            <path d="M60 40 Q65 35 70 40" stroke="#000" strokeWidth="2" fill="none" />
            <path d="M80 40 Q85 35 90 40" stroke="#000" strokeWidth="2" fill="none" />
            
            {/* 鼻子 */}
            <ellipse cx="75" cy="50" rx="4" ry="3" fill="#000" />
            
            {/* 嘴巴 */}
            <path d="M75 55 Q70 60 75 62 Q80 60 75 55" fill="#000" />
            
            {/* 四肢 */}
            <ellipse cx="45" cy="95" rx="12" ry="20" fill="#8B4513" />
            <ellipse cx="105" cy="95" rx="12" ry="20" fill="#8B4513" />
            <ellipse cx="50" cy="70" rx="10" ry="18" fill="#A0522D" />
            <ellipse cx="100" cy="70" rx="10" ry="18" fill="#A0522D" />
          </motion.svg>
          
          {/* Zzz */}
          <motion.div
            className="absolute -top-8 left-20"
            animate={{ 
              opacity: [0.7, 1, 0.7],
              y: [0, -10, 0]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <div className="text-2xl font-bold text-blue-600">Zzz</div>
          </motion.div>
        </div>

        {/* 小信鸽飞飞 */}
        <motion.div
          className="absolute bottom-44"
          animate={{ x: birdPosition }}
          transition={{ duration: 0.3 }}
          style={{ left: '10%' }}
        >
          <motion.svg
            width="80"
            height="70"
            viewBox="0 0 80 70"
            animate={steps < 4 ? { y: [0, -3, 0] } : { rotate: [0, 10, -5, 0] }}
            transition={steps < 4 ? { duration: 0.3 } : { duration: 1, delay: 1 }}
          >
            {/* 身体 */}
            <ellipse cx="40" cy="40" rx="20" ry="15" fill="#E5E7EB" />
            
            {/* 翅膀 */}
            <path d="M25 35 Q15 25 12 38 Q15 45 25 42 Z" fill="#D1D5DB" />
            <path d="M55 35 Q65 25 68 38 Q65 45 55 42 Z" fill="#D1D5DB" />
            
            {/* 头部 */}
            <circle cx="40" cy="25" r="12" fill="#F3F4F6" />
            
            {/* 眼睛 */}
            <circle cx="37" cy="22" r="2" fill="#1F2937" />
            <circle cx="43" cy="22" r="2" fill="#1F2937" />
            
            {/* 嘴巴叼着包裹 */}
            <rect x="32" y="28" width="16" height="8" rx="2" fill="#8B5CF6" />
            <path d="M48 30 Q51 27 49 33 Q48 34 46 33 Z" fill="#DC2626" />
            
            {/* 脚（踮脚状态） */}
            <motion.g
              animate={steps > 0 && steps < 4 ? { y: [0, -2, 0] } : {}}
              transition={{ duration: 0.2 }}
            >
              <line x1="35" y1="52" x2="34" y2="58" stroke="#F97316" strokeWidth="1.5" />
              <line x1="45" y1="52" x2="46" y2="58" stroke="#F97316" strokeWidth="1.5" />
            </motion.g>
          </motion.svg>
        </motion.div>

        {/* 脚印按钮 */}
        {steps < 4 && (
          <motion.button
            onClick={handleFootstepClick}
            className="absolute bottom-20 left-1/2 transform -translate-x-1/2 bg-brown-300 hover:bg-brown-400 rounded-full p-4 shadow-lg"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            animate={{ scale: [1, 1.15, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <svg width="60" height="60" viewBox="0 0 60 60">
              <ellipse cx="30" cy="35" rx="15" ry="20" fill="#8B4513" opacity="0.7" />
              <ellipse cx="25" cy="15" rx="4" ry="6" fill="#8B4513" opacity="0.6" />
              <ellipse cx="35" cy="15" rx="4" ry="6" fill="#8B4513" opacity="0.6" />
              <ellipse cx="20" cy="25" rx="3" ry="5" fill="#8B4513" opacity="0.6" />
              <ellipse cx="40" cy="25" rx="3" ry="5" fill="#8B4513" opacity="0.6" />
            </svg>
          </motion.button>
        )}

        {/* 完成提示 */}
        {steps >= 4 && (
          <motion.div
            className="absolute bottom-44"
            style={{ left: '60%' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            <motion.svg
              width="80"
              height="70"
              viewBox="0 0 80 70"
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 0.5, repeat: 2 }}
            >
              {/* 胜利手势的飞飞 */}
              <ellipse cx="40" cy="40" rx="20" ry="15" fill="#E5E7EB" />
              <circle cx="40" cy="25" r="12" fill="#F3F4F6" />
              <circle cx="37" cy="22" r="2" fill="#1F2937" />
              <circle cx="43" cy="22" r="2" fill="#1F2937" />
              
              {/* V手势翅膀 */}
              <path d="M20 30 L15 20 L25 25" stroke="#D1D5DB" strokeWidth="3" fill="none" />
              <path d="M25 25 L20 15 L30 20" stroke="#D1D5DB" strokeWidth="3" fill="none" />
              
              <rect x="32" y="28" width="16" height="8" rx="2" fill="#8B5CF6" />
              <path d="M48 30 Q51 27 49 33 Q48 34 46 33 Z" fill="#DC2626" />
            </motion.svg>
            
            <motion.p
              className="text-green-600 font-bold text-center mt-2"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 1.5, type: "spring" }}
            >
              安全通过！
            </motion.p>
          </motion.div>
        )}

        {/* 说明文字 */}
        <motion.div
          className="absolute top-20 left-1/2 transform -translate-x-1/2 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <h2 className="text-3xl font-bold text-amber-700 mb-4">悄悄经过瞌睡熊</h2>
          <p className="text-lg text-amber-600">
            {steps < 4 ? `点击脚印，踮脚前进 (${steps}/4)` : "成功通过！飞飞真棒！"}
          </p>
        </motion.div>
      </div>

      {/* 下一页按钮 */}
      {showNextButton && (
        <motion.button
          onClick={onNext}
          className="absolute bottom-8 right-8 bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-full shadow-lg"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", stiffness: 200 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          继续前进 →
        </motion.button>
      )}
    </div>
  );
}