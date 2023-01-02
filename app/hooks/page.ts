import { capitalizeFirstLetter } from "@/utils/strings";
import { DependencyList, useEffect } from "react";
import { useLocation } from "react-router-dom";

export function usePageEffect(options?: Options, deps?: DependencyList) {
  const { pathname } = useLocation();

  // Once the page component was rendered, update the HTML document's title
  useEffect(() => {
    const previousTitle = document.title;

    document.title =
      location.pathname === "/"
        ? options?.title ?? APP_NAME
        : options?.title
        ? `${options.title} | Hlib Haranin`
        : APP_NAME;

    return function () {
      document.title = previousTitle;
    };
  }, [pathname]); /* eslint-disable-line react-hooks/exhaustive-deps */
}

type Options = {
  title?: string;
};
