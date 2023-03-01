import { memo } from "react";
import useUtternances from "../../hooks/utternances.js";

export default memo(function ArticleComments() {
  const anchorIdForInjectingUtternances = useUtternances(
    UTTERNANCES_REPOSITORY_NAME
  );

  return <div id={anchorIdForInjectingUtternances} />;
});
