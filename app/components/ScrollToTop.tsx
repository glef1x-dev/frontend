import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    document.documentElement.scrollTo({
      top: 0,
      left: 0,
      // @ts-expect-error
      // Still a bug in Typescript so just ignore the error
      behavior: "instant",
    });
  }, [pathname]);

  return null;
}
