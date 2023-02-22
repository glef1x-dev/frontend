import { useTheme } from "@/core/ui/mui/theme";
import styles from "./Spinner.module.css";

type SpinnerProps = {
  color?: string;
};

export default function Spinner({ color }: SpinnerProps): JSX.Element {
  const theme = useTheme();
  const spinnerColor = color ?? theme.palette.primary.main;

  return (
    <div className={styles.spinnerWrap}>
      <div
        className={styles.spinner}
        style={{
          borderLeft: `6px solid ${spinnerColor}`,
        }}
      />
    </div>
  );
}
