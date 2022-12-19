import { useTheme } from "@/core/ui/mui/theme";
import { Box, Typography } from "@mui/material";
import { memo } from "react";

type PageHeaderProps = {
  title: string;
  description: string;
};

export default memo(function PageHeader({
  title,
  description,
}: PageHeaderProps) {
  const theme = useTheme();
  const pageHeaderBackgroundColor =
    theme.palette.mode === "light" ? "#f8f9fa" : "rgb(18,18,18)";
  return (
    <header
      style={{
        paddingTop: "clamp(3.75rem, 3.21rem + 2.68vw, 5.625rem)",
        paddingBottom: "clamp(3.75rem, 3.21rem + 2.68vw, 5.625rem)",
        background: pageHeaderBackgroundColor,
        backgroundImage:
          theme.palette.mode === "dark"
            ? "linear-gradient(rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.05))"
            : "none",
      }}
    >
      <Box
        className="wrapper"
        sx={{
          paddingInline: "clamp(1.375rem, 1.2rem + 0.89vw, 2rem)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography fontWeight="bold" variant="h4">
          {title}
        </Typography>
        <Typography
          variant="body2"
          sx={{
            py: 2,
          }}
        >
          {description}
        </Typography>
      </Box>
    </header>
  );
});
