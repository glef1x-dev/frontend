import useUtternances from "../../hooks/utternances.js";

export default function Comments() {
  const anchorIdForInjectingUtternances = useUtternances(
    UTTERNANCES_REPOSTIRORY_NAME
  );

  return <div id={anchorIdForInjectingUtternances}></div>;
}
