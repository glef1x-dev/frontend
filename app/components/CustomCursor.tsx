// @ts-ignore
import { default as CustomCursorLib } from "custom-cursor-react";
import "custom-cursor-react/dist/index.css";
import { useTheme } from "../lib/ui/mui/theme.js";

type CustomCursorProps = {
  thirdPartyLibProps: object;
};

export default function CustomCursor({
  thirdPartyLibProps = {},
}: CustomCursorProps) {
  const theme = useTheme();
  let primaryColor = theme.palette.primary.main;
  if (theme.palette.mode === "light") {
    primaryColor = "#49b4ff";
  }

  return (
    <CustomCursorLib
      targets={[".article-preview-card"]}
      customClass="custom-cursor"
      fill={primaryColor}
      {...thirdPartyLibProps}
    />
  );
}
