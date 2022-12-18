import { useTheme } from "@/core/ui/mui/theme";
import "./Spinner.css";

type SpinnerProps = {
  color?: string;
};

export default function Spinner({ color }: SpinnerProps): JSX.Element {
  const theme = useTheme();
  const spinnerColor = color ?? theme.palette.primary.main;

  return (
    <div className="spinner-wrap">
      <div
        className="spinner"
        style={{
          borderLeft: `6px solid ${spinnerColor}`,
        }}
      ></div>
    </div>
  );
}
