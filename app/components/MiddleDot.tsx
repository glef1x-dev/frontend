import { memo } from "react";

export default memo(function MiddleDot() {
  return (
    <span
      className="middle-dot"
      style={{
        margin: "0px 8px",
      }}
    >
      •
    </span>
  );
});
