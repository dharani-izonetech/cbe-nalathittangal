import { useEffect } from 'react';
import { useLocation, useNavigationType } from 'react-router-dom';

const ScrollToTop = () => {
  const { pathname, hash } = useLocation();
  const navType = useNavigationType();

  useEffect(() => {
    // If there's a hash, always try to scroll to it, even on POP
    // This handles the "back to hash" scenario reliably across refreshes and repeated clicks
    if (hash) {
      setTimeout(() => {
        const id = hash.replace('#', '');
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 150);
      return;
    }

    // If navigating BACK (POP), try to restore saved scroll position (for mobile)
    if (navType === 'POP') {
      const savedY = sessionStorage.getItem('homeScrollY');
      if (savedY !== null) {
        sessionStorage.removeItem('homeScrollY');
        // Use a small delay to let the page render before restoring scroll
        setTimeout(() => {
          window.scrollTo({ top: parseInt(savedY, 10), behavior: 'instant' });
        }, 100);
      }
      // Otherwise let the browser handle it natively (desktop already works fine)
      return;
    }

    // Otherwise (normal link click with no hash), go to top
    window.scrollTo(0, 0);
  }, [pathname, hash, navType]);

  return null;
};

export default ScrollToTop;
