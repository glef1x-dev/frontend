import { TypographyVariantsOptions } from "@mui/material/styles";

export const options: TypographyVariantsOptions = {
  fontFamily: ["Wotfard", "Futura", "-apple-system", "sans-serif"].join(","),
  fontWeightBold: "600",
  fontWeightLight: "400",
  fontWeightMedium: "500",
};

export const overrides: TypographyVariantsOptions = {
  h1: { fontSize: "2em" },
  h2: { fontSize: "1.5em" },
  h3: { fontSize: "1.3em" },
  h4: { fontSize: "1em" },
  h5: { fontSize: "0.8em" },
  h6: { fontSize: "0.7em" },
  button: { textTransform: "none" },
};
