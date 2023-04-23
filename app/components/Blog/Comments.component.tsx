import useUtternances from "~/hooks/use-utternances";
import { Icon } from "@iconify/react";
import commentsIcon from "@iconify/icons-mdi/comments";

interface CommentsProps {
  repositoryName?: string;
  issueTerm?: string;
}

export default function Comments({
  issueTerm = "pathname",
}: CommentsProps): JSX.Element {
  const scrollToCommentsOnScriptLoad = (): void => {
    if (window.location.hash.slice(1) !== "comments" || !divRef.current) {
      return;
    }

    const commentsIframe = document.getElementsByTagName("iframe").item(0);

    if (!commentsIframe) {
      return;
    }

    divRef.current?.scrollIntoView(true);

    commentsIframe.onload = (): void => {
      setTimeout(() => commentsIframe.parentElement?.scrollIntoView(true), 300);
    };
  };

  const divRef = useUtternances(
    "glef1x-dev/utternances",
    issueTerm,
    scrollToCommentsOnScriptLoad
  );

  return (
    <>
      <a
        href="#comments"
        className="not-prose hover:underline focus:transition-none focus:ring-inset focus:shadow-none"
      >
        <div className="flex text-blue-600 items-center gap-2 mt-12 mb-6">
          <Icon width={30} height={30} icon={commentsIcon} />
          <span className="text-xl font-semibold">Comments</span>
        </div>
      </a>
      <div ref={divRef} id="comments" />
    </>
  );
}
