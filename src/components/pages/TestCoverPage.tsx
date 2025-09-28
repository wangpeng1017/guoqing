'use client';

import { useState } from 'react';

interface TestCoverPageProps {
  onNext: () => void;
}

export default function TestCoverPage({ onNext }: TestCoverPageProps) {
  const [clicked, setClicked] = useState(false);

  const handleClick = () => {
    console.log('Button clicked!');
    setClicked(true);
    setTimeout(() => {
      console.log('Calling onNext');
      onNext();
    }, 500);
  };

  return (
    <div className="min-h-screen bg-blue-300 flex flex-col items-center justify-center p-8">
      <h1 className="text-4xl font-bold text-white mb-8">
        小信鸽飞飞的国庆节任务
      </h1>
      
      {!clicked && (
        <button
          onClick={handleClick}
          className="bg-red-500 hover:bg-red-600 text-white text-2xl font-bold py-4 px-8 rounded-full shadow-lg z-50"
          style={{ position: 'relative', zIndex: 1000 }}
        >
          开始故事 (测试版)
        </button>
      )}
      
      {clicked && (
        <div className="text-white text-xl">
          <p>已点击！即将跳转...</p>
        </div>
      )}
    </div>
  );
}