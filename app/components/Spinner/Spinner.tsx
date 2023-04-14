import { useTheme } from '@/core/ui/mui/theme';
import UseAnimations from 'react-useanimations';
import loading from 'react-useanimations/lib/loading';
import styles from './Spinner.module.css';

export default function Spinner(): JSX.Element {
  const theme = useTheme();
  const spinnerColor = theme.palette.primary.main;

  return (
    <div className={styles.stage}>
      <UseAnimations
       className={styles.spinner} 
       strokeColor={spinnerColor}
      animation={loading}
       size={70} 
     />
    </div>
  );
}
