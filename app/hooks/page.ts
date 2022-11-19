import * as React from "react";
import { useLocation } from "react-router-dom";

export function usePageEffect(options?: Options, deps?: React.DependencyList) {
  const location = useLocation();

  // Once the page component was rendered, update the HTML document's title
  React.useEffect(() => {
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
  }, deps ?? []); /* eslint-disable-line react-hooks/exhaustive-deps */
}

type Options = {
  title?: string;
};
