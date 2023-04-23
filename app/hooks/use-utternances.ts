import { useEffect, useRef } from "react";
import { useTheme } from "next-themes";

export default function useUtternances(
  repositoryName: string,
  issueTerm = "pathname",
  onLoad?: () => void
): React.MutableRefObject<HTMLDivElement | null> {
  const divRef = useRef<HTMLDivElement | null>(null);
  const { resolvedTheme } = useTheme();
  const utterancesTheme =
    resolvedTheme === "dark" ? "github-dark" : "github-light";

  useEffect(() => {
    if (!divRef.current) {
      console.error("Comment container ref is not set.");
      return;
    }

    const script = document.createElement("script");
    script.async = true;
    script.src = "https://utteranc.es/client.js";
    if (onLoad) {
      script.onload = onLoad;
    }

    script.setAttribute("crossorigin", "anonymous");
    script.setAttribute("repo", repositoryName);
    script.setAttribute("label", "comment :speech_balloon:");
    script.setAttribute("issue-term", issueTerm);
    script.setAttribute("theme", utterancesTheme);

    divRef.current.replaceChildren(script);
  }, [repositoryName, issueTerm, utterancesTheme, divRef]);

  return divRef;
}
