import { useColorScheme } from 'react-native';
import { Colors } from '../../constants/Colors.jsx';

export const useTheme = () => {
  return useColorScheme() || 'light';
};