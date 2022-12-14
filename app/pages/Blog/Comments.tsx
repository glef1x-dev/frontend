import { memo } from "react";
import useUtternances from "../../hooks/utternances.js";

export default memo(function Comments() {
  const anchorIdForInjectingUtternances = useUtternances(
    UTTERNANCES_REPOSITORY_NAME
  );

  return <div id={anchorIdForInjectingUtternances}></div>;
});
