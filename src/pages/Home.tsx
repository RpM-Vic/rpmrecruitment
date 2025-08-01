import { useEffect } from "react";

export const Home = () => {
  useEffect(() => {
    const hasReloaded = sessionStorage.getItem('hasReloadedHome');
    if (!hasReloaded) {
      sessionStorage.setItem('hasReloadedHome', 'true');
      window.location.reload();
    }
  }, []);

  return <div>Please reload this page</div>;
}
