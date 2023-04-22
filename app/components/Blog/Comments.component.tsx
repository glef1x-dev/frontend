import useUtternances from "~/hooks/use-utternances";

interface CommentsProps {
  repositoryName?: string;
  issueTerm?: string;
}

export default function Comments({
  issueTerm = "pathname",
}: CommentsProps): JSX.Element {
  const anchorIdForInjectingUtternances = useUtternances(
    "glef1x-dev/utternances",
    issueTerm
  );

  return <div id={anchorIdForInjectingUtternances} />;
}
