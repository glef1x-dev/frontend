import { DependencyList, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { config } from "../core/config.js";

export function usePageEffect(options?: Options, deps?: DependencyList) {
  const { pathname } = useLocation();

  // Once the page component was rendered, update the HTML document's title
  useEffect(() => {
    const previousTitle = document.title;

    document.title =
      location.pathname === "/"
        ? options?.title ?? config.app.name
        : options?.title
        ? `${options.title} | Hlib Haranin`
        : config.app.name;

    return function () {
      document.title = previousTitle;
    };
  }, [pathname]); /* eslint-disable-line react-hooks/exhaustive-deps */
}

type Options = {
  title?: string;
};
