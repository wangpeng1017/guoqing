import { useState, useCallback, useMemo } from 'react';

export type PageType = 'cover' | 'mission' | 'package' | 'departure' | 'bear' | 'wind' | 'party' | 'delivery' | 'cake' | 'victory';

export function usePageTransition() {
  const [currentPage, setCurrentPage] = useState<PageType>('cover');
  const [isTransitioning, setIsTransitioning] = useState(false);

  const pages = useMemo<PageType[]>(() => [
    'cover', 'mission', 'package', 'departure', 'bear', 
    'wind', 'party', 'delivery', 'cake', 'victory'
  ], []);

  const nextPage = useCallback(async () => {
    console.log('nextPage called, currentPage:', currentPage); // Debug
    const currentIndex = pages.indexOf(currentPage);
    console.log('currentIndex:', currentIndex, 'pages.length:', pages.length); // Debug
    if (currentIndex < pages.length - 1) {
      setIsTransitioning(true);
      
      // 添加过渡延迟
      await new Promise(resolve => setTimeout(resolve, 300));
      
      const nextPageName = pages[currentIndex + 1];
      console.log('switching to page:', nextPageName); // Debug
      setCurrentPage(nextPageName);
      setIsTransitioning(false);
    }
  }, [currentPage, pages]);

  const goToPage = useCallback(async (page: PageType) => {
    if (page !== currentPage) {
      setIsTransitioning(true);
      
      await new Promise(resolve => setTimeout(resolve, 300));
      
      setCurrentPage(page);
      setIsTransitioning(false);
    }
  }, [currentPage]);

  const resetToFirstPage = useCallback(() => {
    setCurrentPage('cover');
    setIsTransitioning(false);
  }, []);

  return {
    currentPage,
    isTransitioning,
    nextPage,
    goToPage,
    resetToFirstPage,
    currentPageIndex: pages.indexOf(currentPage),
    totalPages: pages.length
  };
}