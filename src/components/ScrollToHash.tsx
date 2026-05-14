import {useEffect} from 'react';
import {useLocation} from 'react-router-dom';

export default function ScrollToHash() {
  const {pathname, hash} = useLocation();

  useEffect(() => {
    if (!hash) return;
    const id = hash.replace('#', '');
    const run = () => document.getElementById(id)?.scrollIntoView({behavior: 'smooth', block: 'start'});
    requestAnimationFrame(() => requestAnimationFrame(run));
  }, [pathname, hash]);

  return null;
}
