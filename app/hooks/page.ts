import { capitalizeFirstLetter } from "@/utils/strings";
import { DependencyList, useLayoutEffect } from "react";
import { useLocation, useParams } from "react-router-dom";

export function useTagNameAsTitle({
  defaultPageName,
}: {
  defaultPageName: string;
}) {
  const { tagName } = useParams();
  let pageName = defaultPageName;

  if (tagName) {
    pageName = capitalizeFirstLetter(tagName);
  }

  usePageEffect({ title: pageName });
  return pageName;
}

export function usePageEffect(options?: Options, deps?: DependencyList) {
  const location = useLocation();

  // Once the page component was rendered, update the HTML document's title
  useLayoutEffect(() => {
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
