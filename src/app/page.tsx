'use client';

import { usePageTransition } from '@/hooks/usePageTransition';
import { useSound } from '@/hooks/useSound';
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect } from 'react';

// 页面组件导入
import CoverPage from '@/components/pages/CoverPage';
import MissionPage from '@/components/pages/MissionPage';
import PackagePage from '@/components/pages/PackagePage';
import DeparturePage from '@/components/pages/DeparturePage';
import BearPage from '@/components/pages/BearPage';
import WindPage from '@/components/pages/WindPage';
import PartyPage from '@/components/pages/PartyPage';
import DeliveryPage from '@/components/pages/DeliveryPage';
import CakePage from '@/components/pages/CakePage';
import VictoryPage from '@/components/pages/VictoryPage';

export default function Home() {
  const { currentPage, nextPage, resetToFirstPage } = usePageTransition();
  const { preloadSounds } = useSound();

  // 预加载音效
  useEffect(() => {
    preloadSounds([
      'magic_chime.mp3',
      'sparkle.mp3',
      'swoosh.mp3',
      'wing_flap.mp3',
      'positive_chime.mp3',
      'distant_party_music.mp3',
      'crowd_cheer.mp3',
      'celebration_music.mp3'
    ]);
  }, [preloadSounds]);

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'cover':
        return <CoverPage onNext={nextPage} />;
      case 'mission':
        return <MissionPage onNext={nextPage} />;
      case 'package':
        return <PackagePage onNext={nextPage} />;
      case 'departure':
        return <DeparturePage onNext={nextPage} />;
      case 'bear':
        return <BearPage onNext={nextPage} />;
      case 'wind':
        return <WindPage onNext={nextPage} />;
      case 'party':
        return <PartyPage onNext={nextPage} />;
      case 'delivery':
        return <DeliveryPage onNext={nextPage} />;
      case 'cake':
        return <CakePage onNext={nextPage} />;
      case 'victory':
        return <VictoryPage onNext={nextPage} />;
      default:
        return <CoverPage onNext={nextPage} />;
    }
  };

  return (
    <div className="min-h-screen overflow-hidden relative">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentPage}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          {renderCurrentPage()}
        </motion.div>
      </AnimatePresence>

      {/* 重启按钮（开发时使用） */}
      {process.env.NODE_ENV === 'development' && (
        <button
          onClick={resetToFirstPage}
          className="fixed top-4 left-4 bg-gray-600 text-white px-3 py-1 rounded text-sm z-50 opacity-50 hover:opacity-100"
        >
          重启
        </button>
      )}
    </div>
  );
}
  );
}
