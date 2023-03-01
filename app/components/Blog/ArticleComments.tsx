import { config } from "@/core/config.js";
import { memo } from "react";
import useUtternances from "../../hooks/utternances.js";

export default memo(function ArticleComments() {
  const anchorIdForInjectingUtternances = useUtternances(
    config.utternances.repositoryName,
  );

  return <div id={anchorIdForInjectingUtternances} />;
});
