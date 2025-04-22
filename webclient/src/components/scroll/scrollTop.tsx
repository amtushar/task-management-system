import { useEffect } from 'react';

interface triggerProps {
    trigger: boolean
}

const ScrollToTop: React.FC<triggerProps> = ({ trigger }) => {
  useEffect(() => {
    if (trigger) {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    }
  }, [trigger]);

  return null; // This component doesn't render anything, just handles scroll behavior.
};

export default ScrollToTop;
