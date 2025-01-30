import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAtom } from 'jotai'; 
import { isAuthenticated } from '@/lib/authenticate'; 
import { favouritesAtom, searchHistoryAtom } from '@/store'; 
import { getFavourites, getHistory } from '@/lib/userData'; 

const PUBLIC_PATHS = ['/login', '/', '/_error', '/register']; 

export default function RouteGuard(props) {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);
  const [, setFavourites] = useAtom(favouritesAtom); 
  const [, setSearchHistory] = useAtom(searchHistoryAtom);

  useEffect(() => {
    const updateAtoms = async () => {
      try {
        const favourites = await getFavourites();
        const history = await getHistory();
        setFavourites(favourites || []); 
        setSearchHistory(history || []); 
      } catch (error) {
        console.error("Failed to update atoms:", error);
      }
    };

    updateAtoms();

    authCheck(router.pathname);

    router.events.on('routeChangeComplete', authCheck);

    return () => {
      router.events.off('routeChangeComplete', authCheck);
    };
  }, []);

  function authCheck(url) {
    const path = url.split('?')[0];
    if (!isAuthenticated() && !PUBLIC_PATHS.includes(path)) {
      setAuthorized(false);
      router.push("/login");
    } else {
      setAuthorized(true);
    }
  }

  return <>{authorized && props.children}</>;
}
