import { useEffect } from 'react';

let lockCount = 0;
let savedScrollY = 0;
let savedBodyStyle = null;

export function useScrollLock(isLocked, containerRef) {
  useEffect(() => {
    if (!isLocked || typeof window === 'undefined') return;

    const container = containerRef?.current || null;

    if (lockCount === 0) {
      savedScrollY = window.scrollY;
      savedBodyStyle = {
        position: document.body.style.position,
        top: document.body.style.top,
        left: document.body.style.left,
        right: document.body.style.right,
        width: document.body.style.width,
        paddingRight: document.body.style.paddingRight
      };

      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      document.body.style.position = 'fixed';
      document.body.style.top = `-${savedScrollY}px`;
      document.body.style.left = '0';
      document.body.style.right = '0';
      document.body.style.width = '100%';
      if (scrollbarWidth > 0) document.body.style.paddingRight = `${scrollbarWidth}px`;
      document.documentElement.classList.add('modal-scroll-locked');
      document.body.classList.add('modal-scroll-locked');
    }

    lockCount += 1;
    if (container) container.style.overflow = 'hidden';

    return () => {
      lockCount = Math.max(0, lockCount - 1);
      if (container) container.style.overflow = '';

      if (lockCount === 0) {
        document.documentElement.classList.remove('modal-scroll-locked');
        document.body.classList.remove('modal-scroll-locked');

        if (savedBodyStyle) {
          document.body.style.position = savedBodyStyle.position;
          document.body.style.top = savedBodyStyle.top;
          document.body.style.left = savedBodyStyle.left;
          document.body.style.right = savedBodyStyle.right;
          document.body.style.width = savedBodyStyle.width;
          document.body.style.paddingRight = savedBodyStyle.paddingRight;
        }

        window.scrollTo({ top: savedScrollY, behavior: 'instant' });
        savedBodyStyle = null;
      }
    };
  }, [isLocked, containerRef]);
}
